# Skill 04 — Security
# API Route Validation, Zod Schemas, Safe Patterns

Read this file before creating any API route or form.

---

## Every API Route Checklist

Before marking an API route as done, verify ALL of these:

- [ ] Request body validated with Zod — no raw `req.json()` usage
- [ ] Proper try/catch with typed error handling
- [ ] ZodError returns 400, other errors return 500
- [ ] Prices fetched from Sanity server-side — never trusted from client
- [ ] No secrets in response body
- [ ] `SANITY_API_TOKEN` only used server-side (no `NEXT_PUBLIC_` prefix)
- [ ] Return type is consistent JSON

---

## Zod Schemas

### Order Schema (mock checkout)
```ts
import { z } from 'zod'

export const OrderCustomerSchema = z.object({
  name: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символа'),
  email: z
    .string()
    .email('Невалиден имейл адрес'),
  phone: z
    .string()
    .regex(
      /^(\+359|0)\d{8,9}$/,
      'Невалиден телефонен номер — формат: +359XXXXXXXXX или 0XXXXXXXXX'
    ),
  address: z
    .string()
    .min(5, 'Въведете пълен адрес')
    .max(200),
  city: z
    .string()
    .min(2, 'Въведете град')
    .max(100),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, 'Пощенски код трябва да е 4 цифри'),
  notes: z.string().max(500).optional(),
})

export const OrderItemSchema = z.object({
  productId: z.string().min(1),
  quantity:  z.number().int().min(1).max(10),
})

export const OrderSchema = z.object({
  customer: OrderCustomerSchema,
  items:    z.array(OrderItemSchema).min(1, 'Количката е празна'),
})

export type TOrder         = z.infer<typeof OrderSchema>
export type TOrderCustomer = z.infer<typeof OrderCustomerSchema>
```

---

## API Route Template

```ts
// src/app/api/orders/route.ts
import { NextResponse }   from 'next/server'
import { z }              from 'zod'
import { client }         from '@/lib/sanity/client'
import { productPricesQuery } from '@/lib/sanity/queries'
import { OrderSchema }    from '@/lib/schemas/order'
import type { IProduct }  from '@/types'

export async function POST(req: Request) {
  try {
    // 1. Parse + validate body
    const body = await req.json()
    const data = OrderSchema.parse(body)

    // 2. Fetch real prices from Sanity — NEVER trust client prices
    const ids = data.items.map(i => i.productId)
    const sanityProducts = await client.fetch<Pick<IProduct, '_id' | 'price' | 'name' | 'inStock'>[]>(
      productPricesQuery,
      { ids }
    )

    // 3. Validate all products exist and are in stock
    for (const item of data.items) {
      const product = sanityProducts.find(p => p._id === item.productId)
      if (!product) {
        return NextResponse.json(
          { error: `Продуктът не е намерен: ${item.productId}` },
          { status: 400 }
        )
      }
      if (!product.inStock) {
        return NextResponse.json(
          { error: `${product.name} не е в наличност` },
          { status: 400 }
        )
      }
    }

    // 4. Calculate real total server-side
    const total = data.items.reduce((sum, item) => {
      const product = sanityProducts.find(p => p._id === item.productId)!
      return sum + product.price * item.quantity
    }, 0)

    // 5. Create mock order (real project: save to DB + send email)
    const orderId = crypto.randomUUID()
    const order = {
      orderId,
      customer: data.customer,
      items: data.items.map(item => {
        const product = sanityProducts.find(p => p._id === item.productId)!
        return { ...item, name: product.name, price: product.price }
      }),
      total,
      createdAt: new Date().toISOString(),
    }

    // In test project: just log. Real project: save + send email.
    console.info('New order:', orderId, total, 'EUR')

    return NextResponse.json({ success: true, orderId, total })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Невалидни данни', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Сървърна грешка. Опитайте отново.' },
      { status: 500 }
    )
  }
}
```

---

## React Hook Form + Zod Integration

```tsx
// In checkout/page.tsx
"use client"
import { useForm }           from 'react-hook-form'
import { zodResolver }       from '@hookform/resolvers/zod'
import { OrderCustomerSchema, type TOrderCustomer } from '@/lib/schemas/order'

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TOrderCustomer>({
    resolver: zodResolver(OrderCustomerSchema),
  })

  const onSubmit = async (data: TOrderCustomer) => {
    const { items, getTotalPrice } = useCart.getState()

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: data,
        items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
        // NOTE: do NOT send prices — server fetches them from Sanity
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      // show error toast
      return
    }

    const { orderId } = await res.json()
    router.push(`/checkout/success?orderId=${orderId}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[2px] uppercase text-stone">
          Три имена <span className="text-red">*</span>
        </label>
        <input
          {...register('name')}
          className="w-full px-4 py-3 bg-paper border border-border
                     font-sans text-[14px] text-black placeholder:text-dust
                     outline-none transition-colors duration-200
                     focus:border-amber min-h-[44px]
                     aria-[invalid=true]:border-red"
          aria-invalid={errors.name ? 'true' : 'false'}
          placeholder="Иван Иванов"
        />
        {errors.name && (
          <p className="font-mono text-[9px] tracking-[1px] text-red" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      {/* ... other fields */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[52px] bg-black text-paper
                   font-cond font-bold text-[12px] tracking-[3px] uppercase
                   transition-all duration-300 hover:bg-amber
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-paper/30
                             border-t-paper rounded-full animate-spin" />
            Изпращане...
          </>
        ) : (
          'Потвърди поръчката'
        )}
      </button>
    </form>
  )
}
```

---

## Environment Variable Rules

```ts
// SAFE — can use in Client Components
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
process.env.NEXT_PUBLIC_SANITY_DATASET

// SECRET — Server Components and API routes ONLY
process.env.SANITY_API_TOKEN
```

**Never do this in a Client Component:**
```ts
// ❌ WRONG — exposes secret to browser
const token = process.env.SANITY_API_TOKEN

// ✅ CORRECT — use in Server Component or API route only
```

---

## Forbidden Patterns

```ts
// ❌ No raw .json() without validation
const body = await req.json()
doSomething(body.price)  // WRONG — body.price could be anything

// ✅ Always parse with Zod first
const data = OrderSchema.parse(await req.json())

// ❌ No trusting client prices
const total = req.body.total  // WRONG

// ✅ Always fetch prices server-side
const products = await client.fetch(productPricesQuery, { ids })
const total = calculateFromSanityPrices(products, items)

// ❌ No unhandled promise rejections
fetch('/api/orders').then(r => r.json()).then(...)  // missing .catch()

// ✅ Always handle errors
try {
  const res = await fetch('/api/orders', {...})
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
} catch (error) {
  // handle
}
```