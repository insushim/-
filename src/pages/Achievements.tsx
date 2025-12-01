import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, Lock, Award, Target, Flame,
  Code, BookOpen, Zap, Crown, Medal, Gift
} from 'lucide-react';
import { Card, Modal } from '../components/Common';
import { useProgressStore } from '../stores/progressStore';
import { useUserStore } from '../stores/userStore';
import { badges, allUnits } from '../data/curriculum';
import type { Badge } from '../types';

const Achievements: React.FC = () => {
  const { progress } = useProgressStore();
  const { user } = useUserStore();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeTab, setActiveTab] = useState<'badges' | 'milestones'>('badges');

  const earnedBadges = badges.filter(b => progress.earnedBadges.includes(b.id));
  const lockedBadges = badges.filter(b => !progress.earnedBadges.includes(b.id));

  // 마일스톤 정의
  const milestones = [
    {
      id: 'first_mission',
      icon: '🎯',
      title: '첫 미션 완료',
      description: '첫 번째 미션을 완료하세요',
      progress: Math.min(progress.completedMissions.length, 1),
      target: 1,
      reward: 50,
    },
    {
      id: 'missions_10',
      icon: '📚',
      title: '미션 마스터',
      description: '10개의 미션을 완료하세요',
      progress: Math.min(progress.completedMissions.length, 10),
      target: 10,
      reward: 200,
    },
    {
      id: 'missions_50',
      icon: '🏆',
      title: '미션 챔피언',
      description: '50개의 미션을 완료하세요',
      progress: Math.min(progress.completedMissions.length, 50),
      target: 50,
      reward: 500,
    },
    {
      id: 'streak_7',
      icon: '🔥',
      title: '일주일 연속',
      description: '7일 연속 학습하세요',
      progress: Math.min(user?.stats.longestStreak || 0, 7),
      target: 7,
      reward: 300,
    },
    {
      id: 'streak_30',
      icon: '💪',
      title: '한 달 연속',
      description: '30일 연속 학습하세요',
      progress: Math.min(user?.stats.longestStreak || 0, 30),
      target: 30,
      reward: 1000,
    },
    {
      id: 'level_10',
      icon: '⭐',
      title: '레벨 10',
      description: '레벨 10에 도달하세요',
      progress: Math.min(user?.level || 1, 10),
      target: 10,
      reward: 500,
    },
    {
      id: 'level_25',
      icon: '🌟',
      title: '레벨 25',
      description: '레벨 25에 도달하세요',
      progress: Math.min(user?.level || 1, 25),
      target: 25,
      reward: 1000,
    },
    {
      id: 'badges_5',
      icon: '🏅',
      title: '뱃지 수집가',
      description: '5개의 뱃지를 획득하세요',
      progress: Math.min(earnedBadges.length, 5),
      target: 5,
      reward: 300,
    },
    {
      id: 'unit_complete',
      icon: '📖',
      title: '유닛 마스터',
      description: '첫 번째 유닛을 완료하세요',
      progress: Object.values(progress.unitsProgress).filter(u => u.completed).length > 0 ? 1 : 0,
      target: 1,
      reward: 800,
    },
  ];

  const badgeCategories = [
    { id: 'learning', label: '학습', icon: BookOpen },
    { id: 'streak', label: '연속', icon: Flame },
    { id: 'achievement', label: '업적', icon: Trophy },
    { id: 'special', label: '특별', icon: Crown },
  ];

  const getCategoryBadges = (category: string) => {
    return badges.filter(b => b.category === category);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold">업적</h1>
        <p className="text-slate-600 dark:text-slate-400">
          뱃지와 마일스톤을 달성하고 보상을 받으세요!
        </p>
      </motion.div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Medal className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <p className="text-2xl font-bold">{earnedBadges.length}</p>
          <p className="text-sm text-slate-500">획득한 뱃지</p>
        </Card>
        <Card className="p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p className="text-2xl font-bold">
            {milestones.filter(m => m.progress >= m.target).length}/{milestones.length}
          </p>
          <p className="text-sm text-slate-500">완료 마일스톤</p>
        </Card>
        <Card className="p-4 text-center">
          <Gift className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <p className="text-2xl font-bold">{user?.totalExp.toLocaleString() || 0}</p>
          <p className="text-sm text-slate-500">총 획득 XP</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-dark-surfaceHover rounded-lg">
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'badges'
              ? 'bg-white dark:bg-dark-surface shadow text-primary-600'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          뱃지
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'milestones'
              ? 'bg-white dark:bg-dark-surface shadow text-primary-600'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          마일스톤
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'badges' ? (
          <motion.div
            key="badges"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {badgeCategories.map((category) => {
              const categoryBadges = getCategoryBadges(category.id);
              if (categoryBadges.length === 0) return null;

              return (
                <Card key={category.id} className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-primary-500" />
                    {category.label} 뱃지
                  </h2>
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {categoryBadges.map((badge) => {
                      const isEarned = progress.earnedBadges.includes(badge.id);

                      return (
                        <motion.button
                          key={badge.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedBadge(badge)}
                          className={`relative p-4 rounded-xl text-center transition-all ${
                            isEarned
                              ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                              : 'bg-slate-100 dark:bg-dark-surfaceHover opacity-60'
                          }`}
                        >
                          <div
                            className={`text-4xl mb-2 ${
                              isEarned ? '' : 'grayscale opacity-50'
                            }`}
                          >
                            {badge.icon}
                          </div>
                          <p className="text-xs font-medium truncate">{badge.name}</p>
                          {!isEarned && (
                            <div className="absolute top-2 right-2">
                              <Lock className="w-3 h-3 text-slate-400" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-6">
              <div className="space-y-4">
                {milestones.map((milestone, index) => {
                  const isComplete = milestone.progress >= milestone.target;
                  const progressPercent = (milestone.progress / milestone.target) * 100;

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl ${
                        isComplete
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                          : 'bg-slate-50 dark:bg-dark-surfaceHover'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                            isComplete
                              ? 'bg-green-100 dark:bg-green-900/30'
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        >
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{milestone.title}</h3>
                            {isComplete && (
                              <span className="badge-success text-xs">완료!</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {milestone.description}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1 progress-bar">
                              <div
                                className="progress-bar-fill"
                                style={{ width: `${Math.min(progressPercent, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {milestone.progress}/{milestone.target}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-yellow-600 font-medium flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {milestone.reward} XP
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Detail Modal */}
      <Modal
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        title="뱃지 상세"
        size="sm"
      >
        {selectedBadge && (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className={`w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center text-5xl ${
                progress.earnedBadges.includes(selectedBadge.id)
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30'
                  : 'bg-slate-200 dark:bg-slate-700 grayscale'
              }`}
            >
              {selectedBadge.icon}
            </motion.div>

            <h2 className="text-xl font-bold mb-2">{selectedBadge.name}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {selectedBadge.description}
            </p>

            {progress.earnedBadges.includes(selectedBadge.id) ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400">
                <Award className="w-4 h-4" />
                획득 완료!
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-400">
                <Lock className="w-4 h-4" />
                미획득
              </div>
            )}

            <p className="mt-4 text-sm text-slate-500">
              조건: {selectedBadge.condition}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Achievements;
