import { Menu } from 'lucide-react';

export default function AppTopbar({ title, subtitle, onMenuClick, actions }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 lg:px-8 h-16 border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden text-mist-300 hover:text-mist-100 shrink-0">
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="font-display text-lg font-semibold text-mist-100 truncate">{title}</h1>
          {subtitle && <p className="text-xs text-mist-400 truncate">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </header>
  );
}
