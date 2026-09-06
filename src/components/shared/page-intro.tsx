import Link from "next/link"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import styles from "./editorial.module.css"

type PageIntroProps = { eyebrow: string; title: string; emphasis?: string; description?: string; parent?: {href:string;label:string}; action?: ReactNode }
export function PageIntro({eyebrow,title,emphasis,description,parent,action}:PageIntroProps) {
  return <header className={styles.intro}>
    {parent && <nav aria-label="Sayfa yolu" className={styles.breadcrumb}><Link href="/">Atlas</Link><ChevronRight size={12}/><Link href={parent.href}>{parent.label}</Link></nav>}
    <div className={styles.introGrid}><div><p className={styles.eyebrow}>{eyebrow}</p><h1 className={styles.title}>{title}{emphasis && <><br/><em>{emphasis}</em></>}</h1></div>
    {(description || action) && <div className={styles.introNote}>{description && <p>{description}</p>}{action}</div>}</div>
  </header>
}
export function NextStep({eyebrow,title,description,href,label,external=false}: {eyebrow:string;title:string;description?:string;href:string;label:string;external?:boolean}) {
  return <section className={styles.nextStep}><div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{description && <p className={styles.muted}>{description}</p>}</div><Link href={href} {...(external?{target:"_blank",rel:"noopener noreferrer"}:{})} className={styles.action}>{label}<ArrowUpRight size={20}/></Link></section>
}
