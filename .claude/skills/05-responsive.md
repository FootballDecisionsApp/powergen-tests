# Skill 05 — Responsive Design
# Mobile-First Rules, Breakpoints, Mobile Nav, Touch Targets

Read this file for every component and layout that renders on screen.

---

## Core Principle: Mobile-First

Write base styles for mobile (320px+), then add responsive prefixes for larger screens.

```tsx
// ❌ WRONG — desktop-first, breaks on mobile
<div className="grid-cols-3 lg:grid-cols-1">

// ✅ CORRECT — mobile-first
<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

---

## Breakpoints (Tailwind defaults — use these)

| Prefix | Min-width | Target device |
|--------|-----------|---------------|
| (none) | 0px       | Mobile (320px–639px) |
| `sm:`  | 640px     | Large mobile / small tablet |
| `md:`  | 768px     | Tablet |
| `lg:`  | 1024px    | Desktop |
| `xl:`  | 1280px    | Large desktop |

Primary design targets: **375px mobile**, **768px tablet**, **1280px desktop**.

---

## Layout Patterns

### Page Container
```tsx
<main className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
```

### Section Padding
```tsx
<section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-16">
```

### Two-Column Layout (splits at lg)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
```

### Three-Column Product Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-border border border-border">
```

### Sidebar + Main (products page)
```tsx
// Stacks on mobile, side by side on desktop
<div className="flex flex-col lg:flex-row gap-0">
  {/* Sidebar — hidden on mobile, shown as drawer/accordion */}
  <aside className="hidden lg:block w-56 xl:w-64 shrink-0 border-r border-border">
    <FilterSidebar />
  </aside>

  {/* Mobile filter bar — shown only on mobile */}
  <div className="lg:hidden border-b border-border">
    <MobileFilterBar />
  </div>

  <main className="flex-1 min-w-0">
    <ProductGrid products={products} />
  </main>
</div>
```

### Hero Section
```tsx
<section className="
  min-h-[100svh]
  grid grid-cols-1 lg:grid-cols-2
  items-center
  px-4 sm:px-8 lg:px-16
  pt-20 pb-12 lg:py-0
  gap-12 lg:gap-0
">
  <div>{/* Left — text */}</div>
  {/* Generator illustration — hidden on small mobile, shown from sm */}
  <div className="hidden sm:flex items-center justify-center">
    {/* SVG illustration */}
  </div>
</section>
```

---

## Touch Targets

All interactive elements must be at least **44×44px** — Apple HIG and WCAG 2.5.5.

```tsx
// ❌ Too small
<button className="w-6 h-6">+</button>

// ✅ Minimum touch target
<button className="w-11 h-11 flex items-center justify-center">+</button>

// ✅ Text buttons — ensure min-height
<button className="px-6 py-3 min-h-[44px]">Add to cart</button>

