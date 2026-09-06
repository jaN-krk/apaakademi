"use client"
import { useMemo } from "react"
import MorphSlider from "@/components/MorphSlider"
import { cn } from "@/lib/utils"
export type SceneSlide = { image: string; caption?: string }
export function SceneSlider({ items, className, fit = "cover" }: { items: SceneSlide[]; className?: string; fit?: "cover" | "contain" }) {
  const unique = useMemo(() => Array.from(new Map(items.filter(i => i.image).map(i => [i.image, i])).values()), [items])
  if (!unique.length) return null
  return <div className={cn("relative h-[420px] overflow-hidden bg-zinc-950 sm:h-[560px]", className)}>
    <MorphSlider key={unique.map(i => i.image).join("|")} items={unique} fit={fit} transition="melt" duration={1.15} intensity={0.3} aberration={0.08} drift={0} radius={0} showControls={unique.length > 1} showIndicators={unique.length > 1 && unique.length <= 8} />
  </div>
}

