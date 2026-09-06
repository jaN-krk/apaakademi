"use client"
import { Component, useCallback, useState, type ReactNode } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false })

class LanyardBoundary extends Component<{children:ReactNode;onUnavailable:()=>void},{failed:boolean}> {
  state={failed:false}
  static getDerivedStateFromError(){return {failed:true}}
  componentDidCatch(){this.props.onUnavailable()}
  render(){return this.state.failed ? null : this.props.children}
}
type Props = { frontImage?: string | null; backImage?: string | null; lanyardImage?: string | null; className?: string; name?: string; caption?: string; compact?: boolean; fallback?:ReactNode }
function PersonLanyard({frontImage, backImage="/brand/academy/apa-supplied-dark.png", lanyardImage="/lanyard/lanyard.png", className, name, caption="Atlas", compact=false, fallback}:Props) {
  const [ready,setReady]=useState(false)
  const [unavailable,setUnavailable]=useState(false)
  const handleReady=useCallback(()=>setReady(true),[])
  const handleUnavailable=useCallback(()=>{setReady(false);setUnavailable(true)},[])
  return <div data-lanyard-state={unavailable ? "fallback" : ready ? "ready" : "loading"} className={cn("relative h-full w-full overflow-hidden", compact ? "min-h-0" : "min-h-[600px]", className)}>
    <div className={cn("absolute inset-0",ready&&"invisible")} aria-hidden={ready}>{fallback??<div className="mx-auto flex h-full max-w-[290px] flex-col items-center justify-center"><div className="w-3 flex-1 bg-black"/><div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border-[7px] border-zinc-900 bg-zinc-100">{frontImage && <Image src={frontImage} alt={name??"Atlas"} fill sizes="290px" className="object-cover object-top"/>}<span className="absolute inset-x-0 bottom-0 bg-black p-4 text-center text-white">{name}</span></div><div className="h-24"/></div>}</div>
    <div className={cn("absolute inset-0 transition-opacity duration-500",ready?"opacity-100":"pointer-events-none opacity-0")}>
      {!unavailable&&<LanyardBoundary onUnavailable={handleUnavailable}><Lanyard onReady={handleReady} onUnavailable={handleUnavailable} compact={compact} position={compact ? [0, .7, 21] : [0, .5, 23]} gravity={[0,-40,0]} fov={18} transparent frontImage={frontImage ?? null} backImage={backImage} imageFit="cover" lanyardImage={lanyardImage} lanyardWidth={1.15} brandLogo="/brand/academy/apa-supplied-light.png" name={name ?? null} caption={caption}/></LanyardBoundary>}
    </div>
  </div>
}
export { PersonLanyard }

