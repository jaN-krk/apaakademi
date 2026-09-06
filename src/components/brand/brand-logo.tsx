import Link from "next/link"
import { cn } from "@/lib/utils"

type BrandLogoProps = { brand: "academy" | "theatre" | "atlas"; className?: string; href?: string; inverted?: boolean }

function BrandLogo({ brand, className, href, inverted }: BrandLogoProps) {
  const content = <span className={cn("inline-flex shrink-0 items-center gap-3", inverted ? "text-white" : "text-black", className)}>
    {brand !== "theatre" && <span role="img" aria-label="APA" className="brand-apa-mark block size-[68px] shrink-0 bg-current" style={{maskImage:'url("/brand/academy/apa-supplied-dark.png")',maskMode:"luminance",maskSize:"contain",maskRepeat:"no-repeat",maskPosition:"center"}}/>}
    <span className="flex flex-col border-l border-current/20 pl-3 leading-tight">
      <span className="text-[15px] font-semibold tracking-[.04em]">ATLAS</span>
      <span className="mt-1 text-[12px]">{brand === "theatre" ? "Tiyatro Araştırmaları" : brand === "atlas" ? "Tiyatro & Akademi" : "Performans Akademisi"}</span>
    </span>
  </span>
  return href ? <Link href={href} aria-label={brand === "theatre" ? "Atlas Tiyatro — ana sayfa" : "Atlas — ana sayfa"}>{content}</Link> : content
}
export { BrandLogo, type BrandLogoProps }

