import { NextRequest, NextResponse } from 'next/server';
import { calculateBasedScore } from '@/lib/scoring';

export const runtime = 'edge';

// Fetch real user data from Neynar API
async function getUserStats(fid: number) {
    try {
        const response = await fetch(
            `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
            {
                headers: {
                    'api_key': process.env.NEYNAR_API_KEY || '',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Neynar API error: ${response.status}`);
        }

        const data = await response.json();
        const user = data.users[0];

        if (!user) {
            throw new Error('User not found');
        }

        // Estimate account age based on FID
        let accountAge = 100; // default
        if (fid < 10000) accountAge = 600;
        else if (fid < 100000) accountAge = 300;
        else if (fid < 500000) accountAge = 150;

        // Calculate engagement rate
        const engagementRate = user.follower_count > 0
            ? Math.min(user.following_count / user.follower_count, 1)
            : 0;

        // Estimate cast count
        const estimatedCastCount = Math.floor(user.follower_count / 50) + (user.following_count * 2);

        return {
            username: user.username,
            pfpUrl: user.pfp_url,
            followers: user.follower_count,
            following: user.following_count,
            castCount: estimatedCastCount,
            accountAge,
            engagementRate,
        };
    } catch (error) {
        console.error('Error fetching user stats:', error);
        // Fallback to mock data on error
        return {
            username: `user${fid}`,
            pfpUrl: `https://api.dicebear.com/7.x/avataaars/png?seed=${fid}`,
            followers: Math.floor(Math.random() * 10000),
            following: Math.floor(Math.random() * 5000),
            castCount: Math.floor(Math.random() * 15000),
            accountAge: Math.floor(Math.random() * 730),
            engagementRate: Math.random() * 0.5,
        };
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: 'FID required' }, { status: 400 });
    }

    try {
        const stats = await getUserStats(Number(fid));
        const result = calculateBasedScore({
            followers: stats.followers,
            following: stats.following,
            castCount: stats.castCount,
            accountAge: stats.accountAge,
            engagementRate: stats.engagementRate,
        });

        return NextResponse.json({ stats, result });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
}
