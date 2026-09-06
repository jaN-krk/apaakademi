import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SceneSlider } from "@/components/shared/scene-slider"
import { cn } from "@/lib/utils"
export type CascadeImage={src:string;alt:string;label?:string}
type Props={title:string;titleLine2?:string;eyebrow?:string;description:string;primaryCta:{label:string;href:string;external?:boolean};secondaryCta?:{label:string;href:string;external?:boolean};images:CascadeImage[];className?:string}
function DashboardHero({title,titleLine2,eyebrow="APA / Atlas",description,primaryCta,secondaryCta,images,className}:Props){
 const slides=Array.from(new Map(images.map(i=>[i.src,{image:i.src,caption:i.label??i.alt}])).values())
 return <section className={cn("grid border-b border-black/15 lg:grid-cols-[.9fr_1.1fr]",className)}>
   <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:py-20"><p className="atlas-eyebrow">{eyebrow}</p><h1 className="text-5xl font-medium leading-[1.03] tracking-[-.05em] sm:text-6xl">{title}{titleLine2 && <><br/><span className="font-serif font-normal italic">{titleLine2}</span></>}</h1><p className="mt-7 max-w-lg text-base leading-relaxed text-zinc-600">{description}</p><div className="mt-8 flex flex-wrap gap-5">{[primaryCta,secondaryCta].filter(Boolean).map(c=><Link key={c!.href} href={c!.href} {...(c!.external?{target:"_blank",rel:"noopener noreferrer"}:{})} className="atlas-text-link">{c!.label}<ArrowUpRight size={20}/></Link>)}</div></div>
   <SceneSlider items={slides} className="h-[440px] sm:h-[580px] lg:h-full lg:min-h-[660px]"/>
 </section>
}
export {DashboardHero}

