export default function BlogSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy aria-label="Chargement des articles">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card animate-pulse overflow-hidden">
          <div className="aspect-[16/10] bg-paper-2" />
          <div className="space-y-3 p-6">
            <div className="h-5 w-3/4 rounded bg-paper-2" />
            <div className="h-4 w-full rounded bg-paper-2" />
            <div className="h-4 w-5/6 rounded bg-paper-2" />
            <div className="flex gap-4 pt-3">
              <div className="h-3 w-20 rounded bg-paper-2" />
              <div className="h-3 w-20 rounded bg-paper-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
