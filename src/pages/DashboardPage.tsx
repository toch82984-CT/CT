/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Building2,
  Calendar,
  ShieldCheck,
  FileText,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Database,
  ExternalLink,
} from 'lucide-react';
import { Company, SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';
import { FinancialBarChart } from '../components/charts/FinancialBarChart';
import { formatAmount, formatPercent } from '../services/financialCalculations';

interface DashboardPageProps {
  companies: Company[];
  locale: SupportedLocale;
  onNavigate: (tab: string, companyId?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  companies,
  locale,
  onNavigate,
}) => {
  const t = TRANSLATIONS[locale];

  // Selected company for detailed multi-year preview chart
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    companies[0]?.id || ''
  );

  const activeCompany = useMemo(
    () => companies.find((c) => c.id === selectedCompanyId) || companies[0],
    [companies, selectedCompanyId]
  );

  // Compute portfolio KPIs
  const totalCompanies = companies.length;
  const allYears = useMemo(() => {
    const years = new Set<number>();
    companies.forEach((c) => c.financials.forEach((f) => years.add(f.fiscalYear)));
    return Array.from(years).sort();
  }, [companies]);

  const verifiedCount = companies.filter((c) => c.status === 'verified').length;
  const demoCount = companies.filter((c) => c.status === 'demo').length;
  const incompleteCount = companies.filter((c) => c.status === 'incomplete').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header with Title and Explanatory Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t.dashboard.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{t.dashboard.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('directory')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Building2 className="h-4 w-4 text-slate-500" />
            <span>{t.dashboard.viewDirectory}</span>
          </button>
          <button
            onClick={() => onNavigate('compare')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <BarChart2 className="h-4 w-4" />
            <span>{t.dashboard.viewComparison}</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (4 columns) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        {/* Card 1: Companies */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t.dashboard.kpiCompanies}</span>
            <Building2 className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {totalCompanies}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {incompleteCount > 0 ? `${incompleteCount} dossier incomplet pour tests` : 'Dossiers chargés'}
          </div>
        </div>

        {/* Card 2: Fiscal Years */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t.dashboard.kpiYears}</span>
            <Calendar className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {allYears.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {allYears.length > 0 ? `De ${allYears[0]} à ${allYears[allYears.length - 1]}` : 'Aucun'}
          </div>
        </div>

        {/* Card 3: Demo Records */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t.dashboard.kpiDemo}</span>
            <FileText className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-amber-700">
            {demoCount + incompleteCount}
          </div>
          <div className="mt-1 text-[11px] text-amber-700">
            Simulation didactique
          </div>
        </div>

        {/* Card 4: Verified Records */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">{t.dashboard.kpiVerified}</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-emerald-700">
            {verifiedCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Sources primaires auditées
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.dashboard.revenueChartTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.dashboard.revenueChartDesc}
            </p>
          </div>

          {/* Company Selector for the Chart */}
          <div className="flex items-center gap-2">
            <label htmlFor="company-chart-select" className="text-xs text-slate-600">
              {locale === 'ar' ? 'اختر المقاولة :' : 'Entreprise affichée :'}
            </label>
            <select
              id="company-chart-select"
              value={activeCompany?.id || ''}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Quick Bio */}
        {activeCompany && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <div>
              <strong className="text-slate-900">{activeCompany.name}</strong> ·{' '}
              <span>{activeCompany.sector}</span> ·{' '}
              <span>{activeCompany.headquarters}</span>
            </div>
            <button
              onClick={() => onNavigate('detail', activeCompany.id)}
              className="flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>{t.directory.viewFiling}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Interactive Bar Chart */}
        {activeCompany ? (
          <FinancialBarChart
            data={activeCompany.financials}
            unit={activeCompany.financials[0]?.unit || 'MMAD'}
            currency={activeCompany.financials[0]?.currency || 'MAD'}
          />
        ) : (
          <div className="text-xs text-slate-400 py-8 text-center">
            Aucune entreprise sélectionnée.
          </div>
        )}
      </div>

      {/* Overview Table of Demo Companies */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.dashboard.recentCompaniesTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ar'
                ? 'قائمة سريعة بالشركات المتاحة للاختبار والتحليل مع مؤشرات أحدث سنة مالية.'
                : 'Aperçu synthétique des sociétés disponibles avec les indicateurs du dernier exercice clos.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{t.directory.title}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">{t.directory.columnCompany}</th>
                <th className="py-2.5 px-3 font-semibold">{t.directory.columnSector}</th>
                <th className="py-2.5 px-3 font-semibold text-right">Dernier CA</th>
                <th className="py-2.5 px-3 font-semibold text-right">Dernier RN</th>
                <th className="py-2.5 px-3 font-semibold text-right">Capitaux Propres</th>
                <th className="py-2.5 px-3 font-semibold">{t.directory.columnStatus}</th>
                <th className="py-2.5 px-3 font-semibold text-center">{t.directory.columnActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companies.map((company) => {
                const latest = company.financials[company.financials.length - 1];
                return (
                  <tr key={company.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{company.name}</div>
                      <div className="font-mono text-[11px] text-slate-400">
                        {company.code} · {company.legalForm}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{company.sector}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900 font-medium">
                      {latest ? formatAmount(latest.revenue, latest.unit) : '—'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-700 font-medium">
                      {latest ? formatAmount(latest.netIncome, latest.unit) : '—'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">
                      {latest ? formatAmount(latest.equity, latest.unit) : '—'}
                    </td>
                    <td className="py-3 px-3">
                      {company.status === 'verified' ? (
                        <span className="text-emerald-700 font-medium text-[11px]">
                          Vérifié (Source Primaire)
                        </span>
                      ) : company.status === 'incomplete' ? (
                        <span className="text-amber-700 font-medium text-[11px]">
                          Incomplet (Didactique)
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium text-[11px]">
                          Démo (Fictif)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onNavigate('detail', company.id)}
                        className="rounded px-2.5 py-1 font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                      >
                        {t.directory.viewFiling}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
