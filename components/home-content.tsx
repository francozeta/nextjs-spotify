"use client"

import { useState, useRef, useEffect } from "react"
import { TopHeader } from "@/components/top-header"
import { MainItem } from "@/components/main-item"
import { cn } from "@/lib/utils"

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
      <div className={cn("z-10 transition-colors duration-300  relative", isScrolled ? "bg-[#4f4320]" : "bg-[#4f4320]")}>
        <TopHeader filterTabs={filterTabs} onTabChange={handleTabChange} />
      </div>

      {/* Scrollable content area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto spotify-scrollbar">
        {/* TODO: listened-item.tsx */}
        <div className="bg-gradient-to-b from-[#4f4320] via-neutral-900 to-neutral-900 bg-[10%] h-80" >
          aqui va el componente ListenedItem
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

