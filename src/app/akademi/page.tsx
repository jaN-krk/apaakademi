import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { DashboardHero } from "@/components/aura/dashboard-hero"
import { TeamCarousel } from "@/components/aura/team-carousel"
import { EducationGrid } from "@/components/academy/education-grid"
import { PathFinder } from "@/components/academy/path-finder"
import { InstagramShowcase } from "@/components/shared/instagram-showcase"
import { MediaGallery } from "@/components/shared/media-gallery"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  getAcademyContact,
  getPublicInstructors,
  getPublicMedia,
  getPublicPrograms,
  mediaItems,
} from "@/content"
import { createMetadata } from "@/lib/seo"
import { sources } from "@/content/sources"

export const metadata: Metadata = createMetadata({
  title: "Atlas Performans Akademisi",
  description:
    "APA’da oyunculuk, performans ve yaratıcı süreçlere odaklı programlar.",
  path: "/akademi",
})

export default function AcademyHomePage() {
  const programs = getPublicPrograms()
  const instructors = getPublicInstructors()
  const instructorsById = new Map(instructors.map((p) => [p.id, p]))
  const contact = getAcademyContact()
  const ig = mediaItems.filter(
    (m) => m.brand === "academy" && m.platform === "instagram"
  )
  const photos = getPublicMedia("academy").filter(
    (m) => m.type === "image" && m.thumbnail?.src
  )
  const cascade = [{ src: "/brand/academy/atlas-bg2.png", alt: "Atlas Performans Akademisi — sahne ve maske çalışması" }]

  const faq = [
    {
      q: "Başvurular nasıl alınıyor?",
      a: "Programına göre Biletinial veya info@atlasperformans.com / WhatsApp.",
    },
    {
      q: "Eğitimler nerede?",
      a: "Asmalımescit Mah. Sofyalı Sok. No:14/2, Beyoğlu, İstanbul.",
    },
    {
      q: "Seeing Lab nedir?",
      a: "Doç. Dr. Deniz Telek koordinatörlüğünde sinema odaklı alan.",
    },
  ]

  return (
    <>
      <DashboardHero
        title="Eğitimler"
        titleLine2="ve sahne pratiği"
        description="Temel Oyunculuk, Monolog, Senaryo, Audition 101 ve daha fazlası — Atlas Performans Akademisi (APA)."
        primaryCta={{ label: "Eğitimler", href: "/akademi/programlar" }}
        secondaryCta={{ label: "Başvuru", href: "/akademi/basvuru" }}
        images={cascade}
      />


      <EducationGrid programs={programs} instructorsById={instructorsById} />

      <TeamCarousel
        people={instructors}
        basePath="/akademi/egitmenler"
        title="Eğitmenler"
      />

      {photos.length > 0 && <section className="atlas-section"><MediaGallery items={photos}/></section>}

      <section id="egitim-rotasi" className="scroll-mt-28 border-t border-zinc-200 section-y">
        <div className="container-app space-y-8">
          <SectionHeading eyebrow="Rotanı bul" title="Eğitim rotanı filtrele" />
          <PathFinder programs={programs} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-app space-y-8">
          <SectionHeading eyebrow="Sosyal" title="Instagram" />
          <InstagramShowcase items={ig} />
        </div>
      </section>

      <section className="border-t border-zinc-200 section-y">
        <div className="container-app grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="SSS" title="Sık sorulanlar" />
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, i) => (
                <AccordionItem key={item.q} value={`i-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="rounded-[1.5rem] bg-black p-8 text-white sm:p-10">
            <p className="text-xs tracking-[0.2em] text-white/50 uppercase">
              İletişim
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Beyoğlu</h2>
            {contact ? (
              <div className="mt-6 space-y-2 text-sm text-white/70">
                {contact.addressLines?.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {contact.email ? <p>{contact.email}</p> : null}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-white text-black hover:bg-zinc-100"
              >
                <Link href="/akademi/iletisim">İletişim</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href={sources.academyInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @atlas_performans
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
