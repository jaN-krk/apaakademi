import type {
  BaseContent,
  ContentStatus,
  EventRecord,
  MediaRecord,
} from "@/content/types"

const PUBLIC_STATUSES: ContentStatus[] = ["verified", "archived"]

export function hasRequiredSource(item: {
  sourceUrl?: string
  status: ContentStatus
}): boolean {
  return Boolean(item.sourceUrl && item.sourceUrl.trim().length > 0)
}

export function isPublicContent<T extends BaseContent>(item: T): boolean {
  if (!hasRequiredSource(item)) return false
  if (item.status === "needsVerification") return false
  if (item.status === "draft") return false
  if (!PUBLIC_STATUSES.includes(item.status) && item.status !== "verified") {
    return false
  }
  return item.status === "verified" || item.status === "archived"
}

export function isPublishableCurrent<T extends BaseContent>(item: T): boolean {
  return isPublicContent(item) && item.isCurrent && item.status === "verified"
}

export function isEventUpcoming(
  event: EventRecord,
  now: Date = new Date()
): boolean {
  return new Date(event.startsAt).getTime() >= now.getTime()
}

export function isEventPast(event: EventRecord, now: Date = new Date()): boolean {
  return new Date(event.startsAt).getTime() < now.getTime()
}

export function getUpcomingEvents(
  events: EventRecord[],
  now: Date = new Date()
): EventRecord[] {
  return events
    .filter((e) => isPublicContent(e) && isEventUpcoming(e, now))
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )
}

export function getPastEvents(
  events: EventRecord[],
  now: Date = new Date()
): EventRecord[] {
  return events
    .filter((e) => isEventPast(e, now))
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
    )
}

export function isMediaPublic(item: MediaRecord): boolean {
  if (!isPublicContent(item)) return false
  if (item.permissionStatus === "permissionRequired") return false
  if (item.permissionStatus === "unknown") return false
  return true
}

export function filterPublicList<T extends BaseContent>(items: T[]): T[] {
  return items.filter(isPublicContent)
}
