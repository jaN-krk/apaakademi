import fs from "fs"
import path from "path"
import https from "https"
import http from "http"

const ROOT = path.resolve("C:/Users/can90/atlasperformans")
const HTML = path.join(process.env.TEMP || "/tmp", "tiyatrolar-dublor.html")
const html = fs.readFileSync(HTML, "utf8")

// ---- extract cast + crew performers ----
const performerRe =
  /class="activity_detail_performer_box[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[\s\S]*?<h5[^>]*>([^<]+)<\/h5>/gi
const people = []
let m
while ((m = performerRe.exec(html))) {
  const src = m[1]
  const alt = m[2] || m[3]
  const name = m[3].replace(/\s+/g, " ").trim()
  if (/no-img/i.test(src)) continue
  people.push({ name, alt, src })
}
// fallback simpler
if (people.length === 0) {
  const re2 =
    /activity_detail_performer_box[^"]*"[^>]*title="([^"]+)"[^>]*>[\s\S]*?src="(https:\/\/tiyatrolar\.com\.tr\/files\/contributer\/[^"]+)"/gi
  while ((m = re2.exec(html))) {
    people.push({ name: m[1], alt: m[1], src: m[2] })
  }
}
console.log("people", people.length, people.map((p) => p.name))

// gallery
const gallery = [
  ...html.matchAll(
    /https:\/\/tiyatrolar\.com\.tr\/files\/activity\/d\/dublorun-dilemmasi\/gallery\/\d+\/[^"'\\\s]+\.jpg/gi
  ),
].map((x) => x[0])
console.log("gallery", [...new Set(gallery)])

// try comments in page
const commentClasses = [...html.matchAll(/class="([^"]*comment[^"]*)"/gi)].map(
  (x) => x[1]
)
console.log("comment classes", [...new Set(commentClasses)].slice(0, 30))

// score / rating block
const idx = html.indexOf("score")
console.log("score near", html.slice(Math.max(0, idx - 100), idx + 400))

// Look for user reviews AJAX pattern
const ajax = [
  ...html.matchAll(/https?:\/\/[^"'\\\s]+(?:comment|yorum|review)[^"'\\\s]*/gi),
].map((x) => x[0])
console.log("ajax", ajax)

// Dump section ids
const ids = [...html.matchAll(/id="([^"]+)"/gi)].map((x) => x[1])
console.log(
  "ids",
  ids.filter((id) => /comment|yorum|review|rate|puan/i.test(id))
)

// write extract for download
const out = { people, gallery: [...new Set(gallery)] }
fs.writeFileSync(
  path.join(ROOT, "scripts/tiyatrolar-extract.json"),
  JSON.stringify(out, null, 2)
)

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const file = fs.createWriteStream(dest)
    const lib = url.startsWith("https") ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: "https://tiyatrolar.com.tr/tiyatro/dublorun-dilemmasi",
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close()
          fs.unlinkSync(dest)
          return download(res.headers.location, dest).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          try {
            fs.unlinkSync(dest)
          } catch {}
          return reject(new Error(`HTTP ${res.statusCode} ${url}`))
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
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function fullImageUrl(thumbUrl) {
  // abdurrahman-meralli-125x165.jpg -> abdurrahman-meralli.jpg
  return thumbUrl.replace(/-\d+x\d+(\.(jpe?g|png|webp))$/i, "$1")
}

async function main() {
  const peopleDir = path.join(ROOT, "public/people")
  const galleryDir = path.join(ROOT, "public/media/theatre/dublor-all")
  fs.mkdirSync(peopleDir, { recursive: true })
  fs.mkdirSync(galleryDir, { recursive: true })

  for (const p of people) {
    const slug = slugify(p.name)
    const full = fullImageUrl(p.src)
    const dest = path.join(peopleDir, `${slug}.jpg`)
    try {
      await download(full, dest)
      const size = fs.statSync(dest).size
      console.log("OK person", slug, size, full)
      if (size < 2000) {
        await download(p.src, dest)
        console.log("  fallback thumb", fs.statSync(dest).size)
      }
    } catch (e) {
      try {
        await download(p.src, dest)
        console.log("thumb", slug, fs.statSync(dest).size)
      } catch (e2) {
        console.error("FAIL", p.name, e.message, e2.message)
      }
    }
  }

  let i = 0
  for (const g of [...new Set(gallery)]) {
    i++
    const id = g.match(/gallery\/(\d+)/)?.[1] || String(i)
    const dest = path.join(galleryDir, `g${id}.jpg`)
    try {
      await download(g, dest)
      console.log("OK gallery", id, fs.statSync(dest).size)
    } catch (e) {
      console.error("FAIL gallery", g, e.message)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
