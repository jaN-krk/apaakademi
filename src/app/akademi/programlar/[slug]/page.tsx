import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import { PersonCard } from "@/components/shared/person-card"
import { ProgramCard } from "@/components/academy/program-card"
import styles from "@/components/shared/editorial.module.css"
import { getProgramBySlug, getPublicPrograms, getPublicInstructors } from "@/content"
import { applicationStatusLabel, experienceLevelLabel, programCategoryLabel, programFormatLabel } from "@/lib/labels"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"
type Props={params:Promise<{slug:string}>}
export async function generateStaticParams(){return getPublicPrograms().map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=getProgramBySlug(slug);return p?createMetadata({title:p.title,description:p.shortDescription??p.title,path:`/akademi/programlar/${p.slug}`}):{}}
export default async function ProgramDetailPage({params}:Props){
  const {slug}=await params,program=getProgramBySlug(slug)
  if(!program)notFound()
  const people=getPublicInstructors().filter(p=>(program.instructors??[]).includes(p.id))
  const related=getPublicPrograms().filter(p=>p.id!==program.id).sort((a,b)=>Number(b.category===program.category)-Number(a.category===program.category)).slice(0,3)
  const archived=program.applicationStatus==="completed"
  const courseJsonLd={"@context":"https://schema.org","@type":"Course",name:program.title,description:program.shortDescription,provider:{"@type":"EducationalOrganization",name:siteConfig.brands.academy.name,url:`${siteConfig.url}/akademi`},url:`${siteConfig.url}/akademi/programlar/${program.slug}`}
  return <article className={styles.shell}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(courseJsonLd)}}/>
    <PageIntro eyebrow={"APA / "+programCategoryLabel(program.category)} title={program.title} description={program.shortDescription} parent={{href:"/akademi/programlar",label:"Eğitimler"}}/>
    <div className={styles.columns}>
      <div><div className={styles.body}><h2>Program hakkında</h2>{program.fullDescription && <p>{program.fullDescription}</p>}</div>
        <dl className={styles.facts}>
          <div><dt>Program durumu</dt><dd>{applicationStatusLabel(program.applicationStatus)}</dd></div>
          {program.format && program.format!=="unknown" && <div><dt>Katılım</dt><dd>{programFormatLabel(program.format)}</dd></div>}
          {program.durationWeeks && <div><dt>Süre</dt><dd>{program.durationWeeks} hafta</dd></div>}
          {program.totalHours && <div><dt>Toplam çalışma</dt><dd>{program.totalHours} saat</dd></div>}
          {experienceLevelLabel(program.experienceLevel) && program.experienceLevel!=="unknown" && <div><dt>Deneyim</dt><dd>{experienceLevelLabel(program.experienceLevel)}</dd></div>}
          {program.scheduleSummary && <div className={styles.factsWide}><dt>{archived?"Arşiv programının takvimi":"Program takvimi"}</dt><dd>{program.scheduleSummary}</dd></div>}
        </dl>
      </div>
      <aside className={styles.sticky}><div className={styles.darkPanel}><p className={styles.eyebrow}>{archived?"Eğitim arşivinden":"Bir sonraki adım"}</p><h2>{archived?"Yeni dönem için konuşalım.":"Merakını bir adım ileri taşı."}</h2><p className={styles.muted}>{archived?"Bu çalışma daha önce gerçekleşti. Yeni dönem ve benzer eğitimler hakkında APA’dan bilgi alabilirsin.":"Güncel takvim, içerik ve katılım koşulları için APA ekibiyle iletişime geç."}</p><Link href={`/akademi/basvuru?program=${program.slug}`} className={styles.action}>Bu program hakkında bilgi al<ArrowUpRight size={19}/></Link></div>
        <a href={program.ticketUrl??program.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between gap-5 px-1 text-sm text-neutral-500">Programın duyuru sayfası<ArrowUpRight size={16}/></a>
      </aside>
    </div>
    {people.length>0 && <section className={styles.section}><h2 className={styles.sectionTitle}>Birlikte çalışacağın eğitmenler<span>APA</span></h2><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{people.map(person=><PersonCard key={person.id} person={person} href={"/akademi/egitmenler/"+person.slug}/>)}</div></section>}
    {related.length>0 && <section className={styles.section}><h2 className={styles.sectionTitle}>Keşfetmeye devam et</h2><div className="grid gap-6 md:grid-cols-3">{related.map(p=><ProgramCard key={p.id} program={p}/>)}</div></section>}
    <NextStep eyebrow="Eğitim rotası" title="İlgi alanına göre bir başlangıç bul." href="/akademi#egitim-rotasi" label="Eğitimleri filtrele"/>
  </article>
}
