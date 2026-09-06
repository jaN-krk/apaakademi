"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/** Progressive glass at the viewport edge, hidden as soon as the footer enters. */
function PageScrollBlur() {
  const edge = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    let frame = 0
    const update = () => {
      const footer = document.getElementById("footer")
      const distance = footer
        ? footer.getBoundingClientRect().top - window.innerHeight
        : document.documentElement.scrollHeight - window.scrollY - window.innerHeight
      if (edge.current) {
        edge.current.style.opacity = String(Math.max(0, Math.min(1, distance / 100)))
        edge.current.style.visibility = distance <= 0 ? "hidden" : "visible"
      }
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule) }
  }, [pathname])
  return <div ref={edge} className="page-scroll-blur" aria-hidden="true">
    {[1, 2, 4, 8, 16].map((blur, i) => <div key={blur} style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: `linear-gradient(to bottom, transparent ${i * 15}%, black ${Math.min(100, i * 15 + 30)}%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent ${i * 15}%, black ${Math.min(100, i * 15 + 30)}%)` }}/>) }
  </div>
}
export { PageScrollBlur }
