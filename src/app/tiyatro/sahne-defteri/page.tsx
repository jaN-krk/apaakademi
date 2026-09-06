import type { Metadata } from "next"
import { PageIntro, NextStep } from "@/components/shared/page-intro"
import { MediaGallery } from "@/components/shared/media-gallery"
import { getPublicMedia } from "@/content"
import styles from "@/components/shared/editorial.module.css"
import { createMetadata } from "@/lib/seo"
export const metadata:Metadata=createMetadata({title:"Sahne Defteri",description:"Atlas oyunlarından sahne kareleri ve görsel arşiv.",path:"/tiyatro/sahne-defteri"})
export default function StageNotebookPage(){
  const frames=getPublicMedia("theatre").filter(m=>m.type==="image"&&m.thumbnail?.src)
  return <div className={styles.shell}><PageIntro eyebrow="Atlas Tiyatro / Sahne defteri" title="Bir an biter," emphasis="bir iz kalır." description="Oyunlarımızdan sahne kareleri. Işığın, bedenin ve hikâyenin buluştuğu anlara yeniden bak." parent={{href:"/tiyatro",label:"Tiyatro"}}/>
    <MediaGallery items={frames}/>
    <NextStep eyebrow="Söz sahnenin dışında" title="Röportajlar ve oyun yazıları." href="/tiyatro/basin" label="Basında Atlas"/>
  </div>
}
