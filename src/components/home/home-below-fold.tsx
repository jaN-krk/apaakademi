import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowRight, ArrowDown, MapPin } from "lucide-react"
import { getPublicProductions, getPublicPrograms, getPublicInstructors, getAcademyContact } from "@/content"
import { PersonCard } from "@/components/shared/person-card"
import { AcademyPaths } from "./academy-paths"
import { sources } from "@/content/sources"
import styles from "./home.module.css"

function HomeBelowFold() {
  const [featured, ...others] = getPublicProductions().slice(0, 3)
  const programs = getPublicPrograms().map(({id,slug,title,category,shortDescription,applicationStatus,totalHours,durationWeeks})=>({id,slug,title,category,shortDescription,applicationStatus,totalHours,durationWeeks}))
  const people = getPublicInstructors().filter(person=>["person-sercan-ozinan","person-ece-ozinan"].includes(person.id)).reverse()
  const contact = getAcademyContact()
  return <>
    <section className={styles.intro} aria-labelledby="atlas-story">
      <p className={styles.eyebrow}>ATLAS’IN HİKÂYESİ</p>
      <div><h2 id="atlas-story">Önce bir tiyatro.<br/>Sonra, deneyimi<br/><em>paylaşma isteği.</em></h2><p>2013’te yola çıkan Atlas Tiyatro Araştırmaları, metinleri ve hikâyeleri sahnede yeniden düşünür. Bu üretim birikimi, Atlas Performans Akademisi’nde sanatçılarla birlikte çalışılan bir eğitim alanına dönüşür.</p><Link href="/tiyatro/hakkimizda" className={styles.textLink}>Atlas’ı yakından tanı<ArrowUpRight size={18}/></Link></div>
      <div className={styles.storyMark} aria-hidden="true"><span>2013</span><i/><span>ATLAS</span><ArrowDown size={42} strokeWidth={1}/><strong>APA</strong><small>ARAŞTIRMA DEVAM EDİYOR.</small></div>
    </section>

    <section id="atlas-program" className={styles.section} aria-labelledby="repertoire-title">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>01 / İZLE</p><h2 id="repertoire-title">Metinden <em>sahneye.</em></h2></div><Link href="/tiyatro/oyunlar" className={styles.textLink}>Bütün oyunlar<ArrowUpRight size={19}/></Link></div>
      {featured && <article className={styles.featuredShow} data-header-tone="dark">
        <Link href={"/tiyatro/oyunlar/"+featured.slug} className={styles.featuredPoster} aria-label={featured.title+" — oyun sayfası"}>{featured.image?.src&&<Image src={featured.image.src} alt={featured.imageAlt??featured.title} fill sizes="(max-width: 700px) 90vw, 42vw" className="object-contain"/>}</Link>
        <div className={styles.featuredCopy}><p className={styles.eyebrow}>REPERTUVARDAN BİR OYUN / {featured.year}</p><h3>{featured.title}</h3><p className={styles.work}>{featured.sourceWork}</p><p>{featured.shortDescription}</p><dl><div><dt>Uyarlayan & yöneten</dt><dd>{featured.director}</dd></div>{featured.durationMinutes&&<div><dt>Süre</dt><dd>{featured.durationMinutes} dakika</dd></div>}</dl><Link href={"/tiyatro/oyunlar/"+featured.slug} className={styles.lightButton}>Oyunun dünyasına gir<ArrowUpRight size={20}/></Link></div>
      </article>}
      <div className={styles.otherShows}>{others.map(show=><Link key={show.id} href={"/tiyatro/oyunlar/"+show.slug} className={styles.otherShow}><div className={styles.smallPoster}>{show.image?.src&&<Image src={show.image.src} alt={show.imageAlt??show.title} fill sizes="(max-width: 700px) 28vw, 140px" className="object-contain"/>}</div><div><span className={styles.eyebrow}>OYUN ARŞİVİ / {show.year}</span><h3>{show.title}</h3><p>{show.sourceWork??show.shortDescription}</p><span className={styles.textLink}>Oyunu keşfet<ArrowUpRight size={17}/></span></div></Link>)}</div>
      <Link href="/tiyatro/takvim" className={styles.calendarLine}><span>SEYİRCİ OLMAK İÇİN</span><strong>Bir sonraki buluşmayı takvimden takip et.</strong><ArrowUpRight size={24}/></Link>
    </section>

    <section id="atlas-insanlar" className={`${styles.section} ${styles.peopleSection}`} aria-labelledby="people-title">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>02 / TANIŞ</p><h2 id="people-title">Sahnede üreten.<br/><em>Atölyede paylaşan.</em></h2></div><p className={styles.sectionDescription}>Oyunun arkasındaki isimlerle<br/>bir çalışma masasında buluşmak.<br/>Atlas ile APA arasındaki bağ bu.</p></div>
      <div className={styles.peopleGrid}>{people.map(person=>{
        const director = person.id === "person-sercan-ozinan"
        return <div key={person.id} className={styles.personColumn}>
          <PersonCard person={person} href={"/akademi/egitmenler/"+person.slug}/>
          <div className={styles.personConnections}><Link href="/tiyatro/oyunlar/dublorun-dilemmasi"><span>SAHNEDE<small>{director ? "Uyarlayan & yöneten" : "Dramaturg"}</small></span><strong>Dublörün Dilemması</strong><ArrowUpRight size={18}/></Link><Link href={"/akademi/programlar/"+(director?"temel-oyunculuk-akademisi":"monolog-atolyesi")}><span>APA’DA<small>{director?"Eğitmen":"Geçmiş atölye · Eğitmen"}</small></span><strong>{director?"Temel Oyunculuk":"Monolog Atölyesi"}</strong><ArrowUpRight size={18}/></Link></div>
        </div>
      })}</div>
      <div className={styles.peopleLinks}><Link href="/tiyatro/ekip" className={styles.textLink}>Tiyatro ekibi<ArrowUpRight size={18}/></Link><Link href="/akademi/egitmenler" className={styles.textLink}>Tüm eğitmenler<ArrowUpRight size={18}/></Link></div>
    </section>

    <section className={styles.academy} data-header-tone="dark" id="atlas-akademi" aria-labelledby="academy-title">
      <div className={styles.academyHead}><div><p className={styles.eyebrow}>03 / ÇALIŞ · ATLAS PERFORMANS AKADEMİSİ</p><h2 id="academy-title">Seyirci koltuğundan<br/><em>çalışma alanına.</em></h2><p>Bir rolü, bir metni, bir görüntüyü araştırmak.<br/>Sen nereden başlamak istersin?</p></div><Link href="/akademi" className={styles.academyLogo}><Image src="/brand/academy/apa-supplied-dark.png" alt="APA — Atlas Performans Akademisi" width={447} height={447}/><span>Akademiyi tanı<ArrowUpRight size={18}/></span></Link></div>
      <AcademyPaths programs={programs}/>
    </section>

    <section className={`${styles.section} ${styles.visit}`} aria-labelledby="visit-title">
      <div><p className={styles.eyebrow}>04 / BULUŞ</p><h2 id="visit-title">Ekrandan çık.<br/><em>Bir merhaba de.</em></h2><Link href="/akademi/iletisim" className={styles.textLink}>İletişim ve ulaşım<ArrowUpRight size={20}/></Link></div>
      <div className={styles.address}><MapPin size={24}/><span className={styles.eyebrow}>APA / BEYOĞLU, İSTANBUL</span><h3>Sofyalı Sokak.<br/>Birlikte çalışacağımız yer.</h3><p>{contact?.addressLines?.join(" · ")}</p>{contact?.email&&<a href={"mailto:"+contact.email}>{contact.email}<ArrowUpRight size={18}/></a>}<span className={styles.visitNote}>Ziyaret öncesinde bize ulaşabilirsin.</span></div>
    </section>
    <section className={styles.social}><p>Prova arasında, <em>Atlas’ta.</em><ArrowRight size={24}/></p><div>{[{url:sources.theatreInstagram.url,label:"@atlastiyatro"},{url:sources.academyInstagram.url,label:"@atlas_performans"},{url:sources.seeingLab.url,label:"@seeinglab"}].map(item=><a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={16}/></a>)}</div></section>
  </>
}
export { HomeBelowFold }
