import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { ThemeProvider } from '@/context/theme-context'
import { CartProvider } from '@/context/cart-context'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SmartBite AI — Food Delivery, Reimagined',
  description:
    'Order food from the best restaurants near you with SmartBite AI. Fast delivery, smart meal recommendations, and unbeatable offers.',
  generator: 'v0.app',
  keywords: ['food delivery', 'restaurants', 'order food online', 'SmartBite AI'],
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FC8019' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1613' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans antialiased bg-background`}>
        <ThemeProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </CartProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
