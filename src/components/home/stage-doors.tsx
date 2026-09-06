"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon } from "lucide-react"


import { cn } from "@/lib/utils"

/**
 * Anasayfa kapısı: sol seçimler (Akademi / Tiyatro), sağ görsel.
 * Beyaz + siyah — tam siyah ekran değil.
 */
function StageDoors() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<"academy" | "theatre">("theatre")

  return (
    <>
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-white text-black">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10">
          <p className="pointer-events-auto text-sm font-semibold tracking-[0.4em] uppercase">
            Atlas
          </p>
          <p className="pointer-events-auto hidden text-xs tracking-[0.18em] text-zinc-500 uppercase sm:block">
            Performans · Sahne
          </p>
        </div>

        <div className="mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col lg:flex-row">
          {/* Sol: seçimler */}
          <div className="relative z-20 flex w-full flex-col justify-end gap-4 px-6 pb-10 pt-24 sm:px-10 lg:w-[42%] lg:justify-center lg:gap-5 lg:py-16">
            <div className="mb-4 space-y-3 lg:mb-8">
              <p className="text-[11px] font-medium tracking-[0.28em] text-zinc-500 uppercase">
                İki kapı · bir çatı
              </p>
              <h1 className="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] leading-[1.05]">
                Atlas’a hoş geldiniz
              </h1>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-600 sm:text-base">
                Akademi veya tiyatro — sol taraftan yönünüzü seçin.
              </p>
            </div>

            <DoorChoice
              href="/akademi"
              active={active === "academy"}
              onHover={() => setActive("academy")}
              tone="light"
              kicker="Eğitim"
              title="Akademi"
              text="Oyunculuk, atölye, stüdyo — APA"
              cta="Akademiye gir"
              reduce={!!reduce}
            />
            <DoorChoice
              href="/tiyatro"
              active={active === "theatre"}
              onHover={() => setActive("theatre")}
              tone="dark"
              kicker="Sahne"
              title="Tiyatro"
              text="Dublörün Dilemması · ekip · arşiv"
              cta="Tiyatroya gir"
              reduce={!!reduce}
            />
          </div>

          {/* Sağ: görsel alan */}
          <div className="relative min-h-[48vh] flex-1 lg:min-h-0">
            <Image
              src={
                active === "academy"
                  ? "/brand/academy/atlas-bg2.png"
                  : "/posters/dublorun-dilemmasi/poster.jpg"
              }
              alt=""
              fill
              priority
              className="object-cover object-center grayscale transition duration-700"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent lg:bg-gradient-to-l lg:from-black/40 lg:via-transparent lg:to-white/90" />
            <div className="absolute bottom-8 left-6 right-6 z-10 sm:left-10 lg:bottom-12">
              <p className="text-[11px] tracking-[0.24em] text-white/70 uppercase">
                {active === "academy"
                  ? "Atlas Performans Akademisi"
                  : "Atlas Tiyatro Araştırmaları"}
              </p>
              <p className="mt-2 max-w-md text-2xl font-semibold text-white sm:text-3xl">
                {active === "academy"
                  ? "Stüdyo ve sahne eğitimi"
                  : "Dublörün Dilemması"}
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

function DoorChoice({
  href,
  active,
  onHover,
  tone,
  kicker,
  title,
  text,
  cta,
  reduce,
}: {
  href: string
  active: boolean
  onHover: () => void
  tone: "light" | "dark"
  kicker: string
  title: string
  text: string
  cta: string
  reduce: boolean
}) {
  const dark = tone === "dark"
  return (
    <motion.div
      animate={reduce ? undefined : { scale: active ? 1 : 0.985 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        href={href}
        onMouseEnter={onHover}
        onFocus={onHover}
        className={cn(
          "group flex items-end justify-between gap-4 rounded-[1.75rem] border p-6 transition sm:p-7",
          dark
            ? "border-black bg-black text-white"
            : "border-zinc-200 bg-white text-black hover:border-black",
          active
            ? dark
              ? "ring-2 ring-black ring-offset-2"
              : "border-black shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)]"
            : "opacity-90"
        )}
      >
        <div className="space-y-2">
          <p
            className={cn(
              "text-[11px] tracking-[0.22em] uppercase",
              dark ? "text-white/55" : "text-zinc-500"
            )}
          >
            {kicker}
          </p>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </p>
          <p
            className={cn(
              "max-w-xs text-sm",
              dark ? "text-white/70" : "text-zinc-600"
            )}
          >
            {text}
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium">
            {cta}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
        <span
          className={cn(
            "hidden size-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold sm:inline-flex",
            dark ? "bg-white text-black" : "bg-black text-white"
          )}
          aria-hidden
        >
          →
        </span>
      </Link>
    </motion.div>
  )
}

export { StageDoors }
