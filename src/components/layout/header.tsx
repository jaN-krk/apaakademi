import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type HeaderProps = {
  children: ReactNode
  className?: string
}

function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        className
      )}
    >
      {children}
    </header>
  )
}

export { Header, type HeaderProps }
