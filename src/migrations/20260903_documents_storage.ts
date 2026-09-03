import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration idempotente : ajoute ce que la refonte a introduit dans le schéma
 * (collection Documents, champ « déposé par » sur les médias, préfixes de stockage,
 * index) sans toucher aux données existantes. Chaque instruction vérifie l'existence
 * de l'objet avant de le créer : la migration peut être rejouée sans risque.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_documents_category" AS ENUM('reglement', 'statuts', 'charte', 'rapport', 'pv', 'formulaire', 'autre');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_documents_status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "documents" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "category" "enum_documents_category" DEFAULT 'autre' NOT NULL,
      "status" "enum_documents_status" DEFAULT 'draft' NOT NULL,
      "published_at" timestamp(3) with time zone,
      "uploaded_by_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url" varchar,
      "thumbnail_u_r_l" varchar,
      "filename" varchar,
      "mime_type" varchar,
      "filesize" numeric,
      "width" numeric,
      "height" numeric,
      "prefix" varchar DEFAULT 'documents'
    );
    ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'documents';

    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "uploaded_by_id" integer;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'media';

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "documents_id" integer;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'documents_uploaded_by_id_users_id_fk') THEN
        ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_id_users_id_fk"
          FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'media_uploaded_by_id_users_id_fk') THEN
        ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_id_users_id_fk"
          FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_documents_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk"
          FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "articles_category_idx" ON "articles" USING btree ("category");
    CREATE INDEX IF NOT EXISTS "articles_published_at_idx" ON "articles" USING btree ("published_at");
    CREATE INDEX IF NOT EXISTS "articles_status_idx" ON "articles" USING btree ("status");
    CREATE INDEX IF NOT EXISTS "_articles_v_version_version_category_idx" ON "_articles_v" USING btree ("version_category");
    CREATE INDEX IF NOT EXISTS "_articles_v_version_version_published_at_idx" ON "_articles_v" USING btree ("version_published_at");
    CREATE INDEX IF NOT EXISTS "_articles_v_version_version_status_idx" ON "_articles_v" USING btree ("version_status");

    CREATE INDEX IF NOT EXISTS "documents_category_idx" ON "documents" USING btree ("category");
    CREATE INDEX IF NOT EXISTS "documents_status_idx" ON "documents" USING btree ("status");
    CREATE INDEX IF NOT EXISTS "documents_published_at_idx" ON "documents" USING btree ("published_at");
    CREATE INDEX IF NOT EXISTS "documents_uploaded_by_idx" ON "documents" USING btree ("uploaded_by_id");
    CREATE INDEX IF NOT EXISTS "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "documents_filename_idx" ON "documents" USING btree ("filename");
    CREATE INDEX IF NOT EXISTS "media_uploaded_by_idx" ON "media" USING btree ("uploaded_by_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "documents_id";
    DROP TABLE IF EXISTS "documents" CASCADE;
    ALTER TABLE "media" DROP COLUMN IF EXISTS "uploaded_by_id";
    DROP TYPE IF EXISTS "public"."enum_documents_category";
    DROP TYPE IF EXISTS "public"."enum_documents_status";
  `)
}
