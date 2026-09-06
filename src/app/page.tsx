import type { Metadata } from "next"

import { HomeDashboard } from "@/components/home/home-dashboard"
import { HomeBelowFold } from "@/components/home/home-below-fold"
import { SiteFooter } from "@/components/layout/site-footer"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"
import { SiteHeader } from "@/components/layout/site-header"

export const metadata: Metadata = createMetadata({
  title: "Atlas — Sahneden Atölyeye",
  description: siteConfig.description,
  path: "/",
})

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atlas",
    url: siteConfig.url,
    description: siteConfig.description,
    department: [
      {
        "@type": "EducationalOrganization",
        name: siteConfig.brands.academy.name,
        url: `${siteConfig.url}/akademi`,
      },
      {
        "@type": "PerformingGroup",
        name: siteConfig.brands.theatre.name,
        url: `${siteConfig.url}/tiyatro`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SiteHeader brand="atlas" variant="dark" cta={{href:"/tiyatro/takvim",label:"Sahne takvimi"}} links={[{href:"/tiyatro",label:"Tiyatro"},{href:"/tiyatro/oyunlar",label:"Oyunlar"},{href:"/tiyatro/ekip",label:"Ekip"},{href:"/akademi",label:"APA / Akademi"}]} />
      <main>
        <HomeDashboard />
        <HomeBelowFold />
      </main>
      <SiteFooter brand="atlas" />
    </>
  )
}

