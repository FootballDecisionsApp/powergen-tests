import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await getLocale()
  return buildPageMetadata({
    locale,
    path: '/about',
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  })
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const tb = await getTranslations('breadcrumbs')
  const locale = await getLocale()

  const industries = [
    t('industry1'), t('industry2'), t('industry3'), t('industry4'),
    t('industry5'), t('industry6'), t('industry7'), t('industry8'),
  ]

  const stats = [
    { num: t('stat1Num'), label: t('stat1Label') },
    { num: t('stat2Num'), label: t('stat2Label') },
  ]

  return (
    <main className="pt-[72px]">

      {/* ── HERO ── */}
      <section className="relative bg-navy-dk overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative px-4 sm:px-8 lg:px-16 py-20 sm:py-24 max-w-screen-xl mx-auto">
          <Breadcrumbs
            locale={locale}
            label={tb('label')}
            className="mb-6"
            items={[{ label: tb('home'), href: '/' }, { label: tb('about') }]}
          />
          <p className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-[52px] sm:text-[72px] lg:text-[88px] leading-[0.9] text-white mb-8">
            {t('heading1')}<br />
            <span className="text-amber">{t('headingAccent')}</span><br />
            {t('heading2')}
          </h1>
          <p className="font-sans font-light text-[15px] text-white/45 max-w-[520px] leading-relaxed">
            {t('introBody')}
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-navy border-y border-amber/[0.1]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 divide-x divide-amber/[0.1] max-w-lg mx-auto">
            {stats.map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center py-10 px-6 text-center">
                <span className="font-display text-[44px] text-amber leading-none mb-1">{num}</span>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY ── */}
      <section className="bg-cream py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
                <span className="w-7 h-px bg-amber shrink-0" />
                {t('companyEyebrow')}
              </p>
              <h2 className="font-display text-[44px] sm:text-[56px] leading-[0.93] text-navy">
                {t('companyHeading1')}<br />
                <span className="text-amber">{t('companyHeadingAccent')}</span>
              </h2>
              <p className="mt-8 border-l-2 border-amber pl-5 font-sans font-light text-[15px] text-stone leading-relaxed">
                {t('companyLead')}
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-5">
              <p className="font-sans font-light text-[14px] text-stone leading-relaxed">{t('companyBody1')}</p>
              <p className="font-sans font-light text-[14px] text-stone leading-relaxed">{t('companyBody2')}</p>
              <p className="font-sans font-light text-[14px] text-stone leading-relaxed">{t('companyBody3')}</p>
            </div>
          </div>

          {/* Flagship product */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 bg-navy-dk">
            <div className="lg:col-span-8 p-8 sm:p-12">
              <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
                <span className="w-7 h-px bg-amber shrink-0" />
                {t('flagshipEyebrow')}
              </p>
              <h3 className="font-display text-[30px] sm:text-[38px] leading-[1.05] text-white mb-4 max-w-[560px]">
                {t('flagshipTitle')}
              </h3>
              <p className="font-sans font-light text-[14px] text-white/50 leading-relaxed max-w-[560px]">
                {t('flagshipBody')}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-center p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
              <span className="font-display text-[40px] sm:text-[48px] leading-none text-amber mb-2">
                {t('flagshipBadge')}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35">
                {t('flagshipBadgeLabel')}
              </span>
            </div>
          </div>

          {/* Closing statement */}
          <div className="mt-16 pt-10 border-t border-smoke flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="font-display text-[26px] sm:text-[32px] leading-[1.15] text-navy max-w-[640px]">
              {t('companyGoal')}
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber shrink-0 sm:text-right sm:max-w-[240px] leading-relaxed">
              {t('companyCertified')}
            </p>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bg-navy py-16 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 mb-6">
            {t('industriesLabel')}
          </p>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 border border-white/10 font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 hover:border-amber/40 hover:text-amber/70 transition-all duration-150 cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amber px-4 sm:px-8 lg:px-16 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
        <h2 className="font-display text-[36px] sm:text-[48px] leading-[0.93] text-navy-dk max-w-[500px]">
          {t('ctaHeading')}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Link
            href="/products"
            className="flex items-center justify-center px-8 py-4 bg-navy-dk text-white font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy hover:-translate-y-0.5 min-h-[52px]"
          >
            {t('ctaProducts')}
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center px-8 py-4 border border-navy-dk text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy-dk hover:text-white min-h-[52px]"
          >
            {t('ctaContact')}
          </Link>
        </div>
      </section>

    </main>
  )
}
