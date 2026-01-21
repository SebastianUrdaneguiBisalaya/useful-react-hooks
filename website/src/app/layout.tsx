import type { Metadata } from "next";
import { Sora, Reddit_Sans } from 'next/font/google';
import "./globals.css";

import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vibeHooks - Modern and unopinionated React hooks.",
  description: "Modern, unopinionated React hooks with a focus on developer experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${redditSans.variable} antialiased`}
      >
        <div className="max-w-3xl w-full min-h-screen h-full flex flex-col">
          {children}
          <Navigation />
          <Footer />
        </div>
      </body>
    </html>
  );
}
