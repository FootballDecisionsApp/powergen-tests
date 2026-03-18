'use client'

import Link from 'next/link'

interface ButtonProps {
  variant?: 'fill' | 'outline' | 'ghost'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const base =
  'group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 sm:px-8 sm:py-3.5 min-h-[44px] font-cond font-bold text-[11px] tracking-[2.5px] uppercase transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed'

const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
  fill:    'bg-black text-paper hover:bg-amber',
  outline: 'border border-border bg-transparent text-stone hover:border-black hover:text-black hover:bg-cream-dark',
  ghost:   'bg-transparent text-stone hover:text-black',
}

export function Button({
  variant = 'fill',
  children,
  onClick,
  href,
  className = '',
  disabled,
  type = 'button',
}: ButtonProps) {
  const classes = `${base} ${styles[variant]} ${className}`

  const shimmer = (
    <span
      aria-hidden="true"
      className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
    />
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {variant === 'fill' && shimmer}
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {variant === 'fill' && shimmer}
      {children}
    </button>
  )
}
