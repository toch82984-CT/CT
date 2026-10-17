/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { INITIAL_DEMO_COMPANIES } from '../data/initialDemoData';
import { AnnualFinancials, Company, DataStatus, Sector } from '../types/finance';

const STORAGE_KEY = 'rapportiq_companies_v1';

/**
 * Retrieves the current company records from localStorage, falling back to initial demo data.
 */
export function getStoredCompanies(): Company[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_COMPANIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPANIES));
      return INITIAL_DEMO_COMPANIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_DEMO_COMPANIES;
  } catch (err) {
    console.warn('Erreur lecture localStorage, utilisation du jeu par défaut:', err);
    return INITIAL_DEMO_COMPANIES;
  }
}

/**
 * Persists the companies array to localStorage.
 */
export function saveCompanies(companies: Company[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  } catch (err) {
    console.error('Erreur écriture localStorage:', err);
  }
}

/**
 * Resets local storage to the original pristine demo dataset.
 */
export function resetToDemoData(): Company[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPANIES));
  }
  return INITIAL_DEMO_COMPANIES;
}

/**
 * Generates a clean CSV string of all company financial records.
 */
export function exportCompaniesToCSV(companies: Company[]): string {
  const headers = [
    'code',
    'name',
    'sector',
    'legalForm',
    'headquarters',
    'foundingYear',
    'status',
    'fiscalYear',
    'currency',
    'unit',
    'revenue',
    'netIncome',
    'operatingIncome',
    'totalAssets',
    'equity',
    'financialDebt',
    'cashAndEquivalents',
    'operatingCashFlow',
    'sourceTitle',
    'sourceUrl',
    'lastReviewedDate',
    'notes',
  ];

  const escapeCSV = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows: string[] = [headers.join(',')];

  for (const comp of companies) {
    if (!comp.financials || comp.financials.length === 0) {
      rows.push(
        [
          escapeCSV(comp.code),
          escapeCSV(comp.name),
          escapeCSV(comp.sector),
          escapeCSV(comp.legalForm),
          escapeCSV(comp.headquarters),
          escapeCSV(comp.foundingYear),
          escapeCSV(comp.status),
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          escapeCSV(comp.description),
        ].join(',')
      );
    } else {
      for (const fin of comp.financials) {
        rows.push(
          [
            escapeCSV(comp.code),
            escapeCSV(comp.name),
            escapeCSV(comp.sector),
            escapeCSV(comp.legalForm),
            escapeCSV(comp.headquarters),
            escapeCSV(comp.foundingYear),
            escapeCSV(comp.status),
            escapeCSV(fin.fiscalYear),
            escapeCSV(fin.currency),
            escapeCSV(fin.unit),
            escapeCSV(fin.revenue),
            escapeCSV(fin.netIncome),
            escapeCSV(fin.operatingIncome ?? ''),
            escapeCSV(fin.totalAssets),
            escapeCSV(fin.equity),
            escapeCSV(fin.financialDebt ?? ''),
            escapeCSV(fin.cashAndEquivalents ?? ''),
            escapeCSV(fin.operatingCashFlow ?? ''),
            escapeCSV(fin.sourceTitle),
            escapeCSV(fin.sourceUrl),
            escapeCSV(fin.lastReviewedDate),
            escapeCSV(fin.notes ?? comp.description),
          ].join(',')
        );
      }
    }
  }

  return rows.join('\n');
}

/**
 * Parses CSV text and updates the local storage dataset.
 * Supports standard comma-separated and semicolon-separated CSV with quotes.
 */
