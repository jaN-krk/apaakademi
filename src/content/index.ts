import { instructors } from "@/content/academy/instructors"
import { partners } from "@/content/academy/partners"
import { programs } from "@/content/academy/programs"
import {
  filterPublicList,
  getPastEvents,
  getUpcomingEvents,
  isMediaPublic,
  isPublicContent,
  isPublishableCurrent,
} from "@/content/access"
import { contacts } from "@/content/contact"
import { mediaItems } from "@/content/media"
import { reviews } from "@/content/reviews"
import { awards } from "@/content/theatre/awards"
import { events } from "@/content/theatre/events"
import { theatrePeople } from "@/content/theatre/people"
import { productions } from "@/content/theatre/productions"

export * from "@/content/types"
export * from "@/content/access"
export * from "@/content/sources"

export function getPublicPrograms(opts?: { currentOnly?: boolean }) {
  const list = filterPublicList(programs)
  if (opts?.currentOnly) return list.filter((p) => p.isCurrent)
  return list
}

export function getProgramBySlug(slug: string) {
  const item = programs.find((p) => p.slug === slug)
  if (!item || !isPublicContent(item)) return undefined
  return item
}

export function getPublicInstructors() {
  return filterPublicList(instructors)
}

export function getInstructorBySlug(slug: string) {
  const item = instructors.find((p) => p.slug === slug)
  if (!item || !isPublicContent(item)) return undefined
  return item
}

export function getPublicProductions(opts?: {
  currentOnly?: boolean
  includeNeedsVerification?: boolean
}) {
  if (opts?.includeNeedsVerification) {
    return productions.filter(
      (p) => p.status === "verified" || p.status === "needsVerification"
    )
  }
  const list = filterPublicList(productions)
  if (opts?.currentOnly) return list.filter((p) => p.isCurrent)
  return list
}

export function getProductionBySlug(slug: string) {
  const item = productions.find((p) => p.slug === slug)
  // Allow detail pages for verified only; list needsVerification in archive wall with badge elsewhere.
  if (!item) return undefined
  if (item.status === "verified" || item.status === "archived") return item
  return undefined
}

export function getArchiveProductions() {
  return productions.filter(
    (p) =>
      (p.status === "verified" || p.status === "needsVerification") &&
      !p.isCurrent
  )
}

export function getUpcomingTheatreEvents(now?: Date) {
  return getUpcomingEvents(events, now)
}

export function getPastTheatreEvents(now?: Date) {
  return getPastEvents(events, now)
}

export function getNextAtlasMoment(now: Date = new Date()) {
  const nextShow = getUpcomingEvents(events, now)[0]
  const openPrograms = programs.filter(
    (p) =>
      isPublishableCurrent(p) &&
      (p.applicationStatus === "open" || p.applicationStatus === "upcoming")
  )
  return { nextShow, openPrograms }
}

export function getPublicAwards() {
  return filterPublicList(awards)
}

export function getPublicTheatrePeople() {
  return filterPublicList(theatrePeople)
}

export function getTheatrePersonBySlug(slug: string) {
  const item = theatrePeople.find((p) => p.slug === slug)
  if (!item || !isPublicContent(item)) return undefined
  return item
}

export function getPublicMedia(brand?: "academy" | "theatre") {
  return mediaItems
    .filter(isMediaPublic)
    .filter((m) => (brand ? m.brand === brand : true))
}

export function getPublicReviews() {
  return filterPublicList(reviews)
}

export function getAcademyContact() {
  return contacts.find((c) => c.brand === "academy" && c.status === "verified")
}

export function getTheatreContact() {
  // NeedsVerification contact is not used as asserted public truth.
  return contacts.find((c) => c.brand === "theatre" && c.status === "verified")
}

export function getPartners() {
  return filterPublicList(partners)
}

export {
  programs,
  instructors,
  partners,
  productions,
  events,
  theatrePeople,
  awards,
  reviews,
  mediaItems,
  contacts,
}
