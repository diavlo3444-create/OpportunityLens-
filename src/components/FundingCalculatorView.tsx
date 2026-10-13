import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import { Opportunity, StudentProfile } from '../types';
import { calculateOpportunityFunding, UserCustomFundingExpenses } from '../utils/fundingCalculator';
import { AnimatedCounter } from './UiKit';

interface FundingCalculatorViewProps {
  opportunities: Opportunity[];
  studentProfile: StudentProfile;
  selectedOpportunityId?: string;
  onSelectOpportunityId: (id: string) => void;
}

export const FundingCalculatorView: React.FC<FundingCalculatorViewProps> = ({
  opportunities,
  studentProfile,
  selectedOpportunityId,
  onSelectOpportunityId,
}) => {
  const activeOpp =
    opportunities.find((o) => o.id === selectedOpportunityId) || opportunities[0];

  const [customExpenses, setCustomExpenses] = useState<UserCustomFundingExpenses>({
    customTravelCost: undefined,
    additionalScholarshipAwardUsd: 0,
  });

  const [showSliders, setShowSliders] = useState(false);

  const fundingResult = calculateOpportunityFunding(activeOpp, customExpenses);

  const handleResetOverrides = () => {
    setCustomExpenses({
      customTravelCost: undefined,
      additionalScholarshipAwardUsd: 0,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Transparent Financial Audit
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Cost Disaggregation Model
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-neutral-900 dark:text-white mt-1">
            Student Funding Calculator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Separate tuition from lodging, dining, flights, and hidden incidental expenses.
          </p>
        </div>

        {/* Opportunity Switcher */}
        <div className="sm:w-72">
          <label className="block text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Calculate for Opportunity:
          </label>
          <select
            value={activeOpp.id}
            onChange={(e) => {
              onSelectOpportunityId(e.target.value);
              handleResetOverrides();
            }}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none cursor-pointer shadow-sm"
          >
            {opportunities.map((opp) => (
              <option key={opp.id} value={opp.id}>
                {opp.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cost */}
        <div className="interactive-card p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Total Program Cost
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            $<AnimatedCounter value={fundingResult.totalEstimatedCostUsd} formatter={(v) => v.toLocaleString()} />
          </div>
          <span className="text-[11px] text-neutral-500">
            Full retail estimate
          </span>
        </div>

        {/* Confirmed Funding */}
        <div className="interactive-card p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Confirmed Funding
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            $<AnimatedCounter value={fundingResult.confirmedFundingUsd} formatter={(v) => v.toLocaleString()} />
          </div>
          <span className="text-[11px] text-neutral-500">
            Guaranteed sponsor grants
          </span>
        </div>

        {/* Remaining Uncovered */}
        <div className="interactive-card p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Out-of-Pocket Expense
          </span>
          <div className={`text-2xl sm:text-3xl font-bold ${fundingResult.uncoveredCostUsd === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-900 dark:text-white'}`}>
            $<AnimatedCounter value={fundingResult.uncoveredCostUsd} formatter={(v) => v.toLocaleString()} />
          </div>
          <span className="text-[11px] text-neutral-500">
            {fundingResult.uncoveredCostUsd === 0 ? '$0 cost to attend!' : 'Remaining student cost'}
          </span>
        </div>

        {/* Percentage Covered */}
        <div className="interactive-card p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brass dark:text-brass-lt">
            Coverage Rate
          </span>
          <div className="text-2xl sm:text-3xl font-display font-semibold text-brass dark:text-brass-lt">
            <AnimatedCounter value={fundingResult.coveragePercentage} />%
          </div>
          <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-brass dark:bg-brass-lt rounded-full transition-all duration-500 ease-out"
              style={{ width: `${fundingResult.coveragePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fully Funded Verification Banner */}
      <div
        className={`p-5 rounded-xl border ${
          fundingResult.isTrulyFullyFunded
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-200'
            : 'bg-neutral-100 dark:bg-neutral-900 border-black/[0.06] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-300'
        } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {fundingResult.isTrulyFullyFunded ? (
              <ShieldCheck className="text-emerald-600" size={20} />
            ) : (
              <Info className="text-amber-500" size={20} />
            )}
            <h3 className="font-bold text-sm sm:text-base">
              {fundingResult.isTrulyFullyFunded
                ? 'Strictly Verified as 100% Fully Funded'
                : 'Partially Funded / Travel or Lodging Excluded'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {activeOpp.funding.fundingTypeNote}
          </p>
        </div>

        {activeOpp.funding.stipendAmount && (
          <div className="px-3 py-2 rounded-2xl bg-white dark:bg-neutral-800 border border-black/[0.06] dark:border-white/[0.08] text-xs font-semibold shrink-0">
            💰 {activeOpp.funding.stipendAmount}
          </div>
        )}
      </div>

      {/* Itemized Financial Breakdown Table */}
      <div className="rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">
              Itemized Financial Breakdown
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Distinguishing confirmed organizer coverage from estimated student obligations.
            </p>
          </div>

          <button
            onClick={() => setShowSliders(!showSliders)}
            className="px-3.5 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>{showSliders ? 'Hide Custom Sliders' : 'Adjust My Expenses'}</span>
          </button>
        </div>

        {/* Custom Override Sliders if open */}
        {showSliders && (
          <div className="p-6 bg-neutral-50/70 dark:bg-neutral-950/50 border-b border-black/[0.06] dark:border-white/[0.06] space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Personal Flight & Outside Scholarship Adjustments:
              </span>
              <button
                onClick={handleResetOverrides}
                className="text-xs text-brass dark:text-brass-lt hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Reset to defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
                  Custom Travel / Flight Cost ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={customExpenses.customTravelCost ?? activeOpp.funding.travelEstimatedCostUsd}
                  onChange={(e) =>
                    setCustomExpenses({
                      ...customExpenses,
                      customTravelCost: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
                  Outside Grant / School Club Funding ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={customExpenses.additionalScholarshipAwardUsd ?? 0}
                  onChange={(e) =>
                    setCustomExpenses({
                      ...customExpenses,
                      additionalScholarshipAwardUsd: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Rows */}
        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {fundingResult.itemizedBreakdown.map((row, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/50 dark:hover:bg-white/[0.01] transition"
            >
              <div className="space-y-0.5 max-w-md">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">
                    {row.category}
                  </h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      row.status === 'Confirmed Covered'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                        : row.status === 'Partial / Need-based'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                        : row.status === 'Not Applicable'
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {row.notes}
                </p>
              </div>

              {/* Financial columns */}
              <div className="flex items-center gap-6 text-right text-xs shrink-0">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase font-medium">Estimated Cost</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    ${row.costUsd.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase font-medium">Covered</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    -${row.coveredUsd.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase font-medium">Out-of-Pocket</span>
                  <span className={`font-bold ${row.uncoveredUsd > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-neutral-400'}`}>
                    ${row.uncoveredUsd.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exclusions Footer */}
        {activeOpp.funding.financialExclusions.length > 0 && (
          <div className="p-5 bg-neutral-50 dark:bg-neutral-950/60 border-t border-black/[0.05] dark:border-white/[0.06] text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              Documented Expenses NOT Covered by the Program:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-neutral-500 dark:text-neutral-400">
              {activeOpp.funding.financialExclusions.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
