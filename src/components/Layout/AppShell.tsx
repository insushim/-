import React, { useState, ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useSettingsStore } from '../../stores/settingsStore';

interface AppShellProps {
  children: ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { sidebarCollapsed } = useSettingsStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-dark-surface border-r border-slate-200 dark:border-dark-border transition-all duration-300 z-40 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <aside
              className="w-64 h-full bg-white dark:bg-dark-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar collapsed={false} onClose={() => setMobileMenuOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 min-h-[calc(100vh-4rem)] pt-16 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          }`}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default AppShell;
