import type { Metadata } from 'next'
import Link from 'next/link'

import DocumentList from '@/components/documents/DocumentList'
import PageHeader from '@/components/ui/PageHeader'
import { getPublicDocuments } from '@/lib/documents'

export const metadata: Metadata = {
  title: 'Documents officiels',
  description:
    "Règlement intérieur, statuts, chartes, rapports et autres documents officiels de l'ONG Green-Chad, en libre téléchargement.",
  alternates: { canonical: '/documents' },
}

// Régénérée toutes les heures et dès qu'un document est modifié dans l'admin.
export const revalidate = 3600

export default async function DocumentsPage() {
  const groups = await getPublicDocuments()
  const total = groups.reduce((sum, group) => sum + group.documents.length, 0)

  return (
    <>
      <PageHeader
        eyebrow="Ressources"
        title={<>Documents <em>officiels</em></>}
        description="Règlement intérieur, statuts, chartes signées, rapports d'activités : les documents de l'organisation, en libre consultation."
      >
        {groups.length > 1 && (
          <nav aria-label="Sommaire" className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {groups.map((group, i) => (
              <a key={group.category} href={`#${group.category}`} className="t-label flex items-center gap-2 text-stone transition-colors hover:text-ink">
                <span className="index-number text-base">{String(i + 1).padStart(2, '0')}</span>
                {group.label}
                <span>({group.documents.length})</span>
              </a>
            ))}
          </nav>
        )}
      </PageHeader>

      <div className="container-custom py-12 lg:py-20">
        {total === 0 ? (
          <div className="border-y border-rule py-20 text-center">
            <p className="t-h3">Aucun document publié pour le moment</p>
            <p className="mt-3 text-graphite">Les documents officiels de l&apos;organisation seront bientôt disponibles ici.</p>
          </div>
        ) : (
          <DocumentList groups={groups} />
        )}

        <p className="mt-20 border-t border-rule pt-6 text-sm text-stone">
          Membre de l&apos;organisation ?{' '}
          <Link href="/admin/collections/documents" className="link-quiet text-ink">
            Déposez un document depuis l&apos;espace membres
          </Link>
          .
        </p>
      </div>
    </>
  )
}
