'use client'

import posthog from 'posthog-js'

let initialized = false

/**
 * Starts PostHog capture. Only call after consent is granted —
 * PostHog sets identifying cookies, unlike the cookieless Cloudflare beacon.
 *
 * Takes the key/host as arguments rather than reading process.env directly:
 * this module is bundled for the browser, and NEXT_PUBLIC_* vars here would
 * only be inlined from local .env files at build time — not from the
 * wrangler.jsonc/.dev.vars bindings this project actually uses. The caller
 * (a Server Component) reads process.env and passes the values down instead.
 */
export function initAnalytics(key: string, host: string): void {
  if (!key || initialized) return

  posthog.init(key, {
    api_host: host,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  })
  initialized = true
}

export function shutdownAnalytics(): void {
  if (!initialized) return
  posthog.reset()
  initialized = false
}

export type AnalyticsEvent =
  | { name: 'product_viewed'; props: { productId: string; productName: string; price: number } }
  | { name: 'product_added_to_cart'; props: { productId: string; productName: string; price: number; powerKW: number } }
  | { name: 'product_filter_applied'; props: { filterType: 'fuelType' | 'inStock' | 'minKW' | 'maxKW'; value: string | number | boolean } }
  | { name: 'checkout_started'; props: { itemCount: number; total: number } }
  | { name: 'order_completed'; props: { orderId: string; total: number; itemCount: number } }

export function trackEvent(event: AnalyticsEvent): void {
  if (!initialized) return
  posthog.capture(event.name, event.props)
}
