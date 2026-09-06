import { awards } from "../src/content/theatre/awards"
import { events } from "../src/content/theatre/events"
import { instructors } from "../src/content/academy/instructors"
import { mediaItems } from "../src/content/media"
import { programs } from "../src/content/academy/programs"
import { productions } from "../src/content/theatre/productions"
import { reviews } from "../src/content/reviews"
import { theatrePeople } from "../src/content/theatre/people"
import type { BaseContent, EventRecord } from "../src/content/types"

type Issue = { severity: "error" | "warn"; code: string; message: string }

const issues: Issue[] = []

function checkBase(items: BaseContent[], kind: string) {
  for (const item of items) {
    if (!item.sourceUrl) {
      issues.push({
        severity: "error",
        code: "missing-source",
        message: `${kind}:${item.id} has no sourceUrl`,
      })
    }
    if (item.status === "verified" && !item.sourceUrl) {
      issues.push({
        severity: "error",
        code: "verified-without-source",
        message: `${kind}:${item.id} marked verified without source`,
      })
    }
    if (item.image && !item.image.alt && !item.imageAlt) {
      issues.push({
        severity: "warn",
        code: "missing-image-alt",
        message: `${kind}:${item.id} image missing alt text`,
      })
    }
    if (
      item.mediaPermissionStatus === "permissionRequired" &&
      item.image?.src
    ) {
      issues.push({
        severity: "error",
        code: "permission-required-media",
        message: `${kind}:${item.id} publishes media requiring permission`,
      })
    }
  }
}

function checkEvents(list: EventRecord[]) {
  const now = Date.now()
  for (const e of list) {
    if (!e.sourceUrl) {
      issues.push({
        severity: "error",
        code: "event-no-source",
        message: `event:${e.id} missing source`,
      })
    }
    const t = new Date(e.startsAt).getTime()
    if (Number.isNaN(t)) {
      issues.push({
        severity: "error",
        code: "invalid-date",
        message: `event:${e.id} invalid startsAt`,
      })
    }
    if (e.isCurrent && t < now) {
      issues.push({
        severity: "warn",
        code: "past-marked-current",
        message: `event:${e.id} is past but isCurrent=true (UI should auto-archive)`,
      })
    }
    if (e.kind === "performance" && e.isCurrent && t >= now && !e.ticketUrl) {
      issues.push({
        severity: "error",
        code: "current-show-no-ticket",
        message: `event:${e.id} current performance missing ticketUrl`,
      })
    }
  }
}

checkBase(programs, "program")
checkBase(instructors, "instructor")
checkBase(productions, "production")
checkBase(events, "event")
checkBase(theatrePeople, "person")
checkBase(awards, "award")
checkBase(reviews, "review")
checkBase(mediaItems, "media")
checkEvents(events)

for (const p of theatrePeople) {
  if (!p.sourceUrl) {
    issues.push({
      severity: "error",
      code: "person-no-source",
      message: `person:${p.id} missing source`,
    })
  }
}

for (const r of reviews) {
  if (r.status === "verified" && r.kind === "aggregate") {
    // ok
  }
  if (r.status !== "verified" && r.isCurrent) {
    issues.push({
      severity: "warn",
      code: "unverified-review-current",
      message: `review:${r.id} is not verified but marked current`,
    })
  }
}

for (const m of mediaItems) {
  if (m.permissionStatus === "permissionRequired" && m.status === "verified") {
    issues.push({
      severity: "warn",
      code: "media-permission",
      message: `media:${m.id} requires permission; ensure public UI blocks render`,
    })
  }
}

const errors = issues.filter((i) => i.severity === "error")
const warnings = issues.filter((i) => i.severity === "warn")

console.log("Atlas content validation")
console.log(`errors: ${errors.length}`)
console.log(`warnings: ${warnings.length}`)
for (const i of issues) {
  console.log(`[${i.severity}] ${i.code}: ${i.message}`)
}

if (errors.length > 0) {
  process.exit(1)
}
