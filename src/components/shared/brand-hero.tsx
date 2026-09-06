import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type BrandHeroProps = {
  brand: "academy" | "theatre"
  eyebrow: string
  title: string
  titleLine2?: string
  description: string
  primaryCta: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  imageSrc: string
  imageAlt: string
  sideImages?: { src: string; alt: string }[]
  className?: string
}

/**
 * Akademi / Tiyatro anasayfa hero — beyaz zemin, siyah vurgu, uzun kompozisyon.
 */
function BrandHero({
  brand,
  eyebrow,
  title,
  titleLine2,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  sideImages = [],
  className,
}: BrandHeroProps) {
  const strip = sideImages.slice(0, 6)

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-zinc-200 bg-white text-black",
        className
      )}
    >
      <div className="mx-auto grid min-h-[min(92vh,900px)] max-w-[1500px] lg:grid-cols-12">
        <div className="flex flex-col justify-end gap-8 px-6 py-14 sm:px-10 sm:py-16 lg:col-span-5 lg:py-20">
          <p className="text-[11px] font-medium tracking-[0.28em] text-zinc-500 uppercase">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] leading-[1.02]">
            {title}
            {titleLine2 ? (
              <>
                <br />
                <span className="text-zinc-400">{titleLine2}</span>
              </>
            ) : null}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-zinc-600 sm:text-[17px]">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            {primaryCta.external ? (
              <a
                href={primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                {primaryCta.label}
                <ArrowRightIcon className="size-4" />
              </a>
            ) : (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                {primaryCta.label}
                <ArrowRightIcon className="size-4" />
              </Link>
            )}
            {secondaryCta ? (
              secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-medium text-black transition hover:border-black"
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-medium text-black transition hover:border-black"
                >
                  {secondaryCta.label}
                </Link>
              )
            ) : null}
          </div>
          {brand === "academy" ? (
            <p className="text-xs tracking-[0.16em] text-zinc-400 uppercase">
              APA · Atlas Performans Akademisi
            </p>
          ) : (
            <p className="text-xs tracking-[0.16em] text-zinc-400 uppercase">
              Atlas Tiyatro Araştırmaları
            </p>
          )}
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative h-[52vh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover object-center grayscale"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-white/30" />
          </div>

          {strip.length > 0 ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden gap-2 p-4 lg:flex">
              {strip.map((img) => (
                <div
                  key={img.src}
                  className="relative h-24 w-20 overflow-hidden rounded-xl border border-white/30 shadow-lg"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-top grayscale"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export { BrandHero }
