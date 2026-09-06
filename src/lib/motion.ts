import type { Transition } from "motion/react"

/** Use with Motion when respecting `prefers-reduced-motion`. */
export const reducedMotionTransition: Transition = {
  duration: 0,
}

export const defaultTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

export function getMotionTransition(prefersReducedMotion: boolean): Transition {
  return prefersReducedMotion ? reducedMotionTransition : defaultTransition
}
