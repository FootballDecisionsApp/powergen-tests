import { Link } from '@/lib/navigation'
import { absoluteUrl } from '@/lib/seo'

export interface IBreadcrumbItem {
  label: string
  /** Locale-relative route ('/products'). Omit on the current (last) page. */
  href?: string
}

interface BreadcrumbsProps {
  items: IBreadcrumbItem[]
  locale: string
  /** Localised aria-label for the nav landmark. */
  label: string
  /** 'dark' for navy sections (the default across this site), 'light' for cream. */
  variant?: 'dark' | 'light'
  className?: string
}

const styles = {
  dark: {
    link: 'text-white/25 hover:text-amber/60',
    current: 'text-amber/60',
    separator: 'text-white/15',
  },
  light: {
    link: 'text-dust hover:text-stone',
    current: 'text-stone',
    separator: 'text-border',
  },
} as const

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList JSON-LD, so search
 * engines render the trail in results instead of a bare URL. Kept in one
 * component to guarantee the markup and the structured data never drift apart.
 */
export function Breadcrumbs({
  items,
  locale,
  label,
  variant = 'dark',
  className = '',
}: BreadcrumbsProps) {
  const s = styles[variant]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(locale, item.href === '/' ? '' : item.href) } : {}),
    })),
  }

  return (
    <>
      <nav aria-label={label} className={`flex items-center flex-wrap gap-x-2 gap-y-1 ${className}`}>
        <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && (
                  <span className={`font-mono text-[9px] select-none ${s.separator}`} aria-hidden="true">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] uppercase ${s.current}`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-150 ${s.link}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
