"use client"

import { FaSpotify } from "react-icons/fa"
import { GoHome } from "react-icons/go"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BiSearch } from "react-icons/bi"
import { BsVinyl } from "react-icons/bs"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut, signIn } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Topbar() {
  const { data: session } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
              <BiSearch className="text-neutral-400 text-xl" />
            </div>
            <input
              type="text"
              placeholder="¿Qué quieres reproducir?"
              className="bg-transparent text-sm text-white py-2 px-2 w-full focus:outline-none"
            />
            <div className="flex items-center">
              <div className="w-[1px] h-6 bg-neutral-700 mx-1"></div>
              <button className="p-2 hover:text-white text-neutral-400 cursor-pointer">
                <BsVinyl className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <button className="p-1 cursor-pointer">
            <IoMdNotificationsOutline className="text-2xl" />
          </button>

          {session?.user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="bg-[#121212] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer overflow-hidden hover:scale-105 transition-transform"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image || "/placeholder.svg"}
                    alt={session.user.name || "Usuario"}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
              </button>

              {/* Menú desplegable */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#282828] ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        signOut()
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3E3E3E] transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => signIn("spotify")}
              className="bg-white text-black hover:bg-neutral-200 px-4 py-1 rounded-full text-sm font-medium"
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

