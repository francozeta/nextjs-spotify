'use client'
import { HomeContent } from "@/components/home-content"
import {  filterTabsContent, homeItems } from "@/lib/constants"


// Datos de ejemplo para los filtros


// Datos de ejemplo para los elementos


export default function Home() {

  return (
    <HomeContent filterTabs={filterTabsContent} items={homeItems} />
  )
}

