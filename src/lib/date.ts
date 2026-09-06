import { format } from "date-fns"
import { tr } from "date-fns/locale"

export function formatEventDate(iso: string): string {
  return format(new Date(iso), "d MMMM yyyy, EEEE · HH:mm", { locale: tr })
}

export function formatShortDate(iso: string): string {
  return format(new Date(iso), "d MMM yyyy", { locale: tr })
}
