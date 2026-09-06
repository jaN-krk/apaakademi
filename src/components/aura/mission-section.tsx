import Image from "next/image"

import { cn } from "@/lib/utils"

type MissionSectionProps = {
  label: string
  headline: string
  body: string
  imageSrc: string
  imageAlt: string
  className?: string
}

/**
 * Aura mission statement + full-bleed image — B&W.
 */
function MissionSection({
  label,
  headline,
  body,
  imageSrc,
  imageAlt,
  className,
}: MissionSectionProps) {
  return (
    <section className={cn("bg-white", className)}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="py-16 sm:py-24 md:py-28">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                {label}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="mb-8 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
                {headline}
              </p>
              <p className="max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl">
                {body}
              </p>
            </div>
          </div>
          <div className="relative mt-14 h-72 overflow-hidden rounded-3xl border border-black/5 sm:h-[480px] lg:h-[560px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { MissionSection }
