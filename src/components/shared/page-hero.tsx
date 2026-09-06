import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  imageSrc?: string
  imageAlt?: string
  className?: string
  watermark?: string
}

/**
 * Reference-style hero: white page, large dark rounded frame, full image.
 */
function PageHero({
  eyebrow,
  title,
  description,
  actions,
  imageSrc,
  imageAlt = "",
  className,
  watermark,
}: PageHeroProps) {
  return (
    <section className={cn("bg-white pt-4 pb-2", className)}>
      <div className="container-app">
        <div data-header-tone="dark" className="relative overflow-hidden rounded-sm bg-black text-white">
          {imageSrc ? (
            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-center opacity-80"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            </div>
          ) : null}

          <div className="relative flex min-h-[min(72vh,760px)] flex-col justify-between p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl space-y-5">
              {eyebrow ? (
                <p className="inline-flex border-b border-white/40 pb-3 text-xs font-medium tracking-[0.15em] text-white/80 uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-4xl font-medium leading-[1.03] tracking-[-.045em] sm:text-5xl lg:text-7xl">
                {title}
              </h1>
              {description ? (
                <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  {description}
                </p>
              ) : null}
              {actions ? (
                <div className="flex flex-wrap gap-3 pt-2">{actions}</div>
              ) : null}
            </div>

            {watermark ? (
              <p
                aria-hidden
                className="pointer-events-none select-none text-[clamp(3rem,14vw,9rem)] leading-none font-semibold tracking-tighter text-white/10"
              >
                {watermark}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export { PageHero }
