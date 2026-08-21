import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import PredictionResult from '../components/PredictionResult/PredictionResult';
import { Spinner } from '../components/LoadingState/LoadingState';
import EmptyState from '../components/EmptyState/EmptyState';
import { AlertTriangle } from 'lucide-react';
import { getPredictionById, submitActualOutcome } from '../services/api';

function labelize(key) {
  const spaced = key.replace(/([A-Z])/g, ' $1');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function PredictionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setNotFound(false);
    getPredictionById(id)
      .then(setPrediction)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleRecordOutcome = async (outcome) => {
    setIsRecording(true);
    try {
      const updated = await submitActualOutcome(id, outcome);
      setPrediction(updated);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <AppLayout
      title="Prediction Details"
      subtitle={id}
      actions={
        <button onClick={() => navigate('/history')} className="btn-secondary text-sm py-2 px-4">
          <ArrowLeft size={14} /> Back to History
        </button>
      }
    >
      {isLoading ? (
        <div className="glass-card"><Spinner label="Loading prediction..." /></div>
      ) : notFound ? (
        <div className="glass-card">
          <EmptyState
            icon={AlertTriangle}
            title="Prediction not found"
            description="This prediction may have been removed, or the link is incorrect."
            action={<Link to="/history" className="btn-primary text-sm">Back to History</Link>}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <PredictionResult result={prediction} onRecordOutcome={handleRecordOutcome} isRecording={isRecording} />

          <div className="glass-card p-6">
            <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Input Summary</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prediction.inputData).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <span className="label-sm">{labelize(key)}</span>
                  <span className="text-sm text-mist-200">
                    {typeof value === 'number' && /value|spending/i.test(key) ? `₹${value.toLocaleString('en-IN')}` : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
