import type { Metadata } from 'next'
import { Oswald, DM_Sans, DM_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
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
      </body>
    </html>
  )
}
