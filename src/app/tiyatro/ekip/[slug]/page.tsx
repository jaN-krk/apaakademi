import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PersonProfile } from "@/components/shared/person-profile"
import {
  getPublicTheatrePeople,
  getTheatrePersonBySlug,
  productions,
} from "@/content"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPublicTheatrePeople().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const person = getTheatrePersonBySlug(slug)
  if (!person) return {}
  return createMetadata({
    title: person.title,
    description: person.shortDescription ?? person.title,
    path: `/tiyatro/ekip/${person.slug}`,
  })
}

export default async function TheatrePersonPage({ params }: Props) {
  const { slug } = await params
  const person = getTheatrePersonBySlug(slug)
  if (!person) notFound()

  const linked = productions.filter(
    (p) =>
      (p.status === "verified" || p.status === "archived") &&
      (person.productions ?? []).includes(p.id)
  )

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    jobTitle: person.roles.join(", "),
    worksFor: {
      "@type": "PerformingGroup",
      name: siteConfig.brands.theatre.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PersonProfile person={person} productions={linked} />
    </>
  )
}
