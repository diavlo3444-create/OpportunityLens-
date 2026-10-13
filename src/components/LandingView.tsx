import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  Sparkles,
  Globe2,
  Target,
  CalendarClock,
} from 'lucide-react';
import { Scholarship, StudentProfile } from '../types';
import { evaluateStudentEligibility } from '../utils/eligibilityEngine';
import { Badge, surface } from './UiKit';

interface LandingViewProps {
  scholarships: Scholarship[];
  onStartMatching: () => void;
  onExploreOpportunities: () => void;
  onViewReport: (opportunityId: string) => void;
  onOpenAdvisor?: (opportunityId: string) => void;
  studentProfile: StudentProfile;
}

const daysUntil = (iso: string): number | null => {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.ceil((t - Date.now()) / 86_400_000);
};

const DeadlineChip: React.FC<{ deadline: string; deadlineDate: string }> = ({
  deadline,
  deadlineDate,
}) => {
  const d = daysUntil(deadlineDate);
  if (d === null)
    return <span className="text-[11px] text-neutral-500 dark:text-neutral-400">{deadline}</span>;
  if (d < 0)
    return <Badge variant="neutral">Closed</Badge>;
  if (d <= 14)
    return <Badge variant="danger">{d === 0 ? 'Closes today' : `Closes in ${d}d`}</Badge>;
  if (d <= 45) return <Badge variant="brass">{d}d left</Badge>;
  return <Badge variant="neutral">{d}d left</Badge>;
};

