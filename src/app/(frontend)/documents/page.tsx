import type { Metadata } from 'next'
import Link from 'next/link'

import DocumentList from '@/components/documents/DocumentList'
import PageHeader from '@/components/ui/PageHeader'
import { getPublicDocuments } from '@/lib/documents'

export const metadata: Metadata = {
  title: 'Documents officiels',
  description: "Règlement intérieur, statuts, chartes, rapports et autres documents officiels de l'ONG Green-Chad, en libre téléchargement.",
  alternates: { canonical: '/documents' },
}

// Régénérée toutes les heures et dès qu'un document est modifié dans l'admin.
export const revalidate = 3600

export default async function DocumentsPage() {
  const groups = await getPublicDocuments()
  const total = groups.reduce((sum, g) => sum + g.documents.length, 0)

  return (
    <>
      <PageHeader
        eyebrow="Ressources"
        title={<>Documents <span className="text-sun">officiels</span></>}
        description="Règlement intérieur, statuts, chartes signées, rapports d'activités : les documents de l'organisation, en libre consultation."
      >
        {groups.length > 1 && (
          <nav aria-label="Catégories" className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.category} href={`#${g.category}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-ivory/80 transition-colors hover:border-sun hover:text-sun">
                {g.label}<span className="rounded-full bg-white/10 px-1.5 text-xs">{g.documents.length}</span>
              </a>
            ))}
          </nav>
        )}
      </PageHeader>

      <div className="container-custom py-12 lg:py-20">
        {total === 0 ? (
          <div className="card p-12 text-center">
            <p className="t-h3">Aucun document publié pour le moment</p>
            <p className="mt-2 text-ink-soft">Les documents officiels de l&apos;organisation seront bientôt disponibles ici.</p>
          </div>
        ) : (
          <DocumentList groups={groups} />
        )}
        <p className="mt-16 text-center text-sm text-mute">
          Membre de l&apos;organisation ?{' '}
          <Link href="/admin/collections/documents" className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4">Déposez un document depuis l&apos;espace membres</Link>.
        </p>
      </div>
    </>
  )
}
