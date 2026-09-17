import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await getLocale()
  return buildPageMetadata({
    locale,
    path: '/project',
    title: t('projectTitle'),
    description: t('projectDescription'),
  })
}

/**
 * Mandatory EU funding disclosure for the grant that financed this store
 * (Programme "Competitiveness and Innovation in Enterprises" 2021-2027).
 * The body text is the official project wording — translate it, don't reword it.
 */
export default async function ProjectPage() {
  const t = await getTranslations('project')
  const tb = await getTranslations('breadcrumbs')
  const locale = await getLocale()

  const facts = [
    { label: t('fact1Label'), value: t('fact1Value') },
    { label: t('fact2Label'), value: t('fact2Value') },
    { label: t('fact3Label'), value: t('fact3Value') },
    { label: t('fact4Label'), value: t('fact4Value') },
  ]

  const objectives = [t('objective1'), t('objective2')]

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
        <div className="relative max-w-screen-lg mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
          <Breadcrumbs
            locale={locale}
            label={tb('label')}
            className="mb-6"
            items={[{ label: tb('home'), href: '/' }, { label: tb('project') }]}
          />
          <p className="flex items-center gap-3 mb-8 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('eyebrow')}
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/35 mb-4">
            {t('kicker')}
          </p>
          <p className="font-mono text-[15px] sm:text-[18px] tracking-[0.12em] text-amber mb-7 break-words">
            {t('projectNumber')}
          </p>
          <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] text-white max-w-[820px]">
            {t('heading')}
          </h1>
        </div>
      </section>

      {/* ── PROJECT FACTS ── */}
      <section className="bg-navy border-y border-amber/[0.1]">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-8 lg:px-12 py-10">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 mb-7">
            {t('factsLabel')}
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-[9px] tracking-[0.25em] uppercase text-amber mb-2">
                  {label}
                </dt>
                <dd className="font-sans font-light text-[13px] leading-relaxed text-white/55">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FUNDING LOGOS ── */}
      {/* Both files carry a baked-in white background, so they need a light band. */}
      <section className="bg-paper border-b border-smoke px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            <Image
              src="/eu/playcube-logo-eu.png"
              alt={t('logoEuAlt')}
              width={186}
              height={170}
              className="h-16 sm:h-20 w-auto"
              unoptimized
              priority
            />
            <Image
              src="/eu/playcube-logo-program.png"
              alt={t('logoProgrammeAlt')}
              width={217}
              height={158}
              className="h-16 sm:h-20 w-auto"
              unoptimized
              priority
            />
          </div>
          <p className="font-sans font-light text-[13px] leading-relaxed text-stone max-w-[440px]">
            {t('logosCaption')}
          </p>
        </div>
      </section>

      {/* ── OFFICIAL PROJECT TEXT ── */}
      <section className="bg-cream py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-screen-md mx-auto">

          <p className="font-sans text-[16px] sm:text-[17px] leading-relaxed text-navy pb-8 mb-8 border-b border-smoke">
            {t('intro')}
          </p>

          <p className="font-sans font-light text-[14px] leading-relaxed text-stone">
            {t('body1')}
          </p>

          {/* The store itself is a project deliverable — call that out */}
          <div className="mt-12 border-l-2 border-amber bg-paper p-7 sm:p-8">
            <h2 className="font-display text-[24px] sm:text-[28px] text-navy mb-3">
              {t('storeHeading')}
            </h2>
            <p className="font-sans font-light text-[14px] leading-relaxed text-stone">
              {t('body2')}
            </p>
          </div>

          {/* Specific objectives */}
          <h2 className="mt-14 mb-7 font-display text-[24px] sm:text-[28px] text-navy">
            {t('objectivesHeading')}
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-smoke">
            {objectives.map((text, i) => (
              <li key={text} className="bg-paper p-7 sm:p-8">
                <span className="block font-display text-[40px] leading-none text-amber mb-4">
                  {i + 1}
                </span>
                <p className="font-sans font-light text-[13px] leading-relaxed text-stone">
                  {text}
                </p>
              </li>
            ))}
          </ol>

          {/* Regional impact */}
          <h2 className="mt-14 mb-4 font-display text-[24px] sm:text-[28px] text-navy">
            {t('regionHeading')}
          </h2>
          <p className="font-sans font-light text-[14px] leading-relaxed text-stone">
            {t('closing')}
          </p>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amber px-4 sm:px-8 lg:px-16 py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
        <h2 className="font-display text-[30px] sm:text-[40px] leading-[0.95] text-navy-dk max-w-[520px]">
          {t('ctaHeading')}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
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
