import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Link } from '@/lib/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { productBySlugQuery, allProductSlugsQuery } from '@/lib/sanity/queries'
import type { IProduct } from '@/types'
import { ImageGallery } from '@/components/products/ImageGallery'
import { AddToCartSection } from '@/components/products/AddToCartSection'
import { ProductCard } from '@/components/products/ProductCard'

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(allProductSlugsQuery, {}, 0).catch(
    () => [] as { slug: string }[]
  )
  return routing.locales.flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug }))
  )
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string; locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = await getTranslations('metadata')
  const product = await sanityFetch<IProduct | null>(productBySlugQuery, { slug }).catch(
    () => null
  )
  if (!product) return { title: t('productNotFound') }
  return {
    title: product.seoTitle ?? `${product.name} — PlayCube`,
    description: product.seoDescription ?? product.description?.slice(0, 155),
  }
}

const fuelColors: Record<IProduct['fuelType'], string> = {
  diesel:   'bg-amber text-navy-dk',
  petrol:   'bg-white/10 text-white/70 border border-white/20',
  gas:      'bg-navy text-amber border border-amber/30',
  inverter: 'bg-navy text-amber border border-amber/30',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const t = await getTranslations('productDetail')

  const product = await sanityFetch<IProduct | null>(
    productBySlugQuery,
    { slug },
    3600
  )

  if (!product) notFound()

  const fuelLabels: Record<IProduct['fuelType'], string> = {
    diesel:   t('fuelDiesel'),
    petrol:   t('fuelPetrol'),
    gas:      t('fuelGas'),
    inverter: t('fuelInverter'),
  }

  const phaseLabels: Record<NonNullable<IProduct['phases']>, string> = {
    '1phase': t('phase1'),
    '3phase': t('phase3'),
  }

  const subtitleParts: string[] = [fuelLabels[product.fuelType]]
  if (product.phases) subtitleParts.push(phaseLabels[product.phases])
  subtitleParts.push(
    product.powerKVA
      ? `${product.powerKW}kW / ${product.powerKVA}kVA`
      : `${product.powerKW}kW`
  )
  const subtitle = subtitleParts.join(' · ')

  const warrantyValue =
    product.specifications?.find((s) =>
      s.key.toLowerCase().includes('гаранц') || s.key.toLowerCase().includes('warrant')
    )?.value ?? t('warrantyFallback')

  const miniSpecs = [
    {
      key: t('specPower'),
      value: product.powerKVA
        ? `${product.powerKW}kW / ${product.powerKVA}kVA`
        : `${product.powerKW} kW`,
    },
    {
      key: t('specPhase'),
      value: product.phases ? phaseLabels[product.phases] : t('singlePhase'),
    },
    { key: t('specAutoStart'), value: product.autoStart ? t('yes') : t('no') },
    { key: t('specWarranty'), value: warrantyValue },
  ]

  const discountPct =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null

  const related: IProduct[] = (product.related ?? []).map((r) => ({ ...r, inStock: true }))
  const images    = product.images ?? (product.image ? [product.image] : [])
  const imageAlts = product.imageAlts ?? []

  return (
    <main className="min-h-screen bg-navy-dk pt-[72px]">

      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <section className="relative bg-navy-dk overflow-hidden border-b border-amber/[0.08]">
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gold glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)',
            top: 0, right: 0,
          }}
        />

        <div className="relative px-4 sm:px-8 lg:px-16 py-10 sm:py-14 max-w-screen-xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-7" aria-label="Breadcrumb">
            <Link href="/" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-amber/60 transition-colors">
              {t('breadcrumbHome')}
            </Link>
            <span className="text-white/15 font-mono text-[9px]">/</span>
            <Link href="/products" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-amber/60 transition-colors">
              {t('breadcrumbProducts')}
            </Link>
            <span className="text-white/15 font-mono text-[9px]">/</span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber/60">
              {product.name}
            </span>
          </nav>

          {/* Top row: fuel badge + category */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase font-medium ${fuelColors[product.fuelType]}`}>
              {fuelLabels[product.fuelType]}
            </span>
            {product.category && (
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">
                {product.category}
              </span>
            )}
            {product.featured && (
              <span className="px-2.5 py-1 border border-amber/30 text-amber font-mono text-[9px] tracking-[0.2em] uppercase">
                {t('topBadge')}
              </span>
            )}
          </div>

          {/* Product name */}
          <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.92] text-white mb-3 tracking-[-0.01em]">
            {product.name.toUpperCase()}
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/35">
            {subtitle}
          </p>
        </div>
      </section>

      {/* ── MAIN BODY ────────────────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* ── LEFT: Image ─────────────────────────────────────────────── */}
          <div>
            {images.length > 0 ? (
              <ImageGallery
                images={images}
                alts={imageAlts}
                productName={product.name}
                inStock={product.inStock}
                featured={product.featured}
              />
            ) : (
              <div className="bg-navy aspect-[4/3] flex flex-col items-center justify-center gap-4">
                {/* Wireframe placeholder */}
                <svg viewBox="0 0 300 200" className="w-48 opacity-20" fill="none">
                  <rect x="40" y="80" width="220" height="80" rx="4" stroke="#D4A017" strokeWidth="1.5"/>
                  <rect x="60" y="95" width="50" height="50" rx="2" stroke="#D4A017" strokeWidth="1"/>
                  <circle cx="160" cy="120" r="22" stroke="#D4A017" strokeWidth="1.5"/>
                  <circle cx="160" cy="120" r="10" stroke="#D4A017" strokeWidth="1"/>
                  <rect x="195" y="100" width="40" height="40" rx="2" stroke="#D4A017" strokeWidth="1"/>
                </svg>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
                  {t('noImage')}
                </span>
              </div>
            )}
          </div>

          {/* ── RIGHT: Purchase panel ────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Description */}
            {product.description && (
              <p className="font-sans font-light text-[14px] text-white/45 leading-relaxed mb-6 border-b border-white/[0.06] pb-6">
                {product.description}
              </p>
            )}

            {/* 4-spec mini-grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.04] mb-6">
              {miniSpecs.map((spec) => (
                <div key={spec.key} className="bg-navy px-4 py-3.5">
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/25 mb-1.5">
                    {spec.key}
                  </p>
                  <p className="font-display text-[22px] text-white leading-none">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 flex-wrap mb-1">
              {product.oldPrice && (
                <p className="font-mono text-[11px] text-white/25 line-through">
                  {product.oldPrice.toLocaleString('bg-BG')} EUR
                </p>
              )}
              {discountPct !== null && (
                <span className="px-2.5 py-1 bg-amber/10 border border-amber/25 font-mono text-[9px] text-amber tracking-[0.1em]">
                  -{discountPct}%
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-[52px] sm:text-[60px] text-amber leading-none">
                {product.price.toLocaleString('bg-BG')}
              </span>
              <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/35 mb-1">
                {t('priceWithVat')}
              </span>
            </div>

            {/* Add to cart */}
            <AddToCartSection
              productId={product._id}
              productName={product.name}
              price={product.price}
              powerKW={product.powerKW}
              imageUrl={images[0]}
              inStock={product.inStock}
            />

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-white/[0.06]">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: t('trustCE') },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: t('trust247') },
                { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', label: t('trustMockPayment') },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-amber/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/25">{label}</span>
                </div>
              ))}
            </div>

          </div>{/* end RIGHT */}
        </div>
      </section>

      {/* ── SPECIFICATIONS TABLE ─────────────────────────────────────────── */}
      {product.specifications && product.specifications.length > 0 && (
        <section
          id="specifications"
          className="border-t border-white/[0.06] py-12 sm:py-16"
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
            <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
              <span className="w-7 h-px bg-amber shrink-0" />
              {t('specsEyebrow')}
            </p>
            <h2 className="font-display text-[36px] sm:text-[48px] leading-[0.93] text-white mb-10">
              {t('specsHeading1')} <span className="text-amber">{t('specsHeadingAccent')}</span>
            </h2>

            <div className="overflow-hidden border border-white/[0.06]">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6 font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 w-[40%] sm:w-[35%] align-top">
                        {spec.key}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-sans font-light text-[14px] text-white/70">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-white/[0.06] py-12 sm:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
            <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
              <span className="w-7 h-px bg-amber shrink-0" />
              {t('relatedEyebrow')}
            </p>
            <h2 className="font-display text-[36px] sm:text-[48px] leading-[0.93] text-white mb-10">
              {t('relatedHeading1')} <span className="text-amber">{t('relatedHeadingAccent')}</span>
            </h2>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="sm:hidden flex gap-0.5 overflow-x-auto pb-4 -mx-4 px-4">
              {related.map((p) => (
                <div key={p._id} className="flex-shrink-0 w-[280px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-0.5 bg-white/[0.03]">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="bg-amber px-4 sm:px-8 lg:px-16 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-screen-xl mx-auto">
        <h2 className="font-display text-[32px] sm:text-[40px] leading-[0.93] text-navy-dk">
          {t('ctaHeading1')}<br />
          <span className="text-navy/60">{t('ctaHeading2')}</span>
        </h2>
        <Link
          href="/contact"
          className="shrink-0 flex items-center min-h-[52px] px-8 bg-navy-dk text-white font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy hover:-translate-y-0.5"
        >
          {t('ctaBtn')}
        </Link>
      </section>

    </main>
  )
}
