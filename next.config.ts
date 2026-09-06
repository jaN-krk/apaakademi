import type { NextConfig } from "next"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Prefer sharper portraits on person cards / carousel
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atlasperformans.com",
      },
    ],
  },
}

export default nextConfig
