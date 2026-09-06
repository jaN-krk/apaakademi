import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ApplicationForm } from "@/components/forms/application-form"
import { PageIntro } from "@/components/shared/page-intro"
import styles from "@/components/shared/editorial.module.css"
import { getAcademyContact, getPublicPrograms } from "@/content"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Başvuru",description:"APA eğitimleri için başvuru ve bilgi alma yolları.",path:"/akademi/basvuru"})
export default async function ApplicationPage({searchParams}:{searchParams:Promise<{program?:string}>}){
  const query=await searchParams
  const programs=getPublicPrograms(),contact=getAcademyContact()
  const selected=programs.find(p=>p.slug===query.program)
  const online=Boolean(process.env.APPLICATION_WEBHOOK_URL)
  const subject=selected ? `APA — ${selected.title}` : "APA — Eğitimler hakkında bilgi"
  const message=`Merhaba, ${selected ? selected.title+" programı" : "APA eğitimleri"} hakkında bilgi almak istiyorum.`
  const email=contact?.email
  return <div className={styles.shell}>
    <PageIntro eyebrow="APA / Başvuru" title="İlk adımı" emphasis="birlikte atalım." description="İlgilendiğin eğitimi paylaş. Programın içeriği, yeni dönem ve katılım koşulları hakkında konuşalım." parent={{href:"/akademi",label:"Akademi"}}/>
    <div className={styles.columns}>
      <div>
        {selected && <div className="mb-8 border-l-2 border-black pl-5"><p className={styles.eyebrow}>İlgilendiğin program</p><h2 className="text-2xl font-medium tracking-tight">{selected.title}</h2></div>}
        {online ? <div className={styles.panel}><ApplicationForm programOptions={[...programs.map(p=>({value:p.slug,label:p.title})),{value:"genel",label:"Genel bilgi"}]} initialProgram={selected?.slug}/></div> : <>
          <h2 className={styles.sectionTitle}>Doğrudan iletişime geç.</h2><p className={styles.muted}>Başvuru ve bilgi taleplerini e-posta veya WhatsApp üzerinden paylaşabilirsin.</p>
          <ol className={styles.steps}><li>İlgilendiğin programı veya çalışmak istediğin alanı belirt.</li><li>Kendinden ve varsa sahne deneyiminden kısaca söz et.</li><li>Güncel takvim ve katılım ayrıntılarını APA ekibiyle netleştir.</li></ol>
          {email && <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`} className={styles.contactRow}><div><span>E-posta</span><strong>Başvuru için bize yaz</strong></div><ArrowUpRight/></a>}
          {contact?.whatsapp && <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className={styles.contactRow}><div><span>WhatsApp</span><strong>Program hakkında konuşalım</strong></div><ArrowUpRight/></a>}
        </>}
      </div>
      <aside className={styles.darkPanel}><p className={styles.eyebrow}>Atlas Performans Akademisi</p><h2>Henüz karar<br/>vermedin mi?</h2><p className={styles.muted}>Oyunculuk, yazarlık, sinema ve performans. İlgi alanına göre eğitimleri inceleyerek başlayabilirsin.</p><Link href="/akademi#egitim-rotasi" className={styles.action}>Eğitim rotanı bul<ArrowUpRight size={19}/></Link><div className="mt-10 border-t border-white/20 pt-6"><p className={styles.muted}>{contact?.addressLines?.join(" · ")}</p><Link href="/akademi/iletisim" className={styles.action}>İletişim bilgileri<ArrowUpRight size={19}/></Link></div></aside>
    </div>
  </div>
}
