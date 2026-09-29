// Transcription éditée pour les coquilles de lecture du PDF ; les informations et le niveau de détail du CV sont conservés.
// Le paragraphe placé sous « Site vitrine AOD » dans le CV décrit Semyg et n'est donc pas attribué au cabinet.
export type CvDetail = { description: { fr: string; en: string }; technologies?: string };
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
