"use client"

import type React from "react"

import { LibraryIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { GoPlus } from "react-icons/go"
import { MdArrowForward } from "react-icons/md"
import { useRef, useState } from "react"
import { SidebarItem } from "@/components/sidebar-item"

const scrollbarStyles = `
  .spotify-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .spotify-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .spotify-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  .spotify-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

type SidebarProps = {}

const filterButtons = [
  { label: "Música", active: true },
  { label: "Podcasts y programas", active: false },
  { label: "Artistas", active: false },
  { label: "Álbumes", active: false },
]
//TODO: Implement the playlists API
const playlists = [
  {
    id: "1",
    title: "dreaming with",
    subtitle: "Playlist • franxo",
    imageUrl: "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/1",
  },
  {
    id: "2",
    title: "!dissociate",
    subtitle: "Playlist • franxo",
    imageUrl: "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/2",
  },
  // Add more playlists for demonstration
  {
    id: "3",
    title: "Chill Vibes",
    subtitle: "Playlist • franxo",
    imageUrl: "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/3",
  },
  {
    id: "4",
    title: "Focus Flow",
    subtitle: "Playlist • franxo",
    imageUrl: "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/4",
  },
  {
    id: "5",
    title: "Late Night Drive",
    subtitle: "Playlist • franxo",
    imageUrl: "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/5",
  },
]

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isLibraryActive, setIsLibraryActive] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const container = scrollContainerRef.current
    if (!container) return

    const scrollSpeed = 2
    container.scrollLeft -= e.movementX * scrollSpeed
  }

  return (
    <>
      <style jsx global>
        {scrollbarStyles}
      </style>
      <aside className="w-[313px] bg-neutral-900 flex flex-col h-full rounded-xl overflow-hidden">
        {/* Add shadow to the top section */}
        <div className="p-4 flex flex-col gap-4 relative shadow-md">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 hover:text-neutral-50 transition-colors cursor-pointer"
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

        {/* Update the content area with the spotify-scrollbar class and add the SidebarItem components */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 spotify-scrollbar">
          <div className="space-y-2 mt-2">
            {playlists.map((playlist) => (
              <SidebarItem
                key={playlist.id}
                title={playlist.title}
                subtitle={playlist.subtitle}
                imageUrl={playlist.imageUrl}
                href={playlist.href}
                isActive={playlist.id === "1"} // Just for demonstration
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

