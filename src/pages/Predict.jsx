import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import PredictionForm from '../components/PredictionForm/PredictionForm';
import PredictionResult from '../components/PredictionResult/PredictionResult';
import { Spinner } from '../components/LoadingState/LoadingState';
import { createPrediction, submitActualOutcome } from '../services/api';

export default function Predict() {
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async (inputData) => {
    setIsSubmitting(true);
    try {
      const record = await createPrediction(inputData);
      setResult(record);
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
      subtitle="Enter customer, order, and behavior details to generate a prediction."
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
        <PredictionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      )}
    </AppLayout>
  );
}
