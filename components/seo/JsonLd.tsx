import { SITE_URL, absoluteUrl } from '@/lib/seo'
import type { IProduct } from '@/types'

interface JsonLdProps {
  data: Record<string, unknown>
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Company identity + site-level search metadata. Rendered once, on the home
 * page, so search engines can attach the brand panel to the domain.
 */
export function OrganizationJsonLd({ locale }: { locale: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Интегрирани Енергийни Системи ЕООД',
        alternateName: 'PlayCube',
        url: absoluteUrl(locale),
        logo: `${SITE_URL}/favicon.ico`,
        email: 'ies@playcube.com',
        telephone: '+359889571951',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. „Строител" № 1, Западна индустриална зона',
          addressLocality: 'Плевен',
          addressCountry: 'BG',
        },
      }}
    />
  )
}

interface ProductJsonLdProps {
  product: IProduct
  locale: string
  url: string
}

/**
 * Product structured data. Price-on-request items deliberately ship without an
 * `offers` block — emitting a zero or placeholder price would be invalid markup
 * and can get the whole product rejected in Search Console.
 */
export function ProductJsonLd({ product, locale, url }: ProductJsonLdProps) {
  const hasPrice = !product.priceOnRequest && product.price != null

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.seoDescription ?? product.description,
        image: product.image ? [product.image] : undefined,
        sku: product._id,
        category: product.category,
        brand: { '@type': 'Brand', name: 'PlayCube' },
        inLanguage: locale,
        ...(hasPrice
          ? {
              offers: {
                '@type': 'Offer',
                url,
                price: product.price,
                priceCurrency: 'EUR',
                availability: product.inStock
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
                seller: { '@type': 'Organization', name: 'PlayCube' },
              },
            }
          : {}),
      }}
    />
  )
}
