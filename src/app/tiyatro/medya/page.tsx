import type { Metadata } from "next"
import Link from "next/link"
import { MediaGallery } from "@/components/shared/media-gallery"
import { InstagramShowcase } from "@/components/shared/instagram-showcase"
import { SectionHeading } from "@/components/shared/section-heading"
import { getPublicMedia, mediaItems } from "@/content"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Sahne görselleri",description:"Atlas Tiyatro oyunlarından sahne fotoğrafları.",path:"/tiyatro/medya"})
export default function TheatreMediaPage(){
 const media=getPublicMedia("theatre").filter(m=>m.type==="image"&&m.thumbnail?.src)
 const ig=mediaItems.filter(m=>m.brand==="theatre"&&m.platform==="instagram")
 return <div className="atlas-section space-y-12"><SectionHeading eyebrow="Atlas / Sahne arşivi" title="Sahnenin içinden." description="Provalardan ve oyunlarımızdan fotoğraflar."/><MediaGallery items={media}/><div className="flex justify-between gap-5 border-y py-5"><Link href="/tiyatro/ekip" className="atlas-text-link">Ekiple tanış →</Link><Link href="/tiyatro/oyunlar" className="atlas-text-link">Oyun afişleri →</Link></div><InstagramShowcase items={ig}/></div>
}

