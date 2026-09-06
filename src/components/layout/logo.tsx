import Link from "next/link"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

type LogoProps = {
  className?: string
  href?: string
  label?: string
}

function Logo({
  className,
  href = "/",
  label = siteConfig.name,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center text-base font-semibold tracking-tight text-foreground",
        className
      )}
    >
      <span>{label}</span>
    </Link>
  )
}

export { Logo, type LogoProps }
