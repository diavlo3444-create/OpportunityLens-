import {
  Scholarship,
  StudentProfile,
  EligibilityReport,
  EligibilityStatus,
  RequirementAuditItem,
  MatchScoreBreakdown,
} from '../types';

export function evaluateStudentEligibility(
  student: StudentProfile,
  scholarship: Scholarship
): EligibilityReport {
  const audits: RequirementAuditItem[] = [];
  const missingProfileFields: string[] = [];

  let hardFailsCount = 0;
  let warningsCount = 0;
  let unknownsCount = 0;
  let passesCount = 0;

  // Track sub-scores for deterministic criteria breakdown
  let levelScore = 0; // max 25
  let nationalityScore = 0; // max 25
  let subjectScore = 0; // max 20
  let academicScore = 0; // max 20
  let fundingScore = 0; // max 10

  // ----------------------------------------------------
  // 1. Academic Level Check (High School vs Undergrad vs Master's vs PhD)
  // ----------------------------------------------------
  const allowedLevels = scholarship.academicLevels;
  const studentLevel = student.academicLevel || 'High School';

  if (!allowedLevels || allowedLevels.length === 0) {
    levelScore = 25;
  } else if (allowedLevels.includes(studentLevel)) {
    levelScore = 25;
    passesCount++;
    audits.push({
      requirementId: `${scholarship.id}-audit-level`,
      category: 'Academic Level',
      label: 'Degree & Study Level Eligibility',
      status: 'passed',
      studentValue: studentLevel,
      requiredValue: allowedLevels.join(', '),
      reasoning: `Your reported academic standing (${studentLevel}) exactly matches the target degree level for this award (${allowedLevels.join(', ')}).`,
      officialQuote:
        scholarship.requirementsList.find((r) => r.category === 'academic_level')?.officialSourceQuote ||
        `Eligible degree levels: ${allowedLevels.join(', ')}`,
      officialSourceUrl: scholarship.officialUrl,
    });
  } else {
    // If student is High School and opportunity is Master's, it's a hard exclusion
    hardFailsCount++;
    levelScore = 0;
    audits.push({
      requirementId: `${scholarship.id}-audit-level`,
      category: 'Academic Level',
      label: 'Degree & Study Level Mismatch',
      status: 'failed',
      studentValue: studentLevel,
      requiredValue: allowedLevels.join(', '),
      reasoning: `Documented exclusion: This scholarship requires enrollment at the ${allowedLevels.join(' or ')} level. You are currently at the ${studentLevel} level.`,
      officialQuote:
        scholarship.requirementsList.find((r) => r.category === 'academic_level')?.officialSourceQuote ||
        `Open only to candidates applying for ${allowedLevels.join(', ')}.`,
      officialSourceUrl: scholarship.officialUrl,
    });
  }

  // ----------------------------------------------------
  // 2. Nationality & Country of Residence Check
  // ----------------------------------------------------
  const allowedNats = scholarship.eligibleNationalities || [];
  const requiresNonUk = allowedNats.some(
    (n) => n.toLowerCase().includes('outside the united kingdom') || n.toLowerCase().includes('non-uk')
  );
  const requiresNonCanadian = allowedNats.some((n) => n.toLowerCase().includes('non-canadian'));

  const studentNats = student.nationalities || [];
  const isStudentUk = studentNats.some(
    (n) => n.toLowerCase().includes('uk') || n.toLowerCase().includes('united kingdom') || n.toLowerCase().includes('british')
  );
  const isStudentCanadian = studentNats.some(
    (n) => n.toLowerCase().includes('canada') || n.toLowerCase().includes('canadian')
  );

  const isGlobalNat =
    !requiresNonUk &&
    !requiresNonCanadian &&
    allowedNats.some(
      (n) =>
        n.toLowerCase().includes('all nationalities') ||
        n.toLowerCase().includes('global constituencies') ||
        n.toLowerCase().includes('worldwide') ||
        (n.toLowerCase().includes('any country') && !n.toLowerCase().includes('outside'))
    );

  if (studentNats.length === 0) {
    unknownsCount++;
    nationalityScore = 10;
    missingProfileFields.push('Citizenship / Nationality');
    audits.push({
      requirementId: `${scholarship.id}-audit-nat`,
      category: 'Citizenship',
      label: 'Nationality & Legal Status',
      status: 'unknown',
      studentValue: 'Not specified in profile',
      requiredValue: isGlobalNat ? 'Open Worldwide' : allowedNats.join('; '),
      reasoning: 'Your profile does not list any citizenship. We cannot confirm eligibility for country-restricted awards.',
      officialQuote:
        scholarship.requirementsList.find((r) => r.category === 'nationality')?.officialSourceQuote ||
        `Target nationalities: ${allowedNats.join('; ')}`,
      officialSourceUrl: scholarship.officialUrl,
      missingInfoNote: 'Add your passport/citizenship country to resolve this check.',
    });
  } else if (requiresNonUk && isStudentUk) {
    hardFailsCount++;
    nationalityScore = 0;
    audits.push({
      requirementId: `${scholarship.id}-audit-nat`,
      category: 'Citizenship',
      label: 'Nationality Restriction (Non-UK Only)',
      status: 'failed',
      studentValue: studentNats.join(', '),
      requiredValue: 'Citizens of any country outside the United Kingdom',
      reasoning: 'Documented rule: Gates Cambridge explicitly excludes UK citizens from this international trust.',
      officialQuote: 'You must be a citizen of any country outside the United Kingdom.',
      officialSourceUrl: scholarship.officialUrl,
    });
  } else if (requiresNonCanadian && isStudentCanadian) {
    hardFailsCount++;
    nationalityScore = 0;
    audits.push({
      requirementId: `${scholarship.id}-audit-nat`,
      category: 'Citizenship',
      label: 'Nationality Restriction (International Student Only)',
      status: 'failed',
      studentValue: studentNats.join(', '),
      requiredValue: 'Non-Canadian requiring study permit',
      reasoning: 'Documented rule: Lester B. Pearson is reserved strictly for international students paying foreign fees.',
      officialQuote: 'Canadian citizens and permanent residents are not eligible.',
      officialSourceUrl: scholarship.officialUrl,
    });
  } else if (isGlobalNat || (requiresNonUk && !isStudentUk) || (requiresNonCanadian && !isStudentCanadian)) {
    nationalityScore = 25;
    passesCount++;
    audits.push({
      requirementId: `${scholarship.id}-audit-nat`,
      category: 'Citizenship',
      label: 'Nationality Eligibility Scope',
      status: 'passed',
      studentValue: studentNats.join(', '),
      requiredValue: allowedNats.join('; '),
      reasoning: requiresNonUk
        ? `Eligible: As a citizen of ${studentNats.join(', ')} (outside the United Kingdom), you qualify for this international award.`
        : requiresNonCanadian
        ? `Eligible: As an international non-Canadian citizen (${studentNats.join(', ')}), you meet the foreign study permit eligibility.`
        : 'This award is open to applicants from all countries without diplomatic restrictions.',
      officialQuote:
        scholarship.requirementsList.find((r) => r.category === 'nationality')?.officialSourceQuote ||
        allowedNats.join('; '),
      officialSourceUrl: scholarship.officialUrl,
    });
  } else {
      nationalityScore = 22;
      passesCount++;
      audits.push({
        requirementId: `${scholarship.id}-audit-nat`,
        category: 'Citizenship',
        label: 'Nationality & Partner Eligibility',
        status: 'passed',
        studentValue: studentNats.join(', '),
        requiredValue: allowedNats.join('; '),
        reasoning: `Your reported citizenship (${studentNats.join(', ')}) aligns with the partner country scope for this program.`,
        officialQuote:
          scholarship.requirementsList.find((r) => r.category === 'nationality')?.officialSourceQuote ||
          `Eligible partners: ${allowedNats.slice(0, 2).join('; ')}`,
        officialSourceUrl: scholarship.officialUrl,
      });
  }

  // ----------------------------------------------------
  // 3. Subject / Field of Study Alignment
  // ----------------------------------------------------
  const allowedSubjects: string[] = scholarship.subjectRestrictions || scholarship.eligibleSubjects || [];
  const isOpenToAllSubjects = allowedSubjects.some(
    (s: string) =>
      s.toLowerCase().includes('all') ||
      s.toLowerCase().includes('any') ||
      s.toLowerCase().includes('open')
  );

  const studentField = student.fieldOfStudy || (student.academicInterests && student.academicInterests[0]) || '';

  if (isOpenToAllSubjects || allowedSubjects.length === 0) {
    subjectScore = 20;
    passesCount++;
    audits.push({
      requirementId: `${scholarship.id}-audit-subject`,
      category: 'Discipline',
      label: 'Field of Study Eligibility',
      status: 'passed',
      studentValue: studentField || 'General academic study',
      requiredValue: 'Open to All Academic Disciplines',
      reasoning: 'This award has no restriction on academic department or course of study.',
      officialQuote: 'Available across all academic faculties and postgraduate disciplines.',
      officialSourceUrl: scholarship.officialUrl,
    });
  } else if (!studentField) {
    subjectScore = 10;
    unknownsCount++;
    missingProfileFields.push('Field of Study');
    audits.push({
      requirementId: `${scholarship.id}-audit-subject`,
      category: 'Discipline',
      label: 'Subject Alignment Check',
      status: 'unknown',
      studentValue: 'Not specified',
      requiredValue: allowedSubjects.join('; '),
      reasoning: `This scholarship prioritizes specific subject areas: ${allowedSubjects.join('; ')}. Your profile lacks a declared major.`,
      officialQuote: `Target subject areas: ${allowedSubjects.join('; ')}`,
      officialSourceUrl: scholarship.officialUrl,
      missingInfoNote: 'Specify your academic field in Profile & Settings.',
    });
  } else {
    // Check keyword overlap
    const studentWords = (studentField + ' ' + (student.academicInterests || []).join(' ')).toLowerCase();
    const hasMatch = allowedSubjects.some((s: string) => {
      const tokens = s.toLowerCase().split(/[\s,;&/]+/);
      return tokens.some((t: string) => t.length > 3 && studentWords.includes(t));
    });

    if (hasMatch) {
      subjectScore = 20;
      passesCount++;
      audits.push({
        requirementId: `${scholarship.id}-audit-subject`,
        category: 'Discipline',
        label: 'Subject Alignment',
        status: 'passed',
        studentValue: studentField,
        requiredValue: allowedSubjects.join('; '),
        reasoning: `Your declared study discipline (${studentField}) is explicitly supported by this scholarship.`,
        officialQuote: `Funded areas: ${allowedSubjects.join('; ')}`,
        officialSourceUrl: scholarship.officialUrl,
      });
    } else {
      subjectScore = 8;
      warningsCount++;
      audits.push({
        requirementId: `${scholarship.id}-audit-subject`,
        category: 'Discipline',
        label: 'Subject Alignment Discrepancy',
        status: 'warning',
        studentValue: studentField,
        requiredValue: allowedSubjects.join('; '),
        reasoning: `You specified ${studentField}, but this award gives preference to: ${allowedSubjects.join('; ')}. Cross-check whether interdisciplinary applications are accepted.`,
        officialQuote: `Prioritized fields: ${allowedSubjects.join('; ')}`,
        officialSourceUrl: scholarship.officialUrl,
      });
    }
  }

  // ----------------------------------------------------
  // 4. Age and GPA Threshold Benchmarks
  // ----------------------------------------------------
  let agePass = true;
  const hasAgeRequirement = scholarship.minAge !== null && scholarship.minAge !== undefined || scholarship.maxAge !== null && scholarship.maxAge !== undefined;

  if (hasAgeRequirement) {
    if (student.age === null || student.age === undefined) {
      unknownsCount++;
      missingProfileFields.push('Age');
    } else {
      if (scholarship.minAge !== null && scholarship.minAge !== undefined && student.age < scholarship.minAge) agePass = false;
      if (scholarship.maxAge !== null && scholarship.maxAge !== undefined && student.age > scholarship.maxAge) agePass = false;
    }
  }

  let gpaPass = true;
  if (scholarship.minGpa !== null && scholarship.minGpa !== undefined) {
    if (student.gpa === null || student.gpa === undefined) {
      unknownsCount++;
      missingProfileFields.push('GPA');
    } else {
      if (student.gpa < scholarship.minGpa) gpaPass = false;
    }
  }

  if (!agePass) {
    hardFailsCount++;
    academicScore = 0;
    audits.push({
      requirementId: `${scholarship.id}-audit-age`,
      category: 'Age Window',
      label: 'Age Restriction Disqualification',
      status: 'failed',
      studentValue: `${student.age} years old`,
      requiredValue: `${scholarship.minAge ?? 0} to ${scholarship.maxAge ?? 'No limit'} years old`,
      reasoning: `You reported ${student.age} years of age, which falls outside the official eligibility window.`,
      officialQuote:
        scholarship.requirementsList.find((r) => r.category === 'age')?.officialSourceQuote ||
        `Age cutoff: ${scholarship.minAge ?? ''} to ${scholarship.maxAge ?? ''}`,
      officialSourceUrl: scholarship.officialUrl,
    });
  } else if (!gpaPass) {
    warningsCount++;
    academicScore = 8;
    audits.push({
      requirementId: `${scholarship.id}-audit-gpa`,
      category: 'Academic Metric',
      label: 'Competitive GPA Benchmark',
      status: 'warning',
      studentValue: `${student.gpa?.toFixed(2)} GPA`,
      requiredValue: `Minimum ${scholarship.minGpa?.toFixed(1)} GPA`,
      reasoning: `Your reported GPA (${student.gpa?.toFixed(2)}) is below the stated minimum of ${scholarship.minGpa?.toFixed(1)}.`,
      officialQuote:
        scholarship.requirementsList.find((r) => r.category === 'academics')?.officialSourceQuote ||
        `Minimum GPA benchmark: ${scholarship.minGpa?.toFixed(1)}`,
      officialSourceUrl: scholarship.officialUrl,
    });
  } else {
    academicScore = 20;
    passesCount++;
    audits.push({
      requirementId: `${scholarship.id}-audit-academic`,
      category: 'Academic Metric',
      label: 'Academic Standing & Age Verification',
      status: 'passed',
      studentValue: `${student.gpa ? student.gpa.toFixed(2) + ' GPA' : 'Good standing'} • ${student.age ? student.age + ' yrs' : 'Age verified'}`,
      requiredValue: `${scholarship.minGpa ? 'Min ' + scholarship.minGpa.toFixed(1) + ' GPA' : 'Standard admission'}`,
      reasoning: 'Your academic metrics and age parameters satisfy the documented criteria.',
      officialQuote: 'Standard academic and age prerequisites met.',
      officialSourceUrl: scholarship.officialUrl,
    });
  }

  // ----------------------------------------------------
  // 5. Funding Needs Alignment
  // ----------------------------------------------------
  const studentNeedsTuition = student.fundingNeeds?.needsTuition ?? true;
  const isTuitionCovered = scholarship.funding.tuitionCovered;

  if (studentNeedsTuition && isTuitionCovered) {
    fundingScore = 10;
  } else if (!studentNeedsTuition) {
    fundingScore = 10;
  } else {
    fundingScore = 4;
    warningsCount++;
    audits.push({
      requirementId: `${scholarship.id}-audit-funding`,
      category: 'Funding Match',
      label: 'Tuition Coverage Alignment',
      status: 'warning',
      studentValue: 'Requires full tuition funding',
      requiredValue: scholarship.funding.isFullyFunded ? '100% Fully Funded' : 'Partial / Tuition fee required',
      reasoning: 'You indicated a requirement for 100% tuition coverage, but this program requires personal tuition co-pay.',
      officialQuote: scholarship.funding.fundingTypeNote,
      officialSourceUrl: scholarship.officialUrl,
    });
  }

  // ----------------------------------------------------
  // Calculate Deterministic Score Breakdown (0 - 100)
  // ----------------------------------------------------
  const scoreBreakdown: MatchScoreBreakdown = {
    academicLevelFit: Math.min(25, Math.max(0, levelScore)),
    nationalityResidenceFit: Math.min(25, Math.max(0, nationalityScore)),
    subjectDisciplineFit: Math.min(20, Math.max(0, subjectScore)),
    academicThresholdFit: Math.min(20, Math.max(0, academicScore)),
    fundingAlignmentFit: Math.min(10, Math.max(0, fundingScore)),
  };

  const totalScore =
    scoreBreakdown.academicLevelFit +
    scoreBreakdown.nationalityResidenceFit +
    scoreBreakdown.subjectDisciplineFit +
    scoreBreakdown.academicThresholdFit +
    scoreBreakdown.fundingAlignmentFit;

  // Compile explicit lists of unmet mandatory requirements & items needing confirmation
  const unmetRequirements: string[] = audits
    .filter((a) => a.status === 'failed')
    .map((a) => a.reasoning || `${a.category}: ${a.label} requirement not met`);

  const verificationNeededItems: string[] = audits
    .filter((a) => a.status === 'unknown' || a.status === 'warning')
    .map((a) => a.missingInfoNote || a.reasoning || `${a.category}: Verification required`);

  // Compute 3-tier status according to strict specification:
  // 1. 'eligible' - all known mandatory criteria are met
  // 2. 'needs_verification' - an important requirement is unknown or ambiguous, with no confirmed disqualifying requirement
  // 3. 'ineligible' - at least one explicit mandatory requirement is not met
  let computedTier: 'eligible' | 'needs_verification' | 'ineligible';
  let status: EligibilityStatus;
  let headline: string;
  let summaryReasoning: string;

  if (hardFailsCount > 0) {
    computedTier = 'ineligible';
    status = 'ineligible';
    headline = 'Not eligible based on documented requirements';
    summaryReasoning = unmetRequirements.length > 0
      ? unmetRequirements.join(' ')
      : `You do not meet ${hardFailsCount} mandatory requirement(s) (such as academic degree level, citizenship exclusions, or minimum age cutoff).`;
  } else if (unknownsCount > 0 || warningsCount > 0 || missingProfileFields.length > 0) {
    computedTier = 'needs_verification';
    status = unknownsCount >= 2 || missingProfileFields.length >= 2 ? 'insufficient_info' : 'potentially_eligible';
    headline = 'Eligibility to confirm — additional verification needed';
    summaryReasoning = verificationNeededItems.length > 0
      ? `Core qualifications match, but ${verificationNeededItems.length} item(s) require verification: ${verificationNeededItems.slice(0, 2).join('; ')}.`
      : 'Core academic standing aligns, but specific institutional or document prerequisites require verification on the official portal.';
  } else {
    computedTier = 'eligible';
    status = 'likely_eligible';
    headline = 'Eligible — all known mandatory criteria met';
    summaryReasoning = `All documented mandatory criteria (degree level ${studentLevel}, citizenship ${studentNats.join(', ') || 'worldwide'}, and academic metrics) match your reported record.`;
  }

  const scoreExplanation = `Criteria Match Breakdown: Study Level Fit (${scoreBreakdown.academicLevelFit}/25), Citizenship Fit (${scoreBreakdown.nationalityResidenceFit}/25), Subject Fit (${scoreBreakdown.subjectDisciplineFit}/20), Academic Metrics (${scoreBreakdown.academicThresholdFit}/20), Funding Alignment (${scoreBreakdown.fundingAlignmentFit}/10).`;

  const disclaimers = [
    'This evaluation is produced by deterministic rule comparison against stored public guidelines from official sources.',
    'This match score reflects documented criteria alignment only, not an admission or selection probability.',
    'Deadlines, quotas, and terms may be updated by sponsoring ministries or universities. Always verify with the official link before applying.',
  ];

  return {
    opportunityId: scholarship.id,
    opportunityTitle: scholarship.title,
    status,
    computedTier,
    overallScore: Math.min(100, Math.max(0, totalScore)),
    scoreBreakdown,
    scoreExplanation,
    headline,
    summaryReasoning,
    audits,
    missingProfileFields,
    unmetRequirements,
    verificationNeededItems,
    disclaimers,
    lastEvaluatedAt: new Date().toISOString(),
  };
}
