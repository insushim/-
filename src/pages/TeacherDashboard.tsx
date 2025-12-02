import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Copy, CheckCircle, TrendingUp, Clock, Target,
  ChevronRight, Flame, Award, BookOpen, BarChart3, Settings,
  RefreshCw, Search, Filter
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { getClassStudents, subscribeToClassProgress, getStudentProgressData } from '../services/authService';
import type { ClassRoom, Student } from '../types';

const TeacherDashboard: React.FC = () => {
  const { authUser, classes, createClass, loadClasses } = useAuthStore();
  const [selectedClass, setSelectedClass] = useState<ClassRoom | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'progress' | 'lastActive'>('name');

  useEffect(() => {
    if (classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0]);
    }
  }, [classes]);

  useEffect(() => {
    if (selectedClass) {
      setIsLoadingStudents(true);
      loadClassStudents(selectedClass.id);
    }
  }, [selectedClass]);

  const loadClassStudents = async (classId: string) => {
    try {
      const classStudents = await getClassStudents(classId);
      const studentsWithProgress = await Promise.all(
        classStudents.map(async (student) => {
          const progress = await getStudentProgressData(student.uid);
          return {
            ...student,
            progress: progress || { completedMissions: [], unitsProgress: {} },
          };
        })
      );
      setStudents(studentsWithProgress);
    } catch (error) {
      console.error('학생 목록 로딩 실패:', error);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;
    const result = await createClass(newClassName.trim());
    if (result) {
      setSelectedClass(result);
      setNewClassName('');
      setIsCreatingClass(false);
    }
  };

  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // 학생 정렬
  const sortedStudents = [...students].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.displayName.localeCompare(b.displayName);
      case 'level':
        return (b.progress?.level || 0) - (a.progress?.level || 0);
      case 'progress':
        return (b.progress?.completedMissions?.length || 0) - (a.progress?.completedMissions?.length || 0);
      case 'lastActive':
        return new Date(b.progress?.lastActiveDate || 0).getTime() - new Date(a.progress?.lastActiveDate || 0).getTime();
      default:
        return 0;
    }
  });

  // 검색 필터
  const filteredStudents = sortedStudents.filter((student) =>
    student.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 통계 계산
  const classStats = {
    totalStudents: students.length,
    activeToday: students.filter((s) => {
      const lastActive = new Date(s.progress?.lastActiveDate || 0);
      const today = new Date();
      return lastActive.toDateString() === today.toDateString();
    }).length,
    avgMissions: students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.progress?.completedMissions?.length || 0), 0) / students.length)
      : 0,
    avgLevel: students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.progress?.level || 1), 0) / students.length)
      : 0,
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            안녕하세요, {authUser?.displayName} 선생님
          </h1>
          <p className="text-slate-400 mt-1">학급을 관리하고 학생들의 진행 상황을 확인하세요</p>
        </div>
        <button
          onClick={() => setIsCreatingClass(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
        >
          <Plus className="w-5 h-5" />
          새 학급 만들기
        </button>
      </div>

      {/* 학급 선택 탭 */}
      {classes.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedClass?.id === cls.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Users className="w-4 h-4" />
              {cls.name}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedClass?.id === cls.id ? 'bg-white/20' : 'bg-slate-600'
              }`}>
                {cls.studentIds.length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 학급 정보 */}
      {selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* 학급 코드 카드 */}
          <div className="md:col-span-2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl border border-indigo-500/30 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">학급 코드</h3>
              <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full">
                학생에게 공유
              </span>
            </div>
            <div className="flex items-center gap-3">
              <code className="text-3xl font-mono font-bold text-white tracking-widest">
                {selectedClass.joinCode}
              </code>
              <button
                onClick={() => copyClassCode(selectedClass.joinCode)}
                className="p-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg transition-colors"
              >
                {copiedCode === selectedClass.joinCode ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-indigo-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              이 코드를 학생들에게 공유하여 학급에 참여하도록 하세요
            </p>
          </div>

          {/* 통계 카드들 */}
          <div className="bg-slate-700/40 rounded-2xl border border-slate-600/50 p-5">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">전체 학생</span>
            </div>
            <p className="text-3xl font-bold text-white">{classStats.totalStudents}</p>
          </div>

          <div className="bg-slate-700/40 rounded-2xl border border-slate-600/50 p-5">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">오늘 활동</span>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{classStats.activeToday}</p>
          </div>
        </motion.div>
      )}

      {/* 학생 목록 */}
      {selectedClass && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
        >
          {/* 헤더 */}
          <div className="p-4 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              학생 목록
            </h3>

            <div className="flex items-center gap-2">
              {/* 검색 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="이름 검색..."
                  className="pl-9 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-40"
                />
              </div>

              {/* 정렬 */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="name">이름순</option>
                <option value="level">레벨순</option>
                <option value="progress">진행도순</option>
                <option value="lastActive">최근 활동순</option>
              </select>

              {/* 새로고침 */}
              <button
                onClick={() => loadClassStudents(selectedClass.id)}
                className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 text-slate-400 ${isLoadingStudents ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* 학생 테이블 */}
          {isLoadingStudents ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400">학생 정보를 불러오는 중...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">
                {students.length === 0 ? '아직 참여한 학생이 없습니다' : '검색 결과가 없습니다'}
              </p>
              {students.length === 0 && (
                <p className="text-slate-500 text-sm">
                  학급 코드 <code className="text-indigo-400">{selectedClass.joinCode}</code>를 학생들에게 공유하세요
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                    <th className="px-4 py-3 font-medium">학생</th>
                    <th className="px-4 py-3 font-medium text-center">레벨</th>
                    <th className="px-4 py-3 font-medium text-center">완료 미션</th>
                    <th className="px-4 py-3 font-medium text-center">연속 학습</th>
                    <th className="px-4 py-3 font-medium">최근 활동</th>
                    <th className="px-4 py-3 font-medium text-center">진행률</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => {
                    const completedMissions = student.progress?.completedMissions?.length || 0;
                    const totalMissions = 400; // 전체 미션 수
                    const progressPercent = Math.round((completedMissions / totalMissions) * 100);
                    const lastActive = student.progress?.lastActiveDate
                      ? new Date(student.progress.lastActiveDate)
                      : null;
                    const isActiveToday = lastActive?.toDateString() === new Date().toDateString();

                    return (
                      <motion.tr
                        key={student.uid}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {student.displayName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{student.displayName}</p>
                              <p className="text-xs text-slate-500">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-lg font-bold text-sm">
                            Lv.{student.progress?.level || 1}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-white font-medium">{completedMissions}</span>
                          <span className="text-slate-500 text-sm">/{totalMissions}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 ${
                            (student.progress?.streak || 0) > 0 ? 'text-orange-400' : 'text-slate-500'
                          }`}>
                            <Flame className="w-4 h-4" />
                            {student.progress?.streak || 0}일
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {lastActive ? (
                            <span className={`text-sm ${isActiveToday ? 'text-emerald-400' : 'text-slate-400'}`}>
                              {isActiveToday ? '오늘' : lastActive.toLocaleDateString('ko-KR')}
                            </span>
                          ) : (
                            <span className="text-slate-500 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 w-10 text-right">
                              {progressPercent}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {/* 학급이 없을 때 */}
      {classes.length === 0 && !isCreatingClass && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/50 rounded-3xl border border-slate-700/50 p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center">
            <Users className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">첫 학급을 만들어보세요!</h3>
          <p className="text-slate-400 mb-6">
            학급을 만들면 학생들을 초대하고<br />
            학습 진행 상황을 관리할 수 있습니다
          </p>
          <button
            onClick={() => setIsCreatingClass(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-5 h-5" />
            학급 만들기
          </button>
        </motion.div>
      )}

      {/* 학급 생성 모달 */}
      <AnimatePresence>
        {isCreatingClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCreatingClass(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-4">새 학급 만들기</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">학급 이름</label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="예: 5학년 1반"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsCreatingClass(false)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleCreateClass}
                  disabled={!newClassName.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  만들기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherDashboard;
