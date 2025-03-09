"use client"

import { useState, useRef, useEffect } from "react"
import { TopHeader } from "@/components/top-header"
import { MainItem } from "@/components/main-item"
import { cn } from "@/lib/utils"
import { ListenedItem } from "./listened-item"

interface HomeContentProps {
  filterTabs: Array<{ label: string; active: boolean }>
  items: Array<{
    id: string
    title: string
    subtitle: string
    imageUrl: string
    href: string
  }>
}

export function HomeContent({ filterTabs: initialTabs, items }: HomeContentProps) {
  const [filterTabs, setFilterTabs] = useState(initialTabs)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (index: number) => {
    const newTabs = filterTabs.map((tab, i) => ({
      ...tab,
      active: i === index,
    }))
    setFilterTabs(newTabs)
    console.log(`Selected tab: ${filterTabs[index].label}`)
  }

  // Handle scroll detection in the scrollable container
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollPosition = scrollContainer.scrollTop
      const newIsScrolled = scrollPosition > 20
      setIsScrolled(newIsScrolled)
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    /* bg-gradient-to-b from-[#4f4320] via-neutral-900 to-neutral-900 bg-[10%] */
    <div className="flex flex-col h-full ">

      {/* Fixed header section with background color that changes based on scroll */}
      <div className={cn(
        "z-10 transition-colors duration-300  relative bg-neutral-700",
        "bg-neutral-900 sm:bg-neutral-900",
        "bg-neutral-900 md:bg-neutral-900",
        "lg:bg-neutral-700"
      )}>
        <TopHeader filterTabs={filterTabs} onTabChange={handleTabChange} />
      </div>

      {/* Scrollable content area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto spotify-scrollbar">
        {/* Recently listened section with responsive background - aqui es donde quisiera expandir un poquito mas el degrade del bg-neutral700*/}
        <div
          className={cn(
            "p-10 pt-6",
            "bg-neutral-900 md:bg-neutral-900", // Solid background on md and below
            "lg:bg-gradient-to-b lg:from-neutral-700 lg:via-neutral-700/80 lg:to-neutral-900")}
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {items.slice(0, 8).map((item) => (
              <ListenedItem
                key={`listened-${item.id}`}
                title={item.title}
                imageUrl={item.imageUrl}
                href={item.href}
                isActive={item.id === "1"}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 pl-4">Escuchados recientemente</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-y-4">
              {items.slice(0, 6).map((item) => (
                <div key={item.id} className="h-full">
                  <MainItem
                    title={item.title}
                    subtitle={item.subtitle}
                    imageUrl={item.imageUrl}
                    href={item.href}
                    isActive={item.id === "8"}
                  />
                </div>
              ))}
              {items.slice(0, 6).map((item) => (
                <div key={item.id} className="h-full">
                  <MainItem
                    title={item.title}
                    subtitle={item.subtitle}
                    imageUrl={item.imageUrl}
                    href={item.href}
                    isActive={item.id === "8"}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

