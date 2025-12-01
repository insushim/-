import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User, UserSettings, UserStats } from '../types';

const LEVEL_THRESHOLDS: Record<number, { exp: number; title: string }> = {
  1: { exp: 0, title: '코딩 새싹' },
  2: { exp: 100, title: '코딩 새싹' },
  3: { exp: 250, title: '코딩 새싹' },
  4: { exp: 450, title: '코딩 새싹' },
  5: { exp: 700, title: '코딩 새싹' },
  10: { exp: 1000, title: '코딩 탐험가' },
  15: { exp: 2000, title: '코딩 탐험가' },
  20: { exp: 3000, title: '주니어 개발자' },
  25: { exp: 4500, title: '주니어 개발자' },
  30: { exp: 6000, title: '코드 마법사' },
  35: { exp: 8000, title: '코드 마법사' },
  40: { exp: 10000, title: '알고리즘 기사' },
  45: { exp: 12500, title: '알고리즘 기사' },
  50: { exp: 15000, title: '풀스택 견습생' },
  55: { exp: 18000, title: '풀스택 견습생' },
  60: { exp: 21000, title: '프로젝트 빌더' },
  65: { exp: 24500, title: '프로젝트 빌더' },
  70: { exp: 28000, title: '테크 리더' },
  75: { exp: 32000, title: '테크 리더' },
  80: { exp: 36000, title: '코드 마스터' },
  85: { exp: 40500, title: '코드 마스터' },
  90: { exp: 45000, title: '디지털 아키텍트' },
  95: { exp: 50000, title: '디지털 아키텍트' },
  100: { exp: 55000, title: '레전드 코더' },
};

const calculateLevel = (totalExp: number): { level: number; title: string; expForNext: number; expInLevel: number } => {
  let level = 1;
  let title = '코딩 새싹';

  const sortedLevels = Object.entries(LEVEL_THRESHOLDS)
    .map(([lvl, data]) => ({ level: parseInt(lvl), ...data }))
    .sort((a, b) => a.exp - b.exp);

  for (let i = 0; i < sortedLevels.length; i++) {
    if (totalExp >= sortedLevels[i].exp) {
      level = sortedLevels[i].level;
      title = sortedLevels[i].title;
    } else {
      break;
    }
  }

  const currentThreshold = sortedLevels.find(l => l.level === level);
  const nextThreshold = sortedLevels.find(l => l.level > level);

  const expForNext = nextThreshold ? nextThreshold.exp - totalExp : 0;
  const expInLevel = currentThreshold && nextThreshold
    ? ((totalExp - currentThreshold.exp) / (nextThreshold.exp - currentThreshold.exp)) * 100
    : 100;

  return { level, title, expForNext, expInLevel: Math.min(100, expInLevel) };
};

interface UserState {
  user: User | null;
  isInitialized: boolean;

  // Actions
  initUser: (name: string) => void;
  addExp: (amount: number) => void;
  updateStreak: () => void;
  updateStats: (stats: Partial<UserStats>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetUser: () => void;
  getExpProgress: () => { current: number; next: number; percentage: number };
}

const defaultSettings: UserSettings = {
  theme: 'system',
  fontSize: 14,
  soundEnabled: true,
  musicEnabled: false,
  notificationsEnabled: true,
  tutorPersonality: 'friendly',
  language: 'ko',
};

const defaultStats: UserStats = {
  totalMissionsCompleted: 0,
  totalProjectsCompleted: 0,
  totalCodeWritten: 0,
  totalTimeSpent: 0,
  perfectScores: 0,
  hintsUsed: 0,
  aiConversations: 0,
  longestStreak: 0,
  averageAccuracy: 0,
};

export const useUserStore = create<UserState>()(
  persist(
    immer((set, get) => ({
      user: null,
      isInitialized: false,

      initUser: (name: string) => {
        const id = `user_${Date.now()}`;
        const today = new Date().toISOString().split('T')[0];

        set((state) => {
          state.user = {
            id,
            name,
            avatar: '🧑‍💻',
            level: 1,
            exp: 0,
            totalExp: 0,
            title: '코딩 새싹',
            streak: 1,
            longestStreak: 1,
            lastActiveDate: today,
            createdAt: new Date().toISOString(),
            settings: defaultSettings,
            stats: defaultStats,
          };
          state.isInitialized = true;
        });
      },

      addExp: (amount: number) => {
        set((state) => {
          if (!state.user) return;

          state.user.totalExp += amount;
          const { level, title, expInLevel } = calculateLevel(state.user.totalExp);

          const leveledUp = level > state.user.level;
          state.user.level = level;
          state.user.title = title;
          state.user.exp = expInLevel;

          if (leveledUp) {
            // Could trigger a level up animation/notification here
          }
        });
      },

      updateStreak: () => {
        set((state) => {
          if (!state.user) return;

          const today = new Date().toISOString().split('T')[0];
          const lastActive = state.user.lastActiveDate;

          if (lastActive === today) return;

          const lastDate = new Date(lastActive);
          const todayDate = new Date(today);
          const diffTime = todayDate.getTime() - lastDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            state.user.streak += 1;
            if (state.user.streak > state.user.longestStreak) {
              state.user.longestStreak = state.user.streak;
            }
          } else if (diffDays > 1) {
            state.user.streak = 1;
          }

          state.user.lastActiveDate = today;
        });
      },

      updateStats: (stats: Partial<UserStats>) => {
        set((state) => {
          if (!state.user) return;
          state.user.stats = { ...state.user.stats, ...stats };
        });
      },

      updateSettings: (settings: Partial<UserSettings>) => {
        set((state) => {
          if (!state.user) return;
          state.user.settings = { ...state.user.settings, ...settings };
        });
      },

      resetUser: () => {
        set((state) => {
          state.user = null;
          state.isInitialized = false;
        });
      },

      getExpProgress: () => {
        const user = get().user;
        if (!user) return { current: 0, next: 100, percentage: 0 };

        const sortedLevels = Object.entries(LEVEL_THRESHOLDS)
          .map(([lvl, data]) => ({ level: parseInt(lvl), ...data }))
          .sort((a, b) => a.exp - b.exp);

        const currentThreshold = sortedLevels.find(l => l.level === user.level);
        const nextThreshold = sortedLevels.find(l => l.level > user.level);

        const current = currentThreshold ? user.totalExp - currentThreshold.exp : user.totalExp;
        const next = nextThreshold && currentThreshold
          ? nextThreshold.exp - currentThreshold.exp
          : 1000;
        const percentage = (current / next) * 100;

        return { current, next, percentage: Math.min(100, percentage) };
      },
    })),
    {
      name: 'codequest-user',
    }
  )
);
