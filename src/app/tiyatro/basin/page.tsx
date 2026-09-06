import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import styles from "@/components/shared/editorial.module.css"

import { createMetadata } from "@/lib/seo"
import { sources } from "@/content/sources"

export const metadata: Metadata = createMetadata({
  title: "Basında Atlas",
  description: "Atlas Tiyatro hakkında röportajlar, eleştiriler ve haberler.",
  path: "/tiyatro/basin",
})

const press = [
  {
    title: "Sercan Özinan röportajı — Mimesis",
    url: sources.mimesisInterview.url,
  },
  {
    title: "Sercan Özinan röportajı — Gazete Duvar",
    url: "https://www.gazeteduvar.com.tr/sercan-ozinan-dublorun-dilemmasini-okuyunca-heyecanlandim-haber-1758912",
  },
  {
    title: "Şalom — Uysal Kadın",
    url: sources.uysalSalom.url,
  },
  {
    title: "Tiyatro Dergisi — sezon haberleri",
    url: sources.sezuanSeason.url,
  },
]

export default function PressPage() {
  return <div className={styles.shell}>
    <PageIntro eyebrow="Atlas Tiyatro / Basın" title="Sahnenin" emphasis="dışından sesler." description="Röportajlar, oyun yazıları ve Atlas’ın basındaki izleri." parent={{href:"/tiyatro",label:"Tiyatro"}}/>
    <div className={styles.list}>{press.map((item,i)=><a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.listRow}><span>0{i+1}</span><div><h2>{item.title}</h2><p>Yazıyı yayıncının sitesinde oku</p></div><ArrowUpRight size={22}/></a>)}</div>
    <NextStep eyebrow="Repertuvar" title="Bir de sahneden bak." href="/tiyatro/oyunlar" label="Oyunları keşfet"/>
  </div>
}
