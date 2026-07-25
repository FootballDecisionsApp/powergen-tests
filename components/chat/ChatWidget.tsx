'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { greetingAnswer } from '@/lib/chat/intents'
import type { TChatLocale } from '@/lib/chat/engine'
import { ChatMessage, type IChatBubble } from './ChatMessage'
import type { IChatAnswer } from '@/types'

const SEEN_KEY = 'chat-widget-seen'

export function ChatWidget() {
  const t = useTranslations('chat')
  const locale = useLocale() as TChatLocale

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [messages, setMessages] = useState<IChatBubble[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setPulse(!window.localStorage.getItem(SEEN_KEY))
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  function handleToggle() {
    const next = !open
    setOpen(next)
    if (next) {
      window.localStorage.setItem(SEEN_KEY, '1')
      setPulse(false)
      if (messages.length === 0) {
        const greeting = greetingAnswer(locale)
        setMessages([{ role: 'assistant', content: greeting.reply, suggestions: greeting.suggestions }])
      }
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const history = messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
    setMessages(prev => [...prev, { role: 'user', content: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, locale }),
      })
      if (!res.ok) throw new Error(await res.text())
      const answer: IChatAnswer = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: answer.reply, suggestions: answer.suggestions, products: answer.products }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t('errorGeneric') }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={handleToggle}
        aria-label={open ? t('closeChat') : t('openChat')}
        aria-expanded={open}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 flex items-center justify-center bg-amber text-navy-dk shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-amber-light active:scale-95"
      >
        {mounted && pulse && !open && (
          <span className="absolute inset-0 -z-10 bg-amber/60 animate-ping" aria-hidden="true" />
        )}
        {open ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label={t('panelTitle')}
        className={`fixed z-[60] bg-navy flex flex-col transition-all duration-300 ease-out
          inset-0
          sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[min(600px,70vh)] sm:border sm:border-white/[0.08]
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 h-16 border-b border-white/[0.08] flex-shrink-0">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/60">
            {t('panelTitle')}
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label={t('closeChat')}
            className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 flex flex-col gap-4">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} onSuggestionClick={sendMessage} />
          ))}
          {loading && (
            <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.05] border border-white/[0.08] w-fit">
              <span className="w-1.5 h-1.5 bg-white/40 animate-pulse [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-white/40 animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-white/40 animate-pulse [animation-delay:300ms]" />
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
          className="flex-shrink-0 flex items-center gap-2 p-3 sm:p-4 border-t border-white/[0.08]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('inputPlaceholder')}
            maxLength={300}
            className="flex-1 min-h-[44px] px-3 bg-white/[0.05] border border-white/[0.1] font-sans text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-amber/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={t('send')}
            className="w-11 h-11 flex items-center justify-center shrink-0 bg-amber text-navy-dk transition-all duration-200 hover:bg-amber-light disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
