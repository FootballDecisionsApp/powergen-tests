import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'

/**
 * Canonical origin for every absolute URL the app emits (canonical tags,
 * hreflang alternates, JSON-LD, sitemap). Mirrors app/sitemap.ts — both read
 * NEXT_PUBLIC_SITE_URL, which is set as a Workers binding in wrangler.jsonc.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://videligo.com'

/** Absolute URL for a locale-relative route ('' = home, '/products', ...). */
export function absoluteUrl(locale: string, path: string = ''): string {
  return `${SITE_URL}/${locale}${path}`
}

interface PageMetadataInput {
  locale: string
  /** Route without the locale prefix: '' for home, '/products', '/products/dg-15'. */
  path?: string
  title: string
  description?: string
  /** Transactional pages (cart, checkout) — keep them out of the index. */
  noIndex?: boolean
  /** Absolute image URL for social previews. */
  image?: string
}

/**
 * Builds the metadata every page shares: canonical URL, hreflang alternates for
 * both locales plus x-default, and Open Graph tags. Pages that skipped this were
 * silently inheriting the root layout's Bulgarian-agnostic fallback title.
 */
export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  noIndex = false,
  image,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(locale, path)

  const languages = Object.fromEntries([
    ...routing.locales.map((l) => [l, absoluteUrl(l, path)]),
    ['x-default', absoluteUrl(routing.defaultLocale, path)],
  ])

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      siteName: 'PlayCube — Integrated Energy Systems',
      locale: locale === 'bg' ? 'bg_BG' : 'en_GB',
      url: canonical,
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  }
}
