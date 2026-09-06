import type { Metadata } from "next"

import { PersonCard } from "@/components/shared/person-card"
import { getPublicTheatrePeople } from "@/content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Ekip",
  description: "Atlas Tiyatro Araştırmaları oyuncuları ve yaratıcı ekibiyle tanışın.",
  path: "/tiyatro/ekip",
})

export default function TheatreTeamPage() {
  const people = getPublicTheatrePeople()

  return (
    <div className="overflow-x-hidden bg-white">
      <div className="container-app pt-14 pb-0 space-y-4">
        <header className="people-page-heading">
          <div><p className="atlas-eyebrow">Atlas Tiyatro Araştırmaları / Ekip</p>
          <h1>Sahnenin<br/><em>insanları.</em></h1></div>
          <p className="people-page-note">Bir oyunu birlikte var eden oyuncular, yönetmenler ve yaratıcı ekip.<span>{people.length} İSİM / ORTAK BİR SAHNE</span></p>
        </header>
      </div>


      <div className="container-app section-y overflow-x-hidden">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              href={`/tiyatro/ekip/${person.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
