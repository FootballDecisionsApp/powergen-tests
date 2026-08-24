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
    path: '/terms',
    title: t('termsTitle'),
    description: t('termsDescription'),
  })
}

export default async function TermsOfServicePage() {
  const t = await getTranslations('termsOfService')
  const tb = await getTranslations('breadcrumbs')
  const locale = await getLocale()

  const sections = [
    { heading: t('s1Heading'), body: t('s1Body') },
    { heading: t('s2Heading'), body: t('s2Body') },
    { heading: t('s3Heading'), body: t('s3Body') },
    { heading: t('s4Heading'), body: t('s4Body') },
    { heading: t('s5Heading'), body: t('s5Body') },
    { heading: t('s6Heading'), body: t('s6Body') },
    { heading: t('s7Heading'), body: t('s7Body') },
    { heading: t('s8Heading'), body: t('s8Body') },
    { heading: t('s9Heading'), body: t('s9Body') },
    { heading: t('s10Heading'), body: t('s10Body') },
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
          <Breadcrumbs
            locale={locale}
            label={tb('label')}
            className="mb-6"
            items={[{ label: tb('home'), href: '/' }, { label: tb('terms') }]}
          />
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

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-[22px] sm:text-[26px] text-white mb-3">
                {s.heading}
              </h2>
              <p className="font-sans font-light text-[14px] leading-relaxed text-white/50 whitespace-pre-line">
                {s.body}
              </p>
            </div>
          ))}
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
