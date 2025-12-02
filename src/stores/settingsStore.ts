import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 환경변수에서 API 키 가져오기 (안전하게)
const getEnvApiKey = (): string | null => {
  try {
    return import.meta.env.VITE_GEMINI_API_KEY || null;
  } catch {
    return null;
  }
};

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  sidebarCollapsed: boolean;
  editorTheme: 'vs-dark' | 'light';
  geminiApiKey: string | null;

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleSidebar: () => void;
  setEditorTheme: (theme: 'vs-dark' | 'light') => void;
  setGeminiApiKey: (key: string) => void;
  getEffectiveTheme: () => 'light' | 'dark';
  initializeApiKey: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      fontSize: 'medium',
      soundEnabled: true,
      musicEnabled: false,
      notificationsEnabled: true,
      sidebarCollapsed: false,
      editorTheme: 'vs-dark',
      geminiApiKey: getEnvApiKey(),

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      setFontSize: (size) => {
        set({ fontSize: size });
      },

      setSoundEnabled: (enabled) => {
        set({ soundEnabled: enabled });
      },

      setNotificationsEnabled: (enabled) => {
        set({ notificationsEnabled: enabled });
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      toggleMusic: () => {
        set((state) => ({ musicEnabled: !state.musicEnabled }));
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },

      setEditorTheme: (theme) => {
        set({ editorTheme: theme });
      },

      setGeminiApiKey: (key) => {
        set({ geminiApiKey: key });
      },

      initializeApiKey: () => {
        const currentKey = get().geminiApiKey;
        const envKey = getEnvApiKey();
        // 환경변수에 키가 있고, 현재 설정된 키가 없으면 환경변수 키 사용
        if (envKey && !currentKey) {
          set({ geminiApiKey: envKey });
        }
      },

      getEffectiveTheme: () => {
        const { theme } = get();
        if (theme === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        }
        return theme;
      },
    }),
    {
      name: 'codequest-settings',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  const effectiveTheme =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useSettingsStore.getState();
    if (theme === 'system') {
      applyTheme('system');
    }
  });
}
