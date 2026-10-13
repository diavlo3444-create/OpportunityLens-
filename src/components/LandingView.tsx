import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Receipt,
  Sparkles,
  Globe2,
  Target,
  CalendarClock,
  Clock,
  Search,
  SlidersHorizontal,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  UserCheck,
  DollarSign,
  GraduationCap,
  MapPin,
  Check,
  RefreshCw,
} from 'lucide-react';
import { Scholarship, StudentProfile, EligibilityReport } from '../types';
import { evaluateStudentEligibility } from '../utils/eligibilityEngine';
import { AnimatedCounter } from './UiKit';

interface LandingViewProps {
  scholarships: Scholarship[];
  onStartMatching: () => void;
  onExploreOpportunities: () => void;
  onViewReport: (opportunityId: string) => void;
  onOpenAdvisor?: (opportunityId: string) => void;
  onOpenCalculator?: (opportunityId: string) => void;
  onTrackScholarship?: (schId: string) => void;
  isScholarshipTracked?: (schId: string) => boolean;
  studentProfile: StudentProfile;
}

const daysUntil = (iso: string): number | null => {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.ceil((t - Date.now()) / 86_400_000);
};

export const LandingView: React.FC<LandingViewProps> = ({
  scholarships,
  onStartMatching,
  onExploreOpportunities,
  onViewReport,
  onOpenAdvisor,
  onOpenCalculator,
  onTrackScholarship,
  isScholarshipTracked,
  studentProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedFunding, setSelectedFunding] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'fit' | 'deadline' | 'award'>('fit');
  const [showIneligibleSection, setShowIneligibleSection] = useState<boolean>(false);

  // Evaluate every scholarship deterministically against current profile
  const evaluatedList = useMemo(() => {
    return scholarships.map((s) => ({
      scholarship: s,
      report: evaluateStudentEligibility(studentProfile, s),
    }));
  }, [scholarships, studentProfile]);

  // Unique destinations for filter dropdown
  const availableDestinations = useMemo(() => {
    const set = new Set<string>();
    scholarships.forEach((s) => s.destinationCountries.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, [scholarships]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return evaluatedList.filter(({ scholarship, report }) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = scholarship.title.toLowerCase().includes(q);
        const matchesProvider = scholarship.provider.toLowerCase().includes(q);
        const matchesDest = scholarship.destinationCountries.some((d) => d.toLowerCase().includes(q));
        if (!matchesTitle && !matchesProvider && !matchesDest) return false;
      }

      // Destination filter
      if (selectedDestination !== 'all') {
        if (!scholarship.destinationCountries.includes(selectedDestination)) return false;
      }

      // Funding filter
      if (selectedFunding !== 'all') {
        if (selectedFunding === 'fully_funded' && !scholarship.funding.isFullyFunded && !scholarship.fundingType.toLowerCase().includes('fully')) {
          return false;
        }
        if (selectedFunding === 'tuition' && !scholarship.funding.tuitionCovered) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        const da = new Date(a.scholarship.deadlineDate || '2028-01-01').getTime();
        const db = new Date(b.scholarship.deadlineDate || '2028-01-01').getTime();
        return da - db;
      }
      if (sortBy === 'award') {
        const parseAmt = (s: string | null) => {
          if (!s) return 0;
          const num = parseInt(s.replace(/[^0-9]/g, ''), 10);
          return isNaN(num) ? 0 : num;
        };
        return parseAmt(b.scholarship.awardAmountAndCurrency) - parseAmt(a.scholarship.awardAmountAndCurrency);
      }
      // Default: fit score
      return b.report.overallScore - a.report.overallScore;
    });
  }, [evaluatedList, searchQuery, selectedDestination, selectedFunding, sortBy]);

  // Split into the 3 mandatory sections
  const eligibleGroup = useMemo(() => {
    return filteredItems.filter(({ report }) => report.computedTier === 'eligible');
  }, [filteredItems]);

  const potentialGroup = useMemo(() => {
    return filteredItems.filter(({ report }) => report.computedTier === 'needs_verification');
  }, [filteredItems]);

  const ineligibleGroup = useMemo(() => {
    return filteredItems.filter(({ report }) => report.computedTier === 'ineligible');
  }, [filteredItems]);

  const totalAssessed = evaluatedList.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* ================================================================
          1 · Profile Snapshot & Readiness Hub
         ================================================================ */}
      <section className="rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brass dark:text-brass-lt">
                Profile-First Match Engine
              </span>
              <span className="text-xs text-neutral-400">·</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Deterministic statutory audits
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Personalized Scholarship Matches
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Every opportunity is evaluated in real-time against your reported citizenship, education level, GPA, and study goals.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={onStartMatching}
              className="px-4 py-2.5 rounded-xl bg-ink text-paper dark:bg-paper dark:text-ink text-xs font-semibold hover:bg-ink-soft dark:hover:bg-neutral-200 transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <UserCheck size={14} />
              <span>Update Profile</span>
            </button>
            <button
              onClick={onExploreOpportunities}
              className="px-3.5 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              Explore Directory
            </button>
          </div>
        </div>

        {/* Profile Attributes Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              Student / Level
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white block mt-0.5 truncate">
              {studentProfile.name || 'Anonymous Student'} · {studentProfile.academicLevel}
            </span>
            <span className="text-[10px] text-neutral-500 block">
              Graduation: {studentProfile.graduationYear || '2025/2026'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              Citizenship & Residence
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white block mt-0.5 truncate">
              {studentProfile.nationalities?.[0] || 'Worldwide'}
            </span>
            <span className="text-[10px] text-neutral-500 block truncate">
              Resident in {studentProfile.countryOfResidence || 'Unspecified'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              Academic Metric
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white block mt-0.5">
              {studentProfile.gpa !== null ? `${studentProfile.gpa.toFixed(2)} GPA` : '3.80 GPA'}
            </span>
            <span className="text-[10px] text-neutral-500 block truncate">
              {studentProfile.curriculum || 'Standardized curriculum'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              Study Field / Goals
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white block mt-0.5 truncate">
              {studentProfile.fieldOfStudy || 'General Academics'}
            </span>
            <span className="text-[10px] text-neutral-500 block truncate">
              {studentProfile.intendedDestinationCountries?.slice(0, 2).join(', ') || 'Global'}
            </span>
          </div>
        </div>

        {/* 3-Tier Outcome Quick Stat Ticker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between transition-transform duration-200 hover:-translate-y-0.5">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase tracking-wider">
                1. Eligible for You
              </span>
              <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400 block mt-0.5">
                All mandatory criteria met
              </span>
            </div>
            <span className="text-2xl font-bold font-display text-emerald-700 dark:text-emerald-400">
              <AnimatedCounter value={eligibleGroup.length} />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between transition-transform duration-200 hover:-translate-y-0.5">
            <div>
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 block uppercase tracking-wider">
                2. Potential Matches
              </span>
              <span className="text-[11px] text-amber-800/80 dark:text-amber-400 block mt-0.5">
                Requires checking specific criteria
              </span>
            </div>
            <span className="text-2xl font-bold font-display text-amber-800 dark:text-amber-400">
              <AnimatedCounter value={potentialGroup.length} />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/70 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between transition-transform duration-200 hover:-translate-y-0.5">
            <div>
              <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block uppercase tracking-wider">
                3. Excluded by Criteria
              </span>
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                Unmet mandatory requirement
              </span>
            </div>
            <span className="text-2xl font-bold font-display text-neutral-700 dark:text-neutral-300">
              <AnimatedCounter value={ineligibleGroup.length} />
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          2 · Filters & Search Bar
         ================================================================ */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-3 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholarship title, provider (e.g. Chevening, DAAD), or host country..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brass"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 font-medium focus:outline-none"
          >
            <option value="all">All Destinations</option>
            {availableDestinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={selectedFunding}
            onChange={(e) => setSelectedFunding(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 font-medium focus:outline-none"
          >
            <option value="all">All Funding Types</option>
            <option value="fully_funded">100% Fully Funded</option>
            <option value="tuition">Tuition Covered</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 font-medium focus:outline-none"
          >
            <option value="fit">Sort: Best Match Fit</option>
            <option value="deadline">Sort: Deadline Soonest</option>
            <option value="award">Sort: Highest Award</option>
          </select>
        </div>
      </div>

      {/* ================================================================
          SECTION 1 · ELIGIBLE FOR YOU (Primary Section)
         ================================================================ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                1. Eligible for You
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                All known mandatory eligibility criteria are confirmed for your profile.
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            {eligibleGroup.length} Available
          </span>
        </div>

        {eligibleGroup.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.06] text-center space-y-2 text-xs">
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">
              No scholarships currently meet 100% of mandatory requirements under current filters.
            </p>
            <p className="text-neutral-500 max-w-md mx-auto">
              Check the "Potential Matches" section below or update your profile to expand matching programs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleGroup.map(({ scholarship: s, report }) => {
              const diffDays = daysUntil(s.deadlineDate || '');
              const isTracked = isScholarshipTracked?.(s.id) ?? false;

              return (
                <div
                  key={s.id}
                  className="interactive-card rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500/40"
                >
                  <div className="space-y-3">
                    {/* Header: Host countries & Provider */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
                          {s.provider}
                        </span>
                        <span className="mx-1.5">·</span>
                        <span>{s.destinationCountries.join(', ')}</span>
                      </div>

                      {onTrackScholarship && (
                        <button
                          onClick={() => onTrackScholarship(s.id)}
                          className={`p-1.5 rounded-lg transition-transform duration-150 active:scale-125 cursor-pointer shrink-0 ${
                            isTracked
                              ? 'bg-ink text-paper dark:bg-paper dark:text-ink shadow-xs'
                              : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                          title={isTracked ? 'Tracked in your applications' : 'Add to Application Tracker'}
                        >
                          <Bookmark size={15} />
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base font-semibold text-neutral-900 dark:text-white leading-snug">
                      {s.title}
                    </h3>

                    {/* Why You Qualify - Explicit Verified Explanation */}
                    <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
                        <Check size={13} />
                        <span>Why you qualify ({report.overallScore}% criteria match):</span>
                      </div>
                      <p className="text-emerald-900 dark:text-emerald-200/90 leading-relaxed">
                        {report.summaryReasoning}
                      </p>
                    </div>

                    {/* Published Funding Breakdown */}
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center pt-1">
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
                        <span className="text-neutral-400 block uppercase font-bold text-[9px]">Tuition</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate block">
                          {s.funding.tuitionCovered ? '100% Covered' : s.tuitionCoverage}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
                        <span className="text-neutral-400 block uppercase font-bold text-[9px]">Housing</span>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300 truncate block">
                          {s.funding.accommodationCovered ? 'Provided' : s.accommodationCoverage}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04]">
                        <span className="text-neutral-400 block uppercase font-bold text-[9px]">Flights</span>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300 truncate block">
                          {s.funding.travelCovered ? 'Booked' : 'Self-fund'}
                        </span>
                      </div>
                    </div>

                    {/* Metadata line: Award value & Deadline countdown */}
                    <div className="flex items-center justify-between text-[11px] pt-1 text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <DollarSign size={12} className="text-brass dark:text-brass-lt" />
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[170px]">
                          {s.awardAmountAndCurrency || s.fundingType}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>Deadline: <strong className="text-neutral-800 dark:text-neutral-200">{s.deadline}</strong></span>
                        {diffDays !== null && diffDays <= 45 && (
                          <span className="text-[10px] font-semibold text-rose-700 dark:text-rose-400 ml-1">
                            ({diffDays}d left)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onViewReport(s.id)}
                        className="px-3 py-1.5 rounded-lg bg-ink text-paper dark:bg-paper dark:text-ink font-semibold hover:bg-ink-soft dark:hover:bg-neutral-200 transition cursor-pointer flex items-center gap-1"
                      >
                        <FileCheck2 size={12} />
                        <span>Audit Fit</span>
                      </button>

                      {onOpenAdvisor && (
                        <button
                          onClick={() => onOpenAdvisor(s.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-brass-tint dark:bg-brass-lt/10 text-brass-strong dark:text-brass-lt hover:bg-brass/10 border border-brass/20 dark:border-brass-lt/20 font-medium transition cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles size={12} />
                          <span>Advisor</span>
                        </button>
                      )}

                      {onOpenCalculator && (
                        <button
                          onClick={() => onOpenCalculator(s.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium transition cursor-pointer flex items-center gap-1"
                        >
                          <Receipt size={12} />
                          <span>Calculator</span>
                        </button>
                      )}
                    </div>

                    <a
                      href={s.officialProgramUrl || s.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 hover:text-brass dark:hover:text-brass-lt flex items-center gap-1 transition"
                    >
                      <span>Official Portal</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================================================================
          SECTION 2 · POTENTIAL MATCHES — ELIGIBILITY TO CONFIRM
         ================================================================ */}
      <section className="space-y-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <AlertTriangle size={16} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                2. Potential Matches — Eligibility to Confirm
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Primary credentials align, but unverified prerequisites or specific institutional items require checking.
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-400">
            {potentialGroup.length} to Review
          </span>
        </div>

        {potentialGroup.length === 0 ? (
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.06] text-center text-xs text-neutral-500">
            No ambiguous opportunities pending verification under active filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {potentialGroup.map(({ scholarship: s, report }) => {
              const isTracked = isScholarshipTracked?.(s.id) ?? false;
              const itemsToCheck = report.verificationNeededItems || [];

              return (
                <div
                  key={s.id}
                  className="interactive-card rounded-2xl bg-white dark:bg-neutral-900 border border-amber-500/25 dark:border-amber-500/20 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-500/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
                          {s.provider}
                        </span>
                        <span className="mx-1.5">·</span>
                        <span>{s.destinationCountries.join(', ')}</span>
                      </div>

                      {onTrackScholarship && (
                        <button
                          onClick={() => onTrackScholarship(s.id)}
                          className={`p-1.5 rounded-lg transition-transform duration-150 active:scale-125 cursor-pointer shrink-0 ${
                            isTracked
                              ? 'bg-ink text-paper dark:bg-paper dark:text-ink shadow-xs'
                              : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <Bookmark size={15} />
                        </button>
                      )}
                    </div>

                    <h3 className="font-display text-base font-semibold text-neutral-900 dark:text-white leading-snug">
                      {s.title}
                    </h3>

                    {/* What Needs Checking Alert Box */}
                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-300">
                        <AlertTriangle size={13} />
                        <span>What needs human verification before applying:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-amber-950 dark:text-amber-200/90">
                        {itemsToCheck.length > 0 ? (
                          itemsToCheck.slice(0, 3).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))
                        ) : (
                          <li>{report.summaryReasoning}</li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Award: <strong>{s.awardAmountAndCurrency || s.fundingType}</strong></span>
                      <span>Deadline: <strong>{s.deadline}</strong></span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => onViewReport(s.id)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer flex items-center gap-1"
                    >
                      <FileCheck2 size={12} />
                      <span>Verify Requirements</span>
                    </button>

                    <a
                      href={s.officialProgramUrl || s.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 hover:text-brass dark:hover:text-brass-lt flex items-center gap-1"
                    >
                      <span>Check Official Terms</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================================================================
          SECTION 3 · OTHER SCHOLARSHIPS — REQUIREMENTS NOT MET (Collapsible)
         ================================================================ */}
      <section className="space-y-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              <XCircle size={16} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                3. Other Scholarships — Requirements Not Met
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Known unmet mandatory requirement (e.g. study level exclusion or citizenship restriction).
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowIneligibleSection(!showIneligibleSection)}
            className="px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{showIneligibleSection ? 'Collapse Section' : `View ${ineligibleGroup.length} Excluded`}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${showIneligibleSection ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {showIneligibleSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {ineligibleGroup.map(({ scholarship: s, report }) => {
                  const reasons = report.unmetRequirements || [];

                  return (
                    <div
                      key={s.id}
                      className="interactive-card rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-black/[0.06] dark:border-white/[0.06] p-5 space-y-3 opacity-90 hover:opacity-100"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-[11px] text-neutral-500">
                          <span>{s.provider}</span>
                          <span className="mx-1">·</span>
                          <span>{s.destinationCountries.join(', ')}</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          Excluded
                        </span>
                      </div>

                      <h3 className="font-display text-base font-semibold text-neutral-800 dark:text-neutral-200">
                        {s.title}
                      </h3>

                      {/* Explicit Explanation of Why Disqualified */}
                      <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-950/80 border border-black/[0.04] dark:border-white/[0.04] text-[11px] space-y-1">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300 block">
                          Why this opportunity is not currently viable:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-neutral-600 dark:text-neutral-400">
                          {reasons.length > 0 ? (
                            reasons.map((r, i) => <li key={i}>{r}</li>)
                          ) : (
                            <li>{report.summaryReasoning}</li>
                          )}
                        </ul>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <button
                          onClick={() => onViewReport(s.id)}
                          className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer font-medium active:scale-95 transition-transform"
                        >
                          Audit rule breakdown
                        </button>

                        <a
                          href={s.officialProgramUrl || s.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1 transition"
                        >
                          <span>Official link</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
