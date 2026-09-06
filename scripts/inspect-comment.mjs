import fs from "fs"
import path from "path"

const html = fs.readFileSync(
  path.join(process.env.TEMP || "/tmp", "comments.json"),
  "utf8"
)

const parts = html.split('class="single_comment"')
console.log("parts", parts.length)
// write first complete comment
fs.writeFileSync(
  path.join(process.env.TEMP || "/tmp", "one-comment.html"),
  parts[1]?.slice(0, 2500) || "none"
)
console.log(parts[1]?.slice(0, 1500))
