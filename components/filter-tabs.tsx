"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FilterTab {
  label: string
  active: boolean
}

interface FilterTabsProps {
  tabs: FilterTab[]
  onTabChange?: (index: number) => void
}

export function FilterTabs({ tabs: initialTabs, onTabChange }: FilterTabsProps) {
  const [tabs, setTabs] = useState<FilterTab[]>(initialTabs)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTabClick = (index: number) => {
    const newTabs = tabs.map((tab, i) => ({
      ...tab,
      active: i === index,
    }))

    setTabs(newTabs)
    onTabChange?.(index)
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-10 py-4 px-2 flex items-center transition-all duration-300",
        isScrolled ? "bg-neutral-900" : "bg-neutral-900",
      )}
    >
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(index)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
              tab.active ? "bg-white text-black" : "bg-neutral-800/80 text-white hover:bg-neutral-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

