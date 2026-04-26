import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

export const viewport: Viewport = {
  themeColor: "#FF1480",
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Numonics + The Infinite | Drum & Bass",
  description:
    "Numonics + The Infinite is a Drum & Bass production duo delivering heavy basslines, relentless rhythms, and cinematic sound. Based between Dallas, TX and beyond.",
  keywords: [
    "Drum and Bass",
    "DnB",
    "music production",
    "Numonics",
    "The Infinite",
    "electronic music",
    "bass music",
    "DJ",
    "beats",
  ],
  authors: [{ name: "Numonics + The Infinite" }],
  creator: "Numonics + The Infinite",
  openGraph: {
    title: "Numonics + The Infinite | Drum & Bass",
    description: "Heavy basslines. Relentless rhythm. Pure Drum & Bass.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numonics + The Infinite | Drum & Bass",
    description: "Heavy basslines. Relentless rhythm. Pure Drum & Bass.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg selection:bg-accent selection:text-black">
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
