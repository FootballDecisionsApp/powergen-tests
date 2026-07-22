import type { IChatAnswer, IChatMessage, IProduct } from '@/types'

export type TChatLocale = 'bg' | 'en'

export interface IChatEngine {
  answer(
    message: string,
    history: IChatMessage[],
    products: IProduct[],
    locale: TChatLocale
  ): IChatAnswer | Promise<IChatAnswer>
}
