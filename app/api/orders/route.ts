import { NextResponse } from 'next/server'
import { z }            from 'zod'
import { client }       from '@/lib/sanity/client'
import { productPricesQuery } from '@/lib/sanity/queries'
import { OrderSchema }  from '@/lib/schemas/order'
import type { IProduct } from '@/types'

export async function POST(req: Request) {
  try {
    // 1. Parse + validate body — never use raw body values directly
    const body = await req.json()
    const data = OrderSchema.parse(body)

    // 2. Fetch real prices from Sanity — NEVER trust client-submitted prices
    const ids = data.items.map(i => i.productId)
    const sanityProducts = await client.fetch<
      Pick<IProduct, '_id' | 'price' | 'name' | 'inStock'>[]
    >(productPricesQuery, { ids })

    // 3. Validate every ordered product exists and is in stock
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

    // 4. Calculate real total server-side — client total is ignored
    const total = data.items.reduce((sum, item) => {
      const product = sanityProducts.find(p => p._id === item.productId)!
      return sum + product.price * item.quantity
    }, 0)

    // 5. Create mock order (real project: persist to DB + trigger email)
    const orderId = crypto.randomUUID()

    // Test project: log only. Real project: save to DB + send confirmation email.
    console.info('[Order]', orderId, '|', total, 'EUR |', data.customer.name)

    return NextResponse.json({ success: true, orderId, total })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Невалидни данни', details: error.issues },
        { status: 400 }
      )
    }
    console.error('[Order API error]', error)
    return NextResponse.json(
      { error: 'Сървърна грешка. Опитайте отново.' },
      { status: 500 }
    )
  }
}
