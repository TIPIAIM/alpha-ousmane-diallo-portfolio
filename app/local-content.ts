import { experience, projects, type Project } from "./content";

export type Article = {
  id: string;
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  body: { fr: string; en: string };
  category: string;
  date: string;
  published: boolean;
};
export type PortfolioContent = { projects: Project[]; articles: Article[] };
export const STORAGE_KEY = "alpha-ousmane-portfolio-content-v1";
export const CONTENT_EVENT = "portfolio-content-updated";
const PROJECT_MIGRATION_KEY = "alpha-ousmane-projects-fades-boutique-v1";
const CV_PROJECT_MIGRATION_KEY = "alpha-ousmane-cv-projects-v1";
const CV_DATES_MIGRATION_KEY = "alpha-ousmane-cv-dates-v1";
const ARTICLES_MIGRATION_KEY = "alpha-ousmane-articles-editoriaux-v1";
const NEW_ARTICLES_MIGRATION_KEY = "alpha-ousmane-articles-boutique-dixinn-v1";
// Ces articles sont intégrés au portfolio et ajoutés une fois aux données locales existantes.
export const featuredArticles: Article[] = [
  {
    id: "fades-rh-regles-metier",
    title: {
      fr: "FADES-RH : concevoir un ERP autour des règles métier",
      en: "FADES-RH: designing an ERP around business rules",
    },
    excerpt: {
      fr: "Organisations, accès et rapports : ce que la conception d’un ERP RH exige au-delà des écrans.",
      en: "Organizations, access and reports: what HR ERP design requires beyond screens.",
    },
    body: {
      fr: `Un ERP RH ne se résume pas à des fiches d’agents et à quelques tableaux de bord. Les données circulent entre organisations, services et utilisateurs qui n’ont pas tous les mêmes responsabilités. La difficulté est de garder une information cohérente tout en donnant à chacun le bon niveau d’accès.

Dans FADES-RH, je travaille sur cette articulation entre les modules : agents, tâches, pointages, congés, évaluations et rapports. Une modification dans un module doit rester compréhensible dans les autres. Les droits d’accès et l’isolation des données par organisation font donc partie de la conception, dès le départ.

Le module Rapports illustre bien ce travail. Il faut distinguer la rédaction, les modifications, la validation et l’export, puis traduire ces étapes en règles claires dans l’interface et dans l’application. Un bon formulaire ne suffit pas si les permissions ou les données affichées ne suivent pas la même logique.

Ce projet, encore en développement, renforce une conviction : pour construire une application métier utile, il faut comprendre le travail réel des personnes qui vont l’utiliser avant de choisir la forme des écrans.`,
      en: `An HR ERP is more than employee records and dashboards. Data moves across organizations, departments and users with different responsibilities. The challenge is to keep information consistent while giving each person the right level of access.

In FADES-RH, I work on the relationships among modules for employees, tasks, attendance, leave, evaluations and reports. A change in one module must remain understandable in the others. Access rules and data separation between organizations are part of the design from the start.

The Reports module is a useful example. Drafting, editing, validation and export are distinct steps that need clear rules in both the interface and the application. A good form is not enough when permissions and displayed data do not follow the same logic.

The project is still in development. It reinforces my view that building a useful business application starts with understanding how people actually work, before deciding what the screens should look like.`,
    },
    category: "ERP · FADES-RH",
    date: "27/09/2026",
    published: true,
  },
  {
    id: "casier-judiciaire-parcours",
    title: {
      fr: "Numériser une demande de casier judiciaire : penser au parcours complet",
      en: "Digitizing criminal record requests: designing the complete journey",
    },
    excerpt: {
      fr: "Du dépôt de la demande à la vérification du bulletin : retour sur un projet de Master.",
      en: "From submitting a request to verifying the document: lessons from a Master’s project.",
    },
    body: {
      fr: `Dans mon projet de fin d’études de Master, j’ai conçu une application web consacrée aux demandes de casier judiciaire. L’enjeu ne consistait pas seulement à remplacer un formulaire papier par un formulaire en ligne. Il fallait réfléchir à l’ensemble du parcours : inscription, dépôt de la demande, suivi, traitement et remise du document.

La confiance est centrale dans ce type de service. Le demandeur doit comprendre où en est sa démarche. De leur côté, les personnes chargées du traitement ont besoin d’une vue structurée des demandes. Le document produit doit également pouvoir être vérifié : le projet prévoit des bulletins PDF certifiés et un QR code de vérification.

Ce travail m’a appris à relier trois dimensions souvent traitées séparément : une interface accessible, des règles de traitement explicites et la vérification du document final. C’est à cette jonction que le développement Full-Stack prend son sens dans une application LegalTech.

Le mémoire associé à ce projet a été soutenu avec mention excellente. Je présenterai dans un prochain article un choix de conception précis, avec un schéma ou une capture expurgée des données sensibles.`,
      en: `For my Master’s capstone project, I designed a web application for criminal record requests. The goal was not simply to move a paper form online. I needed to consider the whole journey: registration, submission, tracking, processing and delivery of the document.

Trust is central to this kind of service. Applicants need to understand the status of their requests. Processing staff need a structured view of the submissions. The final document must also be verifiable: the project includes certified PDF documents and a verification QR code.

This work taught me to connect three dimensions often handled separately: an accessible interface, explicit processing rules and verification of the final document. That connection is where full-stack development becomes especially meaningful in a LegalTech application.

The associated dissertation received an excellent distinction. In a future article, I plan to describe a specific design decision with a diagram or a screenshot cleared of sensitive data.`,
    },
    category: "LegalTech · Retour d’expérience",
    date: "27/09/2026",
    published: true,
  },
  {
    id: "boutique-saas-vente-payee",
    title: {
      fr: "Gestion de boutique SaaS : pourquoi une vente payée ne s’annule pas d’un clic",
      en: "Retail SaaS: why a paid sale cannot be cancelled with one click",
    },
    excerpt: {
      fr: "Vente, paiement et caisse : traduire une règle commerciale en un parcours logiciel cohérent.",
      en: "Sales, payments and cash: turning a business rule into a consistent software workflow.",
    },
    body: {
      fr: `Une application de gestion de boutique peut sembler simple tant que l’on regarde seulement le catalogue et la liste des ventes. Dès que l’argent entre en jeu, chaque action a une conséquence sur plusieurs états : la vente, le paiement, l’encaissement et la caisse. C’est autour de cette cohérence que je conçois mon projet SaaS de gestion de boutique et sous-boutiques.

Prenons une vente déjà payée. Un bouton « Annuler » qui efface seulement la vente donnerait une vision trompeuse de l’activité : le paiement et l’encaissement ont bien eu lieu. Avant de permettre une annulation, l’application doit tenir compte de l’état du paiement et prévoir le traitement du remboursement. La règle métier devient ainsi une règle du produit, compréhensible pour la personne qui utilise l’interface.

Ce choix influe sur le parcours utilisateur. L’état d’une vente doit être visible ; une action impossible doit être expliquée au bon moment ; la caisse doit rester cohérente avec ce qui a effectivement été encaissé. Côté développement, il faut garder la même logique dans l’interface et dans le traitement des données, afin qu’un simple changement d’écran ne contourne pas la règle.

Le projet est encore en développement. Son périmètre précis pour les sous-boutiques reste à documenter. Ce travail illustre néanmoins ce qui m’intéresse dans les logiciels métiers : transformer une situation concrète, parfois ambiguë, en interactions claires et en données fiables.`,
      en: `A shop management app can look simple when you focus only on the catalogue and sales list. Once money is involved, each action affects several states: the sale, the payment, the cash receipt and the register. Keeping those states consistent is central to the retail and sub-shop management SaaS I am designing.

Consider a sale that has already been paid. A “Cancel” button that merely removes the sale would misrepresent what happened: the payment and receipt still took place. Before allowing cancellation, the application must account for payment status and the refund process. A business rule becomes a product rule that users can understand.

This decision shapes the user journey. The sale status should be visible, an unavailable action should be explained at the right moment, and the register should reflect what was actually collected. The interface and data handling must follow the same logic so that changing screens cannot bypass the rule.

The project is still in development, and the precise scope of sub-shops remains to be documented. It already shows what interests me in business software: turning a concrete, sometimes ambiguous situation into clear interactions and reliable data.`,
    },
    category: "SaaS · Gestion commerciale",
    date: "27/09/2026",
    published: true,
  },
  {
    id: "dixinn-suivi-dossiers",
    title: {
      fr: "ERP judiciaire : concevoir le suivi des dossiers au tribunal de Dixinn",
      en: "Judicial ERP: designing case tracking for the Dixinn court",
    },
    excerpt: {
      fr: "Références, pièces et décisions : organiser le parcours d’un dossier entre les services.",
      en: "References, documents and decisions: organizing a case across court departments.",
    },
    body: {
      fr: `Au tribunal, un dossier traverse plusieurs étapes et plusieurs services. Une référence, une pièce déposée, une attribution ou une décision doivent pouvoir être retrouvées sans perdre leur contexte. Dans le projet d’ERP du tribunal de première instance de Dixinn, je travaille sur cette question de traçabilité.

La plateforme réunit le suivi du parquet, des informations judiciaires, des décisions et des dossiers civils et pénaux. Parmi les fonctions prévues figurent les références RP/RI, le dépôt de pièces, la consultation des actes, l’attribution des dossiers, les alertes, les notifications, les statistiques et la prévisualisation des fichiers. L’enjeu de conception est de relier ces fonctions à un parcours compréhensible pour chaque service.

Une interface utile doit permettre de répondre rapidement à des questions concrètes : de quel dossier parle-t-on, quelle pièce est disponible, à qui est-il attribué, quelle action vient ensuite ? Pour y parvenir, il faut structurer les informations dès la saisie, rendre les références lisibles et éviter de disperser l’historique entre des écrans sans lien.

Ce projet, commencé en mars 2026, est encore en cours. Je présente ici les objectifs et les fonctions décrits dans mon CV, sans annoncer de résultat de déploiement. Il me rappelle qu’un bon ERP judiciaire se juge d’abord à la clarté du suivi quotidien qu’il rend possible.`,
      en: `At a court, a case moves through several stages and departments. A reference, submitted document, assignment or decision must remain easy to find in context. In the ERP project for the Dixinn Court of First Instance, I am working on this question of traceability.

The platform brings together prosecution work, judicial investigations, decisions, and civil and criminal cases. Planned features include RP/RI references, document uploads, access to records, case assignment, alerts, notifications, statistics and file previews. The design challenge is to connect these features in a workflow each department can understand.

A useful interface should answer practical questions quickly: which case is this, what document is available, who is responsible, and what happens next? That requires structured data entry, readable references and an accessible history across screens.

The project began in March 2026 and remains in progress. These are the objectives and features described in my résumé, without claiming deployment results. It reminds me that a good judicial ERP starts with making daily case tracking clear.`,
    },
    category: "ERP judiciaire · Conception",
    date: "27/09/2026",
    published: true,
  },
];
export const defaults: PortfolioContent = {
  projects,
  articles: featuredArticles,
};

