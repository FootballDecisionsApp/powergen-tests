'use client'

import { useState, useEffect }   from 'react'
import { useTranslations }        from 'next-intl'
import { useRouter }              from '@/lib/navigation'
import { Link }                   from '@/lib/navigation'
import { useForm }                from 'react-hook-form'
import { zodResolver }            from '@hookform/resolvers/zod'
import Image                      from 'next/image'
import { useCart }                from '@/lib/store/cart'
import { OrderCustomerSchema, type TOrderCustomer } from '@/lib/schemas/order'

// ─── Form field ───────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35">
        {label}{required && <span className="text-amber/70 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-mono text-[9px] tracking-[0.1em] text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-3 bg-navy border border-white/[0.1] font-sans text-[14px] text-white/80 placeholder:text-white/20 outline-none transition-colors duration-200 focus:border-amber/50 min-h-[44px] aria-[invalid=true]:border-red-400/50'

// ─── Stepper ─────────────────────────────────────────────────────────────────

function Stepper({ labels }: { labels: { cart: string; details: string; confirm: string } }) {
  return (
    <div className="flex items-center gap-0 mt-6 mb-10">
      {/* Step 1 — Cart (done) */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 bg-amber/20 border border-amber/40 flex items-center justify-center">
          <svg className="w-3 h-3 text-amber" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 6l3 3 5-5"/>
          </svg>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.15em] uppercase text-amber/50">{labels.cart}</span>
      </div>
      <div className="flex-1 h-px bg-white/[0.06] mx-3" />

      {/* Step 2 — Details (active) */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 bg-amber flex items-center justify-center">
          <span className="font-mono text-[9px] font-bold text-navy-dk">2</span>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.15em] uppercase text-amber">{labels.details}</span>
      </div>
      <div className="flex-1 h-px bg-white/[0.06] mx-3" />

      {/* Step 3 — Confirm (pending) */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 border border-white/[0.1] flex items-center justify-center">
          <span className="font-mono text-[9px] text-white/20">3</span>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.15em] uppercase text-white/20">{labels.confirm}</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const t = useTranslations('checkout')
  const router  = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [mounted,  setMounted]  = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TOrderCustomer>({ resolver: zodResolver(OrderCustomerSchema) })

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (mounted && items.length === 0) router.replace('/products')
  }, [mounted, items.length, router])

  const total    = getTotalPrice()
  const freeShip = total > 5000

  const onSubmit = async (data: TOrderCustomer) => {
    setApiError(null)
    try {
      const res = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: data,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
        }),
      })
      const json: { success?: boolean; orderId?: string; error?: string } = await res.json()
      if (!res.ok) { setApiError(json.error ?? t('errorGeneric')); return }
      clearCart()
      router.push(`/checkout/success?orderId=${json.orderId ?? ''}`)
    } catch {
      setApiError(t('errorNetwork'))
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-navy-dk pt-[72px]">

      {/* ── HERO STRIP ── */}
      <div className="relative bg-navy-dk border-b border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-10">
          <nav className="flex items-center gap-2 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-amber/60 transition-colors">{t('breadcrumbHome')}</Link>
            <span className="text-white/15 font-mono text-[9px]">/</span>
            <Link href="/cart" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-amber/60 transition-colors">{t('breadcrumbCart')}</Link>
            <span className="text-white/15 font-mono text-[9px]">/</span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber/60">{t('breadcrumbOrder')}</span>
          </nav>
          <h1 className="font-display text-[40px] sm:text-[52px] leading-[0.92] text-white">
            {t('heading1')} <span className="text-amber">{t('headingAccent')}</span>
          </h1>
          <Stepper labels={{ cart: t('stepCart'), details: t('stepDetails'), confirm: t('stepConfirm') }} />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">

          {/* ── LEFT: Form ── */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5 pb-4 border-b border-white/[0.06]">
                {t('sectionDelivery')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FormField label={t('fieldName')} error={errors.name?.message} required>
                    <input {...register('name')} placeholder="Иван Иванов" aria-invalid={errors.name ? 'true' : 'false'} className={inputClass}/>
                  </FormField>
                </div>

                <FormField label={t('fieldEmail')} error={errors.email?.message} required>
                  <input {...register('email')} type="email" placeholder="ivan@example.com" aria-invalid={errors.email ? 'true' : 'false'} className={inputClass}/>
                </FormField>

                <FormField label={t('fieldPhone')} error={errors.phone?.message} required>
                  <input {...register('phone')} type="tel" placeholder="+359888123456" aria-invalid={errors.phone ? 'true' : 'false'} className={inputClass}/>
                </FormField>

                <div className="sm:col-span-2">
                  <FormField label={t('fieldAddress')} error={errors.address?.message} required>
                    <input {...register('address')} placeholder="ул. Граф Игнатиев 15" aria-invalid={errors.address ? 'true' : 'false'} className={inputClass}/>
                  </FormField>
                </div>

                <FormField label={t('fieldCity')} error={errors.city?.message} required>
                  <input {...register('city')} placeholder="София" aria-invalid={errors.city ? 'true' : 'false'} className={inputClass}/>
                </FormField>

                <FormField label={t('fieldPostalCode')} error={errors.postalCode?.message} required>
                  <input {...register('postalCode')} placeholder="1000" aria-invalid={errors.postalCode ? 'true' : 'false'} className={inputClass}/>
                </FormField>

                <div className="sm:col-span-2">
                  <FormField label={t('fieldNotes')} error={errors.notes?.message}>
                    <textarea
                      {...register('notes')}
                      rows={3}
                      placeholder={t('notesPlaceholder')}
                      aria-invalid={errors.notes ? 'true' : 'false'}
                      className="w-full px-4 py-3 bg-navy border border-white/[0.1] font-sans text-[14px] text-white/80 placeholder:text-white/20 outline-none transition-colors duration-200 focus:border-amber/50 resize-none min-h-[100px] aria-[invalid=true]:border-red-400/50"
                    />
                  </FormField>
                </div>
              </div>

              {/* Payment */}
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mt-8 mb-5 pb-4 border-b border-white/[0.06]">
                {t('sectionPayment')}
              </p>

              <div className="border border-amber/25 bg-amber/[0.04] px-5 py-4 flex items-start gap-4">
                <div className="w-5 h-5 shrink-0 bg-amber flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-navy-dk" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 6l3 3 5-5"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/70 mb-1">
                    {t('paymentMethod')}
                  </p>
                  <p className="font-mono text-[9px] text-white/30">
                    {t('paymentNote')}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg className="w-3 h-3 text-white/20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="7" width="12" height="8" rx="1"/>
                      <path d="M5 7V5a3 3 0 016 0v2"/>
                    </svg>
                    <span className="font-mono text-[9px] text-white/20">{t('secureOrder')}</span>
                  </div>
                </div>
              </div>

              {/* API error */}
              {apiError && (
                <div className="mt-4 bg-red-500/5 border border-red-500/20 px-4 py-3">
                  <p className="font-sans text-[13px] text-red-400">{apiError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full min-h-[52px] bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-navy-dk/30 border-t-navy-dk rounded-full animate-spin"/>
                    {t('submitting')}
                  </>
                ) : (
                  t('submitBtn')
                )}
              </button>

            </form>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-navy border border-white/[0.08] p-5 sm:p-6">

              <h2 className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mb-4 pb-4 border-b border-white/[0.06]">
                {t('summary')}
              </h2>

              {/* Item list */}
              <div className="mb-4 flex flex-col gap-0">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b border-white/[0.04]">
                    <div className="relative w-14 h-14 shrink-0 bg-navy-dk border border-white/[0.08]">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1.5" sizes="56px"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-mono text-[8px] text-white/15">IMG</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[13px] text-white/70 leading-snug line-clamp-2">{item.name}</p>
                      <p className="font-mono text-[9px] text-white/25 mt-0.5">{item.quantity}×</p>
                    </div>
                    <p className="font-display text-[18px] text-amber shrink-0 leading-none">
                      {(item.price * item.quantity).toLocaleString('bg-BG')}
                      <span className="font-mono text-[9px] text-white/30 ml-1">EUR</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between py-2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30">{t('labelProducts')}</span>
                <span className="font-mono text-[11px] text-white/60">{total.toLocaleString('bg-BG')} EUR</span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between py-2 border-b border-white/[0.06] pb-4 mb-4">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30">{t('labelShipping')}</span>
                <span className={`font-mono text-[10px] ${freeShip ? 'text-amber' : 'text-white/40'}`}>
                  {freeShip ? t('shippingFree') : t('shippingNegotiated')}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-end justify-between">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40">{t('labelTotal')}</span>
                <div className="text-right">
                  <p className="font-display text-[36px] text-amber leading-none">{total.toLocaleString('bg-BG')}</p>
                  <p className="font-mono text-[9px] text-white/25 mt-0.5">{t('priceWithVat')}</p>
                </div>
              </div>

              {/* Back */}
              <Link
                href="/cart"
                className="mt-5 block text-center font-mono text-[9px] tracking-[0.15em] uppercase text-white/20 hover:text-white/40 transition-colors"
              >
                {t('editCart')}
              </Link>
            </div>
          </div>

        </div>
      </div>

    </main>
  )
}
