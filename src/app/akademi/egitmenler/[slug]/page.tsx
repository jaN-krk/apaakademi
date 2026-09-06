import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PersonProfile } from "@/components/shared/person-profile"
import {
  getInstructorBySlug,
  getPublicInstructors,
  programs,
  productions,
} from "@/content"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPublicInstructors().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const person = getInstructorBySlug(slug)
  if (!person) return {}
  return createMetadata({
    title: person.title,
    description: person.shortDescription ?? person.title,
    path: `/akademi/egitmenler/${person.slug}`,
  })
}

export default async function InstructorDetailPage({ params }: Props) {
  const { slug } = await params
  const person = getInstructorBySlug(slug)
  if (!person) notFound()

  const linkedPrograms = programs.filter(
    (p) =>
      p.status === "verified" && (person.programs ?? []).includes(p.id)
  )

  const linkedProductions = productions.filter(
    (p) =>
      (p.status === "verified" || p.status === "archived") &&
      (person.productions ?? []).includes(p.id)
  )

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    jobTitle: person.titles?.join(" "),
    worksFor: {
      "@type": "EducationalOrganization",
      name: siteConfig.brands.academy.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PersonProfile
        person={person}
        programs={linkedPrograms}
        productions={linkedProductions}
      />
    </>
  )
}
