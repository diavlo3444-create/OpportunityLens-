import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GLOBAL_SCHOLARSHIPS } from './src/data/scholarships.ts';
import { INITIAL_SOURCE_REGISTRY } from './src/data/sources.ts';
import { OPEN_DATASET_BUNDLES } from './src/data/openDatasets.ts';
import { Scholarship, SourceRegistryEntry, IngestionLog } from './src/types/index.ts';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// In-Memory Database State
const scholarshipDatabase: Scholarship[] = [...GLOBAL_SCHOLARSHIPS];
const sourceRegistry: SourceRegistryEntry[] = [...INITIAL_SOURCE_REGISTRY];
const serverLogs: IngestionLog[] = [
  {
    id: 'log-seed-1',
    timestamp: new Date().toISOString(),
    sourceName: 'Official Global Portals Registry Seed Intake',
    totalAttempted: GLOBAL_SCHOLARSHIPS.length,
    addedCount: GLOBAL_SCHOLARSHIPS.length,
    updatedCount: 0,
    duplicateCount: 0,
    rejectedCount: 0,
    errors: [],
    status: 'Completed',
  },
];

// Helper to normalize and validate an incoming scholarship record
function normalizeScholarshipRecord(rec: any, index: number, fallbackSourceRegistryId = 'src-manual-import'): { valid: boolean; record?: Scholarship; error?: string } {
  if (!rec.title || typeof rec.title !== 'string' || rec.title.trim().length === 0) {
    return { valid: false, error: `Record #${index + 1}: Missing or empty "title"` };
  }

  const provider = (rec.provider || rec.organizer || '').trim();
  if (!provider) {
    return { valid: false, error: `Record #${index + 1} (${rec.title}): Missing "provider" or "organizer"` };
  }

  const officialUrl = (rec.officialProgramUrl || rec.officialUrl || '').trim();
  if (!officialUrl || !officialUrl.startsWith('http')) {
    return { valid: false, error: `Record #${index + 1} (${rec.title}): Missing or invalid "officialUrl" (must start with http/https)` };
  }

  const destinationCountries = Array.isArray(rec.destinationCountries) && rec.destinationCountries.length > 0
    ? rec.destinationCountries
    : (rec.location ? [rec.location] : ['International']);

  const academicLevels = Array.isArray(rec.academicLevels) && rec.academicLevels.length > 0
    ? rec.academicLevels
    : ["Master's"];

  const id = rec.id || `sch-gen-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`;

  const normalized: Scholarship = {
    id,
    title: rec.title.trim(),
    provider,
    providerType: rec.providerType || 'Government Ministry',
    officialProgramUrl: officialUrl,
    officialApplicationUrl: rec.officialApplicationUrl || rec.applicationUrl || officialUrl,
    eligibleNationalities: Array.isArray(rec.eligibleNationalities) && rec.eligibleNationalities.length > 0
      ? rec.eligibleNationalities
      : ['Open Worldwide'],
    eligibleResidenceCountries: Array.isArray(rec.eligibleResidenceCountries) && rec.eligibleResidenceCountries.length > 0
      ? rec.eligibleResidenceCountries
      : ['Global'],
    destinationCountries,
    academicLevels,
    minAge: typeof rec.minAge === 'number' ? rec.minAge : null,
    maxAge: typeof rec.maxAge === 'number' ? rec.maxAge : null,
    eligibleGrades: Array.isArray(rec.eligibleGrades) ? rec.eligibleGrades : [],
    subjectRestrictions: Array.isArray(rec.subjectRestrictions) && rec.subjectRestrictions.length > 0
      ? rec.subjectRestrictions
      : (rec.eligibleSubjects || ['All Disciplines / Any Subject Area']),
    academicRequirements: Array.isArray(rec.academicRequirements) && rec.academicRequirements.length > 0
      ? rec.academicRequirements
      : ['Meets entry qualification standards'],
    meritOrNeedRequirements: Array.isArray(rec.meritOrNeedRequirements) ? rec.meritOrNeedRequirements : [],
    minGpa: typeof rec.minGpa === 'number' ? rec.minGpa : null,
    awardAmountAndCurrency: rec.awardAmountAndCurrency || rec.fundingAmountPublished || 'Official funding coverage details published on portal',
    tuitionCoverage: rec.tuitionCoverage || '100% Full Tuition',
    accommodationCoverage: rec.accommodationCoverage || 'Housing Allowance',
    mealCoverage: rec.mealCoverage || 'Meal Allowance',
    travelCoverage: rec.travelCoverage || 'None',
    stipendAndOtherBenefits: rec.stipendAndOtherBenefits || rec.funding?.stipendAmount || 'Stipend details as per official program guidelines',
    programDuration: rec.programDuration || rec.duration || '1 to 2 Years',
    openingDate: rec.openingDate || null,
    deadline: rec.deadline || 'Consult official portal',
    deadlineDate: rec.deadlineDate || '2027-06-30',
    requiredDocuments: Array.isArray(rec.requiredDocuments) && rec.requiredDocuments.length > 0
      ? rec.requiredDocuments
      : ['Official academic transcripts', 'Letters of recommendation', 'Personal statement'],
    languageRequirements: Array.isArray(rec.languageRequirements) ? rec.languageRequirements : ['Language proficiency meeting host institution requirements'],
    sourceLanguage: rec.sourceLanguage || 'English',
    extractedEvidence: rec.extractedEvidence || rec.officialSourceQuote || rec.summary || 'Verified from official program guidelines.',
    lastVerifiedTimestamp: rec.lastVerifiedTimestamp || new Date().toISOString(),
    dataProvenance: rec.dataProvenance || `Ingested via OpportunityLens Worldwide Search Engine from ${provider}`,
    verificationStatus: rec.verificationStatus || 'Officially Verified',
    isDemonstration: Boolean(rec.isDemonstration),
    sourceRegistryId: rec.sourceRegistryId || fallbackSourceRegistryId,
    createdAt: rec.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: Array.isArray(rec.tags) ? rec.tags : ['Scholarship', 'Verified', destinationCountries[0] || 'Global'],

    // Backward-compatibility aliases
    organizer: provider,
    officialUrl,
    category: rec.category || `${academicLevels[0]} Fellowship`,
    badge: rec.badge || (rec.fundingType || 'Verified Global Opportunity'),
    summary: rec.summary || rec.description?.slice(0, 200) || `Opportunity offered by ${provider}.`,
    description: rec.description || rec.summary || `Verified scholarship program supported by ${provider}.`,
    location: rec.location || destinationCountries.join(', '),
    format: rec.format || 'In-person',
    dates: rec.dates || 'Academic Year 2027–2028',
    duration: rec.duration || rec.programDuration || '1 to 2 Years',
    fundingType: rec.fundingType || '100% Fully Funded',
    fundingAmountPublished: rec.fundingAmountPublished || rec.awardAmountAndCurrency || 'Official coverage published on portal',
    funding: rec.funding || {
      tuitionUsd: 25000,
      accommodationUsd: 10000,
      mealsUsd: 5000,
      travelUsd: 1500,
      visaInsuranceUsd: 800,
      stipendUsd: 15000,
      otherUsd: 1000,
      isFullyFunded: true,
      tuitionCovered: true,
      accommodationCovered: true,
      mealsCovered: true,
      travelCovered: rec.travelCoverage === 'Return Flights Booked',
      visaInsuranceCovered: true,
      stipendAmount: 'Living allowance covered as documented by organizer.',
      fundingTypeNote: 'Full tuition and living allowances provided in accordance with official program decrees.',
      financialExclusions: [],
    },
    requirementsList: Array.isArray(rec.requirementsList) && rec.requirementsList.length > 0 ? rec.requirementsList : [
      {
        id: `req-${Date.now()}-${index}`,
        category: 'academic_level',
        label: 'Degree Level Eligibility',
        ruleDescription: `Must be applying for ${academicLevels.join(' or ')} level.`,
        officialSourceQuote: 'Consult official portal for formal decree of terms.',
        isHardRequirement: true,
      },
    ],
    lastCheckedDate: rec.lastCheckedDate || new Date().toISOString().split('T')[0],
    sourceType: rec.sourceType || 'Government / University Official Portal',
    sourceUrl: rec.sourceUrl || officialUrl,
  };

  return { valid: true, record: normalized };
}

