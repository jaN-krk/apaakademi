import type { Metadata } from "next"

import { DashboardHero } from "@/components/aura/dashboard-hero"
import { TeamCarousel } from "@/components/aura/team-carousel"
import { ReviewMarquee } from "@/components/theatre/review-marquee"
import { TicketEventCard } from "@/components/theatre/ticket-event-card"
import { ProductionCard } from "@/components/theatre/production-card"
import { ProductionLineNav } from "@/components/theatre/production-line-nav"
import { MediaGallery } from "@/components/shared/media-gallery"
import { InstagramShowcase } from "@/components/shared/instagram-showcase"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  getArchiveProductions,
  getPublicAwards,
  getPublicMedia,
  getPublicReviews,
  getPublicTheatrePeople,
  getUpcomingTheatreEvents,
  mediaItems,
  productions,
} from "@/content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Atlas Tiyatro Araştırmaları",
  description:
    "Dublörün Dilemması ve arşiv üretimleriyle Atlas Tiyatro Araştırmaları.",
  path: "/tiyatro",
})

export default function TheatreHomePage() {
  const upcoming = getUpcomingTheatreEvents()
  const current =
    productions.find((p) => p.id === "prod-dublorun-dilemmasi") ??
    productions.find((p) => p.isCurrent && p.status === "verified")
  const people = getPublicTheatrePeople()
  const withPhoto = people.filter((p) => p.image?.src)
  const awards = getPublicAwards()
  const archive = getArchiveProductions().slice(0, 6)
  const stageMedia = getPublicMedia("theatre").filter(
    (m) => m.type === "image" && m.thumbnail?.src
  )
  const stagePhotos = stageMedia.map((m) => ({
    id: m.id,
    image: m.thumbnail!.src!,
    title: m.title,
  }))
  const ig = mediaItems.filter(
    (m) => m.brand === "theatre" && m.platform === "instagram"
  )
  const reviews = getPublicReviews()
    .filter((r) => r.subjectId === "prod-dublorun-dilemmasi" && r.summary)
    .map((r) => ({
      id: r.id,
      author: r.shortDescription ?? r.title,
      text: r.summary!,
      rating: r.rating,
      ratingMax: r.ratingMax,
    }))

  const lineItems = [
    {
      label: "Dublörün Dilemması",
      href: "/tiyatro/oyunlar/dublorun-dilemmasi",
    },
    ...archive.map((p) => ({
      label: p.title,
      href:
        p.status === "verified"
          ? `/tiyatro/oyunlar/${p.slug}`
          : "/tiyatro/oyunlar",
    })),
  ]

  const cascade = stagePhotos.filter(p => p.image.includes("dublor")).slice(0, 3).map(p => ({ src: p.image, alt: p.title }))

  return (
    <>
      <DashboardHero
        eyebrow="Atlas Tiyatro Araştırmaları"
        title={current?.title ?? "Atlas Tiyatro"}
        titleLine2="Atlas sahnesinde"
        description={
          current?.shortDescription ??
          "Dublörün Dilemması, ekip ve sahne arşivi."
        }
        primaryCta={
          current?.ticketUrl
            ? {
                label: "Bilet Al",
                href: current.ticketUrl,
                external: true,
              }
            : { label: "Oyunlar", href: "/tiyatro/oyunlar" }
        }
        secondaryCta={{
          label: "Oyun sayfası",
          href: "/tiyatro/oyunlar/dublorun-dilemmasi",
        }}
        images={cascade}
      />


      <section className="section-y">
        <div className="container-app grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Oyunlar" title="Sahne defteri" />
            <ProductionLineNav items={lineItems} className="mt-6" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-black p-7 text-white">
              <p className="text-xs tracking-[0.18em] text-white/50 uppercase">
                Süre
              </p>
              <p className="mt-3 text-4xl font-semibold">
                {current?.durationMinutes ?? "—"}
                <span className="ml-1 text-lg font-normal text-white/50">dk</span>
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-zinc-100 p-7">
              <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase">
                Yaş
              </p>
              <p className="mt-3 text-4xl font-semibold">
                {current?.ageLimit ?? "—"}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-zinc-100 p-7">
              <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase">
                Ödül
              </p>
              <p className="mt-3 text-4xl font-semibold">{awards.length}</p>
            </div>
            <div className="rounded-[1.5rem] bg-zinc-100 p-7">
              <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase">
                Gösterim
              </p>
              <p className="mt-3 text-4xl font-semibold">
                {upcoming.length || "—"}
              </p>
            </div>
          </div>
        </div>
      </section>


      <TeamCarousel people={withPhoto} basePath="/tiyatro/ekip" title="Sahnenin arkasındaki insanlar" />

      <ReviewMarquee items={reviews} title="İzleyici yorumları" />
      <section className="border-y border-zinc-200 bg-zinc-50 section-y">
        <div className="container-app space-y-8">
          <SectionHeading eyebrow="Takvim" title="Yaklaşan gösterimler" />
          {upcoming.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Şu an listelenen yaklaşan gösterim bulunmuyor. Yeni tarihleri @atlastiyatro hesabından takip edebilirsin.
            </p>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {upcoming.map((event) => (
                <TicketEventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-y">
        <div className="container-app space-y-8">
          <SectionHeading
            eyebrow="Medya"
            title="Sahne görselleri"
            description="Oyunlarımızdan sahne kareleri."
          />
          {stagePhotos.length ? (
            <>
              <MediaGallery items={stageMedia.filter(m => !cascade.some(c => c.src === m.thumbnail?.src))} />
            </>
          ) : (
            <p className="text-sm text-zinc-500">Görsel bulunamadı.</p>
          )}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 section-y">
        <div className="container-app space-y-8">
          <SectionHeading eyebrow="Arşiv" title="Oyunlar" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {archive.map((production) => (
              <ProductionCard key={production.id} production={production} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 section-y">
        <div className="container-app space-y-8">
          <SectionHeading eyebrow="Sosyal" title="@atlastiyatro" />
          <InstagramShowcase items={ig} />
        </div>
      </section>
    </>
  )
}
