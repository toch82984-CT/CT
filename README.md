# RapportIQ — Plateforme d'Analyse Financière d'Entreprises

RapportIQ est une plateforme web d'analyse et de visualisation financière conçue pour aider les étudiants, chercheurs et analystes à comprendre la performance économique des entreprises à travers des ratios financiers rigoureux, des visualisations interactives et une traçabilité documentaire sans équivoque.

Le périmètre initial est focalisé sur les entreprises marocaines (Plan Comptable Général Marocain - PCGM et normes IFRS pour les sociétés cotées à la BVC), avec une architecture extensible à l'international.

---

## 1. Principes et Éthique des Données

- **Données Démo Distinctes (DEMO DATA)** : L'ensemble des chiffres initiaux sont des données synthétiques fictives à vocation purement didactique. Aucun chiffre réel n'a été inventé et aucun faux lien de source n'est présenté comme authentique.
- **Transparence Mathématique** : Les ratios financiers (Croissance, Marge nette, Rentabilité des capitaux propres, Ratio d'endettement) sont calculés de manière déterministe avec gestion rigoureuse des cas limites (zéro division par zéro, capitaux propres négatifs signalés).
- **Avertissement Réglementaire** : L'outil est strictement documentaire et éducatif ; il ne constitue pas un conseil en investissement personnalisé.

---

## 2. Architecture de l'Application

```
/
├── index.html                   # Point d'entrée HTML avec polices Plus Jakarta Sans et IBM Plex Sans Arabic
├── metadata.json                # Métadonnées AI Studio de l'application
├── package.json                 # Dépendances (React 19, Tailwind CSS v4, Lucide Icons, Vite)
├── README.md                    # Ce guide de prise en main pour fondateur
└── src/
    ├── App.tsx                  # Composant racine, routage des 7 pages, synchronisation RTL/LTR
    ├── index.css                # Configuration Tailwind CSS et polices typographiques
    ├── main.tsx                 # Montage React 19
    ├── types/
    │   └── finance.ts           # Types TypeScript (Company, AnnualFinancials, CalculatedRatios, Sector, Status)
    ├── data/
    │   └── initialDemoData.ts   # Jeu de 6 entreprises démo marocaines (complètes et incomplètes)
    ├── services/
    │   ├── financialCalculations.ts # Moteur de calcul des formules financières, ratios et alertes
    │   └── storageService.ts    # Persistance LocalStorage, Export CSV et Import CSV
    ├── i18n/
    │   └── translations.ts      # Dictionnaire bilingue complet Français (FR) et Arabe (AR avec RTL)
    ├── components/
    │   ├── DemoBanner.tsx       # Bannière permanente d'avertissement "DEMO DATA"
    │   ├── Navbar.tsx           # Barre de navigation respectant le "Top Bar Contract" (3 zones)
    │   ├── Footer.tsx           # Pied de page avec disclaimers réglementaires et liens
    │   └── charts/
    │       ├── FinancialBarChart.tsx # Graphique SVG multi-annuel (CA, Résultat Net, Cash-Flow)
    │       └── ComparisonBarChart.tsx # Graphique SVG comparateur multi-entreprises
    └── pages/
        ├── LandingPage.tsx      # Page d'accueil : vision, problème, solution, fonctionnalités, aperçu
        ├── DashboardPage.tsx    # Tableau de bord analytique macro, KPIs, graphique, tableau synthétique
        ├── DirectoryPage.tsx    # Répertoire complet avec recherche instantanée et filtres (secteurs, statuts)
        ├── CompanyDetailPage.tsx# Fiche détaillée : ratios décortiqués, états comptables, historique, source
        ├── ComparisonPage.tsx   # Comparateur side-by-side jusqu'à 3 entreprises avec alertes d'hétérogénéité
        ├── MethodologyPage.tsx  # Guide didactique des formules, conventions comptables et hiérarchie AMMC/BVC
        └── DataManagementPage.tsx# Espace gestion fondateur : création, saisie d'exercices, import/export CSV
```

---

## 3. Où sont stockées les données démo ?

1. **Jeu d'origine par défaut** : Il est codé dans `src/data/initialDemoData.ts`.
2. **Persistance dynamique** : Lors de la première visite ou de vos modifications dans l'interface **Gestion des données**, les enregistrements sont sauvegardés dans le `localStorage` du navigateur sous la clé `rapportiq_companies_v1`.
3. **Réinitialisation** : À tout moment, le bouton **"Réinitialiser les données de démo"** dans la page de gestion permet de restaurer le jeu de données d'origine sans risque.

---

## 4. Comment remplacer les données de démo par des données vérifiées ?

Pour un fondateur non technique, il existe deux manières simples :

### Méthode A : Directement depuis l'interface web (Sans coder)
1. Rendez-vous sur l'onglet **"Gestion des données"**.
2. Cliquez sur **"Créer une fiche entreprise"** et sélectionnez le statut **"Vérifié (Source Primaire)"**.
3. Cliquez sur **"Saisir un nouvel exercice"** pour renseigner :
   - L'année fiscale (ex : 2024).
   - Le Chiffre d'affaires et le Résultat net certifiés.
   - L'Actif total et les Capitaux propres.
   - Les Dettes financières et le Cash-flow d'exploitation.
   - L'intitulé officiel de la source (ex : *Document de Référence 2024 visé par l'AMMC*) et son URL publique officielle.
4. Cliquez sur **Enregistrer** : le tableau de bord et les comparateurs intègrent immédiatement les nouveaux chiffres.

### Méthode B : Via fichier tableur CSV
1. Rendez-vous sur **"Gestion des données"** et cliquez sur **"Exporter la base en CSV"**.
2. Ouvrez le fichier CSV dans Excel ou Google Sheets.
3. Remplissez les lignes avec vos données réelles vérifiées en conservant les noms de colonnes.
4. Dans RapportIQ, cliquez sur **"Importer un fichier CSV"** pour charger instantanément l'ensemble de votre base.

---

## 5. Règles de Calcul Financier Appliquées

- **Croissance du Chiffre d'Affaires** :
  $$\text{Croissance} = \left(\frac{\text{CA}_n}{\text{CA}_{n-1}} - 1\right) \times 100$$
  *Règle : Activé uniquement si $\text{CA}_{n-1} > 0$ et si la devise et l'unité sont identiques.*
- **Marge Nette** :
  $$\text{Marge Nette} = \left(\frac{\text{Résultat Net}_n}{\text{CA}_n}\right) \times 100$$
  *Règle : Suspendu si $\text{CA} \le 0$.*
- **Rentabilité des Capitaux Propres (ROE)** :
  $$\text{ROE} = \left(\frac{\text{Résultat Net}_n}{\text{Capitaux Propres}_n}\right) \times 100$$
  *Règle : Suspendu si les capitaux propres sont négatifs pour éviter une interprétation arithmétique fausse.*
- **Ratio d'Endettement (Gearing)** :
  $$\text{Ratio} = \frac{\text{Dettes Financières}_n}{\text{Capitaux Propres}_n}$$
- **Données manquantes** : Affiche systématiquement `"Non disponible"` au lieu d'extrapoler ou d'inventer des chiffres.

---

## 6. Lancement et Déploiement

- **Développement local** :
  ```bash
  npm run dev
  ```
- **Vérification de la compilation** :
  ```bash
  npm run build
  ```
