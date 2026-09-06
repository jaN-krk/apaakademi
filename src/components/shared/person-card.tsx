"use client"
import { Component, useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MoveUpRight } from "lucide-react"
import { PersonLanyard } from "@/components/shared/person-lanyard"
import { rolesLabel } from "@/lib/labels"
import { cn } from "@/lib/utils"
import type { PersonRecord } from "@/content/types"

class CardBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}> {
  state={failed:false}
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed ? this.props.fallback : this.props.children}
}
function PersonCard({ person, href, className }: { person: PersonRecord; href?: string; className?: string }) {
  const host=useRef<HTMLDivElement>(null)
  const [visible,setVisible]=useState(false)
  const role=person.roles.includes("instructor") ? rolesLabel(person.roles) : person.shortDescription && person.shortDescription.length < 45 ? person.shortDescription : rolesLabel(person.roles)
  useEffect(()=>{
    if(!host.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25})
    observer.observe(host.current)
    return ()=>observer.disconnect()
  },[])
  const fallback=<div className="person-card-fallback mx-auto flex h-full w-[66%] max-w-[280px] flex-col items-center pt-0">
    <div className="h-16 w-4 bg-zinc-900"/><div className="z-10 -mt-1 h-6 w-6 rounded-sm border-[5px] border-zinc-400"/>
    <div className="-mt-2 w-full rotate-[-3deg] overflow-hidden rounded-xl border-[6px] border-zinc-900 bg-white shadow-lg">
      <div className="relative aspect-[4/5] bg-zinc-100">{person.image?.src ? <Image src={person.image.src} alt={person.fullName} fill sizes="280px" className="object-cover object-top"/> : <div className="flex h-full items-center justify-center text-4xl">{person.fullName.split(" ").map(n=>n[0]).join("")}</div>}</div>
      <p className="bg-zinc-900 px-3 py-4 text-center text-base font-medium text-white">{person.fullName}</p>
    </div>
  </div>
  return <article className={cn("person-editorial-card min-w-0",className)}>
    <div ref={host} className="person-card-stage relative overflow-hidden" aria-label={person.fullName+" — hareketli askılı kart"}>
      <span className="person-card-stamp" aria-hidden="true">APA<span>ATLAS / İNSANLAR</span></span>
      {visible ? <CardBoundary fallback={fallback}><PersonLanyard fallback={fallback} frontImage={person.image?.src} name={person.fullName} caption={role} compact className="h-full"/></CardBoundary> : fallback}
      <span className="person-drag-hint" aria-hidden="true"><MoveUpRight size={13}/>Tut ve hareket ettir</span>
    </div>
    <div className="border-b border-black/20 py-5">
      {href ? <Link href={href} className="flex items-start justify-between gap-3 text-lg font-medium"><span>{person.fullName}</span><ArrowUpRight size={18} className="mt-1 shrink-0"/></Link> : <h3 className="text-lg font-medium">{person.fullName}</h3>}
      <p className="mt-2 text-sm text-zinc-500">{role}</p>
    </div>
  </article>
}
export { PersonCard }

