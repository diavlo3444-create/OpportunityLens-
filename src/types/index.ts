export type AcademicLevel =
  | 'High School'
  | 'Undergraduate'
  | "Master's"
  | 'Doctoral / PhD'
  | 'Postdoctoral & Research';

export type ProviderType =
  | 'National Government'
  | 'Regional Government'
  | 'Government Ministry'
  | 'Public University'
  | 'Private University'
  | 'Charity / Foundation'
  | 'Philanthropic Trust'
  | 'International Agency'
  | 'Multilateral Organization'
  | 'Corporate / Private';

export type ScholarshipFundingType =
  | '100% Fully Funded'
  | 'Tuition Waiver'
  | 'Partial Tuition'
  | 'Monthly Stipend'
  | 'Partial';

export type VerificationStatus =
  | 'Officially Verified'
  | 'Pending Audit'
  | 'Needs Source Refresh'
  | 'Stale';

export type DeliveryFormat = 'In-person' | 'Hybrid' | 'Virtual';

export interface OpportunityRequirement {
  id: string;
  category: 'academic_level' | 'age' | 'grade' | 'nationality' | 'residence' | 'academics' | 'financial_need' | 'subject';
  label: string;
  ruleDescription: string;
  officialSourceQuote: string;
  isHardRequirement: boolean;
}

export interface OpportunityFundingBreakdown {
  tuitionUsd: number;
  accommodationUsd: number;
  mealsUsd: number;
  travelUsd: number;
  visaInsuranceUsd: number;
  stipendUsd: number;
  otherUsd: number;
  isFullyFunded: boolean;
  tuitionCovered: boolean;
  accommodationCovered: boolean;
  mealsCovered: boolean;
  travelCovered: boolean;
  visaInsuranceCovered: boolean;
  stipendAmount?: string;
  fundingTypeNote: string;
  financialExclusions: string[];

  // Backward compatibility aliases
  tuitionEstimatedCostUsd?: number;
  accommodationEstimatedCostUsd?: number;
  mealsEstimatedCostUsd?: number;
  travelEstimatedCostUsd?: number;
  visaInsuranceEstimatedCostUsd?: number;
  otherEstimatedCostUsd?: number;
  stipendValueUsd?: number;
}

export interface Scholarship {
  // Section 5 Specification fields
  id: string;
  title: string;
  provider: string; // Sponsoring body
  providerType: ProviderType;
  officialProgramUrl: string;
  officialApplicationUrl: string | null;
  eligibleNationalities: string[]; // List of country codes or country names
  eligibleResidenceCountries: string[];
  destinationCountries: string[]; // List of country codes or country names where study takes place
  academicLevels: AcademicLevel[];
  minAge: number | null;
  maxAge: number | null;
  eligibleGrades: number[];
  subjectRestrictions: string[]; // e.g. ["All Disciplines"] or specific subjects
  academicRequirements: string[];
  meritOrNeedRequirements: string[];
  minGpa: number | null;
  awardAmountAndCurrency: string | null;
  tuitionCoverage: '100% Full Tuition' | 'Partial Tuition' | 'Tuition Waiver' | 'None' | 'Not Stated';
  accommodationCoverage: 'Provided Dormitory' | 'Housing Allowance' | 'Partially Subsidized' | 'None' | 'Not Stated';
  mealCoverage: 'Full Board / Meal Plan' | 'Meal Allowance' | 'None' | 'Not Stated';
  travelCoverage: 'Return Flights Booked' | 'Fixed Airfare Allowance' | 'None' | 'Not Stated';
  stipendAndOtherBenefits: string | null;
  programDuration: string;
  openingDate: string | null;
  deadline: string;
  deadlineDate: string; // ISO date YYYY-MM-DD
  requiredDocuments: string[];
  languageRequirements: string[];
  sourceLanguage: string;
  extractedEvidence: string; // Exact excerpt from official decree/terms
  lastVerifiedTimestamp: string;
  dataProvenance: string; // e.g. "Direct ingest from UK FCDO Chevening decree portal"
  verificationStatus: VerificationStatus;
  isDemonstration: boolean; // false for real records
  sourceRegistryId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];

  // Backward-compatibility aliases
  organizer: string;
  officialUrl: string;
  category: string;
  badge: string;
  summary: string;
  description: string;
  location: string;
  format: DeliveryFormat;
  dates: string;
  duration: string;
  fundingType: string;
  fundingAmountPublished?: string;
  funding: OpportunityFundingBreakdown;
  requirementsList: OpportunityRequirement[];
  lastCheckedDate: string;
  sourceType: string;
  sourceUrl: string;
  eligibleSubjects?: string[];
}

// Backward-compatible alias
export type Opportunity = Scholarship;

export interface SourceRegistryEntry {
  id: string;
  name: string;
  organizationType:
    | 'Government Ministry'
    | 'Public University'
    | 'Private University'
    | 'Philanthropic Trust'
    | 'Multilateral Organization'
    | 'Regional Government';
  officialPortalUrl: string;
  country: string;
  languages: string[];
  targetRegion: string;
  accessMethod: 'Official Webpage Intake' | 'Structured Feed / Open Data' | 'Ministry API Connector' | 'Manual Verified Intake';
  ingestedRecordsCount: number;
  lastCheckedDate: string;
  updateCadence: 'Monthly' | 'Quarterly' | 'Bi-annual' | 'Annual' | 'Manual Intake';
  status: 'Active' | 'Needs Review' | 'Deprecated';
  notes: string;
}

