import { useEffect, useState } from 'react';
import { Target, Gauge, Calendar, Bell, Lock, Save, CheckCircle2 } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { Spinner } from '../components/LoadingState/LoadingState';
import { getProfile, updateProfile, changePassword } from '../services/api';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '' });
  const [savedMsg, setSavedMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    predictionAlerts: true,
    weeklySummary: false,
  });

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      setForm({ name: p.name, email: p.email });
      setIsLoading(false);
    });
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedMsg('');
    try {
      const updated = await updateProfile(form);
      setProfile((prev) => ({ ...prev, ...updated }));
      setSavedMsg('Profile updated.');
      setTimeout(() => setSavedMsg(''), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.next) return;
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMsg('New passwords do not match.');
      return;
    }
    setIsChangingPassword(true);
    setPasswordMsg('');
    try {
      await changePassword({ current: passwordForm.current, next: passwordForm.next });
      setPasswordMsg('Password changed.');
      setPasswordForm({ current: '', next: '', confirm: '' });
      setTimeout(() => setPasswordMsg(''), 2500);
    } catch (err) {
      setPasswordMsg(err.message || 'Could not change password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout title="Profile">
        <div className="glass-card"><Spinner label="Loading profile..." /></div>
      </AppLayout>
    );
  }

  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <AppLayout title="Profile" subtitle="Manage your account and preferences.">
      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Overview */}
        <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center text-xl font-display font-semibold text-ink-950 shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-mist-100">{profile.name}</h2>
            <p className="text-sm text-mist-400">{profile.email}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-mist-400">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> Joined {formatDate(profile.createdAt)}</span>
              <span className="flex items-center gap-1.5"><Target size={13} /> {profile.totalPredictions} predictions</span>
              <span className="flex items-center gap-1.5"><Gauge size={13} /> {profile.accuracy}% accuracy</span>
            </div>
          </div>
        </div>

        {/* Edit profile */}
        <form onSubmit={handleSaveProfile} className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-mist-100 mb-4">Account Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="label-sm">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="label-sm">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button type="submit" className="btn-primary text-sm py-2 px-4" disabled={isSaving}>
              <Save size={14} /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            {savedMsg && <span className="text-xs text-good flex items-center gap-1.5"><CheckCircle2 size={13} /> {savedMsg}</span>}
          </div>
        </form>

        {/* Change password */}
        <form onSubmit={handleChangePassword} className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-mist-100 mb-4 flex items-center gap-2">
            <Lock size={14} /> Change Password
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="label-sm">Current password</label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="label-sm">New password</label>
              <input
                type="password"
                value={passwordForm.next}
                onChange={(e) => setPasswordForm((f) => ({ ...f, next: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="label-sm">Confirm new password</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button type="submit" className="btn-secondary text-sm py-2 px-4" disabled={isChangingPassword}>
              {isChangingPassword ? 'Updating...' : 'Update Password'}
            </button>
            {passwordMsg && (
              <span className={`text-xs flex items-center gap-1.5 ${passwordMsg.includes('match') ? 'text-bad' : 'text-good'}`}>
                <CheckCircle2 size={13} /> {passwordMsg}
              </span>
            )}
          </div>
        </form>

        {/* Notification preferences */}
        <div className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-mist-100 mb-4 flex items-center gap-2">
            <Bell size={14} /> Notification Preferences
          </h3>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {[
              { key: 'emailUpdates', label: 'Email updates', desc: 'Product news and account updates.' },
              { key: 'predictionAlerts', label: 'Prediction alerts', desc: 'Notify me when a prediction is evaluated.' },
              { key: 'weeklySummary', label: 'Weekly summary', desc: 'A weekly digest of your prediction accuracy.' },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between py-3.5 cursor-pointer select-none">
                <div>
                  <p className="text-sm text-mist-100">{item.label}</p>
                  <p className="text-xs text-mist-400">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={(e) => setNotifications((n) => ({ ...n, [item.key]: e.target.checked }))}
                  className="h-5 w-9 rounded-full appearance-none bg-ink-700 checked:bg-brand-500 relative transition-colors cursor-pointer
                    before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5
                    checked:before:translate-x-4 before:transition-transform"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
