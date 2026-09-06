import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"

type FooterProps = {
  children?: ReactNode
  className?: string
}

function Footer({ children, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "mt-auto w-full border-t border-border bg-background",
        className
      )}
    >
      <Container className="py-8">{children}</Container>
    </footer>
  )
}

export { Footer, type FooterProps }
