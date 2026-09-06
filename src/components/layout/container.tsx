import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ContainerProps = {
  children: ReactNode
  className?: string
}

function Container({ children, className }: ContainerProps) {
  return <div className={cn("container-app", className)}>{children}</div>
}

export { Container, type ContainerProps }