// ✅ Nav links — add padding for touch area
<a className="flex items-center px-3 py-3 min-h-[44px]">Products</a>
```

---

## Header & Mobile Navigation

### Header Component
```tsx
"use client"

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <>
      <header className="
        fixed top-0 left-0 right-0 z-50
        px-4 sm:px-8 lg:px-16
        h-16 sm:h-18
        flex items-center justify-between
        transition-all duration-300
        border-b border-transparent
        [&.scrolled]:bg-paper/95 [&.scrolled]:border-border [&.scrolled]:backdrop-blur-xl
      " id="site-header">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 border-[1.5px] border-black flex items-center justify-center">
            {/* Logo SVG */}
          </div>
          <span className="font-cond font-bold text-[18px] sm:text-[20px] tracking-[4px] uppercase">
            POWER<span className="text-amber">GEN</span>
          </span>
        </a>

        {/* Desktop Nav — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          <a href="/products" className="font-cond font-semibold text-[11px] tracking-[2px] uppercase text-stone hover:text-black transition-colors">
            Генератори
          </a>
          <a href="/products?category=industrial" className="font-cond font-semibold text-[11px] tracking-[2px] uppercase text-stone hover:text-black transition-colors">
            Промишлени
          </a>
          <a href="#contact" className="font-cond font-semibold text-[11px] tracking-[2px] uppercase text-stone hover:text-black transition-colors">
            Контакт
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart button */}
          <a href="/cart" className="
            relative flex items-center gap-2 px-3 sm:px-4 py-2
            border border-border min-h-[44px]
            font-cond font-bold text-[11px] tracking-[2px] uppercase
            transition-all duration-200 hover:border-black hover:text-black
          ">
            <span className="hidden sm:inline">Количка</span>
            {/* Cart icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="
                absolute -top-1.5 -right-1.5
                w-5 h-5 rounded-full bg-amber text-paper
                font-mono text-[10px] font-bold
                flex items-center justify-center
              ">
                {totalItems}
              </span>
            )}
          </a>

          {/* Hamburger — shown only on mobile/tablet */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
            aria-label="Отвори менюто"
            aria-expanded={mobileNavOpen}
          >
            <span className="w-5 h-px bg-black block transition-all" />
            <span className="w-5 h-px bg-black block transition-all" />
            <span className="w-3 h-px bg-black block transition-all ml-auto" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  )
}
```

### MobileNav Component
```tsx
"use client"

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Nav panel — slides in from right */}
      <nav
        className={`
          fixed top-0 right-0 bottom-0 z-50
          w-[min(320px,85vw)]
          bg-paper flex flex-col
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <span className="font-cond font-bold text-[18px] tracking-[4px] uppercase">
            POWER<span className="text-amber">GEN</span>
          </span>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-stone hover:text-black"
            aria-label="Затвори менюто"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col p-6 gap-1 flex-1" role="list">
          {[
            { href: '/',                    label: 'Начало' },
            { href: '/products',            label: 'Всички генератори' },
            { href: '/products?fuelType=diesel',  label: 'Дизелови' },
            { href: '/products?fuelType=inverter', label: 'Инверторни' },
            { href: '/products?fuelType=gas',     label: 'Газови' },
          ].map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="
                  flex items-center justify-between
                  px-4 py-4 min-h-[52px]
                  font-cond font-semibold text-[13px] tracking-[1.5px] uppercase
                  text-stone hover:text-black hover:bg-cream
                  transition-colors duration-150
                  border-b border-border-light
                "
              >
                {item.label}
                <svg className="w-4 h-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div className="p-6 border-t border-border">
          <a href="/products" onClick={onClose} className="
            flex items-center justify-center w-full min-h-[52px]
            bg-black text-paper
            font-cond font-bold text-[12px] tracking-[2.5px] uppercase
            transition-colors hover:bg-amber
          ">
            Разгледай каталога
          </a>
        </div>
      </nav>
    </>
  )
}
```

---

## Cart Drawer (Mobile-Optimized)

```tsx
// Full-height drawer on mobile, fixed right panel on desktop
<div className={`
  fixed inset-y-0 right-0 z-50
  w-full sm:w-[420px]
  bg-paper flex flex-col
  transition-transform duration-300 ease-out
  ${open ? 'translate-x-0' : 'translate-x-full'}
`}>
```

---

## Typography — Mobile Scaling

```tsx
// Hero headline — scales from 48px mobile to 100px desktop
<h1 className="font-serif font-light text-5xl sm:text-7xl lg:text-9xl leading-[0.9] tracking-tight">

// Section title
<h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-7xl leading-[0.93]">

// Product card title
<h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug">

// Price
<p className="font-serif text-2xl sm:text-3xl font-light">
```

---

## Image Responsive Rules

```tsx
// Always use Next.js Image with sizes prop
<Image
  src={url}
  alt={alt}
  fill                       // for aspect-ratio containers
  className="object-cover"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
/>

// Product image container — maintains aspect ratio
<div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] overflow-hidden">
  <Image src={url} alt={alt} fill className="object-contain p-6" sizes="..." />
</div>
```

---

## Spec Cards on Mobile

```tsx
// Specs grid: 1 col on mobile, 2 on tablet+
<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
  {specs.map(spec => (
    <div key={spec.key} className="bg-paper px-4 py-3 sm:px-5 sm:py-4">
      <p className="font-mono text-[9px] tracking-[2px] uppercase text-dust mb-1">
        {spec.key}
      </p>
      <p className="font-serif text-lg sm:text-xl font-normal text-black">
        {spec.value}
      </p>
    </div>
  ))}
</div>
```

---

## Checkout Form — Mobile Layout

```tsx
// Single column on mobile, two columns on desktop for name/email
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <FormField name="name" label="Три имена" />
  <FormField name="email" label="Имейл" />
</div>

// Order summary — below form on mobile, aside on desktop
<div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
  <div>{/* Form */}</div>
  <div className="lg:sticky lg:top-24">{/* Order summary */}</div>
</div>
```

---

## Mobile Filter on Products Page

On mobile, filters are hidden behind a sticky "Filter" button:

```tsx
// Sticky filter toggle bar — mobile only
<div className="lg:hidden sticky top-16 z-30 bg-paper border-b border-border px-4 py-3 flex items-center justify-between">
  <button
    onClick={() => setFilterOpen(true)}
    className="flex items-center gap-2 min-h-[44px] font-cond font-semibold text-[11px] tracking-[2px] uppercase"
  >
    {/* Filter icon */}
    Филтри {activeFilterCount > 0 && (
      <span className="w-5 h-5 rounded-full bg-amber text-paper text-[10px] font-bold flex items-center justify-center">
        {activeFilterCount}
      </span>
    )}
  </button>
  <p className="font-mono text-[10px] tracking-[1px] text-dust">
    {productCount} продукта
  </p>
</div>

// Mobile filter drawer
<div className={`
  fixed inset-0 z-50 lg:hidden
  transition-opacity duration-200
  ${filterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
`}>
  <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
  <div className={`
    absolute bottom-0 left-0 right-0 bg-paper
    max-h-[85vh] overflow-y-auto
    transition-transform duration-300
    ${filterOpen ? 'translate-y-0' : 'translate-y-full'}
  `}>
    {/* Filter content */}
  </div>
</div>
```

---

## General Mobile Checklist

Before marking any component done, verify:
- [ ] Renders correctly at 375px width (iPhone SE)
- [ ] Renders correctly at 390px width (iPhone 14)
- [ ] Renders correctly at 768px width (iPad)
- [ ] No horizontal overflow / scroll on mobile
- [ ] All tap targets ≥ 44×44px
- [ ] Text is readable without zooming (min 14px body, 11px labels)
- [ ] Images don't overflow their containers
- [ ] Forms stack to single column on mobile
- [ ] Mobile nav works (hamburger → overlay → close)
- [ ] No fixed elements that overlap content on small screens
- [ ] Cart drawer is full-width on mobile