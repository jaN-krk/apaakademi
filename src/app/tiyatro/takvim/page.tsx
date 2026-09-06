import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { TicketEventCard } from "@/components/theatre/ticket-event-card"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import styles from "@/components/shared/editorial.module.css"
import { getPastTheatreEvents, getUpcomingTheatreEvents } from "@/content"
import { sources } from "@/content/sources"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Takvim",description:"Atlas Tiyatro yaklaşan gösterimleri ve sahne takvimi arşivi.",path:"/tiyatro/takvim"})
export default function CalendarPage(){
  const upcoming=getUpcomingTheatreEvents(),past=getPastTheatreEvents()
  return <div className={styles.shell}>
    <PageIntro eyebrow="Atlas Tiyatro / Takvim" title="Bir akşamı" emphasis="tiyatroya ayır." description="Oyun, tarih ve sahne bilgileri bir arada. Bilet bağlantılarından gösterimin güncel ayrıntılarına ulaşabilirsin." parent={{href:"/tiyatro",label:"Tiyatro"}}/>
    <section><h2 className={styles.sectionTitle}>Yaklaşan gösterimler<span>{upcoming.length} GÖSTERİM</span></h2>
    {upcoming.length ? <div className="grid gap-8 lg:grid-cols-2">{upcoming.map(e=><TicketEventCard key={e.id} event={e}/>)}</div> : <div className={styles.empty}><CalendarDays/><div><h3>Yeni bir sahnede buluşmak üzere.</h3><p>Şu an listelenen yaklaşan gösterim bulunmuyor. Yeni tarih duyurularını Atlas Tiyatro’nun Instagram hesabından takip edebilirsin.</p><a href={sources.theatreInstagram.url} target="_blank" rel="noopener noreferrer" className={styles.action}>Duyuruları takip et<ArrowUpRight size={19}/></a></div></div>}
    </section>
    {past.length > 0 && <section className={styles.section}><h2 className={styles.sectionTitle}>Geçmiş buluşmalar<span>SAHNE ARŞİVİ</span></h2><div className="grid gap-8 lg:grid-cols-2">{past.map(e=><TicketEventCard key={e.id} event={e} archived/>)}</div></section>}
    <NextStep eyebrow="Repertuvar" title="Her oyunda başka bir dünya." href="/tiyatro/oyunlar" label="Oyun arşivini keşfet"/>
    <Link href="/tiyatro/iletisim" className="mt-6 inline-block text-sm text-neutral-500 underline underline-offset-4">Gösterimlerle ilgili bir sorun mu var? Bize ulaş.</Link>
  </div>
}
