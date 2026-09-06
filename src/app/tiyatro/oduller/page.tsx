import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { getPublicAwards } from "@/content"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import styles from "@/components/shared/editorial.module.css"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Ödüller",description:"Atlas Tiyatro yapımları ve sanatçılarının ödülleri.",path:"/tiyatro/oduller"})
export default function AwardsPage(){const awards=getPublicAwards();return <div className={styles.shell}><PageIntro eyebrow="Atlas Tiyatro / Ödüller" title="Birlikte üretilen," emphasis="birlikte paylaşılan." description="Atlas’ın oyunları ve sanatçılarının ödül kayıtları." parent={{href:"/tiyatro",label:"Tiyatro"}}/><div className={styles.list}>{awards.map(a=><a key={a.id} href={a.officialSourceUrl} target="_blank" rel="noopener noreferrer" className={styles.listRow}><span>{a.year}</span><div><p className="!mt-0 !mb-3">{a.awardBody}</p><h2>{a.category??a.title}</h2><p>{a.recipient}</p>{a.shortDescription&&<p>{a.shortDescription}</p>}</div><ArrowUpRight size={22}/></a>)}</div><NextStep eyebrow="Oyunlar" title="Hikâyenin sahnedeki hâli." href="/tiyatro/oyunlar" label="Repertuvarı keşfet"/></div>}
