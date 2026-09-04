import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Corrige les URLs des images et accélère les listes d'articles.
 *
 * 1. Préfixe de stockage des médias remis à vide. La migration précédente avait créé la
 *    colonne avec la valeur « media », alors que tous les fichiers déjà en ligne se trouvent
 *    à la racine du store Vercel Blob : les URLs générées pointaient vers un chemin inexistant
 *    et aucune image ne s'affichait.
 * 2. Index composites correspondant aux requêtes réelles du site : filtrage par statut
 *    (et catégorie) puis tri par date de publication.
 *
 * Migration idempotente : elle peut être rejouée sans effet de bord.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'documents';
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT '';
    ALTER TABLE "media" ALTER COLUMN "prefix" SET DEFAULT '';

    -- Les médias existants sont à la racine du store : tout préfixe hérité est effacé.
    UPDATE "media" SET "prefix" = '' WHERE "prefix" IS DISTINCT FROM '';

    CREATE INDEX IF NOT EXISTS "status_publishedAt_idx" ON "articles" USING btree ("status","published_at");
    CREATE INDEX IF NOT EXISTS "status_category_publishedAt_idx" ON "articles" USING btree ("status","category","published_at");
    CREATE INDEX IF NOT EXISTS "version_status_version_publishedAt_idx" ON "_articles_v" USING btree ("version_status","version_published_at");
    CREATE INDEX IF NOT EXISTS "version_status_version_category_version_publishedAt_idx" ON "_articles_v" USING btree ("version_status","version_category","version_published_at");
    CREATE INDEX IF NOT EXISTS "status_publishedAt_1_idx" ON "documents" USING btree ("status","published_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "status_publishedAt_idx";
    DROP INDEX IF EXISTS "status_category_publishedAt_idx";
    DROP INDEX IF EXISTS "version_status_version_publishedAt_idx";
    DROP INDEX IF EXISTS "version_status_version_category_version_publishedAt_idx";
    DROP INDEX IF EXISTS "status_publishedAt_1_idx";
    ALTER TABLE "documents" DROP COLUMN IF EXISTS "prefix";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";
  `)
}
