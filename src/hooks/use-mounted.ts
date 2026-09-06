"use client"

import * as React from "react"

/**
 * Returns true after the component has hydrated on the client.
 * Useful for next-themes and other SSR-sensitive UI.
 */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}
