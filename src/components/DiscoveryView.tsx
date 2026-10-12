import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Receipt,
  FileCheck2,
  Bookmark,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  Tag,
  DollarSign,
  GraduationCap,
  Globe2,
  X,
  Sparkles,
  Layers,
  HelpCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { Scholarship, StudentProfile, AcademicLevel, EligibilityStatus } from '../types';
import { evaluateStudentEligibility } from '../utils/eligibilityEngine';

interface DiscoveryViewProps {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  onSelectScholarship: (sch: Scholarship) => void;
  onOpenReport: (schId: string) => void;
  onOpenCalculator: (schId: string) => void;
  onOpenAdvisor?: (schId: string) => void;
  onTrackScholarship: (schId: string) => void;
  isScholarshipTracked: (schId: string) => boolean;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  scholarships,
  studentProfile,
  onSelectScholarship,
  onOpenReport,
  onOpenCalculator,
  onOpenAdvisor,
  onTrackScholarship,
  isScholarshipTracked,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedFundingType, setSelectedFundingType] = useState<string>('all');
  const [selectedEligibility, setSelectedEligibility] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'matchScore' | 'name' | 'newest'>('deadline');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Selected scholarship for detailed modal
  const [detailModalScholarship, setDetailModalScholarship] = useState<Scholarship | null>(null);

  // Pre-calculate deterministic eligibility audits for all records
  const scholarshipEvaluations = useMemo(() => {
    const map = new Map<string, ReturnType<typeof evaluateStudentEligibility>>();
    for (const sch of scholarships) {
      map.set(sch.id, evaluateStudentEligibility(studentProfile, sch));
    }
    return map;
  }, [scholarships, studentProfile]);

  // Extract unique destinations with counts
  const destinationOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    scholarships.forEach((s) => {
      s.destinationCountries.forEach((d) => {
        counts[d] = (counts[d] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [scholarships]);

  // Region classification helper
  const matchesRegion = (sch: Scholarship, region: string): boolean => {
    if (region === 'all') return true;
    const dests = sch.destinationCountries.join(' ').toLowerCase();
    if (region === 'europe') {
      return (
        dests.includes('united kingdom') ||
        dests.includes('germany') ||
        dests.includes('france') ||
        dests.includes('switzerland') ||
        dests.includes('netherlands') ||
        dests.includes('sweden') ||
        dests.includes('italy') ||
        dests.includes('ireland') ||
        dests.includes('hungary') ||
        dests.includes('finland') ||
        dests.includes('norway') ||
        dests.includes('belgium') ||
        dests.includes('spain')
      );
    }
    if (region === 'americas') {
      return dests.includes('united states') || dests.includes('canada') || dests.includes('mexico') || dests.includes('brazil') || dests.includes('chile');
    }
    if (region === 'asia-pacific') {
      return (
        dests.includes('japan') ||
        dests.includes('south korea') ||
        dests.includes('china') ||
        dests.includes('singapore') ||
        dests.includes('taiwan') ||
        dests.includes('hong kong') ||
        dests.includes('australia') ||
        dests.includes('new zealand')
      );
    }
    if (region === 'africa-middle-east') {
      return (
        dests.includes('south africa') ||
        dests.includes('turkey') ||
        dests.includes('saudi arabia') ||
        dests.includes('egypt') ||
        dests.includes('ghana') ||
        dests.includes('nigeria') ||
        dests.includes('kenya') ||
        dests.includes('morocco')
      );
    }
    if (region === 'global') {
      return dests.includes('global') || dests.includes('international') || sch.providerType === 'Multilateral Organization';
    }
    return true;
  };

  // Filter and sort
  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter((sch) => {
        const evalResult = scholarshipEvaluations.get(sch.id);

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = sch.title.toLowerCase().includes(q);
          const matchOrganizer = (sch.provider || sch.organizer || '').toLowerCase().includes(q);
          const matchSummary = (sch.summary || '').toLowerCase().includes(q);
          const matchTags = (sch.tags || []).some((t) => t.toLowerCase().includes(q));
          const matchDest = sch.destinationCountries.some((d) => d.toLowerCase().includes(q));
          const matchSubj = (sch.subjectRestrictions || sch.eligibleSubjects || []).some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchOrganizer && !matchSummary && !matchTags && !matchDest && !matchSubj) {
            return false;
          }
        }

        // Region quick filter
        if (!matchesRegion(sch, selectedRegion)) {
          return false;
        }

        // Destination country filter
        if (selectedDestination !== 'all') {
          if (!sch.destinationCountries.includes(selectedDestination)) {
            return false;
          }
        }

        // Academic level filter
        if (selectedLevel !== 'all') {
          if (!sch.academicLevels.includes(selectedLevel as AcademicLevel)) {
            return false;
          }
        }

        // Funding type filter
        if (selectedFundingType !== 'all') {
          if (selectedFundingType === '100% Fully Funded') {
            if (!sch.funding.isFullyFunded && sch.tuitionCoverage !== '100% Full Tuition') return false;
          } else if (selectedFundingType === 'Tuition Waiver') {
            if (sch.tuitionCoverage !== 'Tuition Waiver' && sch.tuitionCoverage !== '100% Full Tuition') return false;
          } else if (selectedFundingType === 'Partial') {
            if (sch.funding.isFullyFunded) return false;
          }
        }

        // Eligibility outcome filter
        if (selectedEligibility !== 'all') {
          if (evalResult?.status !== selectedEligibility) {
            return false;
          }
        }

        // Verification status filter
        if (selectedVerification !== 'all') {
          if (sch.verificationStatus !== selectedVerification) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return (a.deadlineDate || '9999-12-31').localeCompare(b.deadlineDate || '9999-12-31');
        }
        if (sortBy === 'matchScore') {
          const scoreA = scholarshipEvaluations.get(a.id)?.overallScore ?? 0;
          const scoreB = scholarshipEvaluations.get(b.id)?.overallScore ?? 0;
          return scoreB - scoreA;
        }
        if (sortBy === 'newest') {
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
        return a.title.localeCompare(b.title);
      });
  }, [
    scholarships,
    scholarshipEvaluations,
    searchQuery,
    selectedRegion,
    selectedDestination,
    selectedLevel,
    selectedFundingType,
    selectedEligibility,
    selectedVerification,
    sortBy,
  ]);

  // Reset to page 1 whenever filters change
  const totalItems = filteredScholarships.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedScholarships = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    return filteredScholarships.slice(startIndex, startIndex + pageSize);
  }, [filteredScholarships, validCurrentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedDestination('all');
    setSelectedLevel('all');
    setSelectedFundingType('all');
    setSelectedEligibility('all');
    setSelectedVerification('all');
    setSortBy('deadline');
    setCurrentPage(1);
  };

  const getStatusBadge = (status?: EligibilityStatus) => {
    switch (status) {
      case 'likely_eligible':
        return {
          label: 'Likely Eligible',
          className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
          icon: CheckCircle2,
        };
      case 'potentially_eligible':
        return {
          label: 'Potentially Eligible',
          className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
          icon: AlertCircle,
        };
      case 'ineligible':
        return {
          label: 'Unmet Criteria',
          className: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
          icon: AlertCircle,
        };
      case 'insufficient_info':
      default:
        return {
          label: 'Incomplete Profile Fit',
          className: 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20',
          icon: AlertCircle,
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header & Overview Telemetry */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Worldwide Scholarship Search Engine
              </span>
              <span className="text-xs text-neutral-500">
                {scholarships.length} Indexed Real Opportunities
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Global Scholarship Discovery
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Query verified government scholarships, university excellence packages, and research grants across all continents with transparent evidence-backed requirements.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Per page:
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
            >
              <option value={12}>12 records</option>
              <option value={24}>24 records</option>
              <option value={48}>48 records</option>
            </select>
          </div>
        </div>

        {/* Quick Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: `All Regions (${scholarships.length})` },
            { id: 'europe', label: 'Europe' },
            { id: 'americas', label: 'Americas' },
            { id: 'asia-pacific', label: 'Asia-Pacific' },
            { id: 'africa-middle-east', label: 'Africa & Middle East' },
            { id: 'global', label: 'Global / Multilateral' },
          ].map((reg) => (
            <button
              key={reg.id}
              onClick={() => {
                setSelectedRegion(reg.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-neutral-400" size={17} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search across title, host country, university, degree, or field (e.g. Oxford, DAAD, Master's, Economics, Germany)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-300 focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="deadline">Sort by Deadline (Nearest)</option>
              <option value="matchScore">Sort by Student Criteria Match</option>
              <option value="name">Sort by Name (A-Z)</option>
              <option value="newest">Sort by Recently Indexed</option>
            </select>
          </div>
        </div>

        {/* Multi-Dimensional Filter Controls */}
        <div className="p-4 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <SlidersHorizontal size={14} className="text-blue-600" />
              <span>Precise Query Filters</span>
            </div>

            {(selectedDestination !== 'all' ||
              selectedLevel !== 'all' ||
              selectedFundingType !== 'all' ||
              selectedEligibility !== 'all' ||
              selectedVerification !== 'all' ||
              selectedRegion !== 'all' ||
              searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* Destination Country Filter with REAL counts */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                Destination Country
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => {
                  setSelectedDestination(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="all">All Countries ({scholarships.length})</option>
                {destinationOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.name} ({opt.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                Academic Degree Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="all">All Academic Levels</option>
                <option value="High School">High School & Pre-College</option>
                <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                <option value="Master's">Master's Degree</option>
                <option value="Doctoral / PhD">Doctoral / PhD</option>
                <option value="Postdoctoral & Research">Postdoctoral & Research</option>
              </select>
            </div>

            {/* Funding Coverage Type */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                Funding Structure
              </label>
              <select
                value={selectedFundingType}
                onChange={(e) => {
                  setSelectedFundingType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="all">All Funding Formats</option>
                <option value="100% Fully Funded">100% Fully Funded (Tuition + Stipend)</option>
                <option value="Tuition Waiver">Tuition Waiver / Free Study</option>
                <option value="Partial">Partial Grant / Contribution</option>
              </select>
            </div>

            {/* Student Match Fit */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                Student Profile Alignment
              </label>
              <select
                value={selectedEligibility}
                onChange={(e) => {
                  setSelectedEligibility(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="all">All Outcomes</option>
                <option value="likely_eligible">Likely Eligible Only</option>
                <option value="potentially_eligible">Potentially Eligible</option>
                <option value="ineligible">Unmet Criteria</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header: Real counts & Pagination info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
        <div>
          Showing{' '}
          <strong className="text-neutral-900 dark:text-white">
            {totalItems === 0 ? 0 : (validCurrentPage - 1) * pageSize + 1}
          </strong>{' '}
          to{' '}
          <strong className="text-neutral-900 dark:text-white">
            {Math.min(validCurrentPage * pageSize, totalItems)}
          </strong>{' '}
          of <strong className="text-neutral-900 dark:text-white">{totalItems}</strong> matching worldwide scholarships
          {selectedDestination !== 'all' && (
            <span>
              {' '}
              in <strong className="text-blue-600 dark:text-blue-400">{selectedDestination}</strong>
            </span>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              className="p-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 font-medium">
              Page {validCurrentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
              title="Next Page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {totalItems === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Globe2 size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              No matching scholarships found for this criteria
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Our global index queries verified scholarships from official decrees. Try relaxing your filters or search terms.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        /* Opportunity Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedScholarships.map((sch) => {
            const evalReport = scholarshipEvaluations.get(sch.id);
            const badge = getStatusBadge(evalReport?.status);
            const isTracked = isScholarshipTracked(sch.id);

            // Calculate deadline urgency
            const deadlineTime = new Date(sch.deadlineDate || '2027-12-31').getTime();
            const now = new Date().getTime();
            const diffDays = Math.ceil((deadlineTime - now) / (1000 * 60 * 60 * 24));

            return (
              <div
                key={sch.id}
                className="group rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.16] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3.5">
                  {/* Top Header: Host Country, Verification & Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
                        <MapPin size={11} className="text-neutral-400" />
                        <span>{sch.destinationCountries.join(', ')}</span>
                      </span>

                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck size={11} />
                        <span>{sch.verificationStatus}</span>
                      </span>

                      {sch.isDemonstration && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400">
                          Demo Record
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onTrackScholarship(sch.id)}
                      className={`p-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                        isTracked
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                      title={isTracked ? 'Tracked in your applications' : 'Add to Application Tracker'}
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>

                  {/* Title & Sponsoring Organization */}
                  <div>
                    <h3
                      onClick={() => setDetailModalScholarship(sch)}
                      className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition cursor-pointer line-clamp-2"
                    >
                      {sch.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                      {sch.provider || sch.organizer} • {sch.providerType}
                    </p>
                  </div>

                  {/* Eligibility Match Fit Badge */}
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${badge.className}`}
                    >
                      <badge.icon size={13} />
                      <span>{badge.label}</span>
                    </span>

                    {evalReport && (
                      <span className="text-[11px] font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                        {evalReport.overallScore}% Fit
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                    {sch.summary || sch.description}
                  </p>

                  {/* Degree Levels & Delivery */}
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    {sch.academicLevels.map((lvl) => (
                      <span
                        key={lvl}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300"
                      >
                        {lvl}
                      </span>
                    ))}
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400">
                      {sch.format}
                    </span>
                  </div>

                  {/* Financial Coverage Snapshot Box */}
                  <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 font-medium">Published Award:</span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate max-w-[170px]" title={sch.awardAmountAndCurrency || ''}>
                        {sch.awardAmountAndCurrency}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-black/[0.04] dark:border-white/[0.04] text-[10px] text-center">
                      <div className="bg-white dark:bg-neutral-900 py-1 px-1 rounded-lg">
                        <span className="text-neutral-400 block text-[9px] uppercase font-semibold">Tuition</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {sch.funding.tuitionCovered ? '100% Free' : sch.tuitionCoverage}
                        </span>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 py-1 px-1 rounded-lg">
                        <span className="text-neutral-400 block text-[9px] uppercase font-semibold">Housing</span>
                        <span className={sch.funding.accommodationCovered ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'}>
                          {sch.funding.accommodationCovered ? 'Covered' : 'Student'}
                        </span>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 py-1 px-1 rounded-lg">
                        <span className="text-neutral-400 block text-[9px] uppercase font-semibold">Flights</span>
                        <span className={sch.funding.travelCovered ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'}>
                          {sch.funding.travelCovered ? 'Booked' : 'Self-fund'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Row: Deadline countdown */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-1 border-t border-black/[0.04] dark:border-white/[0.04]">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-neutral-400" />
                      <span>Deadline: <strong className="text-neutral-800 dark:text-neutral-200">{sch.deadline}</strong></span>
                    </div>

                    {diffDays > 0 ? (
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                        {diffDays} days left
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400">Annual Cycle</span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-neutral-50/80 dark:bg-neutral-950/70 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenReport(sch.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1 cursor-pointer"
                    >
                      <FileCheck2 size={12} />
                      <span>Audit Fit</span>
                    </button>

                    <button
                      onClick={() => onOpenCalculator(sch.id)}
                      className="px-2 py-1.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                    >
                      <Receipt size={12} />
                      <span>Calculator</span>
                    </button>

                    {onOpenAdvisor && (
                      <button
                        onClick={() => onOpenAdvisor(sch.id)}
                        className="px-2 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                        title="Consult AI Scholarship Advisor"
                      >
                        <Sparkles size={12} />
                        <span>Advisor</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setDetailModalScholarship(sch)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition cursor-pointer text-xs font-medium"
                      title="Inspect full official terms"
                    >
                      Details
                    </button>

                    <a
                      href={sch.officialProgramUrl || sch.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 transition"
                      title="Open official organizer source URL"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Pagination when multiple pages */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-500">
          <div>
            Showing page {validCurrentPage} of {totalPages} ({totalItems} total records)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer font-medium"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pNum = i + 1;
              return (
                <button
                  key={pNum}
                  onClick={() => setCurrentPage(pNum)}
                  className={`w-7 h-7 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    validCurrentPage === pNum
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* DETAILED SCHOLARSHIP INSPECTION MODAL */}
      {detailModalScholarship && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {detailModalScholarship.destinationCountries.join(', ')}
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {detailModalScholarship.verificationStatus}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                  {detailModalScholarship.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                  {detailModalScholarship.provider} • {detailModalScholarship.providerType}
                </p>
              </div>

              <button
                onClick={() => setDetailModalScholarship(null)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Extracted Evidence / Official Decree Quote */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.04] dark:border-white/[0.04] space-y-1.5">
              <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider">
                Official Regulatory Decree / Citation Excerpt:
              </span>
              <p className="text-xs font-serif italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{detailModalScholarship.extractedEvidence}"
              </p>
              <div className="text-[10px] text-neutral-400 pt-1">
                Provenance: {detailModalScholarship.dataProvenance} • Verified: {detailModalScholarship.lastCheckedDate}
              </div>
            </div>

            {/* Financial Disaggregation Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Financial Coverage Disaggregation
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.04]">
                  <span className="text-neutral-400 block text-[10px] font-semibold">Tuition</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {detailModalScholarship.tuitionCoverage}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.04]">
                  <span className="text-neutral-400 block text-[10px] font-semibold">Living Allowance</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                    {detailModalScholarship.accommodationCoverage}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.04]">
                  <span className="text-neutral-400 block text-[10px] font-semibold">Flights & Travel</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                    {detailModalScholarship.travelCoverage}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.04]">
                  <span className="text-neutral-400 block text-[10px] font-semibold">Duration</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                    {detailModalScholarship.programDuration}
                  </span>
                </div>
              </div>
            </div>

            {/* Eligibility Requirements List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Mandatory Entry Criteria
              </h4>
              <div className="space-y-1.5">
                {detailModalScholarship.academicRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Application Dossier & Checklist
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {detailModalScholarship.requiredDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    • {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const id = detailModalScholarship.id;
                    setDetailModalScholarship(null);
                    onOpenReport(id);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck2 size={14} />
                  <span>Run Eligibility Evidence Audit</span>
                </button>

                <button
                  onClick={() => {
                    const id = detailModalScholarship.id;
                    setDetailModalScholarship(null);
                    onOpenCalculator(id);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Receipt size={14} />
                  <span>Cost Calculator</span>
                </button>

                {onOpenAdvisor && (
                  <button
                    onClick={() => {
                      const id = detailModalScholarship.id;
                      setDetailModalScholarship(null);
                      onOpenAdvisor(id);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles size={14} />
                    <span>Consult Advisor</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={detailModalScholarship.officialApplicationUrl || detailModalScholarship.officialProgramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Official Application Portal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
