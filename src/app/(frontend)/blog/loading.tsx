/** Squelette affiché pendant le chargement de la liste d'articles. */
export default function BlogLoading() {
  return (
    <div className="container-custom pt-28 sm:pt-32" aria-busy aria-label="Chargement des actualités">
      <div className="h-64 animate-pulse rounded-4xl bg-ivory-2 sm:h-72" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-line/80 bg-white">
            <div className="aspect-[4/3] bg-ivory-2" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-24 rounded bg-ivory-2" />
              <div className="h-5 w-3/4 rounded bg-ivory-2" />
              <div className="h-4 w-full rounded bg-ivory-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
