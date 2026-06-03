import { DESIGN_TOKENS } from '../styles/design-tokens';

// ... (PERSONAL_INFO, FEATURED_PROJECTS remain unchanged)

// Technologies avec couleurs cohérentes
export const SKILLS = {
  backend: [
    { name: 'Python', level: 90, color: '#3776ab' }, // Brand color preserved
    { name: 'Django/DRF', level: 85, color: '#092e20' }, // Brand color preserved
    { name: 'FastAPI', level: 75, color: '#009688' }, // Brand color preserved
    { name: 'PostgreSQL', level: 70, color: '#336791' },
    { name: 'API Integration', level: 85, color: DESIGN_TOKENS.colors.accent.orange },
  ],
  frontend: [
    { name: 'Next.js (SSR)', level: 80, color: DESIGN_TOKENS.colors.text.inverse },
    { name: 'React', level: 85, color: '#61dafb' },
    { name: 'JavaScript', level: 80, color: '#f7df1e' },
    { name: 'Tailwind CSS', level: 85, color: '#06b6d4' },
    { name: 'HTML5/CSS3', level: 85, color: '#e34f26' },
  ],
  automation: [
    { name: 'n8n', level: 85, color: DESIGN_TOKENS.colors.accent.red },
    { name: 'AI Agents', level: 75, color: DESIGN_TOKENS.colors.accent.purple },
    { name: 'AI Workflows', level: 70, color: DESIGN_TOKENS.colors.accent.green },
    { name: 'Git/GitHub', level: 85, color: '#f05032' },
    { name: 'Docker', level: 75, color: '#2496ed' },
  ],
  data: [
    { name: 'Machine Learning', level: 75, color: DESIGN_TOKENS.colors.accent.orange },
    { name: 'Deep Learning', level: 60, color: DESIGN_TOKENS.colors.accent.red },
    { name: 'TensorFlow/PyTorch', level: 65, color: '#ff6f00' },
    { name: 'NumPy/Pandas', level: 80, color: '#013243' },
    { name: 'Linux/WSL', level: 75, color: '#fcc624' },
  ],
};

// ... (TYPING_MESSAGES, NAV_ITEMS remain unchanged)

export const PROJECT_CATEGORIES = [
  { id: 'web', name: 'Applications Web', color: DESIGN_TOKENS.colors.primary[500], variant: 'primary' },
  { id: 'api', name: 'APIs & Microservices', color: DESIGN_TOKENS.colors.accent.green, variant: 'success' },
  { id: 'ai', name: 'IA & Machine Learning', color: DESIGN_TOKENS.colors.accent.purple, variant: 'purple' },
  { id: 'mobile', name: 'Applications Mobile', color: DESIGN_TOKENS.colors.accent.orange, variant: 'warning' },
  { id: 'data', name: 'Data Science', color: DESIGN_TOKENS.colors.accent.red, variant: 'danger' },
];
export const PERSONAL_INFO = {
  name: 'Souleymane Yeo',
  title: 'Fullstack Web & AI Expert',
  subtitle: 'Web • AI • Mobile • Backend Architect',
  bio: `Salut, moi c'est Souleymane Yeo, développeur backend passionné, basé en Côte d'Ivoire 🇨🇮. 
        Je travaille principalement avec Python 🐍, Django et FastAPI, des outils puissants avec lesquels 
        je construis des architectures solides, maintenables et orientées performance.`,
  location: 'Abidjan, Côte d\'Ivoire',
  email: 'soulemaneyeo99@gmail.com',
  phone: '+225 0595344814',
  phone2: '+225 0700896230',
  university: 'Université Virtuelle de Côte d\'Ivoire (UVCI)',
  degree: 'Licence en Informatique - Spécialité DAS',
  profileImage: '/images/profile_original.png',
  heroBackground: '/images/hero-bg.jpg',
  social: {
    github: 'https://github.com/soulemaneyeo99/',
    linkedin: 'https://www.linkedin.com/in/souleymane-yeo-422ba42b0/',
    whatsapp: 'https://wa.me/message/CBUAR25YW54XL1',
    facebook: '#',
  },
};

