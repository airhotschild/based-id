export interface UserStats {
  followers: number;
  following: number;
  castCount: number;
  accountAge: number; // in days
  engagementRate?: number;
}

export interface BasedResult {
  score: number; // 0-1000
  rank: string;
  badge: string;
  percentile: number;
}

export function calculateBasedScore(stats: UserStats): BasedResult {
  let score = 0;

  // Follower score (0-300 points)
  if (stats.followers > 10000) score += 300;
  else if (stats.followers > 5000) score += 250;
  else if (stats.followers > 1000) score += 200;
  else if (stats.followers > 500) score += 150;
  else if (stats.followers > 100) score += 100;
  else score += Math.min(stats.followers, 50);

  // Account age (0-200 points) - OG bonus
  const ageScore = Math.min(stats.accountAge / 365, 1) * 200;
  score += ageScore;

  // Activity score (0-300 points)
  if (stats.castCount > 10000) score += 300;
  else if (stats.castCount > 5000) score += 250;
  else if (stats.castCount > 1000) score += 200;
  else if (stats.castCount > 500) score += 150;
  else score += Math.min(stats.castCount / 5, 100);

  // Engagement rate bonus (0-200 points)
  if (stats.engagementRate) {
    score += Math.min(stats.engagementRate * 200, 200);
  }

  // Cap at 1000
  score = Math.min(Math.round(score), 1000);

  // Determine rank
  let rank = "";
  let badge = "";
  let percentile = 0;

  if (score >= 900) {
    rank = "Giga Chad";
    badge = "👑";
    percentile = 99;
  } else if (score >= 750) {
    rank = "Based AF";
    badge = "🔥";
    percentile = 95;
  } else if (score >= 600) {
    rank = "OG";
    badge = "💎";
    percentile = 80;
  } else if (score >= 450) {
    rank = "Degen";
    badge = "🎲";
    percentile = 60;
  } else if (score >= 300) {
    rank = "Normie+";
    badge = "🌱";
    percentile = 40;
  } else {
    rank = "Normie";
    badge = "🐣";
    percentile = 20;
  }

  return { score, rank, badge, percentile };
}
