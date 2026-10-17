/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';

interface DemoBannerProps {
  locale: SupportedLocale;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ locale }) => {
  const t = TRANSLATIONS[locale];

  return (
    <div
      role="alert"
      className="border-b border-amber-200 bg-amber-50/90 text-amber-900 transition-colors"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span className="font-semibold tracking-wide">
            {locale === 'ar' ? 'بيانات تجريبية غير حقيقية' : 'DEMO DATA — NOT REAL COMPANY FIGURES'} :
          </span>
          <span className="hidden sm:inline text-amber-800">
            {t.demoNoticeBanner}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Info className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
          <span className="text-[11px] text-amber-800">
            {locale === 'ar' ? 'محتوى تعليمي فقط' : 'Usage pédagogique'}
          </span>
        </div>
      </div>
    </div>
  );
};
