import type { Metadata } from 'next'
import Link from 'next/link'
import { FolderOpen } from 'lucide-react'

import DocumentList from '@/components/documents/DocumentList'
import PageHero from '@/components/ui/PageHero'
import { getPublicDocuments } from '@/lib/documents'

export const metadata: Metadata = {
  title: 'Documents',
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
      <PageHero
        eyebrow="Ressources"
        title="Documents officiels"
        description="Règlement intérieur, statuts, chartes signées, rapports d'activités… Retrouvez ici les documents de l'organisation, en libre consultation."
      >
        {groups.length > 1 && (
          <nav aria-label="Catégories de documents" className="relative mt-8 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.category}
                href={`#${group.category}`}
                className="chip border border-white/25 bg-white/10 px-4! py-2! text-sm! text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                {group.label}
                <span className="ml-2 rounded-full bg-white/20 px-1.5 text-xs">{group.documents.length}</span>
              </a>
            ))}
          </nav>
        )}
      </PageHero>

      <div className="container-custom max-w-5xl py-12 sm:py-16">
        {total === 0 ? (
          <div className="card mx-auto max-w-lg p-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <FolderOpen className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-xl font-bold">Aucun document publié pour le moment</h2>
            <p className="mt-2 text-ink-soft">Les documents officiels de l&apos;organisation seront bientôt disponibles ici.</p>
          </div>
        ) : (
          <DocumentList groups={groups} />
        )}

        <p className="mt-16 rounded-2xl border border-dashed border-line bg-paper-2/60 p-5 text-center text-sm text-muted">
          Vous êtes membre de l&apos;organisation ?{' '}
          <Link href="/admin/collections/documents" className="link-underline font-medium text-brand-700">
            Déposez un document depuis l&apos;espace membres
          </Link>
          .
        </p>
      </div>
    </>
  )
}
