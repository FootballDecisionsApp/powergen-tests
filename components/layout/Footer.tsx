import Link from 'next/link'

const navColumns = [
  {
    title: 'Продукти',
    links: [
      { label: 'Всички генератори', href: '/products' },
      { label: 'Дизелови', href: '/products?fuelType=diesel' },
      { label: 'Инверторни', href: '/products?fuelType=inverter' },
      { label: 'Газови', href: '/products?fuelType=gas' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'Начало', href: '/' },
      { label: 'Каталог', href: '/products' },
      { label: 'Контакти', href: '/contact' },
    ],
  },
  {
    title: 'Контакти',
    links: [
      { label: '+359 889 57 19 51', href: 'tel:+359889571951' },
      { label: 'ies@playcube.com', href: 'mailto:ies@playcube.com' },
      { label: 'ул. Строител 1, Западна индустриална зона, Плевен', href: '/contact' },
    ],
  },
]

export function Footer() {
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
            Промишлени генератори с доказана надеждност за критична инфраструктура и бизнес приложения.
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
                  <Link
                    href={link.href}
                    className="font-sans font-light text-[13px] text-white/30 hover:text-white/65 transition-colors duration-150 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="font-mono text-[10px] tracking-[0.12em] text-white/20">
          © 2026 PlayCube · Integrated Energy Systems OOD · All rights reserved
        </p>
        <div className="flex items-center gap-5">
          {['Поверителност', 'Бисквитки', 'Условия'].map((label) => (
            <Link
              key={label}
              href="#"
              className="font-mono text-[10px] tracking-[0.12em] text-white/20 hover:text-white/45 transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
