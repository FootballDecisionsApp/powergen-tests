import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="px-4 sm:px-8 lg:px-16 py-4 border-b border-border">
        <div className="h-3 w-64 bg-cream-dark animate-pulse" />
      </div>
      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <LoadingSkeleton type="product-detail" />
      </div>
    </div>
  )
}
