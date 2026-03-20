import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { sanityFetch } from '@/lib/sanity/client'
import { filteredProductsQuery, allProductsQuery } from '@/lib/sanity/queries'
import type { IProduct } from '@/types'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ShopHero, type SortOption } from '@/components/products/ShopHero'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('productsTitle'),
    description: t('productsDescription'),
  }
}

const VALID_SORTS: SortOption[] = ['powerAsc', 'powerDesc', 'priceAsc', 'priceDesc']

function sortProducts(products: IProduct[], sort: SortOption): IProduct[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'powerAsc':  return a.powerKW - b.powerKW
      case 'powerDesc': return b.powerKW - a.powerKW
      case 'priceAsc':  return a.price - b.price
      case 'priceDesc': return b.price - a.price
    }
  })
}

interface SearchParams {
  fuelType?: string
  minKW?: string
  maxKW?: string
  inStock?: string
  sort?: string
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const sp = await searchParams
  const locale = await getLocale()

  const fuelType    = sp.fuelType ?? ''
  const minKW       = Number(sp.minKW) || 0
  const maxKW       = Number(sp.maxKW) || 9999
  const inStockOnly = sp.inStock === 'true'
  const sort: SortOption = VALID_SORTS.includes(sp.sort as SortOption)
    ? (sp.sort as SortOption)
    : 'powerAsc'

  const hasFilters = fuelType !== '' || minKW > 0 || maxKW < 9999 || inStockOnly

  const raw = await sanityFetch<IProduct[]>(
    hasFilters ? filteredProductsQuery : allProductsQuery,
    hasFilters ? { locale, fuelType, minKW, maxKW, inStockOnly } : { locale },
    3600
  ).catch(() => [] as IProduct[])

  const products = sortProducts(raw, sort)

  return (
    <div>
      {/* Dark hero + filter bar */}
      <ShopHero
        currentFuelType={fuelType}
        currentMinKW={minKW}
        currentMaxKW={maxKW}
        currentInStock={inStockOnly}
        currentSort={sort}
        productCount={products.length}
      />

      {/* Product grid */}
      <main className="px-4 sm:px-8 lg:px-16 py-10 sm:py-12 bg-cream">
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
