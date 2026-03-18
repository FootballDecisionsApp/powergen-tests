# PowerGen Test Project — Claude Memory

## Project Overview
Test project for a Bulgarian industrial generator e-commerce site.
Goal: verify the full stack works end-to-end before the real project.
Scope: Home → Products (with filters) → Product Detail → Cart → Mock Checkout → Success.

## Stack
- **Framework**: Next.js 14 (App Router) + TypeScript strict
- **Styling**: Tailwind CSS (utility-first, no CSS modules)
- **CMS**: Sanity v3 (content + product data)
- **State**: Zustand (cart only)
- **Forms**: React Hook Form + Zod
- **Fonts**: Cormorant + Barlow Condensed + Barlow + JetBrains Mono (Google Fonts)
- **Hosting**: Vercel (ISR + Edge)
- **Payments**: Mock only — Stripe in real project
- **Language**: Bulgarian only (no i18n in test)

## Automatic Rules — Always Apply
- **ANY UI work** → read `.claude/skills/01-design-system.md` first
- **ANY new file or route** → read `.claude/skills/02-architecture.md` first
- **ANY Sanity query or schema** → read `.claude/skills/03-sanity-patterns.md` first
- **ANY API route** → read `.claude/skills/04-security.md` first
- **ANY component** → must be responsive, read `.claude/skills/05-responsive.md` first

## Conditional Rules
| Situation | Action |
|-----------|--------|
| New UI component | Read 01-design-system + 05-responsive |
| New page | Read 02-architecture + 05-responsive |
| Sanity schema change | Read 03-sanity-patterns |
| New API route | Read 04-security — Zod + error handling required |
| Layout component (Header/Footer) | Read 05-responsive — mobile nav required |
| Form component | Read 04-security for Zod schema |

## Design System Summary
Theme: **"Industrial Precision"** — premium light industrial aesthetic.
- Background: warm cream `#F6F3EC`, cards: `#FDFCF8`
- Text: warm black `#0E0C09`, secondary: `#6B6860`
- Accent: amber `#B5690A` (diesel, precision, industrial)
- Borders: `#E0DACE`
- Fonts: Cormorant serif (headings) + Barlow Condensed (UI) + Barlow (body)
- Never use pure white or pure black — always use the warm palette
- Full details in `.claude/skills/01-design-system.md`

## Architecture Summary
- Pages = Server Components by default
- `"use client"` only for: interactive forms, cart, filters, animations
- Data fetching only in Server Components or API routes
- All GROQ queries live in `src/lib/sanity/queries.ts` only
- All types in `src/types/index.ts`
- Full structure in `.claude/skills/02-architecture.md`

## Responsive Rules Summary
- Mobile-first: write base styles for mobile, add `md:` and `lg:` prefixes
- All grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Mobile nav: hamburger menu, full-screen overlay
- Touch targets: minimum 44×44px
- Full rules in `.claude/skills/05-responsive.md`

## TypeScript Rules
- No `any` — ever
- All props must have explicit interfaces
- All Sanity responses must have typed return generics
- Use `IProduct`, `ICartItem`, `IOrder` from `src/types/index.ts`
- Prefer `interface` over `type` for object shapes

## Forbidden Patterns
- No `any` types
- No hardcoded prices on the client — always fetch from Sanity server-side
- No inline styles — Tailwind classes only
- No data fetching inside Client Components — pass as props
- No `console.log` — use proper error handling
- No absolute pixel values in Tailwind — use the spacing scale
- No `px-` values that break on small screens without responsive prefix

## Naming Conventions
- Components: `PascalCase` → `ProductCard.tsx`
- Hooks: `camelCase` with `use` prefix → `useCart.ts`
- Types/Interfaces: `PascalCase` with `I` prefix → `IProduct`
- API routes: kebab-case → `/api/orders/create`
- Sanity queries: camelCase ending in `Query` → `productsQuery`
- Test IDs: kebab-case with context → `data-testid="add-to-cart-btn"`

## Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=    # safe to expose
NEXT_PUBLIC_SANITY_DATASET=       # safe to expose
SANITY_API_TOKEN=                  # SECRET — never in client components
```

## Test Data (add to Sanity Studio)
- PowerGen DG-15 Silent · diesel · 15kW · 7490 EUR · featured: true
- PowerGen DG-50 Industrial · diesel · 50kW · 22800 EUR · featured: true
- Inverter INV-8000 · inverter · 8kW · 3570 EUR · featured: true
- PowerGen Gas GG-5000 · gas · 5kW · 3290 EUR · featured: false

## Future: 3D Scroll Hero (Phase 2 — not in test project)
Concept: generator disassembly animation on scroll (like Apple iPhone teardown).
Assets: real generator photos + AI exploded view → video via Nano Banana 2.
Implementation sketch:
```js
window.addEventListener('scroll', () => {
  const progress = scrollY / (document.body.scrollHeight - window.innerHeight)
  videoEl.currentTime = progress * videoEl.duration
})
```
Estimated effort: 2–3 days as a standalone feature.