import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSearch,
  Receipt,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  Globe2,
  Database,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Scholarship, StudentProfile } from '../types';
import { evaluateStudentEligibility } from '../utils/eligibilityEngine';

interface LandingViewProps {
  scholarships: Scholarship[];
  onStartMatching: () => void;
  onExploreOpportunities: () => void;
  onViewReport: (opportunityId: string) => void;
  onOpenAdvisor?: (opportunityId: string) => void;
  studentProfile: StudentProfile;
}

export const LandingView: React.FC<LandingViewProps> = ({
  scholarships,
  onStartMatching,
  onExploreOpportunities,
  onViewReport,
  onOpenAdvisor,
  studentProfile,
}) => {
  // Use first scholarship for live preview (Chevening or RSI)
  const sampleOpp = scholarships[0];
  const previewReport = evaluateStudentEligibility(studentProfile, sampleOpp);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-14 space-y-16 lg:space-y-24">
      {/* Editorial Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
          <Globe2 size={14} />
          <span>Global Scholarship Discovery Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
          Find global scholarships you actually qualify for.
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto">
          From full government fellowships to premier undergraduate and high-school programs.
          OpportunityLens uses deterministic, explainable rules to evaluate your profile against documented official requirements, citing verified bylaws and separating tuition from living allowances.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <button
            onClick={onStartMatching}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all duration-150 shadow-[0_2px_12px_rgba(0,113,227,0.25)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Set my student profile</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onExploreOpportunities}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium text-sm transition duration-150 cursor-pointer"
          >
            Explore global database ({scholarships.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>100% Deterministic Rules</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>Zero Runtime AI Hallucinations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>Authoritative Source Registry</span>
          </div>
        </div>
      </section>

      {/* Interactive Live Preview of the Eligibility Report */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 max-w-4xl mx-auto">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Deterministic Evidence Preview
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Transparent Eligibility Engine
            </h2>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Live rule audit for <strong className="font-semibold text-neutral-800 dark:text-neutral-200">{sampleOpp.title}</strong>
          </span>
        </div>

        {/* Live Preview Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-neutral-900/90 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden transition">
          {/* Card Top Meta */}
          <div className="p-6 sm:p-8 border-b border-black/[0.05] dark:border-white/[0.06] bg-gradient-to-b from-neutral-50/50 dark:from-neutral-900/40 to-transparent">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {sampleOpp.organizer}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-0.5">
                  {sampleOpp.title}
                </h3>
              </div>

              {/* Status Outcome Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                  previewReport.status === 'likely_eligible'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40'
                    : previewReport.status === 'ineligible'
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/40'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40'
                }`}
              >
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>{previewReport.headline}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {previewReport.summaryReasoning}
            </p>

            {/* Criteria Match Breakdown Bar */}
            <div className="mt-4 pt-4 border-t border-black/[0.04] dark:border-white/[0.04] flex flex-wrap items-center gap-4 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                Criteria Match: {previewReport.overallScore}/100
              </span>
              <span>Level: {previewReport.scoreBreakdown.academicLevelFit}/25</span>
              <span>Nationality: {previewReport.scoreBreakdown.nationalityResidenceFit}/25</span>
              <span>Subject: {previewReport.scoreBreakdown.subjectDisciplineFit}/20</span>
              <span>Academic Metrics: {previewReport.scoreBreakdown.academicThresholdFit}/20</span>
            </div>
          </div>

          {/* Line-by-Line Requirement Evidence Rows */}
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04] p-2 sm:p-4">
            {previewReport.audits.slice(0, 3).map((item) => (
              <div key={item.requirementId} className="p-4 sm:p-5 space-y-2 hover:bg-neutral-50/60 dark:hover:bg-white/[0.02] rounded-2xl transition">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.status === 'passed'
                          ? 'bg-emerald-500'
                          : item.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    />
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                    Your profile: {item.studentValue}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  {item.reasoning}
                </p>

                {/* Grounded Quote Box */}
                <div className="mt-2 text-xs p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] text-neutral-600 dark:text-neutral-400 italic">
                  &ldquo;{item.officialQuote}&rdquo;
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="p-4 sm:p-6 bg-neutral-50/80 dark:bg-neutral-950/60 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {onOpenAdvisor && (
                <button
                  onClick={() => onOpenAdvisor(sampleOpp.id)}
                  className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 border border-purple-500/20 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles size={13} />
                  <span>Consult Advisor</span>
                </button>
              )}

              <button
                onClick={() => onViewReport(sampleOpp.id)}
                className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>View full {sampleOpp.title} audit</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Pillar Global Architecture */}
      <section className="space-y-10 max-w-6xl mx-auto pt-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Architecture of OpportunityLens
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Engineered around verifiable evidence, authoritative government decrees, and resilient strategic AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              <Globe2 size={18} />
            </div>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-white">
              Global Source Registry
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We catalog official funding decree portals from government ministries (UK Chevening, US Fulbright, German DAAD, Campus France, MEXT) and leading world universities.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-white">
              Deterministic Matching
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Zero black-box LLM guessing for eligibility. Qualification rules are evaluated using transparent software logic citing exact official source passages.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              <Receipt size={18} />
            </div>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-white">
              Cost Disaggregation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Transparent financial calculators differentiate tuition coverage from accommodation, dining hall plans, round-trip international flights, and visa surcharges.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              <Sparkles size={18} />
            </div>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-white">
              Reliable AI Advisor
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Concisely capped (~200 words), cached strategic guidance powered by Gemini Flash, with offline Demo Mode ensuring 100% platform uptime.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900 dark:bg-neutral-900/90 text-white text-center space-y-5 max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Explore scholarships across all academic levels
        </h2>
        <p className="text-neutral-300 text-sm max-w-xl mx-auto leading-relaxed">
          From high school research to undergraduate full rides, Master’s degrees, and PhD fellowships worldwide.
        </p>
        <button
          onClick={onExploreOpportunities}
          className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Open scholarship directory</span>
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
};
