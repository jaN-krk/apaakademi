import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"

type NavbarProps = {
  children: ReactNode
  className?: string
}

function Navbar({ children, className }: NavbarProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn("flex h-14 w-full items-center", className)}
    >
      <Container className="flex items-center justify-between gap-4">
        {children}
      </Container>
    </nav>
  )
}

export { Navbar, type NavbarProps }
