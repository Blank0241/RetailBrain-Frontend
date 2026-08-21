import { useEffect, useState, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import PredictionTable from '../components/PredictionTable/PredictionTable';
import { SkeletonTable } from '../components/LoadingState/LoadingState';
import { getPredictionHistory } from '../services/api';

const STATUS_OPTIONS = ['All', 'Correct', 'Incorrect', 'Pending'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'confidence', label: 'Highest confidence' },
];

export default function History() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getPredictionHistory({ search, status, sortBy, page, pageSize: 8 }).then((res) => {
      setResult(res);
      setIsLoading(false);
    });
  }, [search, status, sortBy, page]);

  useEffect(() => {
    const timeout = setTimeout(fetchData, 250);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  useEffect(() => { setPage(1); }, [search, status, sortBy]);

  return (
    <AppLayout title="Prediction History" subtitle="Every prediction you've run, searchable and sortable.">
      <div className="flex flex-col gap-5">
        <div className="glass-card p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, prediction ID..."
              className="input-field pl-9"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field appearance-none pr-8 min-w-[130px]">
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <SlidersHorizontal size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-400 pointer-events-none" />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field min-w-[150px]">
              {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {isLoading || !result ? (
          <SkeletonTable rows={8} />
        ) : (
          <>
            <PredictionTable predictions={result.items} />

            {result.total > 0 && (
              <div className="flex items-center justify-between text-sm text-mist-400 px-1">
                <span>
                  Showing {(page - 1) * result.pageSize + 1}–{Math.min(page * result.pageSize, result.total)} of {result.total}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn-ghost py-1.5 px-2 disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-mono text-xs">{page} / {result.totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(result.totalPages, p + 1))}
                    disabled={page === result.totalPages}
                    className="btn-ghost py-1.5 px-2 disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
