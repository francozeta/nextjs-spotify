import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";
import { Player } from "@/components/shared/player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <div className="h-screen flex flex-col">
          <Topbar />
          <div className="flex-1 flex overflow-hidden bg-black px-2 gap-2">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-black">
              <div className="p-2 bg-amber-500 rounded-xl overflow-hidden">{children}</div>
            </main>
          </div>
          <Player />
        </div>
      </body>
    </html>
  );
}
