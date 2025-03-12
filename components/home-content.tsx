"use client"

import { useRef, useState, useEffect } from "react"
import { TopHeader } from "@/components/top-header"
import { MainItem } from "@/components/main-item"
import { ListenedItem } from "@/components/listened-item"
import { cn } from "@/lib/utils"
import { FaChevronLeft } from "react-icons/fa"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

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

  const handleTabChange = (index: number) => {
    const newTabs = filterTabs.map((tab, i) => ({
      ...tab,
      active: i === index,
    }))
    setFilterTabs(newTabs)
    console.log(`Selected tab: ${filterTabs[index].label}`)
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8 // Scroll 80% of container width
    const newScrollPosition =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    setShowLeftScroll(container.scrollLeft > 20) // Show left button after scrolling a bit
    setShowRightScroll(container.scrollLeft < container.scrollWidth - container.clientWidth - 20) // Hide right button when near the end
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => window.removeEventListener("resize", handleScroll)
  }, [])

  return (
    <div className="flex flex-col h-full ">
      {/* Fixed header section with background color that changes based on scroll */}
      <div
        className={cn(
          "z-10  relative bg-neutral-700",
          "bg-neutral-900 sm:bg-neutral-900",
          "bg-neutral-900 md:bg-neutral-900",
          "lg:bg-neutral-700",
        )}
      >
        <TopHeader filterTabs={filterTabs} onTabChange={handleTabChange} />
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto spotify-scrollbar">
        <div /* aqui quiero q el padding sea 2 es para moviles debajo de la querie md */
          className={cn(
            "p-2 sm:p-4 md:p-6 lg:p-10 pt-4 lg:pt-6",
            "bg-neutral-900 md:bg-neutral-900", // Solid background on md and below
            "lg:bg-gradient-to-b lg:from-neutral-700 lg:via-neutral-700/80 lg:to-neutral-900",
          )}
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

        <div className="flex flex-col gap-4 md:gap-6 px-0 md:px-4 lg:px-[26px]">
          <section className="relative">
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 pl-2 md:pl-[8px] lg:pl-[14px]">
              Recently Listened
            </h2>

            {/* Navigation buttons - hidden on mobile */}
            <div className="hidden md:block">
              <button
                onClick={() => scroll("left")}
                className={cn(
                  "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-neutral-800/80 rounded-full p-2 text-neutral-50 cursor-pointer",
                  "hover:bg-neutral-700 transition-all",
                  !showLeftScroll && "opacity-0 pointer-events-none",
                )}
                aria-label="Scroll left"
              >
                <FiChevronLeft className="text-2xl" />

              </button>
              <button
                onClick={() => scroll("right")}
                className={cn(
                  "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-neutral-800/80 rounded-full p-2 text-neutral-50 cursor-pointer",
                  "hover:bg-neutral-700 transition-all",
                  !showRightScroll && "opacity-0 pointer-events-none",
                )}
                aria-label="Scroll right"
              >
                <FiChevronRight  className="text-2xl" />
              </button>
            </div>

            {/* Horizontal scrollable container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-2 md:gap-4 pb-4 no-scrollbar"
              onScroll={handleScroll}
            >
              {items.slice(0, 6).map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
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

