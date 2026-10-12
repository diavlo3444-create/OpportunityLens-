import { Scholarship } from '../types';

export const GLOBAL_SCHOLARSHIPS: Scholarship[] = [
  {
    "id": "sch-chevening-uk",
    "title": "Chevening Scholarships",
    "provider": "UK Foreign, Commonwealth & Development Office (FCDO)",
    "providerType": "National Government",
    "officialProgramUrl": "https://www.chevening.org/",
    "officialApplicationUrl": "https://www.chevening.org/apply/",
    "destinationCountries": [
      "United Kingdom"
    ],
    "eligibleNationalities": [
      "Citizens of 160+ Chevening-eligible partner countries across Africa, Asia, Americas, Europe, Middle East"
    ],
    "eligibleResidenceCountries": [
      "Citizen of and residing in eligible partner country"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": 21,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All Disciplines / Any Subject Area"
    ],
    "academicRequirements": [
      "Undergraduate degree equivalent to an upper second-class 2:1 honours degree in the UK",
      "At least two years (equivalent to 2,800 hours) of demonstrable work experience",
      "Apply to three different eligible UK university courses and receive an unconditional offer"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated leadership and networking potential"
    ],
    "minGpa": 3.3,
    "awardAmountAndCurrency": "Full tuition + ~\u00a31,400/month living stipend + return UK flights",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Monthly living allowance (~\u00a31,350 to \u00a31,650/mo depending on London/outside)",
    "programDuration": "1 Year (12 Months)",
    "openingDate": "2026-08-06",
    "deadline": "November 5, 2026",
    "deadlineDate": "2026-11-05",
    "requiredDocuments": [
      "Official undergraduate degree certificate and academic transcripts",
      "Two professional or academic reference letters",
      "Four Chevening leadership and networking essays",
      "Valid passport",
      "Three unconditional UK university course admission offers (by deadline)"
    ],
    "languageRequirements": [
      "English (Meet university course requirements)"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Be a citizen of a Chevening-eligible country or territory. You must return to your country of citizenship for a minimum of two years after your scholarship has ended. Have completed at least two years of work experience.",
    "lastVerifiedTimestamp": "2026-10-10T12:00:00Z",
    "dataProvenance": "UK Foreign, Commonwealth & Development Office (FCDO) official decree portal",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-uk-chevening",
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-10-10T12:00:00Z",
    "tags": [
      "UK",
      "Masters",
      "Full Ride",
      "Government",
      "Chevening",
      "FCDO"
    ],
    "organizer": "UK Foreign, Commonwealth & Development Office (FCDO)",
    "officialUrl": "https://www.chevening.org/",
    "category": "Master's Fellowship",
    "badge": "100% Fully Funded (Tuition, Stipend & UK Flights)",
    "summary": "The UK government\u2019s flagship global scholarship programme, funded by the FCDO and partner universities, offering full financial support for a one-year Master\u2019s degree at any UK university.",
    "description": "Chevening Scholarships enable outstanding emerging leaders from over 160 countries to pursue one-year Master\u2019s degrees in any subject at any university in the United Kingdom.",
    "location": "United Kingdom (Any accredited UK university)",
    "format": "In-person",
    "dates": "September 2027 \u2013 September 2028",
    "duration": "1 Year (12 Months)",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full university tuition + approx. \u00a31,400/month living stipend + flights",
    "funding": {
      "tuitionUsd": 32000,
      "accommodationUsd": 14000,
      "mealsUsd": 6500,
      "travelUsd": 1500,
      "visaInsuranceUsd": 800,
      "stipendUsd": 21000,
      "otherUsd": 1200,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living allowance (~\u00a31,350 to \u00a31,650/mo depending on London/outside)",
      "fundingTypeNote": "100% fully funded: Full tuition fees, monthly living allowance, economy return flights to the UK, and visa reimbursement.",
      "financialExclusions": [
        "Study materials beyond standard allowances",
        "Dependent family member costs"
      ]
    },
    "requirementsList": [
      {
        "id": "chev-nat",
        "category": "nationality",
        "label": "Chevening Eligible Citizenship",
        "ruleDescription": "Must be a citizen of a Chevening-eligible country or territory.",
        "officialSourceQuote": "Be a citizen of a Chevening-eligible country or territory. You must return to your country of citizenship for a minimum of two years after your scholarship has ended.",
        "isHardRequirement": true
      },
      {
        "id": "chev-degree",
        "category": "academic_level",
        "label": "Completed Undergraduate Degree",
        "ruleDescription": "Must hold an undergraduate degree meeting UK 2:1 standards.",
        "officialSourceQuote": "Have an undergraduate degree that will enable you to gain entry onto a postgraduate programme at a UK university (typically an upper second-class 2:1 honours degree or international equivalent).",
        "isHardRequirement": true
      },
      {
        "id": "chev-work",
        "category": "academics",
        "label": "Two Years Work Experience",
        "ruleDescription": "Must have accumulated at least 2,800 hours of eligible work experience.",
        "officialSourceQuote": "Have completed at least two years of work experience (equivalent to 2,800 hours) prior to submitting your application.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-10",
    "sourceType": "Government Official Portal",
    "sourceUrl": "https://www.chevening.org/scholarships/who-can-apply/eligibility-criteria/"
  },
  {
    "id": "sch-commonwealth-uk",
    "title": "Commonwealth Master\u2019s and PhD Scholarships",
    "provider": "Commonwealth Scholarship Commission in the UK (CSC UK)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/",
    "officialApplicationUrl": "https://cscuk.fcdo.gov.uk/apply/",
    "destinationCountries": [
      "United Kingdom"
    ],
    "eligibleNationalities": [
      "Citizens of eligible Commonwealth developing countries"
    ],
    "eligibleResidenceCountries": [
      "Permanently resident in an eligible Commonwealth country"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Development-related themes (Science, Health, Global Peace, Resilience, Opportunity)"
    ],
    "academicRequirements": [
      "Hold a first degree of at least upper second class (2:1) honours standard",
      "Be unable to afford to study in the UK without this scholarship"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated financial need and development impact in home country"
    ],
    "minGpa": 3.4,
    "awardAmountAndCurrency": "Approved airfare + full tuition + stipend \u00a31,347/month (\u00a31,652 in London)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Warm clothing allowance, study travel grant, thesis grant",
    "programDuration": "1 Year (Master's) or 3 Years (PhD)",
    "openingDate": "2026-09-01",
    "deadline": "October 17, 2026",
    "deadlineDate": "2026-10-17",
    "requiredDocuments": [
      "Proof of citizenship or refugee status",
      "Full academic transcripts",
      "Two references submitted directly by referees",
      "Development impact statement across 4 key criteria"
    ],
    "languageRequirements": [
      "English proficiency for UK university admission"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Be a citizen of or have been granted refugee status by an eligible Commonwealth country, or be a British Protected Person. Be permanently resident in an eligible Commonwealth country.",
    "lastVerifiedTimestamp": "2026-10-09T10:00:00Z",
    "dataProvenance": "Commonwealth Scholarship Commission UK statutory guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-uk-commonwealth",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-09T10:00:00Z",
    "tags": [
      "UK",
      "Commonwealth",
      "Masters",
      "PhD",
      "Development",
      "Fully Funded"
    ],
    "organizer": "Commonwealth Scholarship Commission in the UK (CSC UK)",
    "officialUrl": "https://cscuk.fcdo.gov.uk/",
    "category": "Master's Fellowship",
    "badge": "100% Full Commonwealth Scholarship",
    "summary": "Funded by the UK Foreign, Commonwealth & Development Office for talented individuals from Commonwealth developing countries who could not otherwise afford UK study.",
    "description": "Commonwealth Scholarships are funded by the UK FCDO with the purpose of contributing to the UK's international development aims and wider overseas interests.",
    "location": "United Kingdom (Partner UK universities)",
    "format": "In-person",
    "dates": "September 2027 \u2013 September 2028",
    "duration": "1 to 3 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full UK tuition + \u00a31,347/month stipend + return airfare + arrival allowances",
    "funding": {
      "tuitionUsd": 30000,
      "accommodationUsd": 13000,
      "mealsUsd": 6000,
      "travelUsd": 1400,
      "visaInsuranceUsd": 800,
      "stipendUsd": 20500,
      "otherUsd": 1100,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u00a31,347/month (\u00a31,652/month in London) + warm clothing allowance",
      "fundingTypeNote": "Full tuition waiver, approved airfare, maintenance stipend, and study travel grants.",
      "financialExclusions": [
        "Family accompaniment allowances for 1-year courses"
      ]
    },
    "requirementsList": [
      {
        "id": "cmnw-nat",
        "category": "nationality",
        "label": "Commonwealth Eligible Citizenship",
        "ruleDescription": "Must be citizen/resident of eligible Commonwealth nation.",
        "officialSourceQuote": "Be a citizen of or have been granted refugee status by an eligible Commonwealth country.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-09",
    "sourceType": "Government Official Portal",
    "sourceUrl": "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/"
  },
  {
    "id": "sch-rhodes-oxford",
    "title": "The Rhodes Scholarship at Oxford",
    "provider": "The Rhodes Trust / University of Oxford",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/",
    "officialApplicationUrl": "https://www.rhodeshouse.ox.ac.uk/scholarships/applications/",
    "destinationCountries": [
      "United Kingdom"
    ],
    "eligibleNationalities": [
      "Global Constituencies (Over 64 countries plus Global Rhodes for any nationality)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": 18,
    "maxAge": 25,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Any full-time postgraduate course at the University of Oxford"
    ],
    "academicRequirements": [
      "Completed undergraduate degree with First Class Honours or GPA 3.7+ out of 4.0",
      "Demonstrated literary and scholastic attainments, energy to use talents to the full"
    ],
    "meritOrNeedRequirements": [
      "Moral force of character and instincts to lead, and to take an interest in fellow beings"
    ],
    "minGpa": 3.7,
    "awardAmountAndCurrency": "Oxford university fees + annual stipend \u00a319,092 + health surcharge & flights",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full maintenance stipend (\u00a319,092/year), visa fees, International Health Surcharge",
    "programDuration": "2 to 3 Years",
    "openingDate": "2026-06-01",
    "deadline": "October 1, 2026 (varies by constituency)",
    "deadlineDate": "2026-10-01",
    "requiredDocuments": [
      "Official transcripts from all universities attended",
      "Personal statement (maximum 750 words)",
      "Academic statement of study (maximum 350 words)",
      "Five to eight letters of recommendation",
      "Proof of age and citizenship"
    ],
    "languageRequirements": [
      "English (Meets Oxford University higher-level requirement)"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The Rhodes Scholarship covers Oxford University course fees, as well as providing an annual stipend. For the 2026/27 academic year, the stipend is \u00a319,092 per annum. Two economy class flights to and from Oxford are also provided.",
    "lastVerifiedTimestamp": "2026-10-08T11:00:00Z",
    "dataProvenance": "The Rhodes Trust Oxford official charter and regulations",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-ox-rhodes",
    "createdAt": "2026-06-01T00:00:00Z",
    "updatedAt": "2026-10-08T11:00:00Z",
    "tags": [
      "UK",
      "Oxford",
      "Rhodes",
      "Masters",
      "PhD",
      "Prestigious",
      "Full Ride"
    ],
    "organizer": "The Rhodes Trust / University of Oxford",
    "officialUrl": "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/",
    "category": "Master's Fellowship",
    "badge": "100% Full Oxford Fellowship",
    "summary": "The oldest and perhaps most prestigious international scholarship programme, enabling outstanding young people from around the world to study at the University of Oxford.",
    "description": "Rhodes Scholars come from across the globe to undertake postgraduate study at Oxford, developing qualities of intellect, character, leadership, and commitment to service.",
    "location": "Oxford, United Kingdom",
    "format": "In-person",
    "dates": "October 2027 \u2013 July 2029",
    "duration": "2 to 3 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "All Oxford University fees + \u00a319,092/year stipend + flights & health surcharge",
    "funding": {
      "tuitionUsd": 38000,
      "accommodationUsd": 15000,
      "mealsUsd": 7000,
      "travelUsd": 1600,
      "visaInsuranceUsd": 1200,
      "stipendUsd": 24500,
      "otherUsd": 1500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u00a319,092 per annum living allowance + settling-in allowance",
      "fundingTypeNote": "100% full coverage of university tuition, college fees, living stipend, IHS and airfare.",
      "financialExclusions": [
        "Courses requiring clinical medical placement fees outside standard bands"
      ]
    },
    "requirementsList": [
      {
        "id": "rhod-age",
        "category": "age",
        "label": "Age Eligibility Window",
        "ruleDescription": "Must be aged 18 to 24 (or up to 27 for older degree completion).",
        "officialSourceQuote": "Upon 1 October 2026, you must be at least 18 and not yet have reached your 25th birthday.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-08",
    "sourceType": "Philanthropic Trust Portal",
    "sourceUrl": "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/"
  },
  {
    "id": "sch-gates-cambridge",
    "title": "Gates Cambridge Scholarships",
    "provider": "Gates Cambridge Trust / University of Cambridge",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.gatescambridge.org/",
    "officialApplicationUrl": "https://www.gatescambridge.org/apply/how-to-apply/",
    "destinationCountries": [
      "United Kingdom"
    ],
    "eligibleNationalities": [
      "Citizens of any country outside the United Kingdom"
    ],
    "eligibleResidenceCountries": [
      "Global (Non-UK)"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Any subject available at the University of Cambridge (Full-time)"
    ],
    "academicRequirements": [
      "Outstanding intellectual ability (top 5\u201310% of graduating cohort; GPA 3.8+ or First Class Honours)",
      "Clear alignment with Cambridge faculty research programs"
    ],
    "meritOrNeedRequirements": [
      "Commitment to improving the lives of others; leadership capacity"
    ],
    "minGpa": 3.8,
    "awardAmountAndCurrency": "University Composition Fee + \u00a321,000/year maintenance allowance + visa & flights",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "\u00a321,000/year stipend, inbound/outbound airfare, visa and IHS fees, discretionary family allowance",
    "programDuration": "1 to 4 Years",
    "openingDate": "2026-09-01",
    "deadline": "December 3, 2026 (or January 7, 2027 depending on course)",
    "deadlineDate": "2026-12-03",
    "requiredDocuments": [
      "Cambridge University graduate application form",
      "Gates Cambridge 500-word statement",
      "Research proposal (for PhD)",
      "Two academic references plus one Gates Cambridge reference",
      "Transcripts and CV"
    ],
    "languageRequirements": [
      "English meeting Cambridge University postgraduate requirements"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "A Gates Cambridge Scholarship covers the full cost of studying at Cambridge. It also provides additional, discretionary funding. The University Composition Fee at the appropriate rate and a maintenance allowance for a single student (\u00a321,000 for 12 months).",
    "lastVerifiedTimestamp": "2026-10-08T10:00:00Z",
    "dataProvenance": "Gates Cambridge Trust official trust statutes",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-cam-gates",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "tags": [
      "UK",
      "Cambridge",
      "Gates",
      "Masters",
      "PhD",
      "Fully Funded"
    ],
    "organizer": "Gates Cambridge Trust / University of Cambridge",
    "officialUrl": "https://www.gatescambridge.org/",
    "category": "Master's Fellowship",
    "badge": "100% Full Cambridge Fellowship",
    "summary": "Full-cost scholarships for outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree in any subject available at the University of Cambridge.",
    "description": "Established through a $210 million donation from the Bill and Melinda Gates Foundation to build a global network of future leaders committed to improving the lives of others.",
    "location": "Cambridge, United Kingdom",
    "format": "In-person",
    "dates": "October 2027 \u2013 September 2028",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full University Composition Fee + \u00a321,000/year maintenance allowance + visa & flights",
    "funding": {
      "tuitionUsd": 37000,
      "accommodationUsd": 15000,
      "mealsUsd": 7000,
      "travelUsd": 1500,
      "visaInsuranceUsd": 1200,
      "stipendUsd": 27000,
      "otherUsd": 1500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u00a321,000 for 12 months at the 2026-27 rate + discretionary funding",
      "fundingTypeNote": "Full University Composition Fee, single student maintenance allowance, single economy airfare, visa and IHS.",
      "financialExclusions": [
        "Non-course related travel"
      ]
    },
    "requirementsList": [
      {
        "id": "gates-nat",
        "category": "nationality",
        "label": "Citizen of Country Outside UK",
        "ruleDescription": "Must be citizen of any country other than the United Kingdom.",
        "officialSourceQuote": "You can apply for a Gates Cambridge Scholarship if you are a citizen of any country outside the United Kingdom.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-08",
    "sourceType": "Philanthropic Trust Portal",
    "sourceUrl": "https://www.gatescambridge.org/"
  },
  {
    "id": "sch-clarendon-oxford",
    "title": "Clarendon Fund Scholarships",
    "provider": "University of Oxford / Oxford University Press",
    "providerType": "Public University",
    "officialProgramUrl": "https://www.ox.ac.uk/clarendon",
    "officialApplicationUrl": "https://www.ox.ac.uk/clarendon/how-to-apply",
    "destinationCountries": [
      "United Kingdom"
    ],
    "eligibleNationalities": [
      "Open Worldwide (All nationalities, domestic and international)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All degree-bearing Master's and DPhil courses at University of Oxford"
    ],
    "academicRequirements": [
      "Outstanding academic record (First Class Honours, GPA 3.8+, or international equivalent)",
      "Future potential and aptitude for advanced research"
    ],
    "meritOrNeedRequirements": [
      "Selected purely on academic excellence and research potential"
    ],
    "minGpa": 3.8,
    "awardAmountAndCurrency": "Full tuition waiver + generous living stipend (~\u00a319,237/year)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Annual grant for living expenses matched to UKRI doctoral minimum rates",
    "programDuration": "1 to 4 Years",
    "openingDate": "2026-09-01",
    "deadline": "December 2026 \u2013 January 2027 (course deadline)",
    "deadlineDate": "2027-01-15",
    "requiredDocuments": [
      "Standard Oxford graduate application form",
      "Academic transcripts",
      "CV / Resume",
      "Research proposal or written work",
      "Three academic references"
    ],
    "languageRequirements": [
      "Meets Oxford university course language requirements"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "All Clarendon scholarships cover tuition and college fees in full and provide a generous grant for living expenses for scholars on a full-time course.",
    "lastVerifiedTimestamp": "2026-10-07T09:00:00Z",
    "dataProvenance": "University of Oxford graduate admissions registry",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-ox-rhodes",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-07T09:00:00Z",
    "tags": [
      "UK",
      "Oxford",
      "Clarendon",
      "Masters",
      "PhD",
      "Merit",
      "Full Tuition"
    ],
    "organizer": "University of Oxford",
    "officialUrl": "https://www.ox.ac.uk/clarendon",
    "category": "Master's Fellowship",
    "badge": "100% Full Oxford Tuition & Living Stipend",
    "summary": "Oxford University\u2019s flagship scholarship scheme, offering around 160 fully funded scholarships every year to outstanding graduate scholars of any nationality.",
    "description": "Clarendon scholarships are awarded on the basis of academic excellence and potential across all degree-bearing subjects at graduate level at Oxford.",
    "location": "Oxford, United Kingdom",
    "format": "In-person",
    "dates": "October 2027 \u2013 July 2028",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% full course fees + annual living stipend ~\u00a319,237",
    "funding": {
      "tuitionUsd": 38000,
      "accommodationUsd": 14000,
      "mealsUsd": 6500,
      "travelUsd": 0,
      "visaInsuranceUsd": 0,
      "stipendUsd": 24500,
      "otherUsd": 1000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": false,
      "visaInsuranceCovered": false,
      "stipendAmount": "Living allowance matching UKRI doctoral rates (~\u00a319,237/year)",
      "fundingTypeNote": "Full tuition and living expenses covered. Scholars cover initial visa and flight costs.",
      "financialExclusions": [
        "Travel costs and visa application fees"
      ]
    },
    "requirementsList": [
      {
        "id": "clar-merit",
        "category": "academics",
        "label": "High Academic Distinction",
        "ruleDescription": "First-class honours or GPA 3.8+ required.",
        "officialSourceQuote": "Applicants are evaluated primarily on academic excellence and research potential.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-07",
    "sourceType": "University Portal",
    "sourceUrl": "https://www.ox.ac.uk/clarendon"
  },
  {
    "id": "sch-fulbright-foreign-student",
    "title": "Fulbright Foreign Student Program",
    "provider": "U.S. Department of State (Bureau of Educational and Cultural Affairs)",
    "providerType": "National Government",
    "officialProgramUrl": "https://foreign.fulbrightonline.org/",
    "officialApplicationUrl": "https://foreign.fulbrightonline.org/about/foreign-student-program",
    "destinationCountries": [
      "United States"
    ],
    "eligibleNationalities": [
      "Citizens of 160+ partner nations with active bilateral Fulbright commissions or embassy programs"
    ],
    "eligibleResidenceCountries": [
      "Residing in country of citizenship at time of application"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All academic fields (excluding clinical medical training)"
    ],
    "academicRequirements": [
      "Completed Bachelor\u2019s degree (equivalent to US 4-year degree)",
      "Demonstrated academic excellence and English language proficiency"
    ],
    "meritOrNeedRequirements": [
      "Leadership potential and commitment to mutual intercultural understanding"
    ],
    "minGpa": 3.5,
    "awardAmountAndCurrency": "Full university tuition + monthly maintenance stipend + round-trip US airfare",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Monthly living allowance + book allowance + health benefit (ASPE)",
    "programDuration": "1 to 2 Years (Master\u2019s) or up to 4 Years (PhD)",
    "openingDate": "2026-02-01",
    "deadline": "Varies by Country (October \u2013 November 2026)",
    "deadlineDate": "2026-10-31",
    "requiredDocuments": [
      "Official undergraduate and graduate transcripts",
      "Three letters of recommendation",
      "Study/Research Objective statement",
      "Personal Statement essay",
      "TOEFL iBT or IELTS score report"
    ],
    "languageRequirements": [
      "TOEFL iBT or IELTS meeting US graduate school cutoffs"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Program eligibility and selection procedures vary widely by country. Applicants must not be U.S. citizens or permanent residents.",
    "lastVerifiedTimestamp": "2026-10-09T14:00:00Z",
    "dataProvenance": "U.S. Department of State official Bureau of Educational and Cultural Affairs registry",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-us-fulbright",
    "createdAt": "2026-02-01T00:00:00Z",
    "updatedAt": "2026-10-09T14:00:00Z",
    "tags": [
      "USA",
      "State Dept",
      "Fulbright",
      "Masters",
      "PhD",
      "Full Ride",
      "Global Exchange"
    ],
    "organizer": "U.S. Department of State",
    "officialUrl": "https://foreign.fulbrightonline.org/",
    "category": "Graduate Fellowship",
    "badge": "100% Full US Government Fellowship",
    "summary": "The flagship international educational exchange program sponsored by the U.S. government, bringing accomplished graduates from 160+ countries to study for Master\u2019s and PhD degrees in the United States.",
    "description": "The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States.",
    "location": "United States (Participating US Universities)",
    "format": "In-person",
    "dates": "Academic Year 2027\u20132028",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full university tuition + monthly maintenance stipend + round-trip US airfare",
    "funding": {
      "tuitionUsd": 45000,
      "accommodationUsd": 16000,
      "mealsUsd": 7000,
      "travelUsd": 1800,
      "visaInsuranceUsd": 1100,
      "stipendUsd": 24000,
      "otherUsd": 1500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living allowance + book allowance + health benefit (ASPE)",
      "fundingTypeNote": "Covers 100% of tuition, required university fees, monthly stipend, and round-trip airfare.",
      "financialExclusions": [
        "Clinical medicine with direct patient contact"
      ]
    },
    "requirementsList": [
      {
        "id": "fulb-citizenship",
        "category": "nationality",
        "label": "Partner Country Citizenship",
        "ruleDescription": "Must be a citizen of a participating country and not hold US dual citizenship.",
        "officialSourceQuote": "Program eligibility and selection procedures vary widely by country. Applicants must not be U.S. citizens or permanent residents.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-09",
    "sourceType": "Government Official Portal",
    "sourceUrl": "https://foreign.fulbrightonline.org/about/foreign-student-program"
  },
  {
    "id": "sch-knight-hennessy-stanford",
    "title": "Knight-Hennessy Scholars at Stanford",
    "provider": "Stanford University / Knight-Hennessy Scholars",
    "providerType": "Private University",
    "officialProgramUrl": "https://knight-hennessy.stanford.edu/",
    "officialApplicationUrl": "https://knight-hennessy.stanford.edu/admission/planning-apply",
    "destinationCountries": [
      "United States"
    ],
    "eligibleNationalities": [
      "Open Worldwide (All nationalities, US and international)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Any graduate degree program across all seven schools of Stanford University (JD, MA, MBA, MD, MFA, MS, PhD)"
    ],
    "academicRequirements": [
      "Earned first bachelor\u2019s degree in January 2020 or later",
      "Sharp mind, intellectual curiosity, and ability to seek out new perspectives"
    ],
    "meritOrNeedRequirements": [
      "Independence of thought, purposeful leadership, and civic mindset"
    ],
    "minGpa": 3.7,
    "awardAmountAndCurrency": "Full Stanford tuition + living stipend + books & travel grant (~$95,000/year value)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Fixed Airfare Allowance",
    "stipendAndOtherBenefits": "Stipend for living and academic expenses, annual economy return airfare to/from Stanford",
    "programDuration": "Up to 3 Years (with departmental continuation for doctoral)",
    "openingDate": "2026-06-01",
    "deadline": "October 8, 2026",
    "deadlineDate": "2026-10-08",
    "requiredDocuments": [
      "Online Knight-Hennessy application",
      "Unofficial transcripts for all degree programs",
      "Standardized test scores required by Stanford graduate degree program",
      "One-page resume",
      "Two recommendation letters evaluating leadership and character",
      "Two short personal essays"
    ],
    "languageRequirements": [
      "Meets Stanford University graduate degree program requirements"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The Knight-Hennessy Scholars program funds up to three years of graduate education at Stanford. Funding includes tuition and associated fees, a stipend for living and academic expenses, and an economy class ticket for one annual trip to and from Stanford.",
    "lastVerifiedTimestamp": "2026-10-07T14:00:00Z",
    "dataProvenance": "Knight-Hennessy Scholars admissions charter",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-stanford-knight-hennessy",
    "createdAt": "2026-06-01T00:00:00Z",
    "updatedAt": "2026-10-07T14:00:00Z",
    "tags": [
      "USA",
      "Stanford",
      "Knight Hennessy",
      "Masters",
      "PhD",
      "Full Ride",
      "Leadership"
    ],
    "organizer": "Stanford University",
    "officialUrl": "https://knight-hennessy.stanford.edu/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Stanford Fellowship",
    "summary": "Multidisciplinary, multicultural graduate fellowship program at Stanford University providing full financial support and leadership development for scholars from any country.",
    "description": "Knight-Hennessy Scholars is designed to prepare a new generation of global leaders to address complex challenges through collaboration across disciplines.",
    "location": "Stanford, California, United States",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2030",
    "duration": "Up to 3 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + living and academic stipend + annual round-trip flight grant",
    "funding": {
      "tuitionUsd": 58000,
      "accommodationUsd": 20000,
      "mealsUsd": 8000,
      "travelUsd": 2000,
      "visaInsuranceUsd": 1500,
      "stipendUsd": 32000,
      "otherUsd": 2000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Living stipend approx. $32,000/year + annual flight stipend",
      "fundingTypeNote": "Full tuition and fees for up to three years, living stipend, and annual travel grant.",
      "financialExclusions": [
        "Years beyond three (funded by academic departments for PhD candidates)"
      ]
    },
    "requirementsList": [
      {
        "id": "kh-grad-year",
        "category": "academic_level",
        "label": "Recent Bachelor's Degree",
        "ruleDescription": "Must have earned bachelor\u2019s within seven years of entry.",
        "officialSourceQuote": "You must have graduated with your first degree within the past seven years.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-07",
    "sourceType": "University Portal",
    "sourceUrl": "https://knight-hennessy.stanford.edu/"
  },
  {
    "id": "sch-rsi-cee-mit",
    "title": "Research Science Institute (RSI)",
    "provider": "Center for Excellence in Education (CEE) & MIT",
    "providerType": "Public University",
    "officialProgramUrl": "https://www.cee.org/programs/research-science-institute",
    "officialApplicationUrl": "https://www.cee.org/programs/research-science-institute/apply-rsi",
    "destinationCountries": [
      "United States"
    ],
    "eligibleNationalities": [
      "United States Citizens & International Students via designated country partners"
    ],
    "eligibleResidenceCountries": [
      "United States and participating international nations"
    ],
    "academicLevels": [
      "High School"
    ],
    "minAge": 15,
    "maxAge": 18,
    "eligibleGrades": [
      11
    ],
    "subjectRestrictions": [
      "STEM (Mathematics, Biology, Chemistry, Physics, Computer Science, Engineering)"
    ],
    "academicRequirements": [
      "Current high school junior (11th grade)",
      "Exceptional mathematical and scientific problem-solving abilities",
      "Recommended PSAT Math 740+ / SAT Math 760+ / ACT Math 33+ or Olympiad achievements"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated intellectual drive and scientific research ambition"
    ],
    "minGpa": 3.9,
    "awardAmountAndCurrency": "Cost-free: 100% Tuition, room, board, and research equipment covered ($0 tuition)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Full Board / Meal Plan",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Full access to MIT laboratory equipment, computational clusters, scientific mentors",
    "programDuration": "6 Weeks (Summer)",
    "openingDate": "2026-11-01",
    "deadline": "December 13, 2026 (US) / February 15, 2027 (International)",
    "deadlineDate": "2026-12-13",
    "requiredDocuments": [
      "High school official transcript",
      "Standardized test score reports (PSAT, SAT, ACT, or AP)",
      "Two to three recommendation letters from math/science teachers and research supervisors",
      "Research interest essay answers"
    ],
    "languageRequirements": [
      "English fluency"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "RSI is cost-free to students. Selected participants receive full tuition, room, and board at no cost. Students only pay for their personal transportation to and from MIT.",
    "lastVerifiedTimestamp": "2026-10-08T10:00:00Z",
    "dataProvenance": "Center for Excellence in Education official prospectus",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-cee-mit",
    "createdAt": "2026-10-01T00:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "tags": [
      "USA",
      "High School",
      "MIT",
      "CEE",
      "STEM",
      "Summer Research",
      "Fully Funded"
    ],
    "organizer": "Center for Excellence in Education (CEE) & MIT",
    "officialUrl": "https://www.cee.org/programs/research-science-institute",
    "category": "Summer Research",
    "badge": "100% Cost-Free Prestigious Summer Research",
    "summary": "The premier summer science & engineering program for high school juniors, combining on-campus scientific theory with off-campus work in science and technology research at MIT.",
    "description": "Each summer, 100 of the world\u2019s most accomplished high school students gather at the Massachusetts Institute of Technology for six weeks of intensive scientific research.",
    "location": "Cambridge, Massachusetts, United States (MIT campus)",
    "format": "In-person",
    "dates": "June 27, 2027 \u2013 August 7, 2027",
    "duration": "6 Weeks",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% cost-free tuition, MIT dorms, and campus dining ($0 fee)",
    "funding": {
      "tuitionUsd": 7500,
      "accommodationUsd": 3500,
      "mealsUsd": 1800,
      "travelUsd": 0,
      "visaInsuranceUsd": 0,
      "stipendUsd": 0,
      "otherUsd": 500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": false,
      "visaInsuranceCovered": false,
      "stipendAmount": "Cost-free program ($0 tuition/room/board)",
      "fundingTypeNote": "Program tuition, MIT dormitory housing, and all campus meals are provided at zero cost.",
      "financialExclusions": [
        "Travel to and from Boston/Cambridge",
        "Personal spending money"
      ]
    },
    "requirementsList": [
      {
        "id": "rsi-grade",
        "category": "grade",
        "label": "High School Junior (Grade 11)",
        "ruleDescription": "Must be in the penultimate year of secondary school.",
        "officialSourceQuote": "Students must be high school juniors when applying.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-08",
    "sourceType": "Academic Institute Portal",
    "sourceUrl": "https://www.cee.org/programs/research-science-institute"
  },
  {
    "id": "sch-tass-telluride",
    "title": "Telluride Association Summer Seminars (TASS)",
    "provider": "Telluride Association",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.tellurideassociation.org/our-programs/high-school-students/",
    "officialApplicationUrl": "https://www.tellurideassociation.org/our-programs/high-school-students/apply-tass/",
    "destinationCountries": [
      "United States"
    ],
    "eligibleNationalities": [
      "Open Worldwide (High school sophomores and juniors worldwide)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "High School"
    ],
    "minAge": 15,
    "maxAge": 17,
    "eligibleGrades": [
      10,
      11
    ],
    "subjectRestrictions": [
      "Critical Black Studies, Anti-Oppressive Studies, Humanities & Social Sciences"
    ],
    "academicRequirements": [
      "Current high school sophomore (10th grade) or junior (11th grade)",
      "Commitment to learning, democratic community living, and intellectual growth"
    ],
    "meritOrNeedRequirements": [
      "Curiosity, self-reflection, and social awareness"
    ],
    "minGpa": null,
    "awardAmountAndCurrency": "100% Free: Full tuition, room, board, books, and need-based travel subsidies",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Full Board / Meal Plan",
    "travelCoverage": "Fixed Airfare Allowance",
    "stipendAndOtherBenefits": "Financial aid for travel and replacement-wage stipends for working students",
    "programDuration": "6 Weeks (Summer)",
    "openingDate": "2026-10-01",
    "deadline": "December 4, 2026",
    "deadlineDate": "2026-12-04",
    "requiredDocuments": [
      "Telluride online application with three reflective essay responses",
      "Official high school transcript",
      "Letter of evaluation / recommendation"
    ],
    "languageRequirements": [
      "English"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Telluride Association programs are completely free. We cover all costs of tuition, books, room, and board. We also provide need-based scholarships for travel and replace lost summer earnings.",
    "lastVerifiedTimestamp": "2026-10-07T12:00:00Z",
    "dataProvenance": "Telluride Association official constitution and endowment guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-telluride",
    "createdAt": "2026-10-01T00:00:00Z",
    "updatedAt": "2026-10-07T12:00:00Z",
    "tags": [
      "USA",
      "High School",
      "Humanities",
      "Telluride",
      "Cornell",
      "Michigan",
      "Fully Funded"
    ],
    "organizer": "Telluride Association",
    "officialUrl": "https://www.tellurideassociation.org/our-programs/high-school-students/",
    "category": "Humanities & Leadership",
    "badge": "100% Free Endowment Program with Travel Aid",
    "summary": "Six-week educational experience for high school sophomores and juniors, focusing on critical studies, democratic community living, and intellectual exploration at Cornell University or University of Maryland.",
    "description": "TASS brings together young people from diverse backgrounds to participate in college-level seminars led by university faculty with zero fees.",
    "location": "Cornell University (Ithaca, NY) and University of Maryland (College Park, MD)",
    "format": "In-person",
    "dates": "June 21, 2027 \u2013 July 31, 2027",
    "duration": "6 Weeks",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% free tuition, room, board + travel aid + summer work replacement stipends",
    "funding": {
      "tuitionUsd": 6500,
      "accommodationUsd": 3200,
      "mealsUsd": 1600,
      "travelUsd": 800,
      "visaInsuranceUsd": 0,
      "stipendUsd": 1000,
      "otherUsd": 300,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": false,
      "stipendAmount": "Need-based travel aid and work replacement stipends",
      "fundingTypeNote": "Completely free: Tuition, books, room, and board are 100% covered by endowment.",
      "financialExclusions": [
        "Personal discretionary spending"
      ]
    },
    "requirementsList": [
      {
        "id": "tass-grade",
        "category": "grade",
        "label": "High School Sophomore or Junior",
        "ruleDescription": "Must be in 10th or 11th grade (or international equivalent).",
        "officialSourceQuote": "You must be currently enrolled as a high school sophomore or junior.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-07",
    "sourceType": "Philanthropic Trust Portal",
    "sourceUrl": "https://www.tellurideassociation.org/our-programs/high-school-students/"
  },
  {
    "id": "sch-daad-epos-germany",
    "title": "DAAD Development-Related Postgraduate Courses (EPOS)",
    "provider": "German Academic Exchange Service (DAAD)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/",
    "officialApplicationUrl": "https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/application/",
    "destinationCountries": [
      "Germany"
    ],
    "eligibleNationalities": [
      "Nationals of DAC List developing and emerging countries"
    ],
    "eligibleResidenceCountries": [
      "Residing in DAC List partner country"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Economic Sciences, Development Cooperation, Engineering, Mathematics, Regional Planning, Agriculture, Environmental Sciences, Medicine/Public Health, Social Sciences"
    ],
    "academicRequirements": [
      "Hold an academic degree (typically a 4-year Bachelor\u2019s) with far above-average results",
      "At least two years of relevant professional experience post-graduation"
    ],
    "meritOrNeedRequirements": [
      "Clear commitment to social responsibility and country development"
    ],
    "minGpa": 3.2,
    "awardAmountAndCurrency": "\u20ac934/month (Master's) or \u20ac1,300/month (PhD) + health insurance + travel allowance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Health, accident, and personal liability insurance; one-off study allowance; rent subsidy",
    "programDuration": "12 to 24 Months (Master\u2019s) or 36 to 48 Months (PhD)",
    "openingDate": "2026-05-01",
    "deadline": "August \u2013 November 2026 (varies by chosen course)",
    "deadlineDate": "2026-10-15",
    "requiredDocuments": [
      "Signed DAAD application form",
      "Hand-signed CV (using Europass format)",
      "Hand-signed letter of motivation (with reference to current occupation)",
      "Academic letters of recommendation from university and employer",
      "Certificates of employment proving at least two years of relevant professional experience",
      "English (IELTS/TOEFL) or German language certificate"
    ],
    "languageRequirements": [
      "English (IELTS 6.0+ or TOEFL 80+) or German (DSH 2 / TestDaF 4)"
    ],
    "sourceLanguage": "German / English",
    "extractedEvidence": "Scholarship payments of 934 euros per month for graduates or 1,300 euros for doctoral candidates. Payments towards health, accident and personal liability insurance coverage. Travel allowance, unless these expenses are covered by the home country or another funding source.",
    "lastVerifiedTimestamp": "2026-10-08T13:00:00Z",
    "dataProvenance": "DAAD Federal Ministry for Economic Cooperation and Development (BMZ) guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-de-daad",
    "createdAt": "2026-05-01T00:00:00Z",
    "updatedAt": "2026-10-08T13:00:00Z",
    "tags": [
      "Germany",
      "DAAD",
      "EPOS",
      "Masters",
      "PhD",
      "Development",
      "Fully Funded"
    ],
    "organizer": "German Academic Exchange Service (DAAD)",
    "officialUrl": "https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/",
    "category": "Master's Fellowship",
    "badge": "100% Full German State Scholarship",
    "summary": "Funded by the Federal Ministry for Economic Cooperation and Development (BMZ) to educate development-focused specialists from developing countries at German universities.",
    "description": "EPOS offers foreign graduates from developing and newly industrialised countries the opportunity to take a postgraduate or Master\u2019s degree at a state or state-recognised German university.",
    "location": "Germany (Participating German State Universities)",
    "format": "In-person",
    "dates": "October 2027 \u2013 September 2029",
    "duration": "12 to 24 Months",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "\u20ac934/mo stipend + health insurance + travel allowance + tuition waiver",
    "funding": {
      "tuitionUsd": 0,
      "accommodationUsd": 7500,
      "mealsUsd": 4500,
      "travelUsd": 1400,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 12500,
      "otherUsd": 800,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u20ac934/month for master scholars + study allowance",
      "fundingTypeNote": "Tuition is free at German public universities; DAAD provides monthly stipend, travel allowance, and insurance.",
      "financialExclusions": [
        "Semester social contribution fee (~\u20ac250\u2013\u20ac350/semester)"
      ]
    },
    "requirementsList": [
      {
        "id": "epos-work",
        "category": "academics",
        "label": "2 Years Relevant Work Experience",
        "ruleDescription": "Must have worked at least two years in relevant sector.",
        "officialSourceQuote": "Candidates have at least two years of professional experience post-graduation.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-08",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/"
  },
  {
    "id": "sch-humboldt-fellowship",
    "title": "Humboldt Research Fellowship for Postdocs & Experienced Researchers",
    "provider": "Alexander von Humboldt Foundation",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/humboldt-research-fellowship",
    "officialApplicationUrl": "https://www.humboldt-foundation.de/en/apply",
    "destinationCountries": [
      "Germany"
    ],
    "eligibleNationalities": [
      "Open Worldwide (Researchers of all nationalities outside Germany)"
    ],
    "eligibleResidenceCountries": [
      "Global (Residing outside Germany)"
    ],
    "academicLevels": [
      "Postdoctoral & Research"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All academic disciplines"
    ],
    "academicRequirements": [
      "Completed doctorate / PhD within the past 4 years (postdocs) or 12 years (experienced researchers)",
      "Academic publications reviewed according to international standards"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated independent research profile and choice of host in Germany"
    ],
    "minGpa": null,
    "awardAmountAndCurrency": "\u20ac2,700/month (postdocs) or \u20ac3,200/month (experienced) + family allowances + travel",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Extensive family allowances, health insurance subsidy, language fellowship in Germany",
    "programDuration": "6 to 24 Months",
    "openingDate": "2026-01-01",
    "deadline": "Applications accepted year-round (Committee reviews in March, July, November)",
    "deadlineDate": "2026-11-01",
    "requiredDocuments": [
      "Curriculum vitae with publication list",
      "Research outline (up to 5 pages)",
      "Host's confidential statement and confirmation of research facilities",
      "Doctoral certificate or proof of completion"
    ],
    "languageRequirements": [
      "Good knowledge of German or English"
    ],
    "sourceLanguage": "German / English",
    "extractedEvidence": "The fellowship amount is 2,700 euros per month for postdocs and 3,200 euros for experienced researchers. In addition, the Foundation provides a mobility allowance and subsidies towards health and liability insurance, as well as travel expenses.",
    "lastVerifiedTimestamp": "2026-10-06T15:00:00Z",
    "dataProvenance": "Alexander von Humboldt Foundation statutory research regulations",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-de-humboldt",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-10-06T15:00:00Z",
    "tags": [
      "Germany",
      "Humboldt",
      "Postdoc",
      "Research",
      "Fully Funded",
      "Global Scholars"
    ],
    "organizer": "Alexander von Humboldt Foundation",
    "officialUrl": "https://www.humboldt-foundation.de/en/",
    "category": "International Fellowship",
    "badge": "Full Postdoctoral Research Fellowship",
    "summary": "Enables high-calibre scientists and scholars of all nationalities and disciplines to conduct self-chosen research in cooperation with an academic host at a research institution in Germany.",
    "description": "The Humboldt Foundation promotes academic cooperation between excellent scientists and scholars from abroad and from Germany.",
    "location": "Germany (Any German university or recognized research institution)",
    "format": "In-person",
    "dates": "Flexible start date in 2027",
    "duration": "6 to 24 Months",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "\u20ac2,700 to \u20ac3,200 per month tax-free stipend + mobility and family allowances",
    "funding": {
      "tuitionUsd": 0,
      "accommodationUsd": 14000,
      "mealsUsd": 7000,
      "travelUsd": 1600,
      "visaInsuranceUsd": 1200,
      "stipendUsd": 35000,
      "otherUsd": 2000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u20ac2,700 to \u20ac3,200/month living stipend + mobility grant",
      "fundingTypeNote": "Generous research fellowship covering stipend, travel, insurance subsidies, and language training.",
      "financialExclusions": [
        "Host institute overhead fees (covered directly by foundation)"
      ]
    },
    "requirementsList": [
      {
        "id": "humb-phd",
        "category": "academic_level",
        "label": "Doctorate Degree",
        "ruleDescription": "Must hold an awarded PhD/doctorate degree.",
        "officialSourceQuote": "Applicants must have completed their doctorate or comparable academic degree.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-06",
    "sourceType": "Foundation Portal",
    "sourceUrl": "https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/humboldt-research-fellowship"
  },
  {
    "id": "sch-france-eiffel",
    "title": "Eiffel Scholarship Program of Excellence",
    "provider": "Campus France / French Ministry for Europe and Foreign Affairs",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.campusfrance.org/en/the-eiffel-scholarship-program-of-excellence",
    "officialApplicationUrl": "https://www.campusfrance.org/en/the-eiffel-scholarship-program-of-excellence",
    "destinationCountries": [
      "France"
    ],
    "eligibleNationalities": [
      "Non-French foreign citizens (emerging nations priority)"
    ],
    "eligibleResidenceCountries": [
      "Non-French nationality"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": 25,
    "maxAge": 30,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Biology and Health, Ecological Transition, Mathematics and Digital, Engineering, French History/Law/Political Sciences, Economics and Management"
    ],
    "academicRequirements": [
      "Outstanding academic record endorsed and submitted directly by an accredited French higher education institution",
      "Age 25 or under for Master's level; age 30 or under for PhD level"
    ],
    "meritOrNeedRequirements": [
      "Proven excellence and institutional sponsorship by French university"
    ],
    "minGpa": 3.6,
    "awardAmountAndCurrency": "\u20ac1,181/month (Master's) or \u20ac1,800/month (PhD) + return airfare + domestic travel + health insurance",
    "tuitionCoverage": "Tuition Waiver",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Campus France accommodation support, cultural activities, social security enrollment",
    "programDuration": "12 to 36 Months",
    "openingDate": "2026-10-01",
    "deadline": "January 10, 2027",
    "deadlineDate": "2027-01-10",
    "requiredDocuments": [
      "Application dossier submitted by French higher education institution",
      "Academic transcripts and diplomas",
      "Professional project and motivation statement",
      "Language proficiency certificates (French or English as required by program)"
    ],
    "languageRequirements": [
      "French or English depending on degree program instruction medium"
    ],
    "sourceLanguage": "French / English",
    "extractedEvidence": "The Eiffel scholarship provides a monthly allowance of 1,181 euros for master\u2019s level or 1,800 euros for doctoral level. In addition, the program covers international round-trip airfare, domestic travel, health insurance, and cultural activities.",
    "lastVerifiedTimestamp": "2026-10-05T12:00:00Z",
    "dataProvenance": "Campus France official Ministry for Europe and Foreign Affairs regulations",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-fr-eiffel",
    "createdAt": "2026-10-01T00:00:00Z",
    "updatedAt": "2026-10-05T12:00:00Z",
    "tags": [
      "France",
      "Campus France",
      "Eiffel",
      "Masters",
      "PhD",
      "Excellence",
      "Government"
    ],
    "organizer": "French Ministry for Europe and Foreign Affairs",
    "officialUrl": "https://www.campusfrance.org/en/the-eiffel-scholarship-program-of-excellence",
    "category": "Master's Fellowship",
    "badge": "French Government Excellence Fellowship",
    "summary": "Developed by the French Ministry for Europe and Foreign Affairs to enable French higher education establishments to attract top foreign students to their Master\u2019s and PhD programs.",
    "description": "The Eiffel Excellence Scholarship Program supports foreign candidates from developing countries at Master\u2019s level and both developing and industrialized countries at PhD level.",
    "location": "France (Accredited French Grand \u00c9coles and Universities)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2029",
    "duration": "12 to 36 Months",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "\u20ac1,181/mo (Master) / \u20ac1,800/mo (PhD) + flights + insurance + housing assistance",
    "funding": {
      "tuitionUsd": 0,
      "accommodationUsd": 8000,
      "mealsUsd": 5000,
      "travelUsd": 1400,
      "visaInsuranceUsd": 800,
      "stipendUsd": 15500,
      "otherUsd": 900,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u20ac1,181/month (Master's) or \u20ac1,800/month (Doctoral)",
      "fundingTypeNote": "Tuition is exempt at French public institutions; stipend covers living expenses, housing, flights, and social security.",
      "financialExclusions": [
        "Tuition fees at private business schools in excess of standard university waivers"
      ]
    },
    "requirementsList": [
      {
        "id": "eiff-age",
        "category": "age",
        "label": "Age Cutoff (25 for Master, 30 for PhD)",
        "ruleDescription": "Candidates must be at most 25 years old for Master\u2019s candidates.",
        "officialSourceQuote": "Candidates for master\u2019s level must be 25 years old at maximum during the application campaign.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-05",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://www.campusfrance.org/en/the-eiffel-scholarship-program-of-excellence"
  },
  {
    "id": "sch-swiss-excellence",
    "title": "Swiss Government Excellence Scholarships for Foreign Scholars",
    "provider": "Swiss Federal Commission for Scholarships for Foreign Students (FCS / SERI)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    "officialApplicationUrl": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    "destinationCountries": [
      "Switzerland"
    ],
    "eligibleNationalities": [
      "Over 180 countries worldwide according to diplomatic agreements"
    ],
    "eligibleResidenceCountries": [
      "Citizen and resident of eligible country"
    ],
    "academicLevels": [
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": null,
    "maxAge": 35,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All academic fields (excluding fine arts, which has separate quotas)"
    ],
    "academicRequirements": [
      "Master\u2019s degree or equivalent university degree achieved before 31 July 2027",
      "Mandatory written support letter from a professor at an eligible Swiss cantonal university, ETH Zurich, EPFL, or research institute"
    ],
    "meritOrNeedRequirements": [
      "Candidate academic profile, quality of research project, synergy with Swiss host lab"
    ],
    "minGpa": 3.6,
    "awardAmountAndCurrency": "CHF 1,920/month (PhD) or CHF 3,500/month (Postdoc) + mandatory Swiss health insurance + return flight",
    "tuitionCoverage": "Tuition Waiver",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "CHF 300 housing allowance, Swiss public transport half-fare card, Swiss medical care covered",
    "programDuration": "12 Months (Research Fellowship) or up to 36 Months (PhD)",
    "openingDate": "2026-08-01",
    "deadline": "October \u2013 December 2026 (varies by country embassy)",
    "deadlineDate": "2026-11-30",
    "requiredDocuments": [
      "FCS official application form with photo",
      "CV with list of academic publications",
      "Motivation letter (maximum 2 pages)",
      "Research proposal (maximum 5 pages) using FCS form",
      "Letter from an academic host professor in Switzerland confirming supervision",
      "Two confidential letters of recommendation on official FCS forms"
    ],
    "languageRequirements": [
      "English, French, or German depending on host university requirements"
    ],
    "sourceLanguage": "German / French / Italian / English",
    "extractedEvidence": "The scholarship amounts to a monthly payment of CHF 1,920 for PhD candidates and CHF 3,500 for postdocs. The FCS pays mandatory Swiss health insurance for non-EU/EFTA grantees and offers a flight allowance.",
    "lastVerifiedTimestamp": "2026-09-25T14:00:00Z",
    "dataProvenance": "Swiss State Secretariat for Education, Research and Innovation (SERI) official decrees",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-ch-swiss-excellence",
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-09-25T14:00:00Z",
    "tags": [
      "Switzerland",
      "Swiss Government",
      "SERI",
      "ETH Zurich",
      "EPFL",
      "PhD",
      "Postdoc",
      "Fully Funded"
    ],
    "organizer": "Swiss Federal Commission for Scholarships (SERI)",
    "officialUrl": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    "category": "International Fellowship",
    "badge": "100% Swiss Confederation Government Fellowship",
    "summary": "Swiss Confederation scholarships to promote international exchange and research cooperation between Switzerland and over 180 other countries.",
    "description": "Aimed at young researchers abroad who have completed a Master\u2019s degree or PhD to pursue doctoral study or research at Swiss cantonal universities, ETH Zurich, EPFL, or research institutes.",
    "location": "Switzerland (ETH Zurich, EPFL, University of Geneva, Zurich, Basel, Lausanne, Bern)",
    "format": "In-person",
    "dates": "September 2027 \u2013 August 2030",
    "duration": "12 to 36 Months",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "CHF 1,920/mo (PhD) or CHF 3,500/mo (Postdoc) + health insurance + flights",
    "funding": {
      "tuitionUsd": 0,
      "accommodationUsd": 14000,
      "mealsUsd": 8000,
      "travelUsd": 1500,
      "visaInsuranceUsd": 2400,
      "stipendUsd": 26000,
      "otherUsd": 1200,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "CHF 1,920/month living allowance + CHF 300 housing allowance",
      "fundingTypeNote": "Full tuition waiver, generous monthly stipend, Swiss health insurance, and return airfare.",
      "financialExclusions": [
        "Family member accompaniment stipends"
      ]
    },
    "requirementsList": [
      {
        "id": "swiss-host",
        "category": "academics",
        "label": "Swiss Host Professor Confirmation",
        "ruleDescription": "Must possess a signed commitment letter from a Swiss host supervisor.",
        "officialSourceQuote": "Applicants must have a letter from an academic host professor in Switzerland confirming they are willing to supervise.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-25",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html"
  },
  {
    "id": "sch-nl-scholarship",
    "title": "NL Scholarship (Dutch Ministry of Education)",
    "provider": "Nuffic / Dutch Ministry of Education, Culture and Science",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.studyinnl.org/finances/nl-scholarship",
    "officialApplicationUrl": "https://www.studyinnl.org/finances/nl-scholarship",
    "destinationCountries": [
      "Netherlands"
    ],
    "eligibleNationalities": [
      "Citizens of non-EEA countries"
    ],
    "eligibleResidenceCountries": [
      "Non-EEA countries"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All disciplines offered at participating Dutch research universities and universities of applied sciences"
    ],
    "academicRequirements": [
      "Applying for a full-time bachelor\u2019s or master\u2019s programme at a participating Dutch higher education institution",
      "Meet the specific requirements of the institution of your choice"
    ],
    "meritOrNeedRequirements": [
      "Academic excellence criteria set by the respective Dutch university"
    ],
    "minGpa": 3.4,
    "awardAmountAndCurrency": "\u20ac5,000, \u20ac10,000, or \u20ac15,000 in the first year of studies",
    "tuitionCoverage": "Partial Tuition",
    "accommodationCoverage": "Partially Subsidized",
    "mealCoverage": "None",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Lump sum grant applied toward tuition reduction or initial living setup",
    "programDuration": "1 Year (First year award)",
    "openingDate": "2026-11-01",
    "deadline": "February 1 or May 1, 2027 (depends on university)",
    "deadlineDate": "2027-02-01",
    "requiredDocuments": [
      "Dutch university admission application",
      "Proof of non-EEA nationality",
      "Motivation letter",
      "Academic transcripts"
    ],
    "languageRequirements": [
      "English proficiency meeting Dutch university standards (IELTS 6.5+ / TOEFL 90+)"
    ],
    "sourceLanguage": "Dutch / English",
    "extractedEvidence": "The scholarship amounts to 5,000, 10,000, or 15,000 euros. You will receive this in the first year of your studies. Please note that this is not a full-tuition scholarship.",
    "lastVerifiedTimestamp": "2026-09-29T11:00:00Z",
    "dataProvenance": "Nuffic Study in NL official ministerial portal",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-nl-nuffic",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-09-29T11:00:00Z",
    "tags": [
      "Netherlands",
      "Nuffic",
      "Holland",
      "Bachelors",
      "Masters",
      "Government",
      "Partial Grant"
    ],
    "organizer": "Nuffic & Dutch Ministry of Education",
    "officialUrl": "https://www.studyinnl.org/finances/nl-scholarship",
    "category": "Merit Scholarship",
    "badge": "Dutch State Merit Grant (\u20ac5,000\u2013\u20ac15,000)",
    "summary": "Financed by the Dutch Ministry of Education, Culture and Science and Dutch research universities for international students from outside the EEA wishing to do a bachelor\u2019s or master\u2019s in the Netherlands.",
    "description": "The NL Scholarship is meant for international students from outside the EEA who want to do their bachelor\u2019s or master\u2019s in the Netherlands.",
    "location": "Netherlands (Participating Dutch Research Universities)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2028",
    "duration": "1 Year",
    "fundingType": "Partial Tuition Grant",
    "fundingAmountPublished": "\u20ac5,000 to \u20ac15,000 grant in the first year",
    "funding": {
      "tuitionUsd": 18000,
      "accommodationUsd": 9000,
      "mealsUsd": 4500,
      "travelUsd": 1200,
      "visaInsuranceUsd": 800,
      "stipendUsd": 10000,
      "otherUsd": 800,
      "isFullyFunded": false,
      "tuitionCovered": false,
      "accommodationCovered": false,
      "mealsCovered": false,
      "travelCovered": false,
      "visaInsuranceCovered": false,
      "stipendAmount": "\u20ac5,000 to \u20ac15,000 lump sum contribution",
      "fundingTypeNote": "Partial award. Students must provide funding for remaining tuition and Dutch living costs.",
      "financialExclusions": [
        "Remaining tuition fees above grant value",
        "Ongoing living costs in subsequent years"
      ]
    },
    "requirementsList": [
      {
        "id": "nl-non-eea",
        "category": "nationality",
        "label": "Non-EEA Citizenship",
        "ruleDescription": "Must not hold European Economic Area nationality.",
        "officialSourceQuote": "Your nationality is non-EEA.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-29",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://www.studyinnl.org/finances/nl-scholarship"
  },
  {
    "id": "sch-sweden-si-global",
    "title": "Swedish Institute Scholarships for Global Professionals (SISGP)",
    "provider": "Swedish Institute (SI) / Swedish Ministry for Foreign Affairs",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    "officialApplicationUrl": "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    "destinationCountries": [
      "Sweden"
    ],
    "eligibleNationalities": [
      "Citizens of 41 eligible partner countries in Africa, Asia, Latin America, and Eastern Europe"
    ],
    "eligibleResidenceCountries": [
      "Citizen and resident of eligible country"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Eligible master's programmes related to UN Sustainable Development Goals (SDGs)"
    ],
    "academicRequirements": [
      "Admitted to an eligible master\u2019s programme by University Admissions Sweden",
      "Minimum of 3,000 hours of demonstrated work experience prior to applying"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated leadership experience and strong commitment to UN 2030 Agenda"
    ],
    "minGpa": 3.3,
    "awardAmountAndCurrency": "Full tuition directly paid to Swedish university + SEK 12,000/month living stipend + travel grant",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Fixed Airfare Allowance",
    "stipendAndOtherBenefits": "SEK 15,000 travel grant, health and accident insurance (Kammarkollegiet), membership in SI Network for Future Global Leaders",
    "programDuration": "1 to 2 Years (12 to 24 Months)",
    "openingDate": "2026-10-15",
    "deadline": "February 28, 2027",
    "deadlineDate": "2027-02-28",
    "requiredDocuments": [
      "CV on official SI template",
      "Proof of work and leadership experience on official SI template (signed and stamped)",
      "Two letters of reference on official SI template",
      "Copy of valid passport"
    ],
    "languageRequirements": [
      "English meeting University Admissions Sweden requirement (English 6)"
    ],
    "sourceLanguage": "Swedish / English",
    "extractedEvidence": "The scholarship covers full tuition fees paid directly to the university, a monthly living allowance of SEK 12,000, a travel grant of SEK 15,000, and insurance coverage.",
    "lastVerifiedTimestamp": "2026-09-30T10:00:00Z",
    "dataProvenance": "Swedish Institute official government guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-se-si",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-09-30T10:00:00Z",
    "tags": [
      "Sweden",
      "Swedish Institute",
      "SI",
      "Masters",
      "Sustainability",
      "Fully Funded"
    ],
    "organizer": "Swedish Institute",
    "officialUrl": "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    "category": "Master's Fellowship",
    "badge": "100% Full Swedish Government Fellowship",
    "summary": "Funded by the Swedish Ministry for Foreign Affairs to develop global leaders who will contribute to the United Nations 2030 Agenda for Sustainable Development.",
    "description": "Full scholarships for master\u2019s studies in Sweden to develop future leaders who will contribute to sustainable global development.",
    "location": "Sweden (Participating Swedish Public Universities)",
    "format": "In-person",
    "dates": "August 2027 \u2013 June 2029",
    "duration": "1 to 2 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full tuition fees + SEK 12,000/month living stipend + SEK 15,000 travel grant",
    "funding": {
      "tuitionUsd": 24000,
      "accommodationUsd": 9000,
      "mealsUsd": 4500,
      "travelUsd": 1400,
      "visaInsuranceUsd": 600,
      "stipendUsd": 14000,
      "otherUsd": 800,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "SEK 12,000/month monthly living stipend",
      "fundingTypeNote": "100% tuition paid directly to university, monthly living allowance, SEK 15,000 travel grant, and comprehensive insurance.",
      "financialExclusions": [
        "Family member accommodation or travel"
      ]
    },
    "requirementsList": [
      {
        "id": "si-work-hours",
        "category": "academics",
        "label": "3,000 Hours Demonstrated Work Experience",
        "ruleDescription": "Must have worked at least 3,000 hours prior to application.",
        "officialSourceQuote": "You must have a minimum of 3,000 hours of demonstrated work experience.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-30",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/"
  },
  {
    "id": "sch-erasmus-mundus-eu",
    "title": "Erasmus Mundus Joint Master Degrees (EMJM)",
    "provider": "European Commission (EACEA)",
    "providerType": "Multilateral Organization",
    "officialProgramUrl": "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters",
    "officialApplicationUrl": "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    "destinationCountries": [
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Netherlands",
      "Belgium",
      "Sweden"
    ],
    "eligibleNationalities": [
      "Global (Open to students from EU and all third partner countries worldwide)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Over 150 accredited multidisciplinary consortia programs across all scientific and humanities domains"
    ],
    "academicRequirements": [
      "Completed first higher education degree (Bachelor\u2019s or recognized equivalent)",
      "Strong academic excellence meeting specific consortium criteria"
    ],
    "meritOrNeedRequirements": [
      "Academic merit, international research motivation, and adaptability across cultures"
    ],
    "minGpa": 3.4,
    "awardAmountAndCurrency": "\u20ac1,400/month living allowance + full tuition participation costs + travel & insurance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full tuition waiver, comprehensive health and accident insurance, study mobility across 2+ European countries",
    "programDuration": "1 to 2 Years (60, 90, or 120 ECTS credits)",
    "openingDate": "2026-10-01",
    "deadline": "December 2026 \u2013 February 2027 (depends on consortium)",
    "deadlineDate": "2027-01-15",
    "requiredDocuments": [
      "Undergraduate diploma and academic transcripts",
      "Consortium motivation letter",
      "Two academic letters of recommendation",
      "Proof of nationality and residence",
      "English language proficiency certificate"
    ],
    "languageRequirements": [
      "English (typically IELTS 6.5+ / TOEFL 92+)"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The scholarship covers student participation costs (including tuition fees, library and laboratory costs, full insurance coverage) and contributes to student travel and installation costs and includes a monthly subsistence allowance of 1,400 euros for the entire duration of the study programme.",
    "lastVerifiedTimestamp": "2026-10-07T14:00:00Z",
    "dataProvenance": "European Education and Culture Executive Agency (EACEA) official regulation",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-eu-erasmus",
    "createdAt": "2026-10-01T00:00:00Z",
    "updatedAt": "2026-10-07T14:00:00Z",
    "tags": [
      "Europe",
      "Erasmus Mundus",
      "EU Commission",
      "Masters",
      "Mobility",
      "Fully Funded"
    ],
    "organizer": "European Commission (EACEA)",
    "officialUrl": "https://erasmus-plus.ec.europa.eu/",
    "category": "Master's Fellowship",
    "badge": "100% Full European Union Fellowship",
    "summary": "Prestigious international Master\u2019s programmes jointly delivered by an international consortium of higher education institutions, offering study in at least two different European countries.",
    "description": "Erasmus Mundus Joint Masters are high-level integrated study programmes delivered by an international partnership of higher education institutions.",
    "location": "European Union (Study in at least 2 European countries)",
    "format": "In-person",
    "dates": "September 2027 \u2013 August 2029",
    "duration": "1 to 2 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "\u20ac1,400/month stipend + 100% tuition coverage + insurance + mobility grant",
    "funding": {
      "tuitionUsd": 20000,
      "accommodationUsd": 12000,
      "mealsUsd": 6000,
      "travelUsd": 2500,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 18000,
      "otherUsd": 1000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u20ac1,400/month for entire program duration (up to 24 months)",
      "fundingTypeNote": "100% full funding covering university tuition fees, monthly living allowance, and European mobility.",
      "financialExclusions": [
        "Travel beyond required European mobility stages"
      ]
    },
    "requirementsList": [
      {
        "id": "em-degree",
        "category": "academic_level",
        "label": "Bachelor's Degree Holder",
        "ruleDescription": "Must hold an accredited undergraduate degree before start date.",
        "officialSourceQuote": "Candidates must have obtained a first higher education degree before starting the programme.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-07",
    "sourceType": "International Organization Portal",
    "sourceUrl": "https://erasmus-plus.ec.europa.eu/"
  },
  {
    "id": "sch-pearson-toronto",
    "title": "Lester B. Pearson International Scholarship",
    "provider": "University of Toronto Admissions Office",
    "providerType": "Public University",
    "officialProgramUrl": "https://future.utoronto.ca/pearson/",
    "officialApplicationUrl": "https://future.utoronto.ca/pearson/about/#apply",
    "destinationCountries": [
      "Canada"
    ],
    "eligibleNationalities": [
      "International students of any nationality requiring a Canadian study permit"
    ],
    "eligibleResidenceCountries": [
      "Non-Canadian residence (not Canadian citizens or PRs)"
    ],
    "academicLevels": [
      "Undergraduate"
    ],
    "minAge": 17,
    "maxAge": 20,
    "eligibleGrades": [
      12
    ],
    "subjectRestrictions": [
      "All direct-entry undergraduate degree programmes across Arts, Science, Commerce, Engineering, Kinesiology, Architecture, and Music"
    ],
    "academicRequirements": [
      "Currently in final year of secondary school or graduated no earlier than June 2026",
      "Exceptional academic achievement and creative thinkers with leadership impact",
      "Must be nominated by high school counselor"
    ],
    "meritOrNeedRequirements": [
      "Enthusiasm for learning, intellectual curiosity, and commitment to school/community impact"
    ],
    "minGpa": 3.9,
    "awardAmountAndCurrency": "Four years full tuition, books, incidental fees, and full residence room and board (~$280,000 CAD value)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Full Board / Meal Plan",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Full four-year guaranteed campus residence room & board, all book fees and university dental/health insurance",
    "programDuration": "4 Years (Undergraduate)",
    "openingDate": "2026-09-01",
    "deadline": "November 30, 2026 (School Nomination) / January 15, 2027 (Student App)",
    "deadlineDate": "2026-11-30",
    "requiredDocuments": [
      "Official secondary school nomination submitted by guidance counselor",
      "University of Toronto OUAC 105 undergraduate admission application",
      "Pearson online scholarship application essays and activity inventory",
      "Official high school transcripts and predictive grades"
    ],
    "languageRequirements": [
      "English proficiency meeting U of T standards (IELTS 6.5+ / TOEFL 100+)"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The Lester B. Pearson International Scholarships at the University of Toronto cover tuition, books, incidental fees, and full residence support for four years. The scholarship is tenable only at the University of Toronto.",
    "lastVerifiedTimestamp": "2026-10-04T11:00:00Z",
    "dataProvenance": "University of Toronto undergraduate enrollment registry",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-uoft-pearson",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-04T11:00:00Z",
    "tags": [
      "Canada",
      "Toronto",
      "Undergraduate",
      "High School Senior",
      "Pearson",
      "Full Ride"
    ],
    "organizer": "University of Toronto",
    "officialUrl": "https://future.utoronto.ca/pearson/",
    "category": "Merit Scholarship",
    "badge": "100% Full Undergraduate 4-Year Ride",
    "summary": "University of Toronto\u2019s most prestigious scholarship for international secondary students, covering tuition, books, incidental fees, and full four-year residence support.",
    "description": "Recognizes international students who demonstrate exceptional academic achievement and creativity and who are recognized as leaders within their school.",
    "location": "Toronto, Ontario, Canada (St. George, Mississauga, or Scarborough campus)",
    "format": "In-person",
    "dates": "September 2027 \u2013 May 2031",
    "duration": "4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% full tuition + books + incidental fees + 4-year residence room & board",
    "funding": {
      "tuitionUsd": 48000,
      "accommodationUsd": 14000,
      "mealsUsd": 6500,
      "travelUsd": 0,
      "visaInsuranceUsd": 800,
      "stipendUsd": 0,
      "otherUsd": 1500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": false,
      "visaInsuranceCovered": true,
      "stipendAmount": "Guaranteed four-year campus residence and full meal plan included",
      "fundingTypeNote": "Complete 4-year tuition, campus room and board, books, and university health insurance covered.",
      "financialExclusions": [
        "Travel flights to and from Canada",
        "Personal study permit application fee"
      ]
    },
    "requirementsList": [
      {
        "id": "pear-nom",
        "category": "academics",
        "label": "High School Counselor Nomination",
        "ruleDescription": "Must be officially nominated by attending secondary school.",
        "officialSourceQuote": "To become a Pearson Scholar, you must be nominated by your high school.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-04",
    "sourceType": "University Portal",
    "sourceUrl": "https://future.utoronto.ca/pearson/"
  },
  {
    "id": "sch-canada-vanier",
    "title": "Vanier Canada Graduate Scholarships (Vanier CGS)",
    "provider": "Government of Canada (CIHR, NSERC, SSHRC)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://vanier.gc.ca/en/home-accueil.html",
    "officialApplicationUrl": "https://vanier.gc.ca/en/nomination_process-processus_de_mise_en_candidature.html",
    "destinationCountries": [
      "Canada"
    ],
    "eligibleNationalities": [
      "Canadian citizens, permanent residents, and foreign citizens of all nations"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Health research (CIHR), Natural sciences and engineering (NSERC), Social sciences and humanities (SSHRC)"
    ],
    "academicRequirements": [
      "Nominated by only one Canadian institution with a Vanier quota",
      "Be pursuing your first doctoral degree (including joint MD/PhD, DVM/PhD)",
      "Have completed no more than 20 months of doctoral studies as of 1 May 2027"
    ],
    "meritOrNeedRequirements": [
      "Academic excellence, research potential, and demonstrated leadership potential"
    ],
    "minGpa": 3.8,
    "awardAmountAndCurrency": "$50,000 CAD per year for three years ($150,000 CAD total)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Fixed Airfare Allowance",
    "stipendAndOtherBenefits": "$50,000 CAD per year unencumbered stipend covering tuition and living costs",
    "programDuration": "3 Years (Doctoral)",
    "openingDate": "2026-06-15",
    "deadline": "November 1, 2026 (Institutional quota deadlines in September)",
    "deadlineDate": "2026-11-01",
    "requiredDocuments": [
      "ResearchNet application form",
      "Canadian Common CV (CCV)",
      "Research proposal (two pages)",
      "Project references (five pages maximum)",
      "Leadership statement (two pages)",
      "Two letters of reference regarding leadership ability",
      "Official academic transcripts"
    ],
    "languageRequirements": [
      "English or French"
    ],
    "sourceLanguage": "English / French",
    "extractedEvidence": "The Vanier CGS is valued at 50,000 Canadian dollars per year for three years during doctoral studies. Both Canadian and international candidates are eligible to be nominated.",
    "lastVerifiedTimestamp": "2026-10-02T16:00:00Z",
    "dataProvenance": "Government of Canada Tri-agency Institutional Secretariat",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-ca-vanier",
    "createdAt": "2026-06-15T00:00:00Z",
    "updatedAt": "2026-10-02T16:00:00Z",
    "tags": [
      "Canada",
      "Vanier",
      "PhD",
      "Doctoral",
      "Tri-agency",
      "Fully Funded",
      "Research"
    ],
    "organizer": "Government of Canada",
    "officialUrl": "https://vanier.gc.ca/",
    "category": "Graduate Fellowship",
    "badge": "$50,000 CAD/Year Federal Doctoral Award",
    "summary": "Helps Canadian institutions attract highly qualified doctoral students, offering $50,000 CAD per year for three years of doctoral research at Canadian universities.",
    "description": "The Vanier Canada Graduate Scholarships program considers three equally weighted evaluation criteria: academic excellence, research potential, and leadership.",
    "location": "Canada (Eligible Canadian universities)",
    "format": "In-person",
    "dates": "May 2027 \u2013 April 2030",
    "duration": "3 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "$50,000 CAD per year for 3 years ($150,000 CAD total)",
    "funding": {
      "tuitionUsd": 12000,
      "accommodationUsd": 14000,
      "mealsUsd": 6000,
      "travelUsd": 1500,
      "visaInsuranceUsd": 800,
      "stipendUsd": 37000,
      "otherUsd": 1000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "$50,000 CAD/year unencumbered stipend",
      "fundingTypeNote": "Generous direct federal award; host universities typically waive remaining tuition fees.",
      "financialExclusions": [
        "Doctoral studies beyond year three"
      ]
    },
    "requirementsList": [
      {
        "id": "vanier-nom",
        "category": "academics",
        "label": "Canadian University Nomination",
        "ruleDescription": "Must be nominated by a Canadian university holding a Vanier allocation.",
        "officialSourceQuote": "Candidates must be nominated by the Canadian institution at which they want to study.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-02",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://vanier.gc.ca/en/home-accueil.html"
  },
  {
    "id": "sch-mext-japan-research",
    "title": "MEXT Japanese Government Research Scholarship",
    "provider": "Ministry of Education, Culture, Sports, Science & Technology (MEXT Japan)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarships/",
    "officialApplicationUrl": "https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarships/em-application.html",
    "destinationCountries": [
      "Japan"
    ],
    "eligibleNationalities": [
      "Nationals of countries with diplomatic relations with Japan"
    ],
    "eligibleResidenceCountries": [
      "Residing outside Japan in country of citizenship"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": null,
    "maxAge": 35,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Fields of study in the applicant\u2019s major field or related fields that can be studied at Japanese universities"
    ],
    "academicRequirements": [
      "Completed 16 years of schooling (bachelor\u2019s degree) outside Japan",
      "Born on or after April 2, 1992 (under 35 years of age)"
    ],
    "meritOrNeedRequirements": [
      "Willingness to learn Japanese and contribute to international mutual understanding"
    ],
    "minGpa": 3.3,
    "awardAmountAndCurrency": "Full tuition waiver + \u00a5143,000 to \u00a5145,000/month stipend + round-trip flights",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full examination/matriculation/tuition fee waivers + preparatory 6-month Japanese language course",
    "programDuration": "2 Years (Master\u2019s) or 3 Years (PhD) + 6 months preparatory Japanese",
    "openingDate": "2026-04-01",
    "deadline": "May \u2013 June 2026 (Embassy Track) / November 2026 (University Track)",
    "deadlineDate": "2026-11-20",
    "requiredDocuments": [
      "MEXT prescribed application form",
      "Field of Study and Research Program Plan",
      "Certified academic transcripts and degree certificate",
      "Recommendation letter from the president or dean of current university",
      "Abstract of theses/papers",
      "Certificate of health"
    ],
    "languageRequirements": [
      "Willingness to study Japanese language; English or Japanese for research"
    ],
    "sourceLanguage": "Japanese / English",
    "extractedEvidence": "Fees for the entrance examination, matriculation and tuition at universities will be paid by MEXT. Each grantee will be provided monthly allowance: 143,000 yen for research students, 144,000 yen for master course, 145,000 yen for doctoral course. Economy class round-trip airfare is provided.",
    "lastVerifiedTimestamp": "2026-10-02T13:00:00Z",
    "dataProvenance": "Japanese Ministry of Foreign Affairs (MOFA) and MEXT official guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-jp-mext",
    "createdAt": "2026-04-01T00:00:00Z",
    "updatedAt": "2026-10-02T13:00:00Z",
    "tags": [
      "Japan",
      "MEXT",
      "Monbukagakusho",
      "Masters",
      "PhD",
      "Research",
      "Full Ride"
    ],
    "organizer": "Ministry of Education, Culture, Sports, Science & Technology (MEXT Japan)",
    "officialUrl": "https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarships/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Japanese Government Fellowship",
    "summary": "Full-ride scholarship provided by the Japanese Government to international students who wish to conduct postgraduate research at Japanese universities.",
    "description": "MEXT scholarships are awarded via Embassy Recommendation and University Recommendation, providing comprehensive financial coverage for study and life in Japan.",
    "location": "Japan (National, Public, and Private Japanese Universities)",
    "format": "In-person",
    "dates": "April 2027 or October 2027 start",
    "duration": "2 to 3.5 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition waiver + \u00a5143,000\u2013\u00a5145,000/mo stipend + round-trip flights",
    "funding": {
      "tuitionUsd": 10000,
      "accommodationUsd": 7000,
      "mealsUsd": 4000,
      "travelUsd": 1600,
      "visaInsuranceUsd": 500,
      "stipendUsd": 12500,
      "otherUsd": 700,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "\u00a5144,000/mo (Master's) or \u00a5145,000/mo (PhD) living allowance",
      "fundingTypeNote": "100% tuition, entrance fee, monthly living allowance, and international round-trip airfare provided.",
      "financialExclusions": [
        "Internal travel in home country to departure airport"
      ]
    },
    "requirementsList": [
      {
        "id": "mext-age",
        "category": "age",
        "label": "Age Under 35",
        "ruleDescription": "Applicants must be under 35 years old at the time of entry.",
        "officialSourceQuote": "Applicants must be born on or after April 2, 1992.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-02",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarships/"
  },
  {
    "id": "sch-gks-korea",
    "title": "Global Korea Scholarship (GKS / KGSP Graduate)",
    "provider": "National Institute for International Education (NIIED Korea)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.studyinkorea.go.kr/",
    "officialApplicationUrl": "https://www.studyinkorea.go.kr/en/sub/gks/allnew_invitation.do",
    "destinationCountries": [
      "South Korea"
    ],
    "eligibleNationalities": [
      "Citizens of 150+ participating partner countries (non-Korean nationals)"
    ],
    "eligibleResidenceCountries": [
      "Non-Korean nationality (applicants and parents must not hold Korean citizenship)"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": null,
    "maxAge": 40,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All academic majors offered by participating Korean partner universities"
    ],
    "academicRequirements": [
      "Cumulative GPA of 80% or higher on a 100-point scale, or ranked in top 20% of class",
      "Completed bachelor's (for Master's) or master's (for PhD)"
    ],
    "meritOrNeedRequirements": [
      "Academic achievement and cultural diplomacy orientation"
    ],
    "minGpa": 3.2,
    "awardAmountAndCurrency": "Full tuition + 1,000,000 KRW/month living allowance + flights + medical insurance + 1-year language course",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "200,000 KRW settlement allowance, 100,000 KRW research support/semester, TOPIK proficiency prize",
    "programDuration": "3 Years (Master's: 1 yr language + 2 yr degree) or 4 Years (PhD: 1 yr language + 3 yr degree)",
    "openingDate": "2026-02-01",
    "deadline": "March \u2013 April 2026 (Embassy Track) / April 2026 (University Track)",
    "deadlineDate": "2026-03-31",
    "requiredDocuments": [
      "GKS applicant form and personal statement",
      "Statement of purpose / study plan",
      "One recommendation letter from academic advisor",
      "Apostilled/Consular-verified bachelor's degree certificate and transcripts",
      "Proof of citizenship for applicant and parents"
    ],
    "languageRequirements": [
      "1-year mandatory Korean language training included in scholarship"
    ],
    "sourceLanguage": "Korean / English",
    "extractedEvidence": "Tuition fees are fully covered by NIIED and the university. Monthly allowance: 1,000,000 KRW. Economy class airfare is provided for entry and return. Mandatory medical insurance and 1-year Korean language training are included.",
    "lastVerifiedTimestamp": "2026-10-04T15:00:00Z",
    "dataProvenance": "National Institute for International Education (NIIED) statutory guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-kr-gks",
    "createdAt": "2026-02-01T00:00:00Z",
    "updatedAt": "2026-10-04T15:00:00Z",
    "tags": [
      "South Korea",
      "GKS",
      "KGSP",
      "NIIED",
      "Masters",
      "PhD",
      "Full Ride"
    ],
    "organizer": "National Institute for International Education (NIIED Korea)",
    "officialUrl": "https://www.studyinkorea.go.kr/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Korean State Fellowship",
    "summary": "Designed to provide international students with opportunities to conduct advanced studies in higher educational institutions in the Republic of Korea.",
    "description": "GKS promotes international exchange in education and mutual friendship between Korea and participating countries by sponsoring over 1,300 foreign graduate students annually.",
    "location": "South Korea (Seoul National University, KAIST, Yonsei, Korea University, and regional universities)",
    "format": "In-person",
    "dates": "September 2027 \u2013 August 2030",
    "duration": "3 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + 1,000,000 KRW/mo + flights + 1-yr Korean training + insurance",
    "funding": {
      "tuitionUsd": 11000,
      "accommodationUsd": 6500,
      "mealsUsd": 4000,
      "travelUsd": 1500,
      "visaInsuranceUsd": 600,
      "stipendUsd": 10500,
      "otherUsd": 800,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "1,000,000 KRW/month living allowance + settlement grant",
      "fundingTypeNote": "Full tuition, monthly living stipend, round-trip airfare, 1-year language institute fees, and medical insurance.",
      "financialExclusions": [
        "Courses requiring tuition surcharge beyond NIIED maximum ceiling"
      ]
    },
    "requirementsList": [
      {
        "id": "gks-gpa",
        "category": "academics",
        "label": "CGPA 80% or Higher",
        "ruleDescription": "Cumulative GPA must be above 80% on a 100-point scale or top 20%.",
        "officialSourceQuote": "CGPA must be above 80% or in the top 20% of one's class.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-04",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.studyinkorea.go.kr/"
  },
  {
    "id": "sch-china-csc",
    "title": "Chinese Government Scholarship (CSC Bilateral & University Program)",
    "provider": "China Scholarship Council (CSC / Ministry of Education PRC)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.campuschina.org/",
    "officialApplicationUrl": "https://studyinchina.csc.edu.cn/",
    "destinationCountries": [
      "China"
    ],
    "eligibleNationalities": [
      "Non-Chinese citizens in good health"
    ],
    "eligibleResidenceCountries": [
      "Global (Non-Chinese citizens)"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": 35,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All disciplines offered by designated Chinese universities"
    ],
    "academicRequirements": [
      "High school diploma for undergraduate; bachelor\u2019s degree for master\u2019s; master\u2019s for PhD",
      "Age under 25 for bachelor's, under 35 for master's, under 40 for doctoral"
    ],
    "meritOrNeedRequirements": [
      "Academic merit and adherence to Chinese educational regulations"
    ],
    "minGpa": 3.0,
    "awardAmountAndCurrency": "Full tuition waiver + free university dormitory + 3,000 to 3,500 RMB/month stipend + comprehensive medical insurance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Free on-campus university dormitory accommodation + comprehensive medical insurance in China",
    "programDuration": "2 to 3 Years (Master's) or 3 to 4 Years (PhD)",
    "openingDate": "2026-11-01",
    "deadline": "February 15 \u2013 April 15, 2027 (depends on university/embassy)",
    "deadlineDate": "2027-03-31",
    "requiredDocuments": [
      "CSC online application form",
      "Notarized highest diploma and academic transcripts",
      "Study plan or research proposal (minimum 800 words)",
      "Two recommendation letters from professors or associate professors",
      "Foreigner Physical Examination Form",
      "Non-criminal record certificate"
    ],
    "languageRequirements": [
      "HSK Level 4+ for Chinese-taught programs or IELTS 6.0+ for English-taught"
    ],
    "sourceLanguage": "Chinese / English",
    "extractedEvidence": "The Chinese Government Scholarship covers tuition fees, free university dormitory accommodation or an accommodation subsidy, a monthly stipend (3,000 RMB for master\u2019s, 3,500 RMB for doctoral candidates), and comprehensive medical insurance.",
    "lastVerifiedTimestamp": "2026-10-03T11:00:00Z",
    "dataProvenance": "China Scholarship Council (CSC) official admission portal",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-cn-csc",
    "createdAt": "2026-10-01T00:00:00Z",
    "updatedAt": "2026-10-03T11:00:00Z",
    "tags": [
      "China",
      "CSC",
      "Campuschina",
      "Masters",
      "PhD",
      "Full Ride",
      "Government"
    ],
    "organizer": "China Scholarship Council (Ministry of Education PRC)",
    "officialUrl": "https://www.campuschina.org/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Chinese Government Scholarship",
    "summary": "Established by the Ministry of Education of the PRC to sponsor international students, teachers and scholars to study and conduct research in Chinese universities.",
    "description": "CSC offers both Type A (bilateral embassy quotas) and Type B (independent university programs) supporting graduate and doctoral studies across China.",
    "location": "China (Peking University, Tsinghua, Fudan, Zhejiang, Shanghai Jiao Tong, etc.)",
    "format": "In-person",
    "dates": "September 2027 \u2013 July 2030",
    "duration": "2 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full tuition waiver + free dormitory + 3,000\u20133,500 RMB/mo stipend + insurance",
    "funding": {
      "tuitionUsd": 7000,
      "accommodationUsd": 3500,
      "mealsUsd": 2500,
      "travelUsd": 0,
      "visaInsuranceUsd": 400,
      "stipendUsd": 6000,
      "otherUsd": 500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": false,
      "visaInsuranceCovered": true,
      "stipendAmount": "3,000 RMB/mo (Master's) or 3,500 RMB/mo (PhD) stipend",
      "fundingTypeNote": "Full tuition, campus dormitory, medical insurance, and living stipend covered. Flights are self-funded.",
      "financialExclusions": [
        "International travel airfares to and from China"
      ]
    },
    "requirementsList": [
      {
        "id": "csc-citizenship",
        "category": "nationality",
        "label": "Non-Chinese Citizenship",
        "ruleDescription": "Must be citizen of country other than the People\u2019s Republic of China.",
        "officialSourceQuote": "Applicants must be a citizen of a country other than the People's Republic of China.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-03",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://www.campuschina.org/"
  },
  {
    "id": "sch-schwarzman-scholars",
    "title": "Schwarzman Scholars at Tsinghua University",
    "provider": "Schwarzman College / Tsinghua University",
    "providerType": "Private University",
    "officialProgramUrl": "https://www.schwarzmanscholars.org/",
    "officialApplicationUrl": "https://www.schwarzmanscholars.org/admissions/",
    "destinationCountries": [
      "China"
    ],
    "eligibleNationalities": [
      "Open Worldwide (Target distribution: ~40% United States, 20% China, 40% Rest of World)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": 18,
    "maxAge": 28,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Master of Global Affairs (Leadership, Global Affairs, Public Policy, Economics)"
    ],
    "academicRequirements": [
      "Completed undergraduate degree prior to August 1, 2027",
      "Demonstrated academic excellence and intellectual aptitude",
      "Age must be at least 18 but not yet 29 on August 1 of their matriculation year"
    ],
    "meritOrNeedRequirements": [
      "Exemplary leadership capacity, intellect, character, and cultural adaptability"
    ],
    "minGpa": 3.7,
    "awardAmountAndCurrency": "100% Fully Funded: Tuition, room, board, round-trip travel, books, health insurance, and $4,000 USD personal stipend",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Full Board / Meal Plan",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "In-country study tours, personal laptop, course books, comprehensive medical insurance, and $4,000 stipend",
    "programDuration": "1 Year (11 Months intensive)",
    "openingDate": "2026-04-15",
    "deadline": "September 12, 2026 (US/Global) / May 20, 2026 (China applicants)",
    "deadlineDate": "2026-09-12",
    "requiredDocuments": [
      "Online Schwarzman application form",
      "Official transcripts from all post-secondary institutions attended",
      "Three letters of recommendation (at least one intellectual/academic, one leadership)",
      "Resume / CV (maximum 2 pages)",
      "Leadership essay (750 words) and Statement of purpose (500 words)",
      "Short video introduction (1 minute)"
    ],
    "languageRequirements": [
      "English (taught entirely in English; TOEFL iBT 100+ or IELTS 7.0+)"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The scholarship covers tuition and fees, room and board at Schwarzman College, travel to and from Beijing at the beginning and end of the academic year, an in-country study tour, required course books and supplies, health insurance, and a stipend of $4,000.",
    "lastVerifiedTimestamp": "2026-10-03T14:00:00Z",
    "dataProvenance": "Schwarzman College admissions charter and Tsinghua University registry",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-schwarzman",
    "createdAt": "2026-04-15T00:00:00Z",
    "updatedAt": "2026-10-03T14:00:00Z",
    "tags": [
      "China",
      "Tsinghua",
      "Schwarzman",
      "Masters",
      "Global Affairs",
      "Leadership",
      "Full Ride"
    ],
    "organizer": "Schwarzman Scholars / Tsinghua University",
    "officialUrl": "https://www.schwarzmanscholars.org/",
    "category": "Master's Fellowship",
    "badge": "100% Full Global Fellowship (Beijing)",
    "summary": "Designed to prepare the next generation of global leaders, offering a one-year Master\u2019s Degree in Global Affairs at Tsinghua University in Beijing with full financial coverage.",
    "description": "Scholars live and study together at Schwarzman College, an elite residential college built on the campus of Tsinghua University, engaging with world leaders and China experts.",
    "location": "Beijing, China (Tsinghua University)",
    "format": "In-person",
    "dates": "August 2027 \u2013 July 2028",
    "duration": "1 Year (11 Months)",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + room & board + airfare + $4,000 stipend + health insurance",
    "funding": {
      "tuitionUsd": 40000,
      "accommodationUsd": 12000,
      "mealsUsd": 6000,
      "travelUsd": 2000,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 4000,
      "otherUsd": 2000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "$4,000 personal stipend + all course books and travel",
      "fundingTypeNote": "100% full coverage including tuition, residential suite at Schwarzman College, meals, airfare, and $4,000 stipend.",
      "financialExclusions": [
        "Personal vacation travel outside study tour"
      ]
    },
    "requirementsList": [
      {
        "id": "sch-age",
        "category": "age",
        "label": "Age Eligibility (18 to 28)",
        "ruleDescription": "Candidates must not have reached their 29th birthday on August 1 of entry year.",
        "officialSourceQuote": "Candidates must be at least 18 but not yet 29 years of age as of August 1 of their matriculation year.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-03",
    "sourceType": "University Portal",
    "sourceUrl": "https://www.schwarzmanscholars.org/"
  },
  {
    "id": "sch-singa-singapore",
    "title": "Singapore International Graduate Award (SINGA)",
    "provider": "Agency for Science, Technology and Research (A*STAR Singapore)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa",
    "officialApplicationUrl": "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa",
    "destinationCountries": [
      "Singapore"
    ],
    "eligibleNationalities": [
      "Open Worldwide (All international graduates with passion for research)"
    ],
    "eligibleResidenceCountries": [
      "Non-Singaporean citizens"
    ],
    "academicLevels": [
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Biomedical Sciences, Computing & Information Sciences, Physical Sciences, Engineering"
    ],
    "academicRequirements": [
      "Completed bachelor\u2019s or master\u2019s degree with excellent academic results",
      "Strong passion for research and intent to pursue a PhD degree at NTU, NUS, SUTD, or SMU with A*STAR labs"
    ],
    "meritOrNeedRequirements": [
      "Scientific research distinction and potential"
    ],
    "minGpa": 3.6,
    "awardAmountAndCurrency": "Full tuition fees + SGD 2,700 to SGD 3,200/month living stipend + airfare & settling-in grants",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Fixed Airfare Allowance",
    "stipendAndOtherBenefits": "One-time airfare grant of up to SGD 1,500; one-time settling-in allowance of SGD 1,000",
    "programDuration": "4 Years (PhD)",
    "openingDate": "2026-06-01",
    "deadline": "December 1, 2026 (August 2027 intake) / June 1, 2027 (January 2028 intake)",
    "deadlineDate": "2026-12-01",
    "requiredDocuments": [
      "Copy of passport",
      "Certified academic transcripts and bachelor's/master's degree certificates",
      "Two recommendation reports completed online by referees",
      "Statement of research interests"
    ],
    "languageRequirements": [
      "Good spoken and written English skills"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The award provides support for up to 4 years of PhD studies including full tuition fees, monthly stipend of SGD 2,700 which will be increased to SGD 3,200 after passing the qualifying examination, one-time airfare grant of up to SGD 1,500, and one-time settling-in allowance of SGD 1,000.",
    "lastVerifiedTimestamp": "2026-10-05T16:00:00Z",
    "dataProvenance": "A*STAR Singapore official graduate scholarship guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-sg-singa",
    "createdAt": "2026-06-01T00:00:00Z",
    "updatedAt": "2026-10-05T16:00:00Z",
    "tags": [
      "Singapore",
      "A*STAR",
      "SINGA",
      "NUS",
      "NTU",
      "PhD",
      "STEM",
      "Full Ride"
    ],
    "organizer": "A*STAR Singapore",
    "officialUrl": "https://www.a-star.edu.sg/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Singapore PhD Fellowship",
    "summary": "Collaboration between A*STAR, NTU, NUS, SUTD, and SMU, providing up to four years of PhD training in English with premier laboratories in Singapore.",
    "description": "PhD training is carried out in chosen research labs at A*STAR research institutes, NTU, NUS, SUTD, or SMU, supervised by distinguished scientists.",
    "location": "Singapore (A*STAR Research Institutes, NUS, NTU, SUTD, SMU)",
    "format": "In-person",
    "dates": "August 2027 \u2013 July 2031",
    "duration": "4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full PhD tuition + SGD 2,700\u20133,200/mo stipend + airfare & settling-in grants",
    "funding": {
      "tuitionUsd": 28000,
      "accommodationUsd": 10000,
      "mealsUsd": 5000,
      "travelUsd": 1100,
      "visaInsuranceUsd": 500,
      "stipendUsd": 24000,
      "otherUsd": 900,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "SGD 2,700/month (increased to SGD 3,200/month post-qualifying exam)",
      "fundingTypeNote": "100% tuition, monthly living stipend, SGD 1,500 flight grant, and SGD 1,000 settling-in grant.",
      "financialExclusions": [
        "Research apparatus outside project budget"
      ]
    },
    "requirementsList": [
      {
        "id": "singa-nat",
        "category": "nationality",
        "label": "International Student",
        "ruleDescription": "Open to all international graduates (non-Singaporean).",
        "officialSourceQuote": "Open to all international graduates with a passion for research.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-05",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa"
  },
  {
    "id": "sch-turkiye-burslari",
    "title": "T\u00fcrkiye Scholarships (T\u00fcrkiye Burslar\u0131)",
    "provider": "Presidency for Turks Abroad and Related Communities (YTB)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.turkiyeburslari.gov.tr/",
    "officialApplicationUrl": "https://tbbs.turkiyeburslari.gov.tr/",
    "destinationCountries": [
      "Turkey"
    ],
    "eligibleNationalities": [
      "Citizens of all countries worldwide (except Turkish citizens and individuals who have lost Turkish citizenship)"
    ],
    "eligibleResidenceCountries": [
      "Non-Turkish citizenship"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": 30,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All academic disciplines available in Turkish higher education institutions"
    ],
    "academicRequirements": [
      "Minimum 70% academic achievement for bachelor\u2019s; 75% for master\u2019s and PhD (90% for health sciences)",
      "Age under 21 for bachelor's, under 30 for master's, under 35 for doctoral"
    ],
    "meritOrNeedRequirements": [
      "Academic merit, social activities, and clear motivation for studying in Turkey"
    ],
    "minGpa": 3.0,
    "awardAmountAndCurrency": "University placement + full tuition + monthly stipend + 1-year Turkish course + dormitory + health insurance + flights",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Full Board / Meal Plan",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Free state student dormitory, comprehensive public health insurance, one-time round-trip flight ticket",
    "programDuration": "4 to 5 Years (Bachelor's) or 2 Years (Master's) or 4 Years (PhD)",
    "openingDate": "2026-01-10",
    "deadline": "February 20, 2027",
    "deadlineDate": "2027-02-20",
    "requiredDocuments": [
      "TBBS online application form",
      "Valid identity document or passport",
      "Recent photo",
      "Graduation certificate or student certificate",
      "Academic transcripts",
      "Letter of intent / motivation",
      "International exam scores (GRE, GMAT, SAT if required by chosen program)"
    ],
    "languageRequirements": [
      "1-year Turkish language course provided free of charge for all awardees"
    ],
    "sourceLanguage": "Turkish / English / Arabic / French / Russian",
    "extractedEvidence": "T\u00fcrkiye Scholarships covers university and program placement, tuition fee, monthly stipend, one-year Turkish language course, accommodation in student dormitories, one-off flight ticket upon arrival and graduation, and general health insurance.",
    "lastVerifiedTimestamp": "2026-10-01T15:00:00Z",
    "dataProvenance": "YTB official Turkish government statutory decree",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-tr-ytb",
    "createdAt": "2026-01-10T00:00:00Z",
    "updatedAt": "2026-10-01T15:00:00Z",
    "tags": [
      "Turkey",
      "Turkiye Burslari",
      "YTB",
      "Bachelors",
      "Masters",
      "PhD",
      "Full Ride"
    ],
    "organizer": "Presidency for Turks Abroad and Related Communities (YTB)",
    "officialUrl": "https://www.turkiyeburslari.gov.tr/",
    "category": "Master's Fellowship",
    "badge": "100% Full Turkish Government Package",
    "summary": "Government-funded higher education scholarship program for international students, including direct university admission placement, full tuition, dormitory, and flights.",
    "description": "What makes T\u00fcrkiye Scholarships unique is that it is not only inclusive of financial support, but also provides direct placement into university courses for all awardees.",
    "location": "Turkey (Istanbul University, METU, Bo\u011fazi\u00e7i, Bilkent, Ankara University, etc.)",
    "format": "In-person",
    "dates": "September 2027 \u2013 July 2029",
    "duration": "2 to 5 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + university placement + monthly stipend + dorm + flight + insurance",
    "funding": {
      "tuitionUsd": 5000,
      "accommodationUsd": 3000,
      "mealsUsd": 2000,
      "travelUsd": 1000,
      "visaInsuranceUsd": 400,
      "stipendUsd": 4500,
      "otherUsd": 500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living allowance (approx. 3,500 to 6,000 TRY/mo depending on degree level)",
      "fundingTypeNote": "All-inclusive government package: Guaranteed university admission, tuition waiver, dormitory, flights, and insurance.",
      "financialExclusions": [
        "Private apartment rental differences outside state dorms"
      ]
    },
    "requirementsList": [
      {
        "id": "tr-achieve",
        "category": "academics",
        "label": "Minimum Academic Score (70% or 75%)",
        "ruleDescription": "Minimum 70% achievement for undergrad; 75% for graduate studies.",
        "officialSourceQuote": "Minimum academic achievement: 70% for undergraduate, 75% for master's and PhD.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-01",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.turkiyeburslari.gov.tr/"
  },
  {
    "id": "sch-saudi-kaust",
    "title": "KAUST Fellowship for MS and PhD Students",
    "provider": "King Abdullah University of Science and Technology (KAUST)",
    "providerType": "Public University",
    "officialProgramUrl": "https://www.kaust.edu.sa/en/study/fellowship",
    "officialApplicationUrl": "https://admissions.kaust.edu.sa/",
    "destinationCountries": [
      "Saudi Arabia"
    ],
    "eligibleNationalities": [
      "Open Worldwide (All nationalities, international and Saudi students)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "STEM Disciplines (Applied Mathematics, Computer Science, Bioengineering, Energy Resources, Marine Science, Materials Science, Chemical Engineering)"
    ],
    "academicRequirements": [
      "Completed bachelor's or master's degree in a relevant STEM discipline",
      "Minimum TOEFL iBT 79 or IELTS 6.5"
    ],
    "meritOrNeedRequirements": [
      "High research motivation, academic excellence, scientific problem-solving"
    ],
    "minGpa": 3.7,
    "awardAmountAndCurrency": "100% Full Tuition + $20,000 to $30,000 USD/year stipend + on-campus housing + medical insurance + relocation flights",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Private on-campus housing, medical and dental coverage, relocation flights, state-of-the-art supercomputing access",
    "programDuration": "2 Years (MS) or 3.5 to 5 Years (PhD)",
    "openingDate": "2026-09-01",
    "deadline": "Rolling admissions (Final round January 15, 2027)",
    "deadlineDate": "2027-01-15",
    "requiredDocuments": [
      "Official university transcripts",
      "Statement of purpose",
      "Curriculum vitae (CV)",
      "Three letters of recommendation from professors or research mentors",
      "Official TOEFL or IELTS score"
    ],
    "languageRequirements": [
      "English (KAUST operates entirely in English)"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "All admitted students receive the benefits of the KAUST Fellowship which supports students for the duration of their graduate studies. The benefits of the KAUST Fellowship include: full tuition support, monthly living allowance (ranging between $20,000\u2013$30,000 annually), private housing, medical and dental coverage, and relocation support.",
    "lastVerifiedTimestamp": "2026-10-06T14:00:00Z",
    "dataProvenance": "KAUST Graduate Admissions official charter",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-sa-kaust",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-06T14:00:00Z",
    "tags": [
      "Saudi Arabia",
      "KAUST",
      "STEM",
      "Masters",
      "PhD",
      "Full Ride",
      "High Stipend"
    ],
    "organizer": "King Abdullah University of Science and Technology",
    "officialUrl": "https://www.kaust.edu.sa/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Endowment STEM Fellowship",
    "summary": "Every admitted graduate student at KAUST receives the KAUST Fellowship, providing full tuition waiver, private housing on the Red Sea campus, medical coverage, and a $20,000 to $30,000 USD annual stipend.",
    "description": "KAUST is an international graduate research university on the shores of the Red Sea, dedicated to advancing science and technology through interdisciplinary research.",
    "location": "Thuwal, Saudi Arabia (KAUST Campus)",
    "format": "In-person",
    "dates": "August 2027 \u2013 May 2029",
    "duration": "2 to 5 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + $20,000\u2013$30,000 USD/year stipend + private housing + flights",
    "funding": {
      "tuitionUsd": 35000,
      "accommodationUsd": 12000,
      "mealsUsd": 5000,
      "travelUsd": 2000,
      "visaInsuranceUsd": 1200,
      "stipendUsd": 25000,
      "otherUsd": 1000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "$20,000 to $30,000 annual net living stipend",
      "fundingTypeNote": "Guaranteed automatic fellowship for all admitted MS and PhD candidates.",
      "financialExclusions": [
        "Personal luxury spending"
      ]
    },
    "requirementsList": [
      {
        "id": "kaust-gpa",
        "category": "academics",
        "label": "STEM Degree Background",
        "ruleDescription": "Undergraduate degree in Science, Technology, Engineering, or Math.",
        "officialSourceQuote": "Applicants must have a bachelor's degree in a relevant STEM discipline.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-06",
    "sourceType": "University Portal",
    "sourceUrl": "https://www.kaust.edu.sa/en/study/fellowship"
  },
  {
    "id": "sch-australia-awards",
    "title": "Australia Awards Scholarships",
    "provider": "Department of Foreign Affairs and Trade (DFAT Australia)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.dfat.gov.au/people-to-people/australia-awards",
    "officialApplicationUrl": "https://oasis.dfat.gov.au/",
    "destinationCountries": [
      "Australia"
    ],
    "eligibleNationalities": [
      "Citizens of participating Indo-Pacific, Asian, African, and Middle Eastern countries"
    ],
    "eligibleResidenceCountries": [
      "Resident in eligible partner country"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": 18,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Development priority areas identified in country profiles (Governance, Health, Infrastructure, Agriculture, Climate)"
    ],
    "academicRequirements": [
      "Meet academic requirements of participating Australian higher education institution",
      "Demonstrated capacity to lead development in home nation"
    ],
    "meritOrNeedRequirements": [
      "Commitment to return to home country for at least two years post-study"
    ],
    "minGpa": 3.2,
    "awardAmountAndCurrency": "Full tuition fees + return air travel + establishment allowance + fortnightly Contribution to Living Expenses (CLE)",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Establishment allowance (AUD $5,000), Overseas Student Health Cover (OSHC), Introductory Academic Program (IAP)",
    "programDuration": "Minimum period necessary for individual academic program (typically 1 to 4 years)",
    "openingDate": "2026-02-01",
    "deadline": "April 30, 2026 (varies by partner country)",
    "deadlineDate": "2026-04-30",
    "requiredDocuments": [
      "Certified copies of degree certificates and official transcripts",
      "Proof of citizenship",
      "Curriculum vitae and referee reports",
      "Development Impact Plan detailing intended contribution to home country",
      "IELTS or TOEFL test score"
    ],
    "languageRequirements": [
      "Academic IELTS 6.5+ (no band under 6.0) or equivalent TOEFL iBT 84+"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Australia Awards Scholarships cover full tuition fees, return air travel, establishment allowance, contribution to living expenses (CLE) paid every two weeks, introductory academic program, overseas student health cover, and supplementary academic support.",
    "lastVerifiedTimestamp": "2026-10-07T13:00:00Z",
    "dataProvenance": "Australian Department of Foreign Affairs and Trade policy handbook",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-au-awards",
    "createdAt": "2026-02-01T00:00:00Z",
    "updatedAt": "2026-10-07T13:00:00Z",
    "tags": [
      "Australia",
      "Australia Awards",
      "DFAT",
      "Masters",
      "PhD",
      "Development",
      "Full Ride"
    ],
    "organizer": "Department of Foreign Affairs and Trade (DFAT Australia)",
    "officialUrl": "https://www.dfat.gov.au/people-to-people/australia-awards",
    "category": "Master's Fellowship",
    "badge": "100% Full Australian Government Award",
    "summary": "Long-term awards administered by DFAT providing individuals from developing countries with the opportunity to undertake full-time undergraduate or postgraduate study at participating Australian universities.",
    "description": "Aimed at contributing to the development needs of Australia\u2019s partner countries in line with bilateral and regional development agreements.",
    "location": "Australia (Participating Australian Universities)",
    "format": "In-person",
    "dates": "January 2027 \u2013 December 2028",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + flights + AUD $5,000 establishment grant + living stipend + health cover",
    "funding": {
      "tuitionUsd": 34000,
      "accommodationUsd": 14000,
      "mealsUsd": 7000,
      "travelUsd": 1800,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 21000,
      "otherUsd": 1500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Fortnightly Contribution to Living Expenses (approx. AUD $35,000/year)",
      "fundingTypeNote": "100% tuition, return flights, AUD $5,000 arrival grant, living allowance, and student health cover (OSHC).",
      "financialExclusions": [
        "Two-year mandatory return to home country upon completion"
      ]
    },
    "requirementsList": [
      {
        "id": "au-return",
        "category": "nationality",
        "label": "2-Year Home Country Return Requirement",
        "ruleDescription": "Must leave Australia and return to home country for at least two years post-degree.",
        "officialSourceQuote": "Scholars must leave Australia for a minimum of two years upon completing their scholarship.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-07",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.dfat.gov.au/people-to-people/australia-awards"
  },
  {
    "id": "sch-australia-rtp",
    "title": "Australian Government Research Training Program (RTP Stipend)",
    "provider": "Department of Education (Australia) / Participating Universities",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.education.gov.au/research-block-grants/research-training-program",
    "officialApplicationUrl": "https://www.education.gov.au/research-block-grants/research-training-program",
    "destinationCountries": [
      "Australia"
    ],
    "eligibleNationalities": [
      "Open Worldwide (Domestic and international postgraduate researchers)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Doctoral / PhD",
      "Master's"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Higher Degrees by Research (HDR) in all disciplines"
    ],
    "academicRequirements": [
      "Completed four-year bachelor's degree with First Class Honours or Master\u2019s by Research",
      "Strong academic record and significant research output or potential"
    ],
    "meritOrNeedRequirements": [
      "Ranked on academic merit and research alignment by host university"
    ],
    "minGpa": 3.7,
    "awardAmountAndCurrency": "Full tuition fee offset + living stipend ~AUD $37,000/year + relocation & thesis allowances",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Fixed Airfare Allowance",
    "stipendAndOtherBenefits": "Full RTP Fee Offset covering 100% tuition, overseas student health cover, and thesis binding allowance",
    "programDuration": "3.5 Years (PhD) or 2 Years (Master\u2019s by Research)",
    "openingDate": "2026-07-01",
    "deadline": "August 31 or October 31, 2026 (varies by university)",
    "deadlineDate": "2026-10-31",
    "requiredDocuments": [
      "University HDR admission application",
      "Curriculum vitae with research publications",
      "Research proposal (two to four pages)",
      "Two academic referee reports",
      "Supervisor endorsement letter"
    ],
    "languageRequirements": [
      "English language proficiency meeting Australian university cutoff"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The RTP provides block grants to higher education providers to support domestic and international students undertaking Higher Degrees by Research. Benefits include RTP Fee Offset (tuition), RTP Stipend (living costs ~AUD $37,000/yr), and RTP Allowances (relocation, health, thesis).",
    "lastVerifiedTimestamp": "2026-10-06T11:00:00Z",
    "dataProvenance": "Australian Department of Education Higher Education Support Act regulations",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-au-awards",
    "createdAt": "2026-07-01T00:00:00Z",
    "updatedAt": "2026-10-06T11:00:00Z",
    "tags": [
      "Australia",
      "RTP",
      "Research Training Program",
      "PhD",
      "Masters by Research",
      "Full Ride"
    ],
    "organizer": "Australian Department of Education",
    "officialUrl": "https://www.education.gov.au/research-block-grants/research-training-program",
    "category": "Graduate Fellowship",
    "badge": "100% Full Australian Federal Research Stipend",
    "summary": "Block grant scholarship scheme funded by the Australian Government, providing full tuition offset and generous living stipends for domestic and international PhD researchers.",
    "description": "Available at all accredited Australian universities (including University of Melbourne, Sydney, ANU, UNSW, Queensland, Monash, Adelaide, UWA).",
    "location": "Australia (Any accredited Australian university)",
    "format": "In-person",
    "dates": "March 2027 \u2013 September 2030",
    "duration": "3.5 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition offset + ~AUD $37,000/year stipend + relocation allowance + health cover",
    "funding": {
      "tuitionUsd": 32000,
      "accommodationUsd": 14000,
      "mealsUsd": 6500,
      "travelUsd": 1500,
      "visaInsuranceUsd": 1200,
      "stipendUsd": 24000,
      "otherUsd": 1000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Annual living stipend approx. AUD $37,000/year (indexed annually)",
      "fundingTypeNote": "Full tuition offset, indexed tax-free living stipend, and relocation allowance.",
      "financialExclusions": [
        "Fieldwork costs not covered in host department allocation"
      ]
    },
    "requirementsList": [
      {
        "id": "rtp-research",
        "category": "academic_level",
        "label": "Honours 1 or Equivalent Research Degree",
        "ruleDescription": "First Class Honours or Master\u2019s by Research required.",
        "officialSourceQuote": "Applicants must demonstrate high research achievement and academic background equivalent to an Australian First Class Honours.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-06",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://www.education.gov.au/research-block-grants/research-training-program"
  },
  {
    "id": "sch-nz-manaaki",
    "title": "Manaaki New Zealand Scholarships",
    "provider": "Ministry of Foreign Affairs and Trade (MFAT New Zealand)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.scholarships.education.govt.nz/",
    "officialApplicationUrl": "https://www.scholarships.education.govt.nz/apply/",
    "destinationCountries": [
      "New Zealand"
    ],
    "eligibleNationalities": [
      "Citizens of eligible partner countries across Pacific, Asia, Africa, Latin America, Caribbean"
    ],
    "eligibleResidenceCountries": [
      "Resident in eligible partner country for at least two years prior to application"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": 18,
    "maxAge": 40,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Climate Change & Resilience, Disaster Risk Management, Food Security & Agriculture, Renewable Energy, Good Governance"
    ],
    "academicRequirements": [
      "Meet academic entry criteria for chosen qualification at a New Zealand university or institution",
      "Commitment to return to home country for a minimum of two years"
    ],
    "meritOrNeedRequirements": [
      "Development priority alignment and leadership capability"
    ],
    "minGpa": 3.2,
    "awardAmountAndCurrency": "Full tuition fees + living allowance NZD $531/week + NZD $3,000 establishment grant + flights + medical insurance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Establishment allowance (NZD $3,000), basic medical insurance, research allowance for postgraduate research",
    "programDuration": "1 to 4 Years",
    "openingDate": "2026-02-01",
    "deadline": "February 28, 2026 (for Pacific / Asia) / varies by country",
    "deadlineDate": "2026-02-28",
    "requiredDocuments": [
      "Online Manaaki application form",
      "Academic transcripts and degree certificates",
      "Proof of citizenship and residency",
      "Work history and development contribution statement",
      "Referees' evaluations"
    ],
    "languageRequirements": [
      "IELTS Academic 6.5+ (no band less than 6.0) or TOEFL equivalent"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Manaaki New Zealand Scholarships cover full tuition fees, a living allowance of NZD 531 per week, an establishment allowance of NZD 3,000, medical insurance, travel to and from New Zealand, and travel insurance.",
    "lastVerifiedTimestamp": "2026-09-28T12:00:00Z",
    "dataProvenance": "New Zealand Ministry of Foreign Affairs and Trade (MFAT) policy portal",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-nz-manaaki",
    "createdAt": "2026-02-01T00:00:00Z",
    "updatedAt": "2026-09-28T12:00:00Z",
    "tags": [
      "New Zealand",
      "Manaaki",
      "MFAT",
      "Masters",
      "PhD",
      "Development",
      "Full Ride"
    ],
    "organizer": "Ministry of Foreign Affairs and Trade (MFAT New Zealand)",
    "officialUrl": "https://www.scholarships.education.govt.nz/",
    "category": "Master's Fellowship",
    "badge": "100% Full New Zealand Government Award",
    "summary": "Government scholarships to help build sustainable development, strong leadership, and enduring friendships between New Zealand and partner nations.",
    "description": "Scholars gain world-class qualifications at New Zealand universities while focusing on climate resilience, sustainable agriculture, and economic governance.",
    "location": "New Zealand (University of Auckland, Otago, Victoria Wellington, Canterbury, Massey, Waikato, Lincoln, AUT)",
    "format": "In-person",
    "dates": "February 2027 \u2013 November 2028",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + NZD $531/week living allowance + NZD $3,000 setup grant + flights + health insurance",
    "funding": {
      "tuitionUsd": 26000,
      "accommodationUsd": 11000,
      "mealsUsd": 5500,
      "travelUsd": 1800,
      "visaInsuranceUsd": 800,
      "stipendUsd": 17000,
      "otherUsd": 1200,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "NZD $531 per week living allowance paid fortnightly",
      "fundingTypeNote": "Full tuition fees, weekly living allowance, arrival setup grant, return flights, and medical insurance.",
      "financialExclusions": [
        "Mandatory two-year return to home country post-study"
      ]
    },
    "requirementsList": [
      {
        "id": "nz-return",
        "category": "nationality",
        "label": "2-Year Home Country Return Requirement",
        "ruleDescription": "Must return to home country for at least two years post-graduation.",
        "officialSourceQuote": "Scholars must return home for at least two years after completing their scholarship.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-28",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.scholarships.education.govt.nz/"
  },
  {
    "id": "sch-mandela-rhodes",
    "title": "Mandela Rhodes Scholarships for African Youth",
    "provider": "The Mandela Rhodes Foundation",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.mandelarhodes.org/",
    "officialApplicationUrl": "https://www.mandelarhodes.org/scholarship/apply/",
    "destinationCountries": [
      "South Africa"
    ],
    "eligibleNationalities": [
      "Citizens of all African countries"
    ],
    "eligibleResidenceCountries": [
      "Resident in any African nation"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": 19,
    "maxAge": 29,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Honours and Master's degrees in any field of study offered by recognized South African universities"
    ],
    "academicRequirements": [
      "Completed undergraduate degree prior to start date with above-average academic results (typically 70%+)",
      "Under the age of 30 at the time of taking up the scholarship"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated commitment to the principles of Leadership, Reconciliation, Education, and Entrepreneurship"
    ],
    "minGpa": 3.4,
    "awardAmountAndCurrency": "Full tuition fees + accommodation allowance + meal allowance + medical aid + economy flights + personal allowance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Year-long transformative leadership development program, books and research allowances",
    "programDuration": "1 to 2 Years",
    "openingDate": "2026-03-01",
    "deadline": "April 21, 2026",
    "deadlineDate": "2026-04-21",
    "requiredDocuments": [
      "Online Mandela Rhodes application form",
      "Two short personal essays on leadership and reconciliatory reconciliation",
      "Detailed CV and transcripts",
      "Three reference letters (two academic, one character/leadership)"
    ],
    "languageRequirements": [
      "English"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The Mandela Rhodes scholarship covers tuition and registration fees, an allowance for study materials, medical aid, accommodation and meal allowances, economy class flights to South Africa, and a personal allowance.",
    "lastVerifiedTimestamp": "2026-09-20T12:00:00Z",
    "dataProvenance": "The Mandela Rhodes Foundation official scholarship deed",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-mandela-rhodes",
    "createdAt": "2026-03-01T00:00:00Z",
    "updatedAt": "2026-09-20T12:00:00Z",
    "tags": [
      "South Africa",
      "Mandela Rhodes",
      "Pan-African",
      "Masters",
      "Leadership",
      "Full Ride"
    ],
    "organizer": "The Mandela Rhodes Foundation",
    "officialUrl": "https://www.mandelarhodes.org/",
    "category": "Master's Fellowship",
    "badge": "100% Full Pan-African Leadership Fellowship",
    "summary": "Builds exceptional leadership capacity in Africa through funding for postgraduate studies at South African universities alongside a bespoke leadership development programme.",
    "description": "Nelson Mandela and the Rhodes Trust established this prestigious fellowship to nurture ethical, courageous, and transformative leadership across the African continent.",
    "location": "South Africa (University of Cape Town, Wits, Stellenbosch, Rhodes University, etc.)",
    "format": "In-person",
    "dates": "January 2027 \u2013 December 2028",
    "duration": "1 to 2 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + room & board allowances + medical aid + flights + personal allowance",
    "funding": {
      "tuitionUsd": 6000,
      "accommodationUsd": 5500,
      "mealsUsd": 3500,
      "travelUsd": 1200,
      "visaInsuranceUsd": 600,
      "stipendUsd": 6500,
      "otherUsd": 800,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Comprehensive living and personal allowance + study materials grant",
      "fundingTypeNote": "100% tuition and registration, room and board, medical aid, flights, and leadership retreats.",
      "financialExclusions": [
        "Study beyond approved degree duration"
      ]
    },
    "requirementsList": [
      {
        "id": "mr-citizenship",
        "category": "nationality",
        "label": "African Country Citizenship",
        "ruleDescription": "Must be citizen of any African country.",
        "officialSourceQuote": "Applicants must be citizens of an African country.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-20",
    "sourceType": "Philanthropic Trust Portal",
    "sourceUrl": "https://www.mandelarhodes.org/"
  },
  {
    "id": "sch-mastercard-uct",
    "title": "Mastercard Foundation Scholars Program at University of Cape Town",
    "provider": "Mastercard Foundation / University of Cape Town (UCT)",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://mastercardfdn.org/all/scholars/",
    "officialApplicationUrl": "http://www.mcfsp.uct.ac.za/",
    "destinationCountries": [
      "South Africa"
    ],
    "eligibleNationalities": [
      "Citizens of Sub-Saharan African countries"
    ],
    "eligibleResidenceCountries": [
      "Sub-Saharan Africa"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's"
    ],
    "minAge": 17,
    "maxAge": 30,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Commerce, Engineering & Built Environment, Health Sciences, Humanities, Law, and Science"
    ],
    "academicRequirements": [
      "Academically talented young person committed to contributing to their home community",
      "Demonstrated economic disadvantage / financial barriers to education"
    ],
    "meritOrNeedRequirements": [
      "Verified financial need, leadership potential, and community giveback ethos"
    ],
    "minGpa": 3.3,
    "awardAmountAndCurrency": "Comprehensive full ride: Tuition, accommodation, meals, transport, stipend, visa, medical aid, laptop",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Full Board / Meal Plan",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full on-campus residence, monthly living stipend, laptop, health insurance, and academic tutoring support",
    "programDuration": "1 to 4 Years",
    "openingDate": "2026-04-01",
    "deadline": "July 31, 2026 (Undergrad) / September 30, 2026 (Postgrad)",
    "deadlineDate": "2026-09-30",
    "requiredDocuments": [
      "UCT university admission application",
      "Mastercard Foundation Scholars Program application form",
      "Proof of financial need (payslips, tax assessments, household declaration)",
      "Academic transcripts and school leaving certificates",
      "Two letters of recommendation validating leadership and community commitment"
    ],
    "languageRequirements": [
      "English"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The scholarship covers full tuition, accommodation in university residence, meals, books and course equipment, medical aid, visa costs, travel to and from South Africa, and a living allowance.",
    "lastVerifiedTimestamp": "2026-10-09T15:00:00Z",
    "dataProvenance": "Mastercard Foundation & UCT Admissions registry",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-mastercard-fdn",
    "createdAt": "2026-04-01T00:00:00Z",
    "updatedAt": "2026-10-09T15:00:00Z",
    "tags": [
      "South Africa",
      "UCT",
      "Mastercard Foundation",
      "Undergrad",
      "Masters",
      "Need Based",
      "Full Ride"
    ],
    "organizer": "Mastercard Foundation & University of Cape Town",
    "officialUrl": "http://www.mcfsp.uct.ac.za/",
    "category": "Merit Scholarship",
    "badge": "100% Comprehensive Need-Based Full Ride",
    "summary": "Provides academically talented yet economically disadvantaged young people from Africa with access to world-class university education at Africa\u2019s top-ranked institution.",
    "description": "Scholars receive holistic financial, academic, and psychosocial support to nurture their transition into transformative leaders across the African continent.",
    "location": "Cape Town, South Africa (University of Cape Town)",
    "format": "In-person",
    "dates": "February 2027 \u2013 November 2029",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% full tuition + campus housing + dining + flights + stipend + laptop",
    "funding": {
      "tuitionUsd": 7000,
      "accommodationUsd": 5000,
      "mealsUsd": 3500,
      "travelUsd": 1400,
      "visaInsuranceUsd": 600,
      "stipendUsd": 5500,
      "otherUsd": 1200,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living stipend + personal laptop + textbook allowance",
      "fundingTypeNote": "100% comprehensive full ride covering tuition, residence, food, airfare, medical aid, and allowances.",
      "financialExclusions": [
        "Funding for family dependents"
      ]
    },
    "requirementsList": [
      {
        "id": "mcf-need",
        "category": "financial_need",
        "label": "Demonstrated Financial Disadvantage",
        "ruleDescription": "Must demonstrate financial barriers preventing university access.",
        "officialSourceQuote": "The program is specifically for students who face significant financial barriers to continuing their education.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-09",
    "sourceType": "Foundation Portal",
    "sourceUrl": "http://www.mcfsp.uct.ac.za/"
  },
  {
    "id": "sch-worldbank-jjwbgsp",
    "title": "Joint Japan/World Bank Graduate Scholarship Program (JJ/WBGSP)",
    "provider": "World Bank Group",
    "providerType": "Multilateral Organization",
    "officialProgramUrl": "https://www.worldbank.org/en/programs/scholarships",
    "officialApplicationUrl": "https://www.worldbank.org/en/programs/scholarships#3",
    "destinationCountries": [
      "United States",
      "United Kingdom",
      "Japan",
      "France",
      "Netherlands",
      "Australia"
    ],
    "eligibleNationalities": [
      "Citizens of World Bank member developing countries on the official DAC list"
    ],
    "eligibleResidenceCountries": [
      "Resident in eligible developing country"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": 24,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Preferred Master\u2019s Programs in development fields (Economic Policy, Infrastructure, Public Health, Agriculture, Education)"
    ],
    "academicRequirements": [
      "Hold a Bachelor\u2019s degree earned at least 3 years prior to the application deadline",
      "Have 3 or more years of recent development-related work experience in home country"
    ],
    "meritOrNeedRequirements": [
      "Unconditional admission to an eligible JJ/WBGSP partner master's program"
    ],
    "minGpa": 3.4,
    "awardAmountAndCurrency": "Full university tuition + monthly living stipend + economy class air travel + health insurance + $500 travel grant",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Comprehensive medical insurance, $500 travel allowance, books and research expenses",
    "programDuration": "1 to 2 Years",
    "openingDate": "2026-01-15",
    "deadline": "February 28, 2026 (Window 1) / May 24, 2026 (Window 2)",
    "deadlineDate": "2026-05-24",
    "requiredDocuments": [
      "Official proof of current citizenship from an eligible developing country",
      "Unconditional letter of admission to an eligible partner master's degree program",
      "Proof of minimum three years of development-related work experience",
      "Two professional recommendation letters from direct supervisors",
      "Medical certificate of good health"
    ],
    "languageRequirements": [
      "Meets entry requirements of chosen partner master's program"
    ],
    "sourceLanguage": "English / French / Spanish",
    "extractedEvidence": "The JJ/WBGSP scholarship provides full tuition for the graduate program and basic medical insurance. A monthly subsistence allowance to cover living expenses, round-trip economy class air travel between home country and host university, plus a 500 USD travel allowance.",
    "lastVerifiedTimestamp": "2026-10-05T14:00:00Z",
    "dataProvenance": "World Bank Education Global Practice official guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-worldbank",
    "createdAt": "2026-01-15T00:00:00Z",
    "updatedAt": "2026-10-05T14:00:00Z",
    "tags": [
      "World Bank",
      "JJ/WBGSP",
      "Development",
      "Masters",
      "Fully Funded",
      "Global Scholars"
    ],
    "organizer": "World Bank Group",
    "officialUrl": "https://www.worldbank.org/en/programs/scholarships",
    "category": "Master's Fellowship",
    "badge": "100% Full World Bank Development Fellowship",
    "summary": "Supports mid-career professionals from developing countries to pursue Master\u2019s degrees in key development disciplines at leading partner universities worldwide.",
    "description": "Graduates commit to returning to their home countries upon graduation to apply their new skills and contribute to social and economic development.",
    "location": "Global (Partner universities in US, UK, Europe, Japan, Australia)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2028",
    "duration": "1 to 2 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + monthly living stipend + flights + $500 travel allowance + medical insurance",
    "funding": {
      "tuitionUsd": 38000,
      "accommodationUsd": 14000,
      "mealsUsd": 6500,
      "travelUsd": 1800,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 22000,
      "otherUsd": 1200,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly subsistence allowance to cover living expenses",
      "fundingTypeNote": "100% tuition, monthly allowance, round-trip airfare, $500 travel grant, and basic medical insurance.",
      "financialExclusions": [
        "Family member expenses"
      ]
    },
    "requirementsList": [
      {
        "id": "wb-work",
        "category": "academics",
        "label": "3 Years Development Work Experience",
        "ruleDescription": "Must possess at least three years of recent development work experience.",
        "officialSourceQuote": "Have 3 or more years of development-related work experience since earning a Bachelor's degree.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-05",
    "sourceType": "International Organization Portal",
    "sourceUrl": "https://www.worldbank.org/en/programs/scholarships"
  },
  {
    "id": "sch-isdb-scholarship",
    "title": "Islamic Development Bank (IsDB) Scholarship Programmes",
    "provider": "Islamic Development Bank",
    "providerType": "Multilateral Organization",
    "officialProgramUrl": "https://www.isdb.org/scholarships",
    "officialApplicationUrl": "https://isdbscholarships.smartsimple.com/",
    "destinationCountries": [
      "United Kingdom",
      "Turkey",
      "Malaysia",
      "Morocco",
      "Saudi Arabia",
      "Canada"
    ],
    "eligibleNationalities": [
      "Citizens of 57 IsDB Member Countries or Muslim communities in non-member countries"
    ],
    "eligibleResidenceCountries": [
      "Resident in eligible member country or non-member state"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": 18,
    "maxAge": 35,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Sustainable Development, Engineering, Agriculture, Medicine, Renewable Energy, Computer Science, Economics"
    ],
    "academicRequirements": [
      "Good academic standing (at least 'Very Good' in overall grades)",
      "Commitment to serve home country and repay through community service upon graduation"
    ],
    "meritOrNeedRequirements": [
      "Leadership in science and socio-economic development"
    ],
    "minGpa": 3.3,
    "awardAmountAndCurrency": "Full tuition fees + monthly living allowance + round-trip airfare + medical coverage + installation grant",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Comprehensive health insurance, annual clothing/book allowance, research thesis grant",
    "programDuration": "2 to 4 Years",
    "openingDate": "2026-01-01",
    "deadline": "March 31, 2026",
    "deadlineDate": "2026-03-31",
    "requiredDocuments": [
      "Online IsDB portal application",
      "Proof of nationality",
      "Academic certificates and certified grade transcripts",
      "Curriculum vitae and study plan",
      "Medical report"
    ],
    "languageRequirements": [
      "Language of instruction of chosen partner university (English/Arabic/French)"
    ],
    "sourceLanguage": "Arabic / English / French",
    "extractedEvidence": "The scholarship covers full tuition fees, a monthly living allowance commensurate with the cost of living of the host country, round-trip economy air tickets, medical insurance, and a thesis preparation allowance.",
    "lastVerifiedTimestamp": "2026-09-22T10:00:00Z",
    "dataProvenance": "Islamic Development Bank human development charter",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-isdb",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-09-22T10:00:00Z",
    "tags": [
      "IsDB",
      "Multilateral",
      "Bachelors",
      "Masters",
      "PhD",
      "STEM",
      "Full Ride"
    ],
    "organizer": "Islamic Development Bank",
    "officialUrl": "https://www.isdb.org/scholarships",
    "category": "Graduate Fellowship",
    "badge": "100% Full IsDB Multilateral Fellowship",
    "summary": "Invests in human capital development to build expertise in science, technology, and innovation across member countries and Muslim communities worldwide.",
    "description": "Supports talented students pursuing undergraduate, Master\u2019s, PhD, and post-doctoral research programs at leading universities worldwide.",
    "location": "Global (Partner universities in UK, Turkey, Malaysia, Canada, etc.)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2029",
    "duration": "2 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + monthly living stipend + flights + medical coverage + setup grant",
    "funding": {
      "tuitionUsd": 22000,
      "accommodationUsd": 11000,
      "mealsUsd": 5500,
      "travelUsd": 1500,
      "visaInsuranceUsd": 800,
      "stipendUsd": 16000,
      "otherUsd": 1000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living allowance aligned with host country cost of living",
      "fundingTypeNote": "100% tuition fees, monthly living stipend, economy round-trip airfare, and health coverage.",
      "financialExclusions": [
        "Family member expenses"
      ]
    },
    "requirementsList": [
      {
        "id": "isdb-nat",
        "category": "nationality",
        "label": "IsDB Member Country or Muslim Community",
        "ruleDescription": "Citizen of an IsDB member country or Muslim community in non-member states.",
        "officialSourceQuote": "Must be a citizen of an IsDB member country or Muslim community in a non-member country.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-22",
    "sourceType": "International Organization Portal",
    "sourceUrl": "https://www.isdb.org/scholarships"
  },
  {
    "id": "sch-rotary-peace",
    "title": "Rotary Peace Fellowships",
    "provider": "The Rotary Foundation",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.rotary.org/en/our-programs/peace-fellowships",
    "officialApplicationUrl": "https://www.rotary.org/en/our-programs/peace-fellowships/apply",
    "destinationCountries": [
      "United States",
      "United Kingdom",
      "Japan",
      "Australia",
      "Sweden",
      "Uganda"
    ],
    "eligibleNationalities": [
      "Open Worldwide (Leaders with proven dedication to peace and development)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": null,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Peace & Conflict Resolution, International Development, Human Rights"
    ],
    "academicRequirements": [
      "Bachelor\u2019s degree and at least three years of full-time relevant work experience in peace or development (for Master\u2019s program)",
      "Proficiency in English"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated commitment to peace, community service, and conflict prevention"
    ],
    "minGpa": 3.2,
    "awardAmountAndCurrency": "Full tuition fees + room and board + round-trip transportation + internship/applied field experience costs",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full field study and internship expenses covered, medical insurance included",
    "programDuration": "15 to 24 Months (Master\u2019s) or 1 Year (Professional Certificate)",
    "openingDate": "2026-02-01",
    "deadline": "May 15, 2026",
    "deadlineDate": "2026-05-15",
    "requiredDocuments": [
      "Online Rotary Peace Fellowship application",
      "Resume / CV showing peace and development experience",
      "Transcripts from higher education",
      "Two letters of recommendation",
      "Rotary District endorsement"
    ],
    "languageRequirements": [
      "Fluent English"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The fellowships cover tuition and fees, room and board, round-trip transportation, and all internship and field-study expenses.",
    "lastVerifiedTimestamp": "2026-09-12T11:00:00Z",
    "dataProvenance": "The Rotary Foundation international fellowship charter",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-rotary-peace",
    "createdAt": "2026-02-01T00:00:00Z",
    "updatedAt": "2026-09-12T11:00:00Z",
    "tags": [
      "Rotary",
      "Peace",
      "Conflict Resolution",
      "Masters",
      "Fully Funded",
      "Global"
    ],
    "organizer": "The Rotary Foundation",
    "officialUrl": "https://www.rotary.org/en/our-programs/peace-fellowships",
    "category": "Master's Fellowship",
    "badge": "100% Full Rotary International Fellowship",
    "summary": "Fully funded academic fellowship covering tuition, room and board, round-trip transportation, and internship costs at designated Rotary Peace Centers worldwide.",
    "description": "Fellows study at leading universities such as Duke-UNC (USA), University of Bradford (UK), ICU (Japan), University of Queensland (Australia), or Uppsala University (Sweden).",
    "location": "Global (Rotary Peace Centers in US, UK, Japan, Australia, Sweden, Uganda)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2029",
    "duration": "15 to 24 Months",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + room & board + round-trip flights + field study expenses",
    "funding": {
      "tuitionUsd": 32000,
      "accommodationUsd": 14000,
      "mealsUsd": 6500,
      "travelUsd": 2000,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 18000,
      "otherUsd": 2500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Full room, board, and field experience living allowance",
      "fundingTypeNote": "100% coverage: Tuition, accommodation, meals, airfare, and field placement expenses.",
      "financialExclusions": [
        "Active Rotary members and their close relatives are ineligible"
      ]
    },
    "requirementsList": [
      {
        "id": "rot-work",
        "category": "academics",
        "label": "3 Years Peace / Development Work Experience",
        "ruleDescription": "At least three years of full-time relevant work experience.",
        "officialSourceQuote": "Have at least three years of full-time relevant experience in peace or development work.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-12",
    "sourceType": "Foundation Portal",
    "sourceUrl": "https://www.rotary.org/en/our-programs/peace-fellowships"
  },
  {
    "id": "sch-rise-for-the-world",
    "title": "Rise Global Winner Opportunity",
    "provider": "Schmidt Futures & The Rhodes Trust",
    "providerType": "Philanthropic Trust",
    "officialProgramUrl": "https://www.risefortheworld.org/",
    "officialApplicationUrl": "https://www.risefortheworld.org/apply",
    "destinationCountries": [
      "United States",
      "United Kingdom",
      "Global"
    ],
    "eligibleNationalities": [
      "Open Worldwide (All nationalities, regardless of geography or background)"
    ],
    "eligibleResidenceCountries": [
      "Global"
    ],
    "academicLevels": [
      "High School",
      "Undergraduate"
    ],
    "minAge": 15,
    "maxAge": 17,
    "eligibleGrades": [
      9,
      10,
      11,
      12
    ],
    "subjectRestrictions": [
      "All disciplines (Interdisciplinary project in science, humanities, community or arts)"
    ],
    "academicRequirements": [
      "Must be between 15 and 17 years old as of July 1 of entry year",
      "Complete an individual passion project addressing a pressing challenge in community or world"
    ],
    "meritOrNeedRequirements": [
      "Brilliance, empathy, integrity, and perseverance in serving others"
    ],
    "minGpa": null,
    "awardAmountAndCurrency": "Lifetime benefits: Full post-secondary university scholarship (tuition + stipend based on need) + global residential summit + mentoring",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Fully funded 3-week global summit (travel, room, board included), technology package (laptops/tablets), lifetime global network access, opportunity to apply for graduate scholarships",
    "programDuration": "Multi-year lifetime support through university and beyond",
    "openingDate": "2026-09-01",
    "deadline": "January 17, 2027",
    "deadlineDate": "2027-01-17",
    "requiredDocuments": [
      "Video responses and project introduction on Rise application app",
      "Individual project portfolio",
      "Peer reviews and assessments",
      "Finalist interview with global selection committee"
    ],
    "languageRequirements": [
      "Available in English and multiple regional languages"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "Rise Winners receive need-based financial support for university education, a fully funded residential summit, mentoring, and access to funding to solve global problems over their lifetimes.",
    "lastVerifiedTimestamp": "2026-10-08T15:00:00Z",
    "dataProvenance": "Rise for the World official initiative charter",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-ox-rhodes",
    "createdAt": "2026-09-01T00:00:00Z",
    "updatedAt": "2026-10-08T15:00:00Z",
    "tags": [
      "Rise",
      "Youth",
      "High School",
      "Rhodes Trust",
      "Schmidt Futures",
      "Full Ride",
      "Undergraduate"
    ],
    "organizer": "Schmidt Futures & The Rhodes Trust",
    "officialUrl": "https://www.risefortheworld.org/",
    "category": "STEM Pre-College",
    "badge": "Lifetime Global Youth Talent Program",
    "summary": "An initiative of Schmidt Futures and the Rhodes Trust that finds brilliant people who need opportunity and supports them for life as they work to serve others, starting at ages 15\u201317.",
    "description": "Each year, 100 Global Winners receive individualized lifetime support including need-based university scholarships, mentorship, tech packages, and a global residential summit.",
    "location": "Global / Host university worldwide",
    "format": "In-person",
    "dates": "Lifetime cohort starting 2027",
    "duration": "Multi-Year / Lifetime",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Need-based full tuition university scholarship + global residential summit + mentoring",
    "funding": {
      "tuitionUsd": 40000,
      "accommodationUsd": 12000,
      "mealsUsd": 6000,
      "travelUsd": 2000,
      "visaInsuranceUsd": 1000,
      "stipendUsd": 10000,
      "otherUsd": 2000,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Comprehensive need-based post-secondary university funding",
      "fundingTypeNote": "100% tuition and living costs funded during undergraduate studies based on financial need, plus lifetime grants.",
      "financialExclusions": [
        "Non-educational spending"
      ]
    },
    "requirementsList": [
      {
        "id": "rise-age",
        "category": "age",
        "label": "Age 15 to 17",
        "ruleDescription": "Must be aged 15 to 17 at application deadline.",
        "officialSourceQuote": "Applicants must be between the ages of 15 and 17 as of July 1.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-08",
    "sourceType": "Foundation Portal",
    "sourceUrl": "https://www.risefortheworld.org/"
  },
  {
    "id": "sch-mexico-amexcid",
    "title": "Mexican Government Excellence Scholarship for Foreigners",
    "provider": "AMEXCID / Mexican Ministry of Foreign Affairs (SRE)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://www.gob.mx/amexcid/acciones-y-programas/becas-para-extranjeros-29785",
    "officialApplicationUrl": "https://sigca.sre.gob.mx/",
    "destinationCountries": [
      "Mexico"
    ],
    "eligibleNationalities": [
      "Citizens of 180+ eligible partner nations across the Americas, Europe, Asia, Africa, and Pacific"
    ],
    "eligibleResidenceCountries": [
      "Non-Mexican nationality"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD",
      "Postdoctoral & Research"
    ],
    "minAge": 18,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All academic areas available at participating Mexican higher education institutions (UNAM, IPN, Tec de Monterrey, Colmex)"
    ],
    "academicRequirements": [
      "Minimum grade point average of 8.5 on a scale of 0 to 10 (or equivalent GPA 3.4/4.0)",
      "Direct acceptance letter from a participating Mexican higher education institution"
    ],
    "meritOrNeedRequirements": [
      "Academic excellence and research contribution"
    ],
    "minGpa": 3.4,
    "awardAmountAndCurrency": "Full tuition waiver + monthly stipend (approx. 4x or 5x UMA / ~13,000\u201316,000 MXN) + national health insurance + flight",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full tuition waiver at participating public institutions, IMSS medical insurance, round-trip international flight",
    "programDuration": "1 to 4 Years",
    "openingDate": "2026-05-15",
    "deadline": "July 24, 2026",
    "deadlineDate": "2026-07-24",
    "requiredDocuments": [
      "SIGCA application form with photograph",
      "Letter of acceptance from the Mexican university",
      "Copy of bachelor's/master's degree certificate and grade transcript with minimum 8.5/10",
      "Curriculum vitae (maximum 3 pages)",
      "Motivation letter and academic research proposal"
    ],
    "languageRequirements": [
      "Spanish proficiency (DELE B2 or institutional language certificate)"
    ],
    "sourceLanguage": "Spanish",
    "extractedEvidence": "The scholarship includes full tuition fee exemption at participating public institutions, a monthly maintenance stipend of 4 or 5 times the UMA value, international transportation at the beginning and end of the scholarship, and medical insurance coverage through the IMSS.",
    "lastVerifiedTimestamp": "2026-09-20T14:00:00Z",
    "dataProvenance": "AMEXCID Ministry of Foreign Affairs official decree",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-mx-amexcid",
    "createdAt": "2026-05-15T00:00:00Z",
    "updatedAt": "2026-09-20T14:00:00Z",
    "tags": [
      "Mexico",
      "AMEXCID",
      "UNAM",
      "Latin America",
      "Masters",
      "PhD",
      "Full Ride"
    ],
    "organizer": "AMEXCID / Mexican Ministry of Foreign Affairs",
    "officialUrl": "https://www.gob.mx/amexcid/",
    "category": "Graduate Fellowship",
    "badge": "100% Full Mexican Government Award",
    "summary": "State-funded scholarship program offered by the Mexican Ministry of Foreign Affairs to foreign students to study undergraduate, Master\u2019s, PhD, and research programs in Mexico.",
    "description": "Strengthens bilateral cultural and scientific ties by sponsoring international researchers and students across more than 70 Mexican universities.",
    "location": "Mexico (UNAM, Tec de Monterrey, El Colegio de M\u00e9xico, IPN, UAM)",
    "format": "In-person",
    "dates": "August 2027 \u2013 July 2029",
    "duration": "1 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition + monthly stipend (~13,000\u201316,000 MXN) + flights + IMSS medical insurance",
    "funding": {
      "tuitionUsd": 4000,
      "accommodationUsd": 4500,
      "mealsUsd": 3000,
      "travelUsd": 1200,
      "visaInsuranceUsd": 500,
      "stipendUsd": 9000,
      "otherUsd": 600,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly maintenance stipend approx. 13,500 to 16,800 MXN/month",
      "fundingTypeNote": "100% tuition, monthly stipend, IMSS health insurance, and international flights provided.",
      "financialExclusions": [
        "Visa legalization and apostille fees in home country"
      ]
    },
    "requirementsList": [
      {
        "id": "mx-gpa",
        "category": "academics",
        "label": "Minimum 8.5/10 GPA",
        "ruleDescription": "Minimum cumulative GPA of 8.5 on 10-point scale required.",
        "officialSourceQuote": "Minimum grade point average of 8.5 on a scale of 0 to 10 or its equivalent.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-20",
    "sourceType": "Government Ministry Portal",
    "sourceUrl": "https://www.gob.mx/amexcid/acciones-y-programas/becas-para-extranjeros-29785"
  },
  {
    "id": "sch-ireland-goi-ies",
    "title": "Government of Ireland International Education Scholarships (GOI-IES)",
    "provider": "Higher Education Authority (HEA Ireland)",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://hea.ie/policy/internationalisation/government-of-ireland-international-education-scholarships/",
    "officialApplicationUrl": "https://web.hea.ie/internationalisation/",
    "destinationCountries": [
      "Ireland"
    ],
    "eligibleNationalities": [
      "Non-EU/EEA international students"
    ],
    "eligibleResidenceCountries": [
      "Non-EU/EEA countries"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": 18,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "All disciplines offered at eligible Irish higher education institutions"
    ],
    "academicRequirements": [
      "Offer of a place at an eligible Irish higher education institution",
      "Outstanding academic record and leadership potential"
    ],
    "meritOrNeedRequirements": [
      "Ambition to act as ambassadors for Ireland and academic excellence"
    ],
    "minGpa": 3.6,
    "awardAmountAndCurrency": "Full tuition fee waiver + \u20ac10,000 stipend for one study year",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Full tuition fee waiver granted directly by the Irish institution + \u20ac10,000 direct student stipend",
    "programDuration": "1 Year (Full-time)",
    "openingDate": "2026-01-20",
    "deadline": "March 24, 2026",
    "deadlineDate": "2026-03-24",
    "requiredDocuments": [
      "HEA online portal application",
      "Offer letter from an eligible Irish higher education institution",
      "Academic transcripts and degree certificates",
      "Two letters of recommendation",
      "Personal statement on academic excellence and future contribution"
    ],
    "languageRequirements": [
      "English proficiency meeting Irish institution cutoff"
    ],
    "sourceLanguage": "English",
    "extractedEvidence": "The scholarship provides a 10,000 euro stipend for one study year, and a full tuition fee waiver for that study year at the higher education institution.",
    "lastVerifiedTimestamp": "2026-10-01T12:00:00Z",
    "dataProvenance": "Higher Education Authority Ireland ministerial guidelines",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-ie-goi-ies",
    "createdAt": "2026-01-20T00:00:00Z",
    "updatedAt": "2026-10-01T12:00:00Z",
    "tags": [
      "Ireland",
      "GOI-IES",
      "HEA",
      "Masters",
      "PhD",
      "Tuition Waiver",
      "Government"
    ],
    "organizer": "Higher Education Authority (HEA Ireland)",
    "officialUrl": "https://hea.ie/",
    "category": "Master's Fellowship",
    "badge": "100% Tuition Waiver + \u20ac10,000 Living Stipend",
    "summary": "Awarded by the Government of Ireland to 60 high-calibre students from non-EU/EEA countries for one year of full-time master\u2019s or doctoral study.",
    "description": "Provides full tuition waiver and \u20ac10,000 stipend, positioning scholars as international ambassadors for higher education in Ireland.",
    "location": "Ireland (Trinity College Dublin, UCD, University of Galway, UCC, DCU, UL)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2028",
    "duration": "1 Year",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "100% tuition waiver + \u20ac10,000 stipend for one study year",
    "funding": {
      "tuitionUsd": 24000,
      "accommodationUsd": 10000,
      "mealsUsd": 4500,
      "travelUsd": 0,
      "visaInsuranceUsd": 500,
      "stipendUsd": 11000,
      "otherUsd": 800,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": false,
      "visaInsuranceCovered": false,
      "stipendAmount": "\u20ac10,000 living stipend paid in installments",
      "fundingTypeNote": "100% tuition fee waiver plus \u20ac10,000 stipend. Travel airfare is covered by student.",
      "financialExclusions": [
        "Travel flights to Ireland",
        "Visa application processing fee"
      ]
    },
    "requirementsList": [
      {
        "id": "goi-nat",
        "category": "nationality",
        "label": "Non-EU/EEA Citizenship",
        "ruleDescription": "Applicant must be a national of a non-EU/EEA country.",
        "officialSourceQuote": "Candidates must be domiciled in a non-EU/EEA country.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-10-01",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://hea.ie/policy/internationalisation/government-of-ireland-international-education-scholarships/"
  },
  {
    "id": "sch-hungary-stipendium",
    "title": "Stipendium Hungaricum Scholarship Programme",
    "provider": "Tempus Public Foundation / Hungarian Ministry of Foreign Affairs and Trade",
    "providerType": "Government Ministry",
    "officialProgramUrl": "https://stipendiumhungaricum.hu/",
    "officialApplicationUrl": "https://apply.stipendiumhungaricum.hu/",
    "destinationCountries": [
      "Hungary"
    ],
    "eligibleNationalities": [
      "Citizens of 90+ sending partner countries across Africa, Asia, Americas, Europe"
    ],
    "eligibleResidenceCountries": [
      "Resident in sending partner country"
    ],
    "academicLevels": [
      "Undergraduate",
      "Master's",
      "Doctoral / PhD"
    ],
    "minAge": 18,
    "maxAge": null,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Full degree programs in all fields of study according to bilateral educational agreements"
    ],
    "academicRequirements": [
      "Appropriate secondary school graduation or bachelor's/master's degree",
      "Nomination by sending partner authority in home country"
    ],
    "meritOrNeedRequirements": [
      "Academic excellence and partner country nomination"
    ],
    "minGpa": 3.0,
    "awardAmountAndCurrency": "Tuition-free education + monthly stipend (43,700 HUF master's / 140,000 HUF PhD) + free dormitory + health insurance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Provided Dormitory",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "None",
    "stipendAndOtherBenefits": "Free university dormitory place or 40,000 HUF/month housing contribution; Hungarian health insurance",
    "programDuration": "2 to 4 Years",
    "openingDate": "2026-11-15",
    "deadline": "January 15, 2027",
    "deadlineDate": "2027-01-15",
    "requiredDocuments": [
      "Online application on DreamApply portal",
      "Proof of language proficiency in English or Hungarian",
      "School certificates and academic transcripts",
      "Medical certificate",
      "Motivation letter and portfolio/research plan"
    ],
    "languageRequirements": [
      "English or Hungarian depending on course language"
    ],
    "sourceLanguage": "Hungarian / English",
    "extractedEvidence": "The scholarship covers: tuition-free education, monthly stipend (43,700 HUF for master, 140,000 HUF for doctoral), free dormitory placement or 40,000 HUF/month housing contribution, and medical insurance.",
    "lastVerifiedTimestamp": "2026-09-18T10:00:00Z",
    "dataProvenance": "Tempus Public Foundation Hungarian government decree",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-hu-stipendium",
    "createdAt": "2026-11-15T00:00:00Z",
    "updatedAt": "2026-09-18T10:00:00Z",
    "tags": [
      "Hungary",
      "Stipendium Hungaricum",
      "Tempus",
      "Masters",
      "PhD",
      "Tuition Free",
      "Europe"
    ],
    "organizer": "Tempus Public Foundation",
    "officialUrl": "https://stipendiumhungaricum.hu/",
    "category": "Master's Fellowship",
    "badge": "100% Tuition-Free Hungarian State Award",
    "summary": "The most prestigious higher education scholarship in Hungary, offering tuition-free education, housing contribution, and health insurance to students from over 90 sending countries.",
    "description": "Established by the Hungarian Government to promote the internationalisation of Hungarian higher education and attract top international students.",
    "location": "Hungary (E\u00f6tv\u00f6s Lor\u00e1nd University, BME, University of Debrecen, Szeged, P\u00e9cs)",
    "format": "In-person",
    "dates": "September 2027 \u2013 June 2029",
    "duration": "2 to 4 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Tuition-free + dormitory accommodation + monthly stipend + health insurance",
    "funding": {
      "tuitionUsd": 8000,
      "accommodationUsd": 3500,
      "mealsUsd": 2500,
      "travelUsd": 0,
      "visaInsuranceUsd": 400,
      "stipendUsd": 2500,
      "otherUsd": 500,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": false,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living allowance (43,700 HUF/mo master, 140,000 HUF/mo PhD)",
      "fundingTypeNote": "100% tuition-free education, dormitory accommodation, health insurance, and modest living allowance.",
      "financialExclusions": [
        "Travel airfare to and from Hungary"
      ]
    },
    "requirementsList": [
      {
        "id": "stip-nom",
        "category": "nationality",
        "label": "Partner Country Nomination",
        "ruleDescription": "Must be nominated by the sending authority of home country.",
        "officialSourceQuote": "Applicants must be nominated by the responsible authority of their sending partner country.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-18",
    "sourceType": "Government Agency Portal",
    "sourceUrl": "https://stipendiumhungaricum.hu/"
  },
  {
    "id": "sch-opec-fund",
    "title": "OPEC Fund for International Development Scholarship",
    "provider": "OPEC Fund for International Development",
    "providerType": "Multilateral Organization",
    "officialProgramUrl": "https://opecfund.org/what-we-do/special-initiatives/scholarship-award",
    "officialApplicationUrl": "https://opecfund.org/what-we-do/special-initiatives/scholarship-award",
    "destinationCountries": [
      "United States",
      "United Kingdom",
      "France",
      "Germany",
      "Austria",
      "Canada"
    ],
    "eligibleNationalities": [
      "Nationals of developing countries (excluding OPEC Fund member countries)"
    ],
    "eligibleResidenceCountries": [
      "Resident in eligible developing country"
    ],
    "academicLevels": [
      "Master's"
    ],
    "minAge": 23,
    "maxAge": 32,
    "eligibleGrades": [],
    "subjectRestrictions": [
      "Development-related fields (Energy, Climate Change, Water, Sanitation, Food Security, Economics, Public Policy)"
    ],
    "academicRequirements": [
      "Completed undergraduate degree with a minimum cumulative GPA of 3.0 / 4.0",
      "Unconditional offer of admission to a relevant master's program at an accredited university"
    ],
    "meritOrNeedRequirements": [
      "Demonstrated commitment to sustainable development in home country"
    ],
    "minGpa": 3.3,
    "awardAmountAndCurrency": "Full tuition fees + monthly living allowance + economy airfare + book allowance + health insurance",
    "tuitionCoverage": "100% Full Tuition",
    "accommodationCoverage": "Housing Allowance",
    "mealCoverage": "Meal Allowance",
    "travelCoverage": "Return Flights Booked",
    "stipendAndOtherBenefits": "Full university tuition paid up to $50,000 USD, monthly living stipend, books and health insurance",
    "programDuration": "1 to 2 Years",
    "openingDate": "2026-06-01",
    "deadline": "September 25, 2026",
    "deadlineDate": "2026-09-25",
    "requiredDocuments": [
      "Online OPEC Fund application form",
      "Copy of passport",
      "Unconditional university admission offer letter",
      "Official academic transcripts and degree certificate",
      "Two letters of recommendation",
      "Short essay on sustainable development challenges"
    ],
    "languageRequirements": [
      "Meets host university language criteria"
    ],
    "sourceLanguage": "English / Arabic",
    "extractedEvidence": "The OPEC Fund Scholarship covers the full cost of tuition fees, monthly allowance to cover living expenses, accommodation, insurance, books, and round-trip economy airfare.",
    "lastVerifiedTimestamp": "2026-09-10T11:00:00Z",
    "dataProvenance": "OPEC Fund for International Development special initiatives portal",
    "verificationStatus": "Officially Verified",
    "isDemonstration": false,
    "sourceRegistryId": "src-opec-fund",
    "createdAt": "2026-06-01T00:00:00Z",
    "updatedAt": "2026-09-10T11:00:00Z",
    "tags": [
      "OPEC Fund",
      "Multilateral",
      "Development",
      "Masters",
      "Fully Funded",
      "Global"
    ],
    "organizer": "OPEC Fund for International Development",
    "officialUrl": "https://opecfund.org/",
    "category": "Master's Fellowship",
    "badge": "100% Full Multilateral Development Award",
    "summary": "Supports outstanding young people from developing countries to pursue graduate education in areas directly relevant to poverty alleviation and sustainable development.",
    "description": "Helps highly motivated students overcome financial barriers to complete Master\u2019s degree studies at top universities globally.",
    "location": "Global (Accredited universities in Europe, North America, etc.)",
    "format": "In-person",
    "dates": "September 2027 \u2013 August 2028",
    "duration": "1 to 2 Years",
    "fundingType": "100% Fully Funded",
    "fundingAmountPublished": "Full tuition fees up to $50,000 USD + monthly stipend + flights + health insurance",
    "funding": {
      "tuitionUsd": 35000,
      "accommodationUsd": 13000,
      "mealsUsd": 6000,
      "travelUsd": 1800,
      "visaInsuranceUsd": 900,
      "stipendUsd": 19000,
      "otherUsd": 1100,
      "isFullyFunded": true,
      "tuitionCovered": true,
      "accommodationCovered": true,
      "mealsCovered": true,
      "travelCovered": true,
      "visaInsuranceCovered": true,
      "stipendAmount": "Monthly living stipend covering accommodation and living costs",
      "fundingTypeNote": "100% tuition, monthly stipend, accommodation allowance, books, insurance, and flights.",
      "financialExclusions": [
        "Family member accompaniment costs"
      ]
    },
    "requirementsList": [
      {
        "id": "opec-age",
        "category": "age",
        "label": "Age 23 to 32",
        "ruleDescription": "Candidates must be between 23 and 32 years of age.",
        "officialSourceQuote": "Applicants must be between 23 and 32 years old at the time of application.",
        "isHardRequirement": true
      }
    ],
    "lastCheckedDate": "2026-09-10",
    "sourceType": "International Organization Portal",
    "sourceUrl": "https://opecfund.org/what-we-do/special-initiatives/scholarship-award"
  }
];