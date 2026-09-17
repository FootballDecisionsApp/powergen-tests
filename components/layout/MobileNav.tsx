'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/lib/navigation'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/products' as const, label: t('catalog') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-40 bg-navy-dk flex flex-col items-center justify-center transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-4 sm:right-8 w-11 h-11 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        aria-label={t('closeMenu')}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Nav links */}
      <nav className="relative z-10 flex flex-col items-center gap-2" aria-label="Mobile navigation">
        {navLinks.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="font-display text-[52px] sm:text-[64px] leading-none tracking-[0.04em] text-white/80 hover:text-amber transition-colors duration-200"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Language switcher — mobile */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-0 z-10">
        <Link
          href={pathname}
          locale="bg"
          className={`px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase border transition-colors duration-150 ${
            locale === 'bg'
              ? 'bg-amber text-navy-dk border-amber'
              : 'text-white/40 border-white/[0.15] hover:text-white/70'
          }`}
        >
          BG
        </Link>
        <Link
          href={pathname}
          locale="en"
          className={`px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-l-0 transition-colors duration-150 ${
            locale === 'en'
              ? 'bg-amber text-navy-dk border-amber'
              : 'text-white/40 border-white/[0.15] hover:text-white/70'
          }`}
        >
          EN
        </Link>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-8 left-0 right-0 px-8 z-10">
        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center justify-center w-full min-h-[52px] bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-amber-light"
        >
          {t('catalog')} →
        </Link>
      </div>
    </div>
  )
}
