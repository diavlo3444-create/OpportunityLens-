import {
  Scholarship,
  StudentProfile,
  AdvisorResponse,
  AdvisorMinimalProfile,
  AdvisorMinimalScholarship,
} from '../types';
import { getPreGeneratedDemoResponse } from '../data/advisorDemoAnswers';

const ADVISOR_CACHE_STORAGE_KEY = 'opportunitylens_advisor_cache_v2';
const REQUEST_TIMEOUT_MS = 14000;
const MAX_TEMPORARY_RETRIES = 1;

/**
 * Generate a composite deterministic cache key based on:
 * 1. Normalized question
 * 2. Scholarship ID & version (updatedAt / deadline)
 * 3. Relevant student profile fields (nationality, academicLevel, gpa, intendedMajor)
 */
export function buildAdvisorCacheKey(
  question: string,
  sch: Scholarship,
  profile: StudentProfile
): string {
  const normQ = question.trim().toLowerCase().replace(/\s+/g, ' ');
  const schVer = sch.updatedAt || sch.deadlineDate || sch.deadline || 'v1';
  const primaryNat = profile.nationalities?.[0] || profile.countryOfResidence || 'any';
  const gpaStr = typeof profile.gpa === 'number' ? profile.gpa.toFixed(2) : '3.80';
  const majorStr = (profile.fieldOfStudy || 'general').trim().toLowerCase();
  const profKey = `${primaryNat}_${profile.academicLevel || 'any'}_${gpaStr}_${majorStr}`;
  return `adv_${sch.id}_${schVer}_${profKey}_${encodeURIComponent(normQ).slice(0, 80)}`;
}

/**
 * Read cached response from localStorage if present
 */
