/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation, ActiveTab } from './components/Navigation';
import { LandingView } from './components/LandingView';
import { DiscoveryView } from './components/DiscoveryView';
import { EligibilityEngineView } from './components/EligibilityEngineView';
import { ScholarshipAdvisorView } from './components/ScholarshipAdvisorView';
import { FundingCalculatorView } from './components/FundingCalculatorView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { DataIngestionView } from './components/DataIngestionView';
import { ProfileView } from './components/ProfileView';
import { OnboardingModal } from './components/OnboardingModal';
import {
  StudentProfile,
  ApplicationTrackerItem,
  Scholarship,
  SourceRegistryEntry,
  IngestionLog,
} from './types';
import {
  getStoredStudentProfile,
  saveStoredStudentProfile,
  getStoredTrackerItems,
  saveStoredTrackerItems,
  getAllScholarships,
  saveCustomScholarships,
  getAllSources,
  saveSources,
  getIngestionLogs,
  saveIngestionLogs,
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(getStoredStudentProfile);
  const [scholarships, setScholarships] = useState<Scholarship[]>(getAllScholarships);
  const [sources, setSources] = useState<SourceRegistryEntry[]>(getAllSources);
  const [ingestionLogs, setIngestionLogs] = useState<IngestionLog[]>(getIngestionLogs);
  const [trackerItems, setTrackerItems] = useState<ApplicationTrackerItem[]>(getStoredTrackerItems);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string>(() => {
    const list = getAllScholarships();
    return list[0]?.id || '';
  });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return (
      localStorage.getItem('opportunitylens_theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  // Sync theme with HTML root class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('opportunitylens_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('opportunitylens_theme', 'light');
    }
  }, [isDarkMode]);

  // Save student profile
  const handleSaveProfile = (updated: StudentProfile) => {
    setStudentProfile(updated);
    saveStoredStudentProfile(updated);
  };

  // Import batch records
  const handleImportRecords = (newRecords: Scholarship[], log: IngestionLog) => {
    const updatedList = [...scholarships];
    for (const rec of newRecords) {
      if (!updatedList.some((s) => s.id === rec.id || (s.officialUrl === rec.officialUrl && s.officialUrl !== ''))) {
        updatedList.push(rec);
      }
    }
    setScholarships(updatedList);
    saveCustomScholarships(updatedList);

    const updatedLogs = [log, ...ingestionLogs];
    setIngestionLogs(updatedLogs);
    saveIngestionLogs(updatedLogs);
  };

  // Add a new official source
  const handleAddSource = (source: SourceRegistryEntry) => {
    const updated = [source, ...sources];
    setSources(updated);
    saveSources(updated);
  };

  // Tracker management
  const handleUpdateTrackerItem = (updated: ApplicationTrackerItem) => {
    const newItems = trackerItems.map((item) =>
      item.id === updated.id ? updated : item
    );
    setTrackerItems(newItems);
    saveStoredTrackerItems(newItems);
  };

  const handleRemoveTrackerItem = (itemId: string) => {
    const newItems = trackerItems.filter((item) => item.id !== itemId);
    setTrackerItems(newItems);
    saveStoredTrackerItems(newItems);
  };

  const handleTrackScholarship = (schId: string) => {
    const existing = trackerItems.find((i) => i.opportunityId === schId);
    if (existing) {
      handleRemoveTrackerItem(existing.id);
      return;
    }

    const sch = scholarships.find((s) => s.id === schId);
    if (!sch) return;

    const defaultChecklist = (sch.requiredDocuments || ['Official Transcript', 'Letters of Recommendation', 'Personal Statement']).map((doc, idx) => ({
      id: `chk-${Date.now()}-${idx}`,
      label: doc,
      completed: false,
    }));

    const newItem: ApplicationTrackerItem = {
      id: `track-${Date.now()}`,
      opportunityId: schId,
      status: 'researching',
      checklist: defaultChecklist,
      notes: `Target deadline: ${sch.deadline}. Official URL: ${sch.officialUrl}`,
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    const newItems = [newItem, ...trackerItems];
    setTrackerItems(newItems);
    saveStoredTrackerItems(newItems);
  };

  const isScholarshipTracked = (schId: string): boolean => {
    return trackerItems.some((i) => i.opportunityId === schId);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Deep view transitions
  const handleOpenReport = (schId: string) => {
    setSelectedScholarshipId(schId);
    setActiveTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCalculator = (schId: string) => {
    setSelectedScholarshipId(schId);
    setActiveTab('funding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdvisor = (schId: string) => {
    setSelectedScholarshipId(schId);
    setActiveTab('advisor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScholarship = (sch: Scholarship) => {
    setSelectedScholarshipId(sch.id);
    setActiveTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0A0A09] text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col lg:flex-row antialiased selection:bg-brass/20">
      {/* Navigation (Persistent Desktop Sidebar + Responsive Mobile Bar) */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        studentProfile={studentProfile}
        totalScholarshipsCount={scholarships.length}
        totalSourcesCount={sources.length}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col justify-between overflow-y-auto min-h-screen">
        <div className="flex-1 pb-16">
          {activeTab === 'overview' && (
            <LandingView
              scholarships={scholarships}
              onStartMatching={() => setIsOnboardingOpen(true)}
              onExploreOpportunities={() => setActiveTab('discover')}
              onViewReport={handleOpenReport}
              onOpenAdvisor={handleOpenAdvisor}
              studentProfile={studentProfile}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoveryView
              scholarships={scholarships}
              studentProfile={studentProfile}
              onSelectScholarship={handleSelectScholarship}
              onOpenReport={handleOpenReport}
              onOpenCalculator={handleOpenCalculator}
              onOpenAdvisor={handleOpenAdvisor}
              onTrackScholarship={handleTrackScholarship}
              isScholarshipTracked={isScholarshipTracked}
            />
          )}

          {activeTab === 'eligibility' && (
            <EligibilityEngineView
              scholarships={scholarships}
              studentProfile={studentProfile}
              selectedScholarshipId={selectedScholarshipId}
              onSelectScholarshipId={setSelectedScholarshipId}
              onOpenProfile={() => setActiveTab('profile')}
              onOpenAdvisor={handleOpenAdvisor}
              onTrackScholarship={handleTrackScholarship}
              isScholarshipTracked={isScholarshipTracked}
            />
          )}

          {activeTab === 'advisor' && (
            <ScholarshipAdvisorView
              scholarships={scholarships}
              studentProfile={studentProfile}
              selectedScholarshipId={selectedScholarshipId}
              onSelectScholarshipId={setSelectedScholarshipId}
              onTrackScholarship={handleTrackScholarship}
              isScholarshipTracked={isScholarshipTracked}
              onOpenProfile={() => setActiveTab('profile')}
            />
          )}

          {activeTab === 'funding' && (
            <FundingCalculatorView
              opportunities={scholarships}
              studentProfile={studentProfile}
              selectedOpportunityId={selectedScholarshipId}
              onSelectOpportunityId={setSelectedScholarshipId}
            />
          )}

          {activeTab === 'tracker' && (
            <ApplicationTrackerView
              trackerItems={trackerItems}
              opportunities={scholarships}
              onUpdateTrackerItem={handleUpdateTrackerItem}
              onRemoveTrackerItem={handleRemoveTrackerItem}
              onOpenReport={handleOpenReport}
            />
          )}

          {activeTab === 'ingestion' && (
            <DataIngestionView
              scholarships={scholarships}
              sources={sources}
              ingestionLogs={ingestionLogs}
              onImportRecords={handleImportRecords}
              onAddSource={handleAddSource}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              profile={studentProfile}
              onSaveProfile={handleSaveProfile}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
            />
          )}
        </div>

        {/* Apple-styled Footer */}
        <footer className="border-t border-black/[0.06] dark:border-white/[0.06] py-6 px-6 sm:px-12 text-xs text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">OpportunityLens</span>
            <span>•</span>
            <span>Global Scholarship Discovery & Evidence Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Deterministic Rules</span>
            <span>•</span>
            <span>0 Runtime AI Dependencies</span>
            <span>•</span>
            <span>Official Government & University Bylaws</span>
          </div>
        </footer>
      </main>

      {/* Student Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        profile={studentProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
