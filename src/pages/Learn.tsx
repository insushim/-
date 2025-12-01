import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle2, Clock, Star, ChevronDown, BookOpen, Target } from 'lucide-react';
import { Card, Button, Modal } from '../components/Common';
import { allUnits, getUnitById, getMissionById } from '../data/curriculum';
import { useProgressStore } from '../stores/progressStore';
import { useUserStore } from '../stores/userStore';
import type { Unit, Week, Mission } from '../types';

const Learn: React.FC = () => {
  const { unitId, weekId } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  const { user } = useUserStore();

  // 유닛 선택되지 않으면 유닛 목록 표시
  if (!unitId) {
    return <UnitList />;
  }

  // 유닛 상세
  const unit = getUnitById(unitId);
  if (!unit) {
    return <div>유닛을 찾을 수 없습니다.</div>;
  }

  // 주차 선택되지 않으면 주차 목록 표시
  if (!weekId) {
    return <WeekList unit={unit} />;
  }

  // 주차 상세 (미션 목록)
  const week = unit.weeks.find(w => w.id === weekId);
  if (!week) {
    return <div>주차를 찾을 수 없습니다.</div>;
  }

  return <MissionList unit={unit} week={week} />;
};

// 유닛 목록 컴포넌트
const UnitList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { progress } = useProgressStore();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">학습하기</h1>
        <p className="text-slate-600 dark:text-slate-400">
          52주 완성 코딩 커리큘럼을 따라 학습하세요
        </p>
      </div>

      {/* Learning Path Visualization */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-dark-border hidden md:block" />

        <div className="space-y-6">
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Node on timeline */}
                <div className="hidden md:flex absolute left-0 w-16 h-16 items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isLocked
                        ? 'bg-slate-300 dark:bg-slate-600'
                        : 'bg-white dark:bg-dark-surface border-2 border-primary-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-slate-500" />
                    ) : (
                      <span className="text-lg">{unit.icon}</span>
                    )}
                  </div>
                </div>

                <Card
                  hoverable={!isLocked}
                  onClick={() => !isLocked && navigate(`/learn/${unit.id}`)}
                  className={`md:ml-20 ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                  padding="lg"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 md:hidden"
                      style={{ backgroundColor: `${unit.color}20` }}
                    >
                      {unit.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge-primary">Unit {unit.number}</span>
                        {isLocked && (
                          <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            Lv.{unit.unlockLevel} 필요
                          </span>
                        )}
                        {isCompleted && (
                          <span className="badge-success">완료!</span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-1">{unit.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        {unit.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-500">
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
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>진행률</span>
                            <span className="font-medium">{progressPercent}%</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <ChevronRight className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 주차 목록 컴포넌트
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/learn')}
          className="text-sm text-primary-600 hover:text-primary-700 mb-2 flex items-center gap-1"
        >
          ← 전체 유닛
        </button>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${unit.color}20` }}
          >
            {unit.icon}
          </div>
          <div>
            <span className="badge-primary mb-1">Unit {unit.number}</span>
            <h1 className="text-2xl font-bold">{unit.title}</h1>
            <p className="text-slate-600 dark:text-slate-400">{unit.description}</p>
          </div>
        </div>
      </div>

      {/* Weeks */}
      <div className="space-y-4">
        {unit.weeks.map((week, index) => {
          const weekProgress = getWeekProgress(week);
          const isExpanded = expandedWeek === week.id;
          const isCompleted = weekProgress.completed === weekProgress.total;

          return (
            <Card key={week.id} padding="none" className="overflow-hidden">
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-dark-surfaceHover transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-100 dark:bg-dark-surfaceHover'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-bold">{week.number}</span>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{week.title}</h3>
                    <p className="text-sm text-slate-500">{week.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">
                    {weekProgress.completed}/{weekProgress.total}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200 dark:border-dark-border"
                  >
                    <div className="p-4 space-y-2">
                      {week.missions.map((mission) => {
                        const isCompleted = progress.completedMissions.includes(mission.id);

                        return (
                          <button
                            key={mission.id}
                            onClick={() => navigate(`/mission/${mission.id}`)}
                            className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surfaceHover transition-colors text-left"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium truncate ${isCompleted ? 'text-slate-500' : ''}`}>
                                {mission.title}
                              </p>
                              <p className="text-xs text-slate-500 truncate">{mission.description}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs text-yellow-600">+{mission.exp} XP</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </button>
                        );
                      })}

                      {week.project && (
                        <div className="mt-4 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-primary-500" />
                            <span className="font-semibold">프로젝트: {week.project.title}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {week.project.description}
                          </p>
                          <p className="text-xs text-primary-600 mt-2">+{week.project.exp} XP</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// 미션 목록 컴포넌트
const MissionList: React.FC<{ unit: Unit; week: Week }> = ({ unit, week }) => {
  const navigate = useNavigate();
  const { progress } = useProgressStore();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/learn/${unit.id}`)}
          className="text-sm text-primary-600 hover:text-primary-700 mb-2 flex items-center gap-1"
        >
          ← {unit.title}
        </button>
        <h1 className="text-2xl font-bold">Week {week.number}: {week.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">{week.description}</p>
      </div>

      {/* Missions */}
      <div className="space-y-4">
        {week.missions.map((mission, index) => {
          const isCompleted = progress.completedMissions.includes(mission.id);

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                hoverable
                onClick={() => navigate(`/mission/${mission.id}`)}
                padding="lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-slate-100 dark:bg-dark-surfaceHover'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <span className="text-2xl">{mission.type === 'coding' ? '💻' : '🧩'}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{mission.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {mission.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`badge ${
                        mission.difficulty === 'beginner' ? 'badge-success' :
                        mission.difficulty === 'intermediate' ? 'badge-warning' :
                        'badge-danger'
                      }`}>
                        {mission.difficulty === 'beginner' ? '초급' :
                         mission.difficulty === 'intermediate' ? '중급' : '고급'}
                      </span>
                      {mission.language && (
                        <span className="badge-primary">{mission.language}</span>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mission.estimatedMinutes}분
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-yellow-600">+{mission.exp} XP</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Learn;
