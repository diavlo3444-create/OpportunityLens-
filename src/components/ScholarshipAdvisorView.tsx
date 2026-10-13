import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Send,
  HelpCircle,
  ShieldCheck,
  Database,
  ArrowRight,
  Bookmark,
  Layers,
  ChevronDown,
  Info,
  Calendar,
  AlertCircle,
  FileText,
} from 'lucide-react';
import {
  Scholarship,
  StudentProfile,
  AdvisorResponse,
} from '../types';
import {
  requestScholarshipAdvice,
  buildAdvisorCacheKey,
  getCachedAdvice,
  clearAdvisorCache,
  getAdvisorHealth,
  AdvisorRequestResult,
} from '../utils/advisorService';
import {
  PRE_GENERATED_DEMO_QUESTIONS,
  getPreGeneratedDemoResponse,
} from '../data/advisorDemoAnswers';

interface ScholarshipAdvisorViewProps {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  selectedScholarshipId?: string;
  onSelectScholarshipId: (id: string) => void;
  onTrackScholarship: (schId: string) => void;
  isScholarshipTracked: (schId: string) => boolean;
  onOpenProfile: () => void;
}

export const ScholarshipAdvisorView: React.FC<ScholarshipAdvisorViewProps> = ({
  scholarships,
  studentProfile,
  selectedScholarshipId,
  onSelectScholarshipId,
  onTrackScholarship,
  isScholarshipTracked,
  onOpenProfile,
}) => {
  // Current active scholarship
  const activeScholarship = useMemo(() => {
    return scholarships.find((s) => s.id === selectedScholarshipId) || scholarships[0] || null;
  }, [scholarships, selectedScholarshipId]);

  // Demo Mode toggle state
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem('opportunitylens_advisor_demo_mode') === 'true';
  });

  // Server health state
  const [serverHealth, setServerHealth] = useState<{
    ok: boolean;
    hasApiKey: boolean;
    model: string;
    isAvailable: boolean;
    setupHint?: string;
  }>({
    ok: true,
    hasApiKey: true,
    model: 'gemini-2.5-flash',
    isAvailable: true,
  });

  // Interaction State
  const [questionInput, setQuestionInput] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<string>('');
  const [currentResponse, setCurrentResponse] = useState<AdvisorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorState, setErrorState] = useState<{
    message: string;
    errorCode?: AdvisorRequestResult['errorCode'];
    canUseDemoFallback?: boolean;
    failedQuestion?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync demo mode to localStorage
  const handleToggleDemoMode = (enabled: boolean) => {
    setIsDemoMode(enabled);
    localStorage.setItem('opportunitylens_advisor_demo_mode', enabled ? 'true' : 'false');
    // If there's an active error, clear it when entering demo mode
    if (enabled && errorState) {
      setErrorState(null);
    }
  };

  // Check server health on mount (passive status check only, NO AI call)
  useEffect(() => {
    getAdvisorHealth().then((health) => {
      setServerHealth(health);
    });
  }, []);

  // Check if current question & active scholarship has a cached response
  useEffect(() => {
    if (activeScholarship && activeQuestion) {
      const cacheKey = buildAdvisorCacheKey(activeQuestion, activeScholarship, studentProfile);
      const cached = getCachedAdvice(cacheKey);
      if (cached) {
        setCurrentResponse(cached);
        setErrorState(null);
      }
    }
  }, [activeScholarship, studentProfile, activeQuestion]);

  // Execute advice inquiry
  const handleAskAdvisor = async (questionToAsk: string, forceDemo: boolean = false) => {
    if (!questionToAsk.trim() || !activeScholarship) return;

    const trimmedQuestion = questionToAsk.trim();
    setActiveQuestion(trimmedQuestion);
    setErrorState(null);
    setIsLoading(true);

    const useDemo = forceDemo || isDemoMode;

    if (useDemo) {
      setLoadingStep('Consulting verified advisor archives (Demo Mode)...');
      await new Promise((r) => setTimeout(r, 450));
      const demoResponse = getPreGeneratedDemoResponse(trimmedQuestion, activeScholarship, studentProfile);
      setCurrentResponse(demoResponse);
      setIsLoading(false);
      return;
    }

    setLoadingStep('Checking local response cache...');
    await new Promise((r) => setTimeout(r, 200));

    // Check cache first
    const cacheKey = buildAdvisorCacheKey(trimmedQuestion, activeScholarship, studentProfile);
    const cached = getCachedAdvice(cacheKey);
    if (cached) {
      setCurrentResponse(cached);
      setIsLoading(false);
      return;
    }

    setLoadingStep('Extracting minimal scholarship decree & student profile payload...');
    await new Promise((r) => setTimeout(r, 250));

    setLoadingStep('Consulting live Gemini advisor (gemini-2.5-flash)...');

    const result = await requestScholarshipAdvice(
      trimmedQuestion,
      activeScholarship,
      studentProfile,
      false
    );

    setIsLoading(false);

    if (result.success && result.response) {
      setCurrentResponse(result.response);
      setErrorState(null);
    } else {
      setErrorState({
        message: result.error || 'Failed to reach AI advisor.',
        errorCode: result.errorCode,
        canUseDemoFallback: result.canUseDemoFallback !== false,
        failedQuestion: trimmedQuestion,
      });
    }
  };

  // Fallback to Demo Answer when Live AI fails
  const handleFallbackToDemo = () => {
    if (!activeScholarship) return;
    const q = errorState?.failedQuestion || activeQuestion || PRE_GENERATED_DEMO_QUESTIONS[0].question;
    const demoResponse = getPreGeneratedDemoResponse(q, activeScholarship, studentProfile);
    setCurrentResponse(demoResponse);
    setErrorState(null);
  };

  // Copy advice to clipboard
  const handleCopyAdvice = () => {
    if (!currentResponse) return;
    navigator.clipboard.writeText(currentResponse.advice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeScholarship) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-xs text-neutral-500">
        No scholarship opportunities available to evaluate.
      </div>
    );
  }

  const isTracked = isScholarshipTracked(activeScholarship.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header & Tactile Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Indicator */}
            {isDemoMode ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brass-tint dark:bg-brass-lt/15 text-brass-strong dark:text-brass-lt border border-brass/25 dark:border-brass-lt/25">
                <span className="w-1.5 h-1.5 rounded-full bg-brass dark:bg-brass-lt"></span>
                <span>Demo Mode (Zero API Usage)</span>
              </span>
            ) : serverHealth.isAvailable ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live AI Advisor ({serverHealth.model})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Live AI Offline (Demo Fallback Ready)</span>
              </span>
            )}

            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Deterministic Bylaws & Strategic Counsel
            </span>

            {!isDemoMode && serverHealth.ok && !serverHealth.hasApiKey && (
              <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                {serverHealth.setupHint ||
                  'Add GEMINI_API_KEY in Settings → Environment to enable Live AI.'}
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-neutral-900 dark:text-white mt-1 flex items-center gap-2">
            <span>Scholarship Advisor</span>
            <Sparkles size={22} className="text-brass dark:text-brass-lt" />
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Get concise, actionable strategy grounded strictly in verified scholarship decrees and your academic profile.
          </p>
        </div>

        {/* Demo Mode Toggle Switch */}
        <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 p-2 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs font-semibold text-neutral-900 dark:text-white">
              Demo Mode
            </div>
            <div className="text-[10px] text-neutral-500">
              {isDemoMode ? 'Zero API calls' : 'Live Gemini Flash'}
            </div>
          </div>

          <button
            onClick={() => handleToggleDemoMode(!isDemoMode)}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
              isDemoMode ? 'bg-ink dark:bg-paper justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
            }`}
            title="Toggle Demo Mode to test without making AI API calls"
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-xs"></span>
          </button>
        </div>
      </div>

      {/* Zero Paid Services & Privacy Banner */}
      <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/[0.04] dark:border-white/[0.06] text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-3">
        <Info size={16} className="text-brass dark:text-brass-lt shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-neutral-900 dark:text-white">
            Zero Paid Service Requirement & Minimal Payload Discipline:
          </strong>{' '}
          All scholarship discovery, database filtering, eligibility audits, funding calculations, and Demo Mode operate with zero external subscriptions. When Live AI is queried, only the relevant profile fields and the selected scholarship’s verified statutory record are transmitted. Advice is strictly constrained to ~200 words and cached locally.
        </div>
      </div>

      {/* Selected Opportunity & Student Profile Context Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Opportunity Selector (2 Cols) */}
        <div className="md:col-span-2 p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-semibold uppercase text-[10px] tracking-wider text-neutral-400">
              Target Opportunity Context
            </span>
            <span className="text-[11px] text-brass dark:text-brass-lt">
              {scholarships.length} Verified Programs Available
            </span>
          </div>

          <div className="relative">
            <select
              value={activeScholarship.id}
              onChange={(e) => onSelectScholarshipId(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none cursor-pointer pr-10"
            >
              {scholarships.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} — {s.provider} ({s.destinationCountries.join('/')})
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-3.5 text-neutral-400 pointer-events-none" />
          </div>

          {/* Key Facts of Selected Scholarship */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-neutral-400 block text-[10px]">Funding Model</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                {activeScholarship.fundingType}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-neutral-400 block text-[10px]">Tuition Support</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                {activeScholarship.tuitionCoverage}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-neutral-400 block text-[10px]">Application Deadline</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                {activeScholarship.deadline}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-neutral-400 block text-[10px]">Official Decree</span>
                <a
                  href={activeScholarship.officialProgramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brass dark:text-brass-lt hover:underline flex items-center gap-1"
                >
                  <span>Portal</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Student Profile Snapshot (1 Col) */}
        <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-semibold uppercase text-[10px] tracking-wider text-neutral-400">
                Active Student Profile
              </span>
              <button
                onClick={onOpenProfile}
                className="text-[11px] text-brass dark:text-brass-lt hover:underline font-medium cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-0.5 border-b border-black/[0.03] dark:border-white/[0.03]">
                <span className="text-neutral-500">Nationality:</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {studentProfile.nationalities?.[0] || studentProfile.countryOfResidence || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-black/[0.03] dark:border-white/[0.03]">
                <span className="text-neutral-500">Academic Level:</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {studentProfile.academicLevel}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-black/[0.03] dark:border-white/[0.03]">
                <span className="text-neutral-500">GPA / Scale:</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {typeof studentProfile.gpa === 'number' ? studentProfile.gpa.toFixed(2) : '3.80'} / 4.0
                </span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-neutral-500">Major:</span>
                <span className="font-medium text-neutral-900 dark:text-white truncate max-w-[120px]">
                  {studentProfile.fieldOfStudy || 'Undeclared'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
            <button
              onClick={() => onTrackScholarship(activeScholarship.id)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                isTracked
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              <Bookmark size={13} />
              <span>{isTracked ? 'Tracked in Applications' : 'Track in Application Tracker'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curated Strategic Inquiries */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            Select a Verified Strategic Inquiry:
          </span>
          <span className="text-[11px] text-neutral-400">
            Click to formulate instant advisor brief
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRE_GENERATED_DEMO_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestionInput(item.question);
                handleAskAdvisor(item.question);
              }}
              disabled={isLoading}
              className={`interactive-card p-3.5 rounded-2xl border text-left transition-all duration-150 active:scale-[0.99] cursor-pointer flex items-start gap-2.5 ${
                activeQuestion === item.question
                  ? 'bg-brass-tint dark:bg-brass-lt/10 border-brass/40 dark:border-brass-lt/30 text-brass-strong dark:text-brass-lt shadow-xs'
                  : 'bg-white dark:bg-neutral-900 border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-neutral-800 dark:text-neutral-200 shadow-xs'
              }`}
            >
              <div className="p-1 rounded-lg bg-brass-tint dark:bg-brass-lt/10 text-brass dark:text-brass-lt shrink-0 mt-0.5">
                <FileText size={13} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold leading-snug">{item.question}</div>
                <div className="text-[10px] text-neutral-400 mt-0.5 capitalize">
                  Category: {item.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Inquiry Input Area */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-3">
        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Or Ask a Custom Strategic Question:
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleAskAdvisor(questionInput);
              }
            }}
            placeholder="e.g. How should I structure my personal statement for the committee?"
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />

          <button
            onClick={() => handleAskAdvisor(questionInput)}
            disabled={!questionInput.trim() || isLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-ink hover:bg-ink-soft dark:bg-paper dark:text-ink dark:hover:bg-neutral-200 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Ask Advisor</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="p-8 rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <RefreshCw size={16} className="text-brass dark:text-brass-lt animate-spin" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {loadingStep || 'Evaluating criteria...'}
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-5/6"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-2/3"></div>
          </div>
        </div>
      )}

      {/* Error & Fallback Banner (Graceful handling of 429, 503, network, etc.) */}
      {errorState && !isLoading && (
        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200">
                {errorState.errorCode === 'CONFIG_MISSING'
                  ? 'Live AI Not Configured'
                  : 'Live AI Service Offline or Rate Limited'}
              </h4>
              <p className="text-amber-800 dark:text-amber-300 mt-0.5 leading-relaxed">
                {errorState.message}
              </p>
              <p className="text-amber-700 dark:text-amber-400 text-[11px] mt-1">
                Note: All core scholarship search, filters, eligibility checks, and funding calculations remain 100% operational.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-500/20">
            {errorState.canUseDemoFallback && (
              <button
                onClick={handleFallbackToDemo}
                className="px-4 py-2 rounded-xl bg-brass hover:bg-brass-strong dark:bg-brass-lt dark:hover:bg-brass dark:text-ink text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Bot size={13} />
                <span>View Saved Demo Answer for this Question</span>
              </button>
            )}

            <button
              onClick={() => handleAskAdvisor(errorState.failedQuestion || activeQuestion)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-amber-500/30 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-neutral-800 font-medium cursor-pointer"
            >
              Retry Live AI
            </button>
          </div>
        </div>
      )}

      {/* Advisor Response Display Card */}
      {currentResponse && !isLoading && (
        <div className="rounded-xl bg-white dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.08] shadow-xs p-6 sm:p-8 space-y-6">
          {/* Response Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
            <div className="flex flex-wrap items-center gap-2">
              {currentResponse.isDemo ? (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brass-tint dark:bg-brass-lt/15 text-brass-strong dark:text-brass-lt border border-brass/25 dark:border-brass-lt/25 flex items-center gap-1">
                  <Bot size={12} />
                  <span>DEMO MODE: PRE-GENERATED EXAMPLE ANSWER</span>
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>LIVE AI RESPONSE ({currentResponse.model})</span>
                </span>
              )}

              {currentResponse.cached && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                  Cached Locally
                </span>
              )}

              <span className="text-[11px] text-neutral-400">
                Word Count: {currentResponse.wordCount} / 200 max
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAdvice}
                className="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => handleAskAdvisor(currentResponse.sourceQuestion || activeQuestion, isDemoMode)}
                className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                title="Refresh response"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>

          {/* Question Inquired */}
          <div className="text-xs text-neutral-500">
            <span className="font-semibold text-neutral-400">Inquiry: </span>
            <span className="italic text-neutral-800 dark:text-neutral-200">
              "{currentResponse.sourceQuestion || activeQuestion}"
            </span>
          </div>

          {/* Advice Body (Structured Editorial Formatting) */}
          <div className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-3 font-normal whitespace-pre-line">
            {currentResponse.advice}
          </div>

          {/* Key Action Items Checklist */}
          {currentResponse.keyActionItems && currentResponse.keyActionItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-black/[0.04] dark:border-white/[0.04] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Recommended Action Protocol
              </span>
              <div className="space-y-1.5">
                {currentResponse.keyActionItems.map((action, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 size={13} className="text-brass dark:text-brass-lt shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer of Card */}
          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
            <div className="flex items-center gap-3">
              <span>Stifled Hallucinations: Grounded strictly against {activeScholarship.provider} verified facts.</span>
              <a
                href={activeScholarship.officialProgramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass dark:text-brass-lt hover:underline font-semibold flex items-center gap-1"
                title="Verify every detail on the official provider portal before applying"
              >
                <span>Verify on official source</span>
                <ExternalLink size={10} />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onTrackScholarship(activeScholarship.id)}
                className="text-brass dark:text-brass-lt hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Bookmark size={11} />
                <span>{isTracked ? 'View in Tracker' : 'Save to Tracker Notes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
