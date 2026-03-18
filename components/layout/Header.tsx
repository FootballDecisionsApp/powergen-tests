'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/store/cart'
import { MobileNav } from './MobileNav'
import { CartDrawer } from '@/components/cart/CartDrawer'

const navLinks = [
  { href: '/', label: 'Начало' },
  { href: '/products', label: 'Каталог' },
  { href: '/about', label: 'За нас' },
  { href: '/contact', label: 'Контакти' },
]

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()
  const { getTotalItems, openCart } = useCart()
  const totalItems = getTotalItems()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href.split('?')[0])
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between bg-navy/96 backdrop-blur-xl border-b border-amber/[0.15]">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group shrink-0">
          <span className="font-display text-[30px] sm:text-[30px] tracking-[0.08em] text-white leading-none transition-colors duration-200 group-hover:text-amber/90">
            PLAYCUBE
          </span>
          <span className="hidden sm:block font-mono text-[8px] tracking-[0.22em] uppercase text-amber mt-[3px]">
            By Integrated Energy Systems
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={`relative font-mono text-[11px] tracking-[0.2em] uppercase pb-1 transition-colors duration-200 group ${isActive(href)
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 h-px bg-amber transition-all duration-300 ${isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label="Отвори количката"
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 border border-white/[0.12] min-h-[44px] font-mono text-[10px] tracking-[0.18em] uppercase text-white/50 transition-all duration-200 hover:border-amber/50 hover:text-white/80"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">Количка</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber text-navy font-mono text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* "Get a quote" CTA — desktop only */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center min-h-[44px] px-5 bg-amber text-navy-dk font-mono text-[10px] tracking-[0.18em] uppercase font-medium transition-all duration-200 hover:bg-amber-light"
          >
            Вземи оферта
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="lg:hidden w-11 h-11 flex items-center justify-center"
            aria-label={mobileNavOpen ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={mobileNavOpen}
          >
            <div className="relative w-5 h-[13px]">
              <span
                className={`absolute left-0 w-5 h-px bg-white transition-all duration-300 ${mobileNavOpen ? 'top-[6px] rotate-45' : 'top-0'
                  }`}
              />
              <span
                className={`absolute top-[6px] left-0 w-5 h-px bg-white transition-all duration-300 ${mobileNavOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
              />
              <span
                className={`absolute h-px bg-white transition-all duration-300 ${mobileNavOpen ? 'w-5 left-0 top-[6px] -rotate-45' : 'w-3 right-0 top-[12px]'
                  }`}
              />
            </div>
          </button>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <CartDrawer />
    </>
  )
}
