import { CONTENT_RESEARCH_DATE, sources } from "@/content/sources"
import type { ContactRecord } from "@/content/types"

export const contacts: ContactRecord[] = [
  {
    brand: "academy",
    email: "info@atlasperformans.com",
    phone: "0545 392 12 72",
    whatsapp: "905453921272",
    addressLines: [
      "Asmalımescit Mah.",
      "Sofyalı Sok. No:14/2",
      "Beyoğlu, İstanbul",
    ],
    status: "verified",
    sourceName: sources.academyVenue.name,
    sourceUrl: sources.academyVenue.url,
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
    note: "Adres Biletinial mekân sayfasından; e-posta sahneden.net haberinden; telefon senaryo atölyesi bilet sayfasından doğrulandı.",
  },
  {
    brand: "theatre",
    email: "contact@atlastiyatro.com",
    phone: "0543 788 83 97",
    status: "needsVerification",
    sourceName: sources.theatreFacebook.name,
    sourceUrl: sources.theatreFacebook.url,
    verifiedAt: CONTENT_RESEARCH_DATE,
    lastUpdatedAt: CONTENT_RESEARCH_DATE,
    note: "Eski Facebook kaynaklı olabilir. Resmî onay olmadan kesin güncel iletişim olarak sunulmaz.",
  },
]
