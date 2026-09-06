"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import MorphSlider from "@/components/MorphSlider"
import styles from "./home.module.css"

const slides = [
  { image: "/media/theatre/yabanci/yabanci-scene-2.jpg", caption: "Yabancı", slug: "yabanci" },
  { image: "/media/theatre/uysal-kadin/uysal-kadin-scene-2.jpg", caption: "Uysal Kadın", slug: "uysal-kadin" },
  { image: "/media/theatre/sezuanin-iyi-insani/sezuanin-iyi-insani-scene-2.jpg", caption: "Sezuan’ın İyi İnsanı", slug: "sezuanin-iyi-insani" },
]

function HomeDashboard() {
  const [active, setActive] = useState(0)
  const scene = slides[active]
  return <>
    <section className={styles.hero} data-header-tone="dark" aria-labelledby="opening-title">
      <div className={styles.heroImage}>
        <MorphSlider items={slides} radius={0} transition="melt" duration={1.05} intensity={.3} aberration={0} showCaptions={false} onSlideChange={setActive}/>
      </div>
      <div className={styles.heroShade} aria-hidden="true"/>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>ATLAS / TİYATRO · ARAŞTIRMA · EĞİTİM</p>
        <h1 id="opening-title">Sahneden<br/><em>atölyeye.</em></h1>
        <p className={styles.heroDescription}>Bir tiyatronun üretiminden doğan,<br/>birlikte çalışarak büyüyen bir alan.</p>
        <div className={styles.heroActions}>
          <Link href="/tiyatro/oyunlar">Oyunlarla tanış<ArrowUpRight size={19}/></Link>
          <a href="#atlas-akademi">APA’yı keşfet<ArrowDown size={17}/></a>
        </div>
      </div>
      <div className={styles.sceneNote}>
        <span>SAHNE ARŞİVİNDEN</span>
        <Link href={"/tiyatro/oyunlar/" + scene.slug} aria-live="polite">{scene.caption}<ArrowUpRight size={19}/></Link>
      </div>
    </section>
    <nav className={styles.chapterNav} aria-label="Ana sayfa bölümleri">
      {[{href:"#atlas-program",number:"01",title:"İzle",note:"Atlas’ın oyunları"},{href:"#atlas-insanlar",number:"02",title:"Tanış",note:"Sahnenin arkasındaki ekip"},{href:"#atlas-akademi",number:"03",title:"Çalış",note:"APA’da eğitim ve atölye"}].map(item=><a href={item.href} key={item.number}><span className={styles.chapterNumber}>{item.number}</span><div><strong>{item.title}</strong><span>{item.note}</span></div><ArrowDown size={19}/></a>)}
    </nav>
  </>
}
export { HomeDashboard }
