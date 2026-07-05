import Link from 'next/link'
import { Camera, AtSign, Users, Video } from 'lucide-react'
import { Logo } from '@/components/logo'

const footerCols = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Team', 'SmartBite Blog', 'Contact'],
  },
  {
    title: 'For Foodies',
    links: ['Restaurants', 'Offers', 'AI Recommender', 'Gift Cards', 'Help & Support'],
  },
  {
    title: 'For Partners',
    links: ['Add Your Restaurant', 'Become a Rider', 'Partner Login', 'Advertise'],
  },
]

const socials = [
  { icon: Camera, label: 'Instagram' },
  { icon: AtSign, label: 'Twitter' },
  { icon: Users, label: 'Facebook' },
  { icon: Video, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Smarter food delivery powered by AI. Discover the best meals near you,
              tailored to your mood, budget, and cravings.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} SmartBite AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
