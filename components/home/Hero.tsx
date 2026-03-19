'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export function Hero() {
  const t = useTranslations('hero')
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const ring3Ref = useRef<HTMLDivElement>(null)

  // Mouse parallax for rings
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 14
      const yPct = (e.clientY / window.innerHeight - 0.5) * 14
        ;[ring1Ref, ring2Ref, ring3Ref].forEach((ref, i) => {
          if (!ref.current) return
          const factor = (i + 1) * 0.4
          ref.current.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`
        })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-[100svh] grid grid-cols-1 lg:grid-cols-2 bg-navy-dk overflow-hidden pt-[72px]">

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gold glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)',
          top: '50%', left: '30%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Diagonal gold slash */}
      <div
        className="absolute top-0 right-[38%] pointer-events-none h-full"
        style={{
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.35) 30%, rgba(212,160,23,0.35) 70%, transparent)',
          transform: 'skewX(-6deg)',
        }}
      />

      {/* ── LEFT COLUMN ── */}
      <div className="relative z-10 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-14 lg:pt-10 lg:pb-20 min-w-0">

        {/* Eyebrow */}
        <p
          className="flex items-center gap-3 mb-5 font-mono text-[9px] tracking-[0.25em] uppercase text-amber animate-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="w-8 h-px bg-amber shrink-0" />
          <span className="whitespace-nowrap">{t('eyebrow')}</span>
        </p>

        {/* H1 — Bebas Neue */}
        <h1
          className="font-display leading-[0.92] tracking-[-0.01em] mb-7 animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <span className="block text-[56px] sm:text-[72px] lg:text-[68px] xl:text-[88px] text-white uppercase">{t('line1')}</span>
          <span className="block text-[56px] sm:text-[72px] lg:text-[68px] xl:text-[88px] text-amber  uppercase">{t('line2')}</span>
          <span className="block text-[56px] sm:text-[72px] lg:text-[68px] xl:text-[88px] text-white uppercase">{t('line3')}</span>
          <span className="block text-[56px] sm:text-[72px] lg:text-[68px] xl:text-[88px] text-white uppercase">{t('line4')}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans font-light text-[13px] sm:text-[14px] text-white/50 max-w-[380px] mb-8 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          {t('subtitle')}
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            href="/products"
            className="flex items-center justify-center px-6 lg:px-7 xl:px-8 py-4 bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase min-h-[52px] transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(212,160,23,0.25)]"
          >
            {t('ctaCatalog')}
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 lg:px-7 xl:px-8 py-4 border-b border-white/20 text-white/55 font-mono text-[11px] tracking-[0.18em] uppercase min-h-[52px] transition-all duration-200 hover:text-white hover:border-white/50"
          >
            {t('ctaQuote')}
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="flex items-stretch border-t border-amber/[0.12] animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            { num: t('stat1Num'), label: t('stat1Label') },
            { num: t('stat2Num'), label: t('stat2Label') },
            { num: '5–2000', label: t('stat3Label') },
          ].map((stat, i) => (
            <div key={stat.label} className={`flex flex-col py-5 pr-6 lg:pr-7 xl:pr-8 ${i > 0 ? 'pl-6 lg:pl-7 xl:pl-8 border-l border-amber/[0.12]' : ''}`}>
              <span className="font-display text-[34px] text-amber leading-none tracking-[0.02em] mb-1">
                {stat.num}
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE RINGS — background decoration behind text ── */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="relative w-[320px] h-[320px] opacity-[0.07] translate-x-1/4">
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(212,160,23,1)', animation: 'spin 40s linear infinite' }}
          >
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber -top-[3px] left-1/2 -translate-x-1/2" />
          </div>
          <div
            className="absolute rounded-full"
            style={{ top: '10%', left: '10%', right: '10%', bottom: '10%', border: '1px solid rgba(212,160,23,1)', animation: 'spin 28s linear infinite reverse' }}
          >
            <div className="absolute w-[5px] h-[5px] rounded-full bg-amber -top-[2.5px] left-1/2 -translate-x-1/2" />
          </div>
          <div
            className="absolute rounded-full"
            style={{ top: '22%', left: '22%', right: '22%', bottom: '22%', border: '2px solid rgba(212,160,23,1)', animation: 'spin 20s linear infinite' }}
          >
            <div className="absolute w-1 h-1 rounded-full bg-amber -top-[2px] left-1/2 -translate-x-1/2" />
          </div>
          <div
            className="absolute"
            style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '52px', height: '60px',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: '#D4A017',
            }}
          />
        </div>
      </div>

      {/* ── RIGHT COLUMN — animated rings (desktop only) ── */}
      <div className="hidden lg:flex items-center justify-center relative overflow-hidden">

        {/* Scale container: 72% at lg, full size at xl */}
        <div className="absolute inset-0 flex items-center justify-center scale-[0.72] xl:scale-100 origin-center">

          {/* ── RING 1: Outer ── */}
          <div ref={ring1Ref} className="absolute transition-transform duration-[80ms] ease-out">
            <div
              className="w-[340px] h-[340px] rounded-full relative"
              style={{ border: '1px solid rgba(212,160,23,0.18)', animation: 'spin 50s linear infinite' }}
            >
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber/70 -top-[3px] left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* ── RING 2: Middle ── */}
          <div ref={ring2Ref} className="absolute transition-transform duration-[80ms] ease-out">
            <div
              className="w-[255px] h-[255px] rounded-full relative"
              style={{ border: '1px solid rgba(212,160,23,0.2)', animation: 'spin 28s linear infinite reverse' }}
            >
              <div className="absolute w-[5px] h-[5px] rounded-full bg-amber/70 -top-[2.5px] left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* ── RING 3: Inner ── */}
          <div ref={ring3Ref} className="absolute transition-transform duration-[80ms] ease-out">
            <div
              className="w-[172px] h-[172px] rounded-full relative"
              style={{ border: '2px solid rgba(212,160,23,0.46)', animation: 'spin 20s linear infinite' }}
            >
              <div className="absolute w-1 h-1 rounded-full bg-amber -top-[2px] left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* ── CENTER: Shield with bolt ── */}
          <div className="absolute z-10">
            <svg viewBox="0 0 76 88" className="w-[76px] h-[88px]" fill="none">
              {/* Shield body — amber fill */}
              <path d="M38 4 L72 16 L72 50 C72 68 56 80 38 86 C20 80 4 68 4 50 L4 16 Z" fill="#D4A017" />
              {/* Bolt — navy */}
              <path d="M41 30 L33 48 L40 48 L35 62 L48 42 L41 42 Z" fill="#1B2D4A" />
            </svg>
          </div>

          {/* Generator wireframe */}
          <svg
            viewBox="0 0 300 200"
            className="absolute pointer-events-none"
            style={{ width: '260px', opacity: 0.1 }}
          >
            <rect x="40" y="80" width="220" height="80" rx="4" stroke="#D4A017" strokeWidth="1.5" fill="none" />
            <rect x="60" y="95" width="50" height="50" rx="2" stroke="#D4A017" strokeWidth="1" fill="none" />
            <circle cx="160" cy="120" r="22" stroke="#D4A017" strokeWidth="1.5" fill="none" />
            <circle cx="160" cy="120" r="10" stroke="#D4A017" strokeWidth="1" fill="none" />
            <rect x="195" y="100" width="40" height="40" rx="2" stroke="#D4A017" strokeWidth="1" fill="none" />
            <line x1="40" y1="110" x2="60" y2="110" stroke="#D4A017" strokeWidth="1" />
            <line x1="110" y1="120" x2="138" y2="120" stroke="#D4A017" strokeWidth="1" />
            <line x1="182" y1="120" x2="195" y2="120" stroke="#D4A017" strokeWidth="1" />
            <rect x="80" y="60" width="30" height="20" stroke="#D4A017" strokeWidth="1" fill="none" />
            <rect x="180" y="55" width="40" height="25" stroke="#D4A017" strokeWidth="1" fill="none" />
            <line x1="95" y1="60" x2="95" y2="80" stroke="#D4A017" strokeWidth="1" />
            <line x1="200" y1="55" x2="200" y2="80" stroke="#D4A017" strokeWidth="1" />
          </svg>

        </div>{/* end scale container */}

        {/* Data labels — xl only, bottom-right of right column */}
        <div className="hidden xl:flex absolute bottom-12 right-10 flex-col gap-4">
          {[
            { key: t('specProtection'), val: 'CE · ISO 9001' },
            { key: t('specPower'), val: '5–2000 kW' },
            { key: t('specWarranty'), val: t('specWarrantyVal') },
          ].map(({ key, val }) => (
            <div key={key}>
              <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/20">{key}</p>
              <p className="font-display text-[18px] text-amber tracking-[0.05em] leading-none mt-0.5">{val}</p>
            </div>
          ))}
        </div>

        {/* Vertical badge — xl only, right edge */}
        <p
          className="hidden xl:block absolute top-1/2 right-3 font-mono text-[8px] tracking-[0.35em] uppercase text-amber/20 whitespace-nowrap"
          style={{ transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}
        >
          {t('badgeSecurity')}
        </p>
      </div>

      {/* Scroll hint — only on lg+ where the left column has room below the stats */}
      <div
        className="hidden lg:flex absolute bottom-8 left-12 xl:left-16 items-center gap-3 animate-fade-up z-10"
        style={{ animationDelay: '1.5s' }}
      >
        <div
          className="w-px h-12 animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, transparent, #D4A017)' }}
        />
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber/40 [writing-mode:vertical-rl]">{t('scrollHint')}</p>
      </div>

    </section>
  )
}
