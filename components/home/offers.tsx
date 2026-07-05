import { BadgePercent, Copy } from 'lucide-react'
import { offers } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function Offers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <SectionHeading
        title="Special offers"
        subtitle="Save more on your favorite meals with these deals"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.color} p-6 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1`}
          >
            <BadgePercent className="absolute -right-4 -top-4 size-24 opacity-20" />
            <p className="text-3xl font-extrabold">{offer.title}</p>
            <p className="mt-1 text-sm text-white/90">{offer.subtitle}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
              <Copy className="size-3.5" />
              Code: {offer.code}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
