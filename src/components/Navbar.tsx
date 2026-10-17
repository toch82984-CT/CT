/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Globe, TrendingUp } from 'lucide-react';
import { SupportedLocale } from '../types/finance';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, companyId?: string) => void;
  locale: SupportedLocale;
  onLocaleChange: (loc: SupportedLocale) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  locale,
  onLocaleChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[locale];

  const navItems = [
    { key: 'dashboard', label: t.nav.dashboard },
    { key: 'directory', label: t.nav.directory },
    { key: 'compare', label: t.nav.compare },
    { key: 'methodology', label: t.nav.methodology },
    { key: 'data-management', label: t.nav.dataManagement },
  ];

  const handleNavClick = (key: string) => {
    onNavigate(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2.5 text-left text-xl font-bold tracking-tight text-slate-900 transition-colors hover:text-emerald-700 whitespace-nowrap shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-emerald-400">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span>RapportIQ</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                  isActive
                    ? 'font-semibold text-slate-900 border-b-2 border-emerald-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + Language Switch */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switch */}
          <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <button
              onClick={() => onLocaleChange('fr')}
              className={`rounded px-2 py-1 font-medium transition-colors ${
                locale === 'fr'
                  ? 'bg-white font-semibold text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => onLocaleChange('ar')}
              className={`rounded px-2 py-1 font-medium transition-colors ${
                locale === 'ar'
                  ? 'bg-white font-semibold text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="العربية"
            >
              عربي
            </button>
          </div>

          {/* Primary Action Button */}
          {currentTab === 'landing' ? (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 whitespace-nowrap shrink-0"
            >
              {t.nav.exploreDemo}
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('landing')}
              className="hidden sm:inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              {t.nav.landing}
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('landing')}
              className={`text-start py-2 text-sm font-medium ${
                currentTab === 'landing' ? 'text-emerald-700 font-semibold' : 'text-slate-700'
              }`}
            >
              {t.nav.landing}
            </button>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-start py-2 text-sm font-medium ${
                  currentTab === item.key ? 'text-emerald-700 font-semibold' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
