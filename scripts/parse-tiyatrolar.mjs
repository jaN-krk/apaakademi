import fs from "fs"

const html = fs.readFileSync(
  process.env.TEMP
    ? `${process.env.TEMP}/tiyatrolar-dublor.html`
    : "/tmp/tiyatrolar-dublor.html",
  "utf8"
)

const imgs = [...html.matchAll(/src=["']([^"']+)["']/gi)].map((m) => m[1])
const abs = [...html.matchAll(/https?:\/\/[^"'\\s>]+\.(?:jpg|jpeg|png|webp)/gi)].map(
  (m) => m[0]
)

console.log("src count", imgs.length)
console.log(
  "unique abs",
  [...new Set(abs)].slice(0, 100)
)
console.log(
  "src sample",
  [...new Set(imgs)].filter((s) => /\.(jpg|jpeg|png|webp)/i.test(s)).slice(0, 80)
)

// comments / reviews
for (const key of ["yorum", "İzleyici", "comment", "puan", "review"]) {
  const i = html.toLowerCase().indexOf(key.toLowerCase())
  console.log(key, i)
}

// Find people / cast section
const markers = ["oyuncu", "ekip", "kadro", "cast", "roller"]
for (const m of markers) {
  let idx = 0
  let n = 0
  const lower = html.toLowerCase()
  while ((idx = lower.indexOf(m, idx)) !== -1 && n < 3) {
    console.log("\n==", m, idx, "==\n", html.slice(idx, idx + 1200).replace(/\s+/g, " "))
    idx += m.length
    n++
  }
}

// structured data
const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
console.log("ld+json", ld.length)
for (const x of ld.slice(0, 3)) {
  try {
    console.log(JSON.stringify(JSON.parse(x[1]), null, 2).slice(0, 1500))
  } catch {
    console.log(x[1].slice(0, 500))
  }
}
