import type { Metadata } from "next"
import { ContactPage } from "@/components/shared/contact-page"
import { createMetadata } from "@/lib/seo"
export const metadata: Metadata = createMetadata({title:"İletişim — Akademi",description:"Atlas Performans Akademisi adres ve iletişim bilgileri.",path:"/akademi/iletisim"})
export default function AcademyContactPage(){return <ContactPage brand="academy"/>}
