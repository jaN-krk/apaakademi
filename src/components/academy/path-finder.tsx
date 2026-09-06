"use client"

import { useMemo, useState } from "react"
import { filterPrograms } from "@/lib/program-filter"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ProgramCard } from "@/components/academy/program-card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProgramRecord } from "@/content/types"

type PathFinderProps = {
  programs: ProgramRecord[]
}

function PathFinder({ programs }: PathFinderProps) {
  const [goal, setGoal] = useState<string>("all")
  const [format, setFormat] = useState<string>("all")
  const [status, setStatus] = useState<string>("all")
  const [query, setQuery] = useState("")
  const hasFilters = Boolean(query || goal !== "all" || format !== "all" || status !== "all")
  const reset = () => { setQuery(""); setGoal("all"); setFormat("all"); setStatus("all") }

  const filtered = useMemo(() => filterPrograms(programs, {query, goal, format, status}), [programs, query, goal, format, status])

  return (
    <div className="space-y-8">
      <div className="relative max-w-xl"><Search className="pointer-events-none absolute top-3.5 left-4 size-4 text-neutral-500"/><Input aria-label="Eğitimlerde ara" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Bir program veya konu ara…" className="h-12 rounded-sm border-neutral-300 pl-11 pr-11"/>{query && <button type="button" onClick={()=>setQuery("")} aria-label="Aramayı temizle" className="absolute top-1 right-1 flex size-10 items-center justify-center"><X size={16}/></button>}</div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="goal">İlgi alanı</Label>
          <Select value={goal} onValueChange={setGoal}>
            <SelectTrigger id="goal" className="w-full">
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="acting">Oyunculuk</SelectItem>
              <SelectItem value="cinema">Sinema</SelectItem>
              <SelectItem value="writing">Yazarlık</SelectItem>
              <SelectItem value="performance">Performans</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format" className="w-full">
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="in-person">Yüz yüze</SelectItem>
              <SelectItem value="online">Çevrimiçi</SelectItem>
              <SelectItem value="hybrid">Hibrit</SelectItem>
              <SelectItem value="unknown">Format belirtilmedi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Başvuru durumu</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="open">Başvuru açık</SelectItem>
              <SelectItem value="completed">Arşiv</SelectItem>
              <SelectItem value="upcoming">Yakında</SelectItem>
              <SelectItem value="unknown">Bilgi al</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex min-h-10 items-center justify-between gap-4 border-b border-neutral-200 pb-4"><p role="status" aria-live="polite" className="text-sm text-neutral-500">{filtered.length} eğitim{hasFilters ? " eşleşiyor" : " listeleniyor"}</p>{hasFilters && <Button type="button" variant="ghost" size="sm" onClick={reset}>Filtreleri temizle<X size={14}/></Button>}</div>
      {filtered.length === 0 ? (
        <div className="border border-neutral-200 p-8"><h3 className="text-xl font-medium">Bu seçimle eşleşen eğitim bulunamadı.</h3><p className="mt-3 text-sm text-neutral-500">Başka bir kelime dene veya filtreleri temizleyerek bütün eğitimlere göz at.</p><Button type="button" variant="outline" className="mt-6" onClick={reset}>Tüm eğitimleri göster</Button></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  )
}

export { PathFinder }
