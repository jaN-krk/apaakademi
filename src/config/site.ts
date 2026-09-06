export const siteConfig = {
  name: "Atlas",
  legalName: "Atlas",
  description:
    "Atlas Tiyatro Araştırmaları’nın oyunlarından Atlas Performans Akademisi’nin eğitimlerine: sahnede üretim, atölyede deneyim paylaşımı.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlasperformans.com",
  locale: "tr_TR",
  brands: {
    academy: {
      name: "Atlas Performans Akademisi",
      shortName: "Akademi",
      path: "/akademi",
      instagram: "https://www.instagram.com/atlas_performans/",
      logo: "/brand/academy/apa-logo.png",
      email: "info@atlasperformans.com",
    },
    theatre: {
      name: "Atlas Tiyatro Araştırmaları",
      shortName: "Tiyatro",
      path: "/tiyatro",
      instagram: "https://www.instagram.com/atlastiyatro/",
      logo: null as string | null,
    },
  },
} as const

export type SiteConfig = typeof siteConfig
