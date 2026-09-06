"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { BrandLogo } from "@/components/brand/brand-logo"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export type NavLink = { href: string; label: string }
type SiteHeaderProps = { brand: "atlas" | "academy" | "theatre"; links: NavLink[]; cta?: { href: string; label: string; external?: boolean }; className?: string; variant?: "light" | "dark" }

function SiteHeader({ brand, links, cta, className, variant = "light" }: SiteHeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const overlay = pathname === "/"
  const [surface, setSurface] = useState({ dark: variant === "dark", scrolled: false })
  const dark = surface.dark
  useEffect(() => {
    let frame = 0
    const update = () => {
      const sampleY = (headerRef.current?.offsetHeight ?? 88) / 2
      let tone = overlay && window.scrollY < 80 ? "dark" : "light"
      // Nested marked sections take precedence over the page's base surface.
      document.querySelectorAll<HTMLElement>("[data-header-tone]").forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= sampleY && rect.bottom > sampleY) tone = section.dataset.headerTone ?? tone
      })
      const next = { dark: tone === "dark", scrolled: window.scrollY > 24 }
      setSurface(previous => previous.dark === next.dark && previous.scrolled === next.scrolled ? previous : next)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule) }
  }, [pathname, overlay])
  const home = brand === "academy" ? "/akademi" : brand === "theatre" ? "/tiyatro" : "/"
  const action = cta ?? (brand === "theatre" ? { href: "/tiyatro/takvim", label: "Takvim & bilet" } : { href: "/akademi/basvuru", label: "Akademiye başvur" })
  const contact = brand === "theatre" ? "/tiyatro/iletisim" : "/akademi/iletisim"
  const nav = [...links.filter(l => l.href !== action.href && !l.href.includes("iletisim")), { href: contact, label: "İletişim" }]
  return <header ref={headerRef} data-tone={dark ? "dark" : "light"} data-scrolled={surface.scrolled} className={cn("atlas-site-header top-0 z-50 border-b", overlay ? "fixed inset-x-0" : "sticky", className)}>
    <div className="header-inner mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
      <BrandLogo brand={brand} href={home} inverted={dark} />
      <nav aria-label="Ana menü" className="hidden xl:block">
        <ul className="flex items-center gap-6">{nav.map(link => {
          const active = pathname === link.href || (link.href !== home && pathname.startsWith(link.href + "/"))
          return <li key={link.href}><Link href={link.href} aria-current={active ? "page" : undefined} className={cn("relative block py-8 text-sm transition-opacity hover:opacity-60 after:absolute after:inset-x-0 after:bottom-5 after:h-px after:bg-current", active ? "font-semibold after:opacity-100" : "after:opacity-0")}>{link.label}</Link></li>
        })}</ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link href={action.href} {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cn("header-application hidden items-center gap-5 px-5 py-3.5 text-sm font-medium sm:inline-flex", dark ? "bg-white text-black" : "bg-black text-white")}>{action.label}<ArrowUpRight size={17} /></Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><button className="flex size-11 items-center justify-center border border-current/20 xl:hidden" aria-label="Menüyü aç"><Menu size={21} /></button></SheetTrigger>
          <SheetContent className="w-full overflow-y-auto bg-white p-6 text-black sm:max-w-md" showCloseButton={false}>
            <SheetHeader className="flex-row items-center justify-between border-b px-0 pb-5"><SheetTitle className="sr-only">Atlas menü</SheetTitle><BrandLogo brand={brand}/><SheetClose asChild><button aria-label="Menüyü kapat" className="flex size-11 items-center justify-center rounded-full border border-neutral-200"><X size={20}/></button></SheetClose></SheetHeader>
            <nav aria-label="Mobil menü" className="flex flex-col">{nav.map((link, i) => <Link key={link.href} href={link.href} aria-current={pathname===link.href ? "page":undefined} onClick={() => setOpen(false)} className="group flex items-center justify-between border-b border-neutral-200 py-5 text-2xl tracking-tight hover:pl-2 transition-all"><span>{link.label}</span><span className="font-mono text-xs tracking-normal text-neutral-400">0{i + 1}</span></Link>)}<Link href={action.href} {...(action.external?{target:"_blank",rel:"noopener noreferrer"}:{})} onClick={() => setOpen(false)} className="mt-6 flex items-center justify-between rounded-sm bg-black p-5 text-sm text-white">{action.label}<ArrowUpRight size={20}/></Link></nav>
            <div className="mt-auto pt-8"><p className="mb-4 font-mono text-xs uppercase tracking-wider text-neutral-400">Atlas’ı keşfet</p><div className="grid grid-cols-2 gap-4"><Link href="/akademi" onClick={()=>setOpen(false)} className="flex items-center justify-between border-t border-black pt-4 text-sm">Akademi<ArrowUpRight size={15}/></Link><Link href="/tiyatro" onClick={()=>setOpen(false)} className="flex items-center justify-between border-t border-black pt-4 text-sm">Tiyatro<ArrowUpRight size={15}/></Link></div>{brand!=="atlas"&&<Link href="/" onClick={()=>setOpen(false)} className="mt-6 inline-block text-xs text-neutral-500">Atlas ana sayfa</Link>}</div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
}
export { SiteHeader }

