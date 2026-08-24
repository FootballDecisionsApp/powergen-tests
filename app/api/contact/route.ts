import { NextResponse }        from 'next/server'
import { z }                   from 'zod'
import { ContactMessageSchema } from '@/lib/schemas/contact'

export async function POST(req: Request) {
  try {
    // 1. Parse + validate body — never use raw body values directly
    const body = await req.json()
    const data = ContactMessageSchema.parse(body)

    // 2. Create mock message (real project: persist to DB + notify team)
    const messageId = crypto.randomUUID()

    // Test project: log only. Real project: save to DB + send notification email.
    console.info('[Contact]', messageId, '|', data.email, '|', data.name)

    return NextResponse.json({ success: true, messageId })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Невалидни данни', details: error.issues },
        { status: 400 }
      )
    }
    console.error('[Contact API error]', error)
    return NextResponse.json(
      { error: 'Сървърна грешка. Опитайте отново.' },
      { status: 500 }
    )
  }
}
