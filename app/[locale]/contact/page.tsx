import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
  }
}

export default async function ContactPage() {
  const t = await getTranslations('contact')

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
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
          <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-[52px] sm:text-[72px] lg:text-[88px] leading-[0.92] text-white">
            {t('heading1')}<br />
            <span className="text-amber">{t('headingAccent')}</span>
          </h1>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="max-w-screen-xl mx-auto mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT — contact info */}
          <div className="px-4 sm:px-8 lg:px-16 py-12 sm:py-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-center">

            {/* Contact cards */}
            <div className="flex flex-col gap-3">

              {/* Address */}
              <div className="group flex gap-5 p-5 border border-white/[0.08] hover:border-amber/30 transition-colors duration-200 bg-navy">
                <div className="mt-0.5 shrink-0 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 group-hover:border-amber/40 group-hover:text-amber transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber mb-2">{t('labelLocation')}</p>
                  <p className="font-sans text-[14px] text-white/80 leading-relaxed">{t('address1')}</p>
                  <p className="font-sans text-[13px] text-white/40 leading-relaxed">{t('address2')}</p>
                  <p className="font-sans text-[13px] text-white/40 leading-relaxed">{t('address3')}</p>
                </div>
              </div>

              {/* Phone */}
              <a href="tel:+359889571951"
                className="group flex gap-5 p-5 border border-white/[0.08] hover:border-amber/30 transition-colors duration-200 bg-navy">
                <div className="mt-0.5 shrink-0 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 group-hover:border-amber/40 group-hover:text-amber transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.14 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012.24 1.26h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.5a16 16 0 006.59 6.59l1.61-1.61a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber mb-2">{t('labelPhone')}</p>
                  <p className="font-sans text-[15px] text-white/80 group-hover:text-amber transition-colors duration-200">+359 889 57 19 51</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:ies@playcube.com"
                className="group flex gap-5 p-5 border border-white/[0.08] hover:border-amber/30 transition-colors duration-200 bg-navy">
                <div className="mt-0.5 shrink-0 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 group-hover:border-amber/40 group-hover:text-amber transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber mb-2">{t('labelEmail')}</p>
                  <p className="font-sans text-[15px] text-white/80 group-hover:text-amber transition-colors duration-200">ies@playcube.com</p>
                </div>
              </a>

            </div>

            <p className="mt-8 font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
              {t('workingHours')}
            </p>
          </div>

          {/* RIGHT — Google Maps */}
          <div className="h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[560px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.8!2d24.5911097!3d43.4337967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ab8b11fd708857%3A0x9c4bbae88f0d267d!2z0J3QvtCyINGC0YPRgCIg0JXQntCe0JQ!5e0!3m2!1sen!2sbg!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('mapTitle')}
            />
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amber mt-12 px-4 sm:px-8 lg:px-16 py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <h2 className="font-display text-[32px] sm:text-[44px] leading-[0.93] text-navy-dk">
          {t('ctaHeading1')}<br />
          <span className="text-navy/60">{t('ctaHeading2')}</span>
        </h2>
        <a
          href="tel:+359889571951"
          className="shrink-0 flex items-center gap-3 min-h-[52px] px-8 bg-navy-dk text-white font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-navy"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.14 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012.24 1.26h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.5a16 16 0 006.59 6.59l1.61-1.61a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
          </svg>
          +359 889 57 19 51
        </a>
      </section>

    </main>
  )
}
