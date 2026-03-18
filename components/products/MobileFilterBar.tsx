'use client'

import { useState } from 'react'
import { FilterSidebar } from './FilterSidebar'

interface MobileFilterBarProps {
  currentFuelType: string
  currentMinKW: number
  currentMaxKW: number
  currentInStock: boolean
  productCount: number
}

export function MobileFilterBar({
  currentFuelType,
  currentMinKW,
  currentMaxKW,
  currentInStock,
  productCount,
}: MobileFilterBarProps) {
  const [open, setOpen] = useState(false)

  const activeCount = [
    currentFuelType !== '',
    currentMinKW > 0,
    currentMaxKW < 9999,
    currentInStock,
  ].filter(Boolean).length

  return (
    <>
      {/* Sticky filter bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-paper border-b border-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 min-h-[44px] font-cond font-semibold text-[11px] tracking-[2px] uppercase text-stone hover:text-black transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M6 12h12M9 18h6" />
          </svg>
          Филтри
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber text-paper font-mono text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        <p className="font-mono text-[10px] tracking-[1px] text-dust">
          {productCount} продукта
        </p>
      </div>

      {/* Bottom sheet drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Sheet slides up from bottom */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-paper max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-8 h-1 bg-border rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="font-cond font-bold text-[13px] tracking-[2px] uppercase">
              Филтри
            </span>
            <button
              onClick={() => setOpen(false)}
              className="w-11 h-11 flex items-center justify-center text-stone hover:text-black transition-colors"
              aria-label="Затвори"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filter content */}
          <FilterSidebar
            currentFuelType={currentFuelType}
            currentMinKW={currentMinKW}
            currentMaxKW={currentMaxKW}
            currentInStock={currentInStock}
            productCount={productCount}
          />

          {/* Apply button */}
          <div className="sticky bottom-0 p-4 bg-paper border-t border-border">
            <button
              onClick={() => setOpen(false)}
              className="w-full min-h-[52px] bg-black text-paper font-cond font-bold text-[12px] tracking-[2.5px] uppercase transition-colors hover:bg-amber"
            >
              Приложи
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
