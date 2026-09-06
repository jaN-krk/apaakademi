import { CONTENT_RESEARCH_DATE, sources } from "@/content/sources"
import type { EventRecord } from "@/content/types"

/**
 * Event rows live here — do not hardcode dated showtimes in components.
 * Past dates are treated as archived by selectors at runtime.
 */
export const events: EventRecord[] = [
  {
    id: "event-dublor-2026-08-17",
    slug: "dublorun-dilemmasi-ozgurluk-parki-17-agustos-2026",
    title: "Dublörün Dilemması",
    brand: "theatre",
    kind: "performance",
    productionId: "prod-dublorun-dilemmasi",
    startsAt: "2026-08-17T21:00:00+03:00",
    venue: {
      name: "Kadıköy Belediyesi Selamiçeşme Özgürlük Parkı",
      city: "İstanbul",
    },
    ticketUrl: sources.dublorBilet.url,
    shortDescription:
      "Açık hava gösterimi. Güncel fiyat ve müsaitlik için bilet sayfasını kontrol edin.",
    status: "verified",
    isCurrent: true,
    sourceName: sources.dublorBilet.name,
    sourceUrl: sources.dublorBilet.url,
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
    mediaPermissionStatus: "permissionRequired",
  },
  {
    id: "event-dublor-2026-09-30",
    slug: "dublorun-dilemmasi-moda-sahnesi-30-eylul-2026",
    title: "Dublörün Dilemması",
    brand: "theatre",
    kind: "performance",
    productionId: "prod-dublorun-dilemmasi",
    startsAt: "2026-09-30T20:30:00+03:00",
    venue: {
      name: "Moda Sahnesi Büyük Salon",
      city: "İstanbul",
    },
    ticketUrl: sources.dublorBilet.url,
    ageLimit: "13+",
    durationMinutes: 80,
    organizer: "Moda Sahnesi",
    shortDescription:
      "Salon gösterimi. Süre 80 dk ve yaş 13+ Moda Sahnesi kaydına göre.",
    status: "verified",
    isCurrent: true,
    sourceName: sources.dublorBilet.name,
    sourceUrl: sources.dublorBilet.url,
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
    additionalSources: [sources.dublorModa],
    mediaPermissionStatus: "permissionRequired",
  },
]
