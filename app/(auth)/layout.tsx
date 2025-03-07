import type React from "react"
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-neutral-900 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl">{children}</div>
    </div>
  )
}

