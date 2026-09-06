import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Çerez Politikası",
  description: "Atlas web sitesi çerez bilgilendirmesi.",
  path: "/cerez-politikasi",
})

export default function CookiesPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader brand="atlas" links={[{ href: "/", label: "Ana" }]} />
      <main className="container-app section-y max-w-3xl flex-1 space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Çerez Politikası
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tema tercihi tarayıcıda saklanabilir. Zorunlu teknik
          çerezler dışında pazarlama çerezi eklenmemiştir. Harici iframe veya
          bağlantılara tıklamanız üçüncü taraf çerezlerini tetikleyebilir.
        </p>
      </main>
      <SiteFooter brand="atlas" />
    </div>
  )
}
