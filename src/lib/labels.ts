import type {
  ApplicationStatus,
  PersonRole,
  ProgramFormat,
  ProgramRecord,
} from "@/content/types"

export function roleLabel(role: PersonRole): string {
  switch (role) {
    case "instructor":
      return "Eğitmen"
    case "actor":
      return "Oyuncu"
    case "director":
      return "Yönetmen"
    case "dramaturg":
      return "Dramaturg"
    case "designer":
      return "Tasarımcı"
    case "composer":
      return "Besteci"
    case "assistant":
      return "Asistan"
    case "coordinator":
      return "Koordinatör"
    default:
      return "Ekip"
  }
}

export function rolesLabel(roles: PersonRole[]): string {
  return roles.map(roleLabel).join(" · ")
}

export function applicationStatusLabel(
  status: ApplicationStatus | undefined
): string {
  switch (status) {
    case "open":
      return "Başvuru açık"
    case "closed":
      return "Başvuru kapalı"
    case "upcoming":
      return "Yakında"
    case "completed":
      return "Arşiv"
    case "unknown":
    default:
      return "Bilgi al"
  }
}

export function programFormatLabel(format: ProgramFormat | undefined): string {
  switch (format) {
    case "in-person":
      return "Yüz yüze"
    case "online":
      return "Çevrimiçi"
    case "hybrid":
      return "Hibrit"
    case "unknown":
    default:
      return "Format belirtilmedi"
  }
}

export function programCategoryLabel(
  category: ProgramRecord["category"] | undefined
): string {
  switch (category) {
    case "acting":
      return "Oyunculuk"
    case "musical":
      return "Müzikal"
    case "writing":
      return "Yazarlık"
    case "cinema":
      return "Sinema"
    case "masterclass":
      return "Masterclass"
    case "talks":
      return "Söyleşi"
    case "lab":
      return "Laboratuvar"
    case "other":
    default:
      return "Program"
  }
}

export function experienceLevelLabel(
  level: ProgramRecord["experienceLevel"] | undefined
): string | null {
  switch (level) {
    case "beginner":
      return "Başlangıç"
    case "intermediate":
      return "Orta"
    case "advanced":
      return "İleri"
    case "all":
      return "Tüm seviyeler"
    case "unknown":
    default:
      return null
  }
}
