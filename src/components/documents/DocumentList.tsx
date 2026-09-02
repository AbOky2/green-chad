import { ArrowDown, ArrowUpRight } from '@/components/ui/Icons'
import type { DocumentGroup, PublicDocument } from '@/lib/documents'
import { formatDate, formatFileSize } from '@/lib/format'

function DocumentRow({ document: doc }: { document: PublicDocument }) {
  const meta = [formatFileSize(doc.filesize), formatDate(doc.publishedAt, 'short'), `Déposé par ${doc.uploadedBy}`].filter(Boolean)

  return (
    <li className="grid gap-4 border-t border-rule py-6 sm:grid-cols-12 sm:items-start sm:gap-6">
      <span
        className="t-label flex h-10 w-10 items-center justify-center border border-ink text-[0.65rem] text-ink sm:col-span-1"
        aria-label={`Format ${doc.extension}`}
      >
        {doc.extension.slice(0, 4)}
      </span>

      <div className="sm:col-span-7">
        <h3 className="t-h3">
          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-terre">
            {doc.title}
          </a>
        </h3>
        {doc.description && <p className="mt-2 text-graphite">{doc.description}</p>}
        <p className="t-label mt-3 text-stone">{meta.join(' · ')}</p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 sm:col-span-4 sm:justify-end sm:pt-1">
        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="link-text" aria-label={`Ouvrir ${doc.title}`}>
          Ouvrir
          <ArrowUpRight />
        </a>
        <a href={doc.downloadUrl} className="link-text" aria-label={`Télécharger ${doc.title}`}>
          Télécharger
          <ArrowDown />
        </a>
      </div>
    </li>
  )
}

export default function DocumentList({ groups }: { groups: DocumentGroup[] }) {
  return (
    <div className="space-y-20">
      {groups.map((group, i) => (
        <section key={group.category} id={group.category} className="scroll-mt-28">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="t-h2 flex items-baseline gap-4">
              <span className="index-number text-2xl">{String(i + 1).padStart(2, '0')}</span>
              {group.label}
            </h2>
            <span className="t-label text-stone">
              {group.documents.length} fichier{group.documents.length > 1 ? 's' : ''}
            </span>
          </div>
          <ul className="mt-6 border-b border-rule">
            {group.documents.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
