"use client";

import { useEffect, useState, useCallback } from "react";
import sdk, { type Context } from "@farcaster/frame-sdk";

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
      setIsSDKLoaded(true);
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const fetchUserData = useCallback(async (fid: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user?fid=${fid}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError("Could not load user data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (context?.user?.fid) {
      fetchUserData(context.user.fid);
    } else if (isSDKLoaded && !context?.user?.fid) {
      // Fallback for testing outside of Frame (optional)
      // fetchUserData(3); // vitalik.eth
      setLoading(false);
    }
  }, [context, fetchUserData, isSDKLoaded]);

  const shareResult = () => {
    if (!userData) return;
    const text = `I got ${userData.result.score} on Based ID! Check yours 👉`;
    const url = `https://based-id-puce.vercel.app`;
    sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`);
  };

  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-bold text-gray-500">Loading Frame SDK...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-red-50">
        <div className="text-red-600 text-xl font-bold mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Welcome to Based ID</h1>
        <p className="text-gray-600 mb-8">Please open this app inside Warpcast to see your score.</p>
      </div>
    );
  }

  const { stats, result } = userData;
  const gradient = result.score >= 900 ? "from-pink-500 to-rose-500" :
    result.score >= 750 ? "from-blue-400 to-cyan-300" :
      result.score >= 600 ? "from-green-400 to-emerald-300" :
        "from-purple-600 to-blue-500";

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br ${gradient}`}>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
        {/* Profile */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <img
            src={stats.pfpUrl}
            alt={stats.username}
            className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="absolute -bottom-2 -right-2 text-4xl">
            {result.badge}
          </div>
        </div>

        <h1 className="text-3xl font-black mb-2 text-gray-900">@{stats.username}</h1>

        {/* Score */}
        <div className="my-8">
          <div className={`text-8xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {result.score}
          </div>
          <div className="text-xl font-bold text-gray-500 mt-2">BASED SCORE</div>
        </div>

        {/* Rank */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-8">
          <div className="text-2xl font-bold text-gray-800">{result.rank}</div>
          <div className="text-sm text-gray-500">Top {result.percentile}% of Farcaster</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-gray-500">Followers</div>
            <div className="font-bold">{stats.followers.toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-gray-500">Casts</div>
            <div className="font-bold">{stats.castCount.toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-gray-500">Account Age</div>
            <div className="font-bold">{stats.accountAge} days</div>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-gray-500">Engagement</div>
            <div className="font-bold">{(stats.engagementRate * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={shareResult}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition hover:scale-105 bg-gradient-to-r ${gradient}`}
        >
          Share Result
        </button>
      </div>
    </main>
  );
}
