import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'

// Checkout is a Client Component, so its metadata lives here. Transactional
// pages are kept out of the index — see app/[locale]/cart/layout.tsx.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await getLocale()
  return buildPageMetadata({
    locale,
    path: '/checkout',
    title: t('checkoutTitle'),
    description: t('checkoutDescription'),
    noIndex: true,
  })
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
