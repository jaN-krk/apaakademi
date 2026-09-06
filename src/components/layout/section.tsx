import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionSpacing = "sm" | "default" | "lg" | "none"

type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  spacing?: SectionSpacing
  "aria-labelledby"?: string
  "aria-label"?: string
}

const spacingMap: Record<SectionSpacing, string> = {
  none: "",
  sm: "section-padding-sm",
  default: "section-padding",
  lg: "section-padding-lg",
}

function Section({
  children,
  className,
  id,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(spacingMap[spacing], className)}
      {...props}
    >
      {children}
    </section>
  )
}

export { Section, type SectionProps }
