"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { ProgramRecord } from "@/content/types"
import styles from "./home.module.css"

type PathProgram = Pick<ProgramRecord, "id" | "slug" | "title" | "category" | "shortDescription" | "applicationStatus" | "totalHours" | "durationWeeks">
const paths = [
  {id:"acting", label:"Oyunculuk", number:"01", title:"Bir karaktere yaklaşmak.", description:"Oyunculuk pratiği, metinle çalışma ve sahnede yeni olasılıklar. Uzun dönemli eğitimden odaklı atölyelere.", categories:["acting", "masterclass"]},
  {id:"writing", label:"Yazı", number:"02", title:"Bir fikre biçim vermek.", description:"Bir hikâyenin ilk fikrinden karakterlerine ve diyaloglarına; yazının yapısını birlikte araştırmak.", categories:["writing"]},
  {id:"cinema", label:"Sinema", number:"03", title:"Bir başka gözle bakmak.", description:"Kısa film üretimi, gösterimler ve yönetmen buluşmaları. Görüntüyle düşünmek için bir çalışma alanı.", categories:["cinema", "lab"]},
]

export function AcademyPaths({programs}:{programs:PathProgram[]}) {
  return <Tabs defaultValue="acting" className={styles.paths}>
    <TabsList className={styles.pathTabs} aria-label="Çalışmak istediğin alan" variant="line">
      {paths.map(path=><TabsTrigger key={path.id} value={path.id} className={styles.pathTab}><span>{path.number}</span>{path.label}<ArrowUpRight size={18}/></TabsTrigger>)}
    </TabsList>
    {paths.map(path=><TabsContent key={path.id} value={path.id} className={styles.pathContent}>
      <div className={styles.pathIntro}><span className={styles.eyebrow}>APA / {path.label}</span><h3>{path.title}</h3><p>{path.description}</p><Link href="/akademi/programlar" className={styles.textLink}>Tüm programları incele<ArrowUpRight size={18}/></Link></div>
      <div className={styles.pathPrograms}>{programs.filter(program=>path.categories.includes(program.category)).map(program=><Link key={program.id} href={"/akademi/programlar/"+program.slug} className={styles.pathProgram}>
        <span className={styles.programStatus}>{program.applicationStatus === "completed" ? "Geçmiş program" : program.applicationStatus === "open" ? "Başvuruya açık" : "Bilgi al"}{program.totalHours ? ` · ${program.totalHours} saat` : ""}</span>
        <div><h4>{program.title}</h4><ArrowUpRight size={22}/></div>
        <p>{program.shortDescription}</p>
      </Link>)}</div>
    </TabsContent>)}
    <p className={styles.applicationNote}>Geçmiş atölyeler de bu seçkide yer alır. Yeni dönem tarihleri ve katılım koşulları için <Link href="/akademi/iletisim">APA ile iletişime geç<ArrowUpRight size={14}/></Link>.</p>
  </Tabs>
}
