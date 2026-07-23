import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('cookiesTitle'),
    description: t('cookiesDescription'),
  }
}

export default async function CookiePolicyPage() {
  const t = await getTranslations('cookiePolicy')

  const rows = [
    { name: t('row1Name'), type: t('row1Type'), purpose: t('row1Purpose'), duration: t('row1Duration') },
    { name: t('row2Name'), type: t('row2Type'), purpose: t('row2Purpose'), duration: t('row2Duration') },
    { name: t('row3Name'), type: t('row3Type'), purpose: t('row3Purpose'), duration: t('row3Duration') },
    { name: t('row4Name'), type: t('row4Type'), purpose: t('row4Purpose'), duration: t('row4Duration') },
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
        <div className="relative max-w-screen-md mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-[40px] sm:text-[56px] leading-[0.95] text-white">
            {t('heading1')} <span className="text-amber">{t('headingAccent')}</span>
          </h1>
          <p className="mt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-white/25">
            {t('lastUpdated')}
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-screen-md mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <p className="font-sans font-light text-[15px] leading-relaxed text-white/60 mb-12 pb-10 border-b border-white/[0.06]">
          {t('intro')}
        </p>

        <div className="mb-12">
          <h2 className="font-display text-[22px] sm:text-[26px] text-white mb-3">
            {t('whatHeading')}
          </h2>
          <p className="font-sans font-light text-[14px] leading-relaxed text-white/50">
            {t('whatBody')}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="font-display text-[22px] sm:text-[26px] text-white mb-5">
            {t('tableHeading')}
          </h2>

          {/* Mobile: stacked cards */}
          <div className="sm:hidden flex flex-col gap-3">
            {rows.map((r) => (
              <div key={r.name} className="border border-white/[0.08] bg-navy p-4">
                <p className="font-mono text-[11px] text-amber mb-1">{r.name}</p>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30 mb-2">{r.type}</p>
                <p className="font-sans font-light text-[13px] text-white/55 leading-relaxed mb-2">{r.purpose}</p>
                <p className="font-mono text-[9px] text-white/25">{r.duration}</p>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block overflow-hidden border border-white/[0.06]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="py-3 px-4 text-left font-mono text-[9px] tracking-[0.2em] uppercase text-amber/70">{t('colName')}</th>
                  <th className="py-3 px-4 text-left font-mono text-[9px] tracking-[0.2em] uppercase text-amber/70">{t('colType')}</th>
                  <th className="py-3 px-4 text-left font-mono text-[9px] tracking-[0.2em] uppercase text-amber/70">{t('colPurpose')}</th>
                  <th className="py-3 px-4 text-left font-mono text-[9px] tracking-[0.2em] uppercase text-amber/70">{t('colDuration')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono text-[11px] text-white/70 align-top whitespace-nowrap">{r.name}</td>
                    <td className="py-4 px-4 font-mono text-[9px] tracking-[0.1em] uppercase text-white/35 align-top whitespace-nowrap">{r.type}</td>
                    <td className="py-4 px-4 font-sans font-light text-[13px] text-white/55 leading-relaxed align-top">{r.purpose}</td>
                    <td className="py-4 px-4 font-mono text-[10px] text-white/30 align-top whitespace-nowrap">{r.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-display text-[22px] sm:text-[26px] text-white mb-3">
            {t('manageHeading')}
          </h2>
          <p className="font-sans font-light text-[14px] leading-relaxed text-white/50">
            {t('manageBody')}
          </p>
        </div>

        <div>
          <h2 className="font-display text-[22px] sm:text-[26px] text-white mb-3">
            {t('changesHeading')}
          </h2>
          <p className="font-sans font-light text-[14px] leading-relaxed text-white/50">
            {t('changesBody')}
          </p>
        </div>

        <Link
          href="/privacy"
          className="mt-14 inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-amber hover:text-amber-light transition-colors duration-200"
        >
          {t('privacyLinkText')}
        </Link>
      </section>

    </main>
  )
}
