import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

// Kept in one place and mirrored in public/_headers (which covers static
// assets served directly by the Cloudflare Workers Assets binding, bypassing
// this Next config entirely). script-src/style-src need 'unsafe-inline'
// because Next's App Router streams inline hydration scripts and several
// components use inline style="" for gradients — a nonce-based CSP would
// remove that but needs middleware plumbing; this still blocks arbitrary
// remote script/object injection and framing, which is the main XSS/clickjacking win.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io",
      "font-src 'self' data:",
      "connect-src 'self' https://eu.i.posthog.com https://*.posthog.com https://static.cloudflareinsights.com https://cloudflareinsights.com",
      "frame-src https://www.google.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

initOpenNextCloudflareForDev()

export default withNextIntl(nextConfig)