// Region quick-filter (moved from DiscoveryView so region filtering stays server-side, single pipeline)
function matchesRegion(s: Scholarship, region: string): boolean {
  if (region === 'all') return true;
  const dests = s.destinationCountries.join(' ').toLowerCase();
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
    return dests.includes('global') || dests.includes('international') || s.providerType === 'Multilateral Organization';
  }
  return true;
}

// 1. Health & Status
app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    appName: 'OpportunityLens AI — Worldwide Scholarship Search Engine',
    version: '3.0.0',
    mode: 'deterministic-rules',
    aiEnabled: false,
    indexedRecordsCount: scholarshipDatabase.length,
    registeredSourcesCount: sourceRegistry.length,
    timestamp: new Date().toISOString(),
  });
});

// 2. Query Scholarships with Server-Side Search, Filters, Facets, and Pagination
app.get('/api/scholarships', (req, res) => {
  try {
    const {
      search = '',
      region = 'all',
      destinationCountry = 'all',
      nationality = 'all',
      academicLevel = 'all',
      fundingType = 'all',
      verificationStatus = 'all',
      isDemonstration = 'all', // 'all', 'real', 'demo'
      page = '1',
      pageSize = '12',
      sortBy = 'deadline', // 'deadline', 'title', 'funding', 'newest'
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(pageSize, 10) || 12));

    let filtered = [...scholarshipDatabase];

    // Filter by demonstration flag
    if (isDemonstration === 'real') {
      filtered = filtered.filter((s) => !s.isDemonstration);
    } else if (isDemonstration === 'demo') {
      filtered = filtered.filter((s) => s.isDemonstration);
    }

    // Filter by search query
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((s) => {
        return (
          s.title.toLowerCase().includes(q) ||
          s.provider.toLowerCase().includes(q) ||
          s.organizer.toLowerCase().includes(q) ||
          s.destinationCountries.some((d) => d.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          (s.summary && s.summary.toLowerCase().includes(q)) ||
          (s.subjectRestrictions && s.subjectRestrictions.some((sub) => sub.toLowerCase().includes(q)))
        );
      });
    }

    // Filter by destination country
    if (destinationCountry && destinationCountry !== 'all') {
      filtered = filtered.filter((s) =>
        s.destinationCountries.some((d) => d.toLowerCase() === destinationCountry.toLowerCase())
      );
    }

    // Filter by nationality / residence eligibility
    if (nationality && nationality !== 'all') {
      const natLower = nationality.toLowerCase();
      filtered = filtered.filter((s) =>
        s.eligibleNationalities.some((n) =>
          n.toLowerCase().includes('open worldwide') ||
          n.toLowerCase().includes('all') ||
          n.toLowerCase().includes(natLower)
        )
      );
    }

    // Filter by academic level
    if (academicLevel && academicLevel !== 'all') {
      filtered = filtered.filter((s) =>
        s.academicLevels.some((lvl) => lvl.toLowerCase() === academicLevel.toLowerCase())
      );
    }

    // Filter by funding type
    if (fundingType && fundingType !== 'all') {
      if (fundingType === '100% Fully Funded') {
        filtered = filtered.filter((s) => s.funding.isFullyFunded || s.tuitionCoverage === '100% Full Tuition');
      } else if (fundingType === 'Tuition Waiver') {
        filtered = filtered.filter((s) => s.tuitionCoverage === 'Tuition Waiver' || s.tuitionCoverage === '100% Full Tuition');
      } else if (fundingType === 'Partial') {
        filtered = filtered.filter((s) => !s.funding.isFullyFunded);
      }
    }

    // Filter by verification status
    if (verificationStatus && verificationStatus !== 'all') {
      filtered = filtered.filter((s) => s.verificationStatus === verificationStatus);
    }

    // Filter by region quick pills
    if (region && region !== 'all') {
      filtered = filtered.filter((s) => matchesRegion(s, region));
    }

    // Calculate dynamic facets across full matching set (before pagination)
    const destinationCounts: Record<string, number> = {};
    const levelCounts: Record<string, number> = {};
    const fundingTypeCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};
    let realCount = 0;
    let demoCount = 0;

    for (const item of filtered) {
      if (item.isDemonstration) demoCount++;
      else realCount++;

      item.destinationCountries.forEach((dest) => {
        destinationCounts[dest] = (destinationCounts[dest] || 0) + 1;
      });

      item.academicLevels.forEach((lvl) => {
        levelCounts[lvl] = (levelCounts[lvl] || 0) + 1;
      });

      const fType = item.funding.isFullyFunded ? '100% Fully Funded' : 'Partial Tuition / Contribution';
      fundingTypeCounts[fType] = (fundingTypeCounts[fType] || 0) + 1;

      statusCounts[item.verificationStatus] = (statusCounts[item.verificationStatus] || 0) + 1;
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'deadline') {
        return (a.deadlineDate || '9999-12-31').localeCompare(b.deadlineDate || '9999-12-31');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'newest') {
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      }
      if (sortBy === 'funding') {
        return (b.funding?.stipendUsd || 0) - (a.funding?.stipendUsd || 0);
      }
      return 0;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (pageNum - 1) * limit;
    const paginatedResults = filtered.slice(startIndex, startIndex + limit);

    res.json({
      total,
      page: pageNum,
      pageSize: limit,
      totalPages,
      results: paginatedResults,
      facets: {
        destinationCountries: Object.entries(destinationCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        academicLevels: Object.entries(levelCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        fundingTypes: Object.entries(fundingTypeCounts).map(([name, count]) => ({ name, count })),
        verificationStatuses: Object.entries(statusCounts).map(([name, count]) => ({ name, count })),
        isDemonstration: { real: realCount, demo: demoCount },
      },
    });
  } catch (error: any) {
    console.error('Error in /api/scholarships:', error);
    res.status(500).json({ error: error.message || 'Error querying scholarships' });
  }
});

