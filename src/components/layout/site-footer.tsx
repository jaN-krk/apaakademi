import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowUp } from "lucide-react"
import { sources } from "@/content/sources"
import { cn } from "@/lib/utils"

type SiteFooterProps = { brand: "atlas" | "academy" | "theatre"; className?: string }

function SiteFooter({brand,className}:SiteFooterProps){
  const contactHref=brand==="theatre"?"/tiyatro/iletisim":"/akademi/iletisim"
  const groups=[
    {title:"Keşfet",items:[{label:"Performans Akademisi",href:"/akademi"},{label:"Tiyatro Araştırmaları",href:"/tiyatro"},{label:"Oyunlar",href:"/tiyatro/oyunlar"},{label:"Gösterim takvimi",href:"/tiyatro/takvim"}]},
    {title:"Birlikte",items:[{label:"Eğitimler",href:"/akademi/programlar"},{label:"Eğitmenler",href:"/akademi/egitmenler"},{label:"Tiyatro ekibi",href:"/tiyatro/ekip"},{label:"Başvuru",href:"/akademi/basvuru"}]},
  ]
  return <footer className={cn("atlas-footer",className)} data-header-tone="dark" id="footer">
    <div className="footer-inner">
      <div className="footer-invitation"><div><p className="atlas-eyebrow text-white/45">Her karşılaşma yeni bir başlangıç.</p><h2>Bir sonraki <em>hikâyede.</em></h2></div><Link href={contactHref} className="footer-contact">İletişime geç<ArrowUpRight size={25}/></Link></div>
      <div className="footer-info-grid">
        <div className="footer-identity"><Image src="/brand/academy/apa-supplied-dark.png" alt="Atlas Performans Akademisi" width={447} height={447}/><p>Öğrenmek, araştırmak,<br/>birlikte üretmek için.</p><span>APA / İSTANBUL</span></div>
        {groups.map(group=><nav key={group.title} aria-label={"Alt menü — "+group.title}><h3>{group.title}</h3><ul>{group.items.map(item=><li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>)}
        <nav aria-label="Sosyal hesaplar"><h3>Takipte kal</h3><ul>{[{href:sources.academyInstagram.url,label:"@atlas_performans"},{href:sources.theatreInstagram.url,label:"@atlastiyatro"},{href:sources.seeingLab.url,label:"@seeinglab"}].map(item=><li key={item.href}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={13}/></a></li>)}</ul></nav>
      </div>
      <div className="footer-wordmark" aria-hidden="true">ATLAS<span>↗</span></div>
      <div className="footer-baseline"><p>© {new Date().getFullYear()} Atlas</p><div><Link href="/gizlilik">Gizlilik</Link><Link href="/cerez-politikasi">Çerezler</Link><Link href="/kullanim-kosullari">Koşullar</Link></div><a href="#page-top" className="footer-to-top">Başa dön<ArrowUp size={14}/></a></div>
    </div>
  </footer>
}
export {SiteFooter}

