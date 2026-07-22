import Script from 'next/script'

/**
 * Cloudflare Web Analytics beacon — cookieless, no personal data collected.
 * No-ops until NEXT_PUBLIC_CF_BEACON_TOKEN is set (see .env.example).
 */
export function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN

  if (!token) {
    return null
  }

  return (
    <Script
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  )
}
