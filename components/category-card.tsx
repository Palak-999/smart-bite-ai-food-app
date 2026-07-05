import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/lib/types'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/restaurants?cuisine=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center gap-3 text-center"
    >
      <div className="relative size-24 overflow-hidden rounded-full border-2 border-transparent shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-md sm:size-28">
        <Image
          src={category.image || '/placeholder.svg'}
          alt={category.name}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
        {category.name}
      </span>
    </Link>
  )
}
