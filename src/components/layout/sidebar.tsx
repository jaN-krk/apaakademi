import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type LayoutSidebarProps = {
  children: ReactNode
  className?: string
  "aria-label"?: string
}

/**
 * Site/layout sidebar skeleton.
 * For the full app shell sidebar primitives, use `@/components/ui/sidebar`.
 */
function LayoutSidebar({
  children,
  className,
  "aria-label": ariaLabel = "Sidebar",
}: LayoutSidebarProps) {
  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border bg-background",
        className
      )}
    >
      {children}
    </aside>
  )
}

export { LayoutSidebar, type LayoutSidebarProps }
