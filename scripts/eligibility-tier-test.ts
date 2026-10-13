import { GLOBAL_SCHOLARSHIPS } from '../src/data/scholarships';
import { INITIAL_STUDENT_PROFILE, EMPTY_STUDENT_PROFILE } from '../src/utils/storage';
import { evaluateStudentEligibility } from '../src/utils/eligibilityEngine';
import { StudentProfile } from '../src/types';

console.log('=== ELIGIBILITY 3-TIER ENGINE TESTS ===\n');

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`✓ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${msg}`);
    failed++;
  }
}

// Test 1: Full profile matching chevening
const chevening = GLOBAL_SCHOLARSHIPS.find((s) => s.id === 'sch-chevening-uk');
if (!chevening) throw new Error('Chevening scholarship not found in database');

const alexReport = evaluateStudentEligibility(INITIAL_STUDENT_PROFILE, chevening);
assert(alexReport.computedTier === 'eligible', 'Alex Rivera is eligible for Chevening Master scholarship');
assert(alexReport.unmetRequirements.length === 0, 'No unmet mandatory requirements for eligible match');
assert(alexReport.overallScore >= 80, `Overall score is high (${alexReport.overallScore})`);

// Test 2: Ineligible study level (Undergraduate applying for PhD/Master only)
const highSchoolStudent: StudentProfile = {
  ...INITIAL_STUDENT_PROFILE,
  academicLevel: 'High School',
};
const hsReport = evaluateStudentEligibility(highSchoolStudent, chevening);
assert(hsReport.computedTier === 'ineligible', 'High school student is marked ineligible for Master scholarship');
assert(hsReport.unmetRequirements.length > 0, `Unmet requirements listed: ${hsReport.unmetRequirements[0]}`);

// Test 3: Nationality restriction exclusion (UK student applying for Gates Cambridge)
const gates = GLOBAL_SCHOLARSHIPS.find((s) => s.id === 'sch-gates-cambridge');
if (gates) {
  const ukStudent: StudentProfile = {
    ...INITIAL_STUDENT_PROFILE,
    nationalities: ['United Kingdom'],
    countryOfResidence: 'United Kingdom',
  };
  const ukReport = evaluateStudentEligibility(ukStudent, gates);
  assert(ukReport.computedTier === 'ineligible', 'UK student is ineligible for Gates Cambridge Non-UK award');
  assert(ukReport.unmetRequirements.some((r) => r.toLowerCase().includes('uk') || r.toLowerCase().includes('united kingdom') || r.toLowerCase().includes('non-uk')), 'Explains non-UK citizenship requirement');
}

// Test 4: Needs verification (Empty profile with missing citizenship/major)
const blankProfileReport = evaluateStudentEligibility(EMPTY_STUDENT_PROFILE, chevening);
assert(blankProfileReport.computedTier === 'needs_verification' || blankProfileReport.computedTier === 'ineligible', 'Blank profile flagged for verification or level mismatch');
assert(blankProfileReport.missingProfileFields.length > 0, `Missing fields reported: ${blankProfileReport.missingProfileFields.join(', ')}`);

// Test 5: Check distribution of full database across Alex Rivera's profile
let eligibleCount = 0;
let verifyCount = 0;
let ineligCount = 0;

for (const s of GLOBAL_SCHOLARSHIPS) {
  const rep = evaluateStudentEligibility(INITIAL_STUDENT_PROFILE, s);
  if (rep.computedTier === 'eligible') eligibleCount++;
  else if (rep.computedTier === 'needs_verification') verifyCount++;
  else ineligCount++;
}

console.log(`\nAlex Rivera Profile Database Distribution across ${GLOBAL_SCHOLARSHIPS.length} records:`);
console.log(`- Tier 1 (Eligible): ${eligibleCount}`);
console.log(`- Tier 2 (Needs Verification): ${verifyCount}`);
console.log(`- Tier 3 (Ineligible / Excluded): ${ineligCount}`);

assert(eligibleCount > 0, 'Has at least one eligible opportunity');
assert(verifyCount > 0, 'Has opportunities needing verification');
assert(ineligCount > 0, 'Has opportunities that are correctly marked ineligible');

console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
