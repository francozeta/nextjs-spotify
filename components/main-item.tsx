"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FaPlay  } from "react-icons/fa"
import { useState } from "react"

interface MainItemProps {
  title: string
  subtitle: string
  imageUrl: string
  href: string
  isActive?: boolean
}
// width aprox: 195.5, height aprox: 247.5

// cuando se expanda la pantalla que se adecue las proporciones del componente
// el hover del componente debe ser animado, que cumpla el mismo proposito de la animacion (subiendo hacia arriba la posicion predeterminada)
export function MainItem({ title, subtitle, imageUrl, href, isActive = false }: MainItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-2 p-3 rounded-md transition-all bg-neutral-900 hover:bg-neutral-800/80 group relative h-80",
        isActive && "bg-neutral-800",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-md shadow-md">
        <Image src={imageUrl || "/placeholder.svg?height=200&width=200"} alt={title} fill className="object-cover" />
        {isHovered && (
          <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <FaPlay   className="ml-1 text-black text-lg"  fill="black" />
            </div>
        )}
      </div>
      <div className="min-w-0">
        <h3 className={cn("text-base font-medium line-clamp-2", isActive ? "text-white" : "text-neutral-200")}>{title}</h3>
        <p className="text-sm text-neutral-400 line-clamp-2">{subtitle}</p>
      </div>
    </Link>
  )
}

