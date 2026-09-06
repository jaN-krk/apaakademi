import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  align?: "left" | "center"
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading-editorial mb-10 flex flex-col gap-4 md:mb-12",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between md:text-left",
        className
      )}
    >
      <div className={cn("max-w-2xl space-y-3", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="text-[0.7rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export { SectionHeading }
