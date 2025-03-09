"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FaPlay } from "react-icons/fa"
import { useState } from "react"

interface ListenedItemProps {
  title: string
  imageUrl: string
  href: string
  isActive?: boolean
}

export function ListenedItem({ title, imageUrl, href, isActive = false }: ListenedItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center sm:gap-2 gap-3 rounded-[5px] transition-all duration-300 bg-neutral-50/10 hover:bg-neutral-50/20 group relative",
        "h-full w-full overflow-hidden",
        /*  isActive && "bg-neutral-800", */
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-[48px] w-[48px] min-w-[48px] overflow-hidden shadow-lg">
        <Image src={imageUrl || "/placeholder.svg?height=48&width=48"} alt={title} fill className="object-cover" />
      </div>

      {/* Text content */}
      <div className="flex flex-col min-w-0 flex-1 pr-12 sm:pr-3 md:pr-5 lg:pr-12">
        <h3
          className={cn(
            "text-xs sm:text-sm md:text-sm font-semibold line-clamp-2",
            isActive ? "text-white" : "text-neutral-100",
          )}
        >
          {title}
        </h3>
      </div>

      {/* Play button that appears on hover - positioned absolutely */}
      <div
        className={cn(
          "absolute right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg",
          "scale-0",
          "group-hover:scale-100 hidden lg:flex",
          "",
        )}
      >
        <FaPlay className="ml-0.5 text-black text-xs sm:text-sm" />
      </div>
    </Link>
  )
}

