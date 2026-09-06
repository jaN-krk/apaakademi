import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProgramRecord, PersonRecord } from "@/content/types"
import { ProgramCard } from "@/components/academy/program-card"
import { Reveal } from "@/components/shared/reveal"

type EducationGridProps = { programs: ProgramRecord[]; instructorsById: Map<string, PersonRecord>; className?: string; isPage?: boolean }
function EducationGrid({ programs, instructorsById, className, isPage = false }: EducationGridProps) {
  if (!programs.length) return null
  const Heading = isPage ? "h1" : "h2"
  return <section className={cn("education-editorial-section border-y border-black/10", className)}><div className="atlas-section">
    <div className="atlas-section-title"><div><p className="atlas-eyebrow">APA / Eğitimler</p><Heading className="education-page-title">Merak ettiğin<br/><span className="editorial-serif">yerden başla.</span></Heading></div><Link href={isPage?"/akademi#egitim-rotasi":"/akademi/programlar"} className="atlas-text-link">{isPage?"İlgi alanına göre ara":"Bütün programlar"}<ArrowUpRight size={20}/></Link></div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{programs.map((program, i) => {
      const leadId = program.instructors?.[0]
      const lead = leadId ? instructorsById.get(leadId) : undefined
      return <Reveal key={program.id} delay={(i % 3) * .06}><ProgramCard program={program} instructorName={lead?.fullName} index={i + 1}/></Reveal>
    })}</div>
  </div></section>
}
export { EducationGrid }
