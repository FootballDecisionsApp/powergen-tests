'use client'

import Image from 'next/image'
import { useCart } from '@/lib/store/cart'
import type { ICartItem } from '@/types'

interface CartItemProps {
  item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-5 border-b border-white/[0.06]">

      {/* Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-navy-dk border border-white/[0.08]">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-2" sizes="80px"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[8px] text-white/15">IMG</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[14px] text-white/75 leading-snug truncate">{item.name}</p>
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/25 mt-0.5">{item.powerKW} kW</p>
        <p className="font-mono text-[10px] text-amber/70 mt-1">{item.price.toLocaleString('bg-BG')} EUR / бр.</p>
      </div>

      {/* Qty + total + remove */}
      <div className="flex flex-col items-end gap-2.5 shrink-0">

        {/* Quantity */}
        <div className="flex items-center border border-white/[0.1]">
          <button
            onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Намали"
            className="w-8 h-8 flex items-center justify-center font-mono text-[14px] text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="w-9 text-center font-mono text-[12px] text-white/70 select-none">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Увеличи"
            className="w-8 h-8 flex items-center justify-center font-mono text-[14px] text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            +
          </button>
        </div>

        {/* Line total */}
        <p className="font-display text-[20px] text-amber leading-none">
          {(item.price * item.quantity).toLocaleString('bg-BG')}
          <span className="font-mono text-[9px] text-white/25 ml-1">EUR</span>
        </p>

        {/* Remove */}
        <button
          onClick={() => removeItem(item.id)}
          aria-label={`Премахни ${item.name}`}
          className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-red transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
