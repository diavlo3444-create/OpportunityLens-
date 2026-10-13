import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  Shield,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  GraduationCap,
  Globe2,
  BookOpen,
  Info,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { StudentProfile, AcademicLevel } from '../types';
import { calculateProfileCompletion, INITIAL_STUDENT_PROFILE } from '../utils/storage';
import { AnimatedCounter } from './UiKit';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
}

const ACADEMIC_LEVELS: AcademicLevel[] = [
  'High School',
  'Undergraduate',
  "Master's",
  'Doctoral / PhD',
  'Postdoctoral & Research',
];

const CURRICULUM_OPTIONS = [
  'International Baccalaureate (IB)',
  'Advanced Placement (AP)',
  'Cambridge A-Levels',
  'National High School Diploma',
  'Undergraduate University Degree',
  'Postgraduate / Master’s Degree',
  'Other / Equivalent',
];

const GRADING_SCALES = [
  '4.0 Scale (US / International standard)',
  '100% Percentage Scale',
  '5.0 Scale',
  'UK Honours Classification (First / 2:1)',
  'German 1.0–5.0 Scale (1.0 best)',
];

const COMMON_COUNTRIES = [
  'Nigeria',
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'Kenya',
  'Ghana',
  'Pakistan',
  'Brazil',
  'France',
  'Indonesia',
  'Japan',
  'South Africa',
];

