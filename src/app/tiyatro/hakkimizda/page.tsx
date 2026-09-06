import type { Metadata } from "next"
import { AboutPage } from "@/components/shared/about-page"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Hakkımızda — Tiyatro",description:"Atlas Tiyatro Araştırmaları: edebi metinleri sahneye taşıyan topluluk.",path:"/tiyatro/hakkimizda"})
export default function TheatreAboutPage(){return <AboutPage brand="theatre"/>}
