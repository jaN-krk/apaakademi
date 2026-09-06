"use client"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { rolesLabel } from "@/lib/labels"
import type { PersonRecord } from "@/content/types"

type WallItem = {
  person: PersonRecord
  href: string
  heightClass?: string
}

type ScrollWallProps = {
  items: WallItem[]
  title?: string
  subtitle?: string
  eyebrow?: string
  className?: string
}

/**
 * Aura 3D wall scroll — B&W portraits of cast / instructors.
 */
function ScrollWall({
  items,
  title = "Ekip",
  subtitle,
  eyebrow,
  className,
}: ScrollWallProps) {
  const valid = items.filter((i) => i.person.image?.src)
  if (valid.length === 0) return null

  const heights = [
    "h-[300px]",
    "h-[380px]",
    "h-[340px]",
    "h-[420px]",
    "h-[320px]",
  ]

  // 4 columns for desktop
  const cols: WallItem[][] = [[], [], [], []]
  valid.forEach((item, i) => {
    cols[i % 4].push({
      ...item,
      heightClass: heights[i % heights.length],
    })
  })

  // Duplicate for seamless vertical scroll
  const colsLooped = cols.map((col) => [...col, ...col])

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-white/5 bg-[#030508] py-20 text-white md:py-28",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        {(title || subtitle || eyebrow) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {eyebrow ? (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.24em] text-zinc-300 uppercase">
                <span className="size-1.5 rounded-full bg-white" />
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="mb-3 text-3xl font-normal tracking-tight md:text-5xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-zinc-400 md:text-[15px]">
                {subtitle}
              </p>
            ) : null}
          </div>
        )}

        <div
          className="hidden h-[720px] overflow-hidden md:block"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="grid h-full grid-cols-4 gap-4">
            {colsLooped.map((col, colIdx) => (
              <div key={colIdx} className="relative h-full overflow-hidden">
                <div
                  className={cn(
                    "flex flex-col gap-4 will-change-transform",
                    colIdx % 2 === 0
                      ? "animate-cascade-up [animation-duration:36s]"
                      : "animate-cascade-down [animation-duration:40s]"
                  )}
                >
                  {col.map((item, i) => (
                    <WallCard
                      key={`${item.person.id}-${i}`}
                      item={item}
                      heightClass={item.heightClass}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile horizontal */}
        <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">
          {valid.map((item) => (
            <div key={item.person.id} className="w-[240px] shrink-0">
              <WallCard item={item} heightClass="h-[340px]" alwaysShow />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WallCard({
  item,
  heightClass = "h-[360px]",
  alwaysShow,
}: {
  item: WallItem
  heightClass?: string
  alwaysShow?: boolean
}) {
  const p = item.person
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative isolate block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02]",
        heightClass
      )}
    >
      <Image
        src={p.image!.src!}
        alt={p.imageAlt ?? p.fullName}
        fill
        className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:brightness-90"
        sizes="(max-width: 768px) 70vw, 25vw"
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black via-black/70 to-transparent p-5 pt-16 transition",
          alwaysShow
            ? "opacity-100"
            : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <p className="text-[0.95rem] font-medium tracking-tight text-white">
          {p.fullName}
        </p>
        <p className="mt-1 text-[0.7rem] tracking-[0.2em] text-zinc-400 uppercase">
          {rolesLabel(p.roles)}
        </p>
      </div>
    </Link>
  )
}

export { ScrollWall }
