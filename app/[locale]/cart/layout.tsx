import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'

// The cart page itself is a Client Component, so its metadata lives here.
// noIndex: a personal, always-empty-for-crawlers page has no search value and
// would only dilute the crawl budget for the catalogue.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await getLocale()
  return buildPageMetadata({
    locale,
    path: '/cart',
    title: t('cartTitle'),
    description: t('cartDescription'),
    noIndex: true,
  })
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
