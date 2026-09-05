# Guide de configuration Payload CMS

## Vue d'ensemble

Payload CMS a été intégré au projet Green-Chad pour permettre la gestion des articles et du blog. Voici tout ce qui a été mis en place :

## 📦 Ce qui a été installé

- **Payload CMS** (v3.74.0) - CMS headless moderne
- **PostgreSQL adapter** - Pour utiliser PostgreSQL avec Payload
- **Lexical editor** - Éditeur de texte riche moderne
- **SEO plugin** - Optimisation SEO automatique
- **Sharp** - Traitement d'images optimisé

## 🗂️ Structure du projet

```
├── payload.config.ts                    # Configuration principale Payload
├── payload-types.ts                     # Types générés (npm run generate:types) — committé
├── src/
│   ├── payload/
│   │   ├── access/                      # Règles d'accès par rôle (admin / éditeur / auteur)
│   │   ├── collections/
│   │   │   ├── Users.ts                 # Comptes des membres (auth)
│   │   │   ├── Articles.ts              # Articles du blog
│   │   │   ├── Documents.ts             # Fichiers partagés avec le public (PDF, Word…)
│   │   │   └── Media.ts                 # Images (réduites + WebP automatiquement)
│   │   ├── hooks/                       # Quota de stockage, invalidation du cache
│   │   ├── plugins/blobClientUploads.ts # Envoi direct navigateur → Vercel Blob
│   │   ├── components/                  # Widget « Espace de stockage » du tableau de bord
│   │   └── storage.ts                   # Limites de taille, quota, types acceptés
│   ├── lib/                             # Accès aux données (API locale Payload + cache Next)
│   ├── app/
│   │   ├── (payload)/admin/             # Interface d'administration
│   │   └── (frontend)/                  # Site public : accueil, /blog, /documents
│   └── components/                      # Composants du site
```

## 🚀 Configuration étape par étape

### 1. Base de données PostgreSQL (Neon - gratuit)

