/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupportedLocale } from '../types/finance';

export interface Translations {
  appName: string;
  appTagline: string;
  demoNoticeBadge: string;
  demoNoticeBanner: string;
  disclaimerShort: string;
  disclaimerFull: string;
  nav: {
    landing: string;
    dashboard: string;
    directory: string;
    compare: string;
    methodology: string;
    dataManagement: string;
    exploreDemo: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    problemTitle: string;
    problemDesc: string;
    solutionTitle: string;
    solutionDesc: string;
    capabilitiesTitle: string;
    capabilitiesSubtitle: string;
    cap1Title: string;
    cap1Desc: string;
    cap2Title: string;
    cap2Desc: string;
    cap3Title: string;
    cap3Desc: string;
    cap4Title: string;
    cap4Desc: string;
    pedagogySectionTitle: string;
    pedagogySectionDesc: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    kpiCompanies: string;
    kpiYears: string;
    kpiVerified: string;
    kpiDemo: string;
    revenueChartTitle: string;
    revenueChartDesc: string;
    quickLinksTitle: string;
    viewDirectory: string;
    viewComparison: string;
    manageData: string;
    recentCompaniesTitle: string;
  };
  directory: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allSectors: string;
    allStatuses: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilters: string;
    columnCompany: string;
    columnSector: string;
    columnYears: string;
    columnStatus: string;
    columnActions: string;
    viewFiling: string;
  };
  detail: {
    overview: string;
    fiscalYear: string;
    currencyAndUnit: string;
    sourceTitle: string;
    sourceUrl: string;
    lastReviewed: string;
    financialStatements: string;
    incomeStatement: string;
    balanceSheet: string;
    cashFlowStatement: string;
    calculatedRatios: string;
    formula: string;
    meaning: string;
    limitations: string;
    noDataForYear: string;
    statusDemo: string;
    statusVerified: string;
    statusIncomplete: string;
  };
  compare: {
    title: string;
    subtitle: string;
    selectCompanies: string;
    selectUpToThree: string;
    referenceYear: string;
    metric: string;
    warningComparability: string;
    chartTitle: string;
  };
  methodology: {
    title: string;
    subtitle: string;
    reportedVsCalculated: string;
    reportedVsCalculatedBody: string;
    ratioDefinitions: string;
    growthDef: string;
    marginDef: string;
    roeDef: string;
    debtEquityDef: string;
    sourcesHierarchy: string;
    sourcesHierarchyBody: string;
  };
  management: {
    title: string;
    subtitle: string;
    addCompany: string;
    editCompany: string;
    addFinancialYear: string;
    exportCsv: string;
    importCsv: string;
    resetDemo: string;
    localStorageNotice: string;
  };
  terms: {
    revenue: string;
    netIncome: string;
    operatingIncome: string;
    totalAssets: string;
    equity: string;
    financialDebt: string;
    operatingCashFlow: string;
    revenueGrowth: string;
    netProfitMargin: string;
    returnOnEquity: string;
    debtToEquity: string;
    assetTurnover: string;
    notAvailable: string;
    demoTag: string;
    verifiedTag: string;
    incompleteTag: string;
  };
}

