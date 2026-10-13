import React from 'react';
import { LucideIcon, Inbox, Loader2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Button class maps — one source of truth for interactive surfaces.   */
/* Primary = ink-filled (paper in dark). Accent = brass, used rarely.   */
/* ------------------------------------------------------------------ */
export const btn = {
  primary:
    'inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-ink text-paper dark:bg-paper dark:text-ink text-[13px] font-semibold shadow-xs hover:bg-ink-soft dark:hover:bg-neutral-200 active:scale-[0.98]',
  accent:
    'inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-brass text-white dark:bg-brass-lt dark:text-ink text-[13px] font-semibold shadow-xs hover:bg-brass-strong dark:hover:bg-brass-lt/90 active:scale-[0.98]',
  secondary:
    'inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-white dark:bg-neutral-900 text-ink dark:text-neutral-100 border border-black/[0.09] dark:border-white/[0.11] text-[13px] font-semibold shadow-xs hover:bg-black/[0.03] dark:hover:bg-white/[0.05] hover:border-black/20 dark:hover:border-white/20 active:scale-[0.98]',
  ghost:
    'inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg text-[13px] font-medium text-ink-soft dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.07]',
  danger:
    'inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-red-600 text-white text-[13px] font-semibold shadow-xs hover:bg-red-700 active:scale-[0.98]',
} as const;

/* ------------------------------------------------------------------ */
/* Surfaces — consistent radii (xl for cards, md for nested rows),     */
/* hairline borders, warm shadow scale from index.css tokens.          */
/* ------------------------------------------------------------------ */
export const surface = {
  card:
    'rounded-xl bg-white dark:bg-neutral-900/70 border border-black/[0.07] dark:border-white/[0.08] shadow-xs',
  panel:
    'rounded-xl bg-white dark:bg-neutral-900/70 border border-black/[0.07] dark:border-white/[0.08]',
  inset:
    'rounded-lg bg-black/[0.025] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06]',
} as const;

/* ------------------------------------------------------------------ */
/* Badge — semantic chips. success=verified, danger=urgent deadline,   */
/* brass=highlight, neutral=quiet metadata.                            */
/* ------------------------------------------------------------------ */
type BadgeVariant = 'neutral' | 'brass' | 'success' | 'danger' | 'info';

const badgeStyles: Record<BadgeVariant, string> = {
  neutral:
    'bg-black/[0.05] text-ink-soft dark:bg-white/[0.07] dark:text-neutral-300 border-black/[0.05] dark:border-white/[0.06]',
  brass:
    'bg-brass-tint text-brass-strong dark:bg-brass-lt/15 dark:text-brass-lt border-brass/20 dark:border-brass-lt/20',
  success:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20',
  danger:
    'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200/60 dark:border-red-500/20',
  info:
    'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300 border-sky-200/60 dark:border-sky-500/20',
};

export const Badge: React.FC<{
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}> = ({ variant = 'neutral', className = '', children }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold leading-4 tracking-wide ${badgeStyles[variant]} ${className}`}
  >
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* PageHeader — the editorial page-title pattern used by every view:   */
/* brass eyebrow + Lexend title + description + right-aligned actions. */
/* ------------------------------------------------------------------ */
export const PageHeader: React.FC<{
  eyebrow?: string;
  icon?: LucideIcon;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ eyebrow, icon: Icon, title, description, actions, children }) => (
  <header className="mb-7">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brass dark:text-brass-lt">
            {Icon && <Icon size={13} className="shrink-0" />}
            <span className="truncate">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display text-[26px] sm:text-3xl font-semibold leading-tight tracking-tight text-ink dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
    {children}
  </header>
);

/* ------------------------------------------------------------------ */
/* SectionTitle — small in-card/section headings with optional action. */
/* ------------------------------------------------------------------ */
export const SectionTitle: React.FC<{
  title: string;
  hint?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, hint, action, className = '' }) => (
  <div className={`flex items-center justify-between gap-3 ${className}`}>
    <div className="min-w-0">
      <h2 className="font-display text-[15px] font-semibold tracking-tight text-ink dark:text-white">
        {title}
      </h2>
      {hint && (
        <p className="mt-0.5 text-xs text-ink-soft dark:text-neutral-400">{hint}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

/* ------------------------------------------------------------------ */
/* EmptyState / Loading — consistent placeholder treatment.            */
/* ------------------------------------------------------------------ */
export const EmptyState: React.FC<{
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
}> = ({ icon: Icon = Inbox, title, description, action, compact }) => (
  <div
    className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8 px-4' : 'py-14 px-6'} rounded-xl border border-dashed border-black/[0.1] dark:border-white/[0.12]`}
  >
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brass-tint dark:bg-brass-lt/10 text-brass dark:text-brass-lt">
      <Icon size={19} />
    </div>
    <p className="font-display text-[15px] font-semibold text-ink dark:text-white">
      {title}
    </p>
    {description && (
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-ink-soft dark:text-neutral-400">
        {description}
      </p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const Spinner: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = '',
}) => (
  <Loader2 size={size} className={`animate-spin ${className}`} aria-hidden="true" />
);

export const LoadingBlock: React.FC<{ label?: string }> = ({
  label = 'Loading…',
}) => (
  <div className="flex items-center justify-center gap-2 py-14 text-[13px] text-ink-soft dark:text-neutral-400">
    <Spinner /> {label}
  </div>
);

/* ------------------------------------------------------------------ */
/* Meter — thin progress bar used for match scores / completion.       */
/* ------------------------------------------------------------------ */
export const Meter: React.FC<{
  value: number; // 0..100
  tone?: 'brass' | 'success' | 'danger' | 'neutral';
  className?: string;
}> = ({ value, tone = 'brass', className = '' }) => {
  const fill =
    tone === 'success'
      ? 'bg-emerald-500'
      : tone === 'danger'
        ? 'bg-red-500'
        : tone === 'neutral'
          ? 'bg-neutral-400 dark:bg-neutral-500'
          : 'bg-brass dark:bg-brass-lt';
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09] ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${fill}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Stat — quiet numeric block for dashboards (no giant card padding).  */
/* ------------------------------------------------------------------ */
export const Stat: React.FC<{
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon?: LucideIcon;
}> = ({ label, value, sub, icon: Icon }) => (
  <div className="flex items-start gap-3">
    {Icon && (
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brass-tint dark:bg-brass-lt/10 text-brass dark:text-brass-lt">
        <Icon size={15} />
      </div>
    )}
    <div className="min-w-0">
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft dark:text-neutral-500">
        {label}
      </div>
      <div className="font-display text-xl font-semibold tracking-tight text-ink dark:text-white">
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 text-xs text-ink-soft dark:text-neutral-400">{sub}</div>
      )}
    </div>
  </div>
);
