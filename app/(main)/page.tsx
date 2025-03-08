'use client'
import { FilterTabs } from "@/components/filter-tabs"
import { MainItem } from "@/components/main-item"
import { useState } from "react"

// Datos de ejemplo para los filtros
const filterTabs = [
  { label: "Todo", active: true },
  { label: "Música", active: false },
  { label: "Podcasts", active: false },
]

// Datos de ejemplo para los elementos
const items = [
  {
    id: "1",
    title: "Playlist 1 lorem  ipsum dolor sit amet lorem ipsum dolor sit amet",
    subtitle: "Complete Discography Complete Discography ",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/artist/beach-house",
  },
  {
    id: "2",
    title: "Playlist 1",
    subtitle: "Complete Discography",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/artist/cocteau-twins",
  },
  {
    id: "3",
    title: "Playlist 1",
    subtitle: "Complete Discography",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/artist/aphex-twin",
  },
  {
    id: "4",
    title: "Playlist 1",
    subtitle: "",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/artist/piero-piccioni",
  },
  {
    id: "5",
    title: "Playlist 1",
    subtitle: "rock tranqui este viernes por la tardedd",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/daylist",
  },
  {
    id: "6",
    title: "Playlist 1",
    subtitle: "",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/pesos-divorciados",
  },
  {
    id: "7",
    title: "Sade",
    subtitle: "",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/artist/sade",
  },
  {
    id: "8",
    title: "dreaming with",
    subtitle: "Playlist • franxo",
    imageUrl:
      "https://avatars.githubusercontent.com/u/124936792?v=4",
    href: "/playlist/dreaming-with",
  },
]

export default function Home() {

  return (
    <div className="flex flex-col gap-6 p-6  ">
      <FilterTabs
        tabs={filterTabs}
        onTabChange={(index) => {
          console.log(`Selected tab: ${filterTabs[index].label}`)
          // Here you can add logic to filter content based on selected tab
        }}
      />

      <section>
        <h2 className="text-2xl font-bold mb-4">Escuchados recientemente</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {items.slice(0, 6).map((item) => (
            <MainItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              href={item.href}
              isActive={item.id === "8"}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Hecho para ti</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
 {/*          {items.slice(3).map((item) => (
            <MainItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              href={item.href}
            />
          ))} */}

          TODO: aun no no toquemos esto
        </div>
      </section>
    </div>
  )
}

