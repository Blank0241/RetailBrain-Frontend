import { Link } from 'react-router-dom';
import { BrainCircuit, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center mb-6">
        <BrainCircuit size={24} className="text-ink-950" />
      </div>
      <span className="font-display text-6xl font-semibold text-white/10">404</span>
      <h1 className="font-display text-xl font-semibold text-mist-100 mt-3">Page not found</h1>
      <p className="text-sm text-mist-400 mt-2 max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="btn-primary text-sm mt-7">
        <ArrowLeft size={15} /> Back to home
      </Link>
    </div>
  );
}
