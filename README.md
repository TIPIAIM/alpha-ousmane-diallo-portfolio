# Portfolio d’Alpha Ousmane Diallo

Projet source autonome pour travailler dans VS Code. Application Next.js, React et TypeScript. Aucune configuration d’hébergement n’est requise pour démarrer en local.

## 1. Préparer le poste

Installez Node.js 22.13 ou une version plus récente. Dans le terminal VS Code ouvert à la racine du projet :

```bash
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install
pnpm dev
```

Ouvrez http://127.0.0.1:3000. Pour les lancements suivants, `pnpm dev` suffit ; ne répétez `pnpm install` que si les dépendances changent ou si vous récupérez le projet sur un autre ordinateur.

**Windows PowerShell :** si `corepack enable` exige des droits administrateur, lancez PowerShell en administrateur pour cette seule commande, puis rouvrez le terminal VS Code. Vous pouvez aussi installer pnpm 11.25.0 avec `npm install -g pnpm@11.25.0` et utiliser ensuite `pnpm install`.

## 2. Comprendre les dossiers

| Fichier ou dossier | Rôle |
| --- | --- |
| `app/page.tsx` | Page d’accueil du portfolio et sections visibles. |
| `app/content.ts` | Textes et données initiales en français et en anglais. |
| `app/globals.css` | Styles globaux. |
| `app/contact-form.tsx` | Formulaire de contact. |
| `app/admin/` | Éditeur local de projets et d’articles. |
| `app/local-content.ts` | Enregistrement local des modifications de l’éditeur. |
| `public/` | Images, icône et CV téléchargeable. |
| `next.config.ts` | Configuration Next.js. |
| `package.json` | Commandes et dépendances directes. |
| `pnpm-lock.yaml` | Versions précises des paquets installés. |
| `.env.example` | Modèle des réglages facultatifs du formulaire. |

Les données modifiées dans `/admin` restent dans le navigateur qui les a créées (`localStorage`). Elles ne deviennent pas automatiquement visibles pour les autres visiteurs ni enregistrées dans GitHub. Pour changer le contenu initial livré à tous, modifiez `app/content.ts`.

## 3. Dépendances

La commande `pnpm install` installe tout ce qui figure dans `package.json`. **Il n’est pas nécessaire d’installer chaque paquet séparément.**

| Dépendance | Utilité |
| --- | --- |
| `next`, `react`, `react-dom` | Pages, interface et serveur de développement. |
| `typescript` et `@types/*` | Vérification des types et aide dans VS Code. |
| `styled-components` | Styles des composants. |
| `lucide-react` | Icônes. |
| `@emailjs/browser` | Envoi du formulaire, si configuré. |
| `react-helmet` | Métadonnées des pages. |

## 4. Formulaire facultatif

Copiez `.env.example` vers `.env.local` puis renseignez vos identifiants EmailJS :

```powershell
Copy-Item .env.example .env.local
```

Le formulaire utilise `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` et `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. Le modèle EmailJS doit définir `from_name`, `reply_to`, `subject` et `message`. Redémarrez `pnpm dev` après modification. Si vous ne configurez pas EmailJS, l’adresse email affichée sur la page reste utilisable.

## 5. Quand vous serez prêt

- Vérifier les types : `pnpm typecheck`.
- Construire le projet vous-même : `pnpm build`.
- Démarrer la version construite : `pnpm start`.

Le projet livré n’inclut aucun résultat de compilation. Le fichier `.gitignore` exclut `node_modules`, `.next` et `.env.local` de votre futur dépôt GitHub.
