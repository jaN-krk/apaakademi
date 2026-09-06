import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { InstagramShowcase } from "@/components/shared/instagram-showcase"
import { mediaItems } from "@/content"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Akademiden",description:"Atlas Performans Akademisi — atölyeler ve paylaşımlar.",path:"/akademi/medya"})
export default function AcademyMediaPage(){
 const ig=mediaItems.filter(m=>m.brand==="academy"&&m.platform==="instagram")
 return <div className="atlas-section"><div className="atlas-section-title"><div><p className="atlas-eyebrow">APA / Akademi</p><h1 className="text-5xl font-medium tracking-tight">Akademiden.</h1></div><Link className="atlas-text-link" href="/akademi/egitmenler">Eğitmenlerle tanış →</Link></div>
 <div className="mb-12 grid items-center gap-10 border-y border-black/15 py-10 md:grid-cols-[1fr_2fr]"><Image src="/brand/academy/apa-supplied-dark.png" alt="Atlas Performans Akademisi" width={447} height={447} className="w-full max-w-[280px]"/><div><h2 className="text-3xl">Stüdyodan, atölyeden, birlikte üretmekten.</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-500">Eğitim duyuruları ve akademiden güncel paylaşımlar için Atlas Performans ve Seeing Lab hesaplarını takip et.</p></div></div><InstagramShowcase items={ig}/></div>
}

