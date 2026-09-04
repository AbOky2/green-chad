/**
 * Génère une migration Payload (`npm run db:migrate:create <nom>`).
 *
 * Le plugin de stockage n'ajoute ses colonnes (dont « prefix ») que lorsqu'un jeton Blob est
 * présent. Sans jeton, la migration générée en local ne correspondrait pas au schéma de
 * production. On fournit donc un jeton de forme valide par défaut : il ne sert qu'à construire
 * le schéma, aucune requête réseau n'est faite pendant la génération.
 */
import { spawnSync } from 'node:child_process'
import nextEnv from '@next/env'

nextEnv.loadEnvConfig(process.cwd())

const PLACEHOLDER = 'vercel_blob_rw_schemaonly000_placeholder'
const env = { ...process.env }
if (!env.BLOB_READ_WRITE_TOKEN) {
  env.BLOB_READ_WRITE_TOKEN = PLACEHOLDER
  console.log('[db-migrate-create] Jeton Blob absent : jeton de schéma utilisé pour la génération.')
}

const result = spawnSync('npx', ['payload', 'migrate:create', ...process.argv.slice(2)], { stdio: 'inherit', env })
process.exit(result.status ?? 1)
