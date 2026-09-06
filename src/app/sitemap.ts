import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import {
  getPublicInstructors,
  getPublicPrograms,
  getPublicProductions,
  getPublicTheatrePeople,
} from "@/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const staticRoutes = [
    "",
    "/akademi",
    "/akademi/programlar",
    "/akademi/egitmenler",
    "/akademi/seeing-lab",
    "/akademi/medya",
    "/akademi/hakkimizda",
    "/akademi/basvuru",
    "/akademi/iletisim",
    "/tiyatro",
    "/tiyatro/oyunlar",
    "/tiyatro/takvim",
    "/tiyatro/ekip",
    "/tiyatro/oduller",
    "/tiyatro/sahne-defteri",
    "/tiyatro/medya",
    "/tiyatro/basin",
    "/tiyatro/hakkimizda",
    "/tiyatro/iletisim",
    "/gizlilik",
    "/cerez-politikasi",
    "/kullanim-kosullari",
  ]

  const programRoutes = getPublicPrograms().map(
    (p) => `/akademi/programlar/${p.slug}`
  )
  const instructorRoutes = getPublicInstructors().map(
    (p) => `/akademi/egitmenler/${p.slug}`
  )
  const playRoutes = getPublicProductions().map(
    (p) => `/tiyatro/oyunlar/${p.slug}`
  )
  const peopleRoutes = getPublicTheatrePeople().map(
    (p) => `/tiyatro/ekip/${p.slug}`
  )

  return [
    ...staticRoutes,
    ...programRoutes,
    ...instructorRoutes,
    ...playRoutes,
    ...peopleRoutes,
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }))
}
