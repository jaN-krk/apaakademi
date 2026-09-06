export const themeConfig = {
  defaultTheme: "system" as const,
  enableSystem: true,
  attribute: "class" as const,
  storageKey: "atlas-theme",
  disableTransitionOnChange: true,
}

export type ThemeConfig = typeof themeConfig
