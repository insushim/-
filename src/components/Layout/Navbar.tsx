import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Settings,
  Moon,
  Sun,
  Flame,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { useSettingsStore } from '../../stores/settingsStore';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useUserStore();
  const { theme, setTheme, sidebarCollapsed, toggleSidebar, getEffectiveTheme } =
    useSettingsStore();
  const effectiveTheme = getEffectiveTheme();
  const expProgress = useUserStore((state) => state.getExpProgress());

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-dark-surface border-b border-slate-200 dark:border-dark-border z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="hidden sm:block font-bold text-xl gradient-text">
              CodeQuest
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {user && (
            <>
              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  {user.streak}일
                </span>
              </div>

              {/* Level & EXP */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                <Zap className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  Lv.{user.level}
                </span>
                <div className="w-16 h-1.5 bg-primary-200 dark:bg-primary-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${expProgress.percentage}%` }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
          >
            {effectiveTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Settings */}
          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
          >
            <Settings className="w-5 h-5" />
          </Link>

          {/* User Avatar */}
          {user && (
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-lg">
                {user.avatar}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
