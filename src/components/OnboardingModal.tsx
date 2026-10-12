import React, { useState } from 'react';
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
} from 'lucide-react';
import { StudentProfile, AcademicLevel, ScholarshipFundingType } from '../types';
import { calculateProfileCompletion } from '../utils/storage';

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

  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [customDestination, setCustomDestination] = useState('');

  if (!isOpen) return null;

  const currentCompletion = calculateProfileCompletion(formData);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const completedProfile = { ...formData, onboardingCompleted: true };
      onSaveProfile(completedProfile);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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
    if (customDestination.trim() && !formData.intendedDestinationCountries.includes(customDestination.trim())) {
      setFormData({
        ...formData,
        intendedDestinationCountries: [...formData.intendedDestinationCountries, customDestination.trim()],
      });
      setCustomDestination('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                Step {step} of {totalSteps}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Criteria Match Readiness: <strong className="font-semibold text-neutral-800 dark:text-neutral-200">{currentCompletion}%</strong>
              </span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
              {step === 1 && 'Degree Level & Academic Identity'}
              {step === 2 && 'Citizenship & Legal Residence'}
              {step === 3 && 'Funding & Budget Requirements'}
              {step === 4 && 'Target Countries & Study Discipline'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Academic Standing & Level */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950/50 border border-black/[0.04] dark:border-white/[0.04] text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-2.5">
                <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Global scholarships strictly segregate by study level (e.g. Master’s fellowship vs Undergraduate grant). Setting your exact level eliminates irrelevant awards.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Full Name or Profile Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Target Academic Level
                  </label>
                  <select
                    value={formData.academicLevel}
                    onChange={(e: any) =>
                      setFormData({ ...formData, academicLevel: e.target.value as AcademicLevel })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ACADEMIC_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Current Age
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="65"
                    value={formData.age ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: e.target.value ? parseInt(e.target.value, 10) : null,
                      })
                    }
                    placeholder="e.g. 22"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Cumulative GPA (4.0 Scale or Equivalent)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1.0"
                    max="4.0"
                    value={formData.gpa ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gpa: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    placeholder="e.g. 3.85"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Field of Study / Discipline
                  </label>
                  <input
                    type="text"
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    placeholder="e.g. Public Policy, Computer Science, Economics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Citizenship & Legal Eligibility */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/40 dark:border-blue-900/40 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5">
                <Shield size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-blue-900 dark:text-blue-300">Authoritative Bilateral Rules:</strong>{' '}
                  Government scholarships (e.g. Chevening, Fulbright, DAAD) operate under bilateral treaties and only accept citizens of specific partner countries.
                  All entries are stored strictly in your browser’s localStorage.
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Country of Current Residence
                </label>
                <input
                  type="text"
                  value={formData.countryOfResidence}
                  onChange={(e) =>
                    setFormData({ ...formData, countryOfResidence: e.target.value })
                  }
                  placeholder="e.g. Nigeria, India, United States, Kenya, Brazil"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Citizenship / Passports Held
                </label>
                <input
                  type="text"
                  value={formData.nationalities.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nationalities: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="e.g. Nigeria, United Kingdom, Mexico"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Separate multiple citizenships with commas.
                </p>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasFinancialNeed === true}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hasFinancialNeed: e.target.checked ? true : null,
                      })
                    }
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I require need-based funding support (enables filtering for low-income priority awards).
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Funding & Budget Requirements */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950/50 border border-black/[0.04] dark:border-white/[0.04] text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-2.5">
                <DollarSign size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Many scholarships cover only tuition while leaving living expenses to the student. Specify what costs you require covered.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Expenses You Require Covered:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.06] text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.fundingNeeds?.needsTuition ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fundingNeeds: {
                            ...formData.fundingNeeds,
                            needsTuition: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>100% Tuition Fees</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.06] text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.fundingNeeds?.needsAccommodation ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fundingNeeds: {
                            ...formData.fundingNeeds,
                            needsAccommodation: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Housing / Dormitory</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.06] text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.fundingNeeds?.needsMeals ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fundingNeeds: {
                            ...formData.fundingNeeds,
                            needsMeals: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Living Allowance / Stipend</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.06] text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.fundingNeeds?.needsTravel ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fundingNeeds: {
                            ...formData.fundingNeeds,
                            needsTravel: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Return International Airfare</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Maximum Out-of-Pocket Budget (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-neutral-400 text-sm">$</span>
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
                          maxBudgetUsd: parseInt(e.target.value, 10) || 0,
                        },
                      })
                    }
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Target Destination Countries */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Target Destination Countries:
                </label>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {COMMON_DESTINATIONS.map((dest) => {
                    const isSelected = (formData.intendedDestinationCountries || []).includes(dest);
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => toggleDestination(dest)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {dest}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    placeholder="Add custom country (e.g. Netherlands, Sweden)"
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addCustomDestination}
                    className="px-3 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-neutral-950/40 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800"
              >
                Skip for now
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{step === totalSteps ? 'Save Profile' : 'Continue'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
