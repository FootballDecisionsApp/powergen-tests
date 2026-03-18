# Skill 03 — Sanity Patterns
# Schemas, Queries, Client Setup

Read this file before any Sanity schema, query, or data fetching work.

---

## Client Setup

### `src/lib/sanity/client.ts`
```ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

/**
 * Server-side fetch with ISR revalidation.
 * Use in Server Components and API routes only — never in client components.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate: number = 3600
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  })
}
```

### `src/lib/sanity/image.ts`
```ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Usage: urlFor(product.images[0]).width(800).format('webp').url()
```

---

## Product Schema

### `sanity/schemas/product.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Продукти',
  type: 'document',
  groups: [
    { name: 'main',    title: 'Основни данни' },
    { name: 'tech',    title: 'Технически' },
    { name: 'media',   title: 'Снимки' },
    { name: 'seo',     title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Наименование',
      type: 'string',
      group: 'main',
      validation: Rule => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'main',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 4,
      group: 'main',
    }),
    defineField({
      name: 'price',
      title: 'Цена (EUR)',
      type: 'number',
      group: 'main',
      description: 'Цена в EUR — напр. 7490',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Стара цена (EUR)',
      type: 'number',
      group: 'main',
      description: 'Оставете празно ако няма намаление',
    }),
    defineField({
      name: 'powerKW',
      title: 'Мощност (kW)',
      type: 'number',
      group: 'tech',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'powerKVA',
      title: 'Мощност (kVA)',
      type: 'number',
      group: 'tech',
    }),
    defineField({
      name: 'fuelType',
      title: 'Тип гориво',
      type: 'string',
      group: 'tech',
      options: {
        list: [
          { title: 'Дизел',      value: 'diesel' },
          { title: 'Бензин',     value: 'petrol' },
          { title: 'Газ',        value: 'gas' },
          { title: 'Инверторен', value: 'inverter' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phases',
      title: 'Фази',
      type: 'string',
      group: 'tech',
      options: {
        list: [
          { title: '1-фазов', value: '1phase' },
          { title: '3-фазов', value: '3phase' },
        ],
      },
    }),
    defineField({
      name: 'inStock',
      title: 'В наличност',
      type: 'boolean',
      group: 'tech',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Препоръчан',
      type: 'boolean',
      group: 'tech',
      initialValue: false,
      description: 'Показва се на началната страница',
    }),
    defineField({
      name: 'autoStart',
      title: 'Автостарт',
      type: 'boolean',
      group: 'tech',
      initialValue: false,
    }),
    defineField({
      name: 'specifications',
      title: 'Спецификации',
      type: 'array',
      group: 'tech',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key',   type: 'string', title: 'Параметър' },
            { name: 'value', type: 'string', title: 'Стойност' },
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Снимки',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt текст',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'reference',
      group: 'main',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: Rule => Rule.max(155),
    }),
  ],
  preview: {
    select: {
      title:    'name',
      subtitle: 'price',
      media:    'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} EUR` : 'No price',
        media,
      }
    },
  },
})
```

### `sanity/schemas/category.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Категории',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Наименование',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
  ],
})
```

### `sanity/schemas/index.ts`
```ts
import product  from './product'
import category from './category'

export const schemaTypes = [product, category]
```

---

## GROQ Queries — `src/lib/sanity/queries.ts`

All queries live here. Import from this file everywhere.

```ts
// ─── Featured products (home page) ────────────────────────────────────────────
export const featuredProductsQuery = `
  *[_type == "product" && featured == true && inStock == true][0...3]
  | order(powerKW asc) {
    _id,
    name,
    slug,
    price,
    oldPrice,
    powerKW,
    fuelType,
    phases,
    inStock,
    autoStart,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── All products (list page — no filter) ─────────────────────────────────────
export const allProductsQuery = `
  *[_type == "product" && inStock == true]
  | order(powerKW asc) {
    _id,
    name,
    slug,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── Filtered products (list page — with searchParams) ────────────────────────
// Params: $fuelType (string|""), $minKW (number), $maxKW (number), $inStock (bool)
export const filteredProductsQuery = `
  *[_type == "product"
    && ($fuelType == "" || fuelType == $fuelType)
    && powerKW >= $minKW
    && powerKW <= $maxKW
    && (!$inStockOnly || inStock == true)
  ]
  | order(powerKW asc) {
    _id,
    name,
    slug,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── Single product by slug (detail page) ─────────────────────────────────────
// Params: $slug (string)
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    specifications,
    seoTitle,
    seoDescription,
    "images": images[].asset->url,
    "imageAlts": images[].alt,
    "category": category->name,
    "categorySlug": category->slug.current,
    "related": *[_type == "product"
      && fuelType == ^.fuelType
      && slug.current != $slug
      && inStock == true
    ][0...3] {
      _id, name, slug, price, powerKW, fuelType,
      "image": images[0].asset->url
    }
  }
`

// ─── All slugs (for generateStaticParams) ─────────────────────────────────────
export const allProductSlugsQuery = `
  *[_type == "product"] { "slug": slug.current }
`

// ─── All categories ────────────────────────────────────────────────────────────
export const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`

// ─── Product prices (server-side validation — API route use only) ──────────────
// Params: $ids (array of strings)
export const productPricesQuery = `
  *[_type == "product" && _id in $ids] {
    _id,
    price,
    name,
    inStock
  }
`
```

---

## Data Fetching Patterns

### In Server Component (page.tsx)
```tsx
import { sanityFetch }         from '@/lib/sanity/client'
import { filteredProductsQuery } from '@/lib/sanity/queries'
import type { IProduct }        from '@/types'

export default async function ProductsPage({ searchParams }) {
  const params = {
    fuelType:    searchParams.fuelType ?? '',
    minKW:       Number(searchParams.minKW) || 0,
    maxKW:       Number(searchParams.maxKW) || 9999,
    inStockOnly: searchParams.inStock === 'true',
  }

  const products = await sanityFetch<IProduct[]>(
    filteredProductsQuery,
    params,
    3600   // ISR: revalidate every hour
  )

  return <ProductGrid products={products} />
}
```

### generateStaticParams (product detail)
```tsx
import { sanityFetch }        from '@/lib/sanity/client'
import { allProductSlugsQuery } from '@/lib/sanity/queries'

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    allProductSlugsQuery,
    {},
    0  // no cache — always fresh for static generation
  )
  return slugs.map(({ slug }) => ({ slug }))
}
```

### In API Route (for server-side price validation)
```ts
import { client }             from '@/lib/sanity/client'
import { productPricesQuery } from '@/lib/sanity/queries'

const ids = items.map(i => i.productId)
const sanityProducts = await client.fetch(productPricesQuery, { ids })
// Use sanityProducts prices — never trust items.price from client
```

---

## Image Handling

```tsx
// In components — always use Next.js Image with urlFor
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

<Image
  src={urlFor(product.image).width(800).height(600).format('webp').url()}
  alt={product.imageAlt ?? product.name}
  width={800}
  height={600}
  className="object-cover w-full h-full"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

Always add `sizes` prop for responsive images — critical for performance.

---

## Sanity Studio Setup

Run Studio alongside Next.js:
```bash
# In /sanity directory:
npx sanity dev          # Studio at localhost:3333

# Or embed in Next.js at /studio:
# Install: npm install next-sanity
# Add to next.config.ts: see Next.js Sanity docs
```