import { getTranslations } from 'next-intl/server'
import type { IProduct } from '@/types'
import { Link } from '@/lib/navigation'
import { ProductCard } from './ProductCard'

interface FeaturedProductsProps {
  products: IProduct[]
}

export async function FeaturedProducts({ products }: FeaturedProductsProps) {
  const t = await getTranslations('featuredProducts')

  return (
    <section className="pt-20 sm:pt-24 pb-24 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-cream">

      {/* Section header */}
      <div className="flex items-end justify-between mb-14 sm:mb-16">
        <div>
          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-[48px] sm:text-[60px] lg:text-[72px] leading-[0.93] text-navy">
            {t('heading1')}<br />
            <span className="text-amber">{t('heading2')}</span>
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:flex items-center justify-center px-7 py-3.5 border border-navy text-navy font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy hover:text-cream hover:-translate-y-0.5 shrink-0 mb-2"
        >
          {t('seeAll')}
        </Link>
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-smoke">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-border bg-paper py-16 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dust">
            {t('empty')}
          </p>
        </div>
      )}

      {/* Mobile see-all */}
      <div className="sm:hidden mt-6">
        <Link
          href="/products"
          className="flex items-center justify-center gap-2 w-full min-h-[48px] border border-navy font-mono text-[10px] tracking-[0.2em] uppercase text-navy hover:bg-navy hover:text-cream transition-all duration-200"
        >
          {t('seeAll')}
        </Link>
      </div>
    </section>
  )
}
