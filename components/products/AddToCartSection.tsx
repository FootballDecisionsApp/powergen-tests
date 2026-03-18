'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store/cart'

interface AddToCartSectionProps {
  productId: string
  productName: string
  price: number
  powerKW: number
  imageUrl?: string
  inStock: boolean
}

export function AddToCartSection({
  productId,
  productName,
  price,
  powerKW,
  imageUrl,
  inStock,
}: AddToCartSectionProps) {
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  function handleAddToCart() {
    if (!inStock) return
    addItem({ id: productId, name: productName, price, quantity: 1, imageUrl, powerKW })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      {/* Primary CTA */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        aria-label={`Добави ${productName} в количката`}
        className={`flex-1 min-h-[52px] font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
          justAdded
            ? 'bg-navy text-amber border border-amber/40'
            : inStock
            ? 'bg-amber text-navy-dk hover:bg-amber-light hover:-translate-y-0.5'
            : 'bg-white/5 border border-white/10 text-white/30'
        }`}
      >
        {justAdded ? '✓ Добавено' : inStock ? 'Добави в количката' : 'Изчерпан'}
      </button>

      {/* Secondary CTA — scroll to spec table */}
      <a
        href="#specifications"
        className="flex-1 sm:flex-none min-h-[52px] px-6 border border-white/[0.12] text-white/50 font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:border-amber/50 hover:text-white/80 flex items-center justify-center gap-1.5"
      >
        Спецификации
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  )
}
