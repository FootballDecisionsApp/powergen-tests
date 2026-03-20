'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/lib/navigation'

export type SortOption = 'powerAsc' | 'powerDesc' | 'priceAsc' | 'priceDesc'

interface ShopHeroProps {
  currentFuelType: string
  currentMinKW: number
  currentMaxKW: number
  currentInStock: boolean
  currentSort: SortOption
  productCount: number
}

function getPowerKey(minKW: number, maxKW: number) {
  if (minKW === 0 && maxKW === 9999) return ''
  if (maxKW <= 10) return 'small'
  if (minKW >= 10 && maxKW <= 50) return 'medium'
  if (minKW >= 50) return 'large'
  return ''
}

export function ShopHero({
  currentFuelType,
  currentMinKW,
  currentMaxKW,
  currentInStock,
  currentSort,
  productCount,
}: ShopHeroProps) {
  const t = useTranslations('products')
  const router = useRouter()

  const fuelTypes = [
    { value: '',         label: t('fuelAll') },
    { value: 'diesel',   label: t('fuelDiesel') },
    { value: 'gas',      label: t('fuelGas') },
    { value: 'inverter', label: t('fuelInverter') },
    { value: 'petrol',   label: t('fuelPetrol') },
  ]

  const powerRanges = [
    { value: '',        label: t('powerAll'), min: 0, max: 9999 },
    { value: 'small',   label: t('powerSmall'), min: 0, max: 10 },
    { value: 'medium',  label: t('powerMedium'), min: 10, max: 50 },
    { value: 'large',   label: t('powerLarge'), min: 50, max: 9999 },
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'powerAsc',  label: t('sortPowerAsc') },
    { value: 'powerDesc', label: t('sortPowerDesc') },
    { value: 'priceAsc',  label: t('sortPriceAsc') },
    { value: 'priceDesc', label: t('sortPriceDesc') },
  ]

  const push = useCallback(
    (patch: Record<string, string | number | boolean | undefined>) => {
      const params = new URLSearchParams()
      const next = {
        fuelType: currentFuelType,
        minKW:    currentMinKW > 0 ? currentMinKW : undefined,
        maxKW:    currentMaxKW < 9999 ? currentMaxKW : undefined,
        inStock:  currentInStock ? 'true' : undefined,
        sort:     currentSort !== 'powerAsc' ? currentSort : undefined,
        ...patch,
      }
      if (next.fuelType) params.set('fuelType', String(next.fuelType))
      if (next.minKW)    params.set('minKW', String(next.minKW))
      if (next.maxKW)    params.set('maxKW', String(next.maxKW))
      if (next.inStock)  params.set('inStock', 'true')
      if (next.sort)     params.set('sort', String(next.sort))
      router.push(`/products${params.size ? `?${params}` : ''}`)
    },
    [currentFuelType, currentMinKW, currentMaxKW, currentInStock, currentSort, router]
  )

  function handleFuelType(value: string) {
    push({ fuelType: value })
  }

  function handlePowerRange(min: number, max: number) {
    push({
      minKW: min > 0 ? min : undefined,
      maxKW: max < 9999 ? max : undefined,
    })
  }

  function handleSort(value: SortOption) {
    push({ sort: value !== 'powerAsc' ? value : undefined })
  }

  const currentPowerKey = getPowerKey(currentMinKW, currentMaxKW)

  return (
    <div className="bg-navy-dk pt-[72px]">
      {/* Grid texture */}
      <div
        className="absolute pointer-events-none opacity-[0.04] h-[240px] left-0 right-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hero text */}
      <div className="relative px-4 sm:px-8 lg:px-16 pt-14 pb-10">
        <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
          <span className="w-7 h-px bg-amber shrink-0" />
          {t('eyebrow')}
        </p>
        <h1 className="font-display text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.9] text-white tracking-[-0.01em]">
          {t('heading1')}<br />
          <span className="text-amber">{t('heading2')}</span>
        </h1>
        <p className="mt-4 font-sans font-light text-[13px] text-white/40 tracking-[0.05em]">
          {t('subtitle')}
        </p>
      </div>

      {/* Filter bar */}
      <div className="border-t border-amber/[0.1] px-4 sm:px-8 lg:px-16 overflow-x-auto">
        <div className="flex items-stretch gap-0 min-w-max sm:min-w-0">

          {/* Fuel type filter */}
          <div className="flex items-center gap-5 py-4 pr-8 border-r border-white/[0.06]">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 whitespace-nowrap shrink-0">
              {t('filterFuelType')}
            </span>
            <div className="flex items-center gap-2">
              {fuelTypes.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleFuelType(value)}
                  className={`flex items-center justify-center px-3.5 h-7 leading-none font-mono text-[9px] tracking-[0.15em] uppercase border transition-all duration-150 ${
                    currentFuelType === value
                      ? 'border-amber text-amber bg-amber/[0.06]'
                      : 'border-white/[0.12] text-white/45 hover:border-amber/50 hover:text-amber/70'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Power range filter */}
          <div className="flex items-center gap-5 py-4 px-8 border-r border-white/[0.06]">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 whitespace-nowrap shrink-0">
              {t('filterPower')}
            </span>
            <div className="flex items-center gap-2">
              {powerRanges.map(({ value, label, min, max }) => (
                <button
                  key={value}
                  onClick={() => handlePowerRange(min, max)}
                  className={`flex items-center justify-center px-3.5 h-7 leading-none font-mono text-[9px] tracking-[0.15em] uppercase border transition-all duration-150 ${
                    currentPowerKey === value
                      ? 'border-amber text-amber bg-amber/[0.06]'
                      : 'border-white/[0.12] text-white/45 hover:border-amber/50 hover:text-amber/70'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* In stock toggle */}
          <div className="flex items-center gap-4 py-4 px-8">
            <button
              onClick={() => push({ inStock: !currentInStock ? 'true' : undefined })}
              className={`flex items-center gap-2.5 leading-none font-mono text-[9px] tracking-[0.15em] uppercase border px-3.5 h-7 transition-all duration-150 ${
                currentInStock
                  ? 'border-amber text-amber bg-amber/[0.06]'
                  : 'border-white/[0.12] text-white/45 hover:border-amber/50 hover:text-amber/70'
              }`}
            >
              {currentInStock && (
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {t('filterInStock')}
            </button>

            {/* Reset */}
            {(currentFuelType || currentMinKW > 0 || currentMaxKW < 9999 || currentInStock) && (
              <button
                onClick={() => router.push('/products')}
                className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors duration-150"
              >
                {t('filterReset')}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Toolbar: count + sort */}
      <div className="bg-cream px-4 sm:px-8 lg:px-16 py-3 border-b border-smoke flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ash shrink-0">
          {productCount} {productCount === 1 ? t('countSingular') : t('countPlural')}
        </span>

        {/* Sort dropdown */}
        <SortDropdown
          value={currentSort}
          options={sortOptions}
          onChange={handleSort}
          label={t('sortLabel')}
        />
      </div>
    </div>
  )
}

interface SortDropdownProps {
  value: SortOption
  options: { value: SortOption; label: string }[]
  onChange: (v: SortOption) => void
  label: string
}

function SortDropdown({ value, options, onChange, label }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const current = options.find(o => o.value === value)!

  return (
    <div className="flex items-center gap-2 shrink-0" ref={ref}>
      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-dust hidden sm:inline">
        {label}
      </span>
      <div className="relative">
        {/* Trigger */}
        <button
          onClick={() => setOpen(v => !v)}
          className={`flex items-center gap-3 pl-4 pr-3 h-9 font-mono text-[11px] tracking-[0.05em] border transition-colors duration-150 min-w-[130px] justify-between ${
            open ? 'border-navy bg-white text-navy' : 'border-smoke bg-cream text-navy hover:border-navy/40'
          }`}
        >
          {current.label}
          <svg
            className={`w-3 h-3 text-ash transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 10 6" fill="none"
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Menu */}
        {open && (
          <div className="absolute right-0 top-[calc(100%+4px)] z-50 min-w-full border border-smoke bg-white shadow-[0_8px_24px_rgba(16,30,51,0.1)]">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full text-left px-4 py-2.5 font-mono text-[11px] tracking-[0.05em] transition-colors duration-100 ${
                  opt.value === value
                    ? 'bg-navy text-white'
                    : 'text-navy hover:bg-cream'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
