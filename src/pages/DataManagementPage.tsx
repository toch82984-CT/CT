/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Database,
  Plus,
  Download,
  Upload,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Building,
  Calendar,
  Save,
  X,
} from 'lucide-react';
import {
  AnnualFinancials,
  Company,
  Currency,
  DataStatus,
  ReportingUnit,
  Sector,
  SupportedLocale,
} from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';
import {
  exportCompaniesToCSV,
  importCompaniesFromCSV,
  saveCompanies,
  resetToDemoData,
} from '../services/storageService';

interface DataManagementPageProps {
  companies: Company[];
  locale: SupportedLocale;
  onUpdateCompanies: (updated: Company[]) => void;
  onSelectCompany: (companyId: string) => void;
}

export const DataManagementPage: React.FC<DataManagementPageProps> = ({
  companies,
  locale,
  onUpdateCompanies,
  onSelectCompany,
}) => {
  const t = TRANSLATIONS[locale];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Modal / Form state for Creating a Company
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    code: '',
    name: '',
    legalForm: 'Société Anonyme',
    sector: 'Agroalimentaire & Boissons',
    headquarters: 'Casablanca, Maroc',
    foundingYear: 2018,
    status: 'demo',
    description: '',
  });

  // Modal / Form state for Adding an Annual Financial Record
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [targetCompanyId, setTargetCompanyId] = useState<string>(companies[0]?.id || '');
  const [newFinancial, setNewFinancial] = useState<Partial<AnnualFinancials>>({
    fiscalYear: 2024,
    currency: 'MAD',
    unit: 'MMAD',
    revenue: 500,
    netIncome: 35,
    operatingIncome: 55,
    totalAssets: 650,
    equity: 300,
    financialDebt: 150,
    operatingCashFlow: 45,
    sourceTitle: 'Revue Financière Documentaire RapportIQ',
    sourceUrl: '',
    lastReviewedDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Handle CSV Export
  const handleExportCSV = () => {
    try {
      const csvString = exportCompaniesToCSV(companies);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `rapportiq_export_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setNotification({
        type: 'success',
        message: 'Base de données exportée avec succès en CSV.',
      });
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: `Erreur d'exportation : ${err.message}`,
      });
    }
  };

  // Handle CSV File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const result = importCompaniesFromCSV(content);
        if (result.success && result.companies) {
          onUpdateCompanies(result.companies);
          setNotification({
            type: 'success',
            message: `Import réussi : ${result.importedCount} entreprise(s) chargée(s).`,
          });
        } else {
          setNotification({
            type: 'error',
            message: result.error || 'Erreur lors de l’importation du fichier CSV.',
          });
        }
      }
    };
    reader.onerror = () => {
      setNotification({
        type: 'error',
        message: 'Impossible de lire le fichier sélectionné.',
      });
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle Reset to Original Demo Data
  const handleResetData = () => {
    if (
      window.confirm(
        'Êtes-vous certain de vouloir réinitialiser la base locale avec les 6 entreprises démo d’origine ? Toutes vos modifications manuelles seront écrasées.'
      )
    ) {
      const defaultData = resetToDemoData();
      onUpdateCompanies(defaultData);
      setNotification({
        type: 'info',
        message: 'Jeu de données de démonstration réinitialisé avec succès.',
      });
    }
  };

  // Handle Save New Company
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.code) {
      setNotification({
        type: 'error',
        message: 'Le nom et le code de l’entreprise sont obligatoires.',
      });
      return;
    }

    const created: Company = {
      id: `company-${Date.now()}`,
      code: newCompany.code.toUpperCase().trim(),
      name: newCompany.name.trim(),
      legalForm: newCompany.legalForm || 'Société Anonyme',
      sector: (newCompany.sector as Sector) || 'Agroalimentaire & Boissons',
      headquarters: newCompany.headquarters || 'Casablanca, Maroc',
      foundingYear: Number(newCompany.foundingYear) || 2020,
      status: (newCompany.status as DataStatus) || 'demo',
      description: newCompany.description || 'Fiche d’entreprise créée manuellement.',
      financials: [],
    };

    const updated = [created, ...companies];
    saveCompanies(updated);
    onUpdateCompanies(updated);
    setIsCompanyModalOpen(false);
    setNewCompany({
      code: '',
      name: '',
      legalForm: 'Société Anonyme',
      sector: 'Agroalimentaire & Boissons',
      headquarters: 'Casablanca, Maroc',
      foundingYear: 2020,
      status: 'demo',
      description: '',
    });
    setNotification({
      type: 'success',
      message: `Entreprise ${created.name} créée. Vous pouvez maintenant lui ajouter un exercice comptable.`,
    });
  };

  // Handle Save Annual Financial Record
  const handleSaveFinancial = (e: React.FormEvent) => {
    e.preventDefault();
    const target = companies.find((c) => c.id === targetCompanyId);
    if (!target) {
      setNotification({
        type: 'error',
        message: 'Veuillez sélectionner une entreprise valide.',
      });
      return;
    }

    const year = Number(newFinancial.fiscalYear);
    if (!year || isNaN(year)) {
      setNotification({
        type: 'error',
        message: 'L’exercice financier doit être une année valide.',
      });
      return;
    }

    const annualRecord: AnnualFinancials = {
      id: `${target.id}-${year}`,
      fiscalYear: year,
      currency: (newFinancial.currency as Currency) || 'MAD',
      unit: (newFinancial.unit as ReportingUnit) || 'MMAD',
      revenue: Number(newFinancial.revenue) || 0,
      netIncome: Number(newFinancial.netIncome) || 0,
      operatingIncome:
        newFinancial.operatingIncome !== undefined && newFinancial.operatingIncome !== null
          ? Number(newFinancial.operatingIncome)
          : undefined,
      totalAssets: Number(newFinancial.totalAssets) || 0,
      equity: Number(newFinancial.equity) || 0,
      financialDebt:
        newFinancial.financialDebt !== null && newFinancial.financialDebt !== undefined
          ? Number(newFinancial.financialDebt)
          : null,
      operatingCashFlow:
        newFinancial.operatingCashFlow !== null && newFinancial.operatingCashFlow !== undefined
          ? Number(newFinancial.operatingCashFlow)
          : null,
      sourceTitle:
        newFinancial.sourceTitle || 'Saisie manuelle via interface fondateur',
      sourceUrl: newFinancial.sourceUrl || '',
      lastReviewedDate:
        newFinancial.lastReviewedDate || new Date().toISOString().split('T')[0],
      notes: newFinancial.notes || '',
    };

    const updatedCompanies = companies.map((c) => {
      if (c.id !== target.id) return c;
      const existingIdx = c.financials.findIndex((f) => f.fiscalYear === year);
      let updatedFinancials = [...c.financials];
      if (existingIdx >= 0) {
        updatedFinancials[existingIdx] = annualRecord;
      } else {
        updatedFinancials.push(annualRecord);
      }
      updatedFinancials.sort((a, b) => a.fiscalYear - b.fiscalYear);
      return {
        ...c,
        financials: updatedFinancials,
      };
    });

    saveCompanies(updatedCompanies);
    onUpdateCompanies(updatedCompanies);
    setIsFinancialModalOpen(false);
    setNotification({
      type: 'success',
      message: `Exercice ${year} enregistré pour ${target.name}.`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {t.management.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{t.management.subtitle}</p>
      </div>

      {/* Storage Architecture Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 space-y-1">
        <div className="flex items-center gap-2 font-semibold text-blue-950">
          <Database className="h-4 w-4 text-blue-700" />
          <span>Architecture de Stockage & Persistance Locale :</span>
        </div>
        <p className="leading-relaxed text-blue-800">
          {t.management.localStorageNotice}
        </p>
      </div>

      {/* Notification Toast Banner if active */}
      {notification && (
        <div
          className={`flex items-center justify-between rounded-lg p-3 text-xs shadow-xs ${
            notification.type === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-900'
              : notification.type === 'error'
              ? 'border border-rose-200 bg-rose-50 text-rose-900'
              : 'border border-slate-200 bg-slate-50 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Create Company Button */}
        <button
          onClick={() => setIsCompanyModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{t.management.addCompany}</span>
        </button>

        {/* Add Financial Year Button */}
        <button
          onClick={() => setIsFinancialModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>{t.management.addFinancialYear}</span>
        </button>

        {/* Export CSV Button */}
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>{t.management.exportCsv}</span>
        </button>

        {/* Import CSV Trigger */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,text/csv"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Upload className="h-3.5 w-3.5 text-slate-500" />
          <span>{t.management.importCsv}</span>
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={handleResetData}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/50 px-3.5 py-2 text-xs font-medium text-rose-800 hover:bg-rose-100/60 transition-colors shadow-xs ml-auto"
        >
          <RotateCcw className="h-3.5 w-3.5 text-rose-600" />
          <span>{t.management.resetDemo}</span>
        </button>
      </div>

      {/* Dataset Summary Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Inventaire des Entités et Exercices en Mémoire
          </h2>
          <p className="text-xs text-slate-500">
            {companies.length} société{companies.length > 1 ? 's' : ''} enregistrée{companies.length > 1 ? 's' : ''} dans le stockage local.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Code</th>
                <th className="py-2.5 px-3 font-semibold">Nom de l’entreprise</th>
                <th className="py-2.5 px-3 font-semibold">Secteur</th>
                <th className="py-2.5 px-3 font-semibold">Statut</th>
                <th className="py-2.5 px-3 font-semibold">Exercices saisis</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companies.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-700">
                    {c.code}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {c.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{c.sector}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-[11px] text-slate-500">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700 tabular-nums">
                    {c.financials.map((f) => f.fiscalYear).join(', ') || 'Aucun'}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => onSelectCompany(c.id)}
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      Consulter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Company */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {t.management.addCompany}
              </h3>
              <button
                onClick={() => setIsCompanyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Nom de l’entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) =>
                      setNewCompany({ ...newCompany, name: e.target.value })
                    }
                    placeholder="Ex: Al Mada Agro (DEMO)"
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Code / Mnémonique *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.code}
                    onChange={(e) =>
                      setNewCompany({ ...newCompany, code: e.target.value })
                    }
                    placeholder="Ex: DEMO-ALMA"
                    className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono uppercase focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Secteur d’activité
                  </label>
                  <select
                    value={newCompany.sector}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        sector: e.target.value as Sector,
                      })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Agroalimentaire & Boissons">Agroalimentaire & Boissons</option>
                    <option value="Transport & Logistique">Transport & Logistique</option>
                    <option value="Bâtiment & Matériaux de Construction">Bâtiment & Matériaux</option>
                    <option value="Énergie & Utilités Renouvelables">Énergie & Utilités</option>
                    <option value="Technologies & Services Informatiques">Technologies & Services</option>
                    <option value="Grande Distribution & Commerce">Grande Distribution & Commerce</option>
                    <option value="Santé & Industrie Pharmaceutique">Santé & Pharmacie</option>
                    <option value="Banque & Services Financiers">Banque & Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Statut documentaire
                  </label>
                  <select
                    value={newCompany.status}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        status: e.target.value as DataStatus,
                      })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="demo">Fictif / Démo</option>
                    <option value="verified">Vérifié (Source Primaire)</option>
                    <option value="incomplete">Incomplet (Didactique)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Siège social
                  </label>
                  <input
                    type="text"
                    value={newCompany.headquarters}
                    onChange={(e) =>
                      setNewCompany({ ...newCompany, headquarters: e.target.value })
                    }
                    placeholder="Casablanca, Maroc"
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Année de création
                  </label>
                  <input
                    type="number"
                    value={newCompany.foundingYear}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        foundingYear: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Description succincte
                </label>
                <textarea
                  rows={2}
                  value={newCompany.description}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, description: e.target.value })
                  }
                  placeholder="Présentation des activités principales..."
                  className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCompanyModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-4 py-1.5 font-semibold text-white hover:bg-slate-800"
                >
                  Créer l’entreprise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Financial Year */}
      {isFinancialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {t.management.addFinancialYear}
              </h3>
              <button
                onClick={() => setIsFinancialModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFinancial} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Entreprise cible *
                  </label>
                  <select
                    value={targetCompanyId}
                    onChange={(e) => setTargetCompanyId(e.target.value)}
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Exercice (Année) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newFinancial.fiscalYear}
                    onChange={(e) =>
                      setNewFinancial({
                        ...newFinancial,
                        fiscalYear: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Devise
                  </label>
                  <select
                    value={newFinancial.currency}
                    onChange={(e) =>
                      setNewFinancial({
                        ...newFinancial,
                        currency: e.target.value as Currency,
                      })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="MAD">MAD (Dirham Marocain)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="USD">USD (Dollar US)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Unité d’échelle
                  </label>
                  <select
                    value={newFinancial.unit}
                    onChange={(e) =>
                      setNewFinancial({
                        ...newFinancial,
                        unit: e.target.value as ReportingUnit,
                      })
                    }
                    className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="MMAD">MMAD (Millions)</option>
                    <option value="kMAD">kMAD (Milliers)</option>
                    <option value="MAD">Unité simple</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="font-semibold text-slate-800 block mb-2">
                  Grandes Masses Comptables (exprimées en {newFinancial.unit})
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Chiffre d’affaires (CA) *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newFinancial.revenue}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          revenue: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Résultat net *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newFinancial.netIncome}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          netIncome: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Total Actif (Bilan) *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newFinancial.totalAssets}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          totalAssets: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Capitaux Propres *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newFinancial.equity}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          equity: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Dettes Financières (Optionnel)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={newFinancial.financialDebt ?? ''}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          financialDebt: e.target.value === '' ? null : Number(e.target.value),
                        })
                      }
                      placeholder="Laisser vide si non disponible"
                      className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Flux Trésorerie Exploitation
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={newFinancial.operatingCashFlow ?? ''}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          operatingCashFlow: e.target.value === '' ? null : Number(e.target.value),
                        })
                      }
                      placeholder="Laisser vide si non disponible"
                      className="w-full rounded-md border border-slate-300 p-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="font-semibold text-slate-800 block mb-2">
                  Métadonnées de Provenance & Traçabilité
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Intitulé de la source
                    </label>
                    <input
                      type="text"
                      value={newFinancial.sourceTitle}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          sourceTitle: e.target.value,
                        })
                      }
                      placeholder="Ex: Document de Référence AMMC 2024"
                      className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      URL de la source officielle
                    </label>
                    <input
                      type="url"
                      value={newFinancial.sourceUrl}
                      onChange={(e) =>
                        setNewFinancial({
                          ...newFinancial,
                          sourceUrl: e.target.value,
                        })
                      }
                      placeholder="https://... (vide si démo)"
                      className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFinancialModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 font-semibold text-white hover:bg-emerald-700"
                >
                  Enregistrer l’exercice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
