import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { featuredProductsQuery } from '@/lib/sanity/queries'
import type { IProduct } from '@/types'
import { Hero }             from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { WhyUs }            from '@/components/home/WhyUs'
import { TrustBar }         from '@/components/home/TrustBar'

export const metadata: Metadata = {
  title: 'PlayCube — Интегрирани Енергийни Системи',
  description:
    'Сигурна енергия и енергийна ефективност. Промишлени генератори и интегрирани решения за качествено електрозахранване в цяла България.',
}

export default async function HomePage() {
  const products = await sanityFetch<IProduct[]>(featuredProductsQuery).catch(
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
