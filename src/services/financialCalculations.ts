/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnnualFinancials, CalculatedRatios, Company } from '../types/finance';

/**
 * Calculates core financial ratios for a given fiscal year of a company.
 * Follows strict financial accounting rules:
 * - Never divides by zero
 * - Handles negative equity (invalidates ROE or flags distortion)
 * - Returns null when inputs are missing rather than fabricating numbers
 */
export function calculateFinancialRatios(
  company: Company,
  targetYear: number
): CalculatedRatios {
  const current = company.financials.find((f) => f.fiscalYear === targetYear);
  const prior = company.financials.find((f) => f.fiscalYear === targetYear - 1);

  const notes: string[] = [];

  if (!current) {
    return {
      revenueGrowth: null,
      netProfitMargin: null,
      returnOnEquity: null,
      debtToEquity: null,
      assetTurnover: null,
      isComparableWithPriorYear: false,
      notes: ['Aucune donnée financière enregistrée pour cet exercice.'],
    };
  }

  // 1. Revenue Growth Rate: (current - prior) / prior * 100
  let revenueGrowth: number | null = null;
  let isComparableWithPriorYear = false;

  if (prior && prior.revenue > 0) {
    if (prior.currency === current.currency && prior.unit === current.unit) {
      revenueGrowth = ((current.revenue / prior.revenue) - 1) * 100;
      isComparableWithPriorYear = true;
    } else {
      notes.push(
        `Croissance non calculable : changement d'unité ou de devise entre ${prior.fiscalYear} (${prior.currency}) et ${current.fiscalYear} (${current.currency}).`
      );
    }
  } else if (prior && prior.revenue <= 0) {
    notes.push(
      `Croissance non calculable : chiffre d'affaires de l'exercice précédent nul ou négatif.`
    );
  }

  // 2. Net Profit Margin: (netIncome / revenue) * 100
  let netProfitMargin: number | null = null;
  if (current.revenue > 0) {
    netProfitMargin = (current.netIncome / current.revenue) * 100;
  } else {
    notes.push(`Marge nette non calculable : chiffre d'affaires nul ou négatif.`);
  }

  // 3. Return on Equity (ROE): (netIncome / equity) * 100
  // Limitation: End-of-period equity is used here as a simplified standard convention.
  // When equity is negative (détresse financière), ROE mathematically produces an inverse or misleading sign.
  let returnOnEquity: number | null = null;
  if (current.equity > 0) {
    returnOnEquity = (current.netIncome / current.equity) * 100;
  } else if (current.equity === 0) {
    notes.push(`Rentabilité des fonds propres non calculable : capitaux propres nuls.`);
  } else {
    notes.push(
      `Attention : Les capitaux propres sont négatifs (${current.equity} ${current.unit}). Le calcul du ROE est suspendu pour éviter une interprétation mathématique erronée.`
    );
  }

  // 4. Debt-to-Equity (Gearing financier): financialDebt / equity
  let debtToEquity: number | null = null;
  if (current.financialDebt !== null && current.financialDebt !== undefined) {
    if (current.equity > 0) {
      debtToEquity = current.financialDebt / current.equity;
    } else {
      notes.push(
        `Ratio d'endettement non calculable : capitaux propres nuls ou négatifs.`
      );
    }
  } else {
    notes.push(`Dettes financières non renseignées pour cet exercice.`);
  }

  // 5. Asset Turnover: revenue / totalAssets
  let assetTurnover: number | null = null;
  if (current.totalAssets > 0) {
    assetTurnover = current.revenue / current.totalAssets;
  }

  return {
    revenueGrowth,
    netProfitMargin,
    returnOnEquity,
    debtToEquity,
    assetTurnover,
    isComparableWithPriorYear,
    notes,
  };
}

/**
 * Formats monetary amounts with designated unit and currency
 */
export function formatAmount(
  val: number | null | undefined,
  unit: string = 'MMAD',
  fallback: string = 'Non disponible'
): string {
  if (val === null || val === undefined || isNaN(val)) return fallback;
  return `${val.toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })} ${unit}`;
}

/**
 * Formats percentage with sign and symbol
 */
export function formatPercent(
  val: number | null | undefined,
  fallback: string = 'Non disponible',
  includePlus: boolean = false
): string {
  if (val === null || val === undefined || isNaN(val)) return fallback;
  const prefix = includePlus && val > 0 ? '+' : '';
  return `${prefix}${val.toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })} %`;
}

/**
 * Formats financial multiplier ratio (e.g. 0.85x)
 */
export function formatRatio(
  val: number | null | undefined,
  fallback: string = 'Non disponible'
): string {
  if (val === null || val === undefined || isNaN(val)) return fallback;
  return `${val.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}x`;
}

/**
 * Checks comparability between two company financial records.
 * Returns warnings if periods, units, or currencies do not match.
 */
export function checkFinancialComparability(
  records: { companyName: string; financials: AnnualFinancials }[]
): { isStrictlyComparable: boolean; warnings: string[] } {
  const warnings: string[] = [];

  if (records.length <= 1) {
    return { isStrictlyComparable: true, warnings };
  }

  const first = records[0].financials;
  for (let i = 1; i < records.length; i++) {
    const cur = records[i].financials;
    if (cur.fiscalYear !== first.fiscalYear) {
      warnings.push(
        `Exercices différents : ${records[0].companyName} (${first.fiscalYear}) contre ${records[i].companyName} (${cur.fiscalYear}). Les contextes macroéconomiques diffèrent.`
      );
    }
    if (cur.currency !== first.currency) {
      warnings.push(
        `Devises distinctes : ${records[0].companyName} en ${first.currency} vs ${records[i].companyName} en ${cur.currency}. Aucun taux de change n'est appliqué implicitement.`
      );
    }
    if (cur.unit !== first.unit) {
      warnings.push(
        `Unités d'échelle différentes : ${records[0].companyName} (${first.unit}) vs ${records[i].companyName} (${cur.unit}).`
      );
    }
  }

  return {
    isStrictlyComparable: warnings.length === 0,
    warnings,
  };
}
