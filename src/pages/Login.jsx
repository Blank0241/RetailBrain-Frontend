import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, continueAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemo = async () => {
    setError('');
    setIsDemoLoading(true);
    try {
      await continueAsDemo();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to start demo session.');
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm animate-fadeUp">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center">
            <BrainCircuit size={19} className="text-ink-950" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-lg text-mist-100">RetailBrain</span>
        </Link>

        <div className="glass-card p-7">
          <h1 className="font-display text-xl font-semibold text-mist-100">Welcome back</h1>
          <p className="text-sm text-mist-400 mt-1 mb-6">Sign in to continue to your dashboard.</p>

          {error && (
            <div className="flex items-center gap-2 text-sm text-bad bg-bad/10 border border-bad/20 rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="label-sm">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
                <input
                  id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="you@company.com"
                  className="input-field pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label-sm">Password</label>
                <button type="button" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'} required
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-400 hover:text-mist-100"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-mist-300 cursor-pointer select-none">
              <input
                type="checkbox" name="remember" checked={form.remember} onChange={handleChange}
                className="rounded border-white/20 bg-ink-950 text-brand-500 focus:ring-brand-500/40"
              />
              Remember me
            </label>

            <button type="submit" className="btn-primary w-full mt-1" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-mist-500">or</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <button onClick={handleDemo} className="btn-secondary w-full" disabled={isDemoLoading}>
            {isDemoLoading ? 'Starting demo...' : 'Continue as Demo User'}
          </button>

          <p className="text-sm text-mist-400 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
