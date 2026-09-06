import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader brand="atlas" links={[{ href: "/", label: "Ana" }]} />
      <main className="container-app flex flex-1 flex-col items-start justify-center gap-4 py-24">
        <span aria-hidden="true" className="text-[clamp(6rem,18vw,12rem)] font-medium leading-none tracking-[-.08em] text-neutral-200">404</span>
        <h1 className="text-4xl font-medium tracking-tight">Bu sayfanın perdesi kapalı.</h1>
        <p className="text-sm text-muted-foreground">
          Bu bağlantı değişmiş veya sayfa kaldırılmış olabilir. Akademiye ya da tiyatroya dönerek keşfetmeye devam edebilirsin.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/">Atlas</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/akademi">Akademi</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tiyatro">Tiyatro</Link>
          </Button>
        </div>
      </main>
      <SiteFooter brand="atlas" />
    </div>
  )
}
