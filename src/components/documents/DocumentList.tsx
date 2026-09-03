import { ArrowDown, ArrowUpRight } from '@/components/ui/Icons'
import type { DocumentGroup, PublicDocument } from '@/lib/documents'
import { formatDate, formatFileSize } from '@/lib/format'

const EXT_TONE: Record<string, string> = {
  pdf: 'bg-terre/12 text-terre-deep',
  doc: 'bg-sky-500/12 text-sky-800', docx: 'bg-sky-500/12 text-sky-800', odt: 'bg-sky-500/12 text-sky-800',
  xls: 'bg-leaf/12 text-leaf-deep', xlsx: 'bg-leaf/12 text-leaf-deep', ods: 'bg-leaf/12 text-leaf-deep', csv: 'bg-leaf/12 text-leaf-deep',
  ppt: 'bg-sun/25 text-amber-800', pptx: 'bg-sun/25 text-amber-800', odp: 'bg-sun/25 text-amber-800',
}

function DocumentRow({ document: doc, index }: { document: PublicDocument; index: number }) {
  const tone = EXT_TONE[doc.extension] ?? 'bg-ink/8 text-ink'
  const meta = [formatFileSize(doc.filesize), formatDate(doc.publishedAt, 'short'), `Déposé par ${doc.uploadedBy}`].filter(Boolean)
  return (
    <li className="reveal card card-hover flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6" style={{ '--d': `${index * 70}ms` } as React.CSSProperties}>
      <span className={`display flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xs font-bold uppercase ${tone}`} aria-label={`Format ${doc.extension}`}>
        {doc.extension.slice(0, 4)}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="t-h3">
          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-leaf-deep">{doc.title}</a>
        </h3>
        {doc.description && <p className="mt-1 text-[15px] text-ink-soft">{doc.description}</p>}
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-mute">{meta.join(' · ')}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn-ghost h-11 px-4" aria-label={`Ouvrir ${doc.title}`}>
          <span className="hidden sm:inline">Ouvrir</span><ArrowUpRight />
        </a>
        <a href={doc.downloadUrl} className="btn-ink h-11 px-4" aria-label={`Télécharger ${doc.title}`}>
          Télécharger<ArrowDown />
        </a>
      </div>
    </li>
  )
}

export default function DocumentList({ groups }: { groups: DocumentGroup[] }) {
  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section key={group.category} id={group.category} className="scroll-mt-32">
          <div className="reveal flex items-end justify-between gap-4">
            <h2 className="t-h2">{group.label}</h2>
            <span className="badge border-ink/10 bg-white text-ink-soft">{group.documents.length} fichier{group.documents.length > 1 ? 's' : ''}</span>
          </div>
          <ul className="mt-6 space-y-4">
            {group.documents.map((doc, i) => (
              <DocumentRow key={doc.id} document={doc} index={i} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
