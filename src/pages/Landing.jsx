import { Link } from 'react-router-dom';
import {
  BrainCircuit, Sparkles, LineChart, ClipboardCheck, Gauge,
  ArrowRight, TrendingUp, TrendingDown, Users,
} from 'lucide-react';
import PublicNavbar from '../components/Navbar/PublicNavbar';
import ConfidenceRing from '../components/ConfidenceRing';
import { computeStats, MOCK_PREDICTIONS } from '../data/mockData';

const stats = computeStats(MOCK_PREDICTIONS);
const previewRows = MOCK_PREDICTIONS.slice(0, 4);

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-Powered Predictions',
    desc: 'Feed in customer and order details and get an instant purchase-likelihood prediction with a calibrated confidence score.',
  },
  {
    icon: ClipboardCheck,
    title: 'Customer & Order Analysis',
    desc: 'Every prediction is grounded in customer behavior, order economics, and channel — not just a single input.',
  },
  {
    icon: Gauge,
    title: 'Prediction Feedback',
    desc: 'Record what actually happened once it\'s known. RetailBrain never assumes a prediction was right just because you liked it.',
  },
  {
    icon: LineChart,
    title: 'Model Performance Tracking',
    desc: 'Accuracy, confidence calibration, and outcome distribution — tracked continuously as real outcomes come in.',
  },
];

const STEPS = [
  { title: 'Enter customer/order information', desc: 'Fill in customer profile, order details, and behavior history through a guided form.' },
  { title: 'Get an ML prediction', desc: 'RetailBrain returns a purchase-likelihood prediction with a confidence score in seconds.' },
  { title: 'Record the actual outcome', desc: 'When the real result is known, log it against the original prediction.' },
  { title: 'Evaluate prediction accuracy', desc: 'RetailBrain compares prediction to outcome and rolls it into your model performance analytics.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div className="animate-fadeUp">
            <span className="eyebrow">Retail intelligence, modeled</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.08] tracking-tight text-mist-100 mt-4">
              Smarter Retail Predictions,{' '}
              <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
                Powered by Machine Learning
              </span>
            </h1>
            <p className="text-mist-300 text-base sm:text-lg mt-5 max-w-xl leading-relaxed">
              RetailBrain uses machine learning to analyze retail and customer data, generate predictions, and
              continuously evaluate model performance using real-world outcomes.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link to="/register" className="btn-primary text-sm">
                Get Started <ArrowRight size={15} />
              </Link>
              <Link to="/login" className="btn-secondary text-sm">Sign In</Link>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative animate-fadeUp" style={{ animationDelay: '.1s' }}>
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center">
                    <BrainCircuit size={13} className="text-ink-950" />
                  </div>
                  <span className="text-xs font-mono text-mist-400">Live model preview</span>
                </div>
                <span className="pill bg-good/10 text-good text-[10px]">Purchased</span>
              </div>

              <div className="flex items-center gap-6">
                <ConfidenceRing value={87} size={92} strokeWidth={8} label="" />
                <div>
                  <p className="text-xs text-mist-400">Prediction</p>
                  <p className="font-display text-lg font-semibold text-good">Likely to Purchase</p>
                  <p className="text-xs text-mist-400 mt-1.5">CUST-10234 · Chennai · Electronics</p>
                </div>
              </div>

              <div className="h-px bg-white/[0.06] my-5" />

              <p className="label-sm mb-3">Recent Predictions</p>
              <div className="flex flex-col gap-2.5">
                {previewRows.map((p) => (
                  <div key={p._id} className="flex items-center justify-between text-xs">
                    <span className="text-mist-300 truncate max-w-[40%]">{p.customer}</span>
                    <span className="text-mist-500 font-mono">{p.confidence}%</span>
                    <span className={p.status === 'Correct' ? 'text-good' : p.status === 'Incorrect' ? 'text-bad' : 'text-amber-400'}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/[0.06] my-5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-mist-400">
                  <TrendingUp size={13} className="text-good" /> Accuracy
                </div>
                <span className="font-display text-sm font-semibold text-mist-100">{stats.accuracy}%</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-brand-500/20 blur-3xl -z-10" />
            <div className="absolute -top-5 -left-5 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.06]">
        <span className="eyebrow">What it does</span>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-mist-100 mt-3 max-w-lg">
          Built around the full prediction lifecycle
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mt-10">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card p-6">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="font-display text-base font-semibold text-mist-100 mb-2">{title}</h3>
              <p className="text-sm text-mist-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.06]">
        <span className="eyebrow">The workflow</span>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-mist-100 mt-3 max-w-lg">How it works</h2>
        <div className="grid md:grid-cols-4 gap-5 mt-10">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="font-mono text-3xl font-semibold text-white/10">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-sm font-semibold text-mist-100 mt-2 mb-1.5">{step.title}</h3>
              <p className="text-sm text-mist-400 leading-relaxed">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight size={16} className="hidden md:block absolute top-1 -right-8 text-mist-600" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.06]">
        <div className="glass-card p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-glow opacity-60 pointer-events-none" />
          <div className="relative">
            <Users size={22} className="mx-auto text-cyan-400 mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-mist-100">
              Start exploring RetailBrain
            </h2>
            <p className="text-mist-400 mt-3 max-w-md mx-auto">
              Create an account and run your first prediction in under a minute — no setup required.
            </p>
            <Link to="/register" className="btn-primary text-sm mt-7">
              Get Started <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center">
              <BrainCircuit size={13} className="text-ink-950" />
            </div>
            <span className="font-display font-semibold text-sm text-mist-100">RetailBrain</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-mist-400">
            <a href="#features" className="hover:text-mist-100 transition-colors">About</a>
            <a href="#features" className="hover:text-mist-100 transition-colors">Features</a>
            <Link to="/login" className="hover:text-mist-100 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-mist-100 transition-colors">Register</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
