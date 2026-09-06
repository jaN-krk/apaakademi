import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"
import { getAcademyContact, getTheatreContact } from "@/content"
import { sources } from "@/content/sources"
import { PageIntro, NextStep } from "./page-intro"
import styles from "./editorial.module.css"

export function ContactPage({brand}:{brand:"academy"|"theatre"}) {
  const academy = brand === "academy"
  const contact = academy ? getAcademyContact() : getTheatreContact()
  const instagram = academy ? sources.academyInstagram.url : sources.theatreInstagram.url
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(contact?.addressLines?.join(" ") ?? "")
  return <div className={styles.shell}>
    <PageIntro eyebrow={academy?"APA / İletişim":"Atlas Tiyatro / İletişim"} title="Bir merhaba," emphasis="yeni bir başlangıç." description={academy?"Eğitimler, atölyeler ve aklındaki sorular için bize ulaş. APA’da tanışalım.":"Oyunlarımızı takip etmek, gösterim bilgilerine ulaşmak ve Atlas’la iletişime geçmek için."} parent={{href:academy?"/akademi":"/tiyatro",label:academy?"Akademi":"Tiyatro"}}/>
    <div className={styles.columns}>
      <div>
        {contact?.email && <a href={"mailto:"+contact.email} className={styles.contactRow}><div><span>E-posta</span><strong>{contact.email}</strong></div><ArrowUpRight/></a>}
        {contact?.phone && <a href={"tel:"+contact.phone.replace(/\s/g,"")} className={styles.contactRow}><div><span>Telefon</span><strong>{contact.phone}</strong></div><ArrowUpRight/></a>}
        {contact?.whatsapp && <a href={"https://wa.me/"+contact.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.contactRow}><div><span>Birlikte konuşalım</span><strong>WhatsApp’tan yaz</strong></div><ArrowUpRight/></a>}
        <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.contactRow}><div><span>Instagram / Duyurular</span><strong>{academy?"@atlas_performans":"@atlastiyatro"}</strong></div><ArrowUpRight/></a>
        {!academy && <Link href="/tiyatro/takvim" className={styles.contactRow}><div><span>Gösterimler</span><strong>Takvim ve biletler</strong></div><ArrowUpRight/></Link>}
      </div>
      <div>
        <div className={styles.darkPanel}>
          {academy && <Image src="/brand/academy/apa-supplied-dark.png" alt="APA" width={447} height={447}/>}
          <p className={styles.eyebrow}>{academy?"Buluşma noktası":"Atlas Tiyatro Araştırmaları"}</p>
          <h2>{academy?"Atlas Performans Akademisi":"Sahnede görüşmek üzere."}</h2>
          {contact?.addressLines?.map(line=><p key={line} className={styles.muted}>{line}</p>)}
          {!academy && <p className={styles.muted}>Yeni gösterimler ve sahneden haberler için resmî Instagram hesabımızı takip edebilirsin.</p>}
          {academy && <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.action}>Yol tarifi al<MapPin size={19}/></a>}
        </div>
        {academy && contact?.addressLines && <div className={styles.map}><iframe title="Atlas Performans Akademisi konumu" src={"https://maps.google.com/maps?q="+encodeURIComponent(contact.addressLines.join(" "))+"&z=16&output=embed"} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.mapCaption}>Beyoğlu, İstanbul<ArrowUpRight size={18}/></a></div>}
      </div>
    </div>
    <NextStep eyebrow={academy?"İlk adım":"Repertuvar"} title={academy?"Kendine bir alan aç.":"Sıradaki hikâyeni bul."} href={academy?"/akademi/programlar":"/tiyatro/oyunlar"} label={academy?"Eğitimleri keşfet":"Oyunları keşfet"}/>
  </div>
}
