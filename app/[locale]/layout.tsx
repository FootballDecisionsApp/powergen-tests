import type { Metadata } from 'next'
import { Oswald, DM_Sans, DM_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'PlayCube — Integrated Energy Systems',
  description: 'Industrial generators and integrated energy solutions.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'bg' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${oswald.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Cursor />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
