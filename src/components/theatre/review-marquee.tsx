"use client"

import { cn } from "@/lib/utils"

export type ReviewMarqueeItem = {
  id: string
  author: string
  text: string
  rating?: number
  ratingMax?: number
}

type ReviewMarqueeProps = {
  items: ReviewMarqueeItem[]
  title?: string
  className?: string
}

/**
 * İzleyici yorumları — testimonials grid (beyaz), kaynak satırı yok.
 */
function ReviewMarquee({
  items,
  title = "İzleyici yorumları",
  className,
}: ReviewMarqueeProps) {
  if (items.length === 0) return null
  const list = items.slice(0, 9)

  return (
    <section
      className={cn("border-y border-zinc-200 bg-white py-16 sm:py-24", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.22em] text-zinc-500 uppercase">
            Yorumlar
          </p>
          <h2 className="mt-3 text-4xl font-light tracking-tighter text-black sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6 lg:grid-cols-3">
            {list.map((item, idx) => {
              const featured = idx % 3 === 1
              return (
                <article
                  key={item.id}
                  className={cn(
                    "flex flex-col justify-between rounded-2xl border p-6 sm:p-8",
                    featured
                      ? "border-black bg-white shadow-sm lg:row-span-1"
                      : "border-zinc-200 bg-white/80"
                  )}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="text-4xl font-light leading-none text-zinc-300">
                      ”
                    </span>
                    {item.rating != null ? (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                        {item.rating}/{item.ratingMax ?? 10}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[15px] leading-relaxed text-zinc-700 sm:text-base">
                    {item.text}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-black">
                    {item.author}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { ReviewMarquee }
