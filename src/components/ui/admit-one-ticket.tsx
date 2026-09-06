"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type AdmitOneTicketProps = {
  name?: string
  presenter?: string
  event: string
  venue: string
  dates: string
  stubText?: string
  watermark?: string
  meta?: string
  width?: number
  className?: string
  href?: string
}

/**
 * Klasik admit-one bilet — beyaz gövde, siyah stub, delikli çizgi.
 */
function AdmitOneTicket({
  name = "Atlas Tiyatro Araştırmaları",
  presenter = "Atlas sunar",
  event,
  venue,
  dates,
  stubText = "Bir bilet",
  watermark,
  meta,
  width = 680,
  className,
  href,
}: AdmitOneTicketProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: py * -4, y: px * 6 })
  }

  const onLeave = () => setTilt({ x: 0, y: 0 })

  const body = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        maxWidth: width,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className={cn(
        "relative mx-auto w-full select-none",
        "shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="flex flex-col overflow-hidden rounded-sm bg-white text-black ring-1 ring-black/10 sm:flex-row sm:rounded-none">
        {/* — Main — */}
        <div className="relative flex min-h-[200px] flex-1 flex-col justify-between border-b border-black/10 p-6 sm:min-h-[220px] sm:border-b-0 sm:p-8 sm:pr-10">
          {watermark ? (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-[42%] -translate-x-1/2 -translate-y-1/2 font-mono text-[5.5rem] leading-none font-bold tracking-tighter text-black/[0.04] sm:text-[7.5rem]"
            >
              {watermark}
            </span>
          ) : null}

          <div className="relative">
            <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
              {presenter}
            </p>
            <h3 className="mt-3 text-[1.65rem] leading-[1.12] font-semibold tracking-tight sm:text-[1.9rem]">
              {event}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">{name}</p>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-black/10 pt-5">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
                Tarih
              </p>
              <p className="mt-1 text-[13px] leading-snug font-medium">{dates}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
                Mekân
              </p>
              <p className="mt-1 text-[13px] leading-snug font-medium">{venue}</p>
            </div>
            {meta ? (
              <p className="col-span-2 font-mono text-[10px] text-zinc-400">
                {meta}
              </p>
            ) : null}
          </div>

          {/* Barcode */}
          <div
            aria-hidden
            className="relative mt-6 flex h-9 items-end gap-[1.5px] overflow-hidden"
          >
            {Array.from({ length: 56 }).map((_, i) => {
              const h = 35 + ((i * 23 + i * i) % 65)
              const wide = i % 7 === 0
              return (
                <span
                  key={i}
                  className={cn("shrink-0 bg-black", wide ? "w-[2.5px]" : "w-px")}
                  style={{ height: `${h}%` }}
                />
              )
            })}
          </div>
        </div>

        {/* — Perforation — */}
        <div
          className="relative hidden w-0 shrink-0 sm:block"
          aria-hidden
        >
          {/* notch punches (page is white) */}
          <span className="absolute top-0 left-1/2 z-20 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-1 ring-black/10" />
          <span className="absolute bottom-0 left-1/2 z-20 size-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-white ring-1 ring-black/10" />
          <span className="absolute inset-y-5 left-1/2 z-10 w-px -translate-x-1/2 border-l border-dashed border-black/30" />
        </div>
        <div className="relative h-0 sm:hidden" aria-hidden>
          <span className="absolute top-0 left-0 z-20 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-1 ring-black/10" />
          <span className="absolute top-0 right-0 z-20 size-3.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-1 ring-black/10" />
          <span className="absolute top-0 right-6 left-6 border-t border-dashed border-black/30" />
        </div>

        {/* — Stub — */}
        <div className="flex w-full shrink-0 flex-row items-center justify-between gap-4 bg-black px-6 py-5 text-white sm:w-[132px] sm:flex-col sm:items-center sm:justify-between sm:px-4 sm:py-7">
          <div className="flex flex-col sm:items-center">
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase">
              Gişe
            </p>
            <p
              className={cn(
                "mt-2 text-sm font-semibold tracking-[0.18em] uppercase sm:mt-6 sm:text-[15px]",
                "sm:[writing-mode:vertical-rl] sm:rotate-180"
              )}
            >
              {stubText}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 sm:items-center">
            <div className="flex size-10 items-center justify-center rounded-full border border-white/25">
              <span className="text-[9px] font-bold tracking-[0.12em] uppercase">
                ATL
              </span>
            </div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/45 uppercase">
              Atlas
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        {body}
      </a>
    )
  }

  return body
}

export { AdmitOneTicket }
export default AdmitOneTicket
