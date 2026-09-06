import type { AssetRecord, ContentSource } from "@/content/types"

/** Research snapshot date for content verification. */
export const CONTENT_RESEARCH_DATE = "2026-08-05"

export const sources = {
  academySite: {
    name: "Atlas Performans Akademisi resmi site",
    url: "https://atlasperformans.com/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  academyInstagram: {
    name: "Atlas Performans Akademisi Instagram",
    url: "https://www.instagram.com/atlas_performans/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  academyLogo: {
    name: "APA resmi logo",
    url: "https://atlasperformans.com/wp-content/uploads/2025/10/apa-logo.png",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  academyBg: {
    name: "APA resmi arka plan",
    url: "https://atlasperformans.com/wp-content/uploads/2025/11/atlas-bg2-scaled.png",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  academyVenue: {
    name: "Biletinial mekân: Atlas Performans Akademisi",
    url: "https://biletinial.com/tr-tr/mekan/atlas-performans-akademisi",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  theatreInstagram: {
    name: "Atlas Tiyatro Instagram",
    url: "https://www.instagram.com/atlastiyatro/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  theatreFacebook: {
    name: "Atlas Tiyatro Facebook",
    url: "https://www.facebook.com/atlastiyatro/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  dublorBilet: {
    name: "Biletinial: Dublörün Dilemması",
    url: "https://biletinial.com/tr-tr/tiyatro/dublorun-dilemmasi",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  dublorModa: {
    name: "Moda Sahnesi: Dublörün Dilemması",
    url: "https://www.modasahnesi.com/events/dublorun-dilemmasi/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  dublorTiyatroOnline: {
    name: "Tiyatro Online: Dublörün Dilemması",
    url: "https://tiyatronline.com/oyunlar/dublorun-dilemmasi-14930",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  theatreArchiveAbout: {
    name: "tiyatrolar.com.tr Atlas hakkında",
    url: "https://tiyatrolar.com.tr/atlastiyatroarastirmalari/?s=hakkinda",
    retrievedAt: CONTENT_RESEARCH_DATE,
    notes: "Arşiv site; güncel program kaynağı olarak kullanılmaz.",
  },
  theatreArchivePlays: {
    name: "tiyatrolar.com.tr Atlas oyunlar",
    url: "https://tiyatrolar.com.tr/atlastiyatroarastirmalari/?s=oyunlar",
    retrievedAt: CONTENT_RESEARCH_DATE,
    notes: "Arşiv site; güncel program kaynağı olarak kullanılmaz.",
  },
  afife27: {
    name: "27. Yapı Kredi Afife Tiyatro Ödülleri kazananlar",
    url: "https://www.afife.org/kazananlar-ve-adaylar/27/kazananlar",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  ismetKuntay2026: {
    name: "Mimesis: 50. İsmet Küntay Tiyatro Ödülleri",
    url: "https://www.mimesis-dergi.org/2026/03/50-ismet-kuntay-tiyatro-odulleri/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  cumhuriyetIsmetKuntay: {
    name: "Cumhuriyet: İsmet Küntay Ödülleri",
    url: "https://www.cumhuriyet.com.tr/kultur-sanat/ismet-kuntay-tiyatro-odulleri-nin-50-ncisi-duzenlenen-torenle-sahiplerine-sunuldu-yarim-asirlik-gurur-2490993",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  sahnedenBarba: {
    name: "sahneden.net: Eugenio Barba ve Julia Varley",
    url: "https://sahneden.net/eugenio-barba-ve-julia-varley-istanbula-geliyor/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  apaPress: {
    name: "Tiyatro Online: APA açılış haberi",
    url: "https://tiyatronline.com/atlas-performans-akademisi-sanat-ve-akademiyi-pera-da-bir-araya-getiriyor--15635",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  audition101: {
    name: "Biletinial: Audition 101",
    url: "https://biletinial.com/tr-tr/egitim/ruzgar-aksoy-ile-audition-yuzbir",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  screenwriting: {
    name: "Biletinial: Senaryo Yazarlığı Atölyesi",
    url: "https://biletinial.com/tr-tr/egitim/senaryo-yazarligi-atolyesi",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  shortFilm: {
    name: "Biletinial: Fikirden Perdeye Kısa Film",
    url: "https://biletinial.com/tr-tr/egitim/fikirden-perdeye-kisa-film-atolyesi",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  monologWorkshop: {
    name: "Biletinial: Monolog Atölyesi",
    url: "https://biletinial.com/tr-tr/egitim/monolog-atolyesi-atlas-performans-akademisi",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  sezuan: {
    name: "Tiyatro Online: Sezuan’ın İyi İnsanı",
    url: "https://tiyatronline.com/oyunlar/sezuan-in-yi-nsani-13905",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  sezuanSeason: {
    name: "Tiyatro Dergisi: Atlas sezon açılışı",
    url: "https://tiyatrodergisi.com.tr/atlas-tiyatro-arastirmalari-sezonu-aciyor/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  uysalSalom: {
    name: "Şalom: Uysal Kadın",
    url: "https://www.salom.com.tr/haber/126961/atlas-tiyatro-arastirmalari-10-yasinda-uysal-kadin",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  mimesisInterview: {
    name: "Mimesis: Sercan Özinan röportajı",
    url: "https://www.mimesis-dergi.org/2025/02/sercan-ozinan-dublorun-dilemmasini-okuyunca-heyecanlandim/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  seeingLab: {
    name: "Seeing Lab Instagram",
    url: "https://www.instagram.com/seeinglab/",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
} as const satisfies Record<string, ContentSource>

export const assets: AssetRecord[] = [
  {
    id: "asset-apa-logo",
    brand: "academy",
    kind: "logo",
    originalUrl: sources.academyLogo.url,
    localPath: "/brand/academy/apa-logo.png",
    owner: "Atlas Performans Akademisi",
    permissionStatus: "owned",
    retrievedAt: CONTENT_RESEARCH_DATE,
    notes: "Resmi siteden indirildi; oran korunarak yerel optimize edilmeli.",
  },
  {
    id: "asset-apa-bg",
    brand: "academy",
    kind: "background",
    originalUrl: sources.academyBg.url,
    localPath: "/brand/academy/atlas-bg2.png",
    owner: "Atlas Performans Akademisi",
    permissionStatus: "owned",
    retrievedAt: CONTENT_RESEARCH_DATE,
  },
  {
    id: "asset-theatre-logo",
    brand: "theatre",
    kind: "logo",
    permissionStatus: "permissionRequired",
    retrievedAt: CONTENT_RESEARCH_DATE,
    notes:
      "Yüksek çözünürlüklü şeffaf PNG/SVG/PDF logo kurumdan talep edilmeli. Düşük kaliteli üçüncü taraf logo final için kullanılmadı.",
  },
]
