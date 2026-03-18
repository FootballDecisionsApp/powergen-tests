import Link from 'next/link'
import type { IProduct } from '@/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: IProduct[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 px-4 text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dust mb-6">
          Няма намерени продукти
        </p>
        <Link
          href="/products"
          className="flex items-center justify-center px-6 py-3 min-h-[44px] border border-navy font-mono text-[10px] tracking-[0.2em] uppercase text-navy hover:bg-navy hover:text-cream transition-all duration-200"
        >
          Изчисти филтрите
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-smoke">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