// Projets phares avec vos vraies images
export const FEATURED_PROJECTS = [
  {
    id: 'assurai',
    title: 'AssurAI',
    description: 'Plateforme intelligente de prévention des risques et d\'assurance prédictive basée sur l\'IA.',
    detailed_description: `AssurAI est une plateforme intelligente de prévention des risques et d'assurance prédictive basée sur l'IA, ayant remporté le **1er Prix du RARM Challenge 2025** lors des Rencontres Africaines du Risk Management à Abidjan.

    🎯 **Contexte & Mission** :
    Développée dans le cadre du RARM Challenge sous le thème *« Risques, durabilité et données : l'intelligence artificielle au service des industries extractives et énergétiques africaines »*, notre mission était de concevoir une solution capable d'utiliser l'IA pour améliorer la gestion des risques dans les secteurs énergétiques et extractifs africains.

    🚀 **Le Problème Résolu** :
    Dans de nombreuses entreprises industrielles africaines, les risques sont identifiés trop tard, causant des pertes financières majeures, des accidents corporels, des pollutions environnementales et des interruptions d'activité. Les responsables HSE manquent d'outils d'anticipation et les données terrain ne sont pas exploitées en temps réel.

    ⚙️ **La Solution AssurAI** :
    AssurAI combine l'Intelligence Artificielle, l'IoT (capteurs connectés) et l'analyse prédictive pour passer d'une logique curative (réagir après incident) à une logique préventive (anticiper avant l'incident).

    📊 **Fonctionnalités Principales** :
    - **Surveillance IoT & Détection Précoce** : Analyse en temps réel de la température, fumée et anomalies par capteurs (ex: Arduino) pour identifier les risques d'incendie ou de surchauffe.
    - **Alertes en Temps Réel** : Notifications push instantanées (web/mobile) pour une intervention rapide des équipes HSE.
    - **Chatbot IA Spécialisé** : Dialogue en langage naturel pour expliquer les risques et fournir des conseils de sécurité.
    - **Analyse Prédictive** : Calcul de score de risque et recommandations basées sur l'historique et les données de capteurs.
    - **Dashboard Décisionnel** : Plateforme web de visualisation de statistiques et d'indicateurs clés.

    🛠️ **Architecture de la Solution** :
    - **Application Mobile** : Développée en *Flutter* pour la réception des alertes et le chatbot IA.
    - **Plateforme Web** : Développée en *React* (Frontend) et *Django* (Backend) pour la gestion et l'administration.
    - **API IA** : Développée en *FastAPI* pour l'orchestration des échanges IA et du chatbot.
    - **Modèle de Langage (LLM)** : Modèle *Phi-3* de Microsoft exécuté localement (via *Ollama*) pour garantir la confidentialité et réduire les coûts.

    👨‍💻 **Ma Contribution Personnelle** :
    - **Backend FastAPI** : Développement de l'API d'authentification, de gestion de données et d'orchestration IA pour l'application mobile.
    - **Intégration LLM** : Déploiement et configuration locale du chatbot avec Phi-3.
    - **Frontend React & Backend Django** : Développement du dashboard web interactif, des visualisations de données et de l'interface d'administration.`,
    techStack: ['FastAPI', 'Django', 'React', 'Flutter', 'Phi-3', 'Ollama', 'PostgreSQL', 'IoT', 'Tailwind CSS'],
    status: '🏆 1er Prix – RARM Challenge 2025',
    category: 'IA & Assurance / IoT',
    image: '/images/assurai_hero.png',
    images: [
      { image: '/images/assurai_hero.png', caption: 'Dashboard principal et Assistant IA AssurAI' }
    ],
    demoUrl: 'https://www.linkedin.com/posts/sande-fatola-crm-arm-1489ab1a_assurai-rarm2025-riskmanagement-activity-7343598110360694784-j9I9',
    sourceUrl: 'https://github.com/soulemaneyeo99/AssurAI',
    featured: true,
    view_count: 0,
    created_at: '2025-02-15',
  },
  {
    id: 'remedia',
    title: 'REMÉDIA',
    description: 'Intelligence Artificielle au service de la Biodiversité et de la préservation écologique.',
    detailed_description: `REMÉDIA est une plateforme web et mobile de conservation de la biodiversité qui combine intelligence artificielle, science citoyenne, cartographie environnementale, reboisement participatif et monitoring par capteurs IoT afin de protéger, valoriser et suivre les plantes de manière durable. Le projet a été récompensé par la **3e place du Hackathon du Gnambélé Boot Camp 2025** organisé par le Programme des Nations Unies pour le Développement (PNUD Côte d'Ivoire).

    🎯 **Contexte & Hackathon** :
    Conçu lors du Gnambélé Boot Camp 2025 au Jardin Botanique de Bingerville sous la thématique *« L'intelligence artificielle au service de la biodiversité, de la lutte contre les espèces exotiques envahissantes et des services écosystémiques »*, REMÉDIA a été primé parmi plusieurs équipes.

    🚀 **Le Problème Résolu** :
    La perte de la biodiversité végétale, le déclin des savoirs traditionnels sur les plantes, l'absence de données écologiques locales fiables en temps réel et le manque d'outils accessibles pour que les citoyens participent activement à la protection de l'environnement.

    ⚙️ **Évolution & Concept** :
    D'abord simple scanner de plantes lors du hackathon, REMÉDIA a évolué pour devenir une solution complète alliant :
    - **🌿 Conservation** : Protection active des plantes.
    - **🤖 Intelligence Artificielle** : Identification automatique et diagnostic de santé.
    - **🌍 Science Citoyenne** : Collecte collaborative de signalements de plantes.
    - **🌱 Reboisement** : Mobilisation et suivi communautaire (Mission Racines).
    - **📡 Monitoring Environnemental** : Télémétrie par capteurs connectés (ESP32).

    📊 **Fonctionnalités Clés** :
    - **Scanner Intelligent** : Identification instantanée du nom scientifique et diagnostic de maladies des plantes par analyse d'image IA.
    - **Fiches Scientifiques Détaillées** : Description, composés actifs, propriétés thérapeutiques, statut de conservation UICN et géolocalisation.
    - **Assistant IA Spécialisé** : Chatbot environnemental pour assister les utilisateurs dans les pratiques de durabilité et de soin des plantes.
    - **Carte Collaborative** : Cartographie participative pour répertorier et localiser les espèces végétales sur le terrain.
    - **Mission Racines** : Gamification du reboisement où les citoyens déclarent les arbres plantés, relèvent des défis et gagnent des badges.
    - **Monitoring IoT** : Suivi en temps réel de la température, de l'humidité, de la luminosité et du pH du sol via des capteurs ESP32.

    🛠️ **Technologies Utilisées** :
    - **Frontend** : *React.js*, *Tailwind CSS* et *Leaflet* (pour les cartes collaboratives).
    - **Backend** : *FastAPI* avec *PostgreSQL* et *SQLAlchemy*.
    - **Mobile** : *Flutter* (application cross-platform).
    - **IA** : Modèles open-source (*Mistral*, *Mixtral*, *LLaVA*) orchestrés en local via *Ollama*.
    - **IoT** : Protocole *MQTT*, microcontrôleurs *ESP32* et capteurs de sol.

    👨‍💻 **Mon Rôle (Lead Technique)** :
    En tant que co-concepteur et Lead Technique, j'ai conçu l'architecture technique, développé l'interface web React, implémenté l'intégration des modèles d'IA et de chatbot, et structuré la vision de la plateforme post-hackathon.`,
    techStack: ['React', 'FastAPI', 'Flutter', 'Mistral', 'LLaVA', 'Ollama', 'ESP32', 'Tailwind CSS', 'Leaflet'],
    status: '🥉 3e place - Hackathon PNUD 2025',
    category: 'IA & Environnement / IoT',
    image: '/images/remedia_hero.png',
    images: [
      { image: '/images/remedia_hero.png', caption: 'Dashboard principal et Télémétrie Écologique REMÉDIA' }
    ],
    demoUrl: 'https://remediav2.vercel.app/',
    sourceUrl: '#',
    featured: true,
    view_count: 0,
    created_at: '2025-03-20',
  },
  {
    id: 'amazoon',
    title: 'AmazoOn',
    description: 'Chatbot éducatif vocal & assistant RAG pour l\'entrepreneuriat féminin en Afrique de l\'Ouest.',
    detailed_description: `AmazoOn est une plateforme d'apprentissage numérique interactive conçue pour les femmes entrepreneures et commerçantes d'Afrique de l'Ouest, qui font face à des barrières d'accès aux technologies numériques. Le projet propose un **chatbot éducatif vocal et intelligent** capable de converser naturellement en français local avec une interface entièrement optimisée pour la voix.

    🎯 **Le Problème Résolu** :
    L'alphabétisation variable et la complexité des interfaces textuelles classiques freinent l'adoption d'outils numériques (Facebook Messenger, WhatsApp Business, Mobile Money) par de nombreuses femmes entrepreneures. AmazoOn rend la technologie accessible par la voix.

    🚀 **La Solution AmazoOn** :
    Un chatbot vocal bidirectionnel où l'utilisatrice peut poser ses questions à voix haute (ex: "Comment créer ma page Facebook ?"), uploader des documents (factures, contrats), et recevoir des conseils pédagogiques hautement personnalisés. L'IA utilise des analogies simples et un ton localisé adapté au contexte ouest-africain ("On est ensemble", "Ça avance bien").

    🧠 **RAG Hybride avec Fusion Intelligente** :
    Le système combine en temps réel 3 sources documentaires :
    - **Base Officielle** : Contenus pédagogiques de formation entrepreneuriale.
    - **Documents Personnels** : Factures, contrats, reçus uploadés par l'utilisatrice (avec OCR intégré pour les images).
    - **Algorithme de Fusion** : Selon l'intention de la question, le moteur applique les stratégies *personal_priority*, *official_priority* ou *balanced* pour construire le contexte le plus pertinent possible.

    🛠️ **Défis Techniques Résolus** :
    - **Deadlocks d'indexation vectorielle** : Remplacement de threading.Lock() par threading.RLock() (verrou réentrant) pour éliminer 100% des freezes lors des uploads massifs en concurrence.
    - **Instabilité réseau mobile (Afrique de l'Ouest)** : Implémentation d'un système multi-niveaux de résilience IP avec matching sur sous-réseau /16 et /8 pour compenser les rotations d'IP mobile (Orange/MTN), TTL de 15 min et FIFO des derniers documents uploadés.
    - **Pipeline documentaire robuste** : Ingestion asynchrone de PDF, DOCX, TXT et images avec déduplication par hash SHA-256, chunking adaptatif et analyse qualitative IA.

    ⚙️ **Architecture Technique** :
    - **Backend** : *FastAPI* (Python 3.11) asynchrone, *PostgreSQL* + *SQLAlchemy*, *SQLite* pour la mémoire long terme.
    - **IA Vocale** : *OpenAI Whisper* (STT), *ElevenLabs* (TTS multi-langue), *GPT-4o / Claude 3* pour la génération de réponses.
    - **RAG** : *FAISS* (recherche vectorielle) + *all-MiniLM-L6-v2* (embeddings sémantiques).
    - **Mobile** : Application *Flutter* cross-platform avec interface voice-first.
    - **DevOps** : *Docker Compose* (4 conteneurs), proxy *Caddy* (HTTPS auto Let's Encrypt), rate limiting et sauvegardes *pg_dump* automatiques (cron).`,
    techStack: ['FastAPI', 'Flutter', 'GPT-4o', 'Whisper', 'ElevenLabs', 'FAISS', 'PostgreSQL', 'Docker', 'Caddy'],
    status: 'En production',
    category: 'IA & EdTech / Voice',
    image: '/images/amazoon_hero.png',
    images: [
      { image: '/images/amazoon_hero.png', caption: 'Dashboard principal AmazoOn – Interface vocale & RAG' }
    ],
    demo_video_url: '/videos/amazoon_demo1.mp4',
    demo_video_file: '/videos/amazoon_demo1.mp4',
    video_type: 'local',
    video_thumbnail: '/images/amazoon_hero.png',
    demoUrl: '#',
    sourceUrl: '#',
    featured: true,
    view_count: 0,
    created_at: '2025-05-01',
  },
  {
    id: 'vision-360',
    title: 'Vision 360 - Assistant Académique',
    description: 'Centralisation proactive des activités Moodle pour l\'excellence académique à l\'UVCI. Un assistant intelligent automatisant le suivi des échéances.',
    detailed_description: `Vision 360 est une plateforme EdTech innovante conçue pour optimiser la réussite des étudiants de l'Université Virtuelle de Côte d'Ivoire (UVCI). 

    🎯 **Problème résolu** : La fragmentation de l'information académique et le manque de suivi des échéances Moodle.
    
    🚀 **Ma solution** : Un "Cockpit" centralisé qui automatise l'extraction des données, calcule les performances en temps réel et propose un accompagnement proactif via un algorithme de notification intelligent.
    
    ⚙️ **Réalisations Techniques** :
    - **Moteur de Scraping Intelligent** : Système d'extraction haute-fidélité sur Moodle (BeautifulSoup4/FastAPI).
    - **Algorithme "Coach"** : Logique métier de priorité pour alertes ciblées (Push Web & Email).
    - **Sécurité de Niveau Bancaire** : Chiffrement AES-256 (GCM) pour la protection des données.
    - **Architecture Scalable** : Backend FastAPI (Python) et frontend Next.js (TypeScript).
    
    📊 **Expérience Utilisateur** :
    - Dashboard "Cockpit" centralisé
    - Notifications Push & Email (Resend/Brevo)
    - Système d'entraide communautaire Agora`,
    techStack: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'PostgreSQL', 'Tailwind', 'AES-256', 'Docker'],
    status: 'Beta / Prêt pour pilote',
    category: 'EdTech / IA',
    image: '/images/vision360_actual_ui.png',
    images: [
      { image: '/images/vision360_hero.png', caption: 'Dashboard principal (Cockpit)' }
    ],
    demoUrl: '#',
    sourceUrl: '#',
    demo_video_url: '/videos/vision360.mp4',
    video_type: 'local',
    video_thumbnail: '/images/vision360_hero.png',
    featured: true,
    view_count: 0,
    created_at: '2025-01-26',
  },
  {
    id: 'opportunci',
    title: 'OpportuCI',
    description: 'Plateforme intelligente centralisant les opportunités académiques pour les étudiants ivoiriens. Une solution complète avec IA pour recommandations personnalisées.',
    detailed_description: `OpportuCI est ma création la plus ambitieuse : une plateforme révolutionnaire qui centralise toutes les opportunités éducatives en Côte d'Ivoire. 

    🎯 **Problème résolu** : Les étudiants perdent des opportunités par manque d'information centralisée.
    
    🚀 **Ma solution** : Une plateforme intelligente avec IA qui recommande personnellement les meilleures opportunités selon le profil de chaque étudiant.
    
    ⚙️ **Architecture technique** :
    - Backend robuste en Django REST Framework
    - Intelligence artificielle pour les recommandations
    - Interface React moderne et responsive
    - Base de données PostgreSQL optimisée
    
    📊 **Fonctionnalités clés** :
    - Système de recommandations IA
    - Notifications en temps réel
    - Profils étudiants personnalisés
    - Dashboard administrateur complet`,
    techStack: ['Django', 'FastAPI', 'React', 'PostgreSQL', 'IA', 'Tailwind CSS'],
    status: 'En développement',
    category: 'Plateforme Éducative',
    image: '/images/OpotuCI.png',
    images: [
      { image: '/images/OpotuCI.png', caption: 'Interface principale' },
      { image: '/images/OpotuCI (2).png', caption: 'Dashboard utilisateur' }
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/OpportuCI',
    demo_video_url: '/videos/opportuci_demo.mp4',
    video_type: 'local',
    video_thumbnail: '/images/OpotuCI.png',
    featured: true,
    view_count: 0,
    created_at: '2025-01-01',
  },
  {
    id: 'ecommerce-django',
    title: 'E-commerce Django Professionnel',
    description: 'Plateforme de vente en ligne complète avec système d\'administration avancé, gestion des commandes et interface utilisateur moderne.',
    detailed_description: `Une plateforme e-commerce complète développée avec Django, démontrant ma maîtrise du développement web full-stack.

    🛒 **Fonctionnalités E-commerce** :
    - Catalogue produits avec catégories
    - Panier et système de commandes
    - Gestion des stocks en temps réel
    - Système de paiement intégré
    
    👨‍💼 **Interface Administrateur** :
    - Dashboard complet avec statistiques
    - Gestion des produits et catégories
    - Suivi des commandes et clients
    - Rapports de vente détaillés
    
    🔐 **Sécurité & Performance** :
    - Authentification Django robuste
    - Protection CSRF et XSS
    - Optimisation des requêtes DB
    - Cache intelligent`,
    techStack: ['Django', 'Bootstrap', 'JavaScript', 'SQLite', 'CSS3'],
    status: 'En ligne',
    category: 'E-commerce',
    image: '/images/portfolio/e-comerceclienDjango.jpg',
    images: [
      { image: '/images/portfolio/e-comerceclienDjango.jpg', caption: 'Interface client' },
      { image: '/images/fashionStoreashborard.jpeg', caption: 'Dashboard admin' },
      { image: '/images/portfolio/e-comercelogin.jpg', caption: 'Page de connexion' },
      { image: '/images/portfolio/ecomercemmande.jpg', caption: 'Gestion des commandes' },
      { image: '/images/portfolio/ecomerceregister.jpg', caption: 'Inscription' }
    ],
    demoUrl: 'https://commerce99.pythonanywhere.com/',
    sourceUrl: 'https://github.com/soulemaneyeo99/ecommerce-django',
    featured: true,
    view_count: 245,
    created_at: '2024-06-15',
  },
  {
    id: 'ecommerce-fastapi',
    title: 'E-commerce Modern FastAPI + React',
    description: 'Application e-commerce moderne avec API FastAPI haute performance et interface React responsive, démonstration de l\'architecture microservices.',
    detailed_description: `Une architecture moderne e-commerce séparant complètement le backend (FastAPI) du frontend (React), illustrant les meilleures pratiques actuelles.

    ⚡ **Performance FastAPI** :
    - API ultra-rapide avec validation automatique
    - Documentation Swagger auto-générée
    - Authentification JWT stateless
    - Architecture asynchrone
    
    ⚛️ **Interface React Moderne** :
    - Components réutilisables
    - State management avec Context API
    - Interface responsive Tailwind CSS
    - Lazy loading et optimisations
    
    🔄 **Architecture Microservices** :
    - API REST complètement découplée
    - Communication via requêtes HTTP
    - Déploiement indépendant possible
    - Scalabilité horizontale`,
    techStack: ['FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL', 'JWT', 'Vite'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/Fastapiecommerce.jpeg',
    images: [
      { image: '/images/Fastapiecommerce.jpeg', caption: 'Interface principale' }
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/fastapi-ecommerce',
    featured: true,
    view_count: 156,
    created_at: '2024-09-20',
  },
  {
    id: 'react-todo',
    title: 'Application Todo React Avancée',
    description: 'Application de gestion de tâches avec React, démontrant la maîtrise des hooks, du state management et des bonnes pratiques frontend.',
    detailed_description: `Une application Todo sophistiquée qui va bien au-delà des tutoriels basiques, intégrant des fonctionnalités avancées et les meilleures pratiques React.

    🎨 **Interface Utilisateur Avancée** :
    - Design moderne avec animations fluides
    - Drag & drop pour réorganiser les tâches
    - Filtres et recherche en temps réel
    - Mode sombre/clair
    
    ⚛️ **React Moderne** :
    - Hooks personnalisés pour la logique métier
    - Context API pour le state global
    - Components fonctionnels optimisés
    - Error boundaries et gestion d'erreurs
    
    🔧 **Fonctionnalités Avancées** :
    - Catégories et tags pour les tâches
    - Dates d'échéance et rappels
    - Statistiques et rapports
    - Sauvegarde locale automatique`,
    techStack: ['React', 'Context API', 'Tailwind CSS', 'Local Storage', 'Hooks'],
    status: 'Complété',
    category: 'Application Web',
    image: '/images/react_todo.jpeg',
    images: [
      { image: '/images/react_todo.jpeg', caption: 'Interface principale' }
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/react-todo',
    featured: false,
    view_count: 89,
    created_at: '2024-03-10',
  },
  {
    id: 'fashion-store',
    title: 'Fashion Store - Boutique Mode',
    description: 'Boutique en ligne spécialisée dans la mode avec interface élégante, système de recommandations et expérience utilisateur optimisée.',
    detailed_description: `Un projet e-commerce spécialisé dans la mode, mettant l'accent sur l'expérience utilisateur et le design visuel attractif.

    👗 **Spécialisé Mode** :
    - Catalogue organisé par catégories mode
    - Filtres avancés (taille, couleur, marque)
    - Zoom haute qualité sur les produits
    - Recommandations basées sur les goûts
    
    🎨 **Design & UX** :
    - Interface élégante et moderne
    - Navigation intuitive
    - Processus d'achat simplifié
    - Responsive design parfait
    
    🛒 **Fonctionnalités E-commerce** :
    - Gestion du panier avancée
    - Wishlist et favoris
    - Système de reviews et notes
    - Intégration réseaux sociaux`,
    techStack: ['Django', 'Bootstrap', 'JavaScript', 'CSS3', 'SQLite'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/fashionStoreashborard.jpeg',
    images: [
      { image: '/images/fashionStoreashborard.jpeg', caption: 'Dashboard admin' },
      { image: '/images/fashionStorelogin.jpeg', caption: 'Page de connexion' }
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/fashion-store',
    featured: false,
    view_count: 67,
    created_at: '2024-01-15',
  }
];

// Messages d'animation typing plus spécifiques
export const TYPING_MESSAGES = [
  'Fullstack Web & AI Expert',
  'Architecte Solutions Web & Mobiles',
  'Expert Django, FastAPI & React',
  'Créateur d\'Agents IA Intelligents',
  'Développeur Mobile sur mesure',
  'Passionné par le Machine Learning',
  'Créateur d\'OpportuCI',
];

// Navigation mise à jour
export const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', href: '/', icon: '🏠' },
  { id: 'about', label: 'À propos', href: '/about', icon: '👨‍💻' },
  { id: 'projects', label: 'Projets', href: '/projects', icon: '💼' },
  { id: 'blog', label: 'Blog', href: '/blog', icon: '📝' },
  { id: 'contact', label: 'Contact', href: '/contact', icon: '📧' },
];