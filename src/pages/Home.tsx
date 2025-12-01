import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Flame, Trophy, Zap, Target, ChevronRight,
  Calendar, Clock, Star, Sparkles, TrendingUp, Award
} from 'lucide-react';
import { Card, Button, ProgressRing, ConfettiEffect } from '../components/Common';
import { useUserStore } from '../stores/userStore';
import { useProgressStore } from '../stores/progressStore';
import { allUnits } from '../data/curriculum';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isInitialized, initUser, updateStreak } = useUserStore();
  const { progress, activities, dailyChallenge, checkDailyReset } = useProgressStore();
  const expProgress = useUserStore((state) => state.getExpProgress());

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
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-4xl">
            🚀
          </div>
          <h1 className="text-2xl font-bold mb-2">CodeQuest에 오신 것을 환영해요!</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            1년 완성 코딩 학습 여정을 시작해볼까요?
          </p>

          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input mb-4"
            autoFocus
          />

          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              if (name.trim()) {
                initUser(name.trim());
                setShowWelcome(true);
              }
            }}
            disabled={!name.trim()}
          >
            시작하기
          </Button>
        </motion.div>
      </div>
    );
  }

  const completedMissions = progress.completedMissions.length;
  const totalMissions = allUnits.reduce(
    (sum, unit) => sum + unit.weeks.reduce((wSum, w) => wSum + w.missions.length, 0),
    0
  );
  const overallProgress = Math.round((completedMissions / totalMissions) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ConfettiEffect trigger={showWelcome} type="fireworks" />

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            안녕, <span className="gradient-text">{user.name}</span>! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            오늘도 코딩 실력을 키워볼까요?
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-orange-600 dark:text-orange-400">연속 학습</p>
              <p className="font-bold text-orange-700 dark:text-orange-300">{user.streak}일</p>
            </div>
          </div>

          {/* Level */}
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
            <Zap className="w-5 h-5 text-primary-500" />
            <div>
              <p className="text-xs text-primary-600 dark:text-primary-400">레벨</p>
              <p className="font-bold text-primary-700 dark:text-primary-300">Lv.{user.level}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">완료한 미션</p>
                <p className="text-2xl font-bold">{completedMissions}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">전체 진행률</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">획득한 뱃지</p>
                <p className="text-2xl font-bold">{progress.earnedBadges.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">총 경험치</p>
                <p className="text-2xl font-bold">{user.totalExp.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">계속 학습하기</h2>
              <Link to="/learn" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                전체 보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-4">
              {allUnits.slice(0, 3).map((unit, index) => {
                const unitProgress = progress.unitsProgress[unit.id];
                const progressPercent = unitProgress
                  ? Math.round((unitProgress.missionsCompleted / unit.totalMissions) * 100)
                  : 0;

                return (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/learn/${unit.id}`)}
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-dark-surfaceHover rounded-xl cursor-pointer hover:shadow-md transition-all"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${unit.color}20` }}
                    >
                      {unit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{unit.title}</h3>
                      <p className="text-sm text-slate-500">{unit.description}</p>
                      <div className="mt-2 progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-600">{progressPercent}%</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              hoverable
              onClick={() => navigate('/vibe-coding')}
              className="p-6 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
            >
              <Sparkles className="w-8 h-8 text-primary-500 mb-3" />
              <h3 className="font-semibold mb-1">바이브코딩</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                AI와 함께 코드를 만들어보세요
              </p>
            </Card>

            <Card
              hoverable
              onClick={() => navigate('/games')}
              className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
            >
              <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-semibold mb-1">게임센터</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                재미있게 코딩 실력을 키워요
              </p>
            </Card>
          </div>
        </div>

        {/* Sidebar - Right */}
        <div className="space-y-6">
          {/* Level Progress */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">레벨 진행도</h2>
            <div className="flex items-center gap-4">
              <ProgressRing progress={expProgress.percentage} size={100}>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.level}</p>
                  <p className="text-xs text-slate-500">레벨</p>
                </div>
              </ProgressRing>
              <div>
                <p className="font-medium text-lg">{user.title}</p>
                <p className="text-sm text-slate-500 mt-1">
                  다음 레벨까지 {expProgress.next - expProgress.current} XP
                </p>
                <div className="mt-2 progress-bar w-24">
                  <div className="progress-bar-fill" style={{ width: `${expProgress.percentage}%` }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Daily Challenge */}
          {dailyChallenge && (
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h2 className="font-semibold">오늘의 챌린지</h2>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                {dailyChallenge.task}
              </p>
              <div className="flex items-center justify-between">
                <div className="progress-bar flex-1 mr-3">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(dailyChallenge.progress / dailyChallenge.target) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {dailyChallenge.progress}/{dailyChallenge.target}
                </span>
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 flex items-center gap-1">
                <Award className="w-3 h-3" /> +{dailyChallenge.reward} XP
              </p>
            </Card>
          )}

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <span className="text-xl">{activity.icon || '📝'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.description}</p>
                    </div>
                    {activity.exp && (
                      <span className="text-xs text-primary-600 font-medium">+{activity.exp} XP</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  아직 활동이 없어요. 첫 미션을 시작해보세요!
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
