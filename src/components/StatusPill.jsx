import { CheckCircle2, XCircle, Clock3 } from 'lucide-react';

const CONFIG = {
  Correct: { icon: CheckCircle2, cls: 'bg-good/10 text-good' },
  Incorrect: { icon: XCircle, cls: 'bg-bad/10 text-bad' },
  Pending: { icon: Clock3, cls: 'bg-amber-500/10 text-amber-400' },
};

export default function StatusPill({ status }) {
  const { icon: Icon, cls } = CONFIG[status] || CONFIG.Pending;
  return (
    <span className={`pill ${cls}`}>
      <Icon size={12} />
      {status}
    </span>
  );
}
