"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { FilterTabs } from "./filter-tabs"

interface TopHeaderProps {
  filterTabs: Array<{ label: string; active: boolean }>
  onTabChange?: (index: number) => void
}

// TODO. scroll effect fails 
export function TopHeader({ filterTabs, onTabChange }: TopHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Improved scroll effect with throttling
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          setIsScrolled(scrollPosition > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "sticky top-0 z-10 w-full h-16 flex items-center transition-colors duration-300",
        isScrolled ? "bg-neutral-700" : "bg-neutral-900",
      )}
    >
      <div className="w-full px-4">
        <FilterTabs tabs={filterTabs} onTabChange={onTabChange} isInHeader={true} />
      </div>
    </div>
  )
}

