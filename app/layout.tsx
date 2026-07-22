import type { Metadata } from 'next'
import { Oswald, DM_Sans, DM_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { CloudflareAnalytics } from '@/components/analytics/CloudflareAnalytics'
import { PostHogAnalytics } from '@/components/analytics/PostHogAnalytics'
import '@/app/globals.css'

const oswald = Oswald({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PlayCube — Integrated Energy Systems',
  description: 'Industrial generators and integrated energy solutions.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${oswald.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        {children}
        <CloudflareAnalytics />
        <PostHogAnalytics
          posthogKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
          posthogHost={process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'}
        />
      </body>
    </html>
  )
}
