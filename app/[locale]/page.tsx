import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { sanityFetch } from '@/lib/sanity/client'
import { featuredProductsQuery } from '@/lib/sanity/queries'
import type { IProduct } from '@/types'
import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { WhyUs } from '@/components/home/WhyUs'
import { TrustBar } from '@/components/home/TrustBar'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  }
}

export default async function HomePage() {
  const locale = await getLocale()
  const products = await sanityFetch<IProduct[]>(featuredProductsQuery, { locale }).catch(
    () => [] as IProduct[]
  )

  return (
    <main>
      <Hero />
      <FeaturedProducts products={products} />
      <WhyUs />
      <TrustBar />
    </main>
  )
}
