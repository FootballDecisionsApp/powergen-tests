import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')

  const milestones = [
    { year: '2003', text: t('milestone2003') },
    { year: '2007', text: t('milestone2007') },
    { year: '2012', text: t('milestone2012') },
    { year: '2016', text: t('milestone2016') },
    { year: '2020', text: t('milestone2020') },
    { year: '2024', text: t('milestone2024') },
  ]

  const team = [
    { name: t('team1Name'), role: t('team1Role'), exp: t('team1Exp') },
    { name: t('team2Name'), role: t('team2Role'), exp: t('team2Exp') },
    { name: t('team3Name'), role: t('team3Role'), exp: t('team3Exp') },
    { name: t('team4Name'), role: t('team4Role'), exp: t('team4Exp') },
  ]

  const industries = [
    t('industry1'), t('industry2'), t('industry3'), t('industry4'),
    t('industry5'), t('industry6'), t('industry7'), t('industry8'),
  ]

  const valueItems = [
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12 text-amber" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M24 4 L44 14 L44 34 L24 44 L4 34 L4 14 Z"/>
          <path d="M16 24 L21 29 L32 18"/>
        </svg>
      ),
      title: t('value1Title'),
      body: t('value1Body'),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12 text-amber" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="24" cy="24" r="18"/>
          <path d="M24 12 L24 24 L32 30"/>
        </svg>
      ),
      title: t('value2Title'),
      body: t('value2Body'),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12 text-amber" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M8 24 C8 15 15 8 24 8 C33 8 40 15 40 24 C40 33 33 40 24 40"/>
          <path d="M4 28 L8 24 L12 28"/>
          <circle cx="18" cy="38" r="5"/>
        </svg>
      ),
      title: t('value3Title'),
      body: t('value3Body'),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12 text-amber" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="6" y="18" width="36" height="24" rx="2"/>
          <path d="M16 18 L16 12 C16 8 20 5 24 5 C28 5 32 8 32 12 L32 18"/>
        </svg>
      ),
      title: t('value4Title'),
      body: t('value4Body'),
    },
  ]

  const stats = [
    { num: t('stat1Num'), label: t('stat1Label') },
    { num: t('stat2Num'), label: t('stat2Label') },
    { num: t('stat3Num'), label: t('stat3Label') },
    { num: t('stat4Num'), label: t('stat4Label') },
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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-2 lg:grid-cols-4 divide-x divide-amber/[0.1]">
          {stats.map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center py-10 px-6 text-center">
              <span className="font-display text-[44px] text-amber leading-none mb-1">{num}</span>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/35">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-cream py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('valuesEyebrow')}
          </p>
          <h2 className="font-display text-[44px] sm:text-[56px] leading-[0.93] text-navy mb-14">
            {t('valuesHeading')} <span className="text-amber">{t('valuesSubHeading1')}</span><br />{t('valuesSubHeading2')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-smoke">
            {valueItems.map((v) => (
              <div key={v.title} className="bg-paper p-8 group hover:bg-cream transition-colors duration-200 cursor-default">
                <div className="mb-6">{v.icon}</div>
                <h3 className="font-display text-[22px] text-navy mb-3">{v.title}</h3>
                <p className="font-sans font-light text-[13px] text-stone leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-navy-dk py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('timelineEyebrow')}
          </p>
          <h2 className="font-display text-[44px] sm:text-[56px] leading-[0.93] text-white mb-16">
            {t('timelineHeading1')} <span className="text-amber">{t('timelineHeadingAccent')}</span>
          </h2>
          <div className="flex flex-col gap-0">
            {milestones.map(({ year, text }) => (
              <div
                key={year}
                className="flex gap-8 sm:gap-12 py-7 border-t border-white/[0.06] group hover:bg-white/[0.02] transition-colors duration-200 px-4 -mx-4"
              >
                <span className="font-display text-[32px] text-amber leading-none w-20 shrink-0 group-hover:text-amber-light transition-colors">
                  {year}
                </span>
                <p className="font-sans font-light text-[14px] text-white/50 leading-relaxed self-center">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-cream py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('teamEyebrow')}
          </p>
          <h2 className="font-display text-[44px] sm:text-[56px] leading-[0.93] text-navy mb-14">
            {t('teamHeading1')} <span className="text-amber">{t('teamHeadingAccent')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-smoke">
            {team.map(({ name, role, exp }) => (
              <div key={name} className="bg-paper p-8 group hover:bg-cream transition-colors duration-200 cursor-default">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-navy-dk mb-6 flex items-center justify-center">
                  <span className="font-display text-[28px] text-amber leading-none">
                    {name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-[20px] text-navy mb-1">{name}</h3>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber mb-2">{role}</p>
                <p className="font-sans font-light text-[12px] text-ash">{exp}</p>
              </div>
            ))}
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