export function readContent(): PortfolioContent {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return defaults;
    const data = parsed as Partial<PortfolioContent>;
    if (!Array.isArray(data.projects) || !Array.isArray(data.articles))
      return defaults;
    // Ajoute une fois les deux projets aux données déjà enregistrées sur cet appareil.
    // Les projets et articles personnalisés restent inchangés.
    if (localStorage.getItem(PROJECT_MIGRATION_KEY) !== "done") {
      const additions = projects.filter(
        (project) =>
          (project.id === "fades-rh" || project.id === "boutique") &&
          !data.projects!.some((existing) => existing.id === project.id)
      );
      if (additions.length) {
        data.projects = [...data.projects, ...additions];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      localStorage.setItem(PROJECT_MIGRATION_KEY, "done");
    }
    // Ajouter une seule fois les réalisations du CV aux données locales existantes.
    // Les autres projets et les articles créés par l'utilisateur restent en place.
    if (localStorage.getItem(CV_PROJECT_MIGRATION_KEY) !== "done") {
      const cvIds = new Set([
        "aod-vitrine",
        "cortex",
        "semyg",
        "coris",
        "mk-global",
        "transport",
      ]);
      const additions = projects.filter(
        (project) =>
          cvIds.has(project.id) &&
          !data.projects!.some((saved) => saved.id === project.id)
      );
      if (additions.length) {
        data.projects = [...data.projects, ...additions];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      localStorage.setItem(CV_PROJECT_MIGRATION_KEY, "done");
    }
    // Compléter les dates du CV sans écraser une période modifiée manuellement.
    if (localStorage.getItem(CV_DATES_MIGRATION_KEY) !== "done") {
      const previousDates: Record<string, string> = {
        justice: "2026 · En cours",
        aod: "2025 — 2026",
        ads: "2026 · En cours",
      };
      data.projects = data.projects.map((saved) => {
        const source = projects.find((project) => project.id === saved.id);
        return source && saved.date.fr === previousDates[saved.id]
          ? { ...saved, date: source.date }
          : saved;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(CV_DATES_MIGRATION_KEY, "done");
    }
    // Complète les galeries vides sans écraser les images saisies dans /admin.
    const currentProjects = data.projects.map((saved) => {
      const source = projects.find((project) => project.id === saved.id);
      if (!source) return saved;
      const legacy =
        saved.id === "aod" &&
        saved.screenshots?.length === 1 &&
        saved.screenshots[0] === "/images/projects/odvoct.avif";
      return !saved.screenshots?.length || legacy
        ? {
            ...saved,
            screenshots: source.screenshots,
            captions: source.captions,
          }
        : saved;
    });
    const savedIds = new Set(data.articles.map((article) => article.id));
    const missingArticles = featuredArticles.filter((article) => {
      const migrationKey =
        article.id === "boutique-saas-vente-payee" ||
        article.id === "dixinn-suivi-dossiers"
          ? NEW_ARTICLES_MIGRATION_KEY
          : ARTICLES_MIGRATION_KEY;
      return (
        localStorage.getItem(migrationKey) !== "done" &&
        !savedIds.has(article.id)
      );
    });
    const currentArticles = [...data.articles, ...missingArticles];
    if (localStorage.getItem(ARTICLES_MIGRATION_KEY) !== "done") {
      if (missingArticles.length)
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            projects: currentProjects,
            articles: currentArticles,
          })
        );
      localStorage.setItem(ARTICLES_MIGRATION_KEY, "done");
    }
    if (localStorage.getItem(NEW_ARTICLES_MIGRATION_KEY) !== "done") {
      if (missingArticles.length)
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            projects: currentProjects,
            articles: currentArticles,
          })
        );
      localStorage.setItem(NEW_ARTICLES_MIGRATION_KEY, "done");
    }
    return { projects: currentProjects, articles: currentArticles };
  } catch {
    return defaults;
  }
}
export function saveContent(content: PortfolioContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(CONTENT_EVENT));
}
export { experience };