1. **Créer un compte Neon** : [neon.tech](https://neon.tech)
2. **Créer un projet** et noter la **Connection String**
3. La Connection String ressemble à :
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Variables d'environnement

Créez `.env.local` à la racine avec :

```env
# Email (déjà configuré)
EMAIL_USER=greenchad2010@gmail.com
EMAIL_APP_PASSWORD=votre_mot_de_passe_gmail

# Payload CMS
PAYLOAD_SECRET=<générer_avec_npm_run_generate:secret>
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Stockage des fichiers (facultatif en local : sans jeton, les fichiers vont dans ./media et ./documents)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx
# Limites de stockage (valeurs par défaut si absentes)
MAX_FILE_SIZE_MB=20
STORAGE_QUOTA_MB=1000
STORAGE_WARN_PERCENT=80
```

**Générer PAYLOAD_SECRET** :
```bash
npm run generate:secret
```

Copiez la valeur générée dans `.env.local`.

### 3. Premier démarrage

```bash
npm run dev
```

Payload créera automatiquement les tables dans la base de données au premier démarrage.

### 4. Créer le premier utilisateur admin

1. Ouvrez **http://localhost:3000/admin**
2. Remplissez le formulaire :
   - **Email** : votre email
   - **Password** : mot de passe sécurisé (8+ caractères)
   - **Name** : votre nom complet
   - **Role** : Admin

3. Cliquez sur **Create** → vous êtes connecté à l'admin !

## 📝 Créer votre premier article

1. Dans l'admin Payload : **Collections** → **Articles** → **Create New**
2. Remplissez :
   - **Titre** : titre de l'article
   - **Slug** : URL (ex: `mon-premier-article`)
   - **Extrait** : résumé court (150-200 caractères)
   - **Image à la une** : cliquez **Choose File** → Upload → Sélectionnez
   - **Contenu** : texte principal (éditeur riche)
   - **Auteur** : sélectionnez votre compte
   - **Catégorie** : choisissez (Environnement, Éducation, etc.)
   - **Date de publication** : maintenant ou future
   - **Statut** : **Publié** (pour rendre visible sur le site)

3. **Save** → l'article est publié !

## 🌐 Accès aux pages

| URL | Description |
|-----|-------------|
| `/admin` | Interface d'administration Payload |
| `/blog` | Liste de tous les articles publiés |
| `/blog/[slug]` | Page d'un article individuel |
| `/api/articles` | API REST pour récupérer les articles |

## 👥 Gestion des utilisateurs et rôles

Seul un **administrateur** peut créer des comptes ou changer un rôle (Admin → Collections → Utilisateurs → Créer).

| Rôle | Articles & documents | Médias | Utilisateurs |
|------|----------------------|--------|--------------|
| **Administrateur** | Tout gérer | Tout gérer | Créer, modifier, supprimer |
| **Éditeur** | Créer, modifier et supprimer tous les contenus | Tout gérer | Modifier sa propre fiche |
| **Auteur** | Créer ; modifier et supprimer **ses propres** contenus | Ses propres images | Modifier sa propre fiche |

Le public ne voit que les contenus au statut **Publié**. Les emails des membres ne sont jamais exposés par l'API publique.

## 📁 Documents partagés (règlement intérieur, chartes…)

1. Admin → **Documents** → **Créer**
2. Choisissez le fichier (PDF, Word, Excel, PowerPoint, OpenDocument, texte, image), donnez un **titre**, une **catégorie** et éventuellement une description
3. Passez le statut à **Publié** → le fichier apparaît sur **https://www.greenchad.com/documents**, classé par catégorie, avec un bouton « Télécharger »

Le membre qui dépose un fichier est enregistré automatiquement (« Déposé par »). Les auteurs ne peuvent modifier ou supprimer que leurs propres fichiers.

## 💾 Gestion du stockage (offre gratuite Vercel Blob)

Le stockage gratuit est limité (≈ 1 Go). Plusieurs garde-fous sont en place :

- **Images réduites automatiquement** : max. 1600 px et conversion **WebP** (une photo de téléphone de 5 Mo pèse ~300 Ko une fois stockée). Les déclinaisons (vignette, carte, une) sont aussi en WebP.
- **Taille maximale par fichier** : `MAX_FILE_SIZE_MB` (20 Mo par défaut).
- **Quota global** : `STORAGE_QUOTA_MB` (1000 Mo par défaut). Un envoi qui dépasserait le quota est refusé avec un message explicite.
- **Tableau de bord** : un widget « Espace de stockage » en haut de l'admin affiche l'espace utilisé par les images et les documents, et alerte à partir de `STORAGE_WARN_PERCENT` (80 %).
- **Envoi direct navigateur → Blob** : les fichiers ne transitent pas par le serveur (limite de 4,5 Mo des fonctions Vercel contournée), et le jeton d'envoi porte les limites de taille et de type.
- **Fichiers servis directement par le CDN Blob** (plus de passage par une fonction serverless) : pages plus rapides et moins de charge.

Pour libérer de l'espace : supprimez les anciens médias/documents inutiles dans l'admin (le fichier est supprimé du Blob en même temps).

## 🗄️ Migrations de base de données (important en production)

En développement (`npm run dev`), Payload adapte automatiquement le schéma de la base. **En production, il ne le fait jamais** : toute évolution des collections doit passer par une migration, sinon les requêtes échouent (par exemple une liste d'articles vide alors que les articles existent).

- `npm run build` exécute d'abord `node scripts/db-migrate.mjs`, qui applique les migrations de `src/migrations/` sur la base indiquée par `DATABASE_URL` (Vercel dispose de cette variable au build). Les migrations du projet sont idempotentes : elles ne créent que ce qui manque et ne suppriment aucune donnée.
- `npm run db:migrate` applique les migrations à la main (par exemple sur la base Neon depuis votre poste, avec `DATABASE_URL` dans `.env.local`).
- Après avoir modifié une collection : `npm run db:migrate:create nom_du_changement` pour générer la migration, la relire, puis `npm run db:migrate` pour l'appliquer à votre base de développement. Le schéma n'est **jamais** modifié automatiquement au démarrage (`push: false`) : c'est ce qui garantit que développement et production restent identiques.
- Écrivez les migrations de façon **idempotente** (`IF NOT EXISTS`, `IF EXISTS`) : une migration rejouée ne doit jamais échouer ni détruire de données.
- Le script retire au passage le marqueur « dev » que Payload laisse dans la table `payload_migrations` quand la base a été mise à jour en mode développement ; sans cela, `payload migrate` s'arrêterait sur une question interactive impossible à répondre dans un build.

## 🗂️ Où sont rangés les fichiers dans Vercel Blob

- **Médias (images)** : à la racine du store, sans préfixe. C'est l'emplacement historique de toutes les images déjà en ligne ; leur donner un dossier changerait leur URL et les images ne s'afficheraient plus.
- **Documents** : dans le dossier `documents/`, la collection étant récente.

Ces valeurs sont centralisées dans `src/payload/storage.ts` (`MEDIA_PREFIX`, `DOCUMENTS_PREFIX`). Le plugin de stockage n'ajoute ses colonnes au schéma que lorsqu'un jeton Blob est présent : `npm run db:migrate:create` fournit donc automatiquement un jeton de schéma afin que les migrations générées en local correspondent exactement à la production.

## 🔐 Accès à l'administration depuis plusieurs URL

La configuration Payload ne définit **pas** `serverURL`, et ce n'est pas un oubli : Payload ajoute automatiquement cette valeur à sa liste CSRF. Dès lors, seule cette origine exacte peut utiliser le cookie de session. L'administration se retrouvait cassée sur toute autre URL (déploiement de prévisualisation Vercel, domaine avec ou sans « www ») : listes d'auteurs vides et message « Vous n'êtes pas autorisé à effectuer cette action » à chaque enregistrement, alors même que l'on est bien connecté.

Le cookie reste protégé par `SameSite=Lax`, qui empêche déjà un autre site de l'envoyer sur une requête d'écriture. Si vous devez un jour restreindre explicitement les origines, renseignez `csrf: [...]` avec **toutes** les URL utilisées (domaine de production, alias, prévisualisations), sinon l'administration redeviendra inaccessible depuis celles qui manquent.

## 📤 Déploiement sur Vercel

### Variables d'environnement Vercel

Dans **Vercel** → votre projet → **Settings** → **Environment Variables**, ajoutez :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `DATABASE_URL` | Connection string Neon PostgreSQL | Production, Preview |
| `PAYLOAD_SECRET` | Votre clé secrète | Production, Preview |
| `NEXT_PUBLIC_SERVER_URL` | `https://www.greenchad.com` | Production |
| `NEXT_PUBLIC_SERVER_URL` | `https://<preview-url>.vercel.app` | Preview |
| `EMAIL_USER` | `greenchad2010@gmail.com` | Production, Preview |
| `EMAIL_APP_PASSWORD` | Mot de passe Gmail | Production, Preview |
| `BLOB_READ_WRITE_TOKEN` | Jeton du store Vercel Blob (Storage → Blob → Connect) | Production, Preview |
| `MAX_FILE_SIZE_MB` / `STORAGE_QUOTA_MB` | (facultatif) limites de stockage | Production |

`DATABASE_URL` doit aussi être disponible **au build** (c'est le cas par défaut sur Vercel) pour que les migrations s'appliquent avant la génération des pages.

### Redéploiement

Après avoir ajouté les variables, **redéployez** le projet :
- **Deployments** → **⋯** sur le dernier déploiement → **Redeploy**

### Premier admin en prod

1. Allez sur **https://www.greenchad.com/admin**
2. Créez le premier utilisateur admin (comme en local)
3. Vous pouvez maintenant publier des articles en production !

## 🔒 Sécurité

- ✅ `.env.local` est ignoré (ne partagez jamais vos secrets)
- ✅ Les contenus en brouillon ne sont visibles que par les membres connectés
- ✅ Les emails des membres ne sont pas exposés publiquement
- ✅ Seul un administrateur peut créer des comptes ou modifier les rôles
- ✅ Les types de fichiers sont vérifiés côté serveur (contenu réel du fichier, pas seulement l'extension)
- ⚠️ L'ancienne route `/api/setup-admin` (qui créait un compte admin avec un mot de passe connu) a été supprimée : le premier compte se crée via `/admin`

## 🎨 Personnalisation

### Ajouter une catégorie

Éditez `src/payload/collections/Articles.ts` :

```typescript
{
  name: 'category',
  type: 'select',
  options: [
    // ... catégories existantes
    { label: 'Nouvelle Catégorie', value: 'nouvelle-categorie' },
  ],
}
```

Puis dans `src/lib/categories.ts`, ajoutez la couleur et le libellé court du filtre. Régénérez ensuite les types : `npm run generate:types`.

### Ajouter une catégorie de document

Éditez `DOCUMENT_CATEGORIES` dans `src/payload/collections/Documents.ts`, puis `npm run generate:types`.

### Modifier les champs d'article

Éditez `src/payload/collections/Articles.ts` pour ajouter/retirer des champs.

## 📚 Ressources

- [Documentation Payload CMS](https://payloadcms.com/docs)
- [Neon PostgreSQL Docs](https://neon.tech/docs/introduction)
- [Lexical Editor](https://lexical.dev/)

## 🆘 Dépannage

### Erreur "PAYLOAD_SECRET is required"
→ Assurez-vous que `PAYLOAD_SECRET` est dans `.env.local` (générez avec `npm run generate:secret`)

### Erreur de connexion à la base de données
→ Vérifiez que `DATABASE_URL` est correcte et que le projet Neon est actif

### Images ne s'affichent pas
→ En production, vérifiez `BLOB_READ_WRITE_TOKEN`. En local sans jeton, les fichiers sont écrits dans `./media` et `./documents`.

### « Espace de stockage insuffisant » à l'envoi
→ Le quota (`STORAGE_QUOTA_MB`) est atteint : supprimez des fichiers inutiles ou augmentez la valeur si votre offre Vercel le permet.

### Articles ne s'affichent pas sur /blog
→ Vérifiez que les articles ont `status: published` dans l'admin. Si aucun article n'apparaît alors qu'ils existent, la base n'a probablement pas reçu les dernières migrations : lancez `npm run db:migrate` (voir la section Migrations) puis redéployez.

## ✨ Fonctionnalités disponibles

- ✅ Éditeur de texte riche (Lexical)
- ✅ Upload d'images avec réduction et conversion WebP automatiques (thumbnail, card, featured)
- ✅ Documents téléchargeables par le public (/documents) avec quota de stockage
- ✅ Gestion des brouillons et versions
- ✅ SEO automatique (meta title, description)
- ✅ Catégories et tags
- ✅ Multi-auteurs avec rôles
- ✅ Recherche et filtres dans l'admin
- ✅ API REST pour intégrations tierces (`/api/articles`)

Vous êtes prêt à publier vos premiers articles ! 🎉
