import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { allProductSlugsQuery } from '@/lib/sanity/queries'

const BASE_URL = 'https://playcube-ies.vercel.app'
const LOCALES = ['bg', 'en'] as const

const staticRoutes = ['', '/products', '/about', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<{ slug: string }[]>(allProductSlugsQuery, {}, 3600).catch(
    () => [] as { slug: string }[]
  )

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}/bg${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${route}`])
      ),
    },
  }))

  const productEntries: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE_URL}/bg/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}/products/${slug}`])
      ),
    },
  }))

  return [...staticEntries, ...productEntries]
}