export const TRANSLATIONS: Record<SupportedLocale, Translations> = {
  fr: {
    appName: 'RapportIQ',
    appTagline: 'Comprenez les chiffres. Analysez les entreprises.',
    demoNoticeBadge: 'DONNÉES FICTIVES',
    demoNoticeBanner:
      'DONNÉES DE DÉMONSTRATION — Chiffres synthétiques à vocation pédagogique. Ce ne sont pas des états financiers réels de sociétés cotées ou enregistrées.',
    disclaimerShort:
      'RapportIQ est un outil pédagogique et d’analyse financière documentaire. Ne constitue pas un conseil en investissement personnalisé.',
    disclaimerFull:
      'Avertissement réglementaire et légal : Les visualisations, calculs et données présentés sur RapportIQ sont fournis exclusivement à des fins de recherche académique, de formation universitaire et d’analyse financière méthodologique. RapportIQ ne fournit aucune recommandation d’achat ou de vente d’instruments financiers, ni de conseil en investissement au sens de la législation marocaine ou internationale. Les données initiales fournies sont synthétiques et fictives pour démonstration logicielle.',
    nav: {
      landing: 'Accueil',
      dashboard: 'Tableau de bord',
      directory: 'Répertoire',
      compare: 'Comparateur',
      methodology: 'Méthodologie & Sources',
      dataManagement: 'Gestion des données',
      exploreDemo: 'Explorer la démo',
    },
    landing: {
      heroTitle: 'Comprenez les chiffres. Analysez les entreprises.',
      heroSubtitle:
        'La plateforme d’analyse financière conçue pour les étudiants, chercheurs et analystes. Ratios rigoureux, visualisations interactives et traçabilité transparente des sources documentaires.',
      ctaPrimary: 'Accéder au Tableau de Bord Démo',
      ctaSecondary: 'Consulter la Méthodologie',
      problemTitle: 'Le défi de l’information financière',
      problemDesc:
        'Les rapports annuels font souvent plusieurs centaines de pages sous forme de PDF denses. Pour les étudiants et analystes débutants, extraire les grandeurs clés, recalculer les ratios sans erreur et vérifier la cohérence des exercices est un travail fastidieux et propice aux confusions d’unités.',
      solutionTitle: 'La clarté méthodologique RapportIQ',
      solutionDesc:
        'RapportIQ normalise la lecture des états financiers. Chaque chiffre est rattaché à son exercice, son unité (MMAD) et sa source officielle. Les formules de calcul sont transparentes et expliquées en français sans boîte noire.',
      capabilitiesTitle: 'Fonctionnalités analytiques clés',
      capabilitiesSubtitle:
        'Des outils structurés pour décortiquer la performance opérationnelle et financière.',
      cap1Title: 'Ratios normalisés & formules ouvertes',
      cap1Desc:
        'Croissance du chiffre d’affaires, marge nette, rentabilité des capitaux propres (ROE) et levier financier calculés avec gestion stricte des cas limites.',
      cap2Title: 'Traçabilité documentaire des sources',
      cap2Desc:
        'Chaque jeu de données identifie la source de référence, la date d’audit ou de revue et le statut de vérification pour éviter les confusions.',
      cap3Title: 'Comparateur multi-sociétés',
      cap3Desc:
        'Comparez jusqu’à trois entreprises côte à côte avec alertes d’hétérogénéité d’exercices comptables et d’unités monétaires.',
      cap4Title: 'Import / Export & Gestion locale',
      cap4Desc:
        'Créez vos propres fiches d’entreprises, saisissez des exercices et sauvegardez vos jeux d’étude en CSV sans dépendance à des API payantes.',
      pedagogySectionTitle: 'Un socle conçu pour l’écosystème marocain',
      pedagogySectionDesc:
        'RapportIQ intègre les conventions comptables du Plan Comptable Général Marocain (PCGM) et des normes IFRS applicables aux sociétés cotées à la Bourse de Casablanca (BVC), avec une architecture extensible à l’international.',
    },
    dashboard: {
      title: 'Tableau de Bord Analytique',
      subtitle:
        'Vue synthétique du portefeuille de démonstration d’entreprises marocaines simulées.',
      kpiCompanies: 'Entreprises en démo',
      kpiYears: 'Exercices couverts',
      kpiVerified: 'Jeux vérifiés',
      kpiDemo: 'Jeux didactiques',
      revenueChartTitle: 'Évolution du Chiffre d’Affaires & Résultat Net (Échantillon)',
      revenueChartDesc:
        'Comparaison multi-annuelle des entreprises simulées en Millions de Dirhams (MMAD).',
      quickLinksTitle: 'Accès rapides',
      viewDirectory: 'Consulter le répertoire complet',
      viewComparison: 'Lancer un comparatif sectoriel',
      manageData: 'Ajouter ou éditer des données',
      recentCompaniesTitle: 'Entreprises du jeu d’essai',
    },
    directory: {
      title: 'Répertoire des Entreprises',
      subtitle:
        'Explorez les entreprises du référentiel par secteur d’activité et statut documentaire.',
      searchPlaceholder: 'Rechercher par nom d’entreprise ou code...',
      allSectors: 'Tous les secteurs',
      allStatuses: 'Tous les statuts',
      noResultsTitle: 'Aucune entreprise trouvée',
      noResultsDesc: 'Modifiez vos critères de recherche ou réinitialisez les filtres.',
      resetFilters: 'Réinitialiser les filtres',
      columnCompany: 'Entreprise & Siège',
      columnSector: 'Secteur d’activité',
      columnYears: 'Exercices disponibles',
      columnStatus: 'Statut documentaire',
      columnActions: 'Action',
      viewFiling: 'Ouvrir la fiche',
    },
    detail: {
      overview: 'Fiche Synthétique',
      fiscalYear: 'Exercice financier',
      currencyAndUnit: 'Devise & Échelle',
      sourceTitle: 'Intitulé de la source',
      sourceUrl: 'Lien documentaire',
      lastReviewed: 'Dernière revue',
      financialStatements: 'États Financiers',
      incomeStatement: 'Compte de Résultat',
      balanceSheet: 'Bilan Simplifié',
      cashFlowStatement: 'Tableau des Flux de Trésorerie',
      calculatedRatios: 'Indicateurs & Ratios Calculés',
      formula: 'Formule comptable appliquée',
      meaning: 'Signification économique',
      limitations: 'Limites d’interprétation',
      noDataForYear: 'Aucun enregistrement financier pour l’exercice sélectionné.',
      statusDemo: 'Données Démo (Fictives)',
      statusVerified: 'Données Vérifiées (Source Primaire)',
      statusIncomplete: 'Données Incomplètes',
    },
    compare: {
      title: 'Comparateur d’Entreprises',
      subtitle: 'Analysez simultanément jusqu’à trois entreprises sur un exercice de référence.',
      selectCompanies: 'Sélectionnez les entreprises à comparer',
      selectUpToThree: 'Sélectionnez entre 1 et 3 entreprises',
      referenceYear: 'Exercice de comparaison',
      metric: 'Indicateur financier',
      warningComparability: 'Avertissement de comparabilité',
      chartTitle: 'Comparaison Graphique des Indicateurs Clés',
    },
    methodology: {
      title: 'Méthodologie & Rigueur Documentaire',
      subtitle:
        'Comprendre les définitions comptables, la mécanique de calcul et la provenance des données.',
      reportedVsCalculated: 'Chiffres Publiés vs Ratios Dérivés',
      reportedVsCalculatedBody:
        'RapportIQ distingue rigoureusement deux catégories d’information : d’une part, les données publiées telles quelles (Chiffre d’affaires, Résultat net, Capitaux propres issus des états de synthèse officiels) ; d’autre part, les ratios calculés mathématiquement par l’application. Les ratios ne sont pas des données primaires mais des outils d’aide à la lecture qui dépendent de conventions (ex: capitaux propres de fin de période plutôt que moyens).',
      ratioDefinitions: 'Formules et Règles de Calcul',
      growthDef:
        'Croissance du CA = [(CA de l’exercice n / CA de l’exercice n-1) - 1] × 100. Valable uniquement lorsque le CA de l’exercice n-1 est positif et exprimé dans la même devise et unité.',
      marginDef:
        'Marge nette = (Résultat net / Chiffre d’affaires) × 100. Mesure la part de chaque dirham de chiffre d’affaires transformée en résultat distribuable ou mis en réserve.',
      roeDef:
        'Rentabilité des Capitaux Propres (ROE) = (Résultat net / Capitaux propres) × 100. Convention retenue : capitaux propres de clôture. En cas de capitaux propres négatifs (situation nette déficitaire), le ratio est suspendu car il induit un contresens arithmétique.',
      debtEquityDef:
        'Ratio d’endettement (Dette / Capitaux propres) = Dettes financières / Capitaux propres. Mesure l’effet de levier et l’autonomie financière de l’entité vis-à-vis de ses créanciers.',
      sourcesHierarchy: 'Hiérarchie des Sources & Critères de Validation',
      sourcesHierarchyBody:
        'Dans le modèle RapportIQ pour le Maroc, les sources documentaires de référence doivent être : 1° Les Notes d’information et Documents de Référence visés par l’AMMC ; 2° Les états financiers annuels certifiés par les commissaires aux comptes (CAC) ; 3° Les communiqués financiers semestriels et annuels publiés sur le site officiel de la BVC. Pour les données de démo actuelles, aucune source réelle n’est simulée pour préserver l’intégrité.',
    },
    management: {
      title: 'Gestion & Administration des Données',
      subtitle:
        'Module destiné au fondateur et aux analystes pour saisir des exercices, importer ou exporter la base locale.',
      addCompany: 'Créer une fiche entreprise',
      editCompany: 'Modifier une entreprise',
      addFinancialYear: 'Saisir un nouvel exercice',
      exportCsv: 'Exporter la base en CSV',
      importCsv: 'Importer un fichier CSV',
      resetDemo: 'Réinitialiser les données de démo',
      localStorageNotice:
        'Avis d’infrastructure : Les données créées ou modifiées ici sont stockées dans le stockage local de votre navigateur (LocalStorage). Ce mode convient parfaitement au prototypage et à la démonstration sans frais de serveur, mais ne constitue pas une base de données cloud multi-utilisateurs partagée.',
    },
    terms: {
      revenue: 'Chiffre d’affaires (CA)',
      netIncome: 'Résultat net',
      operatingIncome: 'Résultat d’exploitation (EBIT)',
      totalAssets: 'Total Actif',
      equity: 'Capitaux propres',
      financialDebt: 'Dettes financières',
      operatingCashFlow: 'Flux de trésorerie d’exploitation',
      revenueGrowth: 'Croissance du CA',
      netProfitMargin: 'Marge nette',
      returnOnEquity: 'Rentabilité des fonds propres (ROE)',
      debtToEquity: 'Ratio Dettes / Capitaux Propres',
      assetTurnover: 'Rotation de l’actif',
      notAvailable: 'Non disponible',
      demoTag: 'Fictif / Démo',
      verifiedTag: 'Vérifié',
      incompleteTag: 'Incomplet',
    },
  },
  ar: {
    appName: 'RapportIQ',
    appTagline: 'افهم الأرقام. حلل أداء المقاولات.',
    demoNoticeBadge: 'بيانات تجريبية',
    demoNoticeBanner:
      'بيانات توضيحية تجريبية — أرقام اصطناعية لغايات بيداغوجية. هذه ليست قوائم مالية فعلية لشركات مدرجة أو مقيدة.',
    disclaimerShort:
      'تطبيق RapportIQ منصة تعليمية للتحليل المالي الوثائقي. لا يعتبر استشارة استثمارية مخصصة.',
    disclaimerFull:
      'تنبيه قانوني وتنظيمي: جميع الرسوم البيانية، العمليات الحسابية والبيانات المعروضة على منصة RapportIQ مخصصة حصرياً لأغراض البحث الأكاديمي والتدريب المالي. لا تقدم المنصة أي توصية لشراء أو بيع الأوراق المالية، ولا تشكل استشارة استثمارية بموجب القوانين والأنظمة المعمول بها. البيانات الأولية المعروضة هي نماذج اصطناعية بغرض العرض البرمجي.',
    nav: {
      landing: 'الرئيسية',
      dashboard: 'لوحة القيادة',
      directory: 'دليل الشركات',
      compare: 'المقارنة',
      methodology: 'المنهجية والمصادر',
      dataManagement: 'إدارة البيانات',
      exploreDemo: 'استكشاف التجربة',
    },
    landing: {
      heroTitle: 'افهم الأرقام. حلل أداء المقاولات.',
      heroSubtitle:
        'المنصة الرقمية للتحليل المالي الموجهة للطلاب، الباحثين والمحللين. مؤشرات دقيقة، رسوم تفاعلية، وشفافية كاملة لمصادر الوثائق.',
      ctaPrimary: 'دخول لوحة القيادة التجريبية',
      ctaSecondary: 'الاطلاع على المنهجية',
      problemTitle: 'تحدي قراءة التقارير المالية',
      problemDesc:
        'تمتد التقارير السنوية في العادة لمئات الصفحات من ملفات PDF المعقدة. بالنسبة للطلبة والمحللين المبتدئين، فإن استخراج المؤشرات الأساسية وحساب النسب ومطابقة العملات يتطلب جهداً شاقاً ومعرضاً للخطأ.',
      solutionTitle: 'وضوح منهجية RapportIQ',
      solutionDesc:
        'تعمل المنصة على توحيد قراءة القوائم المالية، وربط كل رقم بالسنة المالية والوحدة الرسمية (مليون درهم)، مع شرح القوانين الحسابية دون غموض.',
      capabilitiesTitle: 'أبرز القدرات التحليلية',
      capabilitiesSubtitle: 'أدوات مهيكلة لتفكيك الأداء التشغيلي والمالي للمقاولات.',
      cap1Title: 'نسب مالية دقيقة وصيغ مفتوحة',
      cap1Desc:
        'نمو رقم المعاملات، هامش الربح الصافي، العائد على حقوق الملكية ونسبة المديونية مع معالجة صارمة للحالات الاستثنائية.',
      cap2Title: 'تتبع موثوقية المصادر',
      cap2Desc:
        'كل حزمة بيانات توضح اسم المصدر وتاريخ المراجعة ودرجة التدقيق لضمان الأمانة العلمية.',
      cap3Title: 'أداة المقارنة المتعددة',
      cap3Desc:
        'مقارنة متزامنة لما يصل إلى ثلاث شركات جنباً إلى جنب مع تنبيهات عند اختلاف الفترات أو العملات.',
      cap4Title: 'تصدير واستيراد البيانات محلياً',
      cap4Desc:
        'إمكانية إنشاء سجلات جديدة وتصدير البيانات بصيغة CSV دون الحاجة لاشتراكات أو واجهات برمجية مدفوعة.',
      pedagogySectionTitle: 'بنية مصممة للبيئة الاقتصادية المغربية',
      pedagogySectionDesc:
        'تعتمد المنصة على معايير المخطط المحاسبي العام المغربي والمعايير الدولية للتقارير المالية المطبقة في بورصة الدار البيضاء، مع قابلية التوسع الدولي مستقبلاً.',
    },
    dashboard: {
      title: 'لوحة القيادة التحليلية',
      subtitle: 'نظرة شاملة على عينة الشركات المغربية التجريبية والمحاكاة.',
      kpiCompanies: 'شركات تجريبية',
      kpiYears: 'سنوات مالية مغطاة',
      kpiVerified: 'سجلات مدققة',
      kpiDemo: 'سجلات بيداغوجية',
      revenueChartTitle: 'تطور رقم المعاملات وصافي الأرباح (عينة)',
      revenueChartDesc: 'مقارنة متعددة السنوات للشركات المحاكاة بمليون درهم (MMAD).',
      quickLinksTitle: 'روابط سريعة',
      viewDirectory: 'تصفح الدليل الكامل للشركات',
      viewComparison: 'إجراء مقارنة قطاعية',
      manageData: 'إضافة أو تعديل البيانات',
      recentCompaniesTitle: 'شركات نموذج العرض',
    },
    directory: {
      title: 'دليل الشركات',
      subtitle: 'استكشف الشركات حسب القطاع الاقتصادي والحالة الوثائقية.',
      searchPlaceholder: 'البحث باسم المقاولة أو الرمز...',
      allSectors: 'جميع القطاعات',
      allStatuses: 'جميع الحالات',
      noResultsTitle: 'لم يتم العثور على أي مقاولة',
      noResultsDesc: 'يرجى تعديل معايير البحث أو إعادة ضبط خيارات التصفية.',
      resetFilters: 'إعادة ضبط التصفية',
      columnCompany: 'الشركة والمقر',
      columnSector: 'القطاع الاقتصادي',
      columnYears: 'السنوات المتاحة',
      columnStatus: 'الحالة الوثائقية',
      columnActions: 'الإجراء',
      viewFiling: 'فتح البطاقة',
    },
    detail: {
      overview: 'البطاقة التعريفية',
      fiscalYear: 'السنة المالية',
      currencyAndUnit: 'العملة والمقياس',
      sourceTitle: 'عنوان المصدر',
      sourceUrl: 'رابط الوثيقة',
      lastReviewed: 'آخر تدقيق',
      financialStatements: 'القوائم المالية',
      incomeStatement: 'حساب النتائج',
      balanceSheet: 'الميزانية المبسطة',
      cashFlowStatement: 'جدول تدفقات الخزينة',
      calculatedRatios: 'المؤشرات والنسب المحسوبة',
      formula: 'الصيغة المحاسبية المطبقة',
      meaning: 'الدلالة الاقتصادية',
      limitations: 'حدود التحليل',
      noDataForYear: 'لا توجد بيانات مسجلة لهذه السنة المالية المحددة.',
      statusDemo: 'بيانات تجريبية (اصطناعية)',
      statusVerified: 'بيانات مؤكدة (مصدر أولي)',
      statusIncomplete: 'بيانات غير مكتملة',
    },
    compare: {
      title: 'مقارنة الشركات',
      subtitle: 'تحليل متزامن لما يصل إلى ثلاث شركات في سنة مالية محددة.',
      selectCompanies: 'حدد الشركات للمقارنة',
      selectUpToThree: 'اختر بين شركة واحدة و 3 شركات',
      referenceYear: 'السنة المالية المرجعية',
      metric: 'المؤشر المالي',
      warningComparability: 'تنبيه حول قابلية المقارنة',
      chartTitle: 'مقارنة بيانية للمؤشرات الرئيسية',
    },
    methodology: {
      title: 'المنهجية والمصادر',
      subtitle: 'فهم التعريفات المحاسبية، آليات الحساب وموثوقية المعطيات.',
      reportedVsCalculated: 'الأرقام المنشورة مقابل النسب المشتقة',
      reportedVsCalculatedBody:
        'تميز المنصة بدقة بين المعطيات المنشورة كما هي في الوثائق الرسمية (رقم المعاملات، النتيجة الصافية) وبين النسب التي تحسبها المنصة رياضياً وفق قواعد صريحة وشفافة.',
      ratioDefinitions: 'الصيغ وقواعد الحساب',
      growthDef:
        'نسبة نمو رقم المعاملات = [(رقم المعاملات الحالي / السابق) - 1] × 100. تُحسب فقط عند توفر سنة سابقة موجبة وبنفس الوحدة والعملة.',
      marginDef:
        'هامش الربح الصافي = (النتيجة الصافية / رقم المعاملات) × 100. يوضح نسبة كل درهم مبيعات يتحول إلى ربح صافٍ.',
      roeDef:
        'العائد على حقوق الملكية = (النتيجة الصافية / حقوق الملكية) × 100. يُعلق الحساب في حال كانت حقوق الملكية سالبة لتفادي استنتاجات رياضية مضللة.',
      debtEquityDef:
        'نسبة المديونية = الديون المالية / حقوق الملكية. يقيس درجة الرافعة المالية والاعتماد على التمويل الخارجي.',
      sourcesHierarchy: 'سلسلة موثوقية المصادر',
      sourcesHierarchyBody:
        'في النموذج المغربي، المصادر المعتمدة تشمل: 1- وثائق الهيئة المغربية لسوق الرساميل (AMMC)؛ 2- القوائم المالية المعتمدة من مراقبي الحسابات؛ 3- البلاغات المالية الرسمية لبورصة الدار البيضاء.',
    },
    management: {
      title: 'إدارة وتحديث البيانات',
      subtitle: 'وحدة مخصصة للمؤسس والمحللين لإدخال السنوات المالية واستيراد وتصدير قاعدة البيانات محلياً.',
      addCompany: 'إضافة مقاولة جديدة',
      editCompany: 'تعديل مقاولة',
      addFinancialYear: 'إدخال سنة مالية جديدة',
      exportCsv: 'تصدير البيانات بصيغة CSV',
      importCsv: 'استيراد ملف CSV',
      resetDemo: 'استعادة البيانات التجريبية الأصلية',
      localStorageNotice:
        'تنبيه حول التخزين: البيانات المسجلة هنا تحفظ في ذاكرة المتصفح المحلي (LocalStorage). هذا النمط ملائم للعروض والاختبار دون تكاليف خوادم، ولا يمثل قاعدة بيانات سحابية مشتركة.',
    },
    terms: {
      revenue: 'رقم المعاملات (الإيرادات)',
      netIncome: 'النتيجة الصافية (الأرباح)',
      operatingIncome: 'النتيجة التشغيلية (EBIT)',
      totalAssets: 'إجمالي الأصول',
      equity: 'حقوق الملكية (الأموال الذاتية)',
      financialDebt: 'الديون المالية',
      operatingCashFlow: 'تدفقات الخزينة التشغيلية',
      revenueGrowth: 'نمو رقم المعاملات',
      netProfitMargin: 'هامش الربح الصافي',
      returnOnEquity: 'العائد على حقوق الملكية (ROE)',
      debtToEquity: 'نسبة الديون إلى حقوق الملكية',
      assetTurnover: 'معدل دوران الأصول',
      notAvailable: 'غير متوفر',
      demoTag: 'تجريبي / محاكاة',
      verifiedTag: 'مدقق',
      incompleteTag: 'غير مكتمل',
    },
  },
};
