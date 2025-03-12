"use client"

import { cn } from "@/lib/utils"
import { FilterTabs } from "./filter-tabs"

interface TopHeaderProps {
  filterTabs: Array<{ label: string; active: boolean }>
  onTabChange?: (index: number) => void
}

export function TopHeader({ filterTabs, onTabChange }: TopHeaderProps) {
  return (
    <>
      <div
        className={cn(
          "w-full h-16 flex items-center",
        )}
      >
        <div className="w-full pl-2 sm:pl-4 md:pl-6 lg:pl-10">
          <FilterTabs tabs={filterTabs} onTabChange={onTabChange} isInHeader={true} />
        </div>
      </div>
    </>
  )
}


