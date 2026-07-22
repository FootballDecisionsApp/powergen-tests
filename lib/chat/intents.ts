import type { IChatAnswer, IProduct, IProductSummary } from '@/types'
import type { TChatLocale } from './engine'

// ─── Copy tables ──────────────────────────────────────────────────────────

const suggestions: Record<TChatLocale, string[]> = {
  bg: ['Генератори до 10kW', 'Дизел или инвертор?', 'Доставка и гаранция', 'За фирмата', 'Говоря с човек'],
  en: ['Generators under 10kW', 'Diesel or inverter?', 'Delivery & warranty', 'About us', 'Talk to a human'],
}

// Real business contact details — same values used in Footer.tsx / contact/page.tsx.
// Kept here (not fetched) since they're static, hardcoded in those components too.
const CONTACT = {
  phone: '+359 889 57 19 51',
  email: 'ies@playcube.com',
  hours: { bg: 'Пон–Пет, 09:00–18:00', en: 'Mon–Fri, 09:00–18:00' },
}

const copy = {
  greeting: {
    bg: 'Здравейте! Аз съм асистентът на PlayCube. Мога да ви помогна да намерите генератор по мощност, гориво или бюджет, да проверя наличност и цени, да ви разкажа за фирмата, или да ви свържа с екипа ни.',
    en: "Hello! I'm the PlayCube assistant. I can help you find a generator by power, fuel type or budget, check stock and pricing, tell you about the company, or put you in touch with our team.",
  },
  fallback: {
    bg: `Мога да помагам само с въпроси за нашите генератори, цени, доставка, гаранция и компанията. Опитайте с нещо от предложенията по-долу, или пишете директно на ${CONTACT.email} / ${CONTACT.phone}.`,
    en: `I can only help with questions about our generators, pricing, delivery, warranty and the company. Try one of the suggestions below, or reach us directly at ${CONTACT.email} / ${CONTACT.phone}.`,
  },
  delivery: {
    bg: 'Доставяме и монтираме безплатно на обекта в рамките на цяла България.',
    en: 'We deliver and install for free on site anywhere in Bulgaria.',
  },
  warranty: {
    bg: 'Всички наши генератори имат минимум 24 месеца пълна гаранция, включително двигател и алтернатор, и са CE сертифицирани.',
    en: 'All our generators come with a minimum 24-month full warranty, including the engine and alternator, and are CE certified.',
  },
  company: {
    bg: 'PlayCube е търговската марка на Integrated Energy Systems OOD — основана през 2003 г. с мисия да осигури непрекъснато и надеждно електрозахранване за бизнеса и критичната инфраструктура в България. Днес сме водещ доставчик на промишлени генератори с над 500 успешни инсталации и 20+ години опит, обслужващи болници, телекоми, центрове за данни и промишлени обекти.',
    en: 'PlayCube is the trading brand of Integrated Energy Systems OOD — founded in 2003 with a mission to provide uninterrupted, reliable power supply for businesses and critical infrastructure in Bulgaria. Today we are a leading industrial generator supplier with over 500 successful installations and 20+ years of experience, serving hospitals, telecoms, data centres and industrial facilities.',
  },
  handoff: {
    bg: `Разбира се — можете да се свържете директно с екипа ни на ${CONTACT.phone} или ${CONTACT.email} (${CONTACT.hours.bg}), или през страницата за контакти.`,
    en: `Of course — you can reach our team directly at ${CONTACT.phone} or ${CONTACT.email} (${CONTACT.hours.en}), or via the contact page.`,
  },
  noneFound: {
    bg: 'В момента нямаме продукти, отговарящи на това търсене.',
    en: 'We currently have no products matching that search.',
  },
} as const

const fuelLabel: Record<TChatLocale, Record<IProduct['fuelType'], string>> = {
  bg: { diesel: 'дизелов', petrol: 'бензинов', gas: 'газов', inverter: 'инверторен' },
  en: { diesel: 'diesel', petrol: 'petrol', gas: 'gas', inverter: 'inverter' },
}

