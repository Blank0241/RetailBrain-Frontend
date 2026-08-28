import { useState } from 'react';
import { CheckCircle2, Clock3, Sparkles, Copy, Check } from 'lucide-react';
import ConfidenceRing from '../ConfidenceRing';
import { ACTUAL_OUTCOME_OPTIONS } from '../../data/mockData';

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function PredictionResult({ result, onRecordOutcome, isRecording }) {
  const [copied, setCopied] = useState(false);
  const isPurchaseLikely = result.prediction === 'Likely to Purchase';
  const isPending = result.status === 'Pending';

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(result._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  return (
    <div className="glass-card p-6 lg:p-8 animate-fadeUp">
      <div className="flex flex-col md:flex-row gap-8 md:items-center">
        <div className="shrink-0 flex justify-center">
          <ConfidenceRing value={result.confidence} size={128} strokeWidth={9} label="Purchase Probability" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="eyebrow flex items-center gap-1.5">
            <Sparkles size={12} /> Model Output
          </span>
          <h2 className={`font-display text-2xl font-semibold mt-1 ${isPurchaseLikely ? 'text-good' : 'text-bad'}`}>
            {result.prediction}
          </h2>
          <p className="text-xs text-mist-500 mt-1 max-w-md">
            This is an estimated likelihood based on historical behavior, not a guarantee of what the customer will do.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-mist-400">
            <button onClick={copyId} className="flex items-center gap-1.5 font-mono text-xs hover:text-mist-100 transition-colors">
              {copied ? <Check size={13} className="text-good" /> : <Copy size={13} />}
              {result._id}
            </button>
            <span className="text-mist-600">•</span>
            <span>{formatDate(result.createdAt)}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="pill bg-white/[0.05] text-mist-300 border border-white/10">
              Customer: {result.inputData.customerId}
            </span>
            <span className="pill bg-white/[0.05] text-mist-300 border border-white/10">
              Product: {result.inputData.itemId}
            </span>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/[0.06] my-6" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {isPending ? <Clock3 size={15} className="text-amber-400" /> : <CheckCircle2 size={15} className="text-good" />}
          <h3 className="font-display text-sm font-semibold text-mist-100">Record Actual Outcome</h3>
        </div>
        <p className="text-sm text-mist-400 max-w-2xl">
          Once the real-world result is known, record it here. RetailBrain compares it against the model's
          prediction to calculate accuracy — the prediction itself is never marked correct just because you agree with it.
        </p>

        {result.status !== 'Pending' ? (
          <div className={`flex items-center gap-2 mt-1 pill w-fit ${result.status === 'Correct' ? 'bg-good/10 text-good' : 'bg-bad/10 text-bad'}`}>
            <CheckCircle2 size={13} />
            Outcome recorded: {result.actualOutcome} · Marked {result.status}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-1">
            {ACTUAL_OUTCOME_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onRecordOutcome(opt)}
                disabled={isRecording}
                className="btn-secondary text-sm py-2"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
