"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type LanyardBadgeProps = {
  name: string
  role?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

/**
 * Lanyard-inspired badge (React Bits Lanyard concept without 3D mesh deps).
 * Card hangs from a band; custom portrait on face.
 */
function LanyardBadge({
  name,
  role,
  imageSrc,
  imageAlt,
  className,
}: LanyardBadgeProps) {
  const reduce = useReducedMotion()

  return (
    <div className={cn("relative mx-auto w-full max-w-[280px]", className)}>
      {/* Strap */}
      <div className="relative mx-auto flex h-20 w-full flex-col items-center">
        <div className="h-10 w-[3px] bg-zinc-400" />
        <div className="h-2 w-8 rounded-full bg-zinc-500 shadow-sm" />
        <div className="mt-1 flex gap-10">
          <div className="h-8 w-[3px] origin-top rotate-[-8deg] bg-zinc-400" />
          <div className="h-8 w-[3px] origin-top rotate-[8deg] bg-zinc-400" />
        </div>
      </div>

      <motion.div
        className="relative -mt-6 origin-top"
        animate={
          reduce
            ? undefined
            : {
                rotate: [ -2.5, 2.5, -2.5 ],
              }
        }
        transition={
          reduce
            ? undefined
            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "50% 0%" }}
      >
        <div className="overflow-hidden rounded-[1.4rem] bg-black p-2 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] bg-zinc-900">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt ?? name}
                fill
                quality={90}
                className="object-cover object-[center_18%]"
                sizes="280px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-zinc-800 text-4xl font-semibold text-white/80">
                {name
                  .split(" ")
                  .slice(0, 2)
                  .map((p) => p[0]?.toLocaleUpperCase("tr-TR") ?? "")
                  .join("")}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-16">
              <p className="text-lg font-semibold leading-tight text-white">
                {name}
              </p>
              {role ? (
                <p className="mt-1 text-xs tracking-wide text-white/65 uppercase">
                  {role}
                </p>
              ) : null}
            </div>
          </div>
          {/* clip slot */}
          <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-zinc-700" />
        </div>
      </motion.div>
    </div>
  )
}

export { LanyardBadge }
