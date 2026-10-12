import { Opportunity, FundingCalculationResult } from '../types';

export interface UserCustomFundingExpenses {
  customTuitionCost?: number;
  customAccommodationCost?: number;
  customMealsCost?: number;
  customTravelCost?: number;
  customVisaInsuranceCost?: number;
  customOtherCost?: number;
  additionalScholarshipAwardUsd?: number;
}

export function calculateOpportunityFunding(
  opportunity: Opportunity,
  customExpenses?: UserCustomFundingExpenses
): FundingCalculationResult {
  const f = opportunity.funding;

  // Use opportunity values or student custom overrides if student lives further / has custom flight cost
  const tuitionCost =
    customExpenses?.customTuitionCost ?? (f.tuitionUsd || f.tuitionEstimatedCostUsd || 0);
  const accommodationCost =
    customExpenses?.customAccommodationCost ?? (f.accommodationUsd || f.accommodationEstimatedCostUsd || 0);
  const mealsCost =
    customExpenses?.customMealsCost ?? (f.mealsUsd || f.mealsEstimatedCostUsd || 0);
  const travelCost =
    customExpenses?.customTravelCost ?? (f.travelUsd || f.travelEstimatedCostUsd || 0);
  const visaInsuranceCost =
    customExpenses?.customVisaInsuranceCost ?? (f.visaInsuranceUsd || f.visaInsuranceEstimatedCostUsd || 0);
  const otherCost =
    customExpenses?.customOtherCost ?? (f.otherUsd || f.otherEstimatedCostUsd || 0);

  const totalEstimatedCostUsd =
    tuitionCost + accommodationCost + mealsCost + travelCost + visaInsuranceCost + otherCost;

  let confirmedFundingUsd = 0;
  let unconfirmedFundingUsd = 0;

  // 1. Tuition
  const tuitionCoveredAmount = f.tuitionCovered ? tuitionCost : 0;
  confirmedFundingUsd += tuitionCoveredAmount;

  // 2. Accommodation
  const accommodationCoveredAmount = f.accommodationCovered ? accommodationCost : 0;
  confirmedFundingUsd += accommodationCoveredAmount;

  // 3. Meals
  const mealsCoveredAmount = f.mealsCovered ? mealsCost : 0;
  confirmedFundingUsd += mealsCoveredAmount;

  // 4. Travel
  const travelCoveredAmount = f.travelCovered ? travelCost : 0;
  confirmedFundingUsd += travelCoveredAmount;

  // 5. Visa & Insurance
  const visaInsuranceCoveredAmount = f.visaInsuranceCovered ? visaInsuranceCost : 0;
  confirmedFundingUsd += visaInsuranceCoveredAmount;

  // Stipend / External Award
  const stipendVal = f.stipendUsd || f.stipendValueUsd || 0;
  if (stipendVal > 0) {
    confirmedFundingUsd += stipendVal;
  }

  if (customExpenses?.additionalScholarshipAwardUsd && customExpenses.additionalScholarshipAwardUsd > 0) {
    confirmedFundingUsd += customExpenses.additionalScholarshipAwardUsd;
  }

  // Need-based or estimated travel grants if not fully guaranteed
  if (!f.travelCovered && f.stipendAmount && f.stipendAmount.toLowerCase().includes('need-based')) {
    unconfirmedFundingUsd += Math.min(travelCost, 500);
  }

  const netCoveredUsd = confirmedFundingUsd;
  const uncoveredCostUsd = Math.max(0, totalEstimatedCostUsd - netCoveredUsd);
  const coveragePercentage =
    totalEstimatedCostUsd > 0
      ? Math.min(100, Math.round((netCoveredUsd / totalEstimatedCostUsd) * 100))
      : 100;

  // Strict Fully Funded Rule: must have uncovered cost equal to 0 and all core categories covered
  const isTrulyFullyFunded =
    uncoveredCostUsd === 0 &&
    f.tuitionCovered &&
    (accommodationCost === 0 || f.accommodationCovered) &&
    (mealsCost === 0 || f.mealsCovered);

  const itemizedBreakdown: FundingCalculationResult['itemizedBreakdown'] = [
    {
      category: 'Tuition & Academic Program Fee',
      costUsd: tuitionCost,
      coveredUsd: tuitionCoveredAmount,
      uncoveredUsd: tuitionCost - tuitionCoveredAmount,
      status: f.tuitionCovered ? 'Confirmed Covered' : 'Student Expense',
      notes: f.tuitionCovered
        ? '100% cost-free tuition funded by program endowment / sponsors.'
        : 'Tuition fee required unless specific institutional aid is requested.',
    },
    {
      category: 'Housing & Dormitory Accommodation',
      costUsd: accommodationCost,
      coveredUsd: accommodationCoveredAmount,
      uncoveredUsd: accommodationCost - accommodationCoveredAmount,
      status:
        accommodationCost === 0
          ? 'Not Applicable'
          : f.accommodationCovered
          ? 'Confirmed Covered'
          : 'Student Expense',
      notes:
        accommodationCost === 0
          ? 'Virtual program; no housing costs.'
          : f.accommodationCovered
          ? 'Campus residence hall lodging provided at no charge.'
          : 'Student must arrange local room/board or commute.',
    },
    {
      category: 'Meals & Dining Hall Plan',
      costUsd: mealsCost,
      coveredUsd: mealsCoveredAmount,
      uncoveredUsd: mealsCost - mealsCoveredAmount,
      status:
        mealsCost === 0
          ? 'Not Applicable'
          : f.mealsCovered
          ? 'Confirmed Covered'
          : 'Student Expense',
      notes:
        mealsCost === 0
          ? 'Virtual program; no meal plan.'
          : f.mealsCovered
          ? 'Full meal plan included during program dates.'
          : 'Self-catered or dining card purchase required.',
    },
    {
      category: 'Travel & Airfare / Transit',
      costUsd: travelCost,
      coveredUsd: travelCoveredAmount,
      uncoveredUsd: travelCost - travelCoveredAmount,
      status:
        travelCost === 0
          ? 'Not Applicable'
          : f.travelCovered
          ? 'Confirmed Covered'
          : f.stipendAmount?.toLowerCase().includes('travel')
          ? 'Partial / Need-based'
          : 'Student Expense',
      notes:
        travelCost === 0
          ? 'Virtual program; $0 transit.'
          : f.travelCovered
          ? 'Round-trip airfare or travel allowance fully booked/reimbursed.'
          : f.stipendAmount?.toLowerCase().includes('travel')
          ? 'Need-based travel subsidies available upon request after admission.'
          : 'Student is responsible for transit to the host campus.',
    },
    {
      category: 'Visa, Health & Travel Insurance',
      costUsd: visaInsuranceCost,
      coveredUsd: visaInsuranceCoveredAmount,
      uncoveredUsd: visaInsuranceCost - visaInsuranceCoveredAmount,
      status:
        visaInsuranceCost === 0
          ? 'Not Applicable'
          : f.visaInsuranceCovered
          ? 'Confirmed Covered'
          : 'Student Expense',
      notes:
        visaInsuranceCost === 0
          ? 'Domestic or virtual program.'
          : f.visaInsuranceCovered
          ? 'Comprehensive overseas health insurance included.'
          : 'Student responsible for insurance or visa stamp fees.',
    },
    {
      category: 'Incidental Supplies & Personal Expenses',
      costUsd: otherCost,
      coveredUsd: 0,
      uncoveredUsd: otherCost,
      status: otherCost === 0 ? 'Not Applicable' : 'Student Expense',
      notes:
        otherCost === 0
          ? 'No additional required fees.'
          : 'Personal spending money, books, and laundry.',
    },
  ];

  return {
    totalEstimatedCostUsd,
    confirmedFundingUsd,
    unconfirmedFundingUsd,
    uncoveredCostUsd,
    coveragePercentage,
    isTrulyFullyFunded,
    itemizedBreakdown,
  };
}
