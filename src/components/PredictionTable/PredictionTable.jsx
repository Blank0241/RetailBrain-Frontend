import { useNavigate } from 'react-router-dom';
import StatusPill from '../StatusPill';
import PredictionCard from '../PredictionCard/PredictionCard';
import EmptyState from '../EmptyState/EmptyState';
import { Inbox } from 'lucide-react';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function PredictionTable({ predictions, showCustomer = true }) {
  const navigate = useNavigate();

  if (!predictions || predictions.length === 0) {
    return (
      <div className="glass-card">
        <EmptyState
          icon={Inbox}
          title="No predictions yet"
          description="Predictions you run will show up here, ready to compare against real outcomes."
        />
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden md:block glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-left">
                <th className="px-5 py-3 label-sm font-medium">Prediction ID</th>
                {showCustomer && <th className="px-5 py-3 label-sm font-medium">Customer</th>}
                <th className="px-5 py-3 label-sm font-medium">Prediction</th>
                <th className="px-5 py-3 label-sm font-medium">Confidence</th>
                <th className="px-5 py-3 label-sm font-medium">Actual Result</th>
                <th className="px-5 py-3 label-sm font-medium">Status</th>
                <th className="px-5 py-3 label-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr
                  key={p._id}
                  onClick={() => navigate(`/history/${p._id}`)}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-mist-400">{p._id}</td>
                  {showCustomer && <td className="px-5 py-3.5 text-mist-100">{p.customer}</td>}
                  <td className="px-5 py-3.5 text-mist-200">{p.prediction}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-mist-200">{p.confidence}%</span>
                  </td>
                  <td className="px-5 py-3.5 text-mist-300">{p.actualOutcome}</td>
                  <td className="px-5 py-3.5"><StatusPill status={p.status} /></td>
                  <td className="px-5 py-3.5 text-mist-400 text-xs">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {predictions.map((p) => (
          <PredictionCard key={p._id} prediction={p} />
        ))}
      </div>
    </>
  );
}
