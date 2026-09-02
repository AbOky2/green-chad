import { Download, ExternalLink, FileText } from 'lucide-react'

import type { DocumentGroup, PublicDocument } from '@/lib/documents'
import { formatDate, formatFileSize } from '@/lib/format'

const EXTENSION_STYLES: Record<string, string> = {
  pdf: 'bg-red-100 text-red-700',
  doc: 'bg-sky-100 text-sky-700',
  docx: 'bg-sky-100 text-sky-700',
  odt: 'bg-sky-100 text-sky-700',
  xls: 'bg-emerald-100 text-emerald-700',
  xlsx: 'bg-emerald-100 text-emerald-700',
  ods: 'bg-emerald-100 text-emerald-700',
  csv: 'bg-emerald-100 text-emerald-700',
  ppt: 'bg-orange-100 text-orange-700',
  pptx: 'bg-orange-100 text-orange-700',
  odp: 'bg-orange-100 text-orange-700',
  jpg: 'bg-violet-100 text-violet-700',
  jpeg: 'bg-violet-100 text-violet-700',
  png: 'bg-violet-100 text-violet-700',
  webp: 'bg-violet-100 text-violet-700',
}

function DocumentRow({ document: doc, index }: { document: PublicDocument; index: number }) {
  const tone = EXTENSION_STYLES[doc.extension] ?? 'bg-paper-2 text-ink-soft'
  const meta = [doc.extension.toUpperCase(), formatFileSize(doc.filesize), formatDate(doc.publishedAt, 'short')].filter(Boolean)

  return (
    <li className="reveal card card-hover p-5 sm:p-6" style={{ '--i': index } as React.CSSProperties}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl text-[0.65rem] font-bold uppercase ${tone}`} aria-hidden>
          <FileText className="h-5 w-5" />
          <span className="mt-0.5">{doc.extension.slice(0, 4)}</span>
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-snug">
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-700">
              {doc.title}
            </a>
          </h3>
          {doc.description && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{doc.description}</p>}
          <p className="mt-2 text-xs text-muted">{meta.join(' · ')}</p>
        </div>

        <div className="flex shrink-0 gap-2">
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-4! py-2.5!"
            aria-label={`Ouvrir ${doc.title} dans un nouvel onglet`}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Ouvrir</span>
          </a>
          <a href={doc.downloadUrl} className="btn-primary px-4! py-2.5!" aria-label={`Télécharger ${doc.title}`}>
            <Download className="h-4 w-4" />
            Télécharger
          </a>
        </div>
      </div>
    </li>
  )
}

export default function DocumentList({ groups }: { groups: DocumentGroup[] }) {
  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section key={group.category} id={group.category} className="scroll-mt-28">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <h2 className="text-2xl font-bold sm:text-3xl">{group.label}</h2>
            <span className="text-sm text-muted">
              {group.documents.length} fichier{group.documents.length > 1 ? 's' : ''}
            </span>
          </div>
          <ul className="stagger mt-6 space-y-4">
            {group.documents.map((doc, i) => (
              <DocumentRow key={doc.id} document={doc} index={i} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
