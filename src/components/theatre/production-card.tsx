import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ProductionRecord } from "@/content/types"
import { cn } from "@/lib/utils"
function ProductionCard({ production, className }: { production: ProductionRecord; className?: string }) {
  const href = production.status === "needsVerification" ? production.sourceUrl : "/tiyatro/oyunlar/" + production.slug
  return <article className={cn("group flex h-full flex-col", className)}>
    <Link href={href} className="relative block aspect-[400/574] overflow-hidden bg-zinc-100">
      {production.image?.src ? <Image src={production.image.src} alt={production.imageAlt ?? production.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain transition-transform duration-700 group-hover:scale-[1.025]"/> : <span className="flex h-full items-center justify-center p-8 text-center text-2xl">{production.title}</span>}
    </Link>
    <div className="flex flex-1 flex-col border-b border-black/20 py-5">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs text-zinc-500">{production.year ?? "REPERTUVAR"}<span className="h-px w-5 bg-zinc-300"/>{production.isCurrent ? "SAHNEDE" : "ARŞİV"}</p>
      <Link href={href} className="flex items-start justify-between gap-4"><h3 className="text-xl font-medium sm:text-2xl">{production.title}</h3><ArrowUpRight size={20} className="mt-1 shrink-0"/></Link>
      {production.shortDescription && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-500">{production.shortDescription}</p>}
    </div>
  </article>
}
export { ProductionCard }