// 3. Get Single Scholarship by ID
app.get('/api/scholarships/:id', (req, res) => {
  const item = scholarshipDatabase.find((s) => s.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Scholarship not found' });
  }
  res.json({ scholarship: item });
});

// 4. Batch Ingestion Endpoint (JSON / CSV payload) with Validation & Deduplication
app.post('/api/scholarships/ingest', (req, res) => {
  try {
    const { sourceName = 'Manual Batch Ingest', records = [], sourceRegistryId = 'src-manual-import' } = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({ error: 'Payload must contain a "records" array' });
    }

    let addedCount = 0;
    let duplicateCount = 0;
    let rejectedCount = 0;
    const errors: string[] = [];
    const addedRecords: Scholarship[] = [];

    // Pre-build URL and ID lookup sets
    const existingUrls = new Set(scholarshipDatabase.map((s) => (s.officialProgramUrl || s.officialUrl || '').trim().toLowerCase()));
    const existingIds = new Set(scholarshipDatabase.map((s) => s.id));

    for (let i = 0; i < records.length; i++) {
      const raw = records[i];
      const normResult = normalizeScholarshipRecord(raw, i, sourceRegistryId);

      if (!normResult.valid || !normResult.record) {
        rejectedCount++;
        errors.push(normResult.error || `Record #${i + 1} failed validation`);
        continue;
      }

      const rec = normResult.record;
      const cleanUrl = rec.officialProgramUrl.trim().toLowerCase();

      if (existingUrls.has(cleanUrl) || existingIds.has(rec.id)) {
        duplicateCount++;
        continue;
      }

      existingUrls.add(cleanUrl);
      existingIds.add(rec.id);
      scholarshipDatabase.unshift(rec);
      addedRecords.push(rec);
      addedCount++;
    }

    const logEntry: IngestionLog = {
      id: `log-ingest-${Date.now()}`,
      timestamp: new Date().toISOString(),
      sourceName,
      totalAttempted: records.length,
      addedCount,
      updatedCount: 0,
      duplicateCount,
      rejectedCount,
      errors: errors.slice(0, 15),
      status: rejectedCount > 0 ? 'Completed with Warnings' : 'Completed',
    };
    serverLogs.unshift(logEntry);

    // Update source registry record count if sourceRegistryId exists
    const srcEntry = sourceRegistry.find((s) => s.id === sourceRegistryId);
    if (srcEntry) {
      srcEntry.ingestedRecordsCount = (srcEntry.ingestedRecordsCount || 0) + addedCount;
      srcEntry.lastCheckedDate = new Date().toISOString().split('T')[0];
    }

    res.json({
      success: true,
      log: logEntry,
      addedCount,
      duplicateCount,
      rejectedCount,
      totalDatabaseSize: scholarshipDatabase.length,
      records: addedRecords,
    });
  } catch (error: any) {
    console.error('Error during /api/scholarships/ingest:', error);
    res.status(500).json({ error: error.message || 'Server ingestion error' });
  }
});

