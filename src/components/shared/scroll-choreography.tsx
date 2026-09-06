"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Animate content once, without making the document depend on animation to be readable. */
export function ScrollChoreography() {
  const pathname=usePathname()
  useEffect(()=>{
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)")
    if(preference.matches)return
    const seen=new WeakSet<Element>()
    const animations=new Set<Animation>()
    const observer=new IntersectionObserver(entries=>{
      entries.filter(entry=>entry.isIntersecting).forEach((entry,index)=>{
        const element=entry.target
        observer.unobserve(element)
        const animation=element.animate([
          {opacity:.15,transform:"translateY(32px)",filter:"blur(5px)"},
          {opacity:1,transform:"translateY(0)",filter:"blur(0)"}
        ],{duration:950,delay:Math.min(index,3)*65,easing:"cubic-bezier(.16,1,.3,1)",fill:"backwards"})
        animations.add(animation)
        animation.onfinish=()=>animations.delete(animation)
      })
    },{threshold:.15})
    const discover=()=>document.querySelectorAll("main h1:not(#opening-title), main h2, main [data-reveal]").forEach(element=>{
      if(seen.has(element))return
      seen.add(element);observer.observe(element)
    })
    discover()
    const changes=new MutationObserver(discover)
    changes.observe(document.body,{childList:true,subtree:true})
    const stop=()=>{if(preference.matches){observer.disconnect();animations.forEach(animation=>animation.cancel())}}
    preference.addEventListener("change",stop)
    return ()=>{observer.disconnect();changes.disconnect();animations.forEach(animation=>animation.cancel());preference.removeEventListener("change",stop)}
  },[pathname])
  return null
}
