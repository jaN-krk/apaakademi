import type { Metadata } from "next"
import { ArrowUpRight, Mic2 } from "lucide-react"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import styles from "@/components/shared/editorial.module.css"
import { sources } from "@/content/sources"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"APA Talks",description:"APA vodcast ve disiplinlerarası buluşma serisi.",path:"/akademi/apa-talks",noIndex:true})
export default function ApaTalksPage(){return <div className={styles.shell}><PageIntro eyebrow="APA / Talks" title="Bir soru," emphasis="yeni bir sohbet." description="Farklı disiplinlerden sanatçılar ve akademisyenlerle planlanan vodcast ve buluşma serisi." parent={{href:"/akademi",label:"Akademi"}}/><div className={styles.empty}><Mic2/><div><h3>Yayın akışı henüz listelenmiyor.</h3><p>Bölüm ve buluşma duyurularını APA’nın Instagram hesabından takip edebilirsin.</p><a href={sources.academyInstagram.url} target="_blank" rel="noopener noreferrer" className={styles.action}>APA duyuruları<ArrowUpRight size={18}/></a></div></div><NextStep eyebrow="Bu sırada" title="Akademiyi keşfetmeye devam et." href="/akademi/programlar" label="Eğitimleri incele"/></div>}
