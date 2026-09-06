"use client"

import { AdmitOneTicket } from "@/components/ui/admit-one-ticket"
import type { EventRecord } from "@/content/types"
import { formatEventDate } from "@/lib/date"
import { cn } from "@/lib/utils"

type TicketEventCardProps = {
  event: EventRecord
  className?: string
  imageSrc?: string
  archived?: boolean
}

function TicketEventCard({ event, className, archived = false }: TicketEventCardProps) {
  const year = new Date(event.startsAt).getFullYear().toString()
  const metaParts = [
    event.ageLimit ? `Yaş ${event.ageLimit}` : null,
    event.durationMinutes ? `${event.durationMinutes} dk` : null,
  ].filter(Boolean)

  return (
    <div className={cn("w-full", className)}>
      <AdmitOneTicket
        name={event.organizer ?? "Atlas Tiyatro Araştırmaları"}
        presenter={archived ? "Gösterim arşivi" : "Atlas sunar"}
        event={event.title}
        venue={[event.venue.name, event.venue.city].filter(Boolean).join(" · ")}
        dates={formatEventDate(event.startsAt)}
        stubText={archived ? "Gerçekleşti" : "Bir bilet"}
        watermark={year}
        meta={metaParts.length ? metaParts.join(" · ") : undefined}
        href={archived ? undefined : event.ticketUrl}
        width={680}
      />
    </div>
  )
}

export { TicketEventCard }
