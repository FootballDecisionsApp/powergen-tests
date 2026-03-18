'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams }     from 'next/navigation'
import Link                    from 'next/link'
import { useCart }             from '@/lib/store/cart'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId      = searchParams.get('orderId') ?? ''
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shortId = orderId.length > 8 ? `${orderId.slice(0, 8).toUpperCase()}` : orderId.toUpperCase()

  const nextSteps = [
    { num: '01', title: 'Имейл потвърждение', body: 'Ще получите потвърждение на посочения имейл адрес.' },
    { num: '02', title: 'Свързваме се с вас', body: 'Нашият екип ще се свърже с вас в рамките на 24 часа.' },
    { num: '03', title: 'Доставка и монтаж', body: 'Уточняваме дата и условия за доставка и инсталация.' },
  ]

  return (
    <main className="min-h-screen bg-navy-dk pt-[72px]">

      {/* ── HERO ── */}
      <section className="relative bg-navy-dk overflow-hidden border-b border-amber/[0.08]">
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
            width: '500px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(212,160,23,0.07) 0%, transparent 70%)',
            top: 0, left: '50%', transform: 'translateX(-50%)',
          }}
        />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 flex flex-col items-center text-center">

          {/* Animated checkmark */}
          <div className="mb-8">
            <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <circle
                cx="40" cy="40" r="34"
                stroke="rgba(212,160,23,0.25)"
                strokeWidth="1"
              />
              <circle
                className="animate-draw-circle"
                cx="40" cy="40" r="34"
                stroke="#D4A017"
                strokeWidth="2"
                pathLength="1"
                strokeLinecap="round"
              />
              <path
                className="animate-draw-check"
                d="M22 41 L35 54 L58 27"
                stroke="#D4A017"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
              />
            </svg>
          </div>

          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber animate-fade-up">
            <span className="w-7 h-px bg-amber shrink-0" />
            Поръчка приета
            <span className="w-7 h-px bg-amber shrink-0" />
          </p>

          <h1
            className="font-display text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.92] text-white mb-4 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            БЛАГОДАРИМ <span className="text-amber">ВИ!</span>
          </h1>

          <p
            className="font-sans font-light text-[14px] sm:text-[15px] text-white/45 max-w-[420px] leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Вашата поръчка е получена успешно. Ще се свържем с вас в рамките на работния ден.
          </p>

          {/* Order ID */}
          {orderId && (
            <div
              className="mt-8 px-6 py-4 border border-amber/20 bg-amber/[0.04] animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1.5">
                Номер на поръчка
              </p>
              <p className="font-display text-[28px] text-amber tracking-[0.1em] leading-none">
                #{shortId}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
        <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
          <span className="w-7 h-px bg-amber shrink-0" />
          Следващи стъпки
        </p>
        <h2 className="font-display text-[36px] sm:text-[48px] leading-[0.93] text-white mb-12">
          КАКВО <span className="text-amber">СЛЕДВА</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04]">
          {nextSteps.map(({ num, title, body }) => (
            <div key={num} className="bg-navy p-8 group">
              <p className="font-display text-[48px] text-amber/20 leading-none mb-6 group-hover:text-amber/30 transition-colors duration-200">
                {num}
              </p>
              <h3 className="font-display text-[22px] text-white mb-3">{title}</h3>
              <p className="font-sans font-light text-[13px] text-white/40 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amber px-4 sm:px-8 lg:px-16 py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <h2 className="font-display text-[32px] sm:text-[44px] leading-[0.93] text-navy-dk">
          РАЗГЛЕДАЙТЕ<br />
          <span className="text-navy/60">ЦЕЛИЯ КАТАЛОГ</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/products"
            className="flex items-center justify-center min-h-[52px] px-8 bg-navy-dk text-white font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy"
          >
            Към каталога →
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center min-h-[52px] px-8 border border-navy-dk text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy-dk hover:text-white"
          >
            Начало
          </Link>
        </div>
      </section>

    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy-dk pt-[72px] flex items-center justify-center">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber/40">Зареждане…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
