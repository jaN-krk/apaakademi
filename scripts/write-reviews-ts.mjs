import fs from "fs"

const r = JSON.parse(
  fs.readFileSync("scripts/tiyatrolar-reviews.json", "utf8")
)
const top = r.filter((x) => x.text.length > 60).slice(0, 24)

let ts = `import { CONTENT_RESEARCH_DATE } from "@/content/sources"
import type { ReviewRecord } from "@/content/types"

/** İzleyici yorumları — https://tiyatrolar.com.tr/tiyatro/dublorun-dilemmasi */
export const reviews: ReviewRecord[] = [
`

for (let i = 0; i < top.length; i++) {
  const x = top[i]
  const id = String(i + 1).padStart(2, "0")
  ts += `  {
    id: "review-dublor-${id}",
    slug: "dublor-yorum-${i + 1}",
    title: ${JSON.stringify(`${x.author} — izleyici yorumu`)},
    kind: "critique",
    rating: ${x.rating ?? 0},
    ratingMax: ${x.ratingMax || 10},
    subjectId: "prod-dublorun-dilemmasi",
    subjectType: "production",
    summary: ${JSON.stringify(x.text.slice(0, 450))},
    shortDescription: ${JSON.stringify(x.author)},
    status: "verified",
    isCurrent: true,
    sourceName: "Tiyatrolar.com.tr",
    sourceUrl: "https://tiyatrolar.com.tr/tiyatro/dublorun-dilemmasi",
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
  },
`
}

ts += `]
`
fs.writeFileSync("src/content/reviews.ts", ts)
console.log("wrote", top.length)
