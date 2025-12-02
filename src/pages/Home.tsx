import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  Trophy,
  Flame,
  Target,
  Zap,
  PlayCircle,
  Sparkles,
  Code2,
  BookOpen,
  ChevronRight,
  Star,
  TrendingUp,
} from 'lucide-react';
import { ConfettiEffect } from '../components/Common';
import { useUserStore } from '../stores/userStore';
import { useProgressStore } from '../stores/progressStore';
import { allUnits } from '../data/curriculum';

// Stat Card Component
const StatCard = ({
  title,
  current,
  max,
  unit,
  icon: Icon,
  colorTheme
}: {
  title: string;
  current: number;
  max: number;
  unit: string;
  icon: React.ElementType;
  colorTheme: 'green' | 'blue' | 'violet' | 'cyan';
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  const themes = {
    green: { bg: 'from-emerald-500 to-teal-500', icon: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    blue: { bg: 'from-blue-500 to-indigo-500', icon: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    violet: { bg: 'from-violet-500 to-purple-500', icon: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
    cyan: { bg: 'from-cyan-500 to-blue-500', icon: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  };

  const theme = themes[colorTheme];

  return (
    <div className="bg-slate-700/40 p-6 rounded-2xl border border-slate-600/50 hover:bg-slate-700/60 hover:border-slate-500 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-white tracking-tight">{current}</span>
            <span className="text-slate-400 font-bold">/ {max}{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${theme.icon}`}>
          <Icon size={24} />
        </div>
      </div>

      <div className="relative w-full h-2 bg-slate-600/50 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${theme.bg} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isInitialized, initUser, updateStreak } = useUserStore();
  const { progress, checkDailyReset } = useProgressStore();

  const [showWelcome, setShowWelcome] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (isInitialized && user) {
      updateStreak();
      checkDailyReset();
    }
  }, [isInitialized, user, updateStreak, checkDailyReset]);

  // 새 사용자 환영 모달
  if (!isInitialized || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-700 p-8 rounded-2xl border border-slate-600 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            🚀
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">코딩마루에 오신 것을 환영해요!</h1>
          <p className="text-slate-400 mb-6">
            1년 완성 코딩 학습 여정을 시작해볼까요?
          </p>

          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white mb-4 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-500"
            autoFocus
          />

          <button
            onClick={() => {
              if (name.trim()) {
                initUser(name.trim());
                setShowWelcome(true);
              }
            }}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
          >
            시작하기
          </button>
        </motion.div>
      </div>
    );
  }

  const completedMissions = progress.completedMissions.length;
  const todayGoal = Math.min(completedMissions, 3);

  // Get current/recent unit for the mission card
  const currentUnit = allUnits[0];
  const currentWeek = currentUnit?.weeks?.[0];
  const currentMission = currentWeek?.missions?.[0];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <ConfettiEffect trigger={showWelcome} type="fireworks" />

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            안녕하세요, {user.name}님! 👋
          </h1>
          <p className="text-slate-400 font-medium">오늘도 성장의 깊이를 더해보세요.</p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-700/50 px-4 py-2.5 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <span className="text-sm">🔥</span>
            </div>
            <span className="font-bold text-slate-200 group-hover:text-orange-400 transition-colors">{user.streak}일째 연속</span>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 px-4 py-2.5 rounded-xl border border-yellow-500/30 cursor-pointer hover:border-yellow-500/50 transition-colors">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-yellow-400">{user.totalExp.toLocaleString()} XP</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <StatCard
          title="Today's Goal"
          current={todayGoal}
          max={3}
          unit=""
          icon={Target}
          colorTheme="green"
        />
        <StatCard
          title="현재 레벨"
          current={user.level}
          max={100}
          unit=" Lv"
          icon={TrendingUp}
          colorTheme="violet"
        />
      </motion.div>

      {/* Current Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
            진행 중인 미션
          </h2>
          <Link
            to="/learn"
            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            전체 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mission Card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-700 border border-slate-600 shadow-2xl group isolate">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo-500/15 transition-all duration-1000 -z-10"></div>

          <div className="flex flex-col md:flex-row">
            {/* Content Area */}
            <div className="flex-1 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  {currentUnit?.title || 'Basic Algorithm'}
                </span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Week {currentWeek?.number || 1}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                {currentMission?.title || '아침 루틴 알고리즘 설계'}
              </h3>
              <p className="text-slate-400 font-medium mb-6 leading-relaxed max-w-2xl">
                {currentMission?.description || '일상적인 행동을 순서도로 구조화하여 알고리즘적 사고를 기르는 훈련입니다. 드래그 앤 드롭을 사용하여 최적의 루틴을 완성하세요.'}
              </p>

              <div className="flex flex-wrap gap-3 text-sm font-bold">
                <div className="flex items-center bg-slate-600/50 px-3 py-1.5 rounded-lg border border-slate-500/30 text-slate-300">
                  <Clock size={16} className="mr-2 text-slate-400" />
                  {currentMission?.estimatedMinutes || 10}분 소요
                </div>
                <div className="flex items-center bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20 text-yellow-400">
                  <Trophy size={16} className="mr-2" />
                  +{currentMission?.exp || 50} XP 보상
                </div>
                {currentMission?.difficulty && (
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    currentMission.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                    currentMission.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' :
                    'bg-red-500/20 text-red-400 border border-red-500/20'
                  }`}>
                    {currentMission.difficulty === 'beginner' ? '초급' :
                     currentMission.difficulty === 'intermediate' ? '중급' : '고급'}
                  </span>
                )}
              </div>
            </div>

            {/* Action Area */}
            <div className="bg-slate-800/50 border-t md:border-t-0 md:border-l border-slate-600/50 p-8 flex flex-col justify-center items-center w-full md:w-72 gap-3">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-600/50 to-slate-700/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-slate-500/50 shadow-xl mb-4">
                <span className="text-5xl">{currentUnit?.icon || '🧠'}</span>
              </div>

              <button
                onClick={() => currentMission ? navigate(`/mission/${currentMission.id}`) : navigate('/learn')}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>시작하기</span>
                <Sparkles size={18} className="text-cyan-300" />
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="w-full bg-slate-700/50 text-slate-400 border border-slate-600 font-bold py-3 rounded-xl hover:bg-slate-700 hover:text-slate-200 text-sm transition-colors"
              >
                다른 미션 선택
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommended Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
          {user.name}님을 위한 추천 코스
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {allUnits.slice(0, 3).map((unit, i) => (
            <div
              key={unit.id}
              onClick={() => navigate(`/learn/${unit.id}`)}
              className="group bg-slate-700/40 p-5 rounded-2xl border border-slate-600/50 hover:bg-slate-700/60 hover:border-slate-500 hover:translate-x-1 transition-all duration-300 cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-br from-slate-600/50 to-slate-700/50 rounded-xl border border-slate-500/30 mb-5 flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                <span className="font-extrabold text-slate-600/30 text-8xl absolute -bottom-4 -right-4 group-hover:text-indigo-500/20 transition-colors">{unit.number}</span>
                <span className="text-5xl relative z-10">{unit.icon}</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unit {unit.number}</span>
                  <h4 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{unit.title}</h4>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-2">{unit.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {unit.totalMissions}개 미션
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  약 {unit.estimatedHours}시간
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
