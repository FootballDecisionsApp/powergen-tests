'use client'

import { useTranslations } from 'next-intl'
import { useConsent } from '@/lib/store/consent'

/**
 * Footer control that reopens the consent banner so a visitor can change or
 * withdraw their cookie choice at any time (GDPR Art. 7(3)). Rendered in the
 * same row as the legal links, styled to match them.
 */
export function CookieSettingsButton() {
  const t = useTranslations('footer')
  const reset = useConsent((s) => s.reset)

  return (
    <button
      type="button"
      onClick={reset}
      className="font-mono text-[10px] tracking-[0.12em] text-white/20 hover:text-white/45 transition-colors duration-150 min-h-[44px] sm:min-h-0"
    >
      {t('cookieSettings')}
    </button>
  )
}
