import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

const links = [
  { href: "/akademi", label: "Ana Sayfa" },
  { href: "/akademi/programlar", label: "Programlar" },
  { href: "/akademi/egitmenler", label: "Eğitmenler" },
  { href: "/akademi/medya", label: "Medya" },
  { href: "/akademi/basvuru", label: "Başvuru" },
  { href: "/akademi/hakkimizda", label: "Hakkımızda" },
]

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="brand-academy flex min-h-full flex-col bg-background text-foreground">
      <SiteHeader brand="academy" links={links} variant="light" />
      <main className="flex-1">{children}</main>
      <SiteFooter brand="academy" />
    </div>
  )
}
