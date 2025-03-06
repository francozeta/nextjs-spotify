import { FaSpotify } from "react-icons/fa"
import { GoHome } from "react-icons/go"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FaArrowDown } from "react-icons/fa6"
import { BiSearch } from "react-icons/bi"
import { BsVinyl } from "react-icons/bs"
import Link from "next/link"

export function Topbar() {
  return (
    <header className="h-16 bg-black text-white flex items-center px-4">
      <div className="flex items-center w-full gap-2">
        {/* Left section - Logo */}
        <Link href="/" className="text-white mr-2">
          <FaSpotify className="text-[29px]" />
        </Link>

        {/* Home icon */}
        <Link href="/" className="bg-[#121212] p-2 rounded-full mr-2">
          <GoHome className="text-2xl" />
        </Link>

        {/* Search bar */}
        <div className="relative max-w-[400px]">
          <div className="flex items-center bg-[#242424] rounded-full overflow-hidden p-[2px]">
            <div className="flex items-center pl-3">
              <BiSearch className="text-neutral-400 text-lg" />
            </div>
            <input
              type="text"
              placeholder="¿Qué quieres reproducir?"
              className="bg-transparent text-sm text-white py-2 px-2 w-full focus:outline-none"
            />
            <div className="flex items-center">
              <div className="w-[1px] h-6 bg-neutral-700 mx-1"></div>
              <button className="p-2 hover:text-white text-neutral-400">
                <BsVinyl className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <button className="bg-[#121212] text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <FaArrowDown className="text-xs" />
            <span>Instalar aplicación</span>
          </button>
          <button className="p-1">
            <IoMdNotificationsOutline className="text-2xl" />
          </button>
          <button className="bg-[#121212] rounded-full w-8 h-8 flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/124936792?v=4"
              alt="User profile"
              className="w-7 h-7 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

