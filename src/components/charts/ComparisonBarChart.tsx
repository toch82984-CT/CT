/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface CompanyMetricItem {
  companyName: string;
  code: string;
  revenue: number;
  netIncome: number;
  netProfitMargin: number | null;
  roe: number | null;
  debtToEquity: number | null;
  unit: string;
  currency: string;
}

interface ComparisonBarChartProps {
  items: CompanyMetricItem[];
  metricKey: 'revenue' | 'netIncome' | 'netProfitMargin' | 'roe' | 'debtToEquity';
  metricLabel: string;
}

export const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({
  items,
  metricKey,
  metricLabel,
}) => {
  if (items.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
        Sélectionnez au moins une entreprise pour générer la comparaison graphique.
      </div>
    );
  }

  const isPercentage = metricKey === 'netProfitMargin' || metricKey === 'roe';
  const isRatio = metricKey === 'debtToEquity';

  const values = items.map((item) => {
    const val = item[metricKey];
    return val !== null && !isNaN(val) ? val : 0;
  });

  const maxVal = Math.max(...values, 1);
  const ceiling = Math.max(maxVal * 1.2, 5);

  const colors = ['#0F172A', '#059669', '#2563EB'];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">{metricLabel}</span>
        <span className="font-mono">
          {isPercentage ? 'Pourcentage (%)' : isRatio ? 'Ratio (x)' : 'Montant (MMAD)'}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const rawVal = item[metricKey];
          const hasValue = rawVal !== null && !isNaN(rawVal);
          const percentWidth = hasValue ? Math.min(100, Math.max(4, (rawVal / ceiling) * 100)) : 0;
          const barColor = colors[idx % colors.length];

          return (
            <div key={item.code} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">
                  {item.companyName}{' '}
                  <span className="font-mono text-slate-400">({item.code})</span>
                </span>
                <span className="font-mono font-semibold tabular-nums text-slate-900">
                  {hasValue
                    ? isPercentage
                      ? `${rawVal.toFixed(1)} %`
                      : isRatio
                      ? `${rawVal.toFixed(2)}x`
                      : `${rawVal.toLocaleString('fr-FR', { minimumFractionDigits: 1 })} ${item.unit}`
                    : 'Non disponible'}
                </span>
              </div>
              <div className="h-6 w-full overflow-hidden rounded-md bg-slate-100 p-0.5">
                {hasValue ? (
                  <div
                    className="h-full rounded-sm transition-all duration-300"
                    style={{
                      width: `${percentWidth}%`,
                      backgroundColor: barColor,
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center px-2 text-[11px] text-slate-400 italic">
                    Donnée non disponible pour cet indicateur
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
