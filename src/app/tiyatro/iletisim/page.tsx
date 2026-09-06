import type { Metadata } from "next"
import { ContactPage } from "@/components/shared/contact-page"
import { createMetadata } from "@/lib/seo"
export const metadata: Metadata = createMetadata({title:"İletişim — Tiyatro",description:"Atlas Tiyatro iletişim ve gösterim bilgileri.",path:"/tiyatro/iletisim"})
export default function TheatreContactPage(){return <ContactPage brand="theatre"/>}
