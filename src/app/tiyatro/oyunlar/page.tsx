import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ProductionCard } from "@/components/theatre/production-card"
import { getArchiveProductions, getPublicProductions } from "@/content"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Oyunlar",description:"Atlas Tiyatro Araştırmaları repertuvarı ve oyun afişleri.",path:"/tiyatro/oyunlar"})
export default function ProductionsPage(){
 const current=getPublicProductions({currentOnly:true})
 const archive=getArchiveProductions()
 return <div className="atlas-section">
   <div className="atlas-section-title"><div><p className="atlas-eyebrow">Atlas Tiyatro Araştırmaları / Repertuvar</p><h1 className="text-5xl font-medium tracking-[-.05em] sm:text-7xl">Sahneden <span className="font-serif italic">izler.</span></h1><p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-500">Her oyunda başka bir arayış. Atlas’ın bugünü ve sahne geçmişi, {current.length+archive.length} yapımda bir araya geliyor.</p></div><Link href="/tiyatro/takvim" className="atlas-text-link">Gösterim takvimi<ArrowUpRight size={20}/></Link></div>
   <div className="my-10 flex gap-6 border-y border-black/15 py-5 text-sm"><a href="#sahnede" className="font-medium">Sahnede / {current.length}</a><a href="#arsiv" className="text-zinc-500">Arşiv / {archive.length}</a></div>
   <section id="sahnede" className="scroll-mt-28"><h2 className="mb-7 text-2xl">Sahnede</h2><div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{current.map(p=><ProductionCard key={p.id} production={p}/>)}</div></section>
   <section id="arsiv" className="mt-20 scroll-mt-28"><h2 className="mb-7 text-2xl">Oyun arşivi</h2><div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{archive.map(p=><ProductionCard key={p.id} production={p}/>)}</div></section>
 </div>
}

