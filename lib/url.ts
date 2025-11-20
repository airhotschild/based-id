/**
 * Get the base URL for the application
 * Works in both development and production (Vercel)
 */
export function getBaseUrl(): string {
  // In development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // In production - use NEXT_PUBLIC_URL if set
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  }

  // On Vercel production (not preview)
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://based-id-puce.vercel.app';
  }

  // Fallback to Vercel URL for preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Final fallback
  return 'https://based-id-puce.vercel.app';
}