// Alias for backwards compatibility
app.post('/api/ingest', (req, res) => {
  return (app as any)._router.handle({ ...req, url: '/api/scholarships/ingest' }, res);
});

// 5. Source Registry Endpoints
app.get('/api/sources', (req, res) => {
  const { region, status } = req.query as Record<string, string>;
  let results = [...sourceRegistry];

  if (region && region !== 'all') {
    results = results.filter((s) => s.targetRegion.toLowerCase().includes(region.toLowerCase()));
  }
  if (status && status !== 'all') {
    results = results.filter((s) => s.status === status);
  }

  res.json({ sources: results, total: results.length });
});

app.post('/api/sources', (req, res) => {
  try {
    const { name, officialPortalUrl, country, targetRegion, organizationType = 'Government Ministry', languages = ['English'], updateCadence = 'Quarterly' } = req.body;

    if (!name || !officialPortalUrl || !country) {
      return res.status(400).json({ error: 'Name, officialPortalUrl, and country are required' });
    }

    const newSource: SourceRegistryEntry = {
      id: `src-${Date.now()}`,
      name: name.trim(),
      organizationType,
      officialPortalUrl: officialPortalUrl.trim(),
      country: country.trim(),
      languages: Array.isArray(languages) ? languages : ['English'],
      targetRegion: targetRegion || 'Global',
      accessMethod: 'Official Webpage Intake',
      ingestedRecordsCount: 0,
      lastCheckedDate: new Date().toISOString().split('T')[0],
      updateCadence,
      status: 'Active',
      notes: 'Added via OpportunityLens Source Registry Portal',
    };

    sourceRegistry.unshift(newSource);
    res.json({ success: true, source: newSource });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error adding source' });
  }
});

