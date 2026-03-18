'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { CartItem } from '@/components/cart/CartItem'

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const total = getTotalPrice()
  const itemCount = getTotalItems()

  // ── Empty state ───────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center py-24 text-center">
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
          <p className="font-serif font-light text-3xl text-black mb-2">
            Количката е празна
          </p>
          <p className="font-sans font-light text-[14px] text-stone mb-8">
            Добавете продукти, за да продължите
          </p>
          <Link
            href="/products"
            className="px-8 min-h-[52px] bg-black text-paper font-cond font-bold text-[12px] tracking-[2.5px] uppercase transition-colors hover:bg-amber flex items-center"
          >
            Разгледай генераторите
          </Link>
        </div>
      </div>
    )
  }

  // ── Cart with items ────────────────────────────────────────────────────────
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="font-mono text-[9px] tracking-[0.2em] uppercase text-dust hover:text-stone transition-colors">Начало</Link>
        <span className="text-dust/50 font-mono text-[9px]">/</span>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone">Количка</span>
      </nav>

      {/* Page heading */}
      <h1 className="font-serif font-light text-3xl sm:text-4xl text-black mb-8 leading-tight">
        Количка
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">

        {/* ── Left: item list ─────────────────────────────────── */}
        <div>
          <div className="border-t border-border">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[1.5px] uppercase text-dust hover:text-stone transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Продължи пазаруването
            </Link>
          </div>
        </div>

        {/* ── Right: order summary ────────────────────────────── */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-paper border border-border p-5 sm:p-6">
            <h2 className="font-cond font-bold text-[13px] tracking-[2px] uppercase text-black mb-5 pb-4 border-b border-border">
              Обобщение
            </h2>

            {/* Item count */}
            <div className="flex items-center justify-between py-3 border-b border-border-light">
              <span className="font-mono text-[10px] tracking-[1px] uppercase text-stone">
                Продукти
              </span>
              <span className="font-mono text-[12px] text-black">
                {itemCount}
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between py-3 border-b border-border-light">
              <span className="font-mono text-[10px] tracking-[1px] uppercase text-stone">
                Подтотал
              </span>
              <span className="font-mono text-[12px] text-black">
                {total.toLocaleString('bg-BG')} EUR
              </span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between py-3 border-b border-border-light">
              <span className="font-mono text-[10px] tracking-[1px] uppercase text-stone">
                Доставка
              </span>
              <span className="font-mono text-[11px] text-dust">
                При поръчка
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 pb-1">
              <span className="font-mono text-[10px] tracking-[1px] uppercase text-black font-semibold">
                Общо
              </span>
              <span className="font-serif text-2xl text-black leading-none">
                {total.toLocaleString('bg-BG')}{' '}
                <span className="font-cond text-[13px] text-stone">EUR</span>
              </span>
            </div>
            <p className="font-mono text-[9px] text-dust mb-5">
              Доставката се изчислява при поръчка
            </p>

            <Link
              href="/checkout"
              className="flex items-center justify-center w-full min-h-[52px] bg-black text-paper font-cond font-bold text-[12px] tracking-[2.5px] uppercase transition-colors hover:bg-amber"
            >
              Към поръчката
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
