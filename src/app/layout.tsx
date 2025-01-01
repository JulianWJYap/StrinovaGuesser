import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "./components/global/app-header";
import { NotificationProvider } from "./components/providers/notification-provider";
import Notification from "./components/global/notification";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.strinovaguesser.com`),
  title: "Strinova Guesser",
  description: "Guess a map in Strinova based on screenshots from the game!",
  keywords: "Strinova, Geoguesser, Geoguessr, Guessing, Game",
  alternates: {
    canonical: './',
  }
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
        <div className="flex flex-col h-screen transition-all duration-200 hover:shadow-custom-white">
          <NotificationProvider>
            <AppHeader />
            <main className="flex flex-col w-full h-full">
              {children}
            </main>
            <Notification/>
          </NotificationProvider>
        </div>
        <SpeedInsights/>
      </body>
    </html>
  );
}
