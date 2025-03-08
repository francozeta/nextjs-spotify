"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FaPlay } from "react-icons/fa"
import { useState } from "react"

interface MainItemProps {
  title: string
  subtitle: string
  imageUrl: string
  href: string
  isActive?: boolean
}

export function MainItem({ title, subtitle, imageUrl, href, isActive = false }: MainItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-3 p-4 rounded-md transition-all duration-300 bg-neutral-900 hover:bg-neutral-800 group relative",
        "h-full max-w-[240px]",
        isActive && "bg-neutral-800",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-md shadow-lg">
        <Image src={imageUrl || "/placeholder.svg?height=200&width=200"} alt={title} fill className="object-cover" />
        <div
          className={cn(
            "absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg",
            "opacity-0 translate-y-4 scale-90",
            "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
            "transition-all duration-300 ease-out",
          )}
        >
          <FaPlay className="ml-1 text-black text-lg" />
        </div>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className={cn("text-base font-semibold line-clamp-1", isActive ? "text-white" : "text-neutral-100")}>
          {title}
        </h3>
        {subtitle && <p className="text-sm text-neutral-400 line-clamp-2 mt-1">{subtitle}</p>}
      </div>
    </Link>
  )
}