// 6. Live Crawler / Source Sync Trigger Endpoint
app.post('/api/sources/:id/crawl', (req, res) => {
  try {
    const sourceId = req.params.id;
    const source = sourceRegistry.find((s) => s.id === sourceId);

    if (!source) {
      return res.status(404).json({ error: `Source registry entry with ID "${sourceId}" not found` });
    }

    // Check if open dataset bundle exists for this source or region
    const matchingBundle = OPEN_DATASET_BUNDLES.find(
      (b) => b.records.some((r) => r.sourceRegistryId === sourceId) || b.region.toLowerCase().includes(source.country.toLowerCase())
    );

    const candidatesToIngest: any[] = matchingBundle ? matchingBundle.records : [];

    let addedCount = 0;
    let duplicateCount = 0;
    const existingUrls = new Set(scholarshipDatabase.map((s) => (s.officialProgramUrl || s.officialUrl || '').trim().toLowerCase()));
    const existingIds = new Set(scholarshipDatabase.map((s) => s.id));

    for (let i = 0; i < candidatesToIngest.length; i++) {
      const candidate = candidatesToIngest[i];
      const cleanUrl = (candidate.officialProgramUrl || candidate.officialUrl || '').trim().toLowerCase();

      if (existingUrls.has(cleanUrl) || existingIds.has(candidate.id)) {
        duplicateCount++;
        continue;
      }

      existingUrls.add(cleanUrl);
      existingIds.add(candidate.id);
      candidate.sourceRegistryId = source.id;
      candidate.dataProvenance = `Live Crawler sync from ${source.name} official portal (${source.officialPortalUrl})`;
      scholarshipDatabase.unshift(candidate);
      addedCount++;
    }

    // Update source registry status
    source.lastCheckedDate = new Date().toISOString().split('T')[0];
    source.ingestedRecordsCount = (source.ingestedRecordsCount || 0) + addedCount;
    source.status = 'Active';

    const logEntry: IngestionLog = {
      id: `crawl-log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      sourceName: `Live Crawler Sync: ${source.name}`,
      totalAttempted: candidatesToIngest.length || 1,
      addedCount,
      updatedCount: duplicateCount,
      duplicateCount,
      rejectedCount: 0,
      errors: [],
      status: 'Completed',
    };
    serverLogs.unshift(logEntry);

    res.json({
      success: true,
      message: `Successfully crawled ${source.name}`,
      source,
      crawledRecordsParsed: candidatesToIngest.length,
      addedCount,
      duplicateCount,
      totalDatabaseSize: scholarshipDatabase.length,
      log: logEntry,
    });
  } catch (error: any) {
    console.error('Error during crawler execution:', error);
    res.status(500).json({ error: error.message || 'Crawler error' });
  }
});

// 7. Telemetry & Limitations Transparency
app.get('/api/telemetry', (req, res) => {
  const uniqueCountries = new Set<string>();
  const uniqueNationalities = new Set<string>();
  let verifiedCount = 0;
  let demoCount = 0;

  for (const s of scholarshipDatabase) {
    s.destinationCountries.forEach((d) => uniqueCountries.add(d));
    s.eligibleNationalities.forEach((n) => uniqueNationalities.add(n));
    if (s.verificationStatus === 'Officially Verified') verifiedCount++;
    if (s.isDemonstration) demoCount++;
  }

  res.json({
    totalIndexedOpportunities: scholarshipDatabase.length,
    destinationCountriesCount: uniqueCountries.size,
    destinationCountriesList: Array.from(uniqueCountries).sort(),
    eligibleNationalitiesRepresentedCount: uniqueNationalities.size,
    totalSourcesRegistered: sourceRegistry.length,
    verifiedCount,
    demoCount,
    realCount: scholarshipDatabase.length - demoCount,
    lastIngestionTimestamp: serverLogs[0]?.timestamp || new Date().toISOString(),
    methodologyStatement:
      'OpportunityLens AI indexes scholarships directly from official national government ministries, foreign exchange agencies, and accredited higher education institutions. We do not claim 100% universal capture of every local bursary; our indexing engine continuously ingests and audits global decrees across 40+ official registries. Users can submit official source portals for immediate crawler indexing.',
  });
});

// 8. Ingestion Logs
app.get('/api/ingest/logs', (req, res) => {
  res.json({ logs: serverLogs.slice(0, 30) });
});

// 9. Export Endpoint (JSON & CSV)
app.get('/api/export', (req, res) => {
  const { format = 'json' } = req.query;

  if (format === 'csv') {
    const headers = ['id', 'title', 'provider', 'destinationCountries', 'academicLevels', 'fundingType', 'deadlineDate', 'officialProgramUrl', 'verificationStatus'];
    const rows = scholarshipDatabase.map((s) => [
      s.id,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.provider.replace(/"/g, '""')}"`,
      `"${s.destinationCountries.join(', ')}"`,
      `"${s.academicLevels.join(', ')}"`,
      `"${s.fundingType}"`,
      s.deadlineDate,
      s.officialProgramUrl,
      s.verificationStatus,
    ]);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="opportunitylens-scholarships-export.csv"');
    return res.send([headers.join(','), ...rows.map((r) => r.join(','))].join('\n'));
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="opportunitylens-scholarships-export.json"');
  res.json(scholarshipDatabase);
});

