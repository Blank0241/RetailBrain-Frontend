// The confidence ring is RetailBrain's signature visual: every prediction's
// confidence score is shown as a progress ring rather than a bare percentage,
// so "how sure is the model" reads instantly, at any size, anywhere in the app.
export default function ConfidenceRing({ value = 0, size = 96, strokeWidth = 8, label = 'Confidence' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color = value >= 75 ? '#34D399' : value >= 55 ? '#FBBF24' : '#FB7185';

  return (
    <div className="flex flex-col items-center gap-2" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1), stroke 0.4s' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-semibold text-mist-100" style={{ fontSize: size * 0.24 }}>
            {value}%
          </span>
        </div>
      </div>
      {label && <span className="label-sm">{label}</span>}
    </div>
  );
}
