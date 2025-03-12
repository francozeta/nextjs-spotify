import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  title: string
  subtitle: string
  imageUrl: string
  href: string
  isActive?: boolean
}

export function SidebarItem({ title, subtitle, imageUrl, href, isActive = false }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-neutral-50/10",
        isActive && "bg-neutral-700/70 ",
      )}
    >
      <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-md">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={cn("text-sm font-medium truncate", isActive ? "text-white" : "text-neutral-200")}>{title}</h3>
        <p className="text-xs text-neutral-400 truncate">{subtitle}</p>
      </div>
    </Link>
  )
}

