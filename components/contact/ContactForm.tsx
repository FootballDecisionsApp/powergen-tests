'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactMessageSchema, type TContactMessage } from '@/lib/schemas/contact'
import { trackEvent } from '@/lib/analytics'
import { Link } from '@/lib/navigation'

export function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TContactMessage>({
    resolver: zodResolver(ContactMessageSchema),
  })

  async function onSubmit(data: TContactMessage) {
    setStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(await res.text())

      trackEvent({ name: 'contact_form_submitted', props: {} })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 mt-8">
      <h2 className="font-mono text-[9px] tracking-[0.25em] uppercase text-amber mb-1">
        {t('formHeading')}
      </h2>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40">
          {t('formName')}
        </label>
        <input
          {...register('name')}
          className="w-full px-4 py-3 bg-navy border border-white/[0.12] font-sans text-[14px] text-white
                     placeholder:text-white/25 outline-none transition-colors duration-200
                     focus:border-amber min-h-[44px] aria-[invalid=true]:border-red-400"
          aria-invalid={errors.name ? 'true' : 'false'}
          placeholder={t('formNamePlaceholder')}
        />
        {errors.name && (
          <p className="font-mono text-[9px] tracking-[0.05em] text-red-400" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40">
          {t('formEmail')}
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-3 bg-navy border border-white/[0.12] font-sans text-[14px] text-white
                     placeholder:text-white/25 outline-none transition-colors duration-200
                     focus:border-amber min-h-[44px] aria-[invalid=true]:border-red-400"
          aria-invalid={errors.email ? 'true' : 'false'}
          placeholder={t('formEmailPlaceholder')}
        />
        {errors.email && (
          <p className="font-mono text-[9px] tracking-[0.05em] text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40">
          {t('formMessage')}
        </label>
        <textarea
          rows={4}
          {...register('message')}
          className="w-full px-4 py-3 bg-navy border border-white/[0.12] font-sans text-[14px] text-white
                     placeholder:text-white/25 outline-none transition-colors duration-200 resize-none
                     focus:border-amber aria-[invalid=true]:border-red-400"
          aria-invalid={errors.message ? 'true' : 'false'}
          placeholder={t('formMessagePlaceholder')}
        />
        {errors.message && (
          <p className="font-mono text-[9px] tracking-[0.05em] text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[52px] mt-2 bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase
                   transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('formSubmitting') : t('formSubmit')}
      </button>

      {/* GDPR Art. 13 — tell people how their data is handled where they hand it over */}
      <p className="font-sans font-light text-[12px] leading-relaxed text-white/35">
        {t.rich('formPrivacyNotice', {
          link: (chunks) => (
            <Link href="/privacy" className="text-amber/70 hover:text-amber underline underline-offset-2">
              {chunks}
            </Link>
          ),
        })}
      </p>

      {status === 'success' && (
        <p className="font-mono text-[10px] tracking-[0.1em] text-amber" role="status">
          {t('formSuccess')}
        </p>
      )}
      {status === 'error' && (
        <p className="font-mono text-[10px] tracking-[0.1em] text-red-400" role="alert">
          {t('formErrorGeneric')}
        </p>
      )}
    </form>
  )
}
