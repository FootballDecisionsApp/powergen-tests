import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { sanityFetch } from '@/lib/sanity/client'
import { filteredProductsQuery, allProductsQuery } from '@/lib/sanity/queries'
import type { IProduct } from '@/types'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ShopHero } from '@/components/products/ShopHero'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('productsTitle'),
    description: t('productsDescription'),
  }
}

interface SearchParams {
  fuelType?: string
  minKW?: string
  maxKW?: string
  inStock?: string
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const sp = await searchParams

  const fuelType    = sp.fuelType ?? ''
  const minKW       = Number(sp.minKW) || 0
  const maxKW       = Number(sp.maxKW) || 9999
  const inStockOnly = sp.inStock === 'true'

  const hasFilters = fuelType !== '' || minKW > 0 || maxKW < 9999 || inStockOnly

  const products = await sanityFetch<IProduct[]>(
    hasFilters ? filteredProductsQuery : allProductsQuery,
    hasFilters ? { fuelType, minKW, maxKW, inStockOnly } : {},
    3600
  ).catch(() => [] as IProduct[])

  return (
    <div>
      {/* Dark hero + filter bar */}
      <ShopHero
        currentFuelType={fuelType}
        currentMinKW={minKW}
        currentMaxKW={maxKW}
        currentInStock={inStockOnly}
        productCount={products.length}
      />

      {/* Product grid */}
      <main className="px-4 sm:px-8 lg:px-16 py-10 sm:py-12 bg-cream">
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
