import type { IChatAnswer, IChatMessage, IProduct } from '@/types'
import type { IChatEngine, TChatLocale } from './engine'
import {
  fallbackAnswer,
  matchCompany,
  matchDeliveryOrWarranty,
  matchFuelType,
  matchGreeting,
  matchHandoff,
  matchPowerRange,
  matchPrice,
  matchProductLookup,
  matchStock,
} from './intents'

function normalize(message: string): string {
  return message.trim().toLowerCase()
}

export const ruleEngine: IChatEngine = {
  answer(message: string, _history: IChatMessage[], products: IProduct[], locale: TChatLocale): IChatAnswer {
    const normalized = normalize(message)

    const matchers = [
      () => matchGreeting(normalized, locale),
      () => matchPowerRange(normalized, products, locale),
      () => matchFuelType(normalized, products, locale),
      () => matchPrice(normalized, products, locale),
      () => matchStock(normalized, products, locale),
      () => matchProductLookup(normalized, products, locale),
      () => matchCompany(normalized, locale),
      () => matchDeliveryOrWarranty(normalized, locale),
      () => matchHandoff(normalized, locale),
    ]

    for (const matcher of matchers) {
      const result = matcher()
      if (result) return result
    }

    return fallbackAnswer(locale)
  },
}
