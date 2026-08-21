import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import AppTopbar from './Navbar/AppTopbar';

export default function AppLayout({ title, subtitle, actions, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-ink-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppTopbar title={title} subtitle={subtitle} actions={actions} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-5 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
