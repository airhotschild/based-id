import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/url';

export async function GET() {
    const baseUrl = getBaseUrl();

    const manifest = {
        accountAssociation: {
            header: "eyJmaWQiOjUxNDgzMCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDViMDMzYUY1Y2I0RkZFODhmQjNhM0ZlNTkwQ2NGODIwRkE3ODVkNDIifQ",
            payload: "eyJkb21haW4iOiJiYXNlZC1pZC1wdWNlLnZlcmNlbC5hcHAifQ",
            signature: "Mz5XHfU7imf/k+mFRn7yEnBw0cMUFT6KPkXIJ1DttHNohYrBDRIn35QaJNNPb3bH/RdtTAMDx4uH5fO64wNbeBw="
        },
        frame: {
            version: "1",
            name: "Based ID",
            iconUrl: `${baseUrl}/icon.png`,
            splashImageUrl: `${baseUrl}/api/og`,
            splashBackgroundColor: "#1a1a1a",
            homeUrl: baseUrl,
            description: "Generate your Farcaster identity card and discover your Based Score! See your rank and engagement level.",
            tags: ["identity", "score", "analytics", "profile", "social"],
        }
    };

    return NextResponse.json(manifest);
}
