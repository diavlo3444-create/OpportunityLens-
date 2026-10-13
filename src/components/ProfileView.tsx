import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Save,
  Moon,
  Sun,
  Lock,
  Globe2,
  GraduationCap,
} from 'lucide-react';
import { StudentProfile, AcademicLevel } from '../types';
import { calculateProfileCompletion, INITIAL_STUDENT_PROFILE } from '../utils/storage';

interface ProfileViewProps {
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenOnboarding: () => void;
}

const ACADEMIC_LEVELS: AcademicLevel[] = [
  'High School',
  'Undergraduate',
  "Master's",
  'Doctoral / PhD',
  'Postdoctoral & Research',
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onSaveProfile,
  isDarkMode,
  toggleDarkMode,
  onOpenOnboarding,
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const completionPct = calculateProfileCompletion(formData);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetToDemo = () => {
    if (window.confirm('Reset profile to default demonstration profile (Alex Rivera)?')) {
      setFormData(INITIAL_STUDENT_PROFILE);
      onSaveProfile(INITIAL_STUDENT_PROFILE);
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `opportunitylens_profile_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <h1 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-neutral-900 dark:text-white">
            Profile & Criteria Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Control your academic standing, citizenship credentials, and funding constraints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenOnboarding}
            className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 transition cursor-pointer"
          >
            Launch Wizard
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Completion Meter Card */}
      <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brass dark:text-brass-lt">
              Deterministic Verification Readiness
            </span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Your profile is {completionPct}% complete for criteria audit
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md">
            The more precise your academic parameters and legal statuses, the fewer ambiguous warning flags the engine generates.
          </p>
        </div>

        <div className="w-24 h-24 rounded-full border-4 border-brass dark:border-brass-lt flex items-center justify-center text-xl font-bold text-neutral-900 dark:text-white shrink-0 bg-brass-tint dark:bg-brass-lt/10">
          {completionPct}%
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs p-6 sm:p-8 space-y-6">
          <h3 className="font-bold text-base text-neutral-900 dark:text-white pb-3 border-b border-black/[0.04] dark:border-white/[0.04]">
            Academic Identity & Degree Level
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-brass dark:focus:ring-brass-lt"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Target Study Degree Level
              </label>
              <select
                value={formData.academicLevel}
                onChange={(e: any) =>
                  setFormData({ ...formData, academicLevel: e.target.value as AcademicLevel })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-brass dark:focus:ring-brass-lt"
              >
                {ACADEMIC_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-brass dark:focus:ring-brass-lt"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Cumulative GPA (out of 4.0)
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-brass dark:focus:ring-brass-lt"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Field of Study / Academic Discipline
              </label>
              <input
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                placeholder="e.g. Public Policy, Computer Science, Renewable Energy"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-brass dark:focus:ring-brass-lt"
              />
            </div>
          </div>

          <h3 className="font-bold text-base text-neutral-900 dark:text-white pt-4 pb-3 border-b border-black/[0.04] dark:border-white/[0.04]">
            Geography & Citizenship
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Country of Residence
              </label>
              <input
                type="text"
                value={formData.countryOfResidence}
                onChange={(e) =>
                  setFormData({ ...formData, countryOfResidence: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Target Study Destinations
              </label>
              <input
                type="text"
                value={formData.intendedDestinationCountries.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    intendedDestinationCountries: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="e.g. United Kingdom, United States, Germany, Canada"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-sm text-neutral-900 dark:text-white"
              />
            </div>
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
                className="mt-0.5 rounded text-brass focus:ring-brass"
              />
              <span>
                I qualify for socioeconomic financial need (enables priority filtering for need-based full awards)
              </span>
            </label>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-ink hover:bg-ink-soft dark:bg-paper dark:text-ink dark:hover:bg-neutral-200 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>

              {saveSuccess && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 size={14} />
                  <span>Profile updated & matches recalculated!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="px-3.5 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition flex items-center gap-1 cursor-pointer"
              >
                <Download size={13} />
                <span>Export Profile JSON</span>
              </button>

              <button
                type="button"
                onClick={handleResetToDemo}
                className="px-3.5 py-2 rounded-xl text-neutral-500 hover:text-neutral-800 text-xs font-medium transition cursor-pointer"
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/[0.04] dark:border-white/[0.06] space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
          <Lock size={15} className="text-brass dark:text-brass-lt" />
          <span>Local Storage & Zero Telemetry Assurance</span>
        </div>
        <p className="leading-relaxed">
          OpportunityLens operates completely locally on your machine with 0 external tracking and 0 runtime LLM calls. No personal information is transmitted to third parties.
        </p>
      </div>
    </div>
  );
};