// Bulgarian adjectives inflect for plural — "инверторен генератор" but
// "инверторни генератори" — so the list-heading intro needs its own table.
const fuelLabelPlural: Record<TChatLocale, Record<IProduct['fuelType'], string>> = {
  bg: { diesel: 'дизелови', petrol: 'бензинови', gas: 'газови', inverter: 'инверторни' },
  en: { diesel: 'diesel', petrol: 'petrol', gas: 'gas', inverter: 'inverter' },
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function toSummary(p: IProduct): IProductSummary {
  return {
    _id: p._id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    powerKW: p.powerKW,
    fuelType: p.fuelType,
    image: p.image,
  }
}

function formatProduct(p: IProduct, locale: TChatLocale): string {
  const fuel = fuelLabel[locale][p.fuelType]
  const stockNote = p.inStock ? '' : locale === 'bg' ? ' (изчерпан)' : ' (out of stock)'
  return `${p.name} — ${p.powerKW}kW, ${fuel}, ${p.price} EUR${stockNote}`
}

function listAnswer(matches: IProduct[], intro: string, locale: TChatLocale): IChatAnswer {
  if (matches.length === 0) {
    return { reply: copy.noneFound[locale], suggestions: suggestions[locale] }
  }
  const shown = matches.slice(0, 5)
  const lines = shown.map(p => `• ${formatProduct(p, locale)}`)
  return {
    reply: `${intro}\n\n${lines.join('\n')}`,
    products: shown.map(toSummary),
  }
}

function findNamedProduct(message: string, products: IProduct[]): IProduct | null {
  const normalized = message.replace(/[\s-]/g, '')
  return products.find(p => normalized.includes(p.name.toLowerCase().replace(/[\s-]/g, ''))) ?? null
}

// ─── Intent matchers ────────────────────────────────────────────────────────
// `message` is already lowercased + trimmed by the caller. Each matcher
// returns an IChatAnswer on match, or null to fall through to the next one.

export function greetingAnswer(locale: TChatLocale): IChatAnswer {
  return { reply: copy.greeting[locale], suggestions: suggestions[locale] }
}

// Note: \b is ASCII-only in JS regex — it never matches around Cyrillic
// letters, so Cyrillic terms use Unicode-aware lookaround instead of \b.
export function matchGreeting(message: string, locale: TChatLocale): IChatAnswer | null {
  if (/(?<![\p{L}\p{N}])(здрав|здрасти|добър ден)|\b(hello|hi|hey)\b/iu.test(message)) {
    return greetingAnswer(locale)
  }
  return null
}

export function matchPowerRange(
  message: string,
  products: IProduct[],
  locale: TChatLocale
): IChatAnswer | null {
  const under = message.match(/(?:до|под|less than|under|below)\s*(\d{1,4})\s*(?:kw|квт)/i)
  const over = message.match(/(?:над|повече от|over|above|more than)\s*(\d{1,4})\s*(?:kw|квт)/i)
  const exact = message.match(/(\d{1,4})\s*(?:kw|квт)/i)

  if (under) {
    const kw = Number(under[1])
    const matches = products.filter(p => p.powerKW <= kw)
    const intro = locale === 'bg' ? `Генератори до ${kw}kW:` : `Generators up to ${kw}kW:`
    return listAnswer(matches, intro, locale)
  }
  if (over) {
    const kw = Number(over[1])
    const matches = products.filter(p => p.powerKW >= kw)
    const intro = locale === 'bg' ? `Генератори над ${kw}kW:` : `Generators over ${kw}kW:`
    return listAnswer(matches, intro, locale)
  }
  if (exact) {
    const kw = Number(exact[1])
    const matches = products.filter(p => Math.abs(p.powerKW - kw) <= 2)
    const intro = locale === 'bg' ? `Генератори около ${kw}kW:` : `Generators around ${kw}kW:`
    return listAnswer(matches, intro, locale)
  }
  return null
}

export function matchFuelType(
  message: string,
  products: IProduct[],
  locale: TChatLocale
): IChatAnswer | null {
  const fuelPatterns: Array<[IProduct['fuelType'], RegExp]> = [
    ['diesel', /дизел|diesel/i],
    ['inverter', /инвертор|inverter/i],
    ['gas', /(?<![\p{L}\p{N}])газ(ов)?(?![\p{L}\p{N}])|\bgas\b/iu],
    ['petrol', /бензин|petrol|gasoline/i],
  ]
  const found = fuelPatterns.find(([, re]) => re.test(message))
  if (!found) return null

  const [fuelType] = found
  const matches = products.filter(p => p.fuelType === fuelType)
  const label = fuelLabelPlural[locale][fuelType]
  const capitalized = label.charAt(0).toUpperCase() + label.slice(1)
  const intro = locale === 'bg' ? `${capitalized} генератори:` : `${capitalized} generators:`
  return listAnswer(matches, intro, locale)
}

export function matchPrice(
  message: string,
  products: IProduct[],
  locale: TChatLocale
): IChatAnswer | null {
  const cheapest = /най-евтин|cheapest|най-бюджет/i.test(message)
  const under = message.match(/(?:до|под|less than|under|below)\s*(\d{2,6})\s*(?:eur|евро|лв|lv)/i)
  const general = /цен[аи]|струва|how much|\bprices?\b|\bcost\b/i.test(message)

  if (cheapest) {
    const sorted = [...products].sort((a, b) => a.price - b.price)
    const intro = locale === 'bg' ? 'Най-достъпните ни модели:' : 'Our most affordable models:'
    return listAnswer(sorted, intro, locale)
  }
  if (under) {
    const budget = Number(under[1])
    const matches = products.filter(p => p.price <= budget).sort((a, b) => a.price - b.price)
    const intro = locale === 'bg' ? `Генератори до ${budget} EUR:` : `Generators under ${budget} EUR:`
    return listAnswer(matches, intro, locale)
  }
  if (general) {
    if (products.length === 0) return { reply: copy.noneFound[locale], suggestions: suggestions[locale] }
    const sorted = [...products].sort((a, b) => a.price - b.price)
    const min = sorted[0].price
    const max = sorted[sorted.length - 1].price
    const intro = locale === 'bg'
      ? `Цените ни варират от ${min} до ${max} EUR в зависимост от модела и мощността:`
      : `Our prices range from ${min} to ${max} EUR depending on model and power:`
    return listAnswer(sorted, intro, locale)
  }
  return null
}

export function matchStock(
  message: string,
  products: IProduct[],
  locale: TChatLocale
): IChatAnswer | null {
  if (!/наличност|наличен|наличв|available|in stock|\bstock\b/i.test(message)) return null

  const named = findNamedProduct(message, products)
  if (named) {
    const reply = named.inStock
      ? locale === 'bg'
        ? `Да, ${named.name} в момента е в наличност — ${named.price} EUR.`
        : `Yes, ${named.name} is currently in stock — ${named.price} EUR.`
      : locale === 'bg'
        ? `За съжаление ${named.name} в момента не е в наличност.`
        : `Unfortunately ${named.name} is currently out of stock.`
    return { reply, products: [toSummary(named)] }
  }

  const inStock = products.filter(p => p.inStock)
  const intro = locale === 'bg' ? 'В наличност в момента:' : 'Currently in stock:'
  return listAnswer(inStock, intro, locale)
}

export function matchProductLookup(
  message: string,
  products: IProduct[],
  locale: TChatLocale
): IChatAnswer | null {
  const named = findNamedProduct(message, products)
  if (!named) return null
  return { reply: formatProduct(named, locale), products: [toSummary(named)] }
}

export function matchDeliveryOrWarranty(message: string, locale: TChatLocale): IChatAnswer | null {
  const wantsDelivery = /доставк|shipping|delivery/i.test(message)
  const wantsWarranty = /гаранци|warranty/i.test(message)
  if (!wantsDelivery && !wantsWarranty) return null

  const parts: string[] = []
  if (wantsDelivery) parts.push(copy.delivery[locale])
  if (wantsWarranty) parts.push(copy.warranty[locale])
  return { reply: parts.join('\n\n'), suggestions: suggestions[locale] }
}

export function matchCompany(message: string, locale: TChatLocale): IChatAnswer | null {
  if (/компани|фирма|за вас|кои сте|about (you|us)|\bcompany\b|who are you/i.test(message)) {
    return { reply: copy.company[locale], suggestions: suggestions[locale] }
  }
  return null
}

export function matchHandoff(message: string, locale: TChatLocale): IChatAnswer | null {
  if (/човек|оператор|представител|talk to (a )?human|contact (you|us)|speak to/i.test(message)) {
    return { reply: copy.handoff[locale], suggestions: suggestions[locale] }
  }
  return null
}

export function fallbackAnswer(locale: TChatLocale): IChatAnswer {
  return { reply: copy.fallback[locale], suggestions: suggestions[locale] }
}
