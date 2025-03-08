'use client'
import { HomeContent } from "@/components/home-content"
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
    <HomeContent filterTabs={filterTabs} items={items} />
  )
}

