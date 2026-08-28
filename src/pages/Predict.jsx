import { useState } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import PredictionForm from '../components/PredictionForm/PredictionForm';
import PredictionResult from '../components/PredictionResult/PredictionResult';
import { Spinner } from '../components/LoadingState/LoadingState';
import { createPrediction, submitActualOutcome } from '../services/api';

export default function Predict() {
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (inputData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const record = await createPrediction(inputData);
      setResult(record);
    } catch (err) {
      setError(err.message || 'Something went wrong while generating this prediction.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecordOutcome = async (outcome) => {
    setIsRecording(true);
    try {
      const updated = await submitActualOutcome(result._id, outcome);
      setResult(updated);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <AppLayout
      title="New Prediction"
      subtitle="Select a customer and product to generate a purchase prediction."
      actions={
        result && (
          <button onClick={() => setResult(null)} className="btn-secondary text-sm py-2 px-4">
            <RotateCcw size={14} /> New Prediction
          </button>
        )
      }
    >
      {isSubmitting ? (
        <div className="glass-card">
          <Spinner label="Analyzing retail data..." />
        </div>
      ) : result ? (
        <PredictionResult result={result} onRecordOutcome={handleRecordOutcome} isRecording={isRecording} />
      ) : (
        <div className="flex flex-col gap-4">
          {error && (
            <div className="glass-card p-4 flex items-start gap-3 border border-bad/30">
              <AlertTriangle size={16} className="text-bad shrink-0 mt-0.5" />
              <p className="text-sm text-mist-300">{error}</p>
            </div>
          )}
          <PredictionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      )}
    </AppLayout>
  );
}
