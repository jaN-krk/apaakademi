import Link from "next/link"
import Image from "next/image"
import { ExternalLinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TicketEventCard } from "@/components/theatre/ticket-event-card"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  getNextAtlasMoment,
  getUpcomingTheatreEvents,
} from "@/content"
import { formatEventDate } from "@/lib/date"

function TonightAtAtlas() {
  const upcoming = getUpcomingTheatreEvents()
  const { nextShow } = getNextAtlasMoment()
  const item = nextShow ?? upcoming[0]

  return (
    <section className="border-y border-border bg-white section-y">
      <div className="container-app grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-5">
          <SectionHeading
            eyebrow="Bu akşam Atlas’ta"
            title="En yakın doğrulanmış an"
            description="Geçmiş tarihler otomatik arşive alınır. Fiyat sabitlenmez."
          />
          {!item ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Şu an yaklaşan gösterim kaydı yok. Bilet ve program için resmi
                kanalları kontrol edin.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <a
                    href="https://biletinial.com/tr-tr/tiyatro/dublorun-dilemmasi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bilet
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/akademi/programlar">Programlar</Link>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {formatEventDate(item.startsAt)}
            </p>
          )}
        </div>

        {item ? (
          <TicketEventCard event={item} />
        ) : (
          <div className="relative min-h-72 overflow-hidden rounded-2xl ring-1 ring-black/10">
            <Image
              src="/posters/dublorun-dilemmasi/poster.jpg"
              alt="Dublörün Dilemması afişi"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export { TonightAtAtlas }
