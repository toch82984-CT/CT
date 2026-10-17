/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BookOpen,
  FileCheck2,
  Calculator,
  AlertTriangle,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';

interface MethodologyPageProps {
  locale: SupportedLocale;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ locale }) => {
  const t = TRANSLATIONS[locale];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {t.methodology.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{t.methodology.subtitle}</p>
      </div>

      {/* Section 1: Reported vs Calculated Figures */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-700">
          <Scale className="h-5 w-5" />
          <h2 className="text-lg font-bold text-slate-900">
            {t.methodology.reportedVsCalculated}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700">
          {t.methodology.reportedVsCalculatedBody}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              1. Données Primaires Publiées
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extraites mot à mot des états de synthèse légaux audités (Bilan, CPC, ESG, Tableau des flux).
              Exemples : Chiffre d’affaires, Résultat net consolidé, Total Actif, Capitaux propres.
              Ces grandeurs ne subissent aucune altération mathématique.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              2. Ratios Calculés & Dérivés
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculés à la volée selon des formules prédéfinies et documentées.
              Exemples : Croissance du CA (%), Marge nette (%), ROE (%), Levier d’endettement.
              Ils sont systématiquement suspendus si un dénominateur est nul ou non disponible.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Financial Ratio Formulas and Rules */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {t.methodology.ratioDefinitions}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formules rigoureuses, conditions de validité et limites économiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Growth */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                1. Croissance du Chiffre d’Affaires
              </h3>
              <span className="font-mono text-xs text-slate-500 font-semibold">%</span>
            </div>
            <div className="rounded-md bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              [(Chiffre d’affaires n / Chiffre d’affaires n-1) - 1] × 100
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p>
                <strong>Interprétation :</strong> Mesure le rythme de développement commercial de l’entreprise entre deux exercices consécutifs.
              </p>
              <p>
                <strong>Conditions de calcul :</strong> Nécessite que le chiffre d’affaires de l’exercice n-1 existe, soit strictement positif, et soit exprimé dans la même devise et unité.
              </p>
              <p className="text-slate-500">
                <strong>Limites :</strong> Ne distingue pas la croissance organique (hausse des volumes ou des prix) de la croissance externe (acquisitions d’actifs ou fusions).
              </p>
            </div>
          </div>

          {/* Net Margin */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                2. Marge Nette de l’Exercice
              </h3>
              <span className="font-mono text-xs text-emerald-700 font-semibold">%</span>
            </div>
            <div className="rounded-md bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              (Résultat net consolidé / Chiffre d’affaires) × 100
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p>
                <strong>Interprétation :</strong> Part de chaque dirham de vente qui subsiste une fois toutes les charges (d’exploitation, financières, fiscales et exceptionnelles) déduites.
              </p>
              <p>
                <strong>Conditions de calcul :</strong> Chiffre d’affaires strictement supérieur à zéro.
              </p>
              <p className="text-slate-500">
                <strong>Limites :</strong> Peut être temporairement faussée par des éléments exceptionnels (plus-values de cession d’actifs, litiges, dépréciations d’écarts d’acquisition).
              </p>
            </div>
          </div>

          {/* Return on Equity (ROE) */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                3. Rentabilité des Capitaux Propres (ROE)
              </h3>
              <span className="font-mono text-xs text-slate-500 font-semibold">%</span>
            </div>
            <div className="rounded-md bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              (Résultat net / Capitaux propres de clôture) × 100
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p>
                <strong>Interprétation :</strong> Taux de rendement comptable généré par les capitaux investis par les associés ou actionnaires.
              </p>
              <p>
                <strong>Convention appliquée :</strong> RapportIQ utilise par simplicité et homogénéité les capitaux propres de clôture de l’exercice.
              </p>
              <p className="text-slate-500">
                <strong>Règle critique :</strong> Lorsque les capitaux propres sont négatifs (situation de pertes cumulées absorbant le capital social), le calcul est bloqué car un résultat négatif divisé par des capitaux négatifs donnerait mathématiquement un pourcentage positif trompeur.
              </p>
            </div>
          </div>

          {/* Debt-to-Equity */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                4. Ratio d’Endettement (Gearing)
              </h3>
              <span className="font-mono text-xs text-slate-500 font-semibold">Multiple (x)</span>
            </div>
            <div className="rounded-md bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              Dettes financières / Capitaux propres
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p>
                <strong>Interprétation :</strong> Évalue l’équilibre financier et l’effet de levier de la structure de capital. Un ratio élevé indique une dépendance marquée aux prêteurs.
              </p>
              <p>
                <strong>Conditions de calcul :</strong> Dettes financières déclarées et capitaux propres strictement positifs.
              </p>
              <p className="text-slate-500">
                <strong>Limites :</strong> Ne prend pas en compte la maturité de la dette (court terme vs long terme) ni le coût moyen pondéré de la dette (WACC).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Moroccan Context & Official Filing Hierarchy */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <BookOpen className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-bold">
            {t.methodology.sourcesHierarchy}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700">
          {t.methodology.sourcesHierarchyBody}
        </p>

        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3.5 text-xs">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
              1
            </div>
            <div>
              <strong className="text-slate-900">
                AMMC (Autorité Marocaine du Marché des Capitaux)
              </strong>
              <p className="text-slate-600 mt-0.5">
                Notes d’information visées, Documents d’Enregistrement Universel (DEU) et prospectus d’émission obligataire ou d’introduction en bourse. Niveau de fiabilité le plus élevé.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3.5 text-xs">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold font-mono">
              2
            </div>
            <div>
              <strong className="text-slate-900">
                Rapports Financiers Annuels et États Certifiés par les CAC
              </strong>
              <p className="text-slate-600 mt-0.5">
                Comptes consolidés et comptes sociaux certifiés sans réserve par les Commissaires aux Comptes, avec annexes explicatives et principes d’évaluation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3.5 text-xs">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold font-mono">
              3
            </div>
            <div>
              <strong className="text-slate-900">
                Communiqués Officiels de la Bourse de Casablanca (BVC)
              </strong>
              <p className="text-slate-600 mt-0.5">
                Publications des résultats semestriels et annuels transmises à la cote officielle de la BVC selon le calendrier légal de communication financière.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Non-Investment Advice Disclaimer Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 text-white p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-base font-bold">
            {locale === 'ar' ? 'تنبيه حول الاستخدام الأكاديمي والمهني' : 'Avertissement sur l’Usage Pédagogique et Professionnel'}
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-slate-300">
          {t.disclaimerFull}
        </p>
        <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
          Pour toute décision d’investissement en valeurs mobilières marocaines, il est impératif de consulter les documents légaux d’information disponibles auprès des émetteurs et de requérir le conseil d’intermédiaires financiers agréés (Sociétés de Bourse, Sociétés de Gestion d’OPCVM).
        </p>
      </div>
    </div>
  );
};
