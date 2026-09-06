import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Gizlilik",
  description: "Atlas web sitesi gizlilik bilgilendirmesi.",
  path: "/gizlilik",
})

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader brand="atlas" links={[{ href: "/", label: "Ana" }]} />
      <main className="container-app section-y max-w-3xl flex-1 space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Gizlilik</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Başvuru formunda yalnızca iletişim ve program ilgisi bilgisi istenir.
          Form verisi yalnızca değerlendirme ve dönüş amacıyla işlenir.
          Çevrimiçi başvuru kullanılamadığında e-posta ve WhatsApp
          iletişim seçenekleri sunulur.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Üçüncü taraf platformlar (Instagram, Biletinial, haritalar) kendi
          gizlilik politikalarına tabidir. Instagram içerikleri varsayılan
          olarak otomatik gömülmez.
        </p>
      </main>
      <SiteFooter brand="atlas" />
    </div>
  )
}
