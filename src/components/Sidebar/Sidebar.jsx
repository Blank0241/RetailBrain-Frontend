import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Sparkles, History, LineChart, User, LogOut, BrainCircuit, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/predict', label: 'New Prediction', icon: Sparkles },
  { to: '/history', label: 'Prediction History', icon: History },
  { to: '/analytics', label: 'Analytics', icon: LineChart },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 shrink-0 z-40 flex flex-col glass border-r border-white/[0.06] transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center">
              <BrainCircuit size={18} className="text-ink-950" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-mist-100 tracking-tight">RetailBrain</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-mist-400 hover:text-mist-100">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-300 shadow-glow'
                    : 'text-mist-300 hover:text-mist-100 hover:bg-white/[0.05]'
                }`
              }
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.06] flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center text-xs font-display font-semibold text-ink-950">
              {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2) || 'RB'}
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-sm font-medium text-mist-100 truncate">{user?.name || 'Guest'}</span>
              <span className="text-xs text-mist-400 truncate">{user?.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-mist-300 hover:text-bad hover:bg-bad/10 transition-colors duration-150"
          >
            <LogOut size={17} strokeWidth={2} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
