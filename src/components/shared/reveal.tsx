"use client"
import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Keep content visible without JS; animate once only when motion is allowed. */
export function Reveal({children,className,delay=0}:{children:ReactNode;className?:string;delay?:number}){
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const element=ref.current
    if(!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return
      element.animate([{transform:"translateY(24px)",opacity:.55},{transform:"translateY(0)",opacity:1}],{duration:650,delay:delay*1000,easing:"cubic-bezier(.2,.65,.3,1)",fill:"backwards"})
      observer.disconnect()
    },{threshold:.12})
    observer.observe(element)
    return ()=>observer.disconnect()
  },[delay])
  return <div ref={ref} className={cn(className)}>{children}</div>
}

