import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'

export async function TrustBar() {
  const t = await getTranslations('trustBar')

  const stats = [
    { num: t('stat1Num'), label: t('stat1Label') },
    { num: t('stat2Num'), label: t('stat2Label') },
    { num: t('stat3Num'), label: t('stat3Label') },
    { num: t('stat4Num'), label: t('stat4Label') },
  ]

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
                {t('eyebrow')}
              </p>
              <h2 className="font-display text-[48px] sm:text-[60px] lg:text-[72px] leading-[0.93] text-white">
                {t('heading1')}<br />
                <span className="text-amber">{t('headingAccent')}</span>
              </h2>
              <p className="mt-6 font-sans font-light text-[15px] leading-relaxed text-white/40 max-w-[380px]">
                {t('body')}
              </p>
              <div className="mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5"
                >
                  {t('cta')}
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
          {t('ctaBannerHeading1')}<br />{t('ctaBannerHeadingAccent')}
        </h2>
        <Link
          href="/products"
          className="flex items-center justify-center px-10 py-5 bg-navy-dk text-white font-mono font-medium text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-200 hover:bg-navy hover:-translate-y-0.5"
        >
          {t('ctaBannerBtn')}
        </Link>
      </section>
    </>
  )
}
