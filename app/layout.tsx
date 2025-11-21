import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getBaseUrl } from "@/lib/url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Based ID - Your Farcaster Identity Card",
  description: "Discover your Based Score and rank on Farcaster!",
  manifest: `${baseUrl}/.well-known/farcaster.json`,
  openGraph: {
    title: "Based ID - Your Farcaster Identity Card",
    description: "Check your Based Score and get your identity card!",
    images: [`${baseUrl}/api/og`],
  },
  other: {
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: `${baseUrl}/api/og`,
      button: {
        title: "✨ Based ID",
        action: {
          type: "launch_frame",
          name: "Based ID",
          url: baseUrl,
          splashImageUrl: `${baseUrl}/icon.png`,
          splashBackgroundColor: "#1a1a1a"
        }
      }
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

