import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { AuthUser, ClassRoom, UserRole } from '../types';
import {
  login as authLogin,
  logout as authLogout,
  registerTeacher,
  registerStudent,
  getCurrentUser,
  onAuthChange,
  getTeacherClasses,
  createClassRoom,
  getPendingTeachers,
  approveTeacher,
  rejectTeacher,
} from '../services/authService';

interface AuthState {
  // 상태
  authUser: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  classes: ClassRoom[];
  pendingTeachers: AuthUser[];

  // 액션
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  registerAsTeacher: (email: string, password: string, name: string, school?: string) => Promise<boolean>;
  registerAsStudent: (email: string, password: string, name: string, classCode: string) => Promise<boolean>;
  initAuth: () => void;
  clearError: () => void;

  // 선생님 기능
  loadClasses: () => Promise<void>;
  createClass: (className: string) => Promise<ClassRoom | null>;

  // 관리자 기능
  loadPendingTeachers: () => Promise<void>;
  approveTeacherAccount: (teacherId: string) => Promise<boolean>;
  rejectTeacherAccount: (teacherId: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      authUser: null,
      isLoading: true,
      isAuthenticated: false,
      error: null,
      classes: [],
      pendingTeachers: [],

      login: async (email: string, password: string) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const result = await authLogin(email, password);

        if (result.success && result.user) {
          set((state) => {
            state.authUser = result.user!;
            state.isAuthenticated = true;
            state.isLoading = false;
          });

          // 선생님이면 학급 로드
          if (result.user.role === 'teacher') {
            get().loadClasses();
          }

          return true;
        } else {
          set((state) => {
            state.error = result.error || '로그인 실패';
            state.isLoading = false;
          });
          return false;
        }
      },

      logout: async () => {
        await authLogout();
        set((state) => {
          state.authUser = null;
          state.isAuthenticated = false;
          state.classes = [];
          state.pendingTeachers = [];
        });
      },

      registerAsTeacher: async (email, password, name, school) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const result = await registerTeacher(email, password, name, school);

        set((state) => {
          state.isLoading = false;
          if (!result.success) {
            state.error = result.error || '회원가입 실패';
          }
        });

        return result.success;
      },

      registerAsStudent: async (email, password, name, classCode) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const result = await registerStudent(email, password, name, classCode);

        if (result.success && result.user) {
          set((state) => {
            state.authUser = result.user!;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
          return true;
        } else {
          set((state) => {
            state.error = result.error || '회원가입 실패';
            state.isLoading = false;
          });
          return false;
        }
      },

      initAuth: () => {
        // Firebase 인증 상태 리스너
        onAuthChange((user) => {
          set((state) => {
            state.authUser = user;
            state.isAuthenticated = !!user;
            state.isLoading = false;
          });

          if (user?.role === 'teacher') {
            get().loadClasses();
          }
          if (user?.role === 'admin') {
            get().loadPendingTeachers();
          }
        });
      },

      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      loadClasses: async () => {
        const authUser = get().authUser;
        if (!authUser || authUser.role !== 'teacher') return;

        try {
          const classes = await getTeacherClasses(authUser.uid);
          set((state) => {
            state.classes = classes;
          });
        } catch (error) {
          console.error('학급 로딩 실패:', error);
        }
      },

      createClass: async (className: string) => {
        const authUser = get().authUser;
        if (!authUser || authUser.role !== 'teacher') return null;

        const result = await createClassRoom(authUser.uid, authUser.displayName, className);

        if (result.success && result.classRoom) {
          set((state) => {
            state.classes.push(result.classRoom!);
          });
          return result.classRoom;
        }
        return null;
      },

      loadPendingTeachers: async () => {
        const authUser = get().authUser;
        if (!authUser || authUser.role !== 'admin') return;

        try {
          const teachers = await getPendingTeachers();
          set((state) => {
            state.pendingTeachers = teachers;
          });
        } catch (error) {
          console.error('승인 대기 선생님 로딩 실패:', error);
        }
      },

      approveTeacherAccount: async (teacherId: string) => {
        const authUser = get().authUser;
        if (!authUser || authUser.role !== 'admin') return false;

        const result = await approveTeacher(teacherId, authUser.uid);

        if (result.success) {
          set((state) => {
            state.pendingTeachers = state.pendingTeachers.filter(
              (t) => t.uid !== teacherId
            );
          });
        }
        return result.success;
      },

      rejectTeacherAccount: async (teacherId: string) => {
        const authUser = get().authUser;
        if (!authUser || authUser.role !== 'admin') return false;

        const result = await rejectTeacher(teacherId, authUser.uid);

        if (result.success) {
          set((state) => {
            state.pendingTeachers = state.pendingTeachers.filter(
              (t) => t.uid !== teacherId
            );
          });
        }
        return result.success;
      },
    })),
    {
      name: 'codequest-auth',
      partialize: (state) => ({
        // 민감한 정보 제외, 기본 정보만 저장
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
