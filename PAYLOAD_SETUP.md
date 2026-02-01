# Guide de configuration Payload CMS

## Vue d'ensemble

Payload CMS a été intégré au projet Green-Chad pour permettre la gestion des articles et du blog. Voici tout ce qui a été mis en place :

## 📦 Ce qui a été installé

- **Payload CMS** (v3.74.0) - CMS headless moderne
- **PostgreSQL adapter** - Pour utiliser PostgreSQL avec Payload
- **Lexical editor** - Éditeur de texte riche moderne
- **SEO plugin** - Optimisation SEO automatique
- **Sharp** - Traitement d'images optimisé

## 🗂️ Structure créée

```
├── payload.config.ts                    # Configuration principale Payload
├── src/
│   ├── payload/
│   │   └── collections/
│   │       ├── Users.ts                 # Collection utilisateurs (auth)
│   │       ├── Articles.ts              # Collection articles/blog
│   │       └── Media.ts                 # Collection médias (images)
│   ├── app/
│   │   ├── (payload)/admin/             # Interface admin Payload
│   │   └── blog/
│   │       ├── page.tsx                 # Liste des articles
│   │       └── [slug]/page.tsx          # Page article individuel
│   └── components/
│       └── BlogSection.tsx              # Section blog pour homepage
└── public/
    └── uploads/                         # Dossier uploads (gitignored)
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

## 👥 Gestion des utilisateurs

Dans l'admin, vous pouvez créer plusieurs utilisateurs avec différents rôles :

- **Admin** : accès complet (gestion utilisateurs, articles, médias)
- **Éditeur** : peut publier et éditer tous les articles
- **Auteur** : peut créer et éditer ses propres articles

**Créer un nouvel utilisateur** : Admin → Collections → Users → Create New

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

### Redéploiement

Après avoir ajouté les variables, **redéployez** le projet :
- **Deployments** → **⋯** sur le dernier déploiement → **Redeploy**

### Premier admin en prod

1. Allez sur **https://www.greenchad.com/admin**
2. Créez le premier utilisateur admin (comme en local)
3. Vous pouvez maintenant publier des articles en production !

## 🔒 Sécurité

- ✅ Le dossier `public/uploads/` est dans `.gitignore` (ne committez jamais les images)
- ✅ `.env.local` est ignoré (ne partagez jamais vos secrets)
- ✅ Les articles avec `status: draft` ne sont visibles que par les admins
- ✅ L'authentification Payload est sécurisée par défaut

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

Puis dans `src/components/BlogSection.tsx` et `src/app/blog/page.tsx`, ajoutez la couleur :

```typescript
const categoryColors: Record<string, string> = {
  // ... couleurs existantes
  'nouvelle-categorie': "bg-indigo-100 text-indigo-700",
};
```

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
→ Le dossier `public/uploads/` doit exister. Payload le crée automatiquement au premier upload.

### Articles ne s'affichent pas sur /blog
→ Vérifiez que les articles ont `status: published` dans l'admin

## ✨ Fonctionnalités disponibles

- ✅ Éditeur de texte riche (Lexical)
- ✅ Upload d'images avec redimensionnement automatique (thumbnail, card, featured)
- ✅ Gestion des brouillons et versions
- ✅ SEO automatique (meta title, description)
- ✅ Catégories et tags
- ✅ Multi-auteurs avec rôles
- ✅ Recherche et filtres dans l'admin
- ✅ API REST pour intégrations tierces (`/api/articles`)

Vous êtes prêt à publier vos premiers articles ! 🎉
