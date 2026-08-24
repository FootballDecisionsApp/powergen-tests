'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import type { IChatMessage, IProductSummary } from '@/types'

export interface IChatBubble extends IChatMessage {
  products?: IProductSummary[]
  suggestions?: string[]
}

interface ChatMessageProps {
  message: IChatBubble
  onSuggestionClick: (text: string) => void
}

export function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  const t = useTranslations('chat')
  const isUser = message.role === 'user'

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-2`}>
      <div
        className={`max-w-[85%] px-4 py-3 font-sans text-[13px] leading-relaxed whitespace-pre-line ${
          isUser
            ? 'bg-amber text-navy-dk'
            : 'bg-white/[0.05] border border-white/[0.08] text-white/85'
        }`}
      >
        {message.content}
      </div>

      {message.products && message.products.length > 0 && (
        <div className="flex flex-col gap-1.5 max-w-[85%] w-full">
          {message.products.map(p => (
            <Link
              key={p._id}
              href={`/products/${p.slug.current}`}
              className="flex items-center justify-between px-3 py-2 border border-white/[0.1] font-mono text-[10px] tracking-[0.1em] uppercase text-white/60 hover:border-amber/50 hover:text-white transition-colors duration-150"
            >
              <span className="truncate">{p.name}</span>
              <span className="text-amber ml-2 shrink-0">
                {p.priceOnRequest || p.price == null ? t('priceOnRequest') : `${p.price} EUR`}
              </span>
            </Link>
          ))}
        </div>
      )}

      {message.suggestions && message.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 max-w-[85%]">
          {message.suggestions.map(s => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="px-3 py-2 min-h-[36px] border border-white/[0.12] font-mono text-[10px] tracking-[0.08em] text-white/60 hover:border-amber/50 hover:text-white transition-colors duration-150"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
