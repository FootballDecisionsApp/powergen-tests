interface LoadingSkeletonProps {
  type: 'products' | 'product-detail' | 'cart'
}

function Pulse({ className }: { className: string }) {
  return <div className={`bg-cream-dark animate-pulse ${className}`} />
}

function ProductCardSkeleton() {
  return (
    <div className="bg-paper border border-border">
      {/* Image area */}
      <Pulse className="h-48 sm:h-52 lg:h-56" />
      {/* Body */}
      <div className="p-4 sm:p-5">
        <Pulse className="h-2.5 w-16 mb-3" />
        <Pulse className="h-5 w-3/4 mb-1.5" />
        <Pulse className="h-5 w-1/2 mb-4" />
        {/* Tags */}
        <div className="flex gap-1.5 mb-4">
          <Pulse className="h-4 w-12" />
          <Pulse className="h-4 w-16" />
          <Pulse className="h-4 w-10" />
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
          <Pulse className="h-7 w-24" />
          <Pulse className="w-11 h-11" />
        </div>
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-8 lg:px-16 py-12">
      {/* Image */}
      <Pulse className="aspect-square w-full" />
      {/* Info */}
      <div className="flex flex-col gap-4">
        <Pulse className="h-3 w-24" />
        <Pulse className="h-12 w-3/4" />
        <Pulse className="h-12 w-1/2" />
        <Pulse className="h-4 w-full" />
        <Pulse className="h-4 w-5/6" />
        <Pulse className="h-4 w-4/5" />
        <div className="flex gap-2 mt-2">
          <Pulse className="h-5 w-14" />
          <Pulse className="h-5 w-20" />
          <Pulse className="h-5 w-12" />
        </div>
        <div className="flex gap-3 mt-4">
          <Pulse className="h-12 flex-1" />
          <Pulse className="h-12 w-12" />
        </div>
      </div>
    </div>
  )
}

function CartSkeleton() {
  return (
    <div className="flex flex-col gap-0 divide-y divide-border">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 p-4 sm:p-5">
          <Pulse className="w-16 h-16 shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/3" />
            <Pulse className="h-3 w-1/4" />
          </div>
          <Pulse className="w-8 h-8 shrink-0 self-start" />
        </div>
      ))}
    </div>
  )
}

export function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  if (type === 'product-detail') return <ProductDetailSkeleton />
  if (type === 'cart') return <CartSkeleton />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-border border border-border">
      {[1, 2, 3].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
