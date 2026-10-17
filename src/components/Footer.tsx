/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, BookOpen, Database } from 'lucide-react';

interface FooterProps {
  locale: SupportedLocale;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ locale, onNavigate }) => {
  const t = TRANSLATIONS[locale];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <span className="text-base font-bold text-slate-900">RapportIQ</span>
            <p className="text-xs leading-relaxed text-slate-600">
              {locale === 'ar'
                ? 'منصة بيداغوجية لتحليل القوائم المالية، تتبع مصادر التقارير وحساب المؤشرات الاقتصادية وفق معايير شفافة.'
                : 'Plateforme pédagogique d’analyse des états financiers, traçabilité des sources officielles et calcul normé des ratios économiques.'}
            </p>
          </div>

          {/* Quick Analytical Links */}
          <div className="space-y-2 text-xs">
            <span className="font-semibold text-slate-900">
              {locale === 'ar' ? 'الموارد المنهجية' : 'Ressources & Référentiels'}
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.nav.methodology}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('data-management')}
                  className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                >
                  <Database className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.nav.dataManagement}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.nav.compare}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory & Educational Disclaimer */}
          <div className="space-y-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">
              {locale === 'ar' ? 'إخلاء المسؤولية القانوني' : 'Avertissement Légal'}
            </span>
            <p className="leading-relaxed text-[11px] text-slate-500">
              {t.disclaimerFull}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} RapportIQ · {locale === 'ar' ? 'نموذج أولي مفتوح' : 'MVP Démonstration Académique'}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Version 1.0 (Architecture Évolutive)</span>
            <span aria-hidden="true">·</span>
            <span>Focus : Entreprises Marocaines (PCGM & IFRS)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
