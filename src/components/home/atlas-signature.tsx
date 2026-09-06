"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Pause, Play } from "lucide-react"
import TextLoop from "@/components/TextLoop"
import styles from "./atlas-signature.module.css"

export function AtlasSignature() {
  const root = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const element = root.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {element.dataset.visible=String(entry.isIntersecting)})
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <section ref={root} className={styles.signature} data-header-tone="dark" data-paused={paused} aria-label="APA — Atlas Performans">
    <div className={styles.atmosphere} aria-hidden="true">
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        {Array.from({length:18},(_,i)=><path key={i} d={`M ${-200+i*32} 650 C ${160+i*15} ${-200+i*23}, ${780+i*22} ${880-i*19}, ${1240+i*26} -100`} />)}
      </svg>
    </div>
    <div className={styles.topline}><span>ATLAS / BİR ÜRETİM ALANI</span><span>SAHNE · ATÖLYE · KARŞILAŞMA</span></div>
    <div className={styles.loop}>
      <TextLoop text="APA · ATLAS PERFORMANS" shape="wave" curviness={55} fontSize={88} fontWeight={500} letterSpacing={-3} speed={55} separator="/" ribbon={false} color="#ffffff" pauseOnHover={false} paused={paused}/>
    </div>
    <div className={styles.bottomline}>
      <p data-reveal>Aynı merak.<br/><em>Farklı sahneler.</em></p>
      <Link href="/akademi">Birlikte üretmeye başla<ArrowUpRight size={20}/></Link>
      <button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused?"Yazı animasyonunu başlat":"Yazı animasyonunu duraklat"} aria-pressed={paused}>{paused?<Play size={16}/>:<Pause size={16}/>}</button>
    </div>
  </section>
}
