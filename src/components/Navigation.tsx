import React from 'react';
import {
  LayoutDashboard,
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
  Sparkles,
} from 'lucide-react';
import { calculateProfileCompletion } from '../utils/storage';
import { StudentProfile } from '../types';
import { Meter, AnimatedCounter } from './UiKit';

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

interface NavItem {
  id: ActiveTab;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

const GROUPS: { label: string; ids: ActiveTab[] }[] = [
  { label: 'Workspace', ids: ['overview'] },
  { label: 'Discover', ids: ['discover', 'eligibility'] },
  { label: 'Plan & Apply', ids: ['advisor', 'funding', 'tracker'] },
  { label: 'Manage', ids: ['ingestion', 'profile'] },
];

/* Brand mark: ink square + brass lens dot — the app's visual signature with ambient pulse. */
const BrandMark: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <div
    className={`relative flex shrink-0 items-center justify-center rounded-lg bg-ink dark:bg-paper transition-transform duration-200 hover:scale-105 ${size === 'md' ? 'h-9 w-9' : 'h-8 w-8'}`}
    aria-hidden="true"
  >
    <span
      className={`font-display font-semibold text-paper dark:text-ink ${size === 'md' ? 'text-sm' : 'text-[13px] tracking-tight'}`}
    >
      OL
    </span>
    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brass dark:bg-brass-lt ring-2 ring-[#FAFAF9] dark:ring-[#0A0A09] animate-ambient-pulse" />
  </div>
);

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

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Personalized Matches',
      shortLabel: 'Matches',
      icon: LayoutDashboard,
    },
    {
      id: 'discover',
      label: 'Discover Scholarships',
      shortLabel: 'Discover',
      icon: Compass,
      badge: `${totalScholarshipsCount}`,
    },
    {
      id: 'eligibility',
      label: 'Eligibility Reports',
      shortLabel: 'Eligibility',
      icon: FileCheck2,
    },
    {
      id: 'advisor',
      label: 'Scholarship Advisor',
      shortLabel: 'Advisor',
      icon: Sparkles,
    },
    {
      id: 'funding',
      label: 'Funding Calculator',
      shortLabel: 'Funding',
      icon: Calculator,
    },
    {
      id: 'tracker',
      label: 'Application Tracker',
      shortLabel: 'Tracker',
      icon: KanbanSquare,
    },
    {
      id: 'ingestion',
      label: 'Data Ingestion & Sources',
      shortLabel: 'Ingestion',
      icon: Database,
      badge: `${totalSourcesCount}`,
    },
    {
      id: 'profile',
      label: 'Profile & Settings',
      shortLabel: 'Profile',
      icon: User,
      badge: `${profileCompletion}%`,
    },
  ];

  const itemById = Object.fromEntries(navItems.map((i) => [i.id, i]));

  const goTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  /* One button markup used by both desktop rail and mobile drawer. */
  const NavButton: React.FC<{ item: NavItem; mobile?: boolean }> = ({
    item,
    mobile,
  }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return (
      <button
        onClick={() => goTo(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`group flex w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] transition-all duration-150 active:scale-[0.98] ${
          mobile ? 'py-3' : 'py-2.5'
        } ${
          isActive
            ? 'bg-ink text-paper dark:bg-paper dark:text-ink font-semibold shadow-xs'
            : 'font-medium text-ink-soft dark:text-neutral-400 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] hover:text-ink dark:hover:text-white'
        }`}
      >
        <Icon
          size={16}
          className={
            isActive
              ? 'text-brass-lt dark:text-brass shrink-0'
              : 'text-neutral-400 dark:text-neutral-500 group-hover:text-brass dark:group-hover:text-brass-lt group-hover:scale-110 shrink-0 transition-all duration-150'
          }
        />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {item.badge && (
          <span
            className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold leading-none transition-transform duration-150 group-hover:scale-105 ${
              isActive
                ? 'bg-white/15 text-paper dark:bg-black/10 dark:text-ink'
                : 'bg-black/[0.05] text-neutral-500 dark:bg-white/[0.07] dark:text-neutral-400'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const groupedNav = (className: string) => (
    <div className={className}>
      {GROUPS.map((group) => (
        <div key={group.label} className="mb-4 last:mb-0">
          <div className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
            {group.label}
          </div>
          <nav className="space-y-0.5">
            {group.ids.map((id) => (
              <NavButton key={id} item={itemById[id]} />
            ))}
          </nav>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-black/[0.07] dark:border-white/[0.08] bg-paper/90 dark:bg-[#0A0A09]/90 px-4 py-3 backdrop-blur-md">
        <button
          onClick={() => goTo('overview')}
          className="flex items-center gap-2.5"
          aria-label="Go to overview"
        >
          <BrandMark size="sm" />
          <span className="font-display text-sm font-semibold tracking-tight text-ink dark:text-white">
            OpportunityLens
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-black/[0.05] dark:text-neutral-300 dark:hover:bg-white/[0.06]"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-ink dark:text-neutral-100 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-y-0 right-0 flex w-[19rem] max-w-[85vw] flex-col border-l border-black/[0.08] dark:border-white/[0.09] bg-paper dark:bg-neutral-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/[0.07] dark:border-white/[0.08] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <BrandMark size="sm" />
                <span className="font-display text-sm font-semibold text-ink dark:text-white">
                  Navigation
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:text-ink dark:hover:text-white"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              {groupedNav('')}
            </div>

            <div className="border-t border-black/[0.07] dark:border-white/[0.08] px-5 py-4">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="truncate text-xs font-medium text-ink dark:text-neutral-200">
                  {studentProfile.name}
                </span>
                <span className="text-[11px] font-semibold text-brass dark:text-brass-lt">
                  <AnimatedCounter value={profileCompletion} />%
                </span>
              </div>
              <Meter value={profileCompletion} />
              <button
                onClick={() => {
                  onOpenOnboarding();
                  setMobileMenuOpen(false);
                }}
                className="mt-3 w-full rounded-lg border border-black/[0.09] dark:border-white/[0.11] bg-white dark:bg-neutral-900 py-2 text-xs font-semibold text-ink dark:text-neutral-200 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.05] active:scale-[0.98]"
              >
                Edit student profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-64 shrink-0 select-none flex-col justify-between border-r border-black/[0.07] dark:border-white/[0.08] bg-paper dark:bg-[#0A0A09] p-4 sticky top-0 z-30">
        <div>
          {/* Brand block */}
          <div className="mb-7 flex items-center gap-3 px-2 pt-1">
            <BrandMark />
            <div className="min-w-0">
              <div className="font-display text-[15px] font-semibold tracking-tight text-ink dark:text-white">
                OpportunityLens
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Global Scholarship Index
              </div>
            </div>
          </div>

          {groupedNav('')}
        </div>

        {/* Bottom: profile readiness + engine status */}
        <div className="space-y-3">
          <div className="rounded-xl border border-black/[0.07] dark:border-white/[0.08] bg-white dark:bg-neutral-900/70 p-3.5 shadow-xs">
            <div className="mb-2.5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-paper dark:bg-paper dark:text-ink text-xs ring-2 ring-brass/40 dark:ring-brass-lt/40 transition-transform hover:scale-105 duration-200">
                {studentProfile.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold text-ink dark:text-neutral-100">
                  {studentProfile.name}
                </div>
                <div className="truncate text-[10px] text-neutral-500 dark:text-neutral-400">
                  {studentProfile.academicLevel} · {studentProfile.countryOfResidence}
                </div>
              </div>
              <button
                onClick={onOpenOnboarding}
                className="shrink-0 rounded-md px-1.5 py-1 text-[11px] font-semibold text-brass transition-all duration-150 hover:bg-brass-tint dark:text-brass-lt dark:hover:bg-brass-lt/10 active:scale-95"
                title="Edit student profile"
              >
                Edit
              </button>
            </div>

            <div className="mb-1.5 flex items-center justify-between text-[10px]">
              <span className="font-semibold uppercase tracking-[0.1em] text-neutral-400 dark:text-neutral-500">
                Match readiness
              </span>
              <span className="font-bold text-ink dark:text-neutral-200">
                <AnimatedCounter value={profileCompletion} />%
              </span>
            </div>
            <Meter value={profileCompletion} />
          </div>

          <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ambient-pulse" />
              <span>Deterministic Engine</span>
            </div>

            <button
              onClick={toggleDarkMode}
              className="rounded-lg p-1.5 transition-all duration-150 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 active:scale-90"
              title="Toggle dark mode"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
