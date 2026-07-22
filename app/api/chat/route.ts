import { NextResponse }   from 'next/server'
import { z }              from 'zod'
import { client }         from '@/lib/sanity/client'
import { allProductsQuery } from '@/lib/sanity/queries'
import { ChatRequestSchema } from '@/lib/schemas/chat'
import { ruleEngine }     from '@/lib/chat/ruleEngine'
import type { IProduct }  from '@/types'

export async function POST(req: Request) {
  try {
    // 1. Parse + validate body — never use raw body values directly
    const body = await req.json()
    const data = ChatRequestSchema.parse(body)

    // 2. Fetch live product catalog from Sanity — the engine never trusts
    //    client-supplied product facts, only what's fetched here server-side
    const products = await client.fetch<IProduct[]>(allProductsQuery, { locale: data.locale })

    // 3. Run the (currently rule-based) chat engine against real catalog data
    const answer = ruleEngine.answer(data.message, data.history, products, data.locale)

    return NextResponse.json(answer)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Невалидни данни', details: error.issues },
        { status: 400 }
      )
    }
    console.error('[Chat API error]', error)
    return NextResponse.json(
      { error: 'Сървърна грешка. Опитайте отново.' },
      { status: 500 }
    )
  }
}
