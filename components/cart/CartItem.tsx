'use client'

import Image from 'next/image'
import { useCart } from '@/lib/store/cart'
import type { ICartItem } from '@/types'

interface CartItemProps {
  item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  function handleDecrement() {
    if (item.quantity <= 1) return
    updateQuantity(item.id, item.quantity - 1)
  }

  function handleIncrement() {
    updateQuantity(item.id, item.quantity + 1)
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4 py-4 border-b border-border-light">
      {/* Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-cream border border-border">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-6 h-6 text-dust" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" />
              <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-[16px] sm:text-[18px] text-black leading-snug truncate">
          {item.name}
        </p>
        <p className="font-mono text-[9px] tracking-[1px] uppercase text-dust mt-0.5">
          {item.powerKW}kW
        </p>
        <p className="font-mono text-[10px] text-stone mt-1">
          {item.price.toLocaleString('bg-BG')} EUR / бр.
        </p>
      </div>

      {/* Right side: qty + total + remove */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        {/* Quantity controls */}
        <div className="flex items-center border border-border">
          <button
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            aria-label="Намали количеството"
            className="w-9 h-9 flex items-center justify-center text-stone hover:text-black hover:bg-cream-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[14px]"
          >
            −
          </button>
          <span className="w-10 text-center font-mono text-[13px] text-black select-none">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            aria-label="Увеличи количеството"
            className="w-9 h-9 flex items-center justify-center text-stone hover:text-black hover:bg-cream-dark transition-colors font-mono text-[14px]"
          >
            +
          </button>
        </div>

        {/* Line total */}
        <p className="font-serif text-[18px] font-normal text-black leading-none">
          {(item.price * item.quantity).toLocaleString('bg-BG')}
          <span className="font-cond text-[11px] text-stone ml-1">EUR</span>
        </p>

        {/* Remove */}
        <button
          onClick={() => removeItem(item.id)}
          aria-label={`Премахни ${item.name}`}
          className="w-11 h-11 flex items-center justify-center text-dust hover:text-red transition-colors -mr-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
