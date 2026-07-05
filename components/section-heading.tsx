import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
}

export function SectionHeading({ title, subtitle, href, linkLabel = 'See all' }: Props) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground text-pretty">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
