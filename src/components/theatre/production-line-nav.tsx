"use client"

import { useRouter } from "next/navigation"
import LineSidebar from "@/components/LineSidebar"
import { cn } from "@/lib/utils"

type ProductionNavItem = {
  label: string
  href: string
}

type ProductionLineNavProps = {
  items: ProductionNavItem[]
  className?: string
  activeIndex?: number
}

/** React Bits Line Sidebar — productions list with proximity shift */
function ProductionLineNav({
  items,
  className,
  activeIndex = 0,
}: ProductionLineNavProps) {
  const router = useRouter()

  if (items.length === 0) return null

  return (
    <div className={cn("py-2", className)}>
      <LineSidebar
        items={items.map((i) => i.label)}
        accentColor="#0a0a0a"
        textColor="#71717a"
        markerColor="#a1a1aa"
        showIndex
        showMarker
        defaultActive={activeIndex}
        fontSize={1.05}
        itemGap={22}
        maxShift={28}
        proximityRadius={90}
        onItemClick={(index) => {
          const target = items[index]
          if (target) router.push(target.href)
        }}
      />
    </div>
  )
}

export { ProductionLineNav }