const COMMON_DESTINATIONS = [
  'United Kingdom',
  'United States',
  'Germany',
  'Canada',
  'Japan',
  'France',
  'Australia',
  'Switzerland',
  'China',
  'Global / Online',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<StudentProfile>(() => ({
    ...profile,
    graduationYear: profile.graduationYear || new Date().getFullYear() + 1,
    curriculum: profile.curriculum || 'International Baccalaureate (IB)',
    gradingScale: profile.gradingScale || '4.0 Scale (US / International standard)',
  }));

  const [customNat, setCustomNat] = useState('');
  const [customDest, setCustomDest] = useState('');

  if (!isOpen) return null;

  const currentCompletion = calculateProfileCompletion(formData);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const completed = { ...formData, onboardingCompleted: true };
      onSaveProfile(completed);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleLoadSample = () => {
    const sample = { ...INITIAL_STUDENT_PROFILE, onboardingCompleted: true };
    setFormData(sample);
    onSaveProfile(sample);
    onClose();
  };

  const toggleNationality = (country: string) => {
    const list = formData.nationalities || [];
    if (list.includes(country)) {
      setFormData({
        ...formData,
        nationalities: list.filter((c) => c !== country),
      });
    } else {
      setFormData({
        ...formData,
        nationalities: [...list, country],
        countryOfResidence: formData.countryOfResidence || country,
      });
    }
  };

  const addCustomNationality = () => {
    if (customNat.trim() && !formData.nationalities.includes(customNat.trim())) {
      setFormData({
        ...formData,
        nationalities: [...formData.nationalities, customNat.trim()],
        countryOfResidence: formData.countryOfResidence || customNat.trim(),
      });
      setCustomNat('');
    }
  };

  const toggleDestination = (dest: string) => {
    const list = formData.intendedDestinationCountries || [];
    if (list.includes(dest)) {
      setFormData({
        ...formData,
        intendedDestinationCountries: list.filter((d) => d !== dest),
      });
    } else {
      setFormData({
        ...formData,
        intendedDestinationCountries: [...list, dest],
      });
    }
  };

  const addCustomDestination = () => {
    if (customDest.trim() && !formData.intendedDestinationCountries.includes(customDest.trim())) {
      setFormData({
        ...formData,
        intendedDestinationCountries: [...formData.intendedDestinationCountries, customDest.trim()],
      });
      setCustomDest('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold px-2.5 py-0.5 rounded-md bg-brass/10 text-brass-strong dark:text-brass-lt">
                Step {step} of {totalSteps}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400">
                Profile Readiness: <strong className="font-semibold text-neutral-800 dark:text-neutral-200"><AnimatedCounter value={currentCompletion} />%</strong>
              </span>
            </div>
            <h2 id="onboarding-title" className="font-display text-xl font-bold text-neutral-900 dark:text-white mt-1.5">
              {step === 1 && 'Citizenship & Education Standing'}
              {step === 2 && 'Academic Metrics & Study Field'}
              {step === 3 && 'Target Destinations & Degree Goals'}
              {step === 4 && 'Funding Coverage & Financial Support'}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close profile setup"
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer active:scale-90"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step indicator rail */}
        <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full bg-brass dark:bg-brass-lt transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Body Form */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* STEP 1: Citizenship, Education Level, Graduation Year, Curriculum */}
              {step === 1 && (
                <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] text-neutral-600 dark:text-neutral-400 flex items-start gap-2.5 leading-relaxed">
                <Shield size={16} className="text-brass dark:text-brass-lt shrink-0 mt-0.5" />
                <span>
                  Government bilateral scholarships (e.g., Chevening, Fulbright, DAAD) operate under statutory decrees that require verified citizenship and enrollment standing. Your data remains stored locally in your browser.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Full Name or Profile Identifier
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    Target Academic Level
                  </label>
                  <select
                    value={formData.academicLevel}
                    onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value as AcademicLevel })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  >
                    {ACADEMIC_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    Graduation / Entry Year
                  </label>
                  <input
                    type="number"
                    min="2020"
                    max="2035"
                    value={formData.graduationYear || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        graduationYear: e.target.value ? parseInt(e.target.value, 10) : null,
                      })
                    }
                    placeholder="e.g. 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Current School Curriculum / Prior Qualification
                </label>
                <select
                  value={formData.curriculum || CURRICULUM_OPTIONS[0]}
                  onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                >
                  {CURRICULUM_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nationalities selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Citizenship / Passport Country (select all that apply)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {COMMON_COUNTRIES.map((c) => {
                    const selected = formData.nationalities?.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleNationality(c)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                          selected
                            ? 'bg-ink text-paper dark:bg-paper dark:text-ink shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {selected ? `✓ ${c}` : c}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customNat}
                    onChange={(e) => setCustomNat(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomNationality())}
                    placeholder="Or type country (e.g. Kenya, Colombia) and press Add"
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  />
                  <button
                    type="button"
                    onClick={addCustomNationality}
                    className="px-3.5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Current Country of Residence
                </label>
                <input
                  type="text"
                  value={formData.countryOfResidence}
                  onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                  placeholder="e.g. Nigeria, Germany, United States"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                />
              </div>
            </div>
          )}

          {/* STEP 2: GPA, Grading Scale, Field of Study, Standardized Tests */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    Cumulative GPA or Academic Average
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.gpa ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gpa: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    placeholder="e.g. 3.85 (on 4.0 scale)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    Grading Scale
                  </label>
                  <select
                    value={formData.gradingScale || GRADING_SCALES[0]}
                    onChange={(e) => setFormData({ ...formData, gradingScale: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  >
                    {GRADING_SCALES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Intended Major / Study Field
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Computer Science, Public Policy, Renewable Energy Economics"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Used to evaluate subject eligibility benchmarks across multidisciplinary and specialist bursaries.
                </p>
              </div>

              {/* Standardized Tests (Optional) */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Standardized Test Scores (Optional)
                  </span>
                  <span className="text-[11px] text-neutral-400">Leave blank if not applicable</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">SAT Score</label>
                    <input
                      type="number"
                      min="400"
                      max="1600"
                      value={formData.standardizedTests?.sat || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          standardizedTests: {
                            ...formData.standardizedTests,
                            sat: e.target.value ? parseInt(e.target.value, 10) : undefined,
                          },
                        })
                      }
                      placeholder="e.g. 1480"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">ACT Score</label>
                    <input
                      type="number"
                      min="1"
                      max="36"
                      value={formData.standardizedTests?.act || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          standardizedTests: {
                            ...formData.standardizedTests,
                            act: e.target.value ? parseInt(e.target.value, 10) : undefined,
                          },
                        })
                      }
                      placeholder="e.g. 33"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">GRE Score</label>
                    <input
                      type="number"
                      min="260"
                      max="340"
                      value={formData.standardizedTests?.gre || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          standardizedTests: {
                            ...formData.standardizedTests,
                            gre: e.target.value ? parseInt(e.target.value, 10) : undefined,
                          },
                        })
                      }
                      placeholder="e.g. 325"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="toefl-check"
                    checked={Boolean(formData.standardizedTests?.toeflIelts)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        standardizedTests: {
                          ...formData.standardizedTests,
                          toeflIelts: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-neutral-300 text-brass focus:ring-brass"
                  />
                  <label htmlFor="toefl-check" className="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                    Have English proficiency certification (TOEFL / IELTS / Cambridge English)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Target Destinations & Degree Goals */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Preferred Study Destinations (select one or more)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {COMMON_DESTINATIONS.map((d) => {
                    const selected = formData.intendedDestinationCountries?.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDestination(d)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                          selected
                            ? 'bg-ink text-paper dark:bg-paper dark:text-ink shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {selected ? `✓ ${d}` : d}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customDest}
                    onChange={(e) => setCustomDest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomDestination())}
                    placeholder="Add other country (e.g. Netherlands, Singapore)"
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  />
                  <button
                    type="button"
                    onClick={addCustomDestination}
                    className="px-3.5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Current Age (Optional, for programs with statutory age limits)
                </label>
                <input
                  type="number"
                  min="14"
                  max="70"
                  value={formData.age || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: e.target.value ? parseInt(e.target.value, 10) : null,
                    })
                  }
                  placeholder="e.g. 21"
                  className="w-full sm:w-1/2 px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Financial Need & Coverage Requirements */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Demonstrated Financial Need
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Some awards are reserved strictly for students requiring financial sponsorship.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.hasFinancialNeed)}
                    onChange={(e) => setFormData({ ...formData, hasFinancialNeed: e.target.checked })}
                    className="h-4 w-4 rounded border-neutral-300 text-brass focus:ring-brass cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Essential Funding Elements Required
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { key: 'needsTuition', label: '100% Tuition Coverage' },
                    { key: 'needsAccommodation', label: 'Housing / Dormitory' },
                    { key: 'needsMeals', label: 'Living Allowance / Meals' },
                    { key: 'needsTravel', label: 'Airfare / Return Flights' },
                  ].map((item) => {
                    const checked = (formData.fundingNeeds as any)?.[item.key] ?? false;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            fundingNeeds: {
                              ...formData.fundingNeeds,
                              [item.key]: !checked,
                            },
                          })
                        }
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                          checked
                            ? 'bg-brass/10 border-brass/30 text-brass-strong dark:text-brass-lt font-semibold'
                            : 'bg-white dark:bg-neutral-900 border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        {checked && <Check size={14} className="text-brass dark:text-brass-lt" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Maximum Personal Contribution Budget (USD / Year)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-neutral-400">$</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={formData.fundingNeeds?.maxBudgetUsd ?? 500}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fundingNeeds: {
                          ...formData.fundingNeeds,
                          maxBudgetUsd: e.target.value ? parseInt(e.target.value, 10) : 0,
                        },
                      })
                    }
                    className="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brass"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Used by the Funding Calculator to flag out-of-pocket tuition gaps.
                </p>
              </div>
            </div>
          )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-5 border-t border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/60 dark:bg-neutral-950/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-3 py-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-150 active:scale-95 cursor-pointer"
                title="Populate sample profile to explore immediately"
              >
                Load Sample Student Profile
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-ink text-paper dark:bg-paper dark:text-ink font-semibold hover:bg-ink-soft dark:hover:bg-neutral-200 transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{step === totalSteps ? 'Calculate My Matches' : 'Continue'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
