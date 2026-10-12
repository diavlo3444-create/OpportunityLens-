import { StudentProfile, ApplicationTrackerItem, Scholarship, SourceRegistryEntry, IngestionLog } from '../types';
import { GLOBAL_SCHOLARSHIPS } from '../data/scholarships';
import { INITIAL_SOURCE_REGISTRY } from '../data/sources';

const PROFILE_KEY = 'opportunitylens_student_profile';
const TRACKER_KEY = 'opportunitylens_tracker_items';
const CUSTOM_SCHOLARSHIPS_KEY = 'opportunitylens_custom_scholarships';
const SOURCES_KEY = 'opportunitylens_source_registry';
const INGESTION_LOGS_KEY = 'opportunitylens_ingestion_logs';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'student-demo-1',
  name: 'Alex Rivera',
  academicLevel: "Master's",
  grade: null,
  age: 22,
  countryOfResidence: 'Nigeria',
  nationalities: ['Nigeria'],
  intendedDestinationCountries: ['United Kingdom', 'United States', 'Germany', 'Canada'],
  fieldOfStudy: 'Public Policy & Sustainable Energy Economics',
  academicInterests: ['Public Policy', 'Development Economics', 'Renewable Energy', 'International Relations'],
  gpa: 3.85,
  academicAchievements: [
    'University Valedictorian (First Class Honours)',
    'Youth Delegate to UN Climate Conference',
    'Founder of Rural Clean Cookstove Initiative',
  ],
  standardizedTests: {
    gre: 324,
    toeflIelts: true,
  },
  fundingNeeds: {
    needsTuition: true,
    needsAccommodation: true,
    needsMeals: true,
    needsTravel: true,
    maxBudgetUsd: 500,
  },
  hasFinancialNeed: true,
  preferredFundingTypes: ['100% Fully Funded', 'Tuition Waiver'],
  onboardingCompleted: true,
};

export const INITIAL_TRACKER_ITEMS: ApplicationTrackerItem[] = [
  {
    id: 'track-1',
    opportunityId: 'sch-chevening-uk',
    status: 'preparing',
    checklist: [
      { id: 'chk-1', label: 'Draft 4 Chevening leadership and networking essays', completed: true },
      { id: 'chk-2', label: 'Request 2 reference letters from university professors', completed: true },
      { id: 'chk-3', label: 'Upload undergraduate degree certificate & transcripts', completed: true },
      { id: 'chk-4', label: 'Submit applications to 3 eligible UK university courses (Oxford, LSE, Cambridge)', completed: false },
      { id: 'chk-5', label: 'Submit Chevening portal application before November 5 deadline', completed: false },
    ],
    notes: 'Chevening requires return to country for 2 years. Ensure all 3 chosen UK master’s courses align with leadership career narrative.',
    targetSubmissionDate: '2026-11-01',
    dateAdded: '2026-10-01',
    lastUpdated: '2026-10-10',
  },
  {
    id: 'track-2',
    opportunityId: 'sch-gates-cambridge',
    status: 'researching',
    checklist: [
      { id: 'gates-chk-1', label: 'Identify potential research supervisor at Cambridge Faculty of Economics', completed: true },
      { id: 'gates-chk-2', label: 'Draft 500-word Gates Cambridge personal statement', completed: false },
      { id: 'gates-chk-3', label: 'Request Gates Cambridge referee reference', completed: false },
    ],
    notes: 'Gates Cambridge evaluates commitment to improving the lives of others alongside intellectual distinction.',
    targetSubmissionDate: '2026-11-25',
    dateAdded: '2026-10-05',
    lastUpdated: '2026-10-09',
  },
];

export function getStoredStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read student profile from localStorage:', e);
  }
  return INITIAL_STUDENT_PROFILE;
}

export function saveStoredStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Could not save student profile to localStorage:', e);
  }
}

export function getStoredTrackerItems(): ApplicationTrackerItem[] {
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read tracker items from localStorage:', e);
  }
  return INITIAL_TRACKER_ITEMS;
}

export function saveStoredTrackerItems(items: ApplicationTrackerItem[]): void {
  try {
    localStorage.setItem(TRACKER_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Could not save tracker items to localStorage:', e);
  }
}

// Custom / Ingested Scholarships Persistence
export function getAllScholarships(): Scholarship[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SCHOLARSHIPS_KEY);
    if (raw) {
      const customList: Scholarship[] = JSON.parse(raw);
      // Deduplicate by officialUrl and id
      const combined = [...GLOBAL_SCHOLARSHIPS];
      for (const item of customList) {
        if (!combined.some((c) => c.id === item.id || (c.officialUrl === item.officialUrl && c.officialUrl !== ''))) {
          combined.push(item);
        }
      }
      return combined;
    }
  } catch (e) {
    console.warn('Error reading custom scholarships:', e);
  }
  return GLOBAL_SCHOLARSHIPS;
}

export function saveCustomScholarships(customList: Scholarship[]): void {
  try {
    localStorage.setItem(CUSTOM_SCHOLARSHIPS_KEY, JSON.stringify(customList));
  } catch (e) {
    console.warn('Error saving custom scholarships:', e);
  }
}

export function getAllSources(): SourceRegistryEntry[] {
  try {
    const raw = localStorage.getItem(SOURCES_KEY);
    if (raw) {
      const stored: SourceRegistryEntry[] = JSON.parse(raw);
      const combined = [...INITIAL_SOURCE_REGISTRY];
      for (const s of stored) {
        if (!combined.some((c) => c.id === s.id)) {
          combined.push(s);
        }
      }
      return combined;
    }
  } catch (e) {
    console.warn('Error reading sources:', e);
  }
  return INITIAL_SOURCE_REGISTRY;
}

export function saveSources(sources: SourceRegistryEntry[]): void {
  try {
    localStorage.setItem(SOURCES_KEY, JSON.stringify(sources));
  } catch (e) {
    console.warn('Error saving sources:', e);
  }
}

// Ingestion Logs Persistence
export function getIngestionLogs(): IngestionLog[] {
  try {
    const raw = localStorage.getItem(INGESTION_LOGS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Error reading ingestion logs:', e);
  }
  return [
    {
      id: 'log-seed',
      timestamp: '2026-10-10 14:30:00',
      sourceName: 'Official Global Portals Seed Intake',
      totalAttempted: 12,
      addedCount: 12,
      updatedCount: 0,
      duplicateCount: 0,
      rejectedCount: 0,
      errors: [],
      status: 'Completed',
    },
  ];
}

export function saveIngestionLogs(logs: IngestionLog[]): void {
  try {
    localStorage.setItem(INGESTION_LOGS_KEY, JSON.stringify(logs));
  } catch (e) {
    console.warn('Error saving ingestion logs:', e);
  }
}

export function calculateProfileCompletion(profile: StudentProfile): number {
  let score = 0;
  const total = 9;

  if (profile.name && profile.name.trim().length > 0) score++;
  if (profile.academicLevel) score++;
  if (profile.age !== null && profile.age !== undefined) score++;
  if (profile.countryOfResidence && profile.countryOfResidence.trim().length > 0) score++;
  if (profile.nationalities && profile.nationalities.length > 0) score++;
  if (profile.fieldOfStudy && profile.fieldOfStudy.trim().length > 0) score++;
  if (profile.gpa !== null && profile.gpa !== undefined) score++;
  if (profile.fundingNeeds) score++;
  if (profile.intendedDestinationCountries && profile.intendedDestinationCountries.length > 0) score++;

  return Math.round((score / total) * 100);
}
