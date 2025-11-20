import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/url";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Based ID - Your Farcaster Identity Card",
  description: "Discover your Based Score and rank on Farcaster!",
  openGraph: {
    title: "Based ID - Your Farcaster Identity Card",
    description: "Check your Based Score and get your identity card!",
    images: [`${baseUrl}/api/og`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/og`,
    'fc:frame:button:1': '✨ Check My Based ID',
    'fc:frame:post_url': `${baseUrl}/api/frames`,
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="z-10 max-w-2xl w-full items-center justify-center font-mono text-sm">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Based ID
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your Farcaster Identity Card
          </p>
          <p className="text-gray-600 mb-8">
            Discover your Based Score and see how you rank among the Farcaster community!
          </p>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">How it works</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>📊 We analyze your Farcaster activity</li>
              <li>🎯 Calculate your Based Score (0-1000)</li>
              <li>🏆 Assign you a rank and badge</li>
              <li>🎨 Generate a beautiful shareable card</li>
            </ul>
          </div>

          <div className="text-sm text-gray-500">
            Open this page in <strong>Warpcast</strong> to interact with the Frame
          </div>
        </div>
      </div>
    </main>
  );
}
