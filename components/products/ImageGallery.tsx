'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'

interface ImageGalleryProps {
  images: string[]
  alts: string[]
  productName: string
  inStock: boolean
  featured?: boolean
}

export function ImageGallery({
  images,
  alts,
  productName,
  inStock,
  featured,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const mainSrc = images[activeIndex] ?? images[0]
  const mainAlt = alts[activeIndex] ?? productName

  return (
    <div>
      {/* Main image */}
      <div className="relative bg-navy-dk aspect-[4/3] overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <Image
          src={mainSrc}
          alt={mainAlt}
          fill
          priority
          className="object-contain p-8 sm:p-12 relative z-10"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Overlaid badges — top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {featured && (
            <span className="px-2.5 py-1 bg-amber text-navy-dk font-mono text-[9px] tracking-[0.2em] uppercase font-medium">
              ТОП
            </span>
          )}
          {!inStock && (
            <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white/60 font-mono text-[9px] tracking-[0.2em] uppercase">
              Изчерпан
            </span>
          )}
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(212,160,23,0.12) 50%)' }}
        />
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Снимка ${i + 1}`}
              className={`relative flex-shrink-0 w-16 h-16 bg-navy-dk border transition-colors duration-150 ${
                i === activeIndex
                  ? 'border-amber'
                  : 'border-white/10 hover:border-amber/50'
              }`}
            >
              <Image
                src={src}
                alt={alts[i] ?? productName}
                fill
                className="object-contain p-1.5"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
