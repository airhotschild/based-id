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

