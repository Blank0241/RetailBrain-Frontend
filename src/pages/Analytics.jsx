import { useEffect, useState } from 'react';
import { Target, CheckCircle2, XCircle, Clock3, Gauge, FlaskConical } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import StatCard from '../components/StatCard/StatCard';
import { SkeletonCard } from '../components/LoadingState/LoadingState';
import {
  AccuracyLineChart, PredictionsBarChart, CorrectVsIncorrectPie,
  DistributionBarChart, ConfidenceScatterChart,
} from '../components/AccuracyChart/Charts';
import { getAnalytics } from '../services/api';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getAnalytics().then((res) => {
      if (active) {
        setData(res);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <AppLayout title="Analytics" subtitle="Model performance across all evaluated predictions.">
      <div className="flex items-center gap-2 mb-6 pill bg-amber-500/10 text-amber-400 w-fit">
        <FlaskConical size={13} />
        Demo Analytics — backend and live model not yet connected
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard icon={Target} label="Total Predictions" value={data.stats.total} />
            <StatCard icon={Gauge} label="Evaluated" value={data.stats.evaluated} tone="cyan" />
            <StatCard icon={CheckCircle2} label="Correct" value={data.stats.correct} tone="good" />
            <StatCard icon={XCircle} label="Incorrect" value={data.stats.incorrect} tone="bad" />
            <StatCard icon={Clock3} label="Pending" value={data.stats.pending} tone="amber" />
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display text-sm font-semibold text-mist-100">Model Accuracy</h3>
              <span className="font-display text-2xl font-semibold text-cyan-400">{data.stats.accuracy}%</span>
            </div>
            <p className="text-xs text-mist-400 mb-4">Correct predictions out of all evaluated predictions.</p>
            <AccuracyLineChart data={data.accuracyOverTime} height={220} />
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Correct vs Incorrect</h3>
              <CorrectVsIncorrectPie
                correct={data.stats.correct}
                incorrect={data.stats.incorrect}
                pending={data.stats.pending}
              />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Predictions Over Time</h3>
              <PredictionsBarChart data={data.predictionsOverTime} height={240} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Prediction Distribution by Category</h3>
              <DistributionBarChart data={data.distributionByCategory} />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Confidence vs Correctness</h3>
              <ConfidenceScatterChart data={data.confidenceVsCorrectness} />
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
