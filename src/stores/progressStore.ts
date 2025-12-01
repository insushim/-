import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Progress, UnitProgress, Badge, Achievement, Challenge, Activity } from '../types';

interface ProgressState {
  progress: Progress;
  badges: Badge[];
  achievements: Achievement[];
  dailyChallenge: Challenge | null;
  weeklyChallenge: Challenge | null;
  activities: Activity[];

  // Actions
  completeMission: (missionId: string, unitId: string, perfect: boolean) => void;
  completeProject: (projectId: string) => void;
  earnBadge: (badgeId: string) => void;
  updateAchievement: (achievementId: string, progress: number) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  updateDailyChallenge: (progress: number) => void;
  updateWeeklyChallenge: (progress: number) => void;
  checkDailyReset: () => void;
  getMissionStatus: (missionId: string) => { completed: boolean; perfect: boolean };
  getUnitProgress: (unitId: string) => UnitProgress | undefined;
  resetProgress: () => void;
}

const defaultProgress: Progress = {
  unitsProgress: {},
  completedMissions: [],
  completedProjects: [],
  earnedBadges: [],
  dailyChallenges: {
    date: new Date().toISOString().split('T')[0],
    completed: false,
    challengeId: '',
  },
  weeklyChallenges: {
    weekStart: '',
    completed: false,
    challengeId: '',
    progress: 0,
  },
};

const initialBadges: Badge[] = [
  {
    id: 'first_code',
    name: '첫 코드',
    description: '첫 번째 미션을 완료했습니다!',
    icon: '🎉',
    category: 'progress',
    condition: '첫 미션 완료',
    rarity: 'common',
  },
  {
    id: 'streak_7',
    name: '7일 연속',
    description: '7일 연속으로 학습했습니다!',
    icon: '🔥',
    category: 'challenge',
    condition: '7일 연속 학습',
    rarity: 'rare',
  },
  {
    id: 'streak_30',
    name: '30일 연속',
    description: '30일 연속으로 학습했습니다!',
    icon: '🔥🔥',
    category: 'challenge',
    condition: '30일 연속 학습',
    rarity: 'epic',
  },
  {
    id: 'streak_100',
    name: '100일 연속',
    description: '100일 연속으로 학습했습니다!',
    icon: '🔥🔥🔥',
    category: 'challenge',
    condition: '100일 연속 학습',
    rarity: 'legendary',
  },
  {
    id: 'unit_1',
    name: '사고력 마스터',
    description: 'Unit 1 컴퓨팅 사고력을 완료했습니다!',
    icon: '🧠',
    category: 'progress',
    condition: 'Unit 1 완료',
    rarity: 'common',
  },
  {
    id: 'unit_2',
    name: '블록 마스터',
    description: 'Unit 2 블록 코딩을 완료했습니다!',
    icon: '🧱',
    category: 'progress',
    condition: 'Unit 2 완료',
    rarity: 'common',
  },
  {
    id: 'python_beginner',
    name: 'Python 입문',
    description: 'Python 기초를 완료했습니다!',
    icon: '🐍',
    category: 'progress',
    condition: 'Python 기초 완료',
    rarity: 'rare',
  },
  {
    id: 'js_beginner',
    name: 'JS 입문',
    description: 'JavaScript 기초를 완료했습니다!',
    icon: '💛',
    category: 'progress',
    condition: 'JavaScript 기초 완료',
    rarity: 'rare',
  },
  {
    id: 'web_builder',
    name: '웹 빌더',
    description: 'HTML/CSS를 완료했습니다!',
    icon: '🌐',
    category: 'progress',
    condition: 'HTML/CSS 완료',
    rarity: 'rare',
  },
  {
    id: 'vibe_master',
    name: '바이브 마스터',
    description: '바이브코딩을 마스터했습니다!',
    icon: '🎵',
    category: 'progress',
    condition: '바이브코딩 마스터',
    rarity: 'epic',
  },
  {
    id: 'code_master',
    name: '코드 마스터',
    description: '전체 커리큘럼을 완료했습니다!',
    icon: '👑',
    category: 'progress',
    condition: '전체 커리큘럼 완료',
    rarity: 'legendary',
  },
  {
    id: 'perfect_10',
    name: '퍼펙트 10',
    description: '10개의 미션을 완벽하게 클리어했습니다!',
    icon: '💯',
    category: 'challenge',
    condition: '10개 미션 완벽 클리어',
    rarity: 'rare',
  },
  {
    id: 'speed_demon',
    name: '스피드 데몬',
    description: '빠른 속도로 10개 미션을 완료했습니다!',
    icon: '⚡',
    category: 'challenge',
    condition: '미션 10개 빠른 완료',
    rarity: 'rare',
  },
  {
    id: 'loop_master',
    name: '반복 마스터',
    description: '반복문 관련 미션 20개를 완료했습니다!',
    icon: '🔄',
    category: 'skill',
    condition: '반복문 20개 완료',
    rarity: 'rare',
  },
  {
    id: 'function_wizard',
    name: '함수 마법사',
    description: '함수 15개를 작성했습니다!',
    icon: '✨',
    category: 'skill',
    condition: '함수 15개 작성',
    rarity: 'rare',
  },
  {
    id: 'bug_hunter',
    name: '버그 헌터',
    description: '디버깅 20개를 완료했습니다!',
    icon: '🐛',
    category: 'skill',
    condition: '디버깅 20개 완료',
    rarity: 'rare',
  },
  {
    id: 'game_dev',
    name: '게임 개발자',
    description: '게임 3개를 제작했습니다!',
    icon: '🎮',
    category: 'skill',
    condition: '게임 3개 제작',
    rarity: 'epic',
  },
  {
    id: 'first_project',
    name: '프로젝트 원',
    description: '첫 번째 프로젝트를 완료했습니다!',
    icon: '🚀',
    category: 'special',
    condition: '첫 프로젝트 완료',
    rarity: 'common',
  },
  {
    id: 'ai_friend',
    name: 'AI 친구',
    description: 'AI 튜터와 100회 대화했습니다!',
    icon: '🤖',
    category: 'special',
    condition: 'AI 튜터 100회 대화',
    rarity: 'epic',
  },
  {
    id: 'creative',
    name: '창의왕',
    description: '자유 프로젝트를 완료했습니다!',
    icon: '🎨',
    category: 'special',
    condition: '자유 프로젝트 완료',
    rarity: 'epic',
  },
];

