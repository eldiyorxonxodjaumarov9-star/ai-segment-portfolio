import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI SEGMENT — AI Content Creator & Video Editor",
  description:
    "AI yordamida kreativ video, reklama va viral kontent. Futuristik portfolio — motion, montaj va strategiya.",
  keywords: ["AI video", "video editor", "AI SEGMENT", "Uzbekistan", "motion design", "viral content"],
  openGraph: {
    title: "AI SEGMENT",
    description: "AI CONTENT CREATOR & VIDEO EDITOR — premium futuristik portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${syne.variable} h-full scroll-smooth`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
