import Link from 'next/link'

const stats = [
  { num: '500+', label: 'Успешни инсталации' },
  { num: '20г',  label: 'Опит в индустрията' },
  { num: '98%',  label: 'Удовлетвореност на клиентите' },
  { num: '24/7', label: 'Техническа поддръжка' },
]

export function TrustBar() {
  return (
    <>
      {/* ── ABOUT / STATS section ── */}
      <section className="bg-navy-dk py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div className="relative">
            {/* Decorative large number */}
            <span
              className="absolute -top-8 -left-2 font-display text-[160px] leading-none text-amber/[0.05] select-none pointer-events-none"
              aria-hidden="true"
            >
              20
            </span>
            <div className="relative">
              <p className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
                <span className="w-7 h-px bg-amber shrink-0" />
                Нашият опит
              </p>
              <h2 className="font-display text-[48px] sm:text-[60px] lg:text-[72px] leading-[0.93] text-white">
                РЕЗУЛТАТИ<br />
                <span className="text-amber">ГОВОРЯТ</span>
              </h2>
              <p className="mt-6 font-sans font-light text-[15px] leading-relaxed text-white/40 max-w-[380px]">
                Над две десетилетия осигуряваме непрекъснато захранване на бизнеси, болници и производствени мощности из цялата страна.
              </p>
              <div className="mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5"
                >
                  Разгледай каталога →
                </Link>
              </div>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="flex flex-col gap-0.5">
            {stats.map(({ num, label }) => (
              <div
                key={label}
                className="flex items-center justify-between px-8 py-6 border border-amber/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-amber/25 hover:bg-white/[0.04] cursor-default"
              >
                <span className="font-display text-[48px] text-amber leading-none tracking-[0.02em]">
                  {num}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 text-right max-w-[140px] leading-relaxed">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── GOLD CTA BANNER ── */}
      <section className="bg-amber px-4 sm:px-8 lg:px-16 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
        <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[60px] leading-[0.93] text-navy-dk max-w-[580px]">
          НУЖЕН ВИ Е<br />НАДЕЖДЕН ГЕНЕРАТОР?
        </h2>
        <Link
          href="/products"
          className="flex items-center justify-center px-10 py-5 bg-navy-dk text-white font-mono font-medium text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-200 hover:bg-navy hover:-translate-y-0.5"
        >
          Виж всички продукти →
        </Link>
      </section>
    </>
  )
}
