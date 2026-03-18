'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { CartItem } from './CartItem'

export function CartDrawer() {
  const { items, isCartOpen, closeCart, getTotalPrice, getTotalItems } = useCart()
  const total = getTotalPrice()
  const itemCount = getTotalItems()

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isCartOpen, closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Количка"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-paper flex flex-col sm:border-l sm:border-border transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-cond font-bold text-[14px] tracking-[3px] uppercase text-black">
              Количка
            </span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber text-paper font-mono text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Затвори количката"
            className="w-11 h-11 flex items-center justify-center text-stone hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <svg
                className="w-16 h-16 mb-5 text-stone/25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-serif font-light text-2xl text-black mb-2">
                Количката е празна
              </p>
              <p className="font-sans font-light text-[13px] text-stone mb-8">
                Добавете продукти, за да продължите
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="px-8 min-h-[44px] bg-black text-paper font-cond font-bold text-[11px] tracking-[2.5px] uppercase transition-colors hover:bg-amber flex items-center"
              >
                Разгледай генераторите
              </Link>
            </div>
          ) : (
            /* Item list */
            <div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer (only when cart has items) ───────────────── */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-border p-4 sm:p-6">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-stone">
                Общо
              </span>
              <span className="font-serif text-2xl text-black">
                {total.toLocaleString('bg-BG')}{' '}
                <span className="font-cond text-[13px] text-stone">EUR</span>
              </span>
            </div>
            <p className="font-mono text-[9px] text-dust mb-5">
              Доставката се изчислява при поръчка
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full min-h-[52px] bg-black text-paper font-cond font-bold text-[12px] tracking-[2.5px] uppercase transition-colors hover:bg-amber flex items-center justify-center"
              >
                Към поръчката
              </Link>
              <button
                onClick={closeCart}
                className="w-full min-h-[44px] font-cond font-bold text-[11px] tracking-[2px] uppercase text-stone hover:text-black transition-colors"
              >
                Продължи пазаруването
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
