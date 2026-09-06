"use client"
import { useMemo } from "react"
import { SceneSlider } from "@/components/shared/scene-slider"
import type { MediaRecord } from "@/content/types"
function MediaGallery({ items, className }: {items:MediaRecord[];className?:string;columns?:boolean}){
  const slides=useMemo(()=>items.filter(i=>i.type==="image" && i.thumbnail?.src).map(i=>({image:i.thumbnail!.src!,caption:i.title})),[items])
  return <SceneSlider items={slides} className={className} fit="contain"/>
}
export {MediaGallery}