export function getCachedAdvice(cacheKey: string): AdvisorResponse | null {
  try {
    const raw = localStorage.getItem(ADVISOR_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const cacheMap = JSON.parse(raw);
    const item = cacheMap[cacheKey];
    if (item && item.response) {
      return {
        ...item.response,
        cached: true,
      };
    }
  } catch (err) {
    console.warn('Failed to read advisor cache:', err);
  }
  return null;
}

/**
 * Save successful advice to localStorage
 */
export function saveCachedAdvice(cacheKey: string, response: AdvisorResponse): void {
  try {
    const raw = localStorage.getItem(ADVISOR_CACHE_STORAGE_KEY);
    const cacheMap = raw ? JSON.parse(raw) : {};
    cacheMap[cacheKey] = {
      cacheKey,
      response: {
        ...response,
        cached: false,
      },
      savedAt: new Date().toISOString(),
    };
    // Keep cache reasonable (max 50 entries)
    const keys = Object.keys(cacheMap);
    if (keys.length > 50) {
      delete cacheMap[keys[0]];
    }
    localStorage.setItem(ADVISOR_CACHE_STORAGE_KEY, JSON.stringify(cacheMap));
  } catch (err) {
    console.warn('Failed to save advisor cache:', err);
  }
}

/**
 * Clear the advisor cache
 */
export function clearAdvisorCache(): void {
  try {
    localStorage.removeItem(ADVISOR_CACHE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear advisor cache:', err);
  }
}

/**
 * Minimize student profile: send strictly relevant fields
 */
export function buildMinimalProfile(profile: StudentProfile): AdvisorMinimalProfile {
  return {
    nationality: profile.nationalities?.[0] || 'Not specified',
    residenceCountry: profile.countryOfResidence || 'Not specified',
    academicLevel: profile.academicLevel,
    gpa: typeof profile.gpa === 'number' ? profile.gpa : 3.8,
    intendedMajor: profile.fieldOfStudy || 'Undecided',
    targetDestinationCountry: profile.intendedDestinationCountries?.[0],
    hasFinancialNeed: Boolean(profile.hasFinancialNeed),
  };
}

/**
 * Minimize scholarship record: send strictly verified fields
 */
export function buildMinimalScholarship(sch: Scholarship): AdvisorMinimalScholarship {
  return {
    id: sch.id,
    title: sch.title,
    provider: sch.provider,
    destinationCountries: sch.destinationCountries || [],
    academicLevels: sch.academicLevels || [],
    fundingType: sch.fundingType,
    tuitionCoverage: sch.tuitionCoverage,
    accommodationCoverage: sch.accommodationCoverage,
    stipendAndOtherBenefits: sch.stipendAndOtherBenefits || 'Stipend details as per official portal guidelines',
    deadline: sch.deadline,
    academicRequirements: sch.academicRequirements || [],
    requiredDocuments: sch.requiredDocuments || [],
    officialProgramUrl: sch.officialProgramUrl,
    updatedAt: sch.updatedAt,
  };
}

export interface AdvisorRequestResult {
  success: boolean;
  response?: AdvisorResponse;
  error?: string;
  errorCode?: 'CONFIG_MISSING' | 'QUOTA_EXHAUSTED' | 'SERVICE_UNAVAILABLE' | 'TIMEOUT_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN';
  canUseDemoFallback?: boolean;
}

/**
 * Check Advisor service connectivity & model info
 */
export async function getAdvisorHealth(): Promise<{
  ok: boolean;
  hasApiKey: boolean;
  model: string;
  isAvailable: boolean;
  setupHint?: string;
}> {
  try {
    const res = await fetch('/api/advisor/status', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return { ok: false, hasApiKey: false, model: 'gemini-2.5-flash', isAvailable: false };
    }
    const data = await res.json();
    return {
      ok: true,
      hasApiKey: Boolean(data.hasApiKey),
      model: data.model || 'gemini-2.5-flash',
      isAvailable: Boolean(data.hasApiKey),
      setupHint: typeof data.setupHint === 'string' ? data.setupHint : undefined,
    };
  } catch {
    return { ok: false, hasApiKey: false, model: 'gemini-2.5-flash', isAvailable: false };
  }
}

/**
 * Request strategic advice from the Advisor.
 * Features:
 * - Cache lookup before network call
 * - Demo mode bypass
 * - Minimal payload transmission
 * - 14s timeout via AbortController
 * - Maximum 1 retry on transient errors (503 / Network)
 */
export async function requestScholarshipAdvice(
  question: string,
  sch: Scholarship,
  profile: StudentProfile,
  forceDemoMode: boolean = false
): Promise<AdvisorRequestResult> {
  // 1. If user explicitly toggled Demo Mode, return pre-generated answer immediately (0 API calls)
  if (forceDemoMode) {
    const demoResp = getPreGeneratedDemoResponse(question, sch, profile);
    return {
      success: true,
      response: demoResp,
    };
  }

  // 2. Check local response cache (re-used only if question, profile, and scholarship record match)
  const cacheKey = buildAdvisorCacheKey(question, sch, profile);
  const cached = getCachedAdvice(cacheKey);
  if (cached) {
    return {
      success: true,
      response: cached,
    };
  }

  // 3. Prepare minimal request payload
  const minimalProfile = buildMinimalProfile(profile);
  const minimalSch = buildMinimalScholarship(sch);

  let attempts = 0;
  let lastError = 'Request failed';
  let lastErrorCode: AdvisorRequestResult['errorCode'] = 'NETWORK_ERROR';

  while (attempts <= MAX_TEMPORARY_RETRIES) {
    attempts++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          question,
          studentProfile: minimalProfile,
          scholarship: minimalSch,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const advisorResp: AdvisorResponse = {
          advice: data.advice,
          isDemo: false,
          model: data.model || 'gemini-2.5-flash',
          wordCount: data.wordCount || data.advice.trim().split(/\s+/).length,
          cached: false,
          timestamp: new Date().toISOString(),
          keyActionItems: data.keyActionItems || [
            `Verify deadlines on ${sch.provider} portal`,
            'Ensure recommendation letters match evaluation bylaws',
          ],
          sourceQuestion: question,
        };

        // Cache successful response locally
        saveCachedAdvice(cacheKey, advisorResp);

        return {
          success: true,
          response: advisorResp,
        };
      }

      // Handle non-200 responses
      const errJson = await response.json().catch(() => ({}));
      const status = response.status;

      if (status === 429) {
        return {
          success: false,
          errorCode: 'QUOTA_EXHAUSTED',
          error: 'Rate limit or AI monthly quota exceeded. You can switch to Demo Mode to view verified strategic guidance.',
          canUseDemoFallback: true,
        };
      }

      if (status === 503 || errJson.error === 'CONFIG_MISSING') {
        if (errJson.error === 'CONFIG_MISSING') {
          return {
            success: false,
            errorCode: 'CONFIG_MISSING',
            error: 'Server AI configuration is missing or inactive. Please toggle Demo Mode to explore pre-generated advisor answers.',
            canUseDemoFallback: true,
          };
        }
        lastErrorCode = 'SERVICE_UNAVAILABLE';
        lastError = errJson.message || 'Gemini service is temporarily unavailable (503).';
      } else {
        lastErrorCode = 'UNKNOWN';
        lastError = errJson.message || `Server returned error (${status})`;
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        lastErrorCode = 'TIMEOUT_ERROR';
        lastError = 'Advisor request timed out (exceeded 14s threshold).';
      } else {
        lastErrorCode = 'NETWORK_ERROR';
        lastError = err.message || 'Network error communicating with advisor server.';
      }
    }

    // If it's a transient error and we haven't exhausted attempts, wait briefly before retrying
    if (attempts <= MAX_TEMPORARY_RETRIES && (lastErrorCode === 'SERVICE_UNAVAILABLE' || lastErrorCode === 'NETWORK_ERROR')) {
      await new Promise((r) => setTimeout(r, 1200));
    } else {
      break;
    }
  }

  return {
    success: false,
    errorCode: lastErrorCode,
    error: lastError,
    canUseDemoFallback: true,
  };
}
