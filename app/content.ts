export type Language = "fr" | "en";

export type Localized = { fr: string; en: string };

export type Project = {

  id: string;

  number: string;

  date: Localized;

  category: Localized;

  title: Localized;

  summary: Localized;

  problem: Localized;

  solution: Localized;

  role: Localized;

  features: Localized;

  result: Localized;

  tech: string[];

  link?: string;

  // Chemins locaux depuis public/, par exemple /images/projects/justice/accueil.webp

  screenshots?: string[];

  // Même ordre que screenshots : une légende FR/EN facultative par image.

  captions?: Localized[];

};

const t = (fr: string, en: string): Localized => ({ fr, en });

export const projects: Project[] = [

  {

    id: "justice",

    number: "01",

    date: t("Mars 2026 — en cours", "March 2026 — ongoing"),

    category: t("ERP judiciaire", "Judicial ERP"),

    title: t(

      "Tribunal de première instance de Dixinn",

      "Dixinn Court of First Instance"

    ),

    summary: t(

      "Un système de gestion pour structurer le suivi des dossiers et des activités juridictionnelles.",

      "A management system to organize case tracking and court operations."

    ),

    problem: t(

      "Le suivi des dossiers, actes et décisions requiert une traçabilité cohérente entre les services du tribunal.",

      "Cases, documents and decisions require consistent tracking across court departments."

    ),

    solution: t(

      "Un ERP réunissant parquet, informations judiciaires, décisions et dossiers civils et pénaux.",

      "An ERP bringing together prosecution, investigations, decisions, civil and criminal cases."

    ),

    role: t(

      "Conception et développement de la plateforme.",

      "Platform design and development."

    ),

    features: t(

      "Références RP/RI, dépôt de pièces, consultation des actes, attribution des dossiers, alertes, statistiques, notifications et prévisualisation des fichiers.",

      "RP/RI references, document uploads, document access, case assignment, alerts, analytics, notifications and file previews."

    ),

    result: t(

      "Projet en cours. L’objectif décrit dans le CV est d’améliorer la traçabilité, le traitement administratif et la supervision.",

      "In progress. The goal stated in the résumé is to improve traceability, administrative processing and oversight."

    ),

    tech: [

      "React",

      "Vite",

      "Node.js",

      "Express",

      "MongoDB",

      "Socket.IO",

      "Recharts",

    ],

    screenshots: [

      "/images/projects/tribunl1.avif",

      "/images/projects/tribunl2.avif",

    ],

    captions: [

      t("Accueil du tribunal", "Court homepage"),

      t(

        "Accès rapide et accueil du public",

        "Quick access and public information"

      ),

    ],

  },

  {

    id: "aod",

    number: "02",

    date: t("Décembre 2025 — mai 2026", "December 2025 — May 2026"),

    category: t("LegalTech · ERP", "LegalTech · ERP"),

    title: t(

      "Gestion de cabinet · AOD AVOCATS",

      "Law practice management · AOD AVOCATS"

    ),

    summary: t(

      "Clients, dossiers, audiences et indicateurs réunis dans un espace de pilotage métier.",

      "Clients, cases, hearings and indicators brought into one practice workspace."

    ),

    problem: t(

      "Les opérations d’un cabinet d’avocats demandent un suivi partagé et des rappels fiables.",

      "A law firm needs shared operational tracking and reliable reminders."

    ),

    solution: t(

      "Une solution ERP dédiée à la digitalisation des opérations du cabinet.",

      "An ERP dedicated to digitizing law firm operations."

    ),

    role: t(

      "Pilotage, structuration des besoins métier et réalisation de la solution.",

      "Project leadership, business requirements and implementation."

    ),

    features: t(

      "Gestion des clients, dossiers et audiences, suivi des activités, rappels automatisés et tableaux de bord.",

      "Client, case and hearing management, activity tracking, automated reminders and dashboards."

    ),

    result: t(

      "Le CV mentionne un objectif de gain de temps et de gestion interne plus efficace, sans résultat chiffré publié.",

      "The résumé describes time savings and better internal management as goals, without published measurements."

    ),

    tech: [

      "React",

      "Vite",

      "Node.js",

      "Express",

      "MongoDB",

      "Zustand",

      "Socket.IO",

    ],

    screenshots: ["/images/projects/odplteforme1.avif"],

    captions: [

      t(

        "Connexion à la plateforme du cabinet",

        "Law practice platform sign-in"

      ),

    ],

    link: "https://www.aodavocats-nimba.com",

  },

  {

    id: "casier",

    number: "03",

    date: t("2023 — 2025 · Master", "2023 — 2025 · Master’s"),

    category: t("Justice numérique", "Digital justice"),

    title: t("Demandes de casier judiciaire", "Criminal record requests"),

    summary: t(

      "Demande, traitement et certification du bulletin n° 3 dans une application web.",

      "An application for requesting, processing and certifying criminal record documents."

    ),

    problem: t(

      "Le processus de demande doit être suivi, sécurisé et permettre de vérifier l’authenticité des bulletins.",

      "The request process must be tracked, secure and allow document authenticity to be verified."

    ),

    solution: t(

      "Une plateforme full-stack avec bulletins PDF certifiés et QR code de vérification.",

      "A full-stack platform with certified PDFs and QR verification."

    ),

    role: t(

      "Conception et développement dans le cadre du projet de fin d’études de Master.",

      "Design and development for a Master’s capstone project."

    ),

    features: t(

      "Inscription sécurisée, suivi des demandes, gestion des condamnations, PDF, QR code, email, notifications et tableau de bord.",

      "Secure registration, request tracking, conviction records, PDF, QR code, email, notifications and dashboard."

    ),

    result: t(

      "Mémoire soutenu avec mention excellente. Aucun chiffre d’usage ne figure dans le CV.",

      "Dissertation defended with an excellent distinction. No usage figures appear in the résumé."

    ),

    tech: [

      "React",

      "Vite",

      "Node.js",

      "Express",

      "MongoDB",

      "Vitest",

      "Cypress",

    ],

    screenshots: [

      "/images/projects/csier1.avif",

      "/images/projects/csier2.avif",

    ],

    captions: [

      t(

        "Accueil des demandes de casier judiciaire",

        "Criminal record request homepage"

      ),

      t("Étapes de la demande", "Request steps"),

    ],

  },

  {

    id: "tontine",

    number: "04",

    date: t("Projet web", "Web project"),

    category: t("Application métier", "Business application"),

    title: t("Gestion de tontines", "Savings circle management"),

    summary: t(

      "Une plateforme pour suivre membres, cotisations, cycles et bénéficiaires.",

      "A platform to track members, contributions, cycles and beneficiaries."

    ),

    problem: t(

      "Les cotisations et cycles nécessitent une gestion centralisée et une piste d’audit.",

      "Contributions and cycles need centralized management and an audit trail."

    ),

    solution: t(

      "Une interface administrateur pour piloter l’ensemble du processus.",

      "An administrator workspace for the entire process."

    ),

    role: t(

      "Conception et développement de la plateforme.",

      "Platform design and development."

    ),

    features: t(

      "Membres, cycles, cotisations, paiements, bénéficiaires, relances email, rapports, journal d’audit et sauvegardes.",

      "Members, cycles, contributions, payments, beneficiaries, email reminders, reports, audit log and backups."

    ),

    result: t(

      "Les fonctionnalités figurent dans le CV ; aucune mesure d’impact ou date de mise en service n’est indiquée.",

      "The features are listed in the résumé; no impact measurement or launch date is given."

    ),

    tech: ["React", "Vite", "Node.js", "MongoDB", "Socket.IO", "Zustand"],

    screenshots: [

      "/images/projects/tontin1.avif",

      "/images/projects/tontin2.avif",

    ],

    captions: [

      t("Connexion à la tontine", "Savings circle sign-in"),

      t("Création du compte administrateur", "Administrator account setup"),

    ],

  },

  {

    id: "ads",

    number: "05",

    date: t("Février 2026 — en cours", "February 2026 — ongoing"),

    category: t("Plateforme digitale", "Digital platform"),

    title: t("Campagnes & lectures rémunérées", "Campaigns & rewarded reading"),

    summary: t(

      "Campagnes publicitaires, engagement des membres et workflows de modération.",

      "Advertising campaigns, member engagement and moderation workflows."

    ),

    problem: t(

      "Entreprises, administrateurs et membres ont des parcours distincts de publication et d’interaction.",

      "Businesses, administrators and members need distinct publishing and interaction flows."

    ),

    solution: t(

      "Une plateforme full-stack avec validation des campagnes et logique de récompenses.",

      "A full-stack platform with campaign approval and reward logic."

    ),

    role: t(

      "Conception et développement full-stack.",

      "Full-stack design and development."

    ),

    features: t(

      "Rôles, campagnes, tickets, parrainage, portefeuille, retraits, quiz, modération et notifications en temps réel.",

      "Roles, campaigns, tickets, referrals, wallet, withdrawals, quizzes, moderation and real-time notifications."

    ),

    result: t(

      "Projet en cours ; les résultats d’exploitation ne sont pas renseignés dans le CV.",

      "In progress; operational results are not given in the résumé."

    ),

    tech: [

      "React",

      "Vite",

      "Node.js",

      "Express",

      "MongoDB",

      "JWT",

      "Socket.IO",

    ],

    screenshots: [],

  },

  {

    id: "fades-rh",

    number: "06",

    date: t("Projet en développement", "Project in development"),

    category: t("ERP · Ressources humaines", "ERP · Human resources"),

    title: t("FADES-RH", "FADES-RH"),

    summary: t(

      "Un ERP multi-organisations pour structurer la gestion des agents et le suivi du travail.",

      "A multi-organization ERP for employee administration and work tracking."

    ),

    problem: t(

      "Les informations RH, les tâches, les présences et les rapports doivent rester cohérents entre services, directions et organisations.",

      "HR records, tasks, attendance and reports must stay consistent across departments, divisions and organizations."

    ),

    solution: t(

      "Une application métier organisée par modules avec isolation des données par organisation et droits selon les rôles.",

      "A modular business application with organization-level data isolation and role-based access."

    ),

    role: t(

      "Développement et évolution des modules métier, des interfaces et des règles d’accès.",

      "Development and iteration of business modules, interfaces and access rules."

    ),

    features: t(

      "Agents, organisation, feuilles de route, évaluations, tâches, pointages, congés et rapports ; tableaux de bord, indicateurs et exports.",

      "Employees, organization, roadmaps, evaluations, tasks, attendance, leave and reports; dashboards, indicators and exports."

    ),

    result: t(

      "Projet en développement. Les modules et leurs règles métier ont été travaillés ; aucun résultat d’exploitation chiffré n’est disponible.",

      "In development. The modules and their business rules have been worked on; no measured operational results are available."

    ),

    tech: [

      "React",

      "TypeScript",

      "Vite",

      "Node.js",

      "Express",

      "MongoDB",

      "Mongoose",

      "Zod",

      "TanStack Query",

    ],

    screenshots: [],

  },

  {

    id: "boutique",

    number: "07",

    date: t("Projet en développement", "Project in development"),

    category: t("SAAS - Gestion commerciale", "SAAS - Retail management"),

    title: t(

      "Gestion de boutique et sous-boutiques SAAS",

      "Shop and sub-shop management SAAS"

    ),

    summary: t(

      "Une application de gestion des ventes, des paiements et de la caisse pour une activité de boutique.",

      "An application to manage sales, payments and cash operations for a retail business."

    ),

    problem: t(

      "Les ventes réglées et les encaissements exigent des règles cohérentes pour éviter les annulations incorrectes.",

      "Paid sales and cash receipts require consistent rules to prevent incorrect cancellations."

    ),

    solution: t(

      "Un parcours de gestion commerciale SAAS qui tient compte de l’état du paiement lors de l’annulation d’une vente.",

      "A retail management workflow that considers payment status before a sale can be cancelled."

    ),

    role: t(

      "Développement de l’application et travail sur les règles de vente et de caisse.",

      "Application development and work on sales and cash rules."

    ),

    features: t(

      "Ventes, paiements, encaissements, caisse et blocage de l’annulation d’une vente payée sans traitement du remboursement. Le périmètre précis des sous-boutiques reste à documenter.",

      "Sales, payments, cash receipts, cash register, and blocking cancellation of paid sales until refunds are handled. The precise sub-shop scope remains to be documented."

    ),

    result: t(

      "Projet en développement ; aucune mesure de déploiement ou d’impact n’a été communiquée.",

      "In development; no deployment or impact figures have been provided."

    ),

    tech: [],

    screenshots: ["/images/projects/odvoct2.avif"],

  },

  {

    id: "aod-vitrine",

    number: "08",

    date: t("Novembre 2025 — janvier 2026", "November 2025 — January 2026"),

    category: t(

      "Site institutionnel · LegalTech",

      "Institutional website · LegalTech"

    ),

    title: t(

      "Site vitrine · AOD AVOCATS",

      "AOD AVOCATS · Institutional website"

    ),

    summary: t(

      "Un site vitrine professionnel pour présenter l’identité et les services du cabinet d’avocats.",

      "A professional website presenting the law firm's identity and services."

    ),

    problem: t(

      "Présenter le cabinet et permettre aux visiteurs d’accéder clairement à ses informations.",

      "Present the firm and make its information easy for visitors to access."

    ),

    solution: t(

      "Un site institutionnel avec une interface moderne, responsive et animée.",

      "An institutional website with a modern, responsive and animated interface."

    ),

    role: t(

      "Développement du site vitrine du cabinet.",

      "Development of the firm's showcase website."

    ),

    features: t(

      "Présentation du cabinet et de ses services, navigation et adaptation aux écrans.",

      "Firm and service presentation, navigation and responsive layout."

    ),

    result: t(

      "Site cité dans le CV ; aucun résultat d’audience chiffré n’est indiqué.",

      "Website listed in the résumé; no audience metrics are provided."

    ),

    tech: ["React", "Vite", "styled-components", "Framer Motion"],

    link: "https://www.aod-avocats.com",

    screenshots: [

      "/images/projects/odsite1.avif",

      "/images/projects/odsite2.avif",

    ],

    captions: [

      t("Accueil du cabinet AOD AVOCATS", "AOD AVOCATS homepage"),

      t("Services du cabinet", "Law firm services"),

    ],

  },

  {

    id: "cortex",

    number: "09",

    date: t("Décembre — janvier 2025", "December — January 2025"),

    category: t(

      "Éducation · Site institutionnel",

      "Education · Institutional website"

    ),

    title: t(

      "Cortex-Institutt · Plateforme éducative",

      "Cortex-Institutt · Educational website"

    ),

    summary: t(

      "Site présentant l’identité de l’institut, ses formations, filières, partenaires et le programme Campus Cortex.",

      "A site presenting the institute, courses, study tracks, partners and Campus Cortex program."

    ),

    problem: t(

      "Structurer et rendre accessibles les informations sur l’institut et son offre éducative.",

      "Organize and make information about the institute and its educational offer accessible."

    ),

    solution: t(

      "Une interface responsive avec sections structurées, navigation intuitive et animations fluides.",

      "A responsive interface with structured sections, intuitive navigation and smooth animations."

    ),

    role: t(

      "Architecture frontend, intégration des contenus, cohérence graphique, affichage responsive, performance et accessibilité.",

      "Frontend architecture, content integration, visual consistency, responsive layout, performance and accessibility."

    ),

    features: t(

      "Présentation des formations, filières, partenaires, Campus Cortex et valeurs institutionnelles.",

      "Courses, study tracks, partners, Campus Cortex and institutional values."

    ),

    result: t(

      "Site présenté dans le CV ; aucun indicateur d’usage n’y est fourni.",

      "Website presented in the résumé; no usage metrics are provided."

    ),

    tech: [

      "React",

      "Vite",

      "styled-components",

      "Framer Motion",

      "React Router",

      "Swiper",

      "Cloudinary",

      "JavaScript",

      "HTML5",

      "CSS3",

    ],

    link: "https://www.institut-cortex.com",

    screenshots: [

      "/images/projects/cortex1.avif",

      "/images/projects/cortex2.avif",

    ],

    captions: [

      t("Formations de l’Institut Cortex", "Institut Cortex courses"),

      t("Parcours des Grandes Écoles", "Higher education paths"),

    ],

  },

  {

    id: "semyg",

    number: "10",

    date: t("Août — décembre 2025", "August — December 2025"),

    category: t("Immobilier · Plateforme web", "Real estate · Web platform"),

    title: t(

      "Semyg · Présentation et gestion d’activités",

      "Semyg · Business presentation platform"

    ),

    summary: t(

      "Plateforme professionnelle présentant études, montage de projets, promotion, gestion d’actifs, conformité et impact.",

      "A professional platform presenting studies, project development, promotion, asset management, compliance and impact."

    ),

    problem: t(

      "Présenter clairement les différentes activités de l’entreprise avec une identité visuelle cohérente.",

      "Clearly present the company's activities with a consistent visual identity."

    ),

    solution: t(

      "Une interface moderne, responsive et animée, intégrant une charte graphique personnalisée.",

      "A modern, responsive and animated interface with a custom visual identity."

    ),

    role: t(

      "Développement et intégration de la plateforme web.",

      "Development and integration of the web platform."

    ),

    features: t(

      "Présentation des services, animations interactives et expérience utilisateur adaptée aux écrans.",

      "Service presentation, interactive animations and responsive user experience."

    ),

    result: t(

      "Plateforme et adresse du site mentionnées dans le CV ; pas de résultat chiffré publié.",

      "Platform and URL listed in the résumé; no published performance figures."

    ),

    tech: ["React", "Vite", "styled-components", "Framer Motion"],

    link: "https://semygimmobilier.vercel.app",

    screenshots: [

      "/images/projects/semig1.avif",

      "/images/projects/semig2.avif",

    ],

    captions: [

      t("Accueil de Semyg Groupe Immobilier", "Semyg homepage"),

      t("Expertise immobilière", "Real estate expertise"),

    ],

  },

  {

    id: "coris",

    number: "11",

    date: t("Août — novembre 2025", "August — November 2025"),

    category: t("Investissement · Frontend", "Investment · Frontend"),

    title: t(

      "Coris Investment · Plateforme web",

      "Coris Investment · Web platform"

    ),

    summary: t(

      "Plateforme présentant l’entreprise, ses services, ses domaines d’intervention et ses activités d’investissement.",

      "A platform presenting the company, services, areas of work and investment activities."

    ),

    problem: t(

      "Rendre les pôles stratégiques de l’entreprise lisibles dans une présentation claire et crédible.",

      "Make the company's strategic areas clear through a credible presentation."

    ),

    solution: t(

      "Une plateforme web professionnelle axée sur la clarté de l’information.",

      "A professional web platform focused on clear information."

    ),

    role: t(

      "Développement frontend du projet.",

      "Frontend development for the project."

    ),

    features: t(

      "Présentation des études et du montage de projets, de la promotion, de la gestion d’actifs, de la conformité et de l’impact.",

      "Presentation of studies and project development, promotion, asset management, compliance and impact."

    ),

    result: t(

      "Site référencé dans le CV ; aucun résultat chiffré n’est communiqué.",

      "Website referenced in the résumé; no measured results are reported."

    ),

    tech: [],

    link: "https://www.caurisinvestment.com",

    screenshots: [

      "/images/projects/koris2.avif",

      "/images/projects/kors1.avif",

    ],

    captions: [

      t("Domaines d’intervention stratégiques", "Strategic areas of work"),

      t("Investissement immobilier", "Real estate investment"),

    ],

  },

  {

    id: "mk-global",

    number: "12",

    date: t("Août — octobre 2025", "August — October 2025"),

    category: t(

      "Services juridiques · Site vitrine",

      "Legal services · Showcase website"

    ),

    title: t(

      "MK Global Services GN · Site vitrine",

      "MK Global Services GN · Showcase website"

    ),

    summary: t(

      "Site vitrine mettant en valeur l’identité du cabinet, ses services juridiques et ses coordonnées.",

      "A showcase website featuring the firm, its legal services and contact information."

    ),

    problem: t(

      "Présenter les services et les informations de contact du cabinet de façon accessible.",

      "Make the firm's services and contact details easy to find."

    ),

    solution: t(

      "Une interface responsive et orientée expérience utilisateur.",

      "A responsive interface focused on user experience."

    ),

    role: t("Création du site vitrine.", "Creation of the showcase website."),

    features: t(

      "Présentation de l’identité, des services juridiques et des informations de contact.",

      "Firm identity, legal services and contact information."

    ),

    result: t(

      "Site mentionné dans le CV ; aucune mesure d’audience n’est indiquée.",

      "Website listed in the résumé; no audience metrics are stated."

    ),

    tech: [],

    link: "https://www.mkgservices-gn.com",

    screenshots: [

      "/images/projects/mkglob1.avif",

      "/images/projects/mkglob2.avif",

    ],

    captions: [

      t("Accueil de MK Global Services GN", "MK Global homepage"),

      t("Présentation des activités", "Activities overview"),

    ],

  },

  {

    id: "transport",

    number: "13",

    date: t("2022 — 2023", "2022 — 2023"),

    category: t(

      "Projet académique · Transport",

      "Academic project · Transport"

    ),

    title: t(

      "Gestion du transport longue distance en Guinée",

      "Long-distance transport management in Guinea"

    ),

    summary: t(

      "Application de gestion du transport longue distance en Guinée.",

      "An application for long-distance transport management in Guinea."

    ),

    problem: t(

      "Organiser trajets, véhicules, chauffeurs et flux de transport dans un même outil.",

      "Organize routes, vehicles, drivers and transport flows in one tool."

    ),

    solution: t(

      "Une application dédiée à la planification et à la gestion opérationnelle du transport.",

      "An application dedicated to transport planning and operations."

    ),

    role: t(

      "Développement de l’application dans le cadre d’un projet académique.",

      "Application development as an academic project."

    ),

    features: t(

      "Planification des trajets, gestion opérationnelle des véhicules et chauffeurs, optimisation des flux de transport.",

      "Trip planning, vehicle and driver operations, and transport flow optimization."

    ),

    result: t(

      "Projet académique indiqué dans le CV ; aucun indicateur d’exploitation n’est mentionné.",

      "Academic project described in the résumé; no operational metrics are reported."

    ),

    tech: [],

    screenshots: [],

    captions: [],

  },

];

