'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { CartItem } from './CartItem'

export function CartDrawer() {
  const { items, isCartOpen, closeCart, getTotalPrice, getTotalItems } = useCart()
  const total     = getTotalPrice()
  const itemCount = getTotalItems()

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  useEffect(() => {
    if (!isCartOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isCartOpen, closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Количка"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-navy flex flex-col border-l border-white/[0.08] transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/[0.08] flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/60">
              Количка
            </span>
            {itemCount > 0 && (
              <span className="w-5 h-5 bg-amber text-navy-dk font-mono text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Затвори количката"
            className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <svg className="w-12 h-12 mb-5 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="font-display text-[28px] text-white leading-none mb-2">
                КОЛИЧКАТА Е<br /><span className="text-amber">ПРАЗНА</span>
              </p>
              <p className="font-sans font-light text-[13px] text-white/30 mb-8">
                Добавете продукти, за да продължите
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="flex items-center justify-center min-h-[44px] px-7 bg-amber text-navy-dk font-mono font-medium text-[10px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light"
              >
                Разгледай каталога →
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/[0.08] p-4 sm:p-6">
            <div className="flex items-end justify-between mb-1">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">Общо</span>
              <div className="text-right">
                <span className="font-display text-[30px] text-amber leading-none">{total.toLocaleString('bg-BG')}</span>
                <span className="font-mono text-[9px] text-white/25 ml-1">EUR</span>
              </div>
            </div>
            <p className="font-mono text-[9px] text-white/20 mb-5">Доставката се изчислява при поръчка</p>

            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full min-h-[52px] bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light flex items-center justify-center"
              >
                Към поръчката →
              </Link>
              <button
                onClick={closeCart}
                className="w-full min-h-[44px] font-mono text-[10px] tracking-[0.15em] uppercase text-white/20 hover:text-white/45 transition-colors"
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
