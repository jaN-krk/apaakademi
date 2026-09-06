"use client"

import BorderGlow from "@/components/BorderGlow"
import { cn } from "@/lib/utils"

type GlowStatProps = {
  label: string
  value: string
  detail?: string
  className?: string
}

/** React Bits BorderGlow — no icons, pure type + figures */
function GlowStat({ label, value, detail, className }: GlowStatProps) {
  return (
    <BorderGlow
      className={cn("min-h-[160px]", className)}
      backgroundColor="#0a0a0a"
      glowColor="0 0 90"
      borderRadius={28}
      glowIntensity={0.85}
      edgeSensitivity={28}
      animated
      colors={["#fafafa", "#a1a1aa", "#3f3f46"]}
      fillOpacity={0.35}
    >
      <div className="flex h-full min-h-[160px] flex-col justify-between p-7 text-white">
        <p className="text-[11px] font-medium tracking-[0.22em] text-white/55 uppercase">
          {label}
        </p>
        <div>
          <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {value}
          </p>
          {detail ? (
            <p className="mt-2 text-sm leading-relaxed text-white/65">{detail}</p>
          ) : null}
        </div>
      </div>
    </BorderGlow>
  )
}

type GlowPanelProps = {
  children: React.ReactNode
  className?: string
  light?: boolean
}

function GlowPanel({ children, className, light }: GlowPanelProps) {
  return (
    <BorderGlow
      className={className}
      backgroundColor={light ? "#f4f4f5" : "#0a0a0a"}
      glowColor={light ? "0 0 25" : "0 0 90"}
      borderRadius={28}
      glowIntensity={light ? 0.4 : 0.8}
      animated
      colors={
        light
          ? ["#ffffff", "#e4e4e7", "#d4d4d8"]
          : ["#fafafa", "#a1a1aa", "#3f3f46"]
      }
      fillOpacity={light ? 0.25 : 0.35}
    >
      {children}
    </BorderGlow>
  )
}

export { GlowStat, GlowPanel }
