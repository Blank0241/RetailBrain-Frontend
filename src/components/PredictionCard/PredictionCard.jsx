import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StatusPill from '../StatusPill';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function PredictionCard({ prediction }) {
  return (
    <Link
      to={`/history/${prediction._id}`}
      className="glass-card p-4 flex items-center justify-between gap-3 hover:border-brand-500/40 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-mist-400">{prediction._id}</span>
          <StatusPill status={prediction.status} />
        </div>
        <p className="text-sm font-medium text-mist-100 truncate">{prediction.customer}</p>
        <p className="text-xs text-mist-400 mt-0.5">
          {prediction.prediction} · {prediction.confidence}% confidence · {formatDate(prediction.createdAt)}
        </p>
      </div>
      <ChevronRight size={16} className="text-mist-500 shrink-0" />
    </Link>
  );
}
