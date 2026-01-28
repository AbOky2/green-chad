This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Le site utilise des **polices système** (pas de chargement de polices externes) pour mieux fonctionner sur connexions lentes ou instables (ex. accès depuis le Tchad).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Configuration Email

Pour activer l'envoi d'emails depuis le formulaire de contact, vous devez configurer les variables d'environnement suivantes dans un fichier `.env.local` à la racine du projet :

```env
EMAIL_USER=greenchad2010@gmail.com
EMAIL_APP_PASSWORD=votre_mot_de_passe_application_ici
```

Les messages du formulaire de contact sont toujours envoyés à **greenchad2010@gmail.com**.

### Comment obtenir un mot de passe d'application Gmail :

1. Allez sur [https://myaccount.google.com/](https://myaccount.google.com/)
2. Activez la **Validation en 2 étapes** si ce n'est pas déjà fait
3. Allez dans **Sécurité** > **Mots de passe des applications**
4. Sélectionnez "Autre (nom personnalisé)" et entrez "GreenTchad Website"
5. Copiez le mot de passe généré et collez-le dans `EMAIL_APP_PASSWORD`

**Important :** Ne partagez jamais votre mot de passe d'application et ne le commitez pas dans Git.

### Erreur 500 sur le formulaire de contact

Si tu obtiens une erreur 500 (en local ou en prod) :

- **En local** : vérifie que `.env.local` existe à la racine du projet, qu’il contient `EMAIL_USER` et `EMAIL_APP_PASSWORD`, et que tu as redémarré le serveur (`npm run dev`) après les avoir ajoutées.
- **Sur Vercel** : va dans **Settings** → **Environment Variables**, ajoute `EMAIL_USER` et `EMAIL_APP_PASSWORD` pour **Production** (et **Preview** si tu veux), puis **Redeploy** le projet.
- Consulte les logs : en local dans le terminal, sur Vercel dans **Deployments** → ton déploiement → **Functions** / logs. Si tu vois `[Contact API] Variables manquantes` ou `[Contact API] Erreur envoi email`, c’est bien un souci de config ou de Gmail.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**Note :** N'oubliez pas de configurer les variables d'environnement dans les paramètres de votre projet Vercel.

## Accès depuis certaines régions (ex. Tchad)

Si le site [https://www.greenchad.com](https://www.greenchad.com) ne charge pas ou ne s’affiche pas correctement depuis certains pays (ex. Tchad), causes possibles :

- **Connexion lente ou instable** : le site timeout avant de charger (réseau mobile, WiFi faible).
- **DNS** : le domaine ne se résout pas correctement (FAI, DNS locaux).
- **Blocage ou filtrage** : certains FAI ou réseaux bloquent des domaines ou CDN.
- **Réseau loin des serveurs** : Vercel sert depuis des edge (ex. Afrique du Sud), la latence depuis le Tchad peut être élevée.

### Diagnostic rapide

1. **Test minimal** : ouvrir **https://www.greenchad.com/api/health**  
   - Si tu obtiens `{"ok":true}` → le domaine et Vercel répondent ; le blocage vient plutôt de la page d’accueil (JS, images, etc.).
   - Si ça timeout ou erre → problème de connexion, DNS ou blocage vers le domaine / Vercel.

2. **À faire côté utilisateur** : tester en **4G** vs WiFi, **autre navigateur** ou **navigation privée**, ou **autre réseau** (autre opérateur, partage de connexion).

3. **VPN** : essayer avec un VPN pour voir si le souci disparaît (suggère un blocage ou filtrage local).
