"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

function BrandSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const onAcademy = pathname.startsWith("/akademi")
  const onTheatre = pathname.startsWith("/tiyatro")

  return (
    <div
      role="navigation"
      aria-label="Marka geçişi"
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white p-0.5 text-xs shadow-sm",
        className
      )}
    >
      {[
        { href: "/akademi", label: "Akademi", active: onAcademy },
        { href: "/tiyatro", label: "Tiyatro", active: onTheatre },
        {
          href: "/",
          label: "Atlas",
          active: !onAcademy && !onTheatre,
        },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            item.active
              ? "bg-black text-white"
              : "text-zinc-500 hover:text-black"
          )}
          aria-current={item.active ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export { BrandSwitcher }
