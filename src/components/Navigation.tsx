import React from 'react';
import {
  Compass,
  FileCheck2,
  Calculator,
  KanbanSquare,
  Database,
  User,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { calculateProfileCompletion } from '../utils/storage';
import { StudentProfile } from '../types';

export type ActiveTab =
  | 'overview'
  | 'discover'
  | 'eligibility'
  | 'advisor'
  | 'funding'
  | 'tracker'
  | 'ingestion'
  | 'profile';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  studentProfile: StudentProfile;
  totalScholarshipsCount: number;
  totalSourcesCount: number;
  onOpenOnboarding: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  studentProfile,
  totalScholarshipsCount,
  totalSourcesCount,
  onOpenOnboarding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const profileCompletion = calculateProfileCompletion(studentProfile);

  const navItems = [
    {
      id: 'overview' as ActiveTab,
      label: 'Overview',
      icon: Compass,
      badge: null,
    },
    {
      id: 'discover' as ActiveTab,
      label: 'Discover Scholarships',
      icon: Compass,
      badge: `${totalScholarshipsCount} Global`,
    },
    {
      id: 'eligibility' as ActiveTab,
      label: 'Eligibility Reports',
      icon: FileCheck2,
      badge: 'Evidence Engine',
    },
    {
      id: 'advisor' as ActiveTab,
      label: 'Scholarship Advisor',
      icon: Sparkles,
      badge: 'AI Strategy',
    },
    {
      id: 'funding' as ActiveTab,
      label: 'Funding Calculator',
      icon: Calculator,
      badge: null,
    },
    {
      id: 'tracker' as ActiveTab,
      label: 'Application Tracker',
      icon: KanbanSquare,
      badge: null,
    },
    {
      id: 'ingestion' as ActiveTab,
      label: 'Data Ingestion & Sources',
      icon: Database,
      badge: `${totalSourcesCount} Sources`,
    },
    {
      id: 'profile' as ActiveTab,
      label: 'Profile & Settings',
      icon: User,
      badge: `${profileCompletion}%`,
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#FBFBFD]/90 dark:bg-black/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm font-semibold text-sm">
            OL
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-white">
              OpportunityLens
            </span>
            <span className="ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
              Global
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-y-0 right-0 w-72 bg-[#FBFBFD] dark:bg-neutral-950 p-6 flex flex-col justify-between border-l border-black/[0.08] dark:border-white/[0.08] shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-semibold text-xs">
                    OL
                  </div>
                  <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                    Navigation
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                Active Student: <span className="font-medium text-neutral-800 dark:text-neutral-200">{studentProfile.name}</span>
              </div>
              <button
                onClick={() => {
                  onOpenOnboarding();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
              >
                Edit Student Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between shrink-0 h-screen sticky top-0 bg-[#FBFBFD] dark:bg-neutral-950 border-r border-black/[0.06] dark:border-white/[0.08] p-5 select-none z-30">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between mb-8 px-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm font-semibold text-sm">
                OL
              </div>
              <div>
                <div className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5">
                  OpportunityLens
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Global
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal">
                  Deterministic Discovery
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3 mb-2">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_1px_3px_rgba(0,113,227,0.3)] font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} className={isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Status Card */}
        <div className="space-y-3">
          {/* Student Profile Card */}
          <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.06] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-semibold">
                  {studentProfile.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {studentProfile.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    {studentProfile.academicLevel} • {studentProfile.countryOfResidence}
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenOnboarding}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                title="Edit student profile"
              >
                Edit
              </button>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mb-1">
                <span>Profile Match Readiness</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{profileCompletion}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>

          {/* Engine Mode & Dark Mode Row */}
          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Deterministic Engine</span>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition text-neutral-600 dark:text-neutral-300"
              title="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
