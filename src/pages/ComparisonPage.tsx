/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Scale,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  X,
  Plus,
} from 'lucide-react';
import { Company, SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';
import {
  calculateFinancialRatios,
  checkFinancialComparability,
  formatAmount,
  formatPercent,
  formatRatio,
} from '../services/financialCalculations';
import { ComparisonBarChart, CompanyMetricItem } from '../components/charts/ComparisonBarChart';

interface ComparisonPageProps {
  companies: Company[];
  locale: SupportedLocale;
  initialSelectedIds?: string[];
  onSelectCompany: (companyId: string) => void;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({
  companies,
  locale,
  initialSelectedIds,
  onSelectCompany,
}) => {
  const t = TRANSLATIONS[locale];

  // Selected companies (up to 3)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (initialSelectedIds && initialSelectedIds.length > 0) {
      return initialSelectedIds.slice(0, 3);
    }
    return companies.slice(0, 2).map((c) => c.id);
  });

  // Reference fiscal year for the comparison
  const [referenceYear, setReferenceYear] = useState<number>(2024);

  // Active metric for the chart
  const [activeMetric, setActiveMetric] = useState<
    'revenue' | 'netIncome' | 'netProfitMargin' | 'roe' | 'debtToEquity'
  >('revenue');

  // Available fiscal years in the entire dataset
  const allYears = useMemo(() => {
    const set = new Set<number>();
    companies.forEach((c) => c.financials.forEach((f) => set.add(f.fiscalYear)));
    return Array.from(set).sort((a, b) => b - a);
  }, [companies]);

  // Selected company objects
  const selectedCompanies = useMemo(
    () => companies.filter((c) => selectedIds.includes(c.id)),
    [companies, selectedIds]
  );

  // Add company handler
  const handleAddCompany = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Remove company handler
  const handleRemoveCompany = (id: string) => {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  // Comparability validation check
  const comparabilityAnalysis = useMemo(() => {
    const records = selectedCompanies
      .map((c) => {
        const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
        return fin ? { companyName: c.name, financials: fin } : null;
      })
      .filter(Boolean) as { companyName: string; financials: any }[];

    return checkFinancialComparability(records);
  }, [selectedCompanies, referenceYear]);

  // Prepare chart items
  const chartItems: CompanyMetricItem[] = useMemo(() => {
    return selectedCompanies.map((c) => {
      const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
      const rat = calculateFinancialRatios(c, referenceYear);

      return {
        companyName: c.name,
        code: c.code,
        revenue: fin ? fin.revenue : 0,
        netIncome: fin ? fin.netIncome : 0,
        netProfitMargin: rat.netProfitMargin,
        roe: rat.returnOnEquity,
        debtToEquity: rat.debtToEquity,
        unit: fin?.unit || 'MMAD',
        currency: fin?.currency || 'MAD',
      };
    });
  }, [selectedCompanies, referenceYear]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {t.compare.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{t.compare.subtitle}</p>
      </div>

      {/* Control Bar: Company Selector & Reference Year */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-700">
              {t.compare.selectCompanies} ({selectedIds.length}/3)
            </span>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {selectedCompanies.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800"
                >
                  <span>{c.name}</span>
                  <button
                    onClick={() => handleRemoveCompany(c.id)}
                    className="text-slate-400 hover:text-rose-600"
                    aria-label={`Retirer ${c.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {selectedIds.length < 3 && (
                <div className="flex items-center gap-1">
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleAddCompany(e.target.value);
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-emerald-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      + Ajouter une entreprise à comparer...
                    </option>
                    {companies
                      .filter((c) => !selectedIds.includes(c.id))
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Reference Year Dropdown */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <Calendar className="h-4 w-4 text-slate-500" />
            <label htmlFor="ref-year-select" className="text-xs font-medium text-slate-700">
              {t.compare.referenceYear} :
            </label>
            <select
              id="ref-year-select"
              value={referenceYear}
              onChange={(e) => setReferenceYear(Number(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none"
            >
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparability Warnings Callout */}
        {!comparabilityAnalysis.isStrictlyComparable && (
          <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>{t.compare.warningComparability} :</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
              {comparabilityAnalysis.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Comparison Matrix Table */}
      {selectedCompanies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
          <Scale className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-4 text-base font-semibold text-slate-900">
            Aucune entreprise sélectionnée
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Sélectionnez jusqu’à trois entreprises pour comparer leurs grandeurs financières.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Tableau Comparatif des Ratios et États Comptables ({referenceYear})
            </h3>
            <span className="font-mono text-xs text-slate-500">Unité : MMAD</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
                  <th className="py-3 px-4 font-semibold w-1/4">Indicateur Financier</th>
                  {selectedCompanies.map((c) => (
                    <th key={c.id} className="py-3 px-4 font-semibold text-right">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="font-mono text-[11px] text-slate-400 font-normal">
                        {c.sector}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* 1. Revenue */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.revenue}
                  </td>
                  {selectedCompanies.map((c) => {
                    const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 font-semibold">
                        {fin ? formatAmount(fin.revenue, fin.unit) : t.terms.notAvailable}
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Revenue Growth */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.revenueGrowth} ({referenceYear - 1} → {referenceYear})
                  </td>
                  {selectedCompanies.map((c) => {
                    const rat = calculateFinancialRatios(c, referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-800 font-medium">
                        {formatPercent(rat.revenueGrowth, t.terms.notAvailable, true)}
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Net Income */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.netIncome}
                  </td>
                  {selectedCompanies.map((c) => {
                    const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-emerald-700 font-bold">
                        {fin ? formatAmount(fin.netIncome, fin.unit) : t.terms.notAvailable}
                      </td>
                    );
                  })}
                </tr>

                {/* 4. Net Profit Margin */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.netProfitMargin} (%)
                  </td>
                  {selectedCompanies.map((c) => {
                    const rat = calculateFinancialRatios(c, referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 font-semibold">
                        {formatPercent(rat.netProfitMargin, t.terms.notAvailable)}
                      </td>
                    );
                  })}
                </tr>

                {/* 5. Total Assets */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.totalAssets}
                  </td>
                  {selectedCompanies.map((c) => {
                    const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-800">
                        {fin ? formatAmount(fin.totalAssets, fin.unit) : t.terms.notAvailable}
                      </td>
                    );
                  })}
                </tr>

                {/* 6. Equity */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.equity}
                  </td>
                  {selectedCompanies.map((c) => {
                    const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-800">
                        {fin ? formatAmount(fin.equity, fin.unit) : t.terms.notAvailable}
                      </td>
                    );
                  })}
                </tr>

                {/* 7. Return on Equity (ROE) */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.returnOnEquity} (ROE)
                  </td>
                  {selectedCompanies.map((c) => {
                    const rat = calculateFinancialRatios(c, referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 font-semibold">
                        {formatPercent(rat.returnOnEquity, t.terms.notAvailable)}
                      </td>
                    );
                  })}
                </tr>

                {/* 8. Financial Debt */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.financialDebt}
                  </td>
                  {selectedCompanies.map((c) => {
                    const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-800">
                        {fin && fin.financialDebt !== null
                          ? formatAmount(fin.financialDebt, fin.unit)
                          : <span className="text-slate-400 italic">Non disponible</span>}
                      </td>
                    );
                  })}
                </tr>

                {/* 9. Debt to Equity */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.debtToEquity}
                  </td>
                  {selectedCompanies.map((c) => {
                    const rat = calculateFinancialRatios(c, referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 font-semibold">
                        {formatRatio(rat.debtToEquity, t.terms.notAvailable)}
                      </td>
                    );
                  })}
                </tr>

                {/* 10. Operating Cash Flow */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.terms.operatingCashFlow}
                  </td>
                  {selectedCompanies.map((c) => {
                    const fin = c.financials.find((f) => f.fiscalYear === referenceYear);
                    return (
                      <td key={c.id} className="py-3 px-4 text-right font-mono tabular-nums text-blue-700 font-medium">
                        {fin && fin.operatingCashFlow !== null
                          ? formatAmount(fin.operatingCashFlow, fin.unit)
                          : <span className="text-slate-400 italic">Non disponible</span>}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Visual Chart Comparison */}
      {selectedCompanies.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {t.compare.chartTitle} ({referenceYear})
              </h3>
              <p className="text-xs text-slate-500">
                Visualisez l’écart entre les entreprises sélectionnées pour chaque métrique.
              </p>
            </div>

            {/* Metric Selector Button Strip */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setActiveMetric('revenue')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeMetric === 'revenue'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chiffre d’affaires
              </button>
              <button
                onClick={() => setActiveMetric('netIncome')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeMetric === 'netIncome'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Résultat net
              </button>
              <button
                onClick={() => setActiveMetric('netProfitMargin')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeMetric === 'netProfitMargin'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Marge nette (%)
              </button>
              <button
                onClick={() => setActiveMetric('roe')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeMetric === 'roe'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ROE (%)
              </button>
              <button
                onClick={() => setActiveMetric('debtToEquity')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeMetric === 'debtToEquity'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dettes / Fonds propres
              </button>
            </div>
          </div>

          <ComparisonBarChart
            items={chartItems}
            metricKey={activeMetric}
            metricLabel={
              activeMetric === 'revenue'
                ? t.terms.revenue
                : activeMetric === 'netIncome'
                ? t.terms.netIncome
                : activeMetric === 'netProfitMargin'
                ? t.terms.netProfitMargin
                : activeMetric === 'roe'
                ? t.terms.returnOnEquity
                : t.terms.debtToEquity
            }
          />
        </div>
      )}
    </div>
  );
};
