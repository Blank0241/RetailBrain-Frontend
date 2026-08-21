import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink-900/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center">
            <BrainCircuit size={18} className="text-ink-950" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-mist-100 tracking-tight text-[15px]">RetailBrain</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-mist-300">
          <a href="#features" className="hover:text-mist-100 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-mist-100 transition-colors">How it works</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
