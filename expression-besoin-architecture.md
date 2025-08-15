<div align="center">
  <img src="logomiam.png" alt="mIAm Logo" width="200"/>
  
  # Expression de besoin et Architecture - Application mIAm
  
  *Assistant culinaire intelligent qui révolutionne votre alimentation*
</div>

---

## 📋 Sommaire

### 1. Expression de besoin
- [1.1 Vision produit](#11-vision-produit)
- [1.2 Objectifs principaux](#12-objectifs-principaux)
- [1.3 Personas cibles](#13-personas-cibles)
- [1.4 Fonctionnalités clés](#14-fonctionnalités-clés)
- [1.5 Exigences non fonctionnelles](#15-exigences-non-fonctionnelles)

### 2. Architecture technique
- [2.1 Vue d'ensemble](#21-vue-densemble)
- [2.2 Stack technique](#22-stack-technique)
- [2.3 Architecture des microservices](#23-architecture-des-microservices)
- [2.4 Sécurité](#24-sécurité)
- [2.5 Intégrations externes](#25-intégrations-externes)
- [2.6 Roadmap technique](#26-roadmap-technique)
- [2.7 Monitoring et KPIs](#27-monitoring-et-kpis)
- [2.8 Estimations](#28-estimations)

---

## 1. Expression de besoin


### 1.1 Vision produit
mIAm est un assistant culinaire intelligent qui révolutionne la façon dont les utilisateurs planifient, préparent et consomment leurs repas en apprenant leurs goûts, habitudes et contraintes pour proposer une expérience alimentaire personnalisée et durable.

### 1.2 Objectifs principaux
- **Personnalisation maximale** : S'adapter aux préférences, allergies, budget et objectifs santé de chaque utilisateur
- **Gain de temps** : Automatiser la planification des repas et la génération des listes de courses
- **Santé et nutrition** : Améliorer l'équilibre alimentaire avec des conseils de nutritionnistes
- **Anti-gaspillage** : Optimiser l'utilisation des ingrédients disponibles
- **Accessibilité** : Interface intuitive et ludique pour tous les niveaux de cuisine

### 1.3 Personas cibles

#### Persona 1 : Sophie, 35 ans, mère active
- **Contexte** : Travaille à temps plein, 2 enfants
- **Besoins** : Repas rapides, équilibrés, économiques
- **Frustrations** : Manque de temps, gaspillage alimentaire
- **Attentes** : Planning automatisé, batch cooking, recettes familiales

#### Persona 2 : Thomas, 28 ans, célibataire urbain
- **Contexte** : Jeune professionnel, peu d'expérience culinaire
- **Besoins** : Apprendre à cuisiner sainement, contrôler son budget
- **Frustrations** : Ne sait pas quoi cuisiner, mange souvent dehors
- **Attentes** : Recettes simples, suivi nutritionnel, mode express

#### Persona 3 : Julie et Marc, 45 ans, couple conscient
- **Contexte** : Sensibles à l'alimentation durable et locale
- **Besoins** : Produits de saison, circuits courts, nutrition optimale
- **Frustrations** : Difficulté à trouver des producteurs locaux
- **Attentes** : Sourcing local, conseils nutrition+, impact environnemental

### 1.4 Fonctionnalités clés

#### Profil utilisateur avancé
- Préférences alimentaires (régimes, goûts)
- Allergies et intolérances
- Budget mensuel/hebdomadaire
- Objectifs santé (perte de poids, prise de masse, etc.)
- Taille du foyer
- Équipements de cuisine disponibles
- Temps disponible pour cuisiner

#### Assistant IA personnalisé
- Apprentissage continu des préférences via feedback
- Suggestions de recettes adaptées au contexte (saison, météo, humeur)
- Adaptation automatique aux contraintes (temps, budget, ingrédients)
- Recommandations nutritionnelles personnalisées

#### Interface de sélection Swipe
- Navigation façon Tinder pour valider/rejeter les recettes
- Apprentissage des préférences à chaque interaction
- Possibilité de sauvegarder les favoris
- Filtres rapides (temps, difficulté, type de plat)

#### Planification intelligente
- Calendrier hebdomadaire personnalisable
- Options repas journaliers ou batch cooking
- Adaptation aux emplois du temps (repas rapides les soirs chargés)
- Suggestions basées sur les restes

#### Sourcing multi-canal
- Intégration API supermarchés (Carrefour, Leclerc, etc.)
- Connexion producteurs locaux et marchés
- Comparaison de prix automatique
- Priorisation circuits courts selon disponibilité

#### Mode budget
- Définition d'un budget cible par repas/semaine
- Substitutions intelligentes pour réduire les coûts
- Alertes dépassement budget
- Suggestions recettes économiques

#### Nutrition+
- Recommandations nutritionnistes intégrées
- Rotation automatique des huiles
- Limitation viande rouge
- Suggestions plats végétariens
- Équilibre macronutriments

#### Anti-gaspillage
- Scan photo frigo avec reconnaissance IA
- Saisie manuelle des stocks
- Alertes dates de péremption
- Recettes prioritaires selon urgence des ingrédients

#### Génération panier automatique
- Liste de courses en < 2 minutes
- Répartition intelligente entre sources
- Optimisation trajets (groupement par magasin/zone)
- Export vers applications partenaires

#### Analytics et gamification
- Score nutritionnel hebdomadaire détaillé
- Progression vers objectifs santé
- Badges et récompenses
- Conseils personnalisés d'amélioration



### 1.5 Exigences non fonctionnelles

#### Performance
- Temps de chargement < 3 secondes
- Génération suggestions < 1 seconde
- Scan photo traité en < 5 secondes
- App mobile < 50MB (iOS/Android)
- Animations fluides 60 FPS (swipe)

#### Scalabilité
- Architecture supportant 100k utilisateurs actifs
- Base de données optimisée pour requêtes complexes
- CDN pour assets statiques

#### Sécurité
- Chiffrement données sensibles (santé, paiement)
- Authentification forte (2FA optionnel)
- Conformité RGPD
- Anonymisation données pour ML

#### Accessibilité
- WCAG 2.1 niveau AA minimum
- Support lecteurs d'écran
- Mode daltonien
- Tailles de police ajustables
- Support React Native Accessibility API



## 2. Architecture technique

### 2.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────┐  ┌────────────────────────────────────┐  │
│  │   Web App   │  │        Mobile App                  │  │
│  │    (PWA)    │  │    (React Native - iOS/Android)    │  │
│  └──────┬──────┘  └────────────────┬───────────────────┘  │
│         └──────────────────────────┴─────────┐            │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                             │
│                    (Kong / AWS API GW)                       │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                      Backend Services                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │    Auth    │  │   Recipe   │  │  Planning  │           │
│  │  Service   │  │  Service   │  │  Service   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ Nutrition  │  │   Budget   │  │    User    │           │
│  │  Service   │  │  Service   │  │  Service   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │    Cart    │  │    Image   │  │     ML     │           │
│  │  Service   │  │ Recognition│  │  Service   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                     Data Layer                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ PostgreSQL │  │   Redis    │  │ Elasticsearch│           │
│  │  (Primary) │  │  (Cache)   │  │   (Search)  │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│  ┌────────────┐  ┌────────────┐                           │
│  │     S3     │  │  InfluxDB  │                           │
│  │  (Assets)  │  │ (Analytics)│                           │
│  └────────────┘  └────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                  External Services                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │Supermarket │  │   Local    │  │   Payment  │           │
│  │    APIs    │  │ Producers  │  │  Providers │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   OpenAI   │  │    Maps    │  │    Email   │           │
│  │    API     │  │    APIs    │  │   Service  │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Stack technique

#### Frontend unifié React
- **Architecture partagée**
  - Monorepo : Nx ou Lerna pour gérer web + mobile
  - Partage de code : 70-80% entre web et mobile
  - TypeScript : Typage fort sur toute la stack

- **Web (PWA)**
  - Framework : React 18+ avec TypeScript
  - State Management : Redux Toolkit + RTK Query
  - UI Library : Tailwind CSS + Headless UI
  - Build : Vite
  - Testing : Jest + React Testing Library

- **Mobile (React Native)**
  - Framework : React Native 0.73+ avec TypeScript
  - Navigation : React Navigation 6
  - UI Components : React Native Paper (Material Design)
  - State Management : Redux Toolkit (partagé avec web)
  - Animations : React Native Reanimated 3
  - Camera/ML : Expo Camera + ML Kit
  - Build : Expo EAS Build
  - Testing : Jest + React Native Testing Library

#### Backend
- **Langage principal** : Node.js (TypeScript) + Python (ML/IA)
- **Framework API** : NestJS (microservices)
- **Communication** : gRPC entre services, REST pour clients
- **Message Queue** : RabbitMQ
- **Container** : Docker + Kubernetes

#### Base de données
- **PostgreSQL** : Données relationnelles (users, recipes, planning)
- **Redis** : Cache + sessions
- **Elasticsearch** : Recherche recettes
- **InfluxDB** : Métriques et analytics
- **S3** : Stockage images et assets

#### Infrastructure
- **Cloud** : AWS (production) / GCP (backup)
- **CDN** : CloudFront
- **Monitoring** : Prometheus + Grafana
- **Logs** : ELK Stack
- **CI/CD** : GitLab CI + ArgoCD

### 2.3 Architecture des microservices

#### Auth Service
- Gestion authentification/autorisation
- JWT tokens + refresh tokens
- Intégration OAuth2 (Google, Facebook)
- Gestion 2FA

#### Recipe Service
- CRUD recettes
- Recherche et filtrage
- Calcul scores nutritionnels
- Gestion des favoris

#### Planning Service
- Gestion calendrier repas
- Génération automatique planning
- Synchronisation avec calendriers externes

#### Nutrition Service
- Analyse nutritionnelle
- Recommandations personnalisées
- Intégration base données nutritionnelles (OpenFoodFacts)

#### Budget Service
- Calcul coûts recettes
- Optimisation budget
- Historique dépenses

#### User Service
- Gestion profils utilisateurs
- Préférences et contraintes
- Historique et statistiques

#### Cart Service
- Génération listes de courses
- Optimisation multi-sources
- Intégration APIs partenaires

#### Image Recognition Service
- Analyse photos frigo (Python + TensorFlow)
- Détection ingrédients
- Estimation quantités

#### ML Service
- Moteur de recommandation (Python + scikit-learn)
- Apprentissage préférences
- Prédiction comportements

### 2.4 Sécurité

#### Authentification
- OAuth2 + JWT
- Rotation automatique des tokens
- Rate limiting par IP/user

#### Chiffrement
- HTTPS obligatoire (TLS 1.3)
- Chiffrement données sensibles en base
- Clés stockées dans AWS KMS

#### Protection API
- API Gateway avec validation schémas
- CORS configuré strictement
- Protection CSRF/XSS

### 2.5 Intégrations externes

#### APIs Supermarchés
- Carrefour API
- Leclerc Drive API
- Intermarché API
- Format standardisé interne

#### Producteurs locaux
- API La Ruche qui dit Oui
- Intégration marchés locaux
- Scraping sites producteurs

#### Services tiers
- OpenAI API (suggestions, analyse)
- Google Maps (localisation, trajets)
- Stripe (paiements premium)
- SendGrid (notifications email)
- Twilio (SMS rappels)



### 2.6 Roadmap technique

#### Phase 1 : MVP (3 mois)
- PWA fonctionnelle
- Services core (auth, recipes, planning)
- Intégration 2 supermarchés
- Recommandations basiques

#### Phase 2 : Mobile (2 mois)
- Application React Native unifiée iOS/Android
- Réutilisation de 80% du code React web
- Synchronisation cross-platform
- Mode offline partiel avec AsyncStorage
- Intégration camera pour scan frigo
- Notifications push (Expo Notifications)

#### Phase 3 : IA avancée (2 mois)
- Scan photo frigo
- ML personnalisation poussée
- Assistant vocal

#### Phase 4 : Écosystème (3 mois)
- API publique
- Intégrations domotique
- Programme partenaires
- Marketplace recettes

### 2.7 Monitoring et KPIs

#### Techniques
- Uptime > 99.9%
- Temps réponse API < 200ms (p95)
- Taux erreur < 0.1%

#### Business
- Taux conversion inscription
- Rétention J7/J30
- Nombre recettes swipées/jour
- Taux utilisation planning
- Score satisfaction (NPS)

### 2.8 Estimations

#### Équipe
- 2 développeurs frontend React (web + mobile)
- 3 développeurs backend
- 1 DevOps
- 1 Data scientist
- 1 UX/UI designer
- 1 Product Owner

#### Budget
- Développement : 250k€ (phase 1-2) *(-50k€ grâce à React Native)*
- Infrastructure : 5k€/mois
- Licences/APIs : 2k€/mois
- Marketing : 100k€ (lancement)

#### Planning
- Phase 1 : 3 mois
- Phase 2 : 2 mois  
- Phase 3 : 2 mois
- Phase 4 : 3 mois
- **Total MVP à V1 complète : 10 mois**

<div align="center">
  <img src="logomiam.png" alt="mIAm" width="120"/>
  
  ---
  
  *mIAm - Mangez mieux, sans vous compliquer la vie*
</div>