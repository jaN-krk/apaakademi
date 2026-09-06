import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLinkIcon } from "lucide-react"

import { NextStep } from "@/components/shared/page-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TicketEventCard } from "@/components/theatre/ticket-event-card"
import { MediaGallery } from "@/components/shared/media-gallery"
import { PersonCard } from "@/components/shared/person-card"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  getProductionBySlug,
  getPublicProductions,
  getUpcomingTheatreEvents,
  awards,
  getPublicMedia,
  getPublicTheatrePeople,
} from "@/content"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPublicProductions().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const production = getProductionBySlug(slug)
  if (!production) return {}
  return createMetadata({
    title: production.title,
    description: production.shortDescription ?? production.title,
    path: `/tiyatro/oyunlar/${production.slug}`,
  })
}

export default async function ProductionDetailPage({ params }: Props) {
  const { slug } = await params
  const production = getProductionBySlug(slug)
  if (!production) notFound()

  const events = getUpcomingTheatreEvents().filter(
    (e) => e.productionId === production.id
  )
  const relatedAwards = awards.filter(
    (a) => a.productionId === production.id && a.status === "verified"
  )
  const gallery = getPublicMedia("theatre").filter(m => m.slug.includes(production.slug) || (production.slug === "dublorun-dilemmasi" && m.slug.includes("dublor")) || (production.slug === "sezuanin-iyi-insani" && m.slug.includes("sezuan")))

  const verifiedCast = (production.cast ?? []).filter(
    (c) => c.status === "verified"
  )
  const flaggedCast = (production.cast ?? []).filter(
    (c) => c.status === "needsVerification"
  )
  const team = Array.from(new Map((production.creativeTeam ?? []).filter(t => t.status === "verified").map(t => [t.name, t])).values())
  const flaggedTeam = (production.creativeTeam ?? []).filter(
    (t) => t.status === "needsVerification"
  )

  const people = getPublicTheatrePeople()
  const normalize = (s: string) =>
    s
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[^a-z0-9\s]/gi, "")
      .trim()

  const eventJsonLd = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: production.title,
    description: production.shortDescription,
    startDate: event.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: event.venue.city,
    },
    organizer: {
      "@type": "PerformingGroup",
      name: siteConfig.brands.theatre.name,
    },
    url:
      event.ticketUrl ??
      `${siteConfig.url}/tiyatro/oyunlar/${production.slug}`,
  }))

  return (
    <article>
      {eventJsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <section className="border-b border-border">
        <div className="container-app grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:py-16">
          <div className="relative mx-auto aspect-[400/574] w-full max-w-md overflow-hidden bg-white shadow-[0_18px_40px_-22px_#00000050]">
            {production.image?.src ? (
              <Image
                src={production.image.src}
                alt={production.imageAlt ?? production.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            ) : null}
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {production.year ? (
                <Badge variant="outline">{production.year}</Badge>
              ) : null}
              {production.isCurrent ? <Badge>Gösterimde</Badge> : null}
              {production.ageLimit ? (
                <Badge variant="secondary">{production.ageLimit}</Badge>
              ) : null}
              {production.durationMinutes ? (
                <Badge variant="secondary">
                  {production.durationMinutes} dk
                </Badge>
              ) : null}
            </div>
            <Link href="/tiyatro/oyunlar" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500"><ArrowLeft size={16}/>Oyunlara dön</Link>
            <h1 className="text-4xl font-medium leading-[1.05] tracking-[-.045em] sm:text-6xl">
              {production.title}
            </h1>
            {production.fullDescription ? (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {production.fullDescription}
              </p>
            ) : null}
            {production.sourceWork ? (
              <p className="text-sm">Kaynak: {production.sourceWork}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              {production.ticketUrl ? (
                <Button asChild className="rounded-full">
                  <a
                    href={production.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bilet Al
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline" className="rounded-full">
                <a
                  href={production.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Oyun hakkında daha fazla
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-app section-y space-y-14">
        {events.length ? (
          <section className="space-y-6">
            <SectionHeading eyebrow="Takvim" title="Yaklaşan gösterimler" />
            <div className="grid gap-5 lg:grid-cols-2">
              {events.map((event) => (
                <TicketEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        ) : null}

        {gallery.length ? (
          <section className="space-y-6">
            <SectionHeading eyebrow="Galeri" title="Sahne görselleri" />
            <MediaGallery items={gallery} />
          </section>
        ) : null}

        {verifiedCast.length > 0 && <section className="space-y-6">
          <SectionHeading eyebrow="Ekip" title="Oyuncular" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedCast.map((c) => {
              const person = people.find(
                (p) =>
                  normalize(p.fullName) === normalize(c.name) ||
                  normalize(p.title) === normalize(c.name) ||
                  normalize(p.fullName).includes(normalize(c.name)) ||
                  normalize(c.name).includes(normalize(p.fullName))
              )
              if (person) {
                return (
                  <PersonCard
                    key={person.id}
                    person={person}
                    href={`/tiyatro/ekip/${person.slug}`}
                  />
                )
              }
              return <PersonCard key={c.name} person={{ ...production, id: "cast-" + c.name, fullName: c.name, title: c.name, roles: ["actor"], brands: ["theatre"], image: undefined, imageAlt: undefined, shortDescription: "Oyuncu" }} />
            })}
          </div>
          {flaggedCast.length ? (
            <div className="rounded-[1.25rem] border border-dashed border-zinc-300 p-4 text-xs text-zinc-500">
              {flaggedCast.map((c) => (
                <p key={c.name}>
                  {c.name}
                  {c.note ? ` — ${c.note}` : ""}
                </p>
              ))}
            </div>
          ) : null}
        </section>}

        {team.length > 0 && <section className="space-y-6">
          <SectionHeading eyebrow="Ekip" title="Yaratıcı ekip" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t) => {
              const person = people.find(
                (p) =>
                  normalize(p.fullName) === normalize(t.name) ||
                  normalize(p.title).includes(normalize(t.name)) ||
                  normalize(t.name).includes(normalize(p.fullName))
              )
              if (person) {
                return (
                  <PersonCard
                    key={`${person.id}-${t.role}`}
                    person={person}
                    href={`/tiyatro/ekip/${person.slug}`}
                  />
                )
              }
              return <PersonCard key={t.name} person={{ ...production, id: "crew-" + t.name, fullName: t.name, title: t.name, roles: ["other"], brands: ["theatre"], image: undefined, imageAlt: undefined, shortDescription: t.role }} />
            })}
          </div>
          {flaggedTeam.length ? (
            <div className="rounded-[1.25rem] border border-dashed border-zinc-300 p-4 text-xs text-zinc-500">
              {flaggedTeam.map((t) => (
                <p key={`${t.role}-${t.name}`}>
                  {t.role}: {t.name}
                </p>
              ))}
            </div>
          ) : null}
        </section>}

        {relatedAwards.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Ödüller</h2>
            <ul className="space-y-2 text-sm">
              {relatedAwards.map((a) => (
                <li key={a.id}>
                  <Link
                    href="/tiyatro/oduller"
                    className="underline-offset-4 hover:underline"
                  >
                    {a.awardBody} — {a.category} ({a.year})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <Separator />
        <NextStep eyebrow="Atlas repertuvarı" title="Başka bir hikâyeyle devam et." href="/tiyatro/oyunlar" label="Bütün oyunlar"/>
      </div>
    </article>
  )
}
