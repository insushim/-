import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Sparkles, Gamepad2, User } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: '홈' },
  { to: '/learn', icon: BookOpen, label: '학습' },
  { to: '/vibe-coding', icon: Sparkles, label: '바이브' },
  { to: '/games', icon: Gamepad2, label: '게임' },
  { to: '/profile', icon: User, label: '프로필' },
];

const MobileNav: React.FC = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border z-50">
      <div className="h-full flex items-center justify-around">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
