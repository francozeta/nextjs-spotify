"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { GoPlus } from "react-icons/go"
import { MdArrowForward } from "react-icons/md"
import { cn } from "@/lib/utils"
import { LibraryIcon } from "@/components/icons"

const filterButtons = [
  { label: "Playlists", active: true },
  { label: "Artistas", active: false },
  { label: "Álbumes", active: false },
  { label: "Podcasts", active: false },
]

export function Sidebar() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isLibraryActive, setIsLibraryActive] = useState(true)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const container = scrollContainerRef.current
    if (!container) return

    setStartX(e.pageX - container.offsetLeft)
    setScrollLeft(container.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const container = scrollContainerRef.current
    if (!container) return

    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - startX) * 2
    container.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  return (
    <aside className="w-[313px] bg-neutral-900 flex flex-col h-full rounded-xl overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-2  hover:text-neutral-50 transition-colors cursor-pointer"
            onClick={() => setIsLibraryActive(!isLibraryActive)}
          >
            <LibraryIcon
              isActive={isLibraryActive}
              className={cn("w-6 h-6", isLibraryActive ? "text-white" : "text-neutral-400")}
            />
            <span className="text-sm font-bold">Tu biblioteca</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <GoPlus className="text-2xl" />
            </button>
            <button className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <MdArrowForward className="text-2xl" />
            </button>
          </div>
        </div>

        <div
          className="relative"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {filterButtons.map((button) => (
              <button
                key={button.label}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors select-none cursor-pointer",
                  button.active
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white",
                )}
              >
                {button.label}
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis unde possimus dignissimos. Laboriosam commodi doloribus, repudiandae fugiat voluptates, fuga et, mollitia quae quibusdam necessitatibus accusamus ipsa inventore numquam reprehenderit.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis similique nulla assumenda ipsum eius earum? Veritatis, nisi? Nobis ea quos unde ipsam temporibus maxime, sunt quae veritatis officia earum.
      </div>
    </aside>
  )
}

