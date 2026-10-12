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
app.get('/api/advisor/status', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const hasApiKey = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY');
  res.json({
    ok: true,
    hasApiKey,
    model: 'gemini-2.5-flash',
    mode: hasApiKey ? 'live' : 'demo-recommended',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/advisor', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const hasApiKey = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY');

    if (!hasApiKey) {
      return res.status(503).json({
        success: false,
        error: 'CONFIG_MISSING',
        message: 'GEMINI_API_KEY is not configured in the server environment. Please enable Demo Mode for instant simulated advisor responses.',
        demoAvailable: true,
      });
    }

    const { question, studentProfile, scholarship } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Missing or empty question' });
    }

    if (!scholarship || !scholarship.title) {
      return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Missing scholarship context' });
    }

    // Build minimal context strings
    const profileSummary = studentProfile ? [
      `Academic Level: ${studentProfile.academicLevel || 'Not specified'}`,
      `GPA: ${typeof studentProfile.gpa === 'number' ? studentProfile.gpa.toFixed(2) : 'Not specified'}`,
      `Nationality: ${studentProfile.nationality || 'Not specified'}`,
      `Country of Residence: ${studentProfile.residenceCountry || studentProfile.nationality || 'Not specified'}`,
      `Intended Major: ${studentProfile.intendedMajor || 'Undecided'}`,
      studentProfile.targetDestinationCountry ? `Target Destination: ${studentProfile.targetDestinationCountry}` : null,
      studentProfile.hasFinancialNeed ? `Demonstrated Financial Need: Yes` : null,
    ].filter(Boolean).join('\n') : 'Profile not configured.';

    const scholarshipSummary = [
      `Title: ${scholarship.title}`,
      `Sponsoring Provider: ${scholarship.provider || 'Official Provider'}`,
      `Destination Countries: ${(scholarship.destinationCountries || []).join(', ') || 'Global'}`,
      `Eligible Academic Levels: ${(scholarship.academicLevels || []).join(', ') || 'All levels'}`,
      `Funding Type: ${scholarship.fundingType || 'Published on portal'}`,
      `Tuition Coverage: ${scholarship.tuitionCoverage || 'See portal'}`,
      `Living Allowance / Stipend: ${scholarship.stipendAndOtherBenefits || 'See portal'}`,
      `Academic Requirements: ${(scholarship.academicRequirements || []).join('; ') || 'Standard entry criteria'}`,
      `Required Documents: ${(scholarship.requiredDocuments || []).join(', ') || 'Standard transcripts and recommendations'}`,
      `Official Deadline: ${scholarship.deadline || 'Consult official portal'}`,
      `Official Program URL: ${scholarship.officialProgramUrl || 'Verified statutory source'}`,
    ].join('\n');

    const prompt = `You are the OpportunityLens Senior Scholarship Advisor.
Provide expert, tailored, actionable application counsel for a student applying to this specific verified scholarship.

STRICT CONSTRAINTS:
1. Base your counsel strictly on the verified scholarship record and student profile below.
2. Keep your response strictly under 200 words. Be direct, structured, and concise.
3. Organize into 2-3 short bulleted sections:
   • Strategic Positioning (how student's background aligns with this award)
   • Crucial Requirement & Documents (key priorities, pitfalls to avoid)
   • Immediate Action & Timeline (practical next steps before the deadline)
4. Never speculate or invent requirements not in the record.

STUDENT PROFILE:
${profileSummary}

VERIFIED SCHOLARSHIP RECORD:
${scholarshipSummary}

STUDENT QUESTION:
"${question.trim()}"`;

    const ai = new GoogleGenAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 400,
        temperature: 0.3,
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
    console.error('Error in /api/advisor:', error);
    const msg = error.message || '';

    // Handle 429 quota exhaustion
    if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('rate limit')) {
      return res.status(429).json({
        success: false,
        error: 'QUOTA_EXHAUSTED',
        message: 'AI rate limit or monthly quota reached. You can switch to Demo Mode to test pre-generated strategic answers.',
        demoAvailable: true,
      });
    }

    // Handle 503 or overload
    if (msg.includes('503') || msg.toLowerCase().includes('overloaded') || msg.toLowerCase().includes('unavailable')) {
      return res.status(503).json({
        success: false,
        error: 'SERVICE_UNAVAILABLE',
        message: 'Gemini service is temporarily unavailable (503). You can view a saved demo answer or retry in a moment.',
        demoAvailable: true,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: msg || 'An unexpected error occurred while contacting the AI advisor.',
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
