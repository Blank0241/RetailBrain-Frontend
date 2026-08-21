export default function StatCard({ icon: Icon, label, value, delta, tone = 'default', suffix = '' }) {
  const toneColor = {
    default: 'text-mist-100',
    good: 'text-good',
    bad: 'text-bad',
    amber: 'text-amber-400',
    cyan: 'text-cyan-400',
  }[tone];

  const iconTone = {
    default: 'bg-brand-500/10 text-brand-400',
    good: 'bg-good/10 text-good',
    bad: 'bg-bad/10 text-bad',
    amber: 'bg-amber-500/10 text-amber-400',
    cyan: 'bg-cyan-400/10 text-cyan-400',
  }[tone];

  return (
    <div className="glass-card p-5 flex flex-col gap-4 animate-fadeUp">
      <div className="flex items-center justify-between">
        <span className="label-sm">{label}</span>
        {Icon && (
          <span className={`h-8 w-8 rounded-lg flex items-center justify-center ${iconTone}`}>
            <Icon size={16} strokeWidth={2} />
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span className={`font-display text-3xl font-semibold ${toneColor}`}>
          {value}
          {suffix}
        </span>
        {delta && (
          <span className={`text-xs font-mono ${delta.startsWith('-') ? 'text-bad' : 'text-good'}`}>{delta}</span>
        )}
      </div>
    </div>
  );
}
