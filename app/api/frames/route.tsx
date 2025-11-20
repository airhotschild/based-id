import { NextRequest, NextResponse } from 'next/server';
import { calculateBasedScore } from '@/lib/scoring';
import { getBaseUrl } from '@/lib/url';

const baseUrl = getBaseUrl();

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

        // Estimate account age based on FID (lower FID = older account)
        let accountAge = 100; // default
        if (fid < 10000) accountAge = 600;
        else if (fid < 100000) accountAge = 300;
        else if (fid < 500000) accountAge = 150;

        // Calculate engagement rate based on follower ratio
        const engagementRate = user.follower_count > 0
            ? Math.min(user.following_count / user.follower_count, 1)
            : 0;

        // Estimate cast count from follower count
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { untrustedData } = body;

        const buttonIndex = untrustedData?.buttonIndex || 1;
        const fid = untrustedData?.fid || 1;

        // If button is "Check My Based ID"
        if (buttonIndex === 1) {
            // Fetch user stats and calculate score
            const stats = await getUserStats(fid);
            const result = calculateBasedScore({
                followers: stats.followers,
                following: stats.following,
                castCount: stats.castCount,
                accountAge: stats.accountAge,
                engagementRate: stats.engagementRate,
            });

            // Return the frame with the generated image
            return NextResponse.json({
                version: 'vNext',
                image: `${baseUrl}/api/og`,
                buttons: [
                    { label: '🔄 Refresh', action: 'post' },
                    { label: '📤 Share', action: 'link', target: `https://warpcast.com/~/compose?text=I%20got%20${result.score}%20on%20Based%20ID!%20Check%20yours%20👉&embeds[]=${encodeURIComponent(baseUrl)}` },
                ],
                postUrl: `${baseUrl}/api/frames`,
            });
        }

        // Default response
        return NextResponse.json({
            version: 'vNext',
            image: `${baseUrl}/api/og`,
            buttons: [{ label: '🔄 Try Again', action: 'post' }],
            postUrl: `${baseUrl}/api/frames`,
        });
    } catch (error) {
        console.error('Frame error:', error);
        return NextResponse.json({ error: 'Failed to process frame' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Frame endpoint - use POST' });
}
