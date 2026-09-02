import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Accès direct à Payload (API locale) : pas d'aller-retour HTTP vers notre propre site
 * comme le faisait l'ancien `fetch(NEXT_PUBLIC_SERVER_URL/api/...)`.
 * `getPayload` met l'instance en cache entre les appels.
 */
export const getPayloadClient = () => getPayload({ config })
