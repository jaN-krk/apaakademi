import type { Metadata } from "next"

import { EducationGrid } from "@/components/academy/education-grid"
import { getPublicInstructors, getPublicPrograms } from "@/content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Eğitimler",
  description:
    "Atlas Performans Akademisi doğrulanmış eğitim programları ve atölye arşivi.",
  path: "/akademi/programlar",
})

export default function ProgramsPage() {
  const programs = getPublicPrograms()
  const instructors = getPublicInstructors()
  const instructorsById = new Map(instructors.map((p) => [p.id, p]))

  return (
    <div className="bg-white">
      <EducationGrid programs={programs} instructorsById={instructorsById} isPage />
    </div>
  )
}
