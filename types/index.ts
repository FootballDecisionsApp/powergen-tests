export interface IProduct {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  price: number              // EUR (e.g. 7490)
  oldPrice?: number
  powerKW: number
  powerKVA?: number
  fuelType: 'diesel' | 'petrol' | 'gas' | 'inverter'
  phases?: '1phase' | '3phase'
  inStock: boolean
  featured?: boolean
  autoStart?: boolean
  image?: string             // urlFor resolved URL (single)
  imageAlt?: string
  images?: string[]          // urlFor resolved URLs (detail page)
  imageAlts?: string[]
  specifications?: ISpecification[]
  category?: string
  categorySlug?: string
  seoTitle?: string
  seoDescription?: string
  related?: IProductSummary[]
}

export interface IProductSummary {
  _id: string
  name: string
  slug: { current: string }
  price: number
  powerKW: number
  fuelType: 'diesel' | 'petrol' | 'gas' | 'inverter'
  image?: string
}

export interface ISpecification {
  key: string
  value: string
}

export interface ICartItem {
  id: string                 // Sanity _id
  name: string
  price: number
  quantity: number
  imageUrl?: string
  powerKW: number
}

export interface IOrderCustomer {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes?: string
}

export interface IOrder {
  customer: IOrderCustomer
  items: ICartItem[]
  total: number
  createdAt: string
}

export interface ICategory {
  _id: string
  name: string
  slug: { current: string }
  productCount?: number
}