export function importCompaniesFromCSV(csvText: string): {
  success: boolean;
  importedCount: number;
  error?: string;
  companies?: Company[];
} {
  try {
    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      return { success: false, importedCount: 0, error: 'Fichier CSV vide ou incomplet.' };
    }

    // Determine delimiter (comma or semicolon)
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') ? ';' : ',';

    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let cur = '';
      let insideQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (insideQuotes && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            insideQuotes = !insideQuotes;
          }
        } else if (char === delimiter && !insideQuotes) {
          result.push(cur.trim());
          cur = '';
        } else {
          cur += char;
        }
      }
      result.push(cur.trim());
      return result;
    };

    const headers = parseLine(headerLine).map((h) => h.toLowerCase().replace(/['"]/g, ''));
    const companyMap = new Map<string, Company>();

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      if (values.length < 2) continue;

      const getVal = (colName: string): string => {
        const idx = headers.indexOf(colName.toLowerCase());
        return idx >= 0 && idx < values.length ? values[idx] : '';
      };

      const code = getVal('code') || `ENT-${i}`;
      const name = getVal('name') || `Entreprise ${code}`;
      const sector = (getVal('sector') as Sector) || 'Agroalimentaire & Boissons';
      const legalForm = getVal('legalform') || 'Société Anonyme';
      const headquarters = getVal('headquarters') || 'Casablanca, Maroc';
      const foundingYear = parseInt(getVal('foundingyear'), 10) || 2015;
      const status = (getVal('status') as DataStatus) || 'demo';
      const description = getVal('notes') || `${name} - Dossier financier importé.`;

      let comp = companyMap.get(code);
      if (!comp) {
        comp = {
          id: `company-${code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          code,
          name,
          sector,
          legalForm,
          headquarters,
          foundingYear,
          status,
          description,
          financials: [],
        };
        companyMap.set(code, comp);
      }

      const fiscalYearStr = getVal('fiscalyear');
      if (fiscalYearStr) {
        const fiscalYear = parseInt(fiscalYearStr, 10);
        if (!isNaN(fiscalYear)) {
          const revenue = parseFloat(getVal('revenue')) || 0;
          const netIncome = parseFloat(getVal('netincome')) || 0;
          const totalAssets = parseFloat(getVal('totalassets')) || 0;
          const equity = parseFloat(getVal('equity')) || 0;
          const financialDebtStr = getVal('financialdebt');
          const financialDebt = financialDebtStr ? parseFloat(financialDebtStr) : null;
          const operatingCashFlowStr = getVal('operatingcashflow');
          const operatingCashFlow = operatingCashFlowStr ? parseFloat(operatingCashFlowStr) : null;
          const operatingIncomeStr = getVal('operatingincome');
          const operatingIncome = operatingIncomeStr ? parseFloat(operatingIncomeStr) : undefined;
          const cashStr = getVal('cashandequivalents');
          const cashAndEquivalents = cashStr ? parseFloat(cashStr) : null;

          const fin: AnnualFinancials = {
            id: `${comp.id}-${fiscalYear}`,
            fiscalYear,
            currency: (getVal('currency') as any) || 'MAD',
            unit: (getVal('unit') as any) || 'MMAD',
            revenue,
            netIncome,
            operatingIncome: isNaN(operatingIncome as number) ? undefined : operatingIncome,
            totalAssets,
            equity,
            financialDebt: financialDebt !== null && !isNaN(financialDebt) ? financialDebt : null,
            cashAndEquivalents: cashAndEquivalents !== null && !isNaN(cashAndEquivalents) ? cashAndEquivalents : null,
            operatingCashFlow: operatingCashFlow !== null && !isNaN(operatingCashFlow) ? operatingCashFlow : null,
            sourceTitle: getVal('sourcetitle') || 'Source importée manuellement',
            sourceUrl: getVal('sourceurl') || '',
            lastReviewedDate: getVal('lastrevieweddate') || new Date().toISOString().split('T')[0],
            notes: getVal('notes') || '',
          };

          // Overwrite or append
          const existingIdx = comp.financials.findIndex((f) => f.fiscalYear === fiscalYear);
          if (existingIdx >= 0) {
            comp.financials[existingIdx] = fin;
          } else {
            comp.financials.push(fin);
          }
          comp.financials.sort((a, b) => a.fiscalYear - b.fiscalYear);
        }
      }
    }

    const companyList = Array.from(companyMap.values());
    if (companyList.length === 0) {
      return { success: false, importedCount: 0, error: 'Aucune donnée valide trouvée dans le CSV.' };
    }

    saveCompanies(companyList);
    return { success: true, importedCount: companyList.length, companies: companyList };
  } catch (err: any) {
    return {
      success: false,
      importedCount: 0,
      error: `Erreur lors du traitement du CSV : ${err.message || 'Format invalide'}`,
    };
  }
}