const initialAchievements: Achievement[] = [
  {
    id: 'missions_10',
    title: '미션 초보',
    description: '10개의 미션을 완료하세요',
    icon: '✅',
    progress: 0,
    target: 10,
    completed: false,
    reward: 100,
  },
  {
    id: 'missions_50',
    title: '미션 전문가',
    description: '50개의 미션을 완료하세요',
    icon: '🎯',
    progress: 0,
    target: 50,
    completed: false,
    reward: 500,
  },
  {
    id: 'missions_100',
    title: '미션 마스터',
    description: '100개의 미션을 완료하세요',
    icon: '🏆',
    progress: 0,
    target: 100,
    completed: false,
    reward: 1000,
  },
  {
    id: 'code_lines_1000',
    title: '코드 작가',
    description: '1000줄의 코드를 작성하세요',
    icon: '📝',
    progress: 0,
    target: 1000,
    completed: false,
    reward: 300,
  },
  {
    id: 'projects_5',
    title: '프로젝트 빌더',
    description: '5개의 프로젝트를 완료하세요',
    icon: '🏗️',
    progress: 0,
    target: 5,
    completed: false,
    reward: 500,
  },
];

export const useProgressStore = create<ProgressState>()(
  persist(
    immer((set, get) => ({
      progress: defaultProgress,
      badges: initialBadges,
      achievements: initialAchievements,
      dailyChallenge: null,
      weeklyChallenge: null,
      activities: [],

      completeMission: (missionId: string, unitId: string, perfect: boolean) => {
        set((state) => {
          // Add to completed missions if not already there
          if (!state.progress.completedMissions.includes(missionId)) {
            state.progress.completedMissions.push(missionId);

            // Update unit progress
            if (!state.progress.unitsProgress[unitId]) {
              state.progress.unitsProgress[unitId] = {
                unitId,
                started: true,
                completed: false,
                missionsCompleted: 0,
                totalMissions: 0,
                startedAt: new Date().toISOString(),
              };
            }

            state.progress.unitsProgress[unitId].missionsCompleted += 1;
            state.progress.unitsProgress[unitId].lastMissionId = missionId;

            // Add activity
            state.activities.unshift({
              id: `activity_${Date.now()}`,
              type: 'mission',
              title: '미션 완료',
              description: `미션을 ${perfect ? '완벽하게 ' : ''}완료했습니다!`,
              timestamp: new Date().toISOString(),
              icon: perfect ? '💯' : '✅',
            });
          }

          // Update achievements
          const missionsCount = state.progress.completedMissions.length;
          state.achievements = state.achievements.map((achievement) => {
            if (achievement.id.startsWith('missions_')) {
              return {
                ...achievement,
                progress: missionsCount,
                completed: missionsCount >= achievement.target,
              };
            }
            return achievement;
          });
        });
      },

      completeProject: (projectId: string) => {
        set((state) => {
          if (!state.progress.completedProjects.includes(projectId)) {
            state.progress.completedProjects.push(projectId);

            state.activities.unshift({
              id: `activity_${Date.now()}`,
              type: 'project',
              title: '프로젝트 완료',
              description: '프로젝트를 완료했습니다!',
              timestamp: new Date().toISOString(),
              icon: '🚀',
            });
          }
        });
      },

      earnBadge: (badgeId: string) => {
        set((state) => {
          if (!state.progress.earnedBadges.includes(badgeId)) {
            state.progress.earnedBadges.push(badgeId);

            const badge = state.badges.find((b) => b.id === badgeId);
            if (badge) {
              badge.earnedAt = new Date().toISOString();

              state.activities.unshift({
                id: `activity_${Date.now()}`,
                type: 'badge',
                title: '뱃지 획득',
                description: `"${badge.name}" 뱃지를 획득했습니다!`,
                timestamp: new Date().toISOString(),
                icon: badge.icon,
              });
            }
          }
        });
      },

      updateAchievement: (achievementId: string, progress: number) => {
        set((state) => {
          const achievement = state.achievements.find((a) => a.id === achievementId);
          if (achievement) {
            achievement.progress = progress;
            if (progress >= achievement.target && !achievement.completed) {
              achievement.completed = true;

              state.activities.unshift({
                id: `activity_${Date.now()}`,
                type: 'achievement',
                title: '업적 달성',
                description: `"${achievement.title}" 업적을 달성했습니다!`,
                timestamp: new Date().toISOString(),
                exp: achievement.reward,
                icon: achievement.icon,
              });
            }
          }
        });
      },

      addActivity: (activity) => {
        set((state) => {
          state.activities.unshift({
            ...activity,
            id: `activity_${Date.now()}`,
            timestamp: new Date().toISOString(),
          });

          // Keep only last 50 activities
          if (state.activities.length > 50) {
            state.activities = state.activities.slice(0, 50);
          }
        });
      },

      updateDailyChallenge: (progress: number) => {
        set((state) => {
          if (state.dailyChallenge) {
            state.dailyChallenge.progress = progress;
            if (progress >= state.dailyChallenge.target) {
              state.dailyChallenge.completed = true;
            }
          }
        });
      },

      updateWeeklyChallenge: (progress: number) => {
        set((state) => {
          if (state.weeklyChallenge) {
            state.weeklyChallenge.progress = progress;
            if (progress >= state.weeklyChallenge.target) {
              state.weeklyChallenge.completed = true;
            }
          }
        });
      },

      checkDailyReset: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          if (state.progress.dailyChallenges.date !== today) {
            state.progress.dailyChallenges = {
              date: today,
              completed: false,
              challengeId: `daily_${today}`,
            };

            // Generate new daily challenge
            state.dailyChallenge = {
              id: `daily_${today}`,
              type: 'daily',
              title: '오늘의 미션',
              description: '오늘 미션 3개를 완료하세요!',
              task: '미션 3개 완료',
              reward: 100,
              progress: 0,
              target: 3,
              completed: false,
              expiresAt: new Date(today + 'T23:59:59').toISOString(),
            };
          }
        });
      },

      getMissionStatus: (missionId: string) => {
        const { completedMissions } = get().progress;
        return {
          completed: completedMissions.includes(missionId),
          perfect: completedMissions.includes(`${missionId}_perfect`),
        };
      },

      getUnitProgress: (unitId: string) => {
        return get().progress.unitsProgress[unitId];
      },

      resetProgress: () => {
        set((state) => {
          state.progress = defaultProgress;
          state.badges = initialBadges;
          state.achievements = initialAchievements;
          state.dailyChallenge = null;
          state.weeklyChallenge = null;
          state.activities = [];
        });
      },
    })),
    {
      name: 'codequest-progress',
    }
  )
);

// Export badges for external use
export const badges = initialBadges;
