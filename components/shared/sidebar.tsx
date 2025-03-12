"use client"

import type React from "react"

import { LibraryIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { MdArrowForward } from "react-icons/md"
import { useRef, useState, useEffect } from "react"
import { SidebarItem } from "@/components/sidebar-item"
import { AiOutlinePlus } from "react-icons/ai"
import { useIsMobile } from "@/hooks/use-mobile"
import { filterTabsSidebar, playlists } from "@/lib/constants"

type SidebarProps = {}

//TODO: Implement the playlists API


export const Sidebar: React.FC<SidebarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const isMobile = useIsMobile()

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return

    setIsDragging(true)
    setStartX(e.clientX)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return

    e.preventDefault()
    const x = e.clientX
    const walk = (startX - x) * 1.5 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft + walk
  }

  // Handle scroll event to add shadow when scrolled
  const handleScroll = () => {
    if (contentRef.current) {
      const scrollTop = contentRef.current.scrollTop
      setHasScrolled(scrollTop > 0)
    }
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    // Add global event listeners to handle mouse up outside the component
    document.addEventListener("mouseup", handleGlobalMouseUp)

    // Add scroll event listener to the content area
    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Hide sidebar completely on mobile
  if (isMobile) {
    return null
  }

  return (
    <>
      <aside
        className={cn(
          "bg-neutral-900 flex flex-col h-full rounded-xl overflow-hidden",
          isExpanded ? "w-[313px]" : "w-[72px]",
        )}
      >
        {/* Add shadow to the top section when scrolled */}
        <div
          className={cn(
            "p-4 flex flex-col gap-4 relative z-10 transition-shadow duration-200",
            hasScrolled && "shadow-[0_6px_10px_rgba(0,0,0,0.6)]",
          )}
        >
          <div className="flex items-center justify-between">
            <button
              className={cn(
                "flex items-center gap-2 text-neutral-400 hover:text-neutral-50 transition-colors cursor-pointer",
                !isExpanded && "justify-center w-full",
              )}
              onClick={toggleSidebar}
            >
              <LibraryIcon isActive={true} className="w-6 h-6" />
              {isExpanded && <span className="text-sm font-bold">Your library</span>}
            </button>
            {isExpanded && (
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <AiOutlinePlus className="text-2xl" />
                </button>
                <button className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <MdArrowForward className="text-2xl" />
                </button>
              </div>
            )}
          </div>

          {isExpanded && (
            <div
              className="relative"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsDragging(false)}
            >
              <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                {filterTabsSidebar.map((button) => (
                  <button
                    key={button.label}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors select-none cursor-pointer",
                      button.active
                        ? "bg-neutral-800 text-white hover:bg-neutral-50/20"
                        : "bg-neutral-50/10 text-neutral-50 hover:bg-neutral-50/20 hover:text-white",
                    )}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
            </div>
          )}
        </div>

        {/* Content area with playlist items */}
        <div ref={contentRef} className="flex-1 overflow-y-auto px-2 pb-4 spotify-scrollbar">
          <div className={cn("mt-2", !isExpanded && "flex flex-col items-center")}>
            {playlists.map((playlist) =>
              isExpanded ? (
                <SidebarItem
                  key={playlist.id}
                  title={playlist.title}
                  subtitle={playlist.subtitle}
                  imageUrl={playlist.imageUrl}
                  href={playlist.href}
                  isActive={playlist.id === "1"} // Just for demonstration
                />
              ) : (
                <div key={playlist.id} className="w-12 h-12 rounded-md overflow-hidden mb-2">
                  <a href={playlist.href}>
                    <img
                      src={playlist.imageUrl || "/placeholder.svg"}
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              ),
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

