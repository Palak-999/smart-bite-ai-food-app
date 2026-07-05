import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-bold tracking-tight', className)}
      aria-label="SmartBite AI home"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <UtensilsCrossed className="size-5" />
      </span>
      <span className="text-xl">
        SmartBite<span className="text-primary"> AI</span>
      </span>
    </Link>
  )
}
