'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface FilterSidebarProps {
  currentFuelType: string
  currentMinKW: number
  currentMaxKW: number
  currentInStock: boolean
  productCount: number
}

const fuelTypes = [
  { value: 'diesel',   label: 'Дизел' },
  { value: 'petrol',   label: 'Бензин' },
  { value: 'gas',      label: 'Газ' },
  { value: 'inverter', label: 'Инверторен' },
]

export function FilterSidebar({
  currentFuelType,
  currentMinKW,
  currentMaxKW,
  currentInStock,
  productCount,
}: FilterSidebarProps) {
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
    push({ fuelType: currentFuelType === value ? '' : value })
  }

  function handleInStock(checked: boolean) {
    push({ inStock: checked ? 'true' : undefined })
  }

  function handleMinKW(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value)
    push({ minKW: v > 0 ? v : undefined })
  }

  function handleMaxKW(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value)
    push({ maxKW: v > 0 && v < 9999 ? v : undefined })
  }

  return (
    <div className="p-5 flex flex-col gap-6">
      {/* Fuel type */}
      <div>
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-dust mb-3 pb-2 border-b border-border">
          Тип гориво
        </p>
        <div className="flex flex-col gap-1">
          {fuelTypes.map(({ value, label }) => {
            const checked = currentFuelType === value
            return (
              <label
                key={value}
                className="flex items-center gap-3 min-h-[44px] cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => handleFuelType(value)}
                />
                {/* Custom checkbox */}
                <span
                  className={`w-4 h-4 shrink-0 border transition-colors duration-150 flex items-center justify-center ${
                    checked
                      ? 'border-amber bg-amber'
                      : 'border-border group-hover:border-stone'
                  }`}
                >
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-paper" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="font-sans text-[13px] text-stone group-hover:text-black transition-colors">
                  {label}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* In stock toggle */}
      <div>
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-dust mb-3 pb-2 border-b border-border">
          Наличност
        </p>
        <label className="flex items-center justify-between min-h-[44px] cursor-pointer">
          <span className="font-sans text-[13px] text-stone">В наличност</span>
          <button
            role="switch"
            aria-checked={currentInStock}
            onClick={() => handleInStock(!currentInStock)}
            className={`relative w-10 h-5 transition-colors duration-200 ${
              currentInStock ? 'bg-amber' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-paper transition-transform duration-200 ${
                currentInStock ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Power range */}
      <div>
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-dust mb-3 pb-2 border-b border-border">
          Мощност (kW)
        </p>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-mono text-[8px] tracking-[1px] uppercase text-dust">от</label>
            <input
              type="number"
              min={0}
              max={9999}
              defaultValue={currentMinKW > 0 ? currentMinKW : ''}
              placeholder="0"
              onBlur={handleMinKW}
              className="w-full px-2 py-1.5 bg-paper border border-border font-mono text-[12px] text-black placeholder:text-dust outline-none focus:border-amber transition-colors min-h-[36px]"
            />
          </div>
          <span className="font-mono text-[10px] text-dust mt-4">—</span>
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-mono text-[8px] tracking-[1px] uppercase text-dust">до</label>
            <input
              type="number"
              min={0}
              max={9999}
              defaultValue={currentMaxKW < 9999 ? currentMaxKW : ''}
              placeholder="9999"
              onBlur={handleMaxKW}
              className="w-full px-2 py-1.5 bg-paper border border-border font-mono text-[12px] text-black placeholder:text-dust outline-none focus:border-amber transition-colors min-h-[36px]"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => router.push('/products')}
        className="w-full min-h-[44px] border border-border font-cond font-bold text-[10px] tracking-[2px] uppercase text-dust hover:text-black hover:border-black transition-all duration-200"
      >
        Изчисти филтрите
      </button>

      <p className="font-mono text-[10px] tracking-[1px] text-dust text-center">
        {productCount} продукта
      </p>
    </div>
  )
}
