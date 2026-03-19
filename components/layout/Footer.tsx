import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'

export async function Footer() {
  const t = await getTranslations('footer')

  const navColumns = [
    {
      title: t('products'),
      links: [
        { label: t('allGenerators'), href: '/products' as const },
        { label: t('diesel'), href: '/products' as const, query: '?fuelType=diesel' },
        { label: t('inverter'), href: '/products' as const, query: '?fuelType=inverter' },
        { label: t('gas'), href: '/products' as const, query: '?fuelType=gas' },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: t('home'), href: '/' as const },
        { label: t('catalog'), href: '/products' as const },
        { label: t('contact'), href: '/contact' as const },
      ],
    },
    {
      title: t('contact'),
      links: [
        { label: '+359 889 57 19 51', href: 'tel:+359889571951' as const },
        { label: 'ies@playcube.com', href: 'mailto:ies@playcube.com' as const },
        { label: `${t('address3')}, ${t('address2')}, ${t('address1')}`, href: '/contact' as const },
      ],
    },
  ]

  return (
    <footer className="relative bg-navy-dk text-white/35 px-4 sm:px-8 lg:px-16 pt-16 pb-8 overflow-hidden">

      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(212,160,23,0.5) 35%, rgba(212,160,23,0.15) 70%, transparent 95%)',
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 mb-8 border-b border-white/[0.06]">

        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex flex-col leading-none mb-6 group">
            <span className="font-display text-[32px] tracking-[0.08em] text-white/85 group-hover:text-white transition-colors duration-200">
              PLAYCUBE
            </span>
            <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-amber mt-1">
              By Integrated Energy Systems
            </span>
          </Link>
          <p className="font-sans font-light text-[13px] leading-relaxed mb-6 max-w-[240px] text-white/30">
            {t('tagline')}
          </p>
          <div className="flex flex-col gap-1.5">
            <a href="tel:+359889571951" className="font-mono text-[10px] tracking-[0.12em] text-white/25 hover:text-amber transition-colors duration-200">
              +359 889 57 19 51
            </a>
            <a href="mailto:ies@playcube.com" className="font-mono text-[10px] tracking-[0.12em] text-white/25 hover:text-amber transition-colors duration-200">
              ies@playcube.com
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {navColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber mb-6">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {'query' in link ? (
                    <a
                      href={`${link.href}${(link as { query?: string }).query ?? ''}`}
                      className="font-sans font-light text-[13px] text-white/30 hover:text-white/65 transition-colors duration-150 inline-block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-sans font-light text-[13px] text-white/30 hover:text-white/65 transition-colors duration-150 inline-block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="font-mono text-[10px] tracking-[0.12em] text-white/20">
          {t('copyright')}
        </p>
        <div className="flex items-center gap-5">
          {[
            { key: 'privacy', label: t('privacy') },
            { key: 'cookies', label: t('cookies') },
            { key: 'terms', label: t('terms') },
          ].map(({ key, label }) => (
            <a
              key={key}
              href="#"
              className="font-mono text-[10px] tracking-[0.12em] text-white/20 hover:text-white/45 transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
