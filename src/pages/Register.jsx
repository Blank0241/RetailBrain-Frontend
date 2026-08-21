import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8) next.password = 'Use at least 8 characters';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';
    if (!form.terms) next.terms = 'You must accept the terms';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Unable to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <h1 className="font-display text-xl font-semibold text-mist-100">Create your account</h1>
          <p className="text-sm text-mist-400 mt-1 mb-6">Start predicting in under a minute.</p>

          {formError && (
            <div className="flex items-center gap-2 text-sm text-bad bg-bad/10 border border-bad/20 rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={15} className="shrink-0" />
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="label-sm">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
                <input
                  id="name" name="name" value={form.name} onChange={handleChange}
                  placeholder="Kalai Arasan"
                  className={`input-field pl-9 ${errors.name ? '!border-bad/60' : ''}`}
                />
              </div>
              {errors.name && <span className="text-xs text-bad">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="label-sm">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
                <input
                  id="email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@company.com"
                  className={`input-field pl-9 ${errors.email ? '!border-bad/60' : ''}`}
                />
              </div>
              {errors.email && <span className="text-xs text-bad">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="label-sm">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`input-field pl-9 pr-9 ${errors.password ? '!border-bad/60' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-400 hover:text-mist-100">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-bad">{errors.password}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="label-sm">Confirm password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-400" />
                <input
                  id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword} onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`input-field pl-9 ${errors.confirmPassword ? '!border-bad/60' : ''}`}
                />
              </div>
              {errors.confirmPassword && <span className="text-xs text-bad">{errors.confirmPassword}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-2 text-sm text-mist-300 cursor-pointer select-none">
                <input
                  type="checkbox" name="terms" checked={form.terms} onChange={handleChange}
                  className="mt-0.5 rounded border-white/20 bg-ink-950 text-brand-500 focus:ring-brand-500/40"
                />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
              {errors.terms && <span className="text-xs text-bad">{errors.terms}</span>}
            </div>

            <button type="submit" className="btn-primary w-full mt-1" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-mist-400 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
