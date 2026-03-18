import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="px-4 sm:px-8 lg:px-16 py-4 border-b border-border">
        <div className="h-4 w-48 bg-cream-dark animate-pulse" />
      </div>
      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block w-56 xl:w-64 border-r border-border p-6">
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-cream-dark animate-pulse" />
                <div className="h-10 w-full bg-cream-dark animate-pulse" />
              </div>
            ))}
          </div>
        </aside>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="h-8 w-40 bg-cream-dark animate-pulse mb-6" />
          <LoadingSkeleton type="products" />
        </div>
      </div>
    </div>
  )
}
