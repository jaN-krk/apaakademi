import type { Metadata } from "next"
import { AboutPage } from "@/components/shared/about-page"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Hakkımızda — Akademi",description:"Atlas Performans Akademisi: sanat ve akademiyi bir araya getiren bir buluşma alanı.",path:"/akademi/hakkimizda"})
export default function AcademyAboutPage(){return <AboutPage brand="academy"/>}
