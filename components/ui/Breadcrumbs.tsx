import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Навигационен път">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span className="font-mono text-[9px] text-border select-none">/</span>
              )}
              {isLast || !item.href ? (
                <span
                  className="font-mono text-[9px] tracking-[1.5px] uppercase text-stone"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-mono text-[9px] tracking-[1.5px] uppercase text-dust hover:text-stone transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
