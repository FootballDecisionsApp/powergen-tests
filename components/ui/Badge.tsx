interface BadgeProps {
  variant: 'new' | 'sale' | 'top' | 'stock' | 'industrial'
  label: string
}

const variants: Record<BadgeProps['variant'], string> = {
  new:        'bg-black text-paper',
  sale:       'bg-red text-white',
  top:        'bg-amber text-paper',
  stock:      'bg-green text-white',
  industrial: 'bg-charcoal text-paper',
}

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 font-mono text-[8px] font-bold tracking-[2px] uppercase ${variants[variant]}`}
    >
      {label}
    </span>
  )
}
