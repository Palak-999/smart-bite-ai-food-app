'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  ChevronDown,
  Home,
  Store,
  Percent,
  User,
  ListChecks,
  Sparkles,
  FileText,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/restaurants', label: 'Restaurants', icon: Store },
  { href: '/offers', label: 'Offers', icon: Percent },
  { href: '/ai-chat-assistant', label: 'AI Assistant', icon: Sparkles },
  { href: '/monthly-calorie-dashboard', label: 'Calorie Dashboard', icon: ListChecks },
  { href: '/excel-calorie-report', label: 'Excel Report', icon: FileText },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { totalItems } = useCart()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/restaurants?q=${encodeURIComponent(q)}` : '/restaurants')
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle asChild>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = pathname === link.href
                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted',
                      )}
                    >
                      <Icon className="size-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                )
              })}
              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ShoppingCart className="size-5" />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </SheetClose>
            </nav>
            <div className="mt-2 flex items-center justify-between border-t border-border p-4">
              <span className="text-sm text-muted-foreground">Appearance</span>
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>

        <Logo className="shrink-0" />

        {/* Location selector */}
        <button
          className="hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:flex"
          aria-label="Change delivery location"
        >
          <MapPin className="size-4 text-primary" />
          <span className="max-w-32 truncate">Downtown, City</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative ml-auto max-w-md flex-1 md:ml-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants or dishes"
            className="h-10 rounded-full border-border bg-muted/50 pl-9 pr-4"
            aria-label="Search"
          />
        </form>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.slice(1).map((link) => {
            const active = pathname === link.href
            return (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={cn('rounded-full', active && 'text-primary')}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <Button
          asChild
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label={`Cart with ${totalItems} items`}
        >
          <Link href="/cart">
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </Button>

        <Button className="hidden rounded-full sm:inline-flex" size="sm">
          <User className="size-4" />
          Sign in
        </Button>
      </div>
    </header>
  )
}
