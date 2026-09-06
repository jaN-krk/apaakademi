import type { ReactNode } from "react"

export type WithChildren = {
  children: ReactNode
}

export type WithClassName = {
  className?: string
}

export type WithChildrenAndClassName = WithChildren & WithClassName

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  items?: NavItem[]
}

export type Theme = "light" | "dark" | "system"
