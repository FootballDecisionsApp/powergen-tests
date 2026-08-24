import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'

// Own metadata so the confirmation page does not inherit the checkout title.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await getLocale()
  return buildPageMetadata({
    locale,
    path: '/checkout/success',
    title: t('successTitle'),
    description: t('successDescription'),
    noIndex: true,
  })
}

export default function CheckoutSuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
