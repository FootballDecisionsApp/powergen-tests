'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useConsent } from '@/lib/store/consent'

export function ConsentBanner() {
  const t = useTranslations('cookieConsent')
  const { status, accept, reject } = useConsent()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Guard against flashing the banner while the persisted consent
  // status rehydrates from localStorage on the client.
  if (!mounted || status !== 'pending') return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-navy-dk border-t border-amber/20 px-4 sm:px-8 py-5">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-sans font-light text-[13px] text-white/60 leading-relaxed max-w-2xl">
          {t('message')}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={reject}
            className="min-h-[44px] px-5 border border-white/[0.12] font-mono text-[10px] tracking-[0.15em] uppercase text-white/50 hover:text-white/80 hover:border-white/25 transition-colors duration-200"
          >
            {t('reject')}
          </button>
          <button
            onClick={accept}
            className="min-h-[44px] px-5 bg-amber text-navy-dk font-mono font-medium text-[10px] tracking-[0.15em] uppercase hover:bg-amber-light transition-colors duration-200"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