export const experience = [

  {
    date: "01/04/2026 — aujourd’hui",
    title: t("Chef Service Systeme d'information au FADES", "Information systems officer at FADES"),
    org: "FADES · Fonds de développement du sport",
    description: t(
      "Engagement professionnel au sein du Fonds de développement du sport, établissement public administratif rattaché au ministère chargé des Sports. Fonction et missions détaillées à préciser.",
      "Professional work at the Sports Development Fund, a public administrative institution attached to the ministry responsible for sports. Specific role and duties to be detailed."
    ),
  },

  {
    date: "Depuis 2021 - En cours",
    title: t("Fondateur et associé gérant", "Founder and managing partner"),
    org: "TiptamCode",
    description: t(
      "Développement de TiptamCode en parallèle de mes engagements professionnels, avec une démarche entrepreneuriale tournée vers les projets numériques.",
      "Building TiptamCode alongside my professional commitments, with an entrepreneurial focus on digital projects."
    ),
  },

  {

    date: "07/2025 — 02/2026",

    title: t(

      "Chargé des systèmes d’information et du suivi numérique",

      "Information systems and digital tracking officer"

    ),

    org: "AOD AVOCATS",

    description: t(

      "Base de données interne, digitalisation des procédures, rapports mensuels et suivi des dossiers, tâches, audiences et indicateurs.",

      "Internal database, digitized procedures, monthly reports and tracking of cases, tasks, hearings and indicators."

    ),

  },

  {

    date: "2020 — 2022",

    title: t(

      "Responsable des systèmes d’information",

      "Information systems manager"

    ),

    org: "Clinique SAPSUME",

    description: t(

      "Gestion du système d’information, maintenance logicielle, assistance aux utilisateurs et sécurisation des données.",

      "Information systems management, software maintenance, user support and data security."

    ),

  },

  {

    date: "2020 — 2022",

    title: t("Accompagnement numérique", "Digital project support"),

    org: "Incubateur Ose Ton Emploi · Labé-Guinée",

    description: t(

      "Accompagnement des porteurs de projets, formations, outils numériques et communication numérique.",

      "Support for entrepreneurs, training, digital tools and digital communication."

    ),

  },

];

