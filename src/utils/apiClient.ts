import { Scholarship, SourceRegistryEntry, IngestionLog } from '../types';

export interface ScholarshipQueryParams {
  search?: string;
  destinationCountry?: string;
  nationality?: string;
  academicLevel?: string;
  fundingType?: string;
  verificationStatus?: string;
  isDemonstration?: 'all' | 'real' | 'demo';
  page?: number;
  pageSize?: number;
  sortBy?: 'deadline' | 'title' | 'funding' | 'newest';
}

export interface ScholarshipQueryResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  results: Scholarship[];
  facets: {
    destinationCountries: { name: string; count: number }[];
    academicLevels: { name: string; count: number }[];
    fundingTypes: { name: string; count: number }[];
    verificationStatuses: { name: string; count: number }[];
    isDemonstration: { real: number; demo: number };
  };
}

export interface TelemetryResponse {
  totalIndexedOpportunities: number;
  destinationCountriesCount: number;
  destinationCountriesList: string[];
  eligibleNationalitiesRepresentedCount: number;
  totalSourcesRegistered: number;
  verifiedCount: number;
  demoCount: number;
  realCount: number;
  lastIngestionTimestamp: string;
  methodologyStatement: string;
}

export async function fetchScholarships(params: ScholarshipQueryParams = {}): Promise<ScholarshipQueryResponse | null> {
  try {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.destinationCountry && params.destinationCountry !== 'all') query.set('destinationCountry', params.destinationCountry);
    if (params.nationality && params.nationality !== 'all') query.set('nationality', params.nationality);
    if (params.academicLevel && params.academicLevel !== 'all') query.set('academicLevel', params.academicLevel);
    if (params.fundingType && params.fundingType !== 'all') query.set('fundingType', params.fundingType);
    if (params.verificationStatus && params.verificationStatus !== 'all') query.set('verificationStatus', params.verificationStatus);
    if (params.isDemonstration && params.isDemonstration !== 'all') query.set('isDemonstration', params.isDemonstration);
    if (params.page) query.set('page', String(params.page));
    if (params.pageSize) query.set('pageSize', String(params.pageSize));
    if (params.sortBy) query.set('sortBy', params.sortBy);

    const res = await fetch(`/api/scholarships?${query.toString()}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend /api/scholarships fetch failed, falling back to local client processing:', err);
  }
  return null;
}

export async function fetchTelemetry(): Promise<TelemetryResponse | null> {
  try {
    const res = await fetch('/api/telemetry');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend /api/telemetry fetch failed:', err);
  }
  return null;
}

export async function triggerSourceCrawl(sourceId: string): Promise<{
  success: boolean;
  message?: string;
  addedCount?: number;
  duplicateCount?: number;
  totalDatabaseSize?: number;
  log?: IngestionLog;
  error?: string;
}> {
  try {
    const res = await fetch(`/api/sources/${sourceId}/crawl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Crawler trigger failed' };
  }
}

export async function postBatchIngest(
  sourceName: string,
  records: any[],
  sourceRegistryId?: string
): Promise<{
  success: boolean;
  log?: IngestionLog;
  addedCount?: number;
  duplicateCount?: number;
  rejectedCount?: number;
  totalDatabaseSize?: number;
  records?: Scholarship[];
  error?: string;
}> {
  try {
    const res = await fetch('/api/scholarships/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceName, records, sourceRegistryId }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Ingestion request failed' };
  }
}

export async function registerNewSource(sourceData: Partial<SourceRegistryEntry>): Promise<{ success: boolean; source?: SourceRegistryEntry; error?: string }> {
  try {
    const res = await fetch('/api/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sourceData),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to register source' };
  }
}
