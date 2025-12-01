import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Code2,
  Gamepad2,
  Trophy,
  Sparkles,
  User,
  X,
  Bot,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: '/', icon: Home, label: '홈' },
  { to: '/learn', icon: BookOpen, label: '학습하기' },
  { to: '/vibe-coding', icon: Sparkles, label: '바이브코딩' },
  { to: '/ai-tutor', icon: Bot, label: 'AI 튜터' },
  { to: '/games', icon: Gamepad2, label: '게임센터' },
  { to: '/achievements', icon: Trophy, label: '업적' },
  { to: '/profile', icon: User, label: '프로필' },
  { to: '/settings', icon: Settings, label: '설정' },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onClose }) => {
  return (
    <div className="h-full flex flex-col py-4">
      {/* Mobile Close Button */}
      {onClose && (
        <div className="flex justify-between items-center px-4 mb-4 lg:hidden">
          <span className="font-bold text-lg gradient-text">CodeQuest</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-slate-900 dark:hover:text-slate-200'
              }`
            }
          >
            <Icon
              className={`w-5 h-5 flex-shrink-0 ${
                collapsed ? 'mx-auto' : ''
              }`}
            />
            {!collapsed && (
              <span className="font-medium truncate">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section - Quick Stats */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-slate-200 dark:border-dark-border">
          <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-5 h-5 text-primary-500" />
              <span className="font-medium text-sm">오늘의 목표</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>미션 완료</span>
                  <span>2/3</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '66%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>학습 시간</span>
                  <span>25/30분</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '83%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
