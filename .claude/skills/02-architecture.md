# Skill 02 — Architecture
# File Structure, Component Rules, Data Flow

Read this file before creating any new file, page, or route.

---

## Folder Structure

```
powergen-test/
├── public/
│   └── images/                  # static assets
│
├── sanity/                      # Sanity Studio (separate app)
│   ├── schemas/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   └── index.ts
│   └── sanity.config.ts
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout — fonts, metadata, body
│   │   ├── globals.css          # CSS variables, base styles, animations
│   │   ├── page.tsx             # Root → redirects to /products or shows home
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx         # Product list — SERVER COMPONENT
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Product detail — SERVER COMPONENT
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx         # Cart page — CLIENT COMPONENT
│   │   │
│   │   ├── checkout/
│   │   │   ├── page.tsx         # Checkout form — CLIENT COMPONENT
│   │   │   └── success/
│   │   │       └── page.tsx     # Order success — CLIENT COMPONENT
│   │   │
│   │   └── api/
│   │       └── orders/
│   │           └── route.ts     # POST — validate + save mock order
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # CLIENT — cart count, mobile nav toggle
│   │   │   ├── MobileNav.tsx    # CLIENT — full-screen mobile overlay
│   │   │   └── Footer.tsx       # SERVER — static
│   │   │
│   │   ├── products/
│   │   │   ├── ProductCard.tsx  # CLIENT — hover interactions, add to cart
│   │   │   ├── ProductGrid.tsx  # SERVER — maps products → ProductCard
│   │   │   ├── FilterBar.tsx    # CLIENT — updates URL searchParams
│   │   │   └── FilterSidebar.tsx # CLIENT — sidebar version for desktop
│   │   │
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx   # CLIENT — slide-in overlay
│   │   │   ├── CartItem.tsx     # CLIENT — qty controls, remove
│   │   │   └── CartButton.tsx   # CLIENT — header cart icon + count
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx         # CLIENT — animations, parallax
│   │   │   ├── FeaturedProducts.tsx # SERVER — fetches + renders grid
│   │   │   └── TrustBar.tsx     # SERVER — static trust items
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx       # Reusable button variants
│   │       ├── Badge.tsx        # Product badges
│   │       ├── Breadcrumbs.tsx  # Navigation breadcrumbs
│   │       └── LoadingSkeleton.tsx # Skeleton for loading states
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts        # createClient + sanityFetch helper
│   │   │   ├── queries.ts       # ALL GROQ queries — no queries elsewhere
│   │   │   └── image.ts         # urlFor helper with @sanity/image-url
│   │   └── store/
│   │       └── cart.ts          # Zustand cart store
│   │
│   └── types/
│       └── index.ts             # ALL shared types/interfaces
│
├── .claude/
│   ├── agents.md
│   └── skills/
│       ├── 01-design-system.md
│       ├── 02-architecture.md
│       ├── 03-sanity-patterns.md
│       ├── 04-security.md
│       └── 05-responsive.md
│
├── CLAUDE.md
├── .env.local
├── .env.example
├── tailwind.config.ts
└── next.config.ts
```

---

## Server vs Client Component Rules

### Server Components (default — no directive needed)
Use for everything that:
- Fetches data from Sanity
- Renders static or ISR content
- Has no event handlers (onClick, onChange)
- Has no browser APIs (window, document, localStorage)
- Has no React hooks (useState, useEffect)

**Examples:** all page.tsx files, ProductGrid, TrustBar, Footer, FeaturedProducts

### Client Components (`"use client"` at top of file)
Use ONLY when you need:
- `useState` or `useEffect`
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (window.scrollY, localStorage)
- Third-party libraries that need the DOM
- Animations driven by JS
- The Zustand cart store (`useCart()`)

**Examples:** Header, Hero, FilterBar, CartDrawer, ProductCard (hover + add to cart), all forms

### The Pattern — Split at the boundary
```tsx
// products/page.tsx — SERVER fetches data
export default async function ProductsPage({ searchParams }) {
  const products = await sanityFetch(filteredProductsQuery, params)
  return (
    <div>
      <FilterBar />           {/* CLIENT — user interaction */}
      <ProductGrid products={products} />  {/* SERVER — renders list */}
    </div>
  )
}

// ProductGrid.tsx — SERVER maps to CLIENT cards
// No "use client" — just maps data to ProductCard
export function ProductGrid({ products }: { products: IProduct[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  )
}

// ProductCard.tsx — CLIENT for interactions
"use client"
export function ProductCard({ product }: { product: IProduct }) {
  const { addItem } = useCart()
  // hover, tilt, add to cart
}
```

---

## Data Flow Rules

1. **Pages fetch data** → pass to components as props
2. **Never fetch in Client Components** — receive via props only
3. **All GROQ queries in `lib/sanity/queries.ts`** — never inline in pages
4. **All types in `types/index.ts`** — import from there everywhere
5. **Cart state in Zustand** — never in URL, never in Sanity for test project
6. **Prices always from Sanity server-side** — never trust client-sent prices

---

## Types — `src/types/index.ts`

```ts
export interface IProduct {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  price: number              // EUR (e.g. 7490)
  powerKW: number
  fuelType: 'diesel' | 'petrol' | 'gas' | 'inverter'
  inStock: boolean
  featured?: boolean
  image?: string             // urlFor resolved URL (single)
  images?: string[]          // urlFor resolved URLs (detail page)
  specifications?: ISpecification[]
}

export interface ISpecification {
  key: string
  value: string
}

export interface ICartItem {
  id: string                 // Sanity _id
  name: string
  price: number
  quantity: number
  imageUrl?: string
  powerKW: number
}

export interface IOrderCustomer {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export interface IOrder {
  customer: IOrderCustomer
  items: ICartItem[]
  total: number
  createdAt: string
}

export interface ICategory {
  _id: string
  name: string
  slug: { current: string }
  productCount?: number
}
```

---

## Page Metadata Pattern

Every page.tsx must export metadata or generateMetadata:

```tsx
// Static
export const metadata: Metadata = {
  title: 'Генератори — PowerGen Bulgaria',
  description: 'Промишлени дизелови и инверторни генератори 5kW–2MW.',
}

// Dynamic (product detail)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await sanityFetch<IProduct>(productBySlugQuery, { slug: params.slug })
  return {
    title: `${product.name} — PowerGen Bulgaria`,
    description: product.description?.slice(0, 155),
  }
}
```

---

## Loading & Error States

Every page that fetches data must handle:

```tsx
// Loading — use LoadingSkeleton component
// In Next.js App Router: create loading.tsx next to page.tsx
// loading.tsx:
export default function Loading() {
  return <LoadingSkeleton type="products" />
}

// Error — create error.tsx next to page.tsx
"use client"
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center py-20">
      <p className="font-mono text-stone text-[11px] tracking-widest uppercase mb-4">
        Грешка при зареждане
      </p>
      <button onClick={reset} className="...">Опитай отново</button>
    </div>
  )
}
```

---

## API Route Pattern

```ts
// src/app/api/orders/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const Schema = z.object({ ... })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = Schema.parse(body)
    // logic...
    return NextResponse.json({ success: true, orderId: crypto.randomUUID() })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

---

## Environment Variables

`.env.local` (never commit):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

`.env.example` (commit this — no values):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

**Rule:** `NEXT_PUBLIC_` prefix = safe to expose in browser.
`SANITY_API_TOKEN` = SECRET — only used in Server Components and API routes.