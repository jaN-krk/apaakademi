import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type BrandLogoProps = { brand: "academy" | "theatre" | "atlas"; className?: string; href?: string; inverted?: boolean }

function BrandLogo({ brand, className, href, inverted }: BrandLogoProps) {
  const content = <span className={cn("inline-flex shrink-0 items-center gap-3", inverted ? "text-white" : "text-black", className)}>
    {brand !== "theatre" && <Image src="/brand/academy/apa-supplied-light.png" alt="APA" width={447} height={447} className={cn("brand-apa-mark size-[68px] object-contain", inverted ? "invert mix-blend-screen" : "mix-blend-multiply")} priority />}
    <span className="flex flex-col border-l border-current/20 pl-3 leading-tight">
      <span className="text-[15px] font-semibold tracking-[.04em]">ATLAS</span>
      <span className="mt-1 text-[12px]">{brand === "theatre" ? "Tiyatro Araştırmaları" : brand === "atlas" ? "Tiyatro & Akademi" : "Performans Akademisi"}</span>
    </span>
  </span>
  return href ? <Link href={href} aria-label={brand === "theatre" ? "Atlas Tiyatro — ana sayfa" : "Atlas — ana sayfa"}>{content}</Link> : content
}
export { BrandLogo, type BrandLogoProps }

