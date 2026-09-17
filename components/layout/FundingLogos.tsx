'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface FundingLogosProps {
  /** Height utility for both images, e.g. "h-9". Widths follow the aspect ratio. */
  imageClassName?: string
  /** Must carry the display utility ("flex", "hidden sm:flex") — the base has none. */
  className?: string
}

/**
 * EU emblem + programme logo for project BG16RFPR001-1.004-2828-C01.
 * Both PNGs ship with a baked-in white background, so they always ride on a
 * light plate instead of sitting directly on the navy chrome.
 */
export function FundingLogos({
  imageClassName = 'h-7 sm:h-8 xl:h-9',
  className = '',
}: FundingLogosProps) {
  const t = useTranslations('project')

  return (
    <div
      className={`items-center gap-2 sm:gap-2.5 xl:gap-3 bg-paper px-2 sm:px-2.5 xl:px-3 py-1 sm:py-1.5 ${className}`}
    >
      <Image
        src="/eu/playcube-logo-eu.png"
        alt={t('logoEuAlt')}
        width={186}
        height={170}
        className={`${imageClassName} w-auto`}
        unoptimized
      />
      <Image
        src="/eu/playcube-logo-program.png"
        alt={t('logoProgrammeAlt')}
        width={217}
        height={158}
        className={`${imageClassName} w-auto`}
        unoptimized
      />
    </div>
  )
}
