import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Kullanım Koşulları",
  description: "Atlas web sitesi kullanım koşulları.",
  path: "/kullanim-kosullari",
})

export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader brand="atlas" links={[{ href: "/", label: "Ana" }]} />
      <main className="container-app section-y max-w-3xl flex-1 space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Kullanım Koşulları
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sitedeki program, etkinlik ve bilet bilgileri kaynak bağlantılarıyla
          sunulur. Bilet ve kayıt işlemleri ilgili üçüncü taraf platformların
          koşullarına tabidir. Marka logoları ve medya dosyaları ilgili
          hak sahiplerine aittir.
        </p>
      </main>
      <SiteFooter brand="atlas" />
    </div>
  )
}
