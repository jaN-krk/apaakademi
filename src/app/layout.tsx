import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
import { PageScrollBlur } from "@/components/shared/page-scroll-blur"
import { ScrollChoreography } from "@/components/shared/scroll-choreography"
import { siteConfig } from "@/config/site"
import { AppProviders } from "@/providers/app-providers"
import { absoluteUrl } from "@/lib/seo"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Atlas — Performans Akademisi & Tiyatro Araştırmaları",
    template: "%s | Atlas",
  },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Atlas",
    description: siteConfig.description,
    url: absoluteUrl("/"),
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="page-top" className="flex min-h-full flex-col overflow-x-clip bg-background text-foreground">
        <AppProviders>
          {children}
          <PageScrollBlur />
          <ScrollChoreography />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  )
}
