import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ProgramRecord } from "@/content/types"
import { applicationStatusLabel, programCategoryLabel } from "@/lib/labels"
import { cn } from "@/lib/utils"
import styles from "./program-card.module.css"

type ProgramCardProps = { program: ProgramRecord; className?: string; instructorName?: string; index?: number }

function ProgramCard({ program, className, instructorName, index }: ProgramCardProps) {
  const details = [
    program.durationWeeks ? `${program.durationWeeks} hafta` : null,
    program.totalHours ? `${program.totalHours} saat` : null,
  ].filter(Boolean)
  return <article className={cn(styles.card, className)}>
    <Link href={`/akademi/programlar/${program.slug}`} className={styles.surface}>
      <div className={styles.heading}>
        <span>{programCategoryLabel(program.category)}</span>
        <span className={styles.index} aria-hidden="true">{index ? String(index).padStart(2, "0") : "APA"}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{program.title}</h3>
        {program.shortDescription && <p className={styles.description}>{program.shortDescription}</p>}
        <div className={styles.details}>
          {instructorName && !program.title.includes(instructorName) && <p className={styles.instructor}><span>Eğitmen</span>{instructorName}</p>}
          {details.length > 0 && <p className={styles.duration}>{details.join(" · ")}</p>}
          {program.scheduleSummary && <p className={styles.schedule}>{program.scheduleSummary}</p>}
        </div>
      </div>
      <div className={styles.footer}>
        <div><span className={styles.status}>{applicationStatusLabel(program.applicationStatus)}</span><span className={styles.label}>Programı incele</span></div>
        <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={22}/></span>
      </div>
    </Link>
  </article>
}
export { ProgramCard }
