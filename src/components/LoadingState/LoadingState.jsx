import { Loader2 } from 'lucide-react';

export function Spinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-mist-300">
      <Loader2 className="animate-spin text-brand-400" size={28} />
      {label && <span className="text-sm font-mono">{label}</span>}
    </div>
  );
}

export function SkeletonLine({ className = '' }) {
  return <div className={`bg-white/[0.06] rounded-md animate-pulseSoft ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <SkeletonLine className="h-3 w-24" />
      <SkeletonLine className="h-8 w-16" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="glass-card p-5 overflow-hidden">
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <SkeletonLine key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
