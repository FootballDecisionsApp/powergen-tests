# Skill 01 — Design System
# "Industrial Precision" Theme

Read this file completely before writing any UI code.

---

## Core Concept
Premium light industrial aesthetic. Think Atlas Copco, Perkins, CAT — European
industrial brands that feel trustworthy, precise, and serious.
NOT dark/gaming. NOT startup/pastel. NOT corporate/blue.

Key visual language:
- Warm cream backgrounds (not cold white)
- Serif typography for headings (editorial, confident)
- Condensed sans for UI labels (technical, efficient)
- Amber/ochre accent (diesel, warning lights, precision instruments)
- Fine hairline borders (engineering drawings)
- Subtle grain texture overlay (tactile, premium)

---

## Color Palette

Define in `src/app/globals.css` as CSS custom properties:

```css
:root {
  /* Backgrounds */
  --color-cream:       #F6F3EC;   /* page background */
  --color-paper:       #FDFCF8;   /* cards, inputs, panels */
  --color-cream-dark:  #EDE8DF;   /* hover states, alt sections */

  /* Text */
  --color-black:       #0E0C09;   /* primary text, headings */
  --color-charcoal:    #2C2A26;   /* secondary headings */
  --color-stone:       #6B6860;   /* body text, descriptions */
  --color-dust:        #A8A49C;   /* placeholders, disabled */

  /* Borders */
  --color-border:      #E0DACE;   /* standard borders */
  --color-border-light:#EDE9E1;   /* subtle dividers */

  /* Accent */
  --color-amber:       #B5690A;   /* primary CTA, highlights */
  --color-amber-light: #F5E8CD;   /* amber tints, hover bg */
  --color-amber-dim:   rgba(181, 105, 10, 0.08); /* amber wash */

  /* Semantic */
  --color-red:         #C4300A;   /* sale, error, danger */
  --color-green:       #2A6E42;   /* in-stock, success */
  --color-blue:        #2A4A8A;   /* info, links (use sparingly) */

  /* Dark section (trust bar, footer) */
  --color-dark:        #0E0C09;
  --color-dark-border: rgba(255, 255, 255, 0.08);
}
```

### Tailwind Config — extend colors

In `tailwind.config.ts`:
```ts
colors: {
  cream:    '#F6F3EC',
  paper:    '#FDFCF8',
  'cream-dark': '#EDE8DF',
  black:    '#0E0C09',
  charcoal: '#2C2A26',
  stone:    '#6B6860',
  dust:     '#A8A49C',
  border:   '#E0DACE',
  'border-light': '#EDE9E1',
  amber:    '#B5690A',
  'amber-light': '#F5E8CD',
  red:      '#C4300A',
  green:    '#2A6E42',
}
```

---

## Typography

### Font Loading (in root `layout.tsx`)
```tsx
import { Cormorant, Barlow_Condensed, Barlow } from 'next/font/google'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin-ext'],   // latin-ext covers Bulgarian
  weight: ['300', '400', '500'],
  variable: '--font-barlow',
  display: 'swap',
})

// Apply to <html>:
// className={`${cormorant.variable} ${barlowCondensed.variable} ${barlow.variable}`}
```

### Tailwind Font Config
```ts
fontFamily: {
  serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
  cond:   ['var(--font-barlow-condensed)', 'sans-serif'],
  sans:   ['var(--font-barlow)', 'sans-serif'],
  mono:   ['JetBrains Mono', 'monospace'],  // via <link> in layout
}
```

### Typography Scale

| Element | Classes |
|---------|---------|
| Hero H1 | `font-serif font-light text-5xl sm:text-7xl lg:text-9xl leading-[0.9] tracking-tight` |
| Section H2 | `font-serif font-light text-4xl sm:text-5xl lg:text-7xl leading-[0.93] tracking-tight` |
| H3 Card title | `font-serif font-normal text-xl sm:text-2xl leading-snug` |
| Section eyebrow | `font-mono text-[10px] tracking-[3px] uppercase text-amber` |
| Nav links | `font-cond font-semibold text-[11px] tracking-[2px] uppercase` |
| Button text | `font-cond font-bold text-[11px] tracking-[2.5px] uppercase` |
| Body text | `font-sans font-light text-[14px] sm:text-[15px] leading-relaxed` |
| Spec labels | `font-mono text-[9px] tracking-[2px] uppercase text-dust` |
| Price | `font-serif font-light text-2xl sm:text-3xl` |
| Badge/tag | `font-mono text-[8px] font-bold tracking-[2px] uppercase` |

---

## Spacing & Layout

Use Tailwind's spacing scale consistently:
- Section padding: `py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16`
- Card padding: `p-4 sm:p-5 lg:p-6`
- Section gap: `gap-6 sm:gap-8 lg:gap-12`
- Small gap: `gap-3 sm:gap-4`

Max width container: `max-w-screen-xl mx-auto`

---

## Component Patterns

### Button — Primary (amber fill)
```tsx
// Default state + hover transition
<button className="
  relative overflow-hidden
  px-6 py-3 sm:px-8 sm:py-3.5
  bg-black text-paper
  font-cond font-bold text-[11px] tracking-[2.5px] uppercase
  transition-all duration-300 ease-out
  hover:bg-amber active:scale-[0.98]
  min-h-[44px]  // touch target
">
  Label
</button>
```

### Button — Outline
```tsx
<button className="
  px-6 py-3 sm:px-8 sm:py-3.5
  border border-border bg-transparent
  text-stone font-cond font-bold text-[11px] tracking-[2px] uppercase
  transition-all duration-200
  hover:border-black hover:text-black
  min-h-[44px]
">
  Label
</button>
```