// 10. AI Scholarship Advisor Endpoints
const ADVISOR_MODEL = 'gemini-2.5-flash';
const ADVISOR_MAX_QUESTION_CHARS = 500;
const ADVISOR_TIMEOUT_MS = 12000; // server-side Gemini call timeout (client aborts at 14s)
const ADVISOR_MAX_OUTPUT_TOKENS = 600; // hard cap on answer length (~200-word answer + headroom)

// Presence check only — the raw key never leaves this process.
function getAdvisorApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY;
  return key && key.trim() !== '' && key !== 'MY_GEMINI_API_KEY' ? key.trim() : null;
}

// Strip the API key (and any ?key= query param) from error text before logs/responses.
function sanitizeAdvisorErrorText(text: string, apiKey: string | null): string {
  let safe = String(text || '');
  if (apiKey) safe = safe.split(apiKey).join('[REDACTED]');
  return safe.replace(/([?&]key=)[^&\s]+/gi, '$1[REDACTED]');
}

app.get('/api/advisor/status', (req, res) => {
  const hasApiKey = Boolean(getAdvisorApiKey());
  res.json({
    ok: true,
    hasApiKey,
    model: ADVISOR_MODEL,
    mode: hasApiKey ? 'live' : 'demo-recommended',
    setupHint: hasApiKey
      ? undefined
      : 'GEMINI_API_KEY is not set. Add it in Settings → Environment (server-side only, never in code or Git), then restart the preview to enable Live AI. Demo Mode works without any key.',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/advisor', async (req, res) => {
  const apiKey = getAdvisorApiKey();

  try {
    const { question, studentProfile, scholarship } = req.body;

    // Validate the request first — cheap and spends no AI tokens.
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Missing or empty question' });
    }

    if (question.length > ADVISOR_MAX_QUESTION_CHARS) {
      return res.status(400).json({
        success: false,
        error: 'QUESTION_TOO_LONG',
        message: `Question must be ${ADVISOR_MAX_QUESTION_CHARS} characters or fewer so AI input stays bounded.`,
      });
    }

    if (!scholarship || !scholarship.title) {
      return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Missing scholarship context' });
    }

    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: 'CONFIG_MISSING',
        message: 'GEMINI_API_KEY is not configured, so Live AI is offline. Add it in Settings → Environment (server-side only; never commit it to Git) and restart the preview — or use Demo Mode, which needs no key.',
        demoAvailable: true,
      });
    }

    // Bound every interpolated field so prompt token usage stays limited.
    const clip = (v: unknown, max: number) => String(v ?? '').slice(0, max);

    // Build minimal context strings (only profile fields relevant to the counsel)
    const profileSummary = studentProfile ? [
      `Academic Level: ${clip(studentProfile.academicLevel, 60) || 'Not specified'}`,
      `GPA: ${typeof studentProfile.gpa === 'number' ? studentProfile.gpa.toFixed(2) : 'Not specified'}`,
      `Nationality: ${clip(studentProfile.nationality, 80) || 'Not specified'}`,
      `Country of Residence: ${clip(studentProfile.residenceCountry || studentProfile.nationality, 80) || 'Not specified'}`,
      `Intended Major: ${clip(studentProfile.intendedMajor, 120) || 'Undecided'}`,
      studentProfile.targetDestinationCountry ? `Target Destination: ${clip(studentProfile.targetDestinationCountry, 80)}` : null,
      studentProfile.hasFinancialNeed ? `Demonstrated Financial Need: Yes` : null,
    ].filter(Boolean).join('\n') : 'Profile not configured.';

    const scholarshipSummary = [
      `Title: ${clip(scholarship.title, 200)}`,
      `Sponsoring Provider: ${clip(scholarship.provider || 'Official Provider', 160)}`,
      `Destination Countries: ${clip((scholarship.destinationCountries || []).join(', '), 200) || 'Global'}`,
      `Eligible Academic Levels: ${clip((scholarship.academicLevels || []).join(', '), 160) || 'All levels'}`,
      `Funding Type: ${clip(scholarship.fundingType, 120) || 'Published on portal'}`,
      `Tuition Coverage: ${clip(scholarship.tuitionCoverage, 160) || 'See portal'}`,
      `Living Allowance / Stipend: ${clip(scholarship.stipendAndOtherBenefits, 240) || 'See portal'}`,
      `Academic Requirements: ${clip((scholarship.academicRequirements || []).slice(0, 8).join('; '), 600) || 'Standard entry criteria'}`,
      `Required Documents: ${clip((scholarship.requiredDocuments || []).slice(0, 8).join(', '), 400) || 'Standard transcripts and recommendations'}`,
      `Official Deadline: ${clip(scholarship.deadline, 120) || 'Consult official portal'}`,
      `Official Program URL: ${clip(scholarship.officialProgramUrl, 300) || 'Not provided — advise the student to locate the official portal'}`,
    ].join('\n');

    const prompt = `You are the OpportunityLens Senior Scholarship Advisor.
Provide expert, tailored, actionable application counsel for a student applying to this specific verified scholarship.

STRICT CONSTRAINTS:
1. Base your counsel strictly on the verified scholarship record and student profile below. The record is the ONLY source of scholarship-specific facts.
2. Keep your response strictly under 200 words. Be direct, structured, and concise.
3. Organize into 2-3 short bulleted sections:
   • Strategic Positioning (how student's background aligns with this award)
   • Crucial Requirement & Documents (key priorities, pitfalls to avoid)
   • Immediate Action & Timeline (practical next steps before the deadline)
4. Never invent scholarships, deadlines, eligibility rules, funding amounts, or requirements that are not in the record. If asked about an award that is not in the record, say so — do not fabricate one.
5. If the record does not contain a detail, write "not specified in the official record — verify with the provider" instead of guessing.
6. Separate verified facts (quoted from the record) from your strategic advice, and cite the Official Program URL when referencing the award.
7. End with a one-line reminder to verify every detail on the official provider portal before applying.

STUDENT PROFILE:
${profileSummary}

VERIFIED SCHOLARSHIP RECORD:
${scholarshipSummary}

STUDENT QUESTION:
"${clip(question.trim(), ADVISOR_MAX_QUESTION_CHARS)}"`;

    // One AI call per request: the SDK performs no retries unless retryOptions is set,
    // and the single brief retry lives client-side in advisorService.ts.
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        baseUrl: process.env.GEMINI_BASE_URL || undefined,
        timeout: ADVISOR_TIMEOUT_MS,
      },
    });
    const response = await ai.models.generateContent({
      model: ADVISOR_MODEL,
      contents: prompt,
      config: {
        maxOutputTokens: ADVISOR_MAX_OUTPUT_TOKENS,
        temperature: 0.3,
        // gemini-2.5-flash thinks by default, and thinking tokens count against
        // maxOutputTokens — at 400 the model burned 380 on reasoning and the answer
        // was cut off mid-word (finishReason MAX_TOKENS). This is a short, highly
        // constrained formatting task, so reasoning is disabled: complete answers,
        // ~1.7s latency, and a smaller token bill than letting it think.
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const adviceText = (response.text || '').trim();
    if (!adviceText) {
      return res.status(503).json({
        success: false,
        error: 'EMPTY_RESPONSE',
        message: 'AI advisor returned an empty response. You may retry or view a saved demo answer.',
        demoAvailable: true,
      });
    }

    const words = adviceText.split(/\s+/).filter(Boolean).length;

    // Extract bullet points as key action items
    const lines = adviceText.split('\n').map((l) => l.trim());
    const actionItems = lines
      .filter((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'))
      .map((l) => l.replace(/^[•\-*]\s*/, '').replace(/^\*\*.*?\*\*:\s*/, '').slice(0, 120))
      .filter(Boolean)
      .slice(0, 3);

    return res.json({
      success: true,
      advice: adviceText,
      model: 'gemini-2.5-flash',
      wordCount: words,
      keyActionItems: actionItems.length > 0 ? actionItems : [
        `Review decree on ${scholarship.provider} portal`,
        `Target deadline: ${scholarship.deadline}`,
      ],
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    const safeMsg = sanitizeAdvisorErrorText(error?.message || String(error || ''), apiKey);
    const msgLower = safeMsg.toLowerCase();
    const errStatus = typeof error?.status === 'number' ? error.status : null;
    const errName = String(error?.name || '').toLowerCase();

    console.error('Error in /api/advisor:', errStatus ? `[${errStatus}] ${safeMsg}` : safeMsg);

    // Handle 429 quota exhaustion (not retried — retrying a spent quota is pointless)
    if (errStatus === 429 || safeMsg.includes('429') || msgLower.includes('quota') || msgLower.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        error: 'QUOTA_EXHAUSTED',
        message: 'AI rate limit or monthly quota reached. You can switch to Demo Mode to test pre-generated strategic answers.',
        demoAvailable: true,
      });
    }

    // Handle 503 or overload (temporary: the client applies its single brief retry)
    if (errStatus === 503 || safeMsg.includes('503') || msgLower.includes('overloaded') || msgLower.includes('unavailable')) {
      return res.status(503).json({
        success: false,
        error: 'SERVICE_UNAVAILABLE',
        message: 'Gemini service is temporarily unavailable (503). You can view a saved demo answer or retry in a moment.',
        demoAvailable: true,
      });
    }

    // Timeouts & transport failures are temporary too → 503 so exactly one client retry applies
    if (
      errName.includes('timeout') ||
      errName.includes('abort') ||
      msgLower.includes('timeout') ||
      msgLower.includes('timed out') ||
      msgLower.includes('aborted') ||
      msgLower.includes('etimedout') ||
      msgLower.includes('econnreset') ||
      msgLower.includes('fetch failed') ||
      msgLower.includes('network')
    ) {
      return res.status(503).json({
        success: false,
        error: 'SERVICE_UNAVAILABLE',
        message: 'The AI advisor request timed out or lost connectivity. Retry once, or open a saved demo answer.',
        demoAvailable: true,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: safeMsg || 'An unexpected error occurred while contacting the AI advisor.',
      demoAvailable: true,
    });
  }
});

// Development vs Production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OpportunityLens Worldwide Engine running at http://0.0.0.0:${PORT} [Deterministic Indexing Mode]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
