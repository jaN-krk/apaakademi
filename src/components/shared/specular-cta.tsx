"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import SpecularButton from "@/components/SpecularButton"
import { cn } from "@/lib/utils"

type SpecularCtaProps = {
  children: React.ReactNode
  href?: string
  external?: boolean
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  className?: string
  variant?: "dark" | "light"
}

function SpecularCta({
  children,
  href,
  external,
  onClick,
  size = "md",
  className,
  variant = "dark",
}: SpecularCtaProps) {
  const router = useRouter()
  const dark = variant === "dark"

  const handle = () => {
    if (onClick) {
      onClick()
      return
    }
    if (!href) return
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    router.push(href)
  }

  return (
    <span className={cn("inline-flex", className)}>
      <SpecularButton
        size={size}
        radius={999}
        tint={dark ? "#0a0a0a" : "#f4f4f5"}
        tintOpacity={dark ? 0.94 : 0.98}
        textColor={dark ? "#ffffff" : "#0a0a0a"}
        lineColor={dark ? "#ffffff" : "#0a0a0a"}
        baseColor={dark ? "#111111" : "#e4e4e7"}
        intensity={1.15}
        autoAnimate
        onClick={handle}
      >
        {children}
      </SpecularButton>
    </span>
  )
}

export { SpecularCta }
