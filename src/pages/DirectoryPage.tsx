/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Building2, ArrowRight } from 'lucide-react';
import { Company, DataStatus, Sector, SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';
import { formatAmount } from '../services/financialCalculations';

interface DirectoryPageProps {
  companies: Company[];
  locale: SupportedLocale;
  onSelectCompany: (companyId: string) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  companies,
  locale,
  onSelectCompany,
}) => {
  const t = TRANSLATIONS[locale];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Extract unique sectors
  const sectors = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => set.add(c.sector));
    return Array.from(set).sort();
  }, [companies]);

  // Filtered companies
  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        searchTerm.trim() === '' ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.headquarters.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSector = selectedSector === 'all' || c.sector === selectedSector;
      const matchStatus = selectedStatus === 'all' || c.status === selectedStatus;

      return matchSearch && matchSector && matchStatus;
    });
  }, [companies, searchTerm, selectedSector, selectedStatus]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedSector('all');
    setSelectedStatus('all');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {t.directory.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{t.directory.subtitle}</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.directory.searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sector filter */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">{t.directory.allSectors}</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">{t.directory.allStatuses}</option>
            <option value="demo">Fictif / Démo</option>
            <option value="verified">Vérifié (Source Primaire)</option>
            <option value="incomplete">Incomplet (Didactique)</option>
          </select>

          {/* Reset button if active filters */}
          {(searchTerm || selectedSector !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.directory.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Notice */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          {filtered.length} entreprise{filtered.length > 1 ? 's' : ''} répertoriée{filtered.length > 1 ? 's' : ''}
        </span>
        <span className="font-mono text-amber-700 text-[11px]">
          Toutes les données ci-dessous sont purement synthétiques (DEMO)
        </span>
      </div>

      {/* Results View */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
          <Building2 className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-4 text-base font-semibold text-slate-900">
            {t.directory.noResultsTitle}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {t.directory.noResultsDesc}
          </p>
          <div className="mt-6">
            <button
              onClick={handleReset}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
            >
              {t.directory.resetFilters}
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
                <th className="py-3 px-4 font-semibold">{t.directory.columnCompany}</th>
                <th className="py-3 px-4 font-semibold">{t.directory.columnSector}</th>
                <th className="py-3 px-4 font-semibold">{t.directory.columnYears}</th>
                <th className="py-3 px-4 font-semibold text-right">Dernier CA</th>
                <th className="py-3 px-4 font-semibold">{t.directory.columnStatus}</th>
                <th className="py-3 px-4 font-semibold text-center">{t.directory.columnActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((company) => {
                const years = company.financials.map((f) => f.fiscalYear).sort();
                const latest = company.financials[company.financials.length - 1];

                return (
                  <tr
                    key={company.id}
                    onClick={() => onSelectCompany(company.id)}
                    className="cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{company.name}</div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 mt-0.5">
                        <span>{company.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{company.headquarters}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {company.sector}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-600 tabular-nums">
                        {years.join(', ')}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-900 font-semibold">
                      {latest ? formatAmount(latest.revenue, latest.unit) : 'Non dispo.'}
                    </td>
                    <td className="py-3.5 px-4">
                      {company.status === 'verified' ? (
                        <span className="text-emerald-700 font-medium text-[11px]">
                          Vérifié
                        </span>
                      ) : company.status === 'incomplete' ? (
                        <span className="text-amber-700 font-medium text-[11px]">
                          Incomplet
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium text-[11px]">
                          Fictif (Démo)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCompany(company.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      >
                        <span>{t.directory.viewFiling}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
