"use client"

import type { ReactNode } from "react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type MobileMenuProps = {
  trigger: ReactNode
  children: ReactNode
  title?: string
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

function MobileMenu({
  trigger,
  children,
  title = "Menu",
  side = "right",
  className,
}: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className={cn("w-full max-w-xs", className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileMenu, type MobileMenuProps }
