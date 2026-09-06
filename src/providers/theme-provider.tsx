"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { themeConfig } from "@/config/theme"

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={themeConfig.attribute}
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      storageKey={themeConfig.storageKey}
      disableTransitionOnChange={themeConfig.disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
