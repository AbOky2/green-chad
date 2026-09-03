/**
 * Applique les migrations Payload avant le build (Vercel) ou à la demande (`npm run db:migrate`).
 *
 * Pourquoi ce script : quand la base a été mise à jour en mode développement (« push »),
 * Payload y laisse un marqueur « dev » et `payload migrate` demande alors une confirmation
 * interactive, impossible dans un build automatisé (la commande s'arrêtait sans rien faire).
 * On retire ce marqueur, puis on lance `payload migrate` normalement. Les migrations du projet
 * sont idempotentes : elles ne créent que ce qui manque et ne suppriment aucune donnée.
 */
import { spawnSync } from 'node:child_process'
import nextEnv from '@next/env'
import pg from 'pg'

// Charge .env / .env.local comme le fait Next (sans effet sur Vercel où les variables existent déjà).
nextEnv.loadEnvConfig(process.cwd())

const url = process.env.DATABASE_URL
if (!url) {
  console.log('[db-migrate] DATABASE_URL absente : migrations ignorées.')
  process.exit(0)
}

const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(url)
const client = new pg.Client({ connectionString: url, ssl: isLocal ? undefined : { rejectUnauthorized: false } })

try {
  await client.connect()
  const { rows } = await client.query("SELECT to_regclass('public.payload_migrations') AS t")
  if (rows[0]?.t) {
    const res = await client.query("DELETE FROM payload_migrations WHERE batch = -1 AND name = 'dev'")
    if (res.rowCount) console.log('[db-migrate] Marqueur de développement retiré.')
  }
} catch (error) {
  console.error('[db-migrate] Connexion impossible :', error.message)
  process.exit(1)
} finally {
  await client.end().catch(() => {})
}

const result = spawnSync('npx', ['payload', 'migrate'], {
  stdio: 'inherit',
  env: { ...process.env, PAYLOAD_MIGRATING: 'true' },
})
process.exit(result.status ?? 1)