// Transcription éditée pour les coquilles de lecture du PDF ; les informations et le niveau de détail du CV sont conservés.
// Le paragraphe placé sous « Site vitrine AOD » dans le CV décrit Semyg et n'est donc pas attribué au cabinet.
type CvDetail = { description: { fr: string; en: string }; technologies?: string };
export const cvDescriptions: Record<string, CvDetail> = {
  tontine: {
    description: {
      fr: `Conception et développement d’une plateforme web complète de gestion de tontines destinée à digitaliser le suivi des membres, des cotisations, des cycles et des bénéficiaires. La solution permet à un administrateur unique de gérer l’ensemble du processus : création des membres, lancement des cycles de tontine, enregistrement des cotisations, suivi des paiements, gestion des bénéficiaires, relances email, génération de rapports, journal d’audit et sauvegarde des données.`,
      en: `Design and development of a complete web platform for managing savings circles, digitizing the tracking of members, contributions, cycles and beneficiaries. The solution lets a single administrator manage the full process: creating members, starting savings cycles, recording contributions, tracking payments, managing beneficiaries, sending email reminders, generating reports, maintaining an audit log and backing up data.`
    },
    technologies: 'React, Vite.js, Node.js, Socket.IO, MongoDB, Express, Vercel, Render, Cloudinary, Nodemailer, Zustand'
  },
  justice: {
    description: {
      fr: `Conception et développement d’un ERP judiciaire destiné à numériser la gestion des dossiers du Tribunal de Première Instance de Dixinn. La plateforme centralise plusieurs modules métier, notamment la gestion du parquet, des informations judiciaires, des décisions, des dossiers civils et pénaux, avec suivi des références RP/RI, dépôt de pièces, consultation des actes, tableaux de bord statistiques et notifications automatisées. Le projet vise à améliorer la traçabilité des procédures, la rapidité du traitement administratif, la sécurisation des documents et la supervision des activités juridictionnelles à travers une interface moderne, réactive et adaptée aux besoins d’un environnement judiciaire. Le module décision inclut notamment la gestion des décisions finales, l’analyse par juge, l’alerte au président, l’attribution des dossiers et la prévisualisation/téléchargement des fichiers liés.`,
      en: `Design and development of a judicial ERP to digitize case management for the Dixinn Court of First Instance. The platform brings together several business modules, including prosecution, judicial investigations, decisions, civil and criminal cases, with RP/RI reference tracking, document uploads, access to legal acts, statistical dashboards and automated notifications. The project aims to improve procedural traceability, administrative processing speed, document security and oversight of judicial activity through a modern, responsive interface adapted to a court environment. The decisions module also includes final decisions, analysis by judge, alerts to the court president, case assignment and previewing/downloading related files.`
    },
    technologies: 'React.js, Vite, Node.js, Express.js, MongoDB, Mongoose, JWT, styled-components, Axios, Cloudinary, Multer, Nodemailer, Socket.IO, Recharts, Lucide React, Framer Motion, Zustand, API REST, Git/GitHub'
  },
  ads: {
    description: {
      fr: `Conception et développement d’une plateforme web full-stack permettant aux entreprises de créer et soumettre des campagnes publicitaires, aux administrateurs de les valider et superviser, et aux membres de consulter, valider et interagir avec les publications via un système de lecture rémunérée. Le projet intègre une gestion avancée des rôles (admin, entreprise, membre), un système de tickets, de parrainage, de portefeuille numérique, de demandes de retrait, de commentaires/réactions, ainsi qu’une logique métier complète de récompenses journalières, validation par quiz, modération de contenu et notifications en temps réel. L’objectif est d’offrir une expérience utilisateur professionnelle, sécurisée et scalable pour la diffusion publicitaire et l’engagement communautaire.`,
      en: `Design and development of a full-stack web platform where companies create and submit advertising campaigns, administrators approve and supervise them, and members view, validate and interact with posts through rewarded reading. The project includes advanced role management (administrator, company and member), tickets, referrals, a digital wallet, withdrawal requests, comments and reactions, plus business rules for daily rewards, quiz validation, content moderation and real-time notifications. Its goal is a professional, secure and scalable user experience for advertising distribution and community engagement.`
    },
    technologies: 'React.js, Vite, Node.js, Express.js, MongoDB, Mongoose, JWT, Zustand, Cloudinary, Socket.IO, styled-components/CSS, API REST'
  },
  aod: {
    description: {
      fr: `Pilotage et réalisation d’une solution ERP dédiée à la digitalisation des opérations d’un cabinet d’avocat. Structuration des besoins métier, mise en place d’un système de gestion des clients, dossiers et audiences, avec suivi des activités, rappels automatisés, tableaux de bord et optimisation des processus internes pour un meilleur gain de temps et une gestion plus efficace.`,
      en: `Project leadership and implementation of an ERP solution dedicated to digitizing law firm operations. This included structuring business requirements and building a system to manage clients, cases and hearings, with activity tracking, automated reminders, dashboards and improved internal processes aimed at saving time and making management more efficient.`
    },
    technologies: 'React.js, Vite, Node.js, Express.js, MongoDB, Mongoose, JWT, Zustand, Cloudinary, Socket.IO, styled-components/CSS, API REST'
  },
  cortex: {
    description: {
      fr: `Développement d’un site web professionnel pour Cortex-Institutt, destiné à présenter l’identité de l’institut, ses formations, ses filières, ses partenaires, son programme Campus Cortex et ses valeurs institutionnelles. Le projet met en avant une interface moderne, responsive et dynamique, avec des sections structurées, des animations fluides, une navigation intuitive et une forte attention portée à l’expérience utilisateur.\n\nJ’ai travaillé sur la conception de l’architecture frontend, l’intégration des contenus, l’optimisation de l’affichage responsive, la cohérence graphique, ainsi que l’amélioration de la performance et de l’accessibilité du site.`,
      en: `Development of a professional website for Cortex-Institutt presenting its identity, courses, study tracks, partners, Campus Cortex program and institutional values. The project features a modern, responsive and dynamic interface, structured sections, fluid animations, intuitive navigation and close attention to user experience.\n\nMy work covered frontend architecture, content integration, responsive display, visual consistency, performance and accessibility improvements.`
    },
    technologies: 'React.js, Vite, styled-components, Framer Motion, React Router, Swiper, Cloudinary, JavaScript, HTML5, CSS3'
  },
  semyg: {
    description: {
      fr: `Développement d’une plateforme web professionnelle pour Semyg, avec une interface moderne, responsive et animée, présentant les services de l’entreprise : études, montage de projets, promotion, gestion d’actifs, conformité et impact. Intégration d’une charte graphique personnalisée, d’animations interactives et d’une expérience utilisateur optimisée avec React.js, Vite, styled-components et Framer Motion.`,
      en: `Development of a professional web platform for Semyg, with a modern, responsive and animated interface presenting the company’s services: studies, project development, promotion, asset management, compliance and impact. Integration of a custom visual identity, interactive animations and an optimized user experience using React.js, Vite, styled-components and Framer Motion.`
    },
    technologies: 'React.js, Vite, styled-components, Framer Motion'
  },
  coris: {
    description: {
      fr: `Développement d’une plateforme web professionnelle pour Coris Investment, destinée à présenter l’entreprise, ses services, ses domaines d’intervention et ses activités d’investissement de manière moderne, claire et crédible. Le projet met en avant les pôles stratégiques de la société, notamment les études et le montage de projets, la promotion et la gestion d’actifs, ainsi que la conformité et l’impact.`,
      en: `Development of a professional web platform for Coris Investment, presenting the company, its services, areas of work and investment activities in a modern, clear and credible way. The project highlights the company’s strategic activities, including studies and project development, promotion and asset management, compliance and impact.`
    }
  },
  'mk-global': {
    description: {
      fr: `Création d’un site vitrine moderne mettant en valeur l’identité du cabinet, ses services juridiques et ses informations de contact, avec une interface responsive et orientée expérience utilisateur.`,
      en: `Creation of a modern showcase website highlighting the firm’s identity, legal services and contact information, with a responsive interface focused on user experience.`
    }
  },
  casier: {
    description: {
      fr: `Conception et développement d’une application web full-stack dédiée à la digitalisation du processus de demande, de traitement et de certification des casiers judiciaires (Bulletin n° 3). La solution permet l’enregistrement sécurisé des usagers, le suivi des demandes, la gestion des condamnations, la génération de bulletins certifiés en PDF avec QR code de vérification, l’envoi automatisé par email, les notifications en temps réel et l’administration complète via un tableau de bord analytique. Le projet a été pensé avec une logique de traçabilité, d’authenticité documentaire et d’amélioration de l’expérience utilisateur dans un contexte judiciaire. Mémoire soutenu avec mention excellente.`,
      en: `Design and development of a full-stack web application to digitize requests, processing and certification of criminal record documents (Bulletin No. 3). The solution supports secure user registration, request tracking, conviction records, certified PDF documents with verification QR codes, automated email, real-time notifications and full administration through an analytics dashboard. It was designed around traceability, document authenticity and an improved user experience in a judicial setting. The dissertation received an excellent distinction.`
    },
    technologies: 'React.js, Vite, JavaScript, styled-components, Framer Motion, React Router, Axios, Chart.js, Recharts, @react-pdf/renderer, Node.js, Express.js, MongoDB, Mongoose, JWT, cookie-parser, Multer, Nodemailer, Cloudinary, Socket.IO, Vitest, Cypress'
  },
  transport: {
    description: {
      fr: `Développement d’une application de gestion du transport longue distance en Guinée, incluant la planification des trajets, la gestion opérationnelle des véhicules/chauffeurs et l’optimisation des flux de transport.`,
      en: `Development of an application for managing long-distance transport in Guinea, including trip planning, vehicle and driver operations, and optimization of transport flows.`
    }
  }
};
