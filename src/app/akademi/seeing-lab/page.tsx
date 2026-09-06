import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import { PersonCard } from "@/components/shared/person-card"
import { getPublicInstructors } from "@/content"
import styles from "@/components/shared/editorial.module.css"
import { sources } from "@/content/sources"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Seeing Lab",description:"APA bünyesinde Deniz Telek koordinatörlüğünde sinema laboratuvarı.",path:"/akademi/seeing-lab"})
export default function SeeingLabPage(){const person=getPublicInstructors().find(p=>p.slug==="deniz-telek");return <div className={styles.shell}><PageIntro eyebrow="APA / Seeing Lab" title="Bakmak," emphasis="görmek, üretmek." description="Film gösterimleri, yönetmen söyleşileri ve uygulamalı programlarla sinema üzerine bir paylaşım alanı." parent={{href:"/akademi",label:"Akademi"}}/><div className={styles.columns}><div className={styles.body}><h2>Sinema üzerine birlikte düşünmek.</h2><p>Akademi bünyesinde Doç. Dr. Deniz Telek’in koordinatörlüğünde faaliyet gösteren Seeing Lab, sinemayı izleme, tartışma ve üretim süreçleriyle ele alır.</p><p>Güncel gösterimler, söyleşiler ve program duyuruları için Seeing Lab’in resmî hesabını takip edebilirsin.</p><a href={sources.seeingLab.url} target="_blank" rel="noopener noreferrer" className={styles.action}>@seeinglab<ArrowUpRight size={19}/></a></div>{person&&<div className="mx-auto w-full max-w-sm"><PersonCard person={person} href="/akademi/egitmenler/deniz-telek"/></div>}</div><NextStep eyebrow="Program" title="Seeing Lab’i daha yakından tanı." href="/akademi/programlar/seeing-lab" label="Program ayrıntıları"/></div>}
