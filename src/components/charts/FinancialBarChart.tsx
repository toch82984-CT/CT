/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnualFinancials } from '../../types/finance';

interface FinancialBarChartProps {
  data: AnnualFinancials[];
  unit?: string;
  currency?: string;
}

export const FinancialBarChart: React.FC<FinancialBarChartProps> = ({
  data,
  unit = 'MMAD',
  currency = 'MAD',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
        Aucune donnée financière disponible pour afficher l’historique.
      </div>
    );
  }

  // Sort chronologically
  const sorted = [...data].sort((a, b) => a.fiscalYear - b.fiscalYear);

  // Compute maximum value for scaling
  const maxRev = Math.max(...sorted.map((d) => d.revenue || 0));
  const maxNet = Math.max(...sorted.map((d) => Math.abs(d.netIncome || 0)));
  const maxVal = Math.max(maxRev, maxNet, 10);
  const ceiling = Math.ceil(maxVal * 1.15);

  const chartHeight = 220;
  const paddingBottom = 32;
  const paddingTop = 20;
  const usableHeight = chartHeight - paddingBottom - paddingTop;

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-xs bg-slate-800"></span>
            <span className="font-medium text-slate-700">Chiffre d’affaires</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-xs bg-emerald-600"></span>
            <span className="font-medium text-slate-700">Résultat net</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-xs bg-blue-500/40"></span>
            <span className="font-medium text-slate-700">Flux d’exploitation</span>
          </div>
        </div>
        <span className="font-mono text-slate-500">Échelle : {unit} ({currency})</span>
      </div>

      <div className="relative overflow-x-auto">
        <div className="min-w-[440px]">
          <svg
            className="w-full overflow-visible"
            height={chartHeight}
            viewBox={`0 0 ${sorted.length * 110 + 60} ${chartHeight}`}
          >
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingTop + usableHeight * (1 - ratio);
              const val = Math.round(ceiling * ratio);
              return (
                <g key={i}>
                  <line
                    x1="45"
                    y1={y}
                    x2={sorted.length * 110 + 40}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray={ratio === 0 ? 'none' : '3 3'}
                  />
                  <text
                    x="40"
                    y={y + 3}
                    textAnchor="end"
                    className="fill-slate-400 font-mono text-[10px] tabular-nums"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Bars for each fiscal year */}
            {sorted.map((item, index) => {
              const groupX = 60 + index * 110;
              const barWidth = 20;

              const revHeight = (item.revenue / ceiling) * usableHeight;
              const netHeight = (Math.max(0, item.netIncome) / ceiling) * usableHeight;
              const ocfHeight =
                item.operatingCashFlow !== null
                  ? (Math.max(0, item.operatingCashFlow) / ceiling) * usableHeight
                  : 0;

              const revY = paddingTop + (usableHeight - revHeight);
              const netY = paddingTop + (usableHeight - netHeight);
              const ocfY = paddingTop + (usableHeight - ocfHeight);

              const isHovered = hoveredIndex === index;

              return (
                <g
                  key={item.fiscalYear}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Subtle column highlight background */}
                  {isHovered && (
                    <rect
                      x={groupX - 10}
                      y={paddingTop}
                      width={80}
                      height={usableHeight}
                      fill="#F1F5F9"
                      rx="4"
                    />
                  )}

                  {/* Revenue Bar */}
                  <rect
                    x={groupX}
                    y={revY}
                    width={barWidth}
                    height={revHeight}
                    fill="#1E293B"
                    rx="2"
                    className="transition-all hover:fill-slate-900"
                  />

                  {/* Net Income Bar */}
                  <rect
                    x={groupX + barWidth + 4}
                    y={netY}
                    width={barWidth}
                    height={netHeight}
                    fill="#059669"
                    rx="2"
                    className="transition-all hover:fill-emerald-700"
                  />

                  {/* Operating Cash Flow Bar */}
                  {item.operatingCashFlow !== null && (
                    <rect
                      x={groupX + (barWidth + 4) * 2}
                      y={ocfY}
                      width={barWidth}
                      height={ocfHeight}
                      fill="#60A5FA"
                      fillOpacity="0.75"
                      rx="2"
                      className="transition-all hover:fill-blue-500"
                    />
                  )}

                  {/* Year Label */}
                  <text
                    x={groupX + 32}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    className={`font-mono text-xs tabular-nums ${
                      isHovered ? 'fill-slate-900 font-semibold' : 'fill-slate-600'
                    }`}
                  >
                    {item.fiscalYear}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Tooltip summary panel below chart when year hovered or selected */}
      {hoveredIndex !== null && sorted[hoveredIndex] && (
        <div className="mt-3 flex flex-wrap items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-xs">
          <div className="font-semibold text-slate-800">
            Détail de l’exercice {sorted[hoveredIndex].fiscalYear}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-slate-600">
              CA :{' '}
              <strong className="font-mono text-slate-900 tabular-nums">
                {sorted[hoveredIndex].revenue} {unit}
              </strong>
            </span>
            <span className="text-slate-600">
              Résultat net :{' '}
              <strong className="font-mono text-emerald-700 tabular-nums">
                {sorted[hoveredIndex].netIncome} {unit}
              </strong>
            </span>
            <span className="text-slate-600">
              Flux d’exploitation :{' '}
              <strong className="font-mono text-blue-700 tabular-nums">
                {sorted[hoveredIndex].operatingCashFlow !== null
                  ? `${sorted[hoveredIndex].operatingCashFlow} ${unit}`
                  : 'Non disponible'}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
