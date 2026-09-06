"use client"
import { useCallback, useState, type ReactNode } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false })
type Props = { frontImage?: string | null; backImage?: string | null; lanyardImage?: string | null; className?: string; name?: string; caption?: string; compact?: boolean; fallback?:ReactNode }
function PersonLanyard({frontImage, backImage="/brand/academy/apa-supplied-dark.png", lanyardImage="/lanyard/lanyard.png", className, name, caption="Atlas", compact=false, fallback}:Props) {
  const [ready,setReady]=useState(false)
  const handleReady=useCallback(()=>setReady(true),[])
  return <div className={cn("relative h-full w-full overflow-hidden", compact ? "min-h-0" : "min-h-[600px]", className)}>
    {!ready && <div className="absolute inset-0" aria-hidden="true">{fallback??<div className="mx-auto flex h-full max-w-[290px] flex-col items-center justify-center"><div className="w-3 flex-1 bg-black"/><div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border-[7px] border-zinc-900 bg-zinc-100">{frontImage && <Image src={frontImage} alt="" fill sizes="290px" className="object-cover object-top"/>}<span className="absolute inset-x-0 bottom-0 bg-black p-4 text-center text-white">{name}</span></div><div className="h-24"/></div>}</div>}
    <div className={cn("absolute inset-0 transition-opacity duration-500",ready?"opacity-100":"pointer-events-none opacity-0")}>
      <Lanyard onReady={handleReady} compact={compact} position={compact ? [0, .7, 21] : [0, .5, 23]} gravity={[0,-40,0]} fov={18} transparent frontImage={frontImage ?? null} backImage={backImage} imageFit="cover" lanyardImage={lanyardImage} lanyardWidth={1.15} brandLogo="/brand/academy/apa-supplied-light.png" name={name ?? null} caption={caption}/>
    </div>
  </div>
}
export { PersonLanyard }

