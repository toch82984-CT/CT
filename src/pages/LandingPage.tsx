/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  TrendingUp,
  FileCheck,
  Scale,
  Database,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';

interface LandingPageProps {
  locale: SupportedLocale;
  onExploreDemo: () => void;
  onViewMethodology: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  locale,
  onExploreDemo,
  onViewMethodology,
}) => {
  const t = TRANSLATIONS[locale];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Subtle category kicker (anti-slop: clean text, no capsule pill) */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {locale === 'ar'
                ? 'المنصة البيداغوجية للتحليل المالي'
                : 'Plateforme Pédagogique d’Analyse Financière'}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
              {t.landing.heroTitle}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              {t.landing.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
              >
                <span>{t.landing.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onViewMethodology}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <span>{t.landing.ctaSecondary}</span>
              </button>
            </div>

            {/* Transparent Disclaimer Callout */}
            <div className="mt-8 mx-auto max-w-xl rounded-lg border border-slate-800 bg-slate-800/40 p-3 text-xs text-slate-400">
              <div className="flex items-start justify-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                <span className="text-start">{t.disclaimerShort}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Split */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Problem Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold uppercase tracking-wider">
              <AlertCircle className="h-4 w-4" />
              <span>{locale === 'ar' ? 'المعضلة الراهنة' : 'Le Constat'}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{t.landing.problemTitle}</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {t.landing.problemDesc}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                <span>Rapports annuels PDF de 300+ pages difficiles à compulser</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                <span>Risque élevé d’erreurs lors des recalculs manuels de ratios</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                <span>Absence de traçabilité claire entre le ratio et sa ligne de bilan d'origine</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4" />
              <span>{locale === 'ar' ? 'حل RapportIQ' : 'La Solution RapportIQ'}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{t.landing.solutionTitle}</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {t.landing.solutionDesc}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                <span>Données normalisées en Millions de Dirhams (MMAD)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                <span>Formules de calcul explicites et pédagogiques, sans effet boîte noire</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                <span>Vérification systématique de la cohérence temporelle des exercices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Main Capabilities Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t.landing.capabilitiesTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            {t.landing.capabilitiesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cap 1 */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{t.landing.cap1Title}</h3>
            <p className="text-xs leading-relaxed text-slate-600">{t.landing.cap1Desc}</p>
          </div>

          {/* Cap 2 */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-blue-700">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{t.landing.cap2Title}</h3>
            <p className="text-xs leading-relaxed text-slate-600">{t.landing.cap2Desc}</p>
          </div>

          {/* Cap 3 */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-amber-700">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{t.landing.cap3Title}</h3>
            <p className="text-xs leading-relaxed text-slate-600">{t.landing.cap3Desc}</p>
          </div>

          {/* Cap 4 */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-purple-700">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{t.landing.cap4Title}</h3>
            <p className="text-xs leading-relaxed text-slate-600">{t.landing.cap4Desc}</p>
          </div>
        </div>
      </section>

      {/* Interactive Pedagogical Mechanism Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {locale === 'ar' ? 'شفافية الرياضيات المالية' : 'Exemple d’Ingénierie Financière'}
              </div>
              <h3 className="text-2xl font-bold">
                {locale === 'ar' ? 'من القائمة المالية إلى المؤشر المشتق' : 'De l’état comptable au ratio calculé'}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Chaque ratio affiché par RapportIQ dérive d’une opération vérifiable. Par exemple,
                la <strong>marge nette</strong> relie directement le Résultat Net au Chiffre
                d’affaires de la même entité et du même exercice :
              </p>
              <div className="rounded-md border border-slate-700 bg-slate-800 p-4 font-mono text-xs text-emerald-300 space-y-2">
                <div>Marge Nette (%) = (Résultat Net / Chiffre d'Affaires) × 100</div>
                <div className="text-slate-400 text-[11px]">
                  Exemple Atlas Agro 2024 : (46.8 MMAD / 585.4 MMAD) × 100 ={' '}
                  <span className="text-white font-bold">7.99 %</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-lg border border-slate-800 bg-slate-800/80 p-6 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-slate-700 pb-2">
                <span className="font-semibold text-slate-200">
                  {locale === 'ar' ? 'نموذج بطاقة تدقيق' : 'Aperçu d’un état vérifiable'}
                </span>
                <span className="font-mono text-amber-400 text-[11px]">DEMO-AGRO · 2024</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Chiffre d’affaires</span>
                  <span className="font-mono font-semibold tabular-nums text-slate-100">
                    585.4 MMAD
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Résultat net consolidé</span>
                  <span className="font-mono font-semibold tabular-nums text-emerald-400">
                    46.8 MMAD
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Capitaux propres</span>
                  <span className="font-mono font-semibold tabular-nums text-slate-100">
                    338.0 MMAD
                  </span>
                </div>
                <div className="flex justify-between py-1 pt-2">
                  <span className="text-emerald-400 font-medium">Rentabilité des capitaux (ROE)</span>
                  <span className="font-mono font-bold tabular-nums text-emerald-400">
                    13.8 %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moroccan Ecosystem Anchor */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-slate-900">
              {t.landing.pedagogySectionTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {t.landing.pedagogySectionDesc}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span>Normes : PCGM & IFRS</span>
              <span aria-hidden="true">·</span>
              <span>Devise standard : Dirham Marocain (MAD)</span>
              <span aria-hidden="true">·</span>
              <span>Échelle de référence : Millions de Dirhams (MMAD)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-10 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'ar' ? 'جاهز لاستكشاف البيانات؟' : 'Prêt à explorer les entreprises simulées ?'}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {locale === 'ar'
              ? 'تصفح مؤشرات الأداء، قارن بين الشركات واختبر آليات الحساب المالي بدون أي اشتراك.'
              : 'Consultez les métriques, comparez les entreprises et éprouvez les règles de calcul sans aucun abonnement requis.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onExploreDemo}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
            >
              <span>{t.landing.ctaPrimary}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
