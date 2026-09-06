"use client"
import { useMemo } from "react"
import { SceneSlider } from "@/components/shared/scene-slider"
import { cn } from "@/lib/utils"
export type MediaWallItem={id:string;image:string;title:string}
function DriftMediaWall({items,className,heightClassName}: {items:MediaWallItem[];className?:string;heightClassName?:string}){
 const slides=useMemo(()=>items.map(i=>({image:i.image,caption:i.title})),[items])
 return <SceneSlider items={slides} className={cn(heightClassName,className)}/>
}
export {DriftMediaWall}

