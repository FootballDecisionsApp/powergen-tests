'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { CartItem } from '@/components/cart/CartItem'

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const total     = getTotalPrice()
  const itemCount = getTotalItems()
  const freeShip  = total > 5000

  // ── Empty state ──────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-navy-dk pt-[72px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-4">
          <svg className="w-14 h-14 mb-6 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p className="font-display text-[36px] sm:text-[48px] text-white leading-none mb-3">
            КОЛИЧКАТА Е<br /><span className="text-amber">ПРАЗНА</span>
          </p>
          <p className="font-sans font-light text-[13px] text-white/35 mb-8">
            Добавете продукти, за да продължите
          </p>
          <Link
            href="/products"
            className="flex items-center justify-center min-h-[52px] px-8 bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5"
          >
            Разгледай каталога →
          </Link>
        </div>
      </main>
    )
  }

  // ── Cart with items ──────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-navy-dk pt-[72px]">

      {/* ── HERO STRIP ── */}
      <div className="relative bg-navy-dk border-b border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-10">
          <h1 className="font-display text-[40px] sm:text-[52px] leading-[0.92] text-white">
            КОЛИЧКА <span className="text-amber">({itemCount})</span>
          </h1>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">

          {/* ── LEFT: items ── */}
          <div>
            <div className="flex flex-col gap-0 border-t border-white/[0.06]">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-6 font-mono text-[9px] tracking-[0.15em] uppercase text-white/20 hover:text-white/45 transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Продължи пазаруването
            </Link>
          </div>

          {/* ── RIGHT: summary ── */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-navy border border-white/[0.08] p-5 sm:p-6">

              <h2 className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mb-4 pb-4 border-b border-white/[0.06]">
                Обобщение
              </h2>

              <div className="flex items-center justify-between py-2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30">Продукти</span>
                <span className="font-mono text-[11px] text-white/60">{itemCount} бр.</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30">Подтотал</span>
                <span className="font-mono text-[11px] text-white/60">{total.toLocaleString('bg-BG')} EUR</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.06] pb-4 mb-4">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30">Доставка</span>
                <span className={`font-mono text-[10px] ${freeShip ? 'text-amber' : 'text-white/40'}`}>
                  {freeShip ? 'Безплатно' : 'По договаряне'}
                </span>
              </div>

              <div className="flex items-end justify-between mb-5">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40">Общо</span>
                <div className="text-right">
                  <p className="font-display text-[36px] text-amber leading-none">{total.toLocaleString('bg-BG')}</p>
                  <p className="font-mono text-[9px] text-white/25 mt-0.5">EUR с ДДС</p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center w-full min-h-[52px] bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5"
              >
                Към поръчката →
              </Link>
            </div>
          </div>

        </div>
      </div>

    </main>
  )
}
