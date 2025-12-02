import React, { useState, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Code2,
  Bot,
  Gamepad2,
  Trophy,
  User,
  Settings,
  Menu,
  X,
  Zap,
  Bell,
  Search,
  ChevronRight,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';

interface AppShellProps {
  children: ReactNode;
}

// Navigation Item Component
const NavItem = ({
  to,
  icon: Icon,
  label,
  onClick
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden
      ${isActive
        ? 'bg-indigo-600/10 text-indigo-300 font-semibold'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`
    }
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
        <span className="relative z-10">{label}</span>
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
        )}
      </>
    )}
  </NavLink>
);

const mainNavItems = [
  { to: '/', icon: LayoutDashboard, label: '대시보드' },
  { to: '/learn', icon: BookOpen, label: '커리큘럼' },
  { to: '/vibe-coding', icon: Code2, label: '코드 에디터' },
  { to: '/ai-tutor', icon: Bot, label: 'AI 멘토링' },
  { to: '/games', icon: Trophy, label: '챌린지' },
  { to: '/achievements', icon: Briefcase, label: '마이 커리어' },
];

const bottomNavItems = [
  { to: '/profile', icon: User, label: '프로필' },
  { to: '/settings', icon: Settings, label: '설정' },
];

// Get page title based on path
const getPageTitle = (pathname: string): string => {
  if (pathname === '/') return '대시보드';
  if (pathname.startsWith('/learn')) return '커리큘럼';
  if (pathname.startsWith('/vibe-coding')) return '코드 에디터';
  if (pathname.startsWith('/ai-tutor')) return 'AI 멘토링';
  if (pathname.startsWith('/games')) return '챌린지';
  if (pathname.startsWith('/achievements')) return '마이 커리어';
  if (pathname.startsWith('/profile')) return '프로필';
  if (pathname.startsWith('/settings')) return '설정';
  if (pathname.startsWith('/mission')) return '미션';
  return '코딩마루';
};

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUserStore();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  // Calculate XP progress
  const currentExp = user?.exp || 0;
  const nextLevelExp = (user?.level || 1) * 1000;
  const expProgress = Math.round((currentExp / nextLevelExp) * 100);

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans text-slate-200 selection:bg-indigo-500/30">

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-slate-800 border-r border-slate-700/50 flex flex-col transition-transform duration-300 font-sans shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Code2 className="text-white w-6 h-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
          </div>
          <div>
            <h1 className="text-2xl text-white tracking-wide leading-none mb-1" style={{ fontFamily: "'Jua', sans-serif" }}>
              코딩마루
            </h1>
            <p className="text-[11px] text-slate-300 font-medium tracking-wide opacity-80">소프트웨어 배움터</p>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden ml-auto p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="px-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 backdrop-blur-sm group hover:bg-slate-700/80 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-xl overflow-hidden border-2 border-slate-500 shadow-sm">
                {user?.avatar || '👤'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white truncate">{user?.name || '코딩러버'}</h3>
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-1.5 py-0.5 rounded tracking-wide">
                    Lv.{user?.level || 1}
                  </span>
                </div>
                <p className="text-xs text-slate-300 truncate font-medium">{user?.title || '초보 개발자'}</p>
              </div>
            </div>
            {/* XP Bar */}
            <div className="w-full bg-slate-600/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all duration-500"
                style={{ width: `${expProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-300 font-semibold tracking-wide">
              <span>EXP {currentExp}</span>
              <span>NEXT {nextLevelExp}</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-2 mb-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Main Menu</p>
          {mainNavItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}

          <div className="my-6 border-t border-slate-700/50 mx-2" />

          {bottomNavItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </nav>

        {/* Premium Upgrade CTA */}
        <div className="p-4 mt-auto">
          <button className="w-full relative overflow-hidden group rounded-xl p-4 text-left transition-transform hover:-translate-y-1 border border-amber-500/20 shadow-lg shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-orange-700/90 group-hover:from-amber-500 group-hover:to-orange-600 transition-colors duration-300" />
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>

            <div className="relative z-10">
              <h4 className="text-white font-bold text-sm flex items-center gap-1.5" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                <Zap className="w-4 h-4 fill-amber-100 text-amber-100" /> 프리미엄 멤버십
              </h4>
              <p className="text-amber-100/90 text-[11px] mt-1 font-medium pl-0.5">모든 코딩 강의 무제한 수강</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 h-16 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-300">
              <span className="hover:text-white cursor-pointer font-medium hover:underline decoration-indigo-500 decoration-2 underline-offset-4 transition-all">
                코딩마루
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span className="text-white font-bold tracking-tight">{pageTitle}</span>
            </div>

            {/* Mobile Title */}
            <span className="md:hidden text-white font-bold">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-slate-700/50 rounded-full px-4 py-2 border border-slate-600/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all w-72 shadow-inner">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="배우고 싶은 기술을 검색하세요..."
                className="bg-transparent border-none text-sm text-slate-200 placeholder-slate-400 focus:outline-none w-full ml-2"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-full transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-800 shadow-sm animate-pulse"></span>
            </button>

            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>

            {/* Streak Badge */}
            <div className="flex items-center gap-2 pl-1 group cursor-pointer p-1 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/40 transition-colors">
                <span className="text-sm">🔥</span>
              </div>
              <span className="hidden md:block text-sm font-bold text-slate-300 group-hover:text-orange-400 transition-colors">
                {user?.streak || 0}일 연속
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar bg-slate-900">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

        body {
          font-family: 'Noto Sans KR', sans-serif;
        }

        .font-logo {
          font-family: 'Jua', sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #64748b;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .mask-image-gradient {
          mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default AppShell;
