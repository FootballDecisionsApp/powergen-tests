'use client'

import { useEffect } from 'react'
import { useConsent } from '@/lib/store/consent'
import { initAnalytics, shutdownAnalytics } from '@/lib/analytics'

interface PostHogAnalyticsProps {
  posthogKey?: string
  posthogHost: string
}

export function PostHogAnalytics({ posthogKey, posthogHost }: PostHogAnalyticsProps) {
  const status = useConsent((s) => s.status)

  useEffect(() => {
    if (status === 'accepted' && posthogKey) {
      initAnalytics(posthogKey, posthogHost)
    } else {
      shutdownAnalytics()
    }
  }, [status, posthogKey, posthogHost])

  return null
}
