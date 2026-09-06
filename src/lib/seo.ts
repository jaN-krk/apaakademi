import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

const baseUrl = siteConfig.url

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path
  return new URL(path, baseUrl).toString()
}

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
