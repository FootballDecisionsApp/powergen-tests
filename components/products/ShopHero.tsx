'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface ShopHeroProps {
  currentFuelType: string
  currentMinKW: number
  currentMaxKW: number
  currentInStock: boolean
  productCount: number
}

const fuelTypes = [
  { value: '',         label: 'Всички' },
  { value: 'diesel',   label: 'Дизел' },
  { value: 'gas',      label: 'Газ' },
  { value: 'inverter', label: 'Инвертор' },
  { value: 'petrol',   label: 'Бензин' },
]

const powerRanges = [
  { value: '',        label: 'Всички', min: 0, max: 9999 },
  { value: 'small',   label: 'До 10 kW', min: 0, max: 10 },
  { value: 'medium',  label: '10–50 kW', min: 10, max: 50 },
  { value: 'large',   label: '50+ kW', min: 50, max: 9999 },
]

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
  productCount,
}: ShopHeroProps) {
  const router = useRouter()

  const push = useCallback(
    (patch: Record<string, string | number | boolean | undefined>) => {
      const params = new URLSearchParams()
      const next = {
        fuelType: currentFuelType,
        minKW:    currentMinKW > 0 ? currentMinKW : undefined,
        maxKW:    currentMaxKW < 9999 ? currentMaxKW : undefined,
        inStock:  currentInStock ? 'true' : undefined,
        ...patch,
      }
      if (next.fuelType) params.set('fuelType', String(next.fuelType))
      if (next.minKW)    params.set('minKW', String(next.minKW))
      if (next.maxKW)    params.set('maxKW', String(next.maxKW))
      if (next.inStock)  params.set('inStock', 'true')
      router.push(`/products${params.size ? `?${params}` : ''}`)
    },
    [currentFuelType, currentMinKW, currentMaxKW, currentInStock, router]
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
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <a href="/" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-amber/60 transition-colors">Начало</a>
          <span className="text-white/15 font-mono text-[9px]">/</span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber/60">Каталог</span>
        </nav>
        <p className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
          <span className="w-7 h-px bg-amber shrink-0" />
          Пълен асортимент
        </p>
        <h1 className="font-display text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.9] text-white tracking-[-0.01em]">
          КАТАЛОГ<br />
          <span className="text-amber">ГЕНЕРАТОРИ</span>
        </h1>
        <p className="mt-4 font-sans font-light text-[13px] text-white/40 tracking-[0.05em]">
          Дизелови · Газови · Инверторни · 5 kW — 2000 kW
        </p>
      </div>

      {/* Filter bar */}
      <div className="border-t border-amber/[0.1] px-4 sm:px-8 lg:px-16 overflow-x-auto">
        <div className="flex items-stretch gap-0 min-w-max sm:min-w-0">

          {/* Fuel type filter */}
          <div className="flex items-center gap-5 py-4 pr-8 border-r border-white/[0.06]">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 whitespace-nowrap shrink-0">
              Тип гориво
            </span>
            <div className="flex items-center gap-2">
              {fuelTypes.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleFuelType(value)}
                  className={`px-3.5 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase border transition-all duration-150 ${
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
              Мощност
            </span>
            <div className="flex items-center gap-2">
              {powerRanges.map(({ value, label, min, max }) => (
                <button
                  key={value}
                  onClick={() => handlePowerRange(min, max)}
                  className={`px-3.5 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase border transition-all duration-150 ${
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
              className={`flex items-center gap-2.5 font-mono text-[9px] tracking-[0.15em] uppercase border px-3.5 py-1.5 transition-all duration-150 ${
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
              В наличност
            </button>

            {/* Reset */}
            {(currentFuelType || currentMinKW > 0 || currentMaxKW < 9999 || currentInStock) && (
              <button
                onClick={() => router.push('/products')}
                className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors duration-150"
              >
                Изчисти
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Toolbar: count */}
      <div className="bg-cream px-4 sm:px-8 lg:px-16 py-4 border-b border-smoke flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ash">
          {productCount} {productCount === 1 ? 'продукт' : 'продукта'}
        </span>
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-dust">
          По мощност ↑
        </span>
      </div>
    </div>
  )
}
