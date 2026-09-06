import type { Metadata } from "next"

import { PersonCard } from "@/components/shared/person-card"
import { getPublicInstructors } from "@/content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Eğitmenler",
  description: "APA’da sahne deneyimini ve akademik birikimini paylaşan eğitmenlerle tanışın.",
  path: "/akademi/egitmenler",
})

export default function InstructorsPage() {
  const people = getPublicInstructors()

  return (
    <div className="bg-white">
      <div className="container-app pt-14 pb-0 space-y-4">
        <header className="people-page-heading">
          <div><p className="atlas-eyebrow">APA / Eğitmenler</p>
          <h1>Birlikte<br/><em>keşfedelim.</em></h1></div>
          <p className="people-page-note">Sahne deneyimini, araştırmasını ve merakını paylaşan eğitmenler.<span>{people.length} EĞİTMEN / PEK ÇOK BAKIŞ AÇISI</span></p>
        </header>
      </div>


      <div className="container-app section-y">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              href={`/akademi/egitmenler/${person.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
