import fs from "fs"
import path from "path"
import https from "https"

const ROOT = path.resolve("C:/Users/can90/atlasperformans")
const html = fs.readFileSync(
  path.join(process.env.TEMP || "/tmp", "tiyatrolar-dublor.html"),
  "utf8"
)

// title="Name" ... src="...contributer..."
const re =
  /title="([^"]+)"[^>]*href="https:\/\/tiyatrolar\.com\.tr\/[^"]+"[^>]*class="activity_detail_performer_box[^"]*"[\s\S]{0,400}?src="(https:\/\/tiyatrolar\.com\.tr\/files\/contributer\/[^"]+)"/gi

const people = []
let m
while ((m = re.exec(html))) {
  if (/no-img/i.test(m[2])) continue
  people.push({ name: m[1].trim(), src: m[2] })
}

// alt backup
const re2 =
  /src="(https:\/\/tiyatrolar\.com\.tr\/files\/contributer\/[^"]+)"[^>]*alt="([^"]+)"/gi
while ((m = re2.exec(html))) {
  if (/no-img/i.test(m[1])) continue
  if (!people.find((p) => p.src === m[1] || p.name === m[2])) {
    people.push({ name: m[2].trim(), src: m[1] })
  }
}

console.log(
  "people",
  people.length,
  people.map((p) => p.name)
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
  const map = {
    ç: "c",
    ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    â: "a",
  }
  return name
    .split("")
    .map((c) => map[c] || c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function fullImageUrl(thumbUrl) {
  return thumbUrl.replace(/-\d+x\d+(\.(jpe?g|png|webp))$/i, "$1")
}

async function main() {
  const peopleDir = path.join(ROOT, "public/people")
  fs.mkdirSync(peopleDir, { recursive: true })
  const map = {}

  for (const p of people) {
    const slug = slugify(p.name)
    const full = fullImageUrl(p.src)
    const dest = path.join(peopleDir, `${slug}.jpg`)
    try {
      await download(full, dest)
      let size = fs.statSync(dest).size
      if (size < 1500) {
        await download(p.src, dest)
        size = fs.statSync(dest).size
      }
      console.log("OK", slug, size)
      map[slug] = { name: p.name, src: `/people/${slug}.jpg`, original: full }
    } catch (e) {
      try {
        await download(p.src, dest)
        console.log("thumb", slug, fs.statSync(dest).size)
        map[slug] = { name: p.name, src: `/people/${slug}.jpg`, original: p.src }
      } catch (e2) {
        console.error("FAIL", p.name, e.message)
      }
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "scripts/tiyatrolar-people.json"),
    JSON.stringify(map, null, 2)
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
