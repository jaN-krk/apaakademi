import fs from "fs"
import path from "path"

const html = fs.readFileSync(
  path.join(process.env.TEMP || "/tmp", "comments.json"),
  "utf8"
)

fs.writeFileSync(
  path.join(process.env.TEMP || "/tmp", "comments-sample.txt"),
  html.slice(0, 5000)
)

const classes = [...html.matchAll(/class="([^"]+)"/g)].map((m) => m[1])
const filtered = [...new Set(classes)].filter((c) =>
  /comment|user|rate|star|text|name|date/i.test(c)
)
console.log("classes", filtered.slice(0, 60))

// Parse common structures
const blocks = []
// each comment li or article
const chunks = html.split(/class="comment_item|class="media comment|id="comment_/i)
console.log("chunks", chunks.length)

// try: <strong>Name</strong> ... <p>text</p>
const reNameText =
  /<h[345][^>]*>([^<]{2,40})<\/h[345]>[\s\S]{0,200}?<p[^>]*>([\s\S]{10,800}?)<\/p>/gi
let m
while ((m = reNameText.exec(html))) {
  blocks.push({ author: m[1].trim(), text: m[2].replace(/<[^>]+>/g, "").trim() })
}
console.log("nameText", blocks.length)

// rating + text patterns
const re2 =
  /class="[^"]*user[^"]*"[^>]*>([^<]+)<[\s\S]{0,400}?class="[^"]*comment_text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
while ((m = re2.exec(html))) {
  blocks.push({
    author: m[1].trim(),
    text: m[2].replace(/<[^>]+>/g, "").trim(),
  })
}

// strip tags utility dump of first big area_main_comment section
const area = html.match(/id="area_main_comment"[\s\S]{0,15000}/)
if (area) {
  fs.writeFileSync(
    path.join(process.env.TEMP || "/tmp", "comments-area.txt"),
    area[0]
  )
  console.log("wrote area", area[0].length)
}

// simpler: split by comment boxes using stars score
const starItems = [...html.matchAll(/data-rate=\\"(\d+)\\"|data-rate="(\d+)"|score['\"]?\s*[:=]\s*['\"]?(\d+)/gi)]
console.log("stars", starItems.slice(0, 10))

// Match: <div class="...">...</div> with Turkish long comments
const paragraphs = [...html.matchAll(/<p[^>]*>([^<]{40,600})<\/p>/g)].map((x) =>
  x[1].trim()
)
console.log("long paragraphs", paragraphs.length)
console.log(paragraphs.slice(0, 8))

// Look for author near comments - often <b> or .writer
const writers = [...html.matchAll(/class="writer"[^>]*>([^<]+)/g)].map((x) =>
  x[1].trim()
)
console.log("writers", writers.slice(0, 20))
