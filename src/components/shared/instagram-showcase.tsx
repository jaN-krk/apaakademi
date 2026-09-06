"use client"

import { ExternalLinkIcon } from "lucide-react"

import type { MediaRecord } from "@/content/types"
import { cn } from "@/lib/utils"

type InstagramShowcaseProps = {
  items: MediaRecord[]
  className?: string
}

const brandLabel: Record<string, string> = {
  academy: "Akademi",
  theatre: "Tiyatro",
  atlas: "Atlas",
}

function IgGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * Resmî Instagram profilleri — siyah / beyaz kart + embed.
 */
function InstagramShowcase({ items, className }: InstagramShowcaseProps) {
  const igItems = items.filter((i) => i.platform === "instagram")
  if (igItems.length === 0) return null

  return (
    <div className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {igItems.map((item) => {
        const url = item.postUrl.endsWith("/")
          ? item.postUrl
          : `${item.postUrl}/`
        const handle = item.title.startsWith("@")
          ? item.title
          : `@${item.title.replace(/^@/, "")}`

        return (
          <article
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] transition hover:border-zinc-300"
          >
            <header className="flex items-start justify-between gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <IgGlyph className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-tight">
                    {handle}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {item.captionSummary ??
                      brandLabel[item.brand] ??
                      "Instagram"}
                  </p>
                </div>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition hover:border-black hover:text-black"
              >
                Profil
                <ExternalLinkIcon className="size-3" />
              </a>
            </header>

            <div className="relative min-h-[420px] flex-1 bg-zinc-50">
              <iframe
                title={`${handle} Instagram`}
                src={`${url}embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allow="encrypted-media; clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <footer className="border-t border-zinc-100 px-4 py-3">
              <p className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">
                {brandLabel[item.brand] ?? "Atlas"} · resmî
              </p>
            </footer>
          </article>
        )
      })}
    </div>
  )
}

export { InstagramShowcase }
