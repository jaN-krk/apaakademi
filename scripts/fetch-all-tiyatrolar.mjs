import fs from "fs"
import path from "path"
import https from "https"

const ROOT = path.resolve("C:/Users/can90/atlasperformans")
const html = fs.readFileSync(
  path.join(process.env.TEMP || "/tmp", "tiyatrolar-dublor.html"),
  "utf8"
)
const commentsHtml = fs.readFileSync(
  path.join(process.env.TEMP || "/tmp", "comments.json"),
  "utf8"
)

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const file = fs.createWriteStream(dest)
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: "https://tiyatrolar.com.tr/tiyatro/dublorun-dilemmasi",
        },
      },
      (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          file.close()
          try {
            fs.unlinkSync(dest)
          } catch {}
          return download(res.headers.location, dest).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          try {
            fs.unlinkSync(dest)
          } catch {}
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        res.pipe(file)
        file.on("finish", () => file.close(() => resolve(dest)))
      }
    )
    req.on("error", reject)
  })
}

function slugify(name) {
  return name
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .replace(/Ğ/g, "g")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/ü/g, "u")
    .replace(/Ş/g, "s")
    .replace(/ş/g, "s")
    .replace(/Ö/g, "o")
    .replace(/ö/g, "o")
    .replace(/Ç/g, "c")
    .replace(/ç/g, "c")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function fullImageUrl(thumbUrl) {
  return thumbUrl.replace(/-\d+x\d+(\.(jpe?g|png|webp))$/i, "$1")
}

// extract all contributer images with alt
const people = []
const re =
  /alt="([^"]+)"\s+src="(https:\/\/tiyatrolar\.com\.tr\/files\/contributer\/[^"]+)"/gi
let m
while ((m = re.exec(html))) {
  if (/no-img/i.test(m[2])) continue
  const name = m[1].trim()
  if (!name) continue
  if (!people.find((p) => p.name === name)) {
    people.push({ name, src: m[2] })
  }
}
// also title= performer boxes
const reTitle =
  /title="([^"]+)"[^>]*class="activity_detail_performer_box[\s\S]{0,500}?src="(https:\/\/tiyatrolar\.com\.tr\/files\/contributer\/[^"]+)"/gi
while ((m = reTitle.exec(html))) {
  if (/no-img/i.test(m[2])) continue
  if (!people.find((p) => p.name === m[1].trim())) {
    people.push({ name: m[1].trim(), src: m[2] })
  }
}
console.log(
  "people",
  people.length,
  people.map((p) => p.name)
)

// parse reviews: single_comment blocks
const reviews = []
const parts = commentsHtml.split('class="single_comment"')
for (const part of parts.slice(1)) {
  const author =
    part.match(/class="comment-view"[^>]*>\s*([^<]+)/i)?.[1]?.trim() ||
    part.match(/<a[^>]*class="[^"]*user[^"]*"[^>]*>([^<]+)/i)?.[1]?.trim() ||
    part.match(/href="https:\/\/tiyatrolar\.com\.tr\/[^"]+"[^>]*>\s*([^<]{2,40})\s*</i)?.[1]?.trim()

  // level might be rating proxy activity-level-N
  const level = part.match(/activity-level-(\d+)/i)?.[1]
  // time
  const date = part.match(/class="comment-time"[^>]*>([^<]+)/i)?.[1]?.trim()
  // content
  const content =
    part
      .match(/class="comment-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1]
      ?.replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim() ||
    part
      .match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]
      ?.replace(/<[^>]+>/g, "")
      .trim()

  if (content && content.length > 30 && author && !/yanıtla|cevap/i.test(content)) {
    reviews.push({
      author: author.replace(/\s+/g, " ").trim(),
      text: content,
      date: date || null,
      level: level ? Number(level) : null,
    })
  }
}

// fallback paragraphs if few authors
if (reviews.length < 5) {
  const paras = [...commentsHtml.matchAll(/class="comment-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)]
  for (const p of paras) {
    const text = p[1]
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
    if (text.length < 40) continue
    if (reviews.find((r) => r.text === text)) continue
    reviews.push({ author: "İzleyici", text, date: null, level: null })
  }
}

console.log("reviews", reviews.length)
reviews.slice(0, 3).forEach((r) => console.log("-", r.author, r.text.slice(0, 80)))

async function main() {
  const peopleDir = path.join(ROOT, "public/people")
  // remove bad etin-kaya
  const bad = path.join(peopleDir, "etin-kaya.jpg")
  if (fs.existsSync(bad)) fs.unlinkSync(bad)

  const map = {}
  for (const p of people) {
    const slug = slugify(p.name)
    const dest = path.join(peopleDir, `${slug}.jpg`)
    const full = fullImageUrl(p.src)
    try {
      await download(full, dest)
      if (fs.statSync(dest).size < 1500) await download(p.src, dest)
      console.log("OK", slug, fs.statSync(dest).size)
      map[slug] = { name: p.name, local: `/people/${slug}.jpg`, original: full }
    } catch {
      try {
        await download(p.src, dest)
        console.log("thumb", slug)
        map[slug] = { name: p.name, local: `/people/${slug}.jpg`, original: p.src }
      } catch (e) {
        console.error("FAIL", p.name, e.message)
      }
    }
  }

  // also download poster/cover if missing
  const posterDir = path.join(ROOT, "public/posters/dublorun-dilemmasi")
  fs.mkdirSync(posterDir, { recursive: true })
  const posterUrl =
    "https://tiyatrolar.com.tr/files/activity/d/dublorun-dilemmasi/image/dublorun-dilemmasi.jpg"
  await download(posterUrl, path.join(posterDir, "poster.jpg")).catch(() => {})
  // cover copy
  try {
    fs.copyFileSync(
      path.join(posterDir, "poster.jpg"),
      path.join(posterDir, "cover.jpg")
    )
  } catch {}

  // gallery already downloaded to dublor-all — also copy as dublorun-gallery
  const allDir = path.join(ROOT, "public/media/theatre/dublor-all")
  const galDir = path.join(ROOT, "public/media/theatre/dublorun-gallery")
  fs.mkdirSync(galDir, { recursive: true })
  if (fs.existsSync(allDir)) {
    let n = 1
    for (const f of fs.readdirSync(allDir).filter((x) => x.endsWith(".jpg"))) {
      fs.copyFileSync(path.join(allDir, f), path.join(galDir, `g${n}.jpg`))
      n++
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "scripts/tiyatrolar-people.json"),
    JSON.stringify(map, null, 2)
  )
  fs.writeFileSync(
    path.join(ROOT, "scripts/tiyatrolar-reviews.json"),
    JSON.stringify(reviews, null, 2)
  )
  console.log("saved people", Object.keys(map).length, "reviews", reviews.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
