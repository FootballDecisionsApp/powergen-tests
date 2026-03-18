'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { IProduct } from '@/types'
import { useCart } from '@/lib/store/cart'

interface ProductCardProps {
  product: IProduct
}

const fuelLabel: Record<IProduct['fuelType'], string> = {
  diesel:   'Дизел',
  petrol:   'Бензин',
  gas:      'Газ',
  inverter: 'Инвертор',
}

const phaseLabel: Record<NonNullable<IProduct['phases']>, string> = {
  '1phase': '1 фаза',
  '3phase': '3 фази',
}

export function ProductCard({ product }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()
  const href = `/products/${product.slug.current}`

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (!product.inStock) return
    addItem({
      id:       product._id,
      name:     product.name,
      price:    product.price,
      quantity: 1,
      imageUrl: product.image,
      powerKW:  product.powerKW,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <div className="group bg-paper block overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:z-10 hover:shadow-[0_16px_48px_rgba(16,30,51,0.18)]">
      {/* Image area — links to product page */}
      <Link href={href} tabIndex={-1} aria-label={product.name} className="block">
        <div className="relative bg-navy-dk aspect-[4/3] flex items-center justify-center overflow-hidden">
          {/* Fuel badge */}
          <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-amber text-navy-dk font-mono text-[9px] font-medium tracking-[0.2em] uppercase">
            {fuelLabel[product.fuelType]}
          </span>

          {/* Gold overlay on hover */}
          <div className="absolute inset-0 bg-amber/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Product image or SVG */}
          <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04] p-6 w-full h-full flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.imageAlt ?? product.name}
                width={220}
                height={160}
                className="object-contain max-h-40 w-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <WireframeSVG kw={product.powerKW} />
            )}
          </div>

          {/* Badges */}
          {product.featured && (
            <span className="absolute top-4 right-4 px-2 py-0.5 bg-amber/20 border border-amber/40 text-amber font-mono text-[8px] tracking-[0.2em] uppercase">
              ТОП
            </span>
          )}
          {!product.inStock && (
            <span className="absolute top-4 right-4 px-2 py-0.5 bg-black/60 text-white/60 font-mono text-[8px] tracking-[0.15em] uppercase">
              Изчерпан
            </span>
          )}

          {/* Hover ribbon */}
          <div className="absolute bottom-0 left-0 right-0 bg-amber py-2.5 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-navy-dk font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            Виж детайли
          </div>
        </div>
      </Link>

      {/* Card body */}
      <div className="p-5 sm:p-6 border-t border-smoke">
        <Link href={href}>
          <h3 className="font-display text-[22px] sm:text-[24px] text-navy leading-none tracking-[0.02em] mb-3 hover:text-amber transition-colors duration-150">
            {product.name}
          </h3>
        </Link>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            `${product.powerKW} kW`,
            fuelLabel[product.fuelType],
            ...(product.phases ? [phaseLabel[product.phases]] : []),
            ...(product.autoStart ? ['Автостарт'] : []),
          ].map((spec) => (
            <span key={spec} className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-ash">
              <span className="w-1 h-1 rounded-full bg-amber shrink-0" />
              {spec}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div className="pt-4 flex items-end justify-between border-t border-smoke">
          <div>
            {product.oldPrice && (
              <p className="font-mono text-[10px] text-dust line-through mb-0.5">
                {product.oldPrice.toLocaleString('bg-BG')} лв
              </p>
            )}
            <p className="font-display text-[28px] text-navy leading-none tracking-[0.02em]">
              {product.price.toLocaleString('bg-BG')}{' '}
              <span className="font-sans text-[11px] text-ash font-normal">лв</span>
            </p>
            <p className="font-mono text-[9px] text-dust mt-0.5">
              ≈ {Math.round(product.price / 1.956).toLocaleString('bg-BG')} €
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-label={`Добави ${product.name} в количката`}
              title="Добави в количката"
              className={`w-9 h-9 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                justAdded
                  ? 'bg-green-700 text-white'
                  : 'bg-navy text-white hover:bg-amber hover:text-navy-dk'
              }`}
            >
              {justAdded ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              )}
            </button>

            {/* View product */}
            <Link
              href={href}
              aria-label={`Виж ${product.name}`}
              title="Виж продукта"
              className="w-9 h-9 flex items-center justify-center bg-smoke text-ash hover:bg-navy hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function WireframeSVG({ kw }: { kw: number }) {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="w-full max-w-[200px]">
      <rect x="20" y="50" width="200" height="80" rx="3" stroke="rgba(212,160,23,0.4)" strokeWidth="1.5"/>
      <rect x="35" y="62" width="45" height="56" rx="2" fill="rgba(212,160,23,0.06)" stroke="rgba(212,160,23,0.3)" strokeWidth="1"/>
      <circle cx="135" cy="90" r="28" fill="rgba(212,160,23,0.04)" stroke="rgba(212,160,23,0.35)" strokeWidth="1.5"/>
      <circle cx="135" cy="90" r="12" fill="none" stroke="rgba(212,160,23,0.4)" strokeWidth="1"/>
      <rect x="170" y="68" width="35" height="44" rx="2" fill="none" stroke="rgba(212,160,23,0.3)" strokeWidth="1"/>
      <line x1="80" y1="90" x2="107" y2="90" stroke="rgba(212,160,23,0.3)" strokeWidth="1"/>
      <rect x="65" y="38" width="28" height="12" rx="1" fill="none" stroke="rgba(212,160,23,0.25)" strokeWidth="1"/>
      <line x1="79" y1="38" x2="79" y2="50" stroke="rgba(212,160,23,0.25)" strokeWidth="1"/>
      <text x="120" y="150" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(212,160,23,0.3)" letterSpacing="1">
        {kw}kW
      </text>
    </svg>
  )
}
