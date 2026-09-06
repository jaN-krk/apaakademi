"use client"

import GradualBlur from "@/components/GradualBlur"
import { cn } from "@/lib/utils"

type ScrollBlurEdgeProps = {
  className?: string
  position?: "top" | "bottom"
}

/** React Bits Gradual Blur — scroll edge dissolve */
function ScrollBlurEdge({
  className,
  position = "bottom",
}: ScrollBlurEdgeProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-20",
        position === "bottom" ? "bottom-0" : "top-0",
        className
      )}
    >
      <GradualBlur
        position={position}
        height="7rem"
        strength={2.4}
        divCount={6}
        exponential
        opacity={1}
        animated="scroll"
        target="parent"
        curve="ease-out"
      />
    </div>
  )
}

export { ScrollBlurEdge }
