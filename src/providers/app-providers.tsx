"use client"

import type { ReactNode } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/providers/theme-provider"

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
