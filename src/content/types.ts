export type ContentStatus =
  | "verified"
  | "needsVerification"
  | "archived"
  | "draft"

export type MediaPermissionStatus =
  | "userRequested"
  | "owned"
  | "licensed"
  | "embedded"
  | "permissionRequired"
  | "unknown"

export type Brand = "atlas" | "academy" | "theatre"

export type ContentMedia = {
  src?: string
  alt?: string
  originalUrl?: string
  permissionStatus: MediaPermissionStatus
  owner?: string
  retrievedAt?: string
}

export type ContentSource = {
  name: string
  url: string
  retrievedAt: string
  notes?: string
}

export type BaseContent = {
  id: string
  slug: string
  title: string
  shortDescription?: string
  fullDescription?: string
  status: ContentStatus
  isCurrent: boolean
  sourceName: string
  sourceUrl: string
  verifiedAt: string
  lastUpdatedAt: string
  image?: ContentMedia
  imageAlt?: string
  mediaPermissionStatus?: MediaPermissionStatus
  additionalSources?: ContentSource[]
}

export type ApplicationStatus =
  | "open"
  | "closed"
  | "upcoming"
  | "unknown"
  | "completed"

export type ProgramFormat = "in-person" | "online" | "hybrid" | "unknown"

export type ProgramRecord = BaseContent & {
  brand: "academy"
  category:
    | "acting"
    | "musical"
    | "writing"
    | "cinema"
    | "masterclass"
    | "talks"
    | "lab"
    | "other"
  instructors?: string[]
  startDate?: string
  endDate?: string
  durationWeeks?: number
  totalHours?: number
  scheduleSummary?: string
  format?: ProgramFormat
  capacity?: string
  applicationStatus: ApplicationStatus
  experienceLevel?: "beginner" | "intermediate" | "advanced" | "all" | "unknown"
  goals?: Array<"acting" | "cinema" | "writing" | "performance">
  weekendOnly?: boolean
  ticketUrl?: string
  contactPhone?: string
}

export type PersonRole =
  | "instructor"
  | "actor"
  | "director"
  | "dramaturg"
  | "designer"
  | "composer"
  | "assistant"
  | "coordinator"
  | "other"

export type PersonRecord = BaseContent & {
  fullName: string
  titles?: string[]
  roles: PersonRole[]
  brands: Brand[]
  programs?: string[]
  productions?: string[]
  biography?: string
  portrait?: ContentMedia
  externalUrl?: string
}

export type ProductionRecord = BaseContent & {
  brand: "theatre"
  year?: number
  premiereDate?: string
  sourceWork?: string
  director?: string
  adapter?: string
  dramaturg?: string
  creativeTeam?: Array<{ role: string; name: string; status?: ContentStatus }>
  cast?: Array<{
    name: string
    note?: string
    status?: ContentStatus
  }>
  durationMinutes?: number
  ageLimit?: string
  awards?: string[]
  ticketUrl?: string
  isShowing?: boolean
}

export type EventVenue = {
  name: string
  address?: string
  city?: string
}

export type EventRecord = BaseContent & {
  brand: Brand
  kind: "performance" | "workshop" | "talk" | "masterclass" | "other"
  productionId?: string
  programId?: string
  startsAt: string
  endsAt?: string
  venue: EventVenue
  ticketUrl?: string
  ageLimit?: string
  durationMinutes?: number
  organizer?: string
  priceNote?: string
}

export type AwardRecord = BaseContent & {
  awardBody: string
  category: string
  year: number
  recipient: string
  productionId?: string
  personId?: string
  officialSourceUrl: string
}

export type ReviewRecord = BaseContent & {
  kind: "aggregate" | "critique"
  rating?: number
  ratingMax?: number
  voteCount?: number
  subjectId: string
  subjectType: "production" | "program" | "venue"
  summary?: string
}

export type MediaRecord = BaseContent & {
  brand: Brand
  platform: "instagram" | "local" | "other"
  postUrl: string
  type: "image" | "video" | "carousel" | "embed"
  captionSummary?: string
  publishedAt?: string
  thumbnail?: ContentMedia
  videoPoster?: ContentMedia
  permissionStatus: MediaPermissionStatus
  featured?: boolean
}

export type ContactRecord = {
  brand: Brand
  email?: string
  phone?: string
  whatsapp?: string
  addressLines?: string[]
  status: ContentStatus
  sourceName: string
  sourceUrl: string
  verifiedAt: string
  lastUpdatedAt: string
  note?: string
}

export type AssetRecord = {
  id: string
  brand: Brand
  kind: "logo" | "background" | "poster" | "photo" | "other"
  originalUrl?: string
  localPath?: string
  owner?: string
  permissionStatus: MediaPermissionStatus
  retrievedAt: string
  notes?: string
}
