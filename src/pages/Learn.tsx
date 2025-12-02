import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Lock, CheckCircle2, Clock, Star, ChevronDown,
  BookOpen, Target, ArrowLeft, Play, PlayCircle, Bot, Layers
} from 'lucide-react';
import { allUnits, getUnitById } from '../data/curriculum';
import { useProgressStore } from '../stores/progressStore';
import { useUserStore } from '../stores/userStore';
import type { Unit, Week, Mission } from '../types';

const Learn: React.FC = () => {
  const { unitId, weekId } = useParams();
  const navigate = useNavigate();

  if (!unitId) {
    return <UnitList />;
  }

  const unit = getUnitById(unitId);
  if (!unit) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">유닛을 찾을 수 없습니다.</p>
      </div>
    );
  }

  if (!weekId) {
    return <WeekList unit={unit} />;
  }

  const week = unit.weeks.find(w => w.id === weekId);
  if (!week) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">주차를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return <MissionList unit={unit} week={week} />;
};

// Unit Header Component (The Big Card)
const UnitHeader: React.FC<{ unit: Unit; progressPercent: number; completedMissions: number; totalMissions: number }> = ({
  unit, progressPercent, completedMissions, totalMissions
}) => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-700 border border-slate-600 shadow-2xl mb-8 group isolate">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo-500/20 transition-all duration-1000 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 -z-10"></div>
      <div className="absolute inset-0 bg-grid-slate-600/[0.1] -z-10 mask-image-gradient"></div>

      <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-10 items-start md:items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Current Unit
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Unit {unit.number}. <br className="md:hidden"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 drop-shadow-sm">
              {unit.title}
            </span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed font-light opacity-90 break-keep">
            {unit.description}
          </p>

          <div className="flex items-center gap-8 mt-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">진행률</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tighter">{progressPercent}<span className="text-lg text-slate-400 ml-0.5">%</span></span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-600/50"></div>
            <div className="flex flex-col gap-1.5">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">학습 강의</span>
              <span className="text-white font-bold text-lg">{completedMissions} <span className="text-slate-400 font-medium text-sm">/ {totalMissions} 강</span></span>
            </div>
          </div>
        </div>

        {/* Action / Icon Area */}
        <div className="flex-shrink-0 relative hidden md:block">
          <div className="w-48 h-48 bg-gradient-to-br from-slate-600/50 to-slate-700/50 backdrop-blur-md rounded-3xl flex items-center justify-center border border-slate-500/50 shadow-2xl rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
            <span className="text-7xl">{unit.icon}</span>
            <div className="absolute inset-0 rounded-3xl border-2 border-white/5"></div>
          </div>
        </div>
      </div>

      {/* Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/50">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 shadow-[0_0_15px_rgba(45,212,191,0.6)] relative transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

// Lesson Item Component
const LessonItem: React.FC<{ lesson: Week; index: number; onExpand: () => void; isExpanded: boolean; weekProgress: { completed: number; total: number } }> = ({
  lesson, index, onExpand, isExpanded, weekProgress
}) => {
  const isCompleted = weekProgress.completed === weekProgress.total && weekProgress.total > 0;
  const hasProgress = weekProgress.completed > 0;
  const isActive = hasProgress && !isCompleted;

  return (
    <div
      className={`
        group relative flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 cursor-pointer
        ${isActive
          ? 'bg-slate-700/80 border-indigo-500/50 shadow-[0_4px_20px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20 translate-x-1'
          : 'bg-slate-700/40 border-slate-600/50 hover:bg-slate-700/60 hover:border-slate-500'}
      `}
      onClick={onExpand}
    >
      {/* Number Badge */}
      <div className={`
        flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-2 transition-transform duration-300 group-hover:scale-105
        ${isActive ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/40' : ''}
        ${isCompleted ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : ''}
        ${!isActive && !isCompleted ? 'bg-slate-700 text-slate-300 border-slate-600 group-hover:border-slate-500 group-hover:text-white' : ''}
      `}>
        {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <span className="font-logo">{lesson.number}</span>}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className={`text-lg font-bold truncate tracking-tight ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
            {lesson.title}
          </h3>
          {isActive && (
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30 animate-pulse tracking-wide">
              학습 중
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 truncate font-medium group-hover:text-slate-400 transition-colors">{lesson.description}</p>

        {/* Progress Bar for Lesson */}
        <div className="mt-4 flex items-center gap-3 max-w-md">
          <div className="flex-1 h-1.5 bg-slate-600/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`}
              style={{ width: `${(weekProgress.completed / weekProgress.total) * 100}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-bold text-slate-500 min-w-[3rem] text-right">
            {weekProgress.completed} <span className="text-slate-500">/ {weekProgress.total}</span>
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0">
        <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
    </div>
  );
};

// Unit List Component
const UnitList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { progress } = useProgressStore();

  return (
    <div className="animate-fade-in-up">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-slate-700 rounded-lg text-[11px] font-bold text-slate-400 border border-slate-600 tracking-wide flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            전체 유닛
          </span>
        </div>
        <div className="text-xs font-medium text-slate-500">
          총 <span className="text-slate-300">{allUnits.length}개</span> 유닛
        </div>
      </div>

      <div className="space-y-4">
        {allUnits.map((unit, index) => {
          const isLocked = user ? user.level < unit.unlockLevel : true;
          const unitProgress = progress.unitsProgress[unit.id];
          const progressPercent = unitProgress
            ? Math.round((unitProgress.missionsCompleted / unit.totalMissions) * 100)
            : 0;
          const isCompleted = progressPercent === 100;

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => !isLocked && navigate(`/learn/${unit.id}`)}
                disabled={isLocked}
                className={`
                  w-full text-left p-6 rounded-2xl border transition-all duration-300 group
                  ${isLocked
                    ? 'bg-slate-800/40 border-slate-700 opacity-50 cursor-not-allowed grayscale-[0.5]'
                    : 'bg-slate-700/40 border-slate-600/50 hover:bg-slate-700/60 hover:border-slate-500 hover:translate-x-1'}
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl border-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-105
                      ${isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : isLocked
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-slate-700 border-slate-600 group-hover:border-slate-500'}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 text-slate-500" />
                    ) : (
                      unit.icon
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black px-2 py-1 rounded bg-slate-600 text-slate-200">
                        Unit {unit.number}
                      </span>
                      {isLocked && (
                        <span className="text-xs font-bold px-2 py-1 rounded bg-slate-700 text-slate-400">
                          Lv.{unit.unlockLevel} 필요
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">
                          완료!
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-1 text-white">{unit.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{unit.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {unit.totalMissions}개 미션
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        약 {unit.estimatedHours}시간
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {unit.weeks.length}주
                      </span>
                    </div>

                    {!isLocked && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">진행률</span>
                          <span className="font-bold text-slate-300">{progressPercent}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-600/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <ChevronRight className={`w-6 h-6 flex-shrink-0 transition-colors ${isLocked ? 'text-slate-600' : 'text-slate-400 group-hover:text-slate-200'}`} />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Week List Component
const WeekList: React.FC<{ unit: Unit }> = ({ unit }) => {
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);

  const getWeekProgress = (week: Week) => {
    const completed = week.missions.filter(m =>
      progress.completedMissions.includes(m.id)
    ).length;
    return { completed, total: week.missions.length };
  };

  // Calculate unit progress
  const totalMissions = unit.weeks.reduce((sum, week) => sum + week.missions.length, 0);
  const completedMissions = unit.weeks.reduce((sum, week) => {
    return sum + week.missions.filter(m => progress.completedMissions.includes(m.id)).length;
  }, 0);
  const progressPercent = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

  return (
    <div className="animate-fade-in-up">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전체 유닛
        </button>
        <div className="text-xs font-medium text-slate-500">
          Last updated: <span className="text-slate-300">Just now</span>
        </div>
      </div>

      {/* Main Unit Card */}
      <UnitHeader
        unit={unit}
        progressPercent={progressPercent}
        completedMissions={completedMissions}
        totalMissions={totalMissions}
      />

      {/* Lesson List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
            상세 커리큘럼
          </h3>
          <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-indigo-500/20">
            모두 펼치기
          </button>
        </div>

        {unit.weeks.map((week, index) => {
          const weekProgress = getWeekProgress(week);
          const isExpanded = expandedWeek === week.id;

          return (
            <motion.div
              key={week.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <LessonItem
                lesson={week}
                index={index}
                onExpand={() => setExpandedWeek(isExpanded ? null : week.id)}
                isExpanded={isExpanded}
                weekProgress={weekProgress}
              />

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 mt-2 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 space-y-2">
                      {week.missions.map((mission, mIndex) => {
                        const missionCompleted = progress.completedMissions.includes(mission.id);

                        return (
                          <button
                            key={mission.id}
                            onClick={() => navigate(`/mission/${mission.id}`)}
                            className="w-full p-4 flex items-center gap-4 rounded-xl border border-slate-600/50 hover:border-indigo-500/50 hover:bg-slate-700/50 transition-all text-left group"
                          >
                            {missionCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-500 flex-shrink-0 group-hover:border-indigo-400 transition-colors" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`font-bold truncate ${missionCompleted ? 'text-slate-400' : 'text-slate-200'}`}>
                                {mission.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                  mission.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                                  mission.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {mission.difficulty === 'beginner' ? '초급' :
                                   mission.difficulty === 'intermediate' ? '중급' : '고급'}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {mission.estimatedMinutes}분
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-yellow-500">+{mission.exp} XP</span>
                              <PlayCircle className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                            </div>
                          </button>
                        );
                      })}

                      {week.project && (
                        <div className="mt-4 p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-indigo-400" />
                            <span className="font-bold text-indigo-300">
                              프로젝트: {week.project.title}
                            </span>
                          </div>
                          <p className="text-sm text-indigo-300/70 mb-2">
                            {week.project.description}
                          </p>
                          <span className="text-xs font-bold text-indigo-400">+{week.project.exp} XP</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Coming Soon Section */}
      <div className="mt-12 pt-10 border-t border-slate-700 text-center">
        <div className="inline-block p-3 rounded-full bg-slate-700/50 mb-4 text-slate-500">
          <BookOpen className="w-6 h-6" />
        </div>
        <p className="text-slate-400 mb-5 font-medium">더 많은 학습 컨텐츠가 준비 중입니다</p>
        <button
          onClick={() => navigate('/learn')}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-xl text-sm font-bold transition-all border border-slate-600 hover:border-slate-500 shadow-sm"
        >
          전체 커리큘럼 로드맵 보기
        </button>
      </div>
    </div>
  );
};

// Mission List Component
const MissionList: React.FC<{ unit: Unit; week: Week }> = ({ unit, week }) => {
  const navigate = useNavigate();
  const { progress } = useProgressStore();

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/learn/${unit.id}`)}
          className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {unit.title}
        </button>
        <h1 className="text-2xl font-bold text-white">
          Week {week.number}: {week.title}
        </h1>
        <p className="text-slate-400">{week.description}</p>
      </div>

      {/* Missions */}
      <div className="space-y-3">
        {week.missions.map((mission, index) => {
          const isCompleted = progress.completedMissions.includes(mission.id);

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => navigate(`/mission/${mission.id}`)}
                className="w-full text-left p-5 rounded-2xl border border-slate-600/50 bg-slate-700/40 hover:bg-slate-700/60 hover:border-slate-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-105
                      ${isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-slate-700 border-slate-600'}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    ) : (
                      <span className="text-2xl">
                        {mission.type === 'coding' ? '💻' :
                         mission.type === 'drag-drop' ? '🧩' :
                         mission.type === 'quiz' ? '📝' :
                         mission.type === 'pattern-recognition' ? '🔍' :
                         mission.type === 'visual-programming' ? '🤖' :
                         mission.type === 'interactive-lesson' ? '📖' :
                         mission.type === 'hands-on' ? '🛠️' :
                         mission.type === 'discussion' ? '💬' :
                         mission.type === 'writing' ? '✍️' : '📋'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-white">{mission.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-1">
                      {mission.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        mission.difficulty === 'beginner'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : mission.difficulty === 'intermediate'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {mission.difficulty === 'beginner' ? '초급' :
                         mission.difficulty === 'intermediate' ? '중급' : '고급'}
                      </span>
                      {mission.concept && (
                        <span className="text-xs text-slate-500">
                          {mission.concept}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mission.estimatedMinutes}분
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-yellow-500">+{mission.exp} XP</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Learn;
