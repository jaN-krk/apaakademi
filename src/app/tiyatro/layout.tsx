import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

const links = [
  { href: "/tiyatro", label: "Ana Sayfa" },
  { href: "/tiyatro/oyunlar", label: "Oyunlar" },
  { href: "/tiyatro/ekip", label: "Ekip" },
  { href: "/tiyatro/takvim", label: "Takvim" },
  { href: "/tiyatro/medya", label: "Medya" },
  { href: "/tiyatro/hakkimizda", label: "Hakkımızda" },
]

export default function TheatreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="brand-theatre flex min-h-full flex-col bg-background text-foreground">
      <SiteHeader brand="theatre" links={links} variant="light" />
      <main className="flex-1">{children}</main>
      <SiteFooter brand="theatre" />
    </div>
  )
}
