/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DataStatus = 'demo' | 'verified' | 'incomplete';

export type Currency = 'MAD' | 'EUR' | 'USD';

export type ReportingUnit = 'MMAD' | 'kMAD' | 'MAD' | 'MEUR' | 'MUSD';

export type Sector =
  | 'Agroalimentaire & Boissons'
  | 'Transport & Logistique'
  | 'Bâtiment & Matériaux de Construction'
  | 'Énergie & Utilités Renouvelables'
  | 'Technologies & Services Informatiques'
  | 'Grande Distribution & Commerce'
  | 'Santé & Industrie Pharmaceutique'
  | 'Banque & Services Financiers';

export interface AnnualFinancials {
  id: string;
  fiscalYear: number;
  currency: Currency;
  unit: ReportingUnit;
  // Income Statement (Compte de Résultat)
  revenue: number; // Chiffre d'affaires
  netIncome: number; // Résultat net de l'exercice
  operatingIncome?: number; // Résultat d'exploitation (EBIT)
  // Balance Sheet (Bilan)
  totalAssets: number; // Total de l'actif
  equity: number; // Capitaux propres (part du groupe ou total)
  financialDebt: number | null; // Dettes de financement / Dettes financières
  cashAndEquivalents?: number | null; // Trésorerie active
  // Cash Flow (Tableau des flux de trésorerie)
  operatingCashFlow: number | null; // Flux net de trésorerie généré par l'activité
  // Source & Traceability Metadata
  sourceTitle: string; // e.g. "Rapport financier annuel 2023 - Synthèse Fictive"
  sourceUrl: string; // Empty for demo data or direct link to AMMC/BVC official filing
  lastReviewedDate: string; // ISO date string: YYYY-MM-DD
  notes?: string;
}

export interface Company {
  id: string;
  code: string; // e.g., "DEMO-AGRO"
  name: string;
  legalForm: string; // e.g., "SA", "SARL", "Société Anonyme à Conseil d'Administration"
  sector: Sector;
  headquarters: string; // e.g., "Casablanca, Maroc"
  foundingYear: number;
  description: string;
  status: DataStatus;
  financials: AnnualFinancials[];
}

export interface CalculatedRatios {
  revenueGrowth: number | null; // % (current / prior - 1) * 100
  netProfitMargin: number | null; // % (netIncome / revenue) * 100
  returnOnEquity: number | null; // % (netIncome / equity) * 100
  debtToEquity: number | null; // Ratio (financialDebt / equity)
  assetTurnover: number | null; // Ratio (revenue / totalAssets)
  isComparableWithPriorYear: boolean;
  notes: string[];
}

export type SupportedLocale = 'fr' | 'ar';
