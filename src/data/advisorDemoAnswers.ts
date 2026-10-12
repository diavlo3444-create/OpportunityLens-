import { Scholarship, StudentProfile, AdvisorResponse } from '../types';

export interface PreGeneratedDemoQA {
  question: string;
  category: 'strategy' | 'financial' | 'documents' | 'alignment';
  answerTemplate: (sch: Scholarship, profile: StudentProfile) => string;
}

export const PRE_GENERATED_DEMO_QUESTIONS: PreGeneratedDemoQA[] = [
  {
    question: 'How can I maximize my competitive chances for this award?',
    category: 'strategy',
    answerTemplate: (sch: Scholarship, profile: StudentProfile) => {
      const gpaVal = profile.gpa ?? 3.8;
      const gpaNote = gpaVal >= 3.7
        ? `Your current GPA (${gpaVal.toFixed(2)}) is well within competitive range.`
        : `With a GPA of ${gpaVal.toFixed(2)}, bolster your profile with exceptional letters of recommendation and demonstrated field leadership.`;

      const primaryNationality = profile.nationalities?.[0] || profile.countryOfResidence || 'your home nation';
      const majorName = profile.fieldOfStudy || 'your discipline';

      return `Strategic Edge for ${sch.title} (${sch.provider}):

• Profile Alignment: As an applicant from ${primaryNationality} applying for ${profile.academicLevel || 'your program'} in ${sch.destinationCountries.join('/')}, emphasize how your academic focus (${majorName}) addresses strategic bilateral or global priorities recognized by ${sch.provider}.
• Academic Strength: ${gpaNote} Ensure your personal statement directly connects past research or leadership to the host institution's curriculum.
• Crucial Step: Begin by obtaining early endorsement from academic referees who can attest to your adaptability and potential for high-impact contributions.

Target Deadline: ${sch.deadline}. Review requirements early.`;
    },
  },
  {
    question: 'What hidden costs or exclusions should I watch out for in this funding?',
    category: 'financial',
    answerTemplate: (sch: Scholarship) => {
      const isFull = sch.funding?.isFullyFunded || sch.tuitionCoverage.toLowerCase().includes('full');
      const flightNote = sch.travelCoverage.toLowerCase().includes('flight') || sch.travelCoverage.toLowerCase().includes('return')
        ? 'International airfare is included in the statutory award.'
        : 'International flights and initial transit are typically student-borne expenses.';

      return `Financial Breakdown & Disclaimers for ${sch.title}:

• Tuition Coverage: ${sch.tuitionCoverage}. ${isFull ? 'Statutory institutional tuition is fully underwritten.' : 'Partial tuition fees may apply.'}
• Living Allowance: ${sch.stipendAndOtherBenefits || 'Monthly stipend provided as per regional decree.'} Verify accommodation rates in ${sch.destinationCountries[0] || 'the host city'} against the allocated stipend.
• Potential Out-of-Pocket Items: ${flightNote} Visa processing fees, pre-departure medical vaccinations, and refundable housing deposits are rarely reimbursed upfront.
• Contingency: Maintain a minimum emergency reserve of $1,200–$1,800 USD for initial settlement expenses prior to your first stipend disbursement.`;
    },
  },
  {
    question: 'What document timeline and recommendation strategy should I follow?',
    category: 'documents',
    answerTemplate: (sch: Scholarship) => {
      const docList = sch.requiredDocuments && sch.requiredDocuments.length > 0
        ? sch.requiredDocuments.slice(0, 4).join(', ')
        : 'Official transcripts, letters of recommendation, and personal statement';

      return `Document Preparation Roadmap (${sch.title}):

• Priority Documents: Secure ${docList}. Certified notarized copies or official apostilles are often mandatory for ${sch.destinationCountries.join('/')}.
• Recommender Protocol: Provide your referees with a 6-week advance notice. Supply them with the official criteria from ${sch.provider} so their endorsements validate specific statutory traits (e.g. leadership, research rigor).
• Language & Equivalence: Confirm host country credential recognition (${sch.destinationCountries[0] || 'host nation'} equivalence) at least 60 days before ${sch.deadline}.
• Verification Checklist: Cross-reference every document name with the official portal guidelines (${sch.officialProgramUrl}).`;
    },
  },
  {
    question: 'How do I align my personal statement with this provider’s bylaws and priorities?',
    category: 'alignment',
    answerTemplate: (sch: Scholarship, profile: StudentProfile) => {
      const primaryNationality = profile.nationalities?.[0] || profile.countryOfResidence || 'your home region';
      const majorName = profile.fieldOfStudy || 'your field';

      return `Bylaw & Mission Alignment for ${sch.provider}:

• Statutory Objective: ${sch.provider} awards funding to cultivate future leaders who create tangible value in ${sch.destinationCountries[0] || 'the host country'} and internationally.
• Narrative Angle: Position your interest in ${majorName} not just as personal advancement, but as a bridge for collaboration between ${primaryNationality} and ${sch.destinationCountries.join('/')}.
• Concrete Demonstration: Avoid abstract praise. Cite specific faculty, laboratories, or policy initiatives at your target institution. Detail how the skills acquired during this award will be implemented in your post-graduation career plan.
• Brevity Rule: Keep statements focused and proofread against all formal decree instructions.`;
    },
  },
];

/**
 * Generate a pre-verified deterministic demo response for any scholarship and question.
 * Always explicitly marked as Demo Mode.
 */
export function getPreGeneratedDemoResponse(
  question: string,
  sch: Scholarship,
  profile: StudentProfile
): AdvisorResponse {
  // Try to find matching template or default to strategy
  const normalizedQ = question.toLowerCase();
  let matchedQA = PRE_GENERATED_DEMO_QUESTIONS.find((item) =>
    normalizedQ.includes(item.category) ||
    (item.category === 'financial' && (normalizedQ.includes('cost') || normalizedQ.includes('fund') || normalizedQ.includes('exclusion') || normalizedQ.includes('money') || normalizedQ.includes('stipend'))) ||
    (item.category === 'documents' && (normalizedQ.includes('document') || normalizedQ.includes('timeline') || normalizedQ.includes('recommend') || normalizedQ.includes('transcript'))) ||
    (item.category === 'alignment' && (normalizedQ.includes('statement') || normalizedQ.includes('essay') || normalizedQ.includes('bylaw') || normalizedQ.includes('priority') || normalizedQ.includes('align')))
  );

  if (!matchedQA) {
    matchedQA = PRE_GENERATED_DEMO_QUESTIONS[0];
  }

  const adviceText = matchedQA.answerTemplate(sch, profile);
  const words = adviceText.trim().split(/\s+/).length;

  return {
    advice: adviceText,
    isDemo: true,
    model: 'Demo Archive (Pre-Generated Example)',
    wordCount: words,
    cached: false,
    timestamp: new Date().toISOString(),
    keyActionItems: [
      `Review decree on ${sch.provider} portal`,
      `Verify deadline: ${sch.deadline}`,
      `Prepare ${sch.requiredDocuments?.[0] || 'official documents'}`,
    ],
    sourceQuestion: question,
  };
}
