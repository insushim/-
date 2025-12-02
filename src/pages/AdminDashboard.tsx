import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Building,
  Calendar,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  UserCheck,
  UserX,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import type { AuthUser } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    authUser,
    pendingTeachers,
    loadPendingTeachers,
    approveTeacherAccount,
    rejectTeacherAccount,
    isLoading,
  } = useAuthStore();

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!authUser || authUser.role !== 'admin') {
      navigate('/login');
      return;
    }
    loadPendingTeachers();
  }, [authUser, navigate, loadPendingTeachers]);

  const handleApprove = async (teacherId: string, teacherName: string) => {
    setProcessingId(teacherId);
    setActionResult(null);

    const success = await approveTeacherAccount(teacherId);

    if (success) {
      setActionResult({
        type: 'success',
        message: `${teacherName} 선생님을 승인했습니다.`,
      });
    } else {
      setActionResult({
        type: 'error',
        message: '승인 처리 중 오류가 발생했습니다.',
      });
    }

    setProcessingId(null);

    // 3초 후 메시지 숨김
    setTimeout(() => setActionResult(null), 3000);
  };

  const handleReject = async (teacherId: string, teacherName: string) => {
    if (!confirm(`${teacherName} 선생님의 가입을 거절하시겠습니까?`)) {
      return;
    }

    setProcessingId(teacherId);
    setActionResult(null);

    const success = await rejectTeacherAccount(teacherId);

    if (success) {
      setActionResult({
        type: 'success',
        message: `${teacherName} 선생님의 가입을 거절했습니다.`,
      });
    } else {
      setActionResult({
        type: 'error',
        message: '거절 처리 중 오류가 발생했습니다.',
      });
    }

    setProcessingId(null);
    setTimeout(() => setActionResult(null), 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!authUser || authUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 헤더 */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">관리자 대시보드</h1>
                  <p className="text-sm text-slate-400">선생님 가입 승인 관리</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => loadPendingTeachers()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              새로고침
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 알림 메시지 */}
        <AnimatePresence>
          {actionResult && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                actionResult.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {actionResult.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {actionResult.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingTeachers.length}</p>
                <p className="text-sm text-slate-400">승인 대기</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">-</p>
                <p className="text-sm text-slate-400">승인 완료</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">-</p>
                <p className="text-sm text-slate-400">전체 선생님</p>
              </div>
            </div>
          </div>
        </div>

        {/* 승인 대기 목록 */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              승인 대기 중인 선생님
            </h2>
          </div>

          {pendingTeachers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-slate-400">승인 대기 중인 선생님이 없습니다</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {pendingTeachers.map((teacher) => (
                <motion.div
                  key={teacher.uid}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 hover:bg-slate-700/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {teacher.displayName.charAt(0)}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {teacher.displayName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {teacher.email}
                            </span>
                            {(teacher as any).school && (
                              <span className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {(teacher as any).school}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          가입 신청: {formatDate(teacher.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReject(teacher.uid, teacher.displayName)}
                        disabled={processingId === teacher.uid}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl transition-colors disabled:opacity-50"
                      >
                        <UserX className="w-4 h-4" />
                        거절
                      </button>
                      <button
                        onClick={() => handleApprove(teacher.uid, teacher.displayName)}
                        disabled={processingId === teacher.uid}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {processingId === teacher.uid ? (
                          <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                        승인
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-sm text-blue-300">
            <strong>안내:</strong> 선생님 가입을 승인하면 해당 선생님은 즉시 로그인하여
            학급을 생성하고 학생들을 관리할 수 있습니다. 거절된 계정은 삭제됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
