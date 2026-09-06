"use client"

import Link from "next/link"
import Image from "next/image"
import { ExternalLinkIcon } from "lucide-react"

import { PersonLanyard } from "@/components/shared/person-lanyard"
import { rolesLabel } from "@/lib/labels"
import type {
  PersonRecord,
  ProductionRecord,
  ProgramRecord,
} from "@/content/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type PersonProfileProps = {
  person: PersonRecord
  productions?: ProductionRecord[]
  programs?: ProgramRecord[]
  productionBasePath?: string
  programBasePath?: string
  className?: string
  lanyardBackImage?: string
}

function PersonProfile({
  person,
  productions = [],
  programs = [],
  productionBasePath = "/tiyatro/oyunlar",
  programBasePath = "/akademi/programlar",
  className,
  lanyardBackImage = "/brand/academy/apa-supplied-dark.png",
}: PersonProfileProps) {
  return (
    <article className={cn("w-full bg-white", className)}>
      <div className="mx-auto grid max-w-[1600px] items-stretch gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="profile-lanyard-stage relative min-h-[600px] overflow-hidden lg:sticky lg:top-[88px] lg:h-[calc(100dvh-88px)]">
          <PersonLanyard
            frontImage={person.image?.src}
            backImage={lanyardBackImage}
            name={person.fullName}
            caption={rolesLabel(person.roles)}
            compact
            className="h-full min-h-[600px]"
          />
        </div>

        <div className="space-y-8 bg-white px-5 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
          <header className="space-y-4">
            <p className="text-[11px] font-medium tracking-[0.22em] text-zinc-500 uppercase">
              {rolesLabel(person.roles)}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {person.title}
            </h1>
            {person.shortDescription ? (
              <p className="max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                {person.shortDescription}
              </p>
            ) : null}
          </header>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="border-b border-zinc-200 py-4">
              <dt className="text-xs tracking-[0.16em] text-zinc-500 uppercase">
                İsim
              </dt>
              <dd className="mt-2 text-lg font-semibold">{person.fullName}</dd>
            </div>
            {person.titles?.length ? (
              <div className="border-b border-zinc-200 py-4">
                <dt className="text-xs tracking-[0.16em] text-zinc-500 uppercase">
                  Unvan
                </dt>
                <dd className="mt-2 text-lg font-semibold">
                  {person.titles.join(" · ")}
                </dd>
              </div>
            ) : null}
          </dl>

          {productions.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Oyunlar</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {productions.map((p) => (
                  <Link
                    key={p.id}
                    href={`${productionBasePath}/${p.slug}`}
                    className="group overflow-hidden rounded-2xl ring-1 ring-black/10"
                  >
                    <div className="relative aspect-[3/4]">
                      {p.image?.src ? (
                        <Image
                          src={p.image.src}
                          alt={p.imageAlt ?? p.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-zinc-100 p-4 text-center font-medium">
                          {p.title}
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-14 text-white">
                        <p className="font-semibold">{p.title}</p>
                        {p.year ? (
                          <p className="text-xs text-white/70">{p.year}</p>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {programs.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Programlar</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {programs.map((program) => (
                  <li key={program.id}>
                    <Link
                      href={`${programBasePath}/${program.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-zinc-200 p-5 transition hover:border-black"
                    >
                      <span className="font-semibold">{program.title}</span>
                      {program.shortDescription ? (
                        <span className="mt-2 line-clamp-2 text-sm text-zinc-500">
                          {program.shortDescription}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <Button asChild variant="outline" className="rounded-full">
            <a href={person.sourceUrl} target="_blank" rel="noopener noreferrer">
              Kaynak
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}

export { PersonProfile }
