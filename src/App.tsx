/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Company, SupportedLocale } from './types/finance';
import { getStoredCompanies } from './services/storageService';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { DataManagementPage } from './pages/DataManagementPage';

export default function App() {
  const [companies, setCompanies] = useState<Company[]>(() => getStoredCompanies());
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [comparisonCompanyIds, setComparisonCompanyIds] = useState<string[]>([]);
  const [locale, setLocale] = useState<SupportedLocale>('fr');

  // Synchronize document dir and lang for proper Arabic RTL support
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  // Navigation router
  const handleNavigate = (tab: string, companyId?: string) => {
    if (tab === 'detail' && companyId) {
      setSelectedCompanyId(companyId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompareWith = (companyId: string) => {
    setComparisonCompanyIds([companyId]);
    setCurrentTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currently viewed company for detail view
  const currentCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900 font-sans">
      {/* Persistent DEMO Notice Banner */}
      <DemoBanner locale={locale} />

      {/* Primary Top Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        locale={locale}
        onLocaleChange={setLocale}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            locale={locale}
            onExploreDemo={() => handleNavigate('dashboard')}
            onViewMethodology={() => handleNavigate('methodology')}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            companies={companies}
            locale={locale}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'directory' && (
          <DirectoryPage
            companies={companies}
            locale={locale}
            onSelectCompany={handleSelectCompany}
          />
        )}

        {currentTab === 'detail' && currentCompany && (
          <CompanyDetailPage
            company={currentCompany}
            locale={locale}
            onBack={() => handleNavigate('directory')}
            onCompareWith={handleCompareWith}
          />
        )}

        {currentTab === 'compare' && (
          <ComparisonPage
            companies={companies}
            locale={locale}
            initialSelectedIds={comparisonCompanyIds}
            onSelectCompany={handleSelectCompany}
          />
        )}

        {currentTab === 'methodology' && (
          <MethodologyPage locale={locale} />
        )}

        {currentTab === 'data-management' && (
          <DataManagementPage
            companies={companies}
            locale={locale}
            onUpdateCompanies={setCompanies}
            onSelectCompany={handleSelectCompany}
          />
        )}
      </main>

      {/* Footer */}
      <Footer locale={locale} onNavigate={handleNavigate} />
    </div>
  );
}
