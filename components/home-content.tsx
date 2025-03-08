"use client"

import { useState } from "react"
import { TopHeader } from "@/components/top-header"
import { MainItem } from "@/components/main-item"

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
    // Here you can add logic to filter content based on selected tab
  }

  return (
    <div className="flex flex-col gap-6 ">
      <TopHeader filterTabs={filterTabs} onTabChange={handleTabChange} />

      <div className="flex flex-col gap-6 p-0 md:p-0">
        <section>
          <h2 className="text-2xl font-bold mb-4 pl-[16px]">Escuchados recientemente</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
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

        <section>
          <h2 className="text-2xl font-bold mb-4">Hecho para ti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {/* TODO: aun no no toquemos esto */}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Hecho para ti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {/* TODO: aun no no toquemos esto */}
          </div>
        </section>
      </div>
    </div>
  )
}