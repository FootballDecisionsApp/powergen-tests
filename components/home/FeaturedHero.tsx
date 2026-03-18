'use client'

import { useState }  from 'react'
import Image         from 'next/image'
import Link          from 'next/link'
import { useCart }   from '@/lib/store/cart'
import type { IProduct } from '@/types'

interface FeaturedHeroProps {
  product: IProduct
}

export function FeaturedHero({ product }: FeaturedHeroProps) {
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  const words      = product.name.split(' ')
  const headWords  = words.slice(0, -1)
  const accentWord = words[words.length - 1]

  const phasesLabel =
    product.phases === '3phase' ? '3-фазово'
    : product.phases === '1phase' ? '1-фазово'
    : '—'

  const autoStartLabel = product.autoStart ? '≤ 3 сек' : 'Ръчен'

  const warranty = product.specifications?.find(
    s => /гаранц|warrant/i.test(s.key)
  )?.value ?? '2 години'

  const savings     = product.oldPrice ? product.oldPrice - product.price : 0
  const discountPct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const subtitle = [
    product.category?.toUpperCase(),
    `${product.powerKW}KW${product.powerKVA ? `/${product.powerKVA}KVA` : ''}`,
  ].filter(Boolean).join(' · ')

  function handleAddToCart() {
    addItem({
      id:       product._id,
      name:     product.name,
      price:    product.price,
      quantity: 1,
      imageUrl: product.image,
      powerKW:  product.powerKW,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <section className="bg-paper border-y border-border">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT: text content ── */}
        <div className="px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-24 lg:pr-12 xl:pr-16">

          {/* Eyebrow */}
          <p className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[3px] uppercase text-amber before:content-[''] before:w-7 before:h-px before:bg-amber">
            Препоръчан продукт
          </p>

          {/* Product name */}
          <h2 className="font-serif font-light leading-[0.93] tracking-tight text-black mb-4">
            {headWords.map((w, i) => (
              <span key={i} className="block text-5xl sm:text-6xl lg:text-[5rem]">{w}</span>
            ))}
            <span className="block text-5xl sm:text-6xl lg:text-[5rem] italic text-amber">
              {accentWord}
            </span>
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="font-mono text-[9px] tracking-[2px] uppercase text-stone mb-6">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {product.description && (
            <p className="font-sans font-light text-[14px] text-stone leading-relaxed mb-8 max-w-[440px]">
              {product.description}
            </p>
          )}

          {/* Spec grid — 2 × 2, no gap border-separated */}
          <div className="grid grid-cols-2 gap-px bg-border border border-border mb-8">
            {[
              { label: 'Мощност', value: `${product.powerKW}`, unit: 'kW' },
              { label: 'Захранване', value: phasesLabel, unit: '' },
              { label: 'Автостарт', value: autoStartLabel, unit: '' },
              { label: 'Гаранция', value: warranty, unit: '' },
            ].map((spec) => (
              <div key={spec.label} className="bg-paper p-4 group hover:bg-cream transition-colors duration-200">
                <p className="font-mono text-[9px] tracking-[2px] uppercase text-dust mb-2">{spec.label}</p>
                <p className="font-serif text-2xl text-black leading-none">
                  {spec.value}
                  {spec.unit && (
                    <span className="font-cond text-[13px] text-stone ml-1">{spec.unit}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-4">
            {product.oldPrice && (
              <p className="font-mono text-[11px] text-dust line-through mb-1">
                {product.oldPrice.toLocaleString('bg-BG')} EUR
              </p>
            )}
            <div className="flex items-baseline gap-3">
              <p className="font-serif font-light text-5xl text-black leading-none">
                {product.price.toLocaleString('bg-BG')}
              </p>
              <span className="font-cond text-[14px] text-stone">EUR с ДДС</span>
            </div>
          </div>

          {/* Savings callout */}
          {savings > 0 && (
            <div className="mb-7 px-4 py-2.5 bg-amber/[0.06] border-l-2 border-amber">
              <p className="font-mono text-[10px] tracking-[1.5px] text-amber">
                Спестявате {savings.toLocaleString('bg-BG')} EUR — {discountPct}% отстъпка
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className={`group relative flex-1 min-h-[52px] font-cond font-bold text-[12px] tracking-[2.5px] uppercase transition-all duration-300 active:scale-[0.98] overflow-hidden ${
                justAdded
                  ? 'bg-green text-paper'
                  : 'bg-black text-paper hover:bg-amber'
              }`}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              {justAdded ? '✓ Добавено' : 'Добави в количката'}
            </button>

            <Link
              href={`/products/${product.slug.current}#specifications`}
              className="flex-1 sm:flex-none min-h-[52px] px-6 border border-border text-stone font-cond font-bold text-[11px] tracking-[2px] uppercase transition-all duration-300 hover:border-black hover:text-black hover:bg-cream-dark flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              Виж всички спецификации
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: image ── */}
        <div className="relative bg-cream border-t border-border lg:border-t-0 lg:border-l min-h-[360px] sm:min-h-[480px] lg:min-h-0 overflow-hidden">

          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(27,45,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,45,74,0.06) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Badges — top left */}
          <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5">
            {product.inStock && (
              <span className="px-2 py-1 bg-green text-paper font-mono text-[8px] font-bold tracking-[2px] uppercase">
                В наличност
              </span>
            )}
            <span className="px-2 py-1 bg-paper border border-border font-mono text-[8px] text-stone tracking-[1px] uppercase">
              ISO 8528
            </span>
            {product.category && (
              <span className="px-2 py-1 bg-paper border border-border font-mono text-[8px] text-stone tracking-[1px] uppercase">
                {product.category}
              </span>
            )}
          </div>

          {/* Product image */}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.imageAlt ?? product.name}
              fill
              className="object-contain p-10 sm:p-14 lg:p-16 pr-10 sm:pr-14 lg:pr-20 transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-[160px] font-light text-black/[0.04] select-none leading-none">
                {product.powerKW}
              </span>
            </div>
          )}

          {/* Vertical link — right edge */}
          <Link
            href="/products"
            className="absolute right-0 inset-y-0 w-9 flex items-center justify-center border-l border-border hover:bg-amber/[0.07] transition-colors duration-200 group"
            aria-label="Виж всички продукти"
          >
            <span className="font-mono text-[7px] tracking-[2.5px] uppercase text-dust group-hover:text-amber transition-colors duration-200 [writing-mode:vertical-rl]">
              Виж всички продукти
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
