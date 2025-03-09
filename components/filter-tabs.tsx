"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface FilterTab {
  label: string
  active: boolean
}

interface FilterTabsProps {
  tabs: FilterTab[]
  onTabChange?: (index: number) => void
  isInHeader?: boolean
}

export function FilterTabs({ tabs: initialTabs, onTabChange, isInHeader = false }: FilterTabsProps) {
  const [tabs, setTabs] = useState<FilterTab[]>(initialTabs)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
        "flex items-center",
        !isInHeader && "py-3 sticky top-0 z-10 bg-gradient-to-b from-green-900/40 via-neutral-900/90 to-neutral-900",
      )}
    >
      <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(index)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
              tab.active ? "bg-white text-black" : "bg-neutral-50/10 text-white hover:bg-neutral-50/20",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

