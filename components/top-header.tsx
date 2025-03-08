// "use client"

// import { useState, useEffect } from "react"
// import { cn } from "@/lib/utils"
// import { FilterTabs } from "./filter-tabs"

// interface TopHeaderProps {
//   filterTabs: Array<{ label: string; active: boolean }>
//   onTabChange?: (index: number) => void
// }

// export function TopHeader({ filterTabs, onTabChange }: TopHeaderProps) {
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (typeof window !== "undefined") {
//         const scrollPosition = window.scrollY
//         setIsScrolled(scrollPosition > 64)
//       }
//     }

//     // Verificar si estamos en el cliente antes de agregar el event listener
//     if (typeof window !== "undefined") {
//       window.addEventListener("scroll", handleScroll, { passive: true })
//       // Ejecutar una vez al inicio para establecer el estado inicial
//       handleScroll()
//     }

//     return () => {
//       if (typeof window !== "undefined") {
//         window.removeEventListener("scroll", handleScroll)
//       }
//     }
//   }, [])

//   return (
//     <>
//       <div
//         className={cn(
//           "sticky top-0 z-10 w-full h-16 flex items-center transition-colors duration-300",
//           isScrolled ? "bg-neutral-700" : "bg-neutral-900",
//         )}
//       >
//         <div className="w-full pl-[16px]">
//           <FilterTabs tabs={filterTabs} onTabChange={onTabChange} isInHeader={true} />
//         </div>
//       </div>
//       {/* Spacer div to prevent content from going under the fixed header */}
//       <div className="pl-[16px]">{/* recently-listened-item.tsx  */}{isScrolled ? <>isScrolled</> : <>Is not Scrolled</>}</div>
//     </>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { FilterTabs } from "./filter-tabs"

interface TopHeaderProps {
  filterTabs: Array<{ label: string; active: boolean }>
  onTabChange?: (index: number) => void
}

export function TopHeader({ filterTabs, onTabChange }: TopHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Encontrar el contenedor con scroll (el elemento padre con overflow-y-auto)
    const findScrollContainer = () => {
      let element = headerRef.current

      while (element) {
        // Obtener el estilo computado del elemento
        const style = window.getComputedStyle(element)

        // Verificar si este elemento tiene overflow-y: auto o scroll
        if (style.overflowY === "auto" || style.overflowY === "scroll" || element === document.documentElement) {
          return element
        }

        element = element.parentElement
      }

      // Si no encontramos un contenedor específico, usamos el window
      return window
    }

    const scrollContainer = findScrollContainer()

    const handleScroll = () => {
      if (!headerRef.current) return

      // Si el contenedor es window, usamos window.scrollY
      const scrollPosition = scrollContainer === window ? window.scrollY : (scrollContainer as HTMLElement).scrollTop

      // Umbral más bajo para detectar el scroll más rápido
      setIsScrolled(scrollPosition > 20)

      // Debug
      console.log("Scroll position:", scrollPosition, "isScrolled:", scrollPosition > 20)
    }

    // Agregar el listener al contenedor correcto
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })

    // Ejecutar una vez al inicio
    handleScroll()

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <div
        ref={headerRef}
        className={cn(
          "sticky top-0 z-10 w-full h-16 flex items-center transition-colors duration-300",
          isScrolled ? "bg-neutral-700" : "bg-neutral-900",
        )}
      >
        <div className="w-full pl-[16px]">
          <FilterTabs tabs={filterTabs} onTabChange={onTabChange} isInHeader={true} />
        </div>
      </div>
      {/* Indicador de estado para debugging */}
      <div className="pl-[16px] text-white">{isScrolled ? "✅ isScrolled" : "❌ Is not Scrolleds"}</div>
    </>
  )
}


