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
    label: "Álbum",
    active: false,
  },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 flex flex-col h-full">
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

        {/* Filter buttons */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {filterButtons.map((button) => (
              <button
                key={button.label}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                  button.active
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white",
                )}
              >
                {button.label}
              </button>
            ))}
          </div>
          {/* Gradient overlay for scroll indication */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content section - to be filled later */}
      <div className="flex-1 overflow-y-auto">{/* Content will go here */}</div>
    </aside>
  )
}

