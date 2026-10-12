import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Info,
  Bookmark,
  Scale,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Scholarship, StudentProfile, EligibilityReport } from '../types';
import { evaluateStudentEligibility } from '../utils/eligibilityEngine';

interface EligibilityEngineViewProps {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  selectedScholarshipId?: string;
  onSelectScholarshipId: (id: string) => void;
  onOpenProfile: () => void;
  onOpenAdvisor?: (schId: string) => void;
  onTrackScholarship: (schId: string) => void;
  isScholarshipTracked: (schId: string) => boolean;
}

export const EligibilityEngineView: React.FC<EligibilityEngineViewProps> = ({
  scholarships,
  studentProfile,
  selectedScholarshipId,
  onSelectScholarshipId,
  onOpenProfile,
  onOpenAdvisor,
  onTrackScholarship,
  isScholarshipTracked,
}) => {
  const activeSch =
    scholarships.find((s) => s.id === selectedScholarshipId) || scholarships[0];

  const report: EligibilityReport = evaluateStudentEligibility(studentProfile, activeSch);
  const isTracked = isScholarshipTracked(activeSch.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Top Banner & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              100% Deterministic Engine
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Zero Black-Box LLM Inferences
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
            Eligibility Evidence Engine
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Audit documented requirements against your student record with direct source citations.
          </p>
        </div>

        {/* Scholarship Switcher Dropdown */}
        <div className="sm:w-72">
          <label className="block text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Audit Target Scholarship:
          </label>
          <select
            value={activeSch.id}
            onChange={(e) => onSelectScholarshipId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none cursor-pointer shadow-sm"
          >
            {scholarships.map((sch) => (
              <option key={sch.id} value={sch.id}>
                {sch.title} ({sch.organizer})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Executive Outcome Card */}
      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Outcome Header */}
        <div className="p-6 sm:p-8 border-b border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                {activeSch.organizer} • {activeSch.destinationCountries.join(', ')}
              </span>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {activeSch.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                <span>Verified: {activeSch.lastCheckedDate}</span>
                <span>•</span>
                <a
                  href={activeSch.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Official Program Source</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Outcome Result Badge & Bookmark */}
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-bold shadow-sm ${
                  report.status === 'likely_eligible'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40'
                    : report.status === 'ineligible'
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40'
                }`}
              >
                {report.status === 'likely_eligible' && <CheckCircle2 size={18} className="text-emerald-600" />}
                {report.status === 'ineligible' && <XCircle size={18} className="text-rose-600" />}
                {report.status === 'potentially_eligible' && <AlertTriangle size={18} className="text-amber-600" />}
                {report.status === 'insufficient_info' && <HelpCircle size={18} className="text-neutral-500" />}
                <span>{report.headline}</span>
              </div>

              {onOpenAdvisor && (
                <button
                  onClick={() => onOpenAdvisor(activeSch.id)}
                  className="px-3.5 py-2 rounded-2xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Consult AI Scholarship Advisor"
                >
                  <Sparkles size={14} />
                  <span>Strategic Advisor</span>
                </button>
              )}

              <button
                onClick={() => onTrackScholarship(activeSch.id)}
                className={`p-2.5 rounded-2xl border transition cursor-pointer ${
                  isTracked
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-black/[0.08] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isTracked ? 'Tracked in Applications' : 'Add to Application Tracker'}
              >
                <Bookmark size={18} fill={isTracked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Reasoning Narrative */}
          <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04]">
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {report.summaryReasoning}
            </p>
          </div>
        </div>

        {/* Explainable Criteria Match Score Breakdown */}
        <div className="p-6 sm:p-8 border-b border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/20 dark:bg-neutral-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                <Scale size={15} className="text-blue-600" />
                <span>Deterministic Criteria Match Score: {report.overallScore}/100</span>
              </div>
              <p className="text-xs text-neutral-500">
                Calculated strictly from documented program conditions. Not an admissions probability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase">Degree Level</span>
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                {report.scoreBreakdown.academicLevelFit}/25
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase">Nationality/Residence</span>
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                {report.scoreBreakdown.nationalityResidenceFit}/25
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase">Subject Scope</span>
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                {report.scoreBreakdown.subjectDisciplineFit}/20
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase">Academic Metrics</span>
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                {report.scoreBreakdown.academicThresholdFit}/20
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase">Funding Alignment</span>
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                {report.scoreBreakdown.fundingAlignmentFit}/10
              </span>
            </div>
          </div>
        </div>

        {/* Missing Profile Information Callout if any */}
        {report.missingProfileFields.length > 0 && (
          <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-amber-600 shrink-0" />
              <span>
                Missing profile criteria: <strong>{report.missingProfileFields.join(', ')}</strong>. Updating these will ensure complete deterministic verification.
              </span>
            </div>
            <button
              onClick={onOpenProfile}
              className="px-3 py-1 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition shrink-0 cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        )}

        {/* Line-by-Line Requirement Audits List */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Documented Requirement Audits
          </h3>

          <div className="space-y-4">
            {report.audits.map((item) => (
              <div
                key={item.requirementId}
                className="p-5 rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/40 dark:bg-neutral-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition space-y-3"
              >
                {/* Header & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.status === 'passed'
                          ? 'bg-emerald-500'
                          : item.status === 'warning'
                          ? 'bg-amber-500'
                          : item.status === 'failed'
                          ? 'bg-rose-500'
                          : 'bg-neutral-400'
                      }`}
                    />
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                      {item.label}
                    </h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-400">Status:</span>
                    <span
                      className={`font-semibold capitalize ${
                        item.status === 'passed'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : item.status === 'warning'
                          ? 'text-amber-600 dark:text-amber-400'
                          : item.status === 'failed'
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-neutral-500'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Values Comparison: Student vs Required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-black/[0.04] dark:border-white/[0.04]">
                    <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-0.5">
                      Your Profile Value
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {item.studentValue}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-black/[0.04] dark:border-white/[0.04]">
                    <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-0.5">
                      Documented Organizer Requirement
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {item.requiredValue}
                    </span>
                  </div>
                </div>

                {/* Plain English Reasoning */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.reasoning}
                </p>

                {/* Verifiable Official Source Quote */}
                <div className="p-3 rounded-xl bg-white dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] text-xs text-neutral-600 dark:text-neutral-400 italic flex items-start gap-2">
                  <span className="text-neutral-400 not-italic font-bold">&ldquo;</span>
                  <div className="flex-1">
                    <span>{item.officialQuote}</span>
                    <div className="mt-1 not-italic">
                      <a
                        href={item.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Official Source Link</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                  <span className="text-neutral-400 not-italic font-bold">&rdquo;</span>
                </div>

                {item.missingInfoNote && (
                  <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                    ⚠️ {item.missingInfoNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Required Application Documents Section */}
        {activeSch.requiredDocuments.length > 0 && (
          <div className="p-6 sm:p-8 border-t border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-neutral-950/40 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Official Required Application Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeSch.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.04] flex items-center gap-2"
                >
                  <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                  <span className="text-neutral-800 dark:text-neutral-200">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ethical Disclaimers Bar */}
        <div className="p-4 sm:p-6 bg-neutral-100/70 dark:bg-neutral-950/80 border-t border-black/[0.06] dark:border-white/[0.06] space-y-1 text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="font-semibold text-neutral-700 dark:text-neutral-300">
            Admissions Disclaimers & Integrity Notice:
          </div>
          {report.disclaimers.map((d, i) => (
            <p key={i}>• {d}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
