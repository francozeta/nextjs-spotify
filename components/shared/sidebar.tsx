"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { VscLibrary } from "react-icons/vsc"
import { GoPlus } from "react-icons/go"
import { MdArrowForward } from "react-icons/md"
import { cn } from "@/lib/utils"

const filterButtons = [
  {
    label: "Playlists",
    active: true,
  },
  {
    label: "Artistas",
    active: false,
  },
  {
    label: "Álbumes",
    active: false,
  },
  {
    label: "Podcasts",
    active: false,
  },
]

export function   Sidebar() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const container = scrollContainerRef.current
    if (!container) return

    setStartX(e.pageX - container.offsetLeft)
    setScrollLeft(container.scrollLeft)

    // Change cursor while dragging
    container.style.cursor = "grabbing"
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    const container = scrollContainerRef.current
    if (!container) return

    // Reset cursor
    container.style.cursor = "grab"
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const container = scrollContainerRef.current
    if (!container) return

    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - startX) * 2 // Multiply by 2 for faster scrolling
    container.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    // Add mouseup event listener to window to handle mouseup outside the container
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      const container = scrollContainerRef.current
      if (container) {
        container.style.cursor = "grab"
      }
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  return (
    <aside className="w-[313px] bg-neutral-900 flex flex-col h-full rounded-xl">
      {/* Header section */}
      <div className="p-4 flex flex-col gap-4">
        {/* Library header */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
            <VscLibrary className="text-2xl" />
            <span className="text-sm font-bold">Tu biblioteca</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
              <GoPlus className="text-xl" />
            </button>
            <button className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
              <MdArrowForward className="text-xl" />
            </button>
          </div>
        </div>

        {/* Filter buttons with drag scroll */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className={cn(
              "flex gap-2 overflow-x-auto no-scrollbar scroll-smooth cursor-grab",
              isDragging && "cursor-grabbing",
            )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsDragging(false)}
          >
            {filterButtons.map((button) => (
              <button
                key={button.label}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors select-none",
                  button.active
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white",
                )}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content section - to be filled later */}
      <div className="flex-1 overflow-y-auto">{/* Content will go here */}</div>
    </aside>
  )
}

