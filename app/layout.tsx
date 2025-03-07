import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "@/app/globals.css"
import { AuthProvider } from "@/components/auth-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Spotify Clone | Next.js 15",
  description: "A Spotify clone with Next.js 15",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

