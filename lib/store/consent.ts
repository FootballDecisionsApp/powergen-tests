'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TConsentStatus = 'pending' | 'accepted' | 'rejected'

interface IConsentState {
  status: TConsentStatus
  accept: () => void
  reject: () => void
}

export const useConsent = create<IConsentState>()(
  persist(
    (set) => ({
      status: 'pending',
      accept: () => set({ status: 'accepted' }),
      reject: () => set({ status: 'rejected' }),
    }),
    { name: 'powergen-consent' }
  )
)
