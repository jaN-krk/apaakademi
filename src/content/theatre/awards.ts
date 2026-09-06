import { CONTENT_RESEARCH_DATE, sources } from "@/content/sources"
import type { AwardRecord } from "@/content/types"

export const awards: AwardRecord[] = [
  {
    id: "award-afife-27-tekin",
    slug: "27-afife-yardimci-rolde-en-basarili-erkek-oyuncu",
    title: "Yardımcı Rolde Yılın En Başarılı Erkek Oyuncusu",
    awardBody: "27. Yapı Kredi Afife Tiyatro Ödülleri",
    category: "Yardımcı Rolde Yılın En Başarılı Erkek Oyuncusu",
    year: 2025,
    recipient: "Tekin Ezgütekin",
    productionId: "prod-dublorun-dilemmasi",
    personId: "person-tekin-ezgutekin",
    shortDescription: "Dublörün Dilemması — 27. Sezon (2024–2025) kazananı.",
    status: "verified",
    isCurrent: true,
    sourceName: sources.afife27.name,
    sourceUrl: sources.afife27.url,
    officialSourceUrl: sources.afife27.url,
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
  },
  {
    id: "award-ismet-kuntay-2026-adaptation",
    slug: "50-ismet-kuntay-yilin-en-iyi-uyarlama",
    title: "Yılın En İyi Uyarlama",
    awardBody: "50. İsmet Küntay Tiyatro Ödülleri",
    category: "Yılın En İyi Uyarlama Ödülü",
    year: 2026,
    recipient: "Dublörün Dilemması — Atlas Tiyatro Araştırmaları",
    productionId: "prod-dublorun-dilemmasi",
    shortDescription:
      "Murat Menteş romanından Sercan Özinan uyarlaması / yönetimi.",
    status: "verified",
    isCurrent: true,
    sourceName: sources.ismetKuntay2026.name,
    sourceUrl: sources.ismetKuntay2026.url,
    officialSourceUrl: sources.cumhuriyetIsmetKuntay.url,
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
    additionalSources: [sources.cumhuriyetIsmetKuntay],
  },
]
