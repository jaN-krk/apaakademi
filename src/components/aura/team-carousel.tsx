import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PersonCard } from "@/components/shared/person-card"
import type { PersonRecord } from "@/content/types"
import { cn } from "@/lib/utils"
type Props = {people:PersonRecord[];basePath:string;title?:string;subtitle?:string;className?:string}
function TeamCarousel({people,basePath,title="Ekibimiz",subtitle,className}:Props){
  const unique=Array.from(new Map(people.map(p=>[p.id,p])).values()).slice(0,3)
  if(!unique.length)return null
  return <section className={cn("border-y border-black/10 bg-white",className)}><div className="atlas-section">
    <div className="atlas-section-title"><div><p className="atlas-eyebrow">Birlikte üretiyoruz</p><h2>{title}</h2>{subtitle && <p className="mt-3 text-zinc-500">{subtitle}</p>}</div><Link href={basePath} className="atlas-text-link">Herkesle tanış<ArrowUpRight size={18}/></Link></div>
    <p className="mb-5 text-sm text-zinc-500">Kartları tutup hareket ettir. Profili için ismine dokun.</p>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{unique.map(person=><PersonCard key={person.id} person={person} href={basePath+"/"+person.slug}/>)}</div>
  </div></section>
}
export {TeamCarousel}