export const LandingView: React.FC<LandingViewProps> = ({
  scholarships,
  onStartMatching,
  onExploreOpportunities,
  onViewReport,
  onOpenAdvisor,
  studentProfile,
}) => {
  // Deterministic top matches for this profile — the dashboard's core value.
  const topMatches = React.useMemo(() => {
    return scholarships
      .map((s) => ({ scholarship: s, report: evaluateStudentEligibility(studentProfile, s) }))
      .sort((a, b) => b.report.overallScore - a.report.overallScore)
      .slice(0, 3);
  }, [scholarships, studentProfile]);

  const sampleOpp = scholarships[0];
  const previewReport = React.useMemo(
    () => (sampleOpp ? evaluateStudentEligibility(studentProfile, sampleOpp) : null),
    [studentProfile, sampleOpp]
  );

  const pillars = [
    {
      n: '01',
      icon: Globe2,
      title: 'Global Source Registry',
      body: 'Official funding portals from government ministries — UK Chevening, US Fulbright, German DAAD, Campus France, MEXT — and leading world universities, cataloged with bylaws.',
    },
    {
      n: '02',
      icon: ShieldCheck,
      title: 'Deterministic Matching',
      body: 'No black-box guessing. Qualification rules are evaluated with transparent software logic that cites the exact official passage behind every verdict.',
    },
    {
      n: '03',
      icon: Receipt,
      title: 'Cost Disaggregation',
      body: 'Tuition coverage is separated from housing, meals, round-trip flights and visa costs, so the real price of every program is visible up front.',
    },
    {
      n: '04',
      icon: Sparkles,
      title: 'Reliable AI Advisor',
      body: 'Concise, cached strategic guidance from Gemini Flash — with an offline demo archive so advice is available even during provider outages.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16 space-y-16 lg:space-y-24">
      {/* ================================================================
          1 · Editorial hero — asymmetric, left-aligned, with a live
          "strongest matches" panel derived from the student profile.
         ================================================================ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass/25 dark:border-brass-lt/25 bg-brass-tint dark:bg-brass-lt/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brass dark:text-brass-lt">
            <Globe2 size={13} />
            <span>Global Scholarship Index</span>
          </div>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05] text-ink dark:text-white">
            Find the scholarships you
            <span className="block text-brass dark:text-brass-lt">actually qualify for.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-soft dark:text-neutral-400">
            OpportunityLens evaluates your profile against documented official requirements with
            deterministic, explainable rules — citing verified bylaws, separating tuition from
            living costs, and never guessing.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartMatching}
              className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-ink text-paper dark:bg-paper dark:text-ink text-sm font-semibold shadow-md hover:bg-ink-soft dark:hover:bg-neutral-200 active:scale-[0.98]"
            >
              Set my student profile
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={onExploreOpportunities}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-black/[0.1] dark:border-white/[0.14] bg-white/70 dark:bg-white/[0.04] text-sm font-semibold text-ink dark:text-neutral-100 hover:border-black/25 dark:hover:border-white/25 backdrop-blur-xs"
            >
              Explore all {scholarships.length} programs
            </button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-soft dark:text-neutral-400">
            {[
              '100% deterministic rules',
              'Zero hallucinated requirements',
              'Authoritative source registry',
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Live strongest-matches panel */}
        <aside className="lg:col-span-5 w-full">
          <div className={`${surface.card} overflow-hidden`}>
            <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.07] px-5 py-3.5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brass dark:text-brass-lt">
                <Target size={13} />
                Matched to your profile
              </div>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Criteria fit
              </span>
            </div>

            {topMatches.length === 0 ? (
              <div className="px-5 py-8 text-center text-[13px] text-ink-soft dark:text-neutral-400">
                No scholarships loaded yet.
              </div>
            ) : (
              <ul className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                {topMatches.map(({ scholarship: s, report }) => (
                  <li key={s.id}>
                    <button
                      onClick={() => onViewReport(s.id)}
                      className="group flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.025] dark:hover:bg-white/[0.04]"
                    >
                      <div className="font-display text-lg font-semibold tabular-nums text-brass dark:text-brass-lt leading-none mt-0.5 w-9 shrink-0 text-right">
                        {report.overallScore}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] font-semibold leading-snug text-ink dark:text-white group-hover:text-brass dark:group-hover:text-brass-lt transition-colors line-clamp-2">
                          {s.title}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                          <span className="truncate max-w-[11rem]">{s.provider}</span>
                          <DeadlineChip deadline={s.deadline} deadlineDate={s.deadlineDate} />
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="mt-1 shrink-0 text-neutral-300 dark:text-neutral-600 group-hover:text-brass transition-colors"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={onExploreOpportunities}
              className="w-full border-t border-black/[0.06] dark:border-white/[0.07] px-5 py-3 text-[12.5px] font-semibold text-ink dark:text-neutral-200 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
            >
              Browse the full directory →
            </button>
          </div>
        </aside>
      </section>

      {/* ================================================================
          2 · Live evidence preview of the eligibility engine
         ================================================================ */}
      {sampleOpp && previewReport && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 max-w-4xl mx-auto">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brass dark:text-brass-lt">
                Deterministic Evidence Preview
              </div>
              <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white">
                Every verdict, traced to its source
              </h2>
              <p className="mt-1 text-sm text-ink-soft dark:text-neutral-400">
                Live rule audit for{' '}
                <strong className="font-semibold text-ink dark:text-neutral-200">
                  {sampleOpp.title}
                </strong>
              </p>
            </div>
          </div>

          <div className={`max-w-4xl mx-auto ${surface.card} overflow-hidden`}>
            {/* Card meta */}
            <div className="border-b border-black/[0.06] dark:border-white/[0.07] px-6 sm:px-8 py-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {sampleOpp.provider}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-white mt-0.5">
                    {sampleOpp.title}
                  </h3>
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-semibold ${
                    previewReport.status === 'likely_eligible'
                      ? 'border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : previewReport.status === 'ineligible'
                        ? 'border-red-200/70 bg-red-50 text-red-700 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-400'
                        : 'border-brass/25 bg-brass-tint text-brass-strong dark:border-brass-lt/25 dark:bg-brass-lt/10 dark:text-brass-lt'
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>{previewReport.headline}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-ink-soft dark:text-neutral-400">
                {previewReport.summaryReasoning}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/[0.05] dark:border-white/[0.06] pt-4 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-display font-semibold text-ink dark:text-neutral-200">
                  Criteria match {previewReport.overallScore}/100
                </span>
                <span>Level {previewReport.scoreBreakdown.academicLevelFit}/25</span>
                <span>Nationality {previewReport.scoreBreakdown.nationalityResidenceFit}/25</span>
                <span>Subject {previewReport.scoreBreakdown.subjectDisciplineFit}/20</span>
                <span>Academics {previewReport.scoreBreakdown.academicThresholdFit}/20</span>
              </div>
            </div>

            {/* Evidence rows */}
            <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06] px-6 sm:px-8">
              {previewReport.audits.slice(0, 3).map((item) => (
                <div key={item.requirementId} className="py-5 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          item.status === 'passed'
                            ? 'bg-emerald-500'
                            : item.status === 'warning'
                              ? 'bg-brass dark:bg-brass-lt'
                              : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm font-semibold text-ink dark:text-white">
                        {item.label}
                      </span>
                    </div>
                    <span className="rounded-md bg-black/[0.05] px-2.5 py-1 text-xs font-medium text-ink-soft dark:bg-white/[0.07] dark:text-neutral-300">
                      Your profile: {item.studentValue}
                    </span>
                  </div>

                  <p className="text-[13px] leading-relaxed text-ink-soft dark:text-neutral-400">
                    {item.reasoning}
                  </p>

                  <blockquote className="border-l-2 border-brass/40 dark:border-brass-lt/40 bg-black/[0.025] dark:bg-white/[0.03] rounded-r-md px-3.5 py-2.5 text-xs italic leading-relaxed text-neutral-600 dark:text-neutral-400">
                    &ldquo;{item.officialQuote}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>

            {/* Action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02] px-6 sm:px-8 py-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {onOpenAdvisor && (
                  <button
                    onClick={() => onOpenAdvisor(sampleOpp.id)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-brass/30 dark:border-brass-lt/30 bg-brass-tint dark:bg-brass-lt/10 px-3.5 text-xs font-semibold text-brass-strong transition-colors hover:bg-brass/10 dark:text-brass-lt dark:hover:bg-brass-lt/15"
                  >
                    <Sparkles size={13} />
                    Consult Advisor
                  </button>
                )}

                <button
                  onClick={() => onViewReport(sampleOpp.id)}
                  className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-4 text-xs font-semibold text-paper transition-colors hover:bg-ink-soft dark:bg-paper dark:text-ink dark:hover:bg-neutral-200"
                >
                  View full audit
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <span className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                <CalendarClock size={12} />
                Deadline: {sampleOpp.deadline}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          3 · Architecture pillars — numbered, uniform brass tiles
         ================================================================ */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brass dark:text-brass-lt">
            How it works
          </div>
          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Architecture of OpportunityLens
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-neutral-400">
            Engineered around verifiable evidence, authoritative government decrees, and resilient
            strategic AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.n}
                className={`${surface.card} group p-5 transition-colors hover:border-brass/30 dark:hover:border-brass-lt/30`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brass-tint text-brass dark:bg-brass-lt/10 dark:text-brass-lt">
                    <Icon size={17} />
                  </div>
                  <span className="font-display text-xs font-semibold tabular-nums text-neutral-300 dark:text-neutral-600 group-hover:text-brass/70 dark:group-hover:text-brass-lt/60 transition-colors">
                    {p.n}
                  </span>
                </div>
                <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft dark:text-neutral-400">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================
          4 · Closing CTA
         ================================================================ */}
      <section className="max-w-4xl mx-auto rounded-2xl bg-ink px-6 sm:px-12 py-12 text-center text-paper dark:bg-white/[0.05] dark:border dark:border-white/[0.09]">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brass-lt">
          Every level · Every continent
        </div>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white dark:text-white">
          From high-school research programs to PhD fellowships
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 dark:text-neutral-400">
          Undergraduate full rides, Master’s funding, and doctoral awards worldwide — one
          directory, one deterministic evidence engine.
        </p>
        <button
          onClick={onExploreOpportunities}
          className="group mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-paper px-7 text-sm font-semibold text-ink transition-colors hover:bg-white dark:bg-brass-lt dark:text-ink dark:hover:bg-brass"
        >
          Open scholarship directory
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>
    </div>
  );
};
