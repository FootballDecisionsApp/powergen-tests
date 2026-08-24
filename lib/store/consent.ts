'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TConsentStatus = 'pending' | 'accepted' | 'rejected'

interface IConsentState {
  status: TConsentStatus
  accept: () => void
  reject: () => void
  /**
   * Puts the choice back to 'pending' so the banner reappears. GDPR Art. 7(3)
   * requires withdrawing consent to be as easy as giving it, so this is exposed
   * through the "Cookie settings" control in the footer — asking visitors to
   * clear their browser storage would not satisfy that.
   */
  reset: () => void
}

export const useConsent = create<IConsentState>()(
  persist(
    (set) => ({
      status: 'pending',
      accept: () => set({ status: 'accepted' }),
      reject: () => set({ status: 'rejected' }),
      reset: () => set({ status: 'pending' }),
    }),
    { name: 'powergen-consent' }
  )
)
