import fs from "fs"
import path from "path"

const html = fs.readFileSync(
  path.join(process.env.TEMP || "/tmp", "comments.json"),
  "utf8"
)

const parts = html.split(/class="single_comment"/i)
const reviews = []

for (const part of parts.slice(1)) {
  // skip pure replies that are nested only if short? include top-level
  const author =
    part.match(/<p>\s*<a[^>]*>([^<]{1,60})<\/a>/i)?.[1]?.trim() || "İzleyici"
  const ratingRaw = part.match(/class="activity-level-\d+[^"]*"[^>]*>(\d+)/i)?.[1]
  const rating = ratingRaw ? Number(ratingRaw) : undefined
  const date =
    part
      .match(/<\/span>\s*<em>Puan<\/em>\s*\/\s*([^<]+)/i)?.[1]
      ?.replace(/\s+/g, " ")
      .trim() || null
  const content =
    part
      .match(/<p class="content">([\s\S]*?)<\/p>/i)?.[1]
      ?.replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*DEVAMI\s*$/i, "")
      .trim() || ""

  if (content.length < 40) continue
  // dedupe by first 80 chars
  if (reviews.some((r) => r.text.slice(0, 80) === content.slice(0, 80))) continue
  reviews.push({
    author,
    text: content,
    date,
    rating,
    ratingMax: 10,
  })
}

console.log("reviews", reviews.length)
console.log(reviews.slice(0, 3))
fs.writeFileSync(
  path.join("C:/Users/can90/atlasperformans/scripts/tiyatrolar-reviews.json"),
  JSON.stringify(reviews, null, 2)
)
