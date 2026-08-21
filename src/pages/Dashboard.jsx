import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2, XCircle, Clock3, Gauge, Sparkles, ArrowRight } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import StatCard from '../components/StatCard/StatCard';
import PredictionTable from '../components/PredictionTable/PredictionTable';
import { SkeletonCard, SkeletonTable } from '../components/LoadingState/LoadingState';
import { AccuracyLineChart, PredictionsBarChart } from '../components/AccuracyChart/Charts';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getDashboardStats().then((res) => {
      if (active) {
        setData(res);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <AppLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
      subtitle="Here's how your predictions are performing."
      actions={
        <Link to="/predict" className="btn-primary text-sm py-2 px-4">
          <Sparkles size={15} /> New Prediction
        </Link>
      }
    >
      {isLoading ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
          <SkeletonTable />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard icon={Target} label="Total Predictions" value={data.stats.total} />
            <StatCard icon={CheckCircle2} label="Correct" value={data.stats.correct} tone="good" />
            <StatCard icon={XCircle} label="Incorrect" value={data.stats.incorrect} tone="bad" />
            <StatCard icon={Clock3} label="Pending" value={data.stats.pending} tone="amber" />
            <StatCard icon={Gauge} label="Accuracy" value={data.stats.accuracy} suffix="%" tone="cyan" />
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Predictions Over Time</h3>
              <PredictionsBarChart data={data.predictionsOverTime} />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Accuracy Over Time</h3>
              <AccuracyLineChart data={data.accuracyOverTime} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-semibold text-mist-100">Recent Predictions</h3>
              <Link to="/history" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <PredictionTable predictions={data.recent} />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
