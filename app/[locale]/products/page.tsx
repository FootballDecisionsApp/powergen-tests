import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { sanityFetch } from '@/lib/sanity/client'
import { filteredProductsQuery, allProductsQuery } from '@/lib/sanity/queries'
import type { IProduct } from '@/types'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ShopHero, type SortOption } from '@/components/products/ShopHero'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await getLocale()
  return buildPageMetadata({
    locale,
    path: '/products',
    title: t('productsTitle'),
    description: t('productsDescription'),
  })
}

const VALID_SORTS: SortOption[] = ['powerAsc', 'powerDesc', 'nameAsc', 'nameDesc']

// Products are rated in kVA and the cards display kVA, so sort on that and
// fall back to kW for anything without a kVA rating.
const rating = (p: IProduct): number => p.powerKVA ?? p.powerKW

// `numeric` so "... 100 kVA" sorts after "... 50 kVA" rather than before it —
// the model names end in a figure, which a plain string compare gets wrong.
const byName = (a: IProduct, b: IProduct, locale: string): number =>
  a.name.localeCompare(b.name, locale, { numeric: true, sensitivity: 'base' })

function sortProducts(products: IProduct[], sort: SortOption, locale: string): IProduct[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'powerAsc':  return rating(a) - rating(b)
      case 'powerDesc': return rating(b) - rating(a)
      case 'nameAsc':   return byName(a, b, locale)
      case 'nameDesc':  return byName(b, a, locale)
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
  const tb = await getTranslations('breadcrumbs')

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

  const products = sortProducts(raw, sort, locale)

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
        breadcrumbs={
          <Breadcrumbs
            locale={locale}
            label={tb('label')}
            items={[{ label: tb('home'), href: '/' }, { label: tb('products') }]}
          />
        }
      />

      {/* Product grid */}
      <main className="px-4 sm:px-8 lg:px-16 py-10 sm:py-12 bg-cream">
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