export interface IngestionLog {
  id: string;
  timestamp: string;
  sourceName: string;
  totalAttempted: number;
  addedCount: number;
  updatedCount: number;
  duplicateCount: number;
  rejectedCount: number;
  errors: string[];
  status: 'Completed' | 'Completed with Warnings' | 'Failed';
}

export interface StudentProfile {
  id: string;
  name: string;
  academicLevel: AcademicLevel;
  grade: number | null;
  age: number | null;
  countryOfResidence: string; // ISO code or country name
  nationalities: string[]; // ISO codes or country names
  intendedDestinationCountries: string[]; // ISO codes or country names
  fieldOfStudy: string;
  academicInterests: string[];
  gpa: number | null;
  academicAchievements: string[];
  standardizedTests: {
    sat?: number;
    gre?: number;
    toeflIelts?: boolean;
    hasApOrIb?: boolean;
  };
  fundingNeeds: {
    needsTuition: boolean;
    needsAccommodation: boolean;
    needsMeals: boolean;
    needsTravel: boolean;
    maxBudgetUsd: number;
  };
  hasFinancialNeed: boolean | null;
  preferredFundingTypes?: string[];
  onboardingCompleted: boolean;
}

export type EligibilityStatus =
  | 'likely_eligible'
  | 'potentially_eligible'
  | 'ineligible'
  | 'insufficient_info';

export interface RequirementAuditItem {
  requirementId: string;
  category: string;
  label: string;
  status: 'passed' | 'failed' | 'warning' | 'unknown';
  studentValue: string;
  requiredValue: string;
  reasoning: string;
  officialQuote: string;
  officialSourceUrl: string;
  missingInfoNote?: string;
}

export interface MatchScoreBreakdown {
  academicLevelFit: number; // 0 to 25
  nationalityResidenceFit: number; // 0 to 25
  subjectDisciplineFit: number; // 0 to 20
  academicThresholdFit: number; // 0 to 20
  fundingAlignmentFit: number; // 0 to 10
}

export interface EligibilityReport {
  opportunityId: string;
  opportunityTitle: string;
  status: EligibilityStatus;
  overallScore: number; // 0 to 100
  scoreBreakdown: MatchScoreBreakdown;
  scoreExplanation: string;
  headline: string;
  summaryReasoning: string;
  audits: RequirementAuditItem[];
  missingProfileFields: string[];
  disclaimers: string[];
  lastEvaluatedAt: string;
}

export type ApplicationStatus =
  | 'saved'
  | 'researching'
  | 'preparing'
  | 'submitted'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export interface ApplicationTrackerItem {
  id: string;
  opportunityId: string;
  status: ApplicationStatus;
  checklist: {
    id: string;
    label: string;
    completed: boolean;
    dueDate?: string;
  }[];
  notes: string;
  targetSubmissionDate?: string;
  dateAdded: string;
  lastUpdated: string;
}

export interface FundingCalculationResult {
  totalEstimatedCostUsd: number;
  confirmedFundingUsd: number;
  unconfirmedFundingUsd: number;
  uncoveredCostUsd: number;
  coveragePercentage: number;
  isTrulyFullyFunded: boolean;
  itemizedBreakdown: {
    category: string;
    costUsd: number;
    coveredUsd: number;
    uncoveredUsd: number;
    status: 'Confirmed Covered' | 'Student Expense' | 'Partial / Need-based' | 'Not Applicable';
    notes: string;
  }[];
}

// Global Coverage Dashboard Metrics (Section 7)
export interface CoverageMetrics {
  totalIndexedOpportunities: number;
  uniqueProvidersCount: number;
  destinationCountriesRepresentedCount: number;
  eligibleNationalitiesRepresentedCount: number;
  academicLevelBreakdown: Record<AcademicLevel, number>;
  fundingTypeBreakdown: Record<string, number>;
  verifiedOfficialUrlCount: number;
  verifiedDeadlineCount: number;
  completeFundingCount: number;
  needsReviewCount: number;
  staleRecordCount: number;
  connectedSourcesCount: number;
  lastIngestionTimestamp: string;
  failedIngestionJobsCount: number;
  countryCoverageMap: Record<string, { count: number; name: string; region: string }>;
}

// AI Scholarship Advisor Types
export interface AdvisorMinimalProfile {
  nationality: string;
  residenceCountry: string;
  academicLevel: AcademicLevel;
  gpa: number;
  intendedMajor: string;
  targetDestinationCountry?: string;
  hasFinancialNeed?: boolean;
}

export interface AdvisorMinimalScholarship {
  id: string;
  title: string;
  provider: string;
  destinationCountries: string[];
  academicLevels: string[];
  fundingType: string;
  tuitionCoverage: string;
  accommodationCoverage: string;
  stipendAndOtherBenefits: string;
  deadline: string;
  academicRequirements: string[];
  requiredDocuments: string[];
  officialProgramUrl: string;
  updatedAt?: string;
}

export interface AdvisorResponse {
  advice: string;
  isDemo: boolean;
  model: string;
  wordCount: number;
  cached: boolean;
  timestamp: string;
  keyActionItems?: string[];
  sourceQuestion: string;
}

export interface AdvisorCacheEntry {
  cacheKey: string;
  response: AdvisorResponse;
  savedAt: string;
}