### Button — Icon (square)
```tsx
<button className="
  w-11 h-11 flex items-center justify-center
  border border-border bg-transparent text-stone
  transition-all duration-200
  hover:bg-black hover:border-black hover:text-paper
">
  {/* icon */}
</button>
```

### Product Card
```tsx
<div className="
  group bg-paper border border-border
  transition-all duration-300 ease-out
  hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(14,12,9,0.1)]
  hover:border-amber/30
  cursor-pointer
">
  {/* Image area */}
  <div className="
    relative bg-cream border-b border-border
    h-48 sm:h-52 lg:h-56
    flex items-center justify-center overflow-hidden
  ">
    {/* Watermark */}
    <span className="
      absolute bottom-3 right-4
      font-serif text-6xl font-light
      text-black/[0.04] select-none pointer-events-none
    ">
      {powerKW}
    </span>
    {/* Image — transitions on group hover */}
    <div className="
      relative z-10 transition-transform duration-500
      group-hover:-translate-y-1.5 group-hover:scale-[1.02]
    ">
      {/* product image / SVG */}
    </div>
  </div>

  {/* Body */}
  <div className="p-4 sm:p-5">
    <p className="font-mono text-[9px] tracking-[2px] uppercase text-amber mb-1.5">
      {category}
    </p>
    <h3 className="font-serif text-xl sm:text-2xl font-normal text-black mb-3 leading-snug">
      {name}
    </h3>
    {/* Spec tags */}
    <div className="flex flex-wrap gap-1.5 mb-4">
      {specs.map(s => (
        <span key={s} className="
          px-2 py-0.5 bg-cream border border-border
          font-mono text-[9px] text-stone tracking-[1px]
        ">{s}</span>
      ))}
    </div>
    {/* Footer */}
    <div className="
      flex items-center justify-between
      pt-4 border-t border-border-light
    ">
      <div>
        {oldPrice && (
          <p className="font-mono text-[10px] text-dust line-through mb-0.5">
            {oldPrice} EUR
          </p>
        )}
        <p className="font-serif text-2xl font-normal text-black">
          {price} <span className="font-sans text-[11px] text-stone">EUR</span>
        </p>
      </div>
      <button className="
        w-11 h-11 flex items-center justify-center
        border border-border text-stone text-xl font-light
        transition-all duration-200
        hover:bg-black hover:border-black hover:text-paper
      ">+</button>
    </div>
  </div>
</div>
```

### Section Eyebrow
```tsx
<p className="
  flex items-center gap-3 mb-4
  font-mono text-[10px] tracking-[3px] uppercase text-amber
  before:content-[''] before:w-7 before:h-px before:bg-amber
">
  Section Label
</p>
```

### Badge
```tsx
// Variants: new | sale | top | stock
const variants = {
  new:   'bg-black text-paper',
  sale:  'bg-red text-white',
  top:   'bg-amber text-paper',
  stock: 'bg-green text-white',
}
<span className={`px-2 py-0.5 font-mono text-[8px] font-bold tracking-[2px] uppercase ${variants[variant]}`}>
  {label}
</span>
```

### Form Input
```tsx
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[9px] tracking-[2px] uppercase text-stone">
    {label} {required && <span className="text-red">*</span>}
  </label>
  <input className="
    w-full px-3 py-2.5 sm:px-4 sm:py-3
    bg-paper border border-border
    font-sans text-[14px] text-black
    placeholder:text-dust
    outline-none transition-colors duration-200
    focus:border-amber
    min-h-[44px]
  " />
  {error && (
    <p className="font-mono text-[9px] tracking-[1px] text-red">{error}</p>
  )}
</div>
```

### Spec Table Row
```tsx
<tr className="border-b border-border hover:bg-amber/[0.02] transition-colors">
  <td className="py-4 font-mono text-[10px] tracking-[1px] text-stone w-[45%]">
    {key}
  </td>
  <td className="py-4 font-serif text-xl font-normal text-black">
    {value}
  </td>
</tr>
```

---

## Animation Conventions

```css
/* In globals.css */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-16px); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
```

- Page load reveals: `animation: fadeUp 0.7s ease both` with staggered delays
- Scroll reveals: `IntersectionObserver` → add `.visible` class → `opacity-0 translate-y-6` → `opacity-100 translate-y-0`
- Card hover lifts: `transition-transform duration-300 hover:-translate-y-1`
- Floating elements (hero generator): `animation: float 5s ease-in-out infinite`
- Standard transition: `transition-all duration-200 ease-out`
- Expensive transition (card hover): `transition-all duration-300 cubic-bezier(0.25, 0.1, 0.25, 1)`

---

## Visual Details

### Noise Texture Overlay
```css
/* globals.css — subtle grain on every page */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
}
```

### Section Backgrounds
- Default page: `bg-cream`
- Cards, inputs: `bg-paper`
- Alternate sections: `bg-cream-dark`
- Dark sections (trust bar, footer): `bg-black`
- Borders between sections: 1px `border-border`

### Scrollbar
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #F6F3EC; }
::-webkit-scrollbar-thumb { background: #E0DACE; }
::-webkit-scrollbar-thumb:hover { background: #B5690A; }
```

---

## Don'ts
- NEVER use pure white `#fff` — use `#FDFCF8`
- NEVER use pure black `#000` — use `#0E0C09`
- NEVER use Inter, Roboto, or system-ui fonts
- NEVER use purple, blue, or green as primary accent
- NEVER use box-shadow with cold/blue tones — always warm: `rgba(14,12,9,0.x)`
- NEVER use border-radius > 4px — this is industrial, not rounded
- NEVER center-align body text — left align always