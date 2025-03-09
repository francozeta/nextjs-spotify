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
          "w-full h-16 flex items-center transition-colors duration-300",
        )}
      >
        <div className="w-full pl-10">
          <FilterTabs tabs={filterTabs} onTabChange={onTabChange} isInHeader={true} />
        </div>
      </div>
    </>
  )
}


