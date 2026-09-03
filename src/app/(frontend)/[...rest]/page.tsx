import { notFound } from 'next/navigation'

/** Toute URL inconnue du site public affiche la page 404 avec l'en-tête et le pied de page. */
export default function CatchAllPage() {
  notFound()
}
