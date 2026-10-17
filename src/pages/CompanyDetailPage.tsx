/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building2,
  FileCheck2,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Company, SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';
import { FinancialBarChart } from '../components/charts/FinancialBarChart';
import {
  calculateFinancialRatios,
  formatAmount,
  formatPercent,
  formatRatio,
} from '../services/financialCalculations';

interface CompanyDetailPageProps {
  company: Company;
  locale: SupportedLocale;
  onBack: () => void;
  onCompareWith: (companyId: string) => void;
}

export const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({
  company,
  locale,
  onBack,
  onCompareWith,
}) => {
  const t = TRANSLATIONS[locale];

  // Available fiscal years
  const availableYears = useMemo(
    () => company.financials.map((f) => f.fiscalYear).sort((a, b) => b - a),
    [company]
  );

  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || 2024
  );

  // Active year financials
  const currentFin = useMemo(
    () => company.financials.find((f) => f.fiscalYear === selectedYear),
    [company, selectedYear]
  );

  // Calculated ratios
  const ratios = useMemo(
    () => calculateFinancialRatios(company, selectedYear),
    [company, selectedYear]
  );

  // State to toggle metric detail explanations
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const toggleMetric = (key: string) => {
    setExpandedMetric(expandedMetric === key ? null : key);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Back button & Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{locale === 'ar' ? 'العودة للدليل' : 'Retour au répertoire'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onCompareWith(company.id)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            <span>{locale === 'ar' ? 'مقارنة هذه المقاولة' : 'Comparer cette entreprise'}</span>
          </button>
        </div>
      </div>

      {/* Company Header Identity Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {company.name}
              </h1>
              {/* Status Badge */}
              {company.status === 'verified' ? (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Vérifié</span>
                </span>
              ) : company.status === 'incomplete' ? (
                <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 border border-amber-200">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Dossier Incomplet</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
                  <span>Fictif (Démo)</span>
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="font-mono font-medium text-slate-700">
                Code : {company.code}
              </span>
              <span aria-hidden="true">·</span>
              <span>{company.legalForm}</span>
              <span aria-hidden="true">·</span>
              <span>Secteur : <strong className="text-slate-800">{company.sector}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Siège : {company.headquarters}</span>
              <span aria-hidden="true">·</span>
              <span>Création : {company.foundingYear}</span>
            </div>
          </div>

          {/* Fiscal Year Selector */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span className="font-medium text-slate-700">{t.detail.fiscalYear} :</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 font-mono font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
          {company.description}
        </p>
      </div>

      {/* Calculated Ratios Grid (With Plain French / Arabic Explanations) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {t.detail.calculatedRatios} ({selectedYear})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {locale === 'ar'
              ? 'مؤشرات مشتقة رياضياً من القوائم المالية مع شرح الصيغة المحاسبية وحدود التحليل.'
              : 'Indicateurs dérivés calculés mathématiquement. Cliquez sur chaque carte pour afficher la formule et les règles appliquées.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ratio 1: Revenue Growth */}
          <div
            onClick={() => toggleMetric('growth')}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">{t.terms.revenueGrowth}</span>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
              {formatPercent(ratios.revenueGrowth, t.terms.notAvailable, true)}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {selectedYear - 1} → {selectedYear}
            </div>

            {expandedMetric === 'growth' && (
              <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600 space-y-1">
                <div>
                  <strong>Formule :</strong> [(CA {selectedYear} / CA {selectedYear - 1}) - 1] × 100
                </div>
                <div className="text-slate-500">
                  Mesure l’expansion des ventes par rapport à l’exercice précédent à périmètre constant.
                </div>
              </div>
            )}
          </div>

          {/* Ratio 2: Net Profit Margin */}
          <div
            onClick={() => toggleMetric('margin')}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">{t.terms.netProfitMargin}</span>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-emerald-700">
              {formatPercent(ratios.netProfitMargin, t.terms.notAvailable)}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Résultat net / CA
            </div>

            {expandedMetric === 'margin' && (
              <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600 space-y-1">
                <div>
                  <strong>Formule :</strong> (Résultat net / Chiffre d’affaires) × 100
                </div>
                <div className="text-slate-500">
                  Indique la proportion de chaque dirham de vente convertie en bénéfice net après impôts.
                </div>
              </div>
            )}
          </div>

          {/* Ratio 3: Return on Equity (ROE) */}
          <div
            onClick={() => toggleMetric('roe')}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">{t.terms.returnOnEquity}</span>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
              {formatPercent(ratios.returnOnEquity, t.terms.notAvailable)}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Convention : capitaux propres de clôture
            </div>

            {expandedMetric === 'roe' && (
              <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600 space-y-1">
                <div>
                  <strong>Formule :</strong> (Résultat net / Capitaux propres) × 100
                </div>
                <div className="text-slate-500">
                  Rendement généré pour les actionnaires. Attention : suspendu automatiquement en cas de capitaux propres négatifs.
                </div>
              </div>
            )}
          </div>

          {/* Ratio 4: Debt-to-Equity */}
          <div
            onClick={() => toggleMetric('debt')}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">{t.terms.debtToEquity}</span>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
              {formatRatio(ratios.debtToEquity, t.terms.notAvailable)}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Dettes financières / Capitaux propres
            </div>

            {expandedMetric === 'debt' && (
              <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600 space-y-1">
                <div>
                  <strong>Formule :</strong> Dettes financières / Capitaux propres
                </div>
                <div className="text-slate-500">
                  Mesure la structure de financement et le niveau de dépendance aux créanciers financiers.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calculation notes if any */}
        {ratios.notes.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold">
              <Info className="h-4 w-4 text-amber-700" />
              <span>Notes méthodologiques sur cet exercice :</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
              {ratios.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Detailed Financial Statement Line Items Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.detail.financialStatements} ({selectedYear})
            </h3>
            <p className="text-xs text-slate-500">
              Grandes masses extraites du bilan, compte de résultat et tableau des flux de trésorerie.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500">
            Unité : {currentFin?.unit || 'MMAD'} ({currentFin?.currency || 'MAD'})
          </span>
        </div>

        {currentFin ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">Poste comptable</th>
                  <th className="py-2.5 px-3 font-semibold">État d’origine</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Montant</th>
                  <th className="py-2.5 px-3 font-semibold">Explication en clair</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Revenue */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {t.terms.revenue}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">Compte de Résultat (CPC)</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900">
                    {formatAmount(currentFin.revenue, currentFin.unit)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    Volume global des ventes et prestations facturées sur l’exercice.
                  </td>
                </tr>

                {/* Operating Income (EBIT) */}
                {currentFin.operatingIncome !== undefined && (
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      {t.terms.operatingIncome}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">Compte de Résultat (CPC)</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900">
                      {formatAmount(currentFin.operatingIncome, currentFin.unit)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      Performance économique pure de l’activité, avant charges financières et impôts.
                    </td>
                  </tr>
                )}

                {/* Net Income */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {t.terms.netIncome}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">Compte de Résultat (CPC)</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-emerald-700">
                    {formatAmount(currentFin.netIncome, currentFin.unit)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    Solde final net après prise en compte des charges financières, non courantes et de l’IS.
                  </td>
                </tr>

                {/* Total Assets */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {t.terms.totalAssets}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">Bilan (Actif total)</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900">
                    {formatAmount(currentFin.totalAssets, currentFin.unit)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    Ensemble des ressources et emplois économiques contrôlés par l’entité.
                  </td>
                </tr>

                {/* Equity */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {t.terms.equity}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">Bilan (Passif - Capitaux propres)</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900">
                    {formatAmount(currentFin.equity, currentFin.unit)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    Fonds apportés par les actionnaires et bénéfices accumulés réinvestis en réserve.
                  </td>
                </tr>

                {/* Financial Debt */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {t.terms.financialDebt}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">Bilan (Dettes de financement)</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900">
                    {currentFin.financialDebt !== null
                      ? formatAmount(currentFin.financialDebt, currentFin.unit)
                      : <span className="text-slate-400 font-normal italic">Non disponible</span>}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    Emprunts obligataires et crédits bancaires à moyen et long terme.
                  </td>
                </tr>

                {/* Operating Cash Flow */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {t.terms.operatingCashFlow}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">Tableau des Flux de Trésorerie (TFT)</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-blue-700">
                    {currentFin.operatingCashFlow !== null
                      ? formatAmount(currentFin.operatingCashFlow, currentFin.unit)
                      : <span className="text-slate-400 font-normal italic">Non disponible</span>}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    Liquidités nettes réellement générées par l’exploitation après variation du BFR.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">
            {t.detail.noDataForYear}
          </div>
        )}
      </div>

      {/* Multi-Year Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Historique Pluriannuel ({company.name})
          </h3>
          <p className="text-xs text-slate-500">
            Trajectoire comparée du chiffre d’affaires, du résultat net et du cash-flow opérationnel.
          </p>
        </div>

        <FinancialBarChart
          data={company.financials}
          unit={company.financials[0]?.unit || 'MMAD'}
          currency={company.financials[0]?.currency || 'MAD'}
        />
      </div>

      {/* Source & Traceability Metadata Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileCheck2 className="h-4 w-4 text-emerald-700" />
          <h3 className="text-base font-bold text-slate-900">
            {locale === 'ar' ? 'بطاقة تتبع المصدر الوثائقي' : 'Traçabilité et Métadonnées de Source'}
          </h3>
        </div>

        {currentFin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 font-medium">{t.detail.sourceTitle} :</span>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {currentFin.sourceTitle}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">{t.detail.sourceUrl} :</span>
                {currentFin.sourceUrl ? (
                  <p className="mt-0.5">
                    <a
                      href={currentFin.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                    >
                      <span>Lien d’archive officiel</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                ) : (
                  <p className="mt-0.5 text-slate-500 italic">
                    Aucun lien externe (Jeu didactique synthétique interne — RapportIQ)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-500 font-medium">{t.detail.lastReviewed} :</span>
                <p className="mt-0.5 font-mono text-slate-800">
                  {currentFin.lastReviewedDate}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Statut de conformité :</span>
                <p className="mt-0.5">
                  {company.status === 'verified' ? (
                    <span className="text-emerald-700 font-semibold">
                      Source Primaire Vérifiée (Rapport Annuel / AMMC)
                    </span>
                  ) : company.status === 'incomplete' ? (
                    <span className="text-amber-800 font-semibold">
                      Dossier didactique incomplet (postes manquants)
                    </span>
                  ) : (
                    <span className="text-slate-700 font-semibold">
                      Données de démonstration synthétiques (Fictif)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500">
            Aucun enregistrement disponible.
          </div>
        )}
      </div>
    </div>
  );
};
