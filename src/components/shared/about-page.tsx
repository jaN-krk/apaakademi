import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageIntro, NextStep } from "./page-intro"
import styles from "./editorial.module.css"
export function AboutPage({brand}:{brand:"academy"|"theatre"}){
  const academy=brand==="academy"
  const chapters=academy?[
    {title:"Oyunculuk",text:"Metin, karakter ve sahne üzerine çalışmalar.",href:"/akademi/programlar"},
    {title:"Yazı ve sinema",text:"Senaryodan kamera önüne uzanan eğitimler.",href:"/akademi/seeing-lab"},
    {title:"Birlikte öğrenmek",text:"Sahne deneyimini paylaşan eğitmenler.",href:"/akademi/egitmenler"},
  ]:[
    {title:"Metinden sahneye",text:"Romanlardan, öykülerden ve tiyatro metinlerinden doğan oyunlar.",href:"/tiyatro/oyunlar"},
    {title:"Birlikte üretmek",text:"Atlas’ın oyuncuları ve yaratıcı ekibi.",href:"/tiyatro/ekip"},
    {title:"Sahneden izler",text:"Oyunların görsel arşivi ve sahne kareleri.",href:"/tiyatro/medya"},
  ]
  return <div className={styles.shell}><PageIntro eyebrow={academy?"APA / Hakkımızda":"Atlas Tiyatro / Hakkımızda"} title={academy?"Sanatın pratiği,":"Bir metin,"} emphasis={academy?"düşüncenin sahnesi.":"pek çok ihtimal."} parent={{href:academy?"/akademi":"/tiyatro",label:academy?"Akademi":"Tiyatro"}}/>
    <div className={styles.columns}><div className={styles.body}><h2>{academy?"Atlas Performans Akademisi":"Atlas Tiyatro Araştırmaları"}</h2>{academy?<><p>Atlas Tiyatro Araştırmaları ekibinin kurduğu Atlas Performans Akademisi (APA), sanat ve akademiyi bir araya getiren bir buluşma alanı. Tiyatro alanında üretim yapan ve üniversitelerde görev alan akademisyenlerin birikimiyle şekillenir.</p><p>Oyunculuk, beden ve ses çalışmaları, performans sanatı, dramaturji ve yaratıcı süreçlere odaklanan atölyeler, ustalık sınıfları ve uzun dönemli programlar sunar.</p></>:<><p>Atlas Tiyatro Araştırmaları, edebi metinlere getirdiği teatral yorumlarla öne çıkan bir topluluk. Üretim alanı roman ve öykü uyarlamalarından Brecht metinlerine uzanır.</p><p>Her yapım, metinle sahne arasında yeni bir ilişki kurar. Oyuncuların ve yaratıcı ekibin ortak çalışması, farklı hikâyeleri seyirciyle buluşturur.</p></>}</div><div className={styles.darkPanel}><Image src="/brand/academy/apa-supplied-dark.png" alt="Atlas Performans Akademisi" width={447} height={447}/><p className={styles.eyebrow}>Atlas</p><h2>Öğrenmek.<br/>Araştırmak.<br/>Birlikte üretmek.</h2><Link href={academy?"/tiyatro":"/akademi"} className={styles.action}>{academy?"Atlas Tiyatro’yu tanı":"Performans Akademisi’ni tanı"}<ArrowUpRight size={19}/></Link></div></div>
    <div className={styles.section}><div className={styles.list}>{chapters.map((item,i)=><Link key={item.title} href={item.href} className={styles.listRow}><span>0{i+1}</span><div><h2>{item.title}</h2><p>{item.text}</p></div><ArrowUpRight size={22}/></Link>)}</div></div>
    <NextStep eyebrow="Tanışalım" title={academy?"Yolun APA’ya düşsün.":"Sahnede buluşalım."} href={academy?"/akademi/iletisim":"/tiyatro/takvim"} label={academy?"Bize ulaş":"Gösterim takvimi"}/>
  </div>
}
