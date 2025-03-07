import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css"
import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";
import { Player } from "@/components/shared/player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Spotify Clone | Next.js 15",
  description: "A Spotify clone with Next.js 15",
}

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
          <div className="flex-1 flex overflow-hidden bg-black px-2 pb-2 gap-2">
            <Sidebar />
            <main className="flex-1 rounded-xl bg-amber-500 overflow-hidden">
              <div className="h-full overflow-y-auto spotify-scrollbar p-2">{children}</div>
            </main>
          </div>
          <Player />
        </div>
      </body>
    </html>
  );
}
