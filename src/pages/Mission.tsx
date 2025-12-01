import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Trophy, ChevronRight } from 'lucide-react';
import { Card, Button, Modal, ConfettiEffect } from '../components/Common';
import { CodeWorkspace } from '../components/Editor';
import { getMissionById, getUnitById, allUnits } from '../data/curriculum';
import { useMissionStore } from '../stores/missionStore';
import { useProgressStore } from '../stores/progressStore';
import { useUserStore } from '../stores/userStore';
import type { Mission as MissionType } from '../types';

const Mission: React.FC = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { setCurrentMission, elapsedTime, startTimer, stopTimer, hintsUsed } = useMissionStore();
  const { completeMission, earnBadge, addActivity } = useProgressStore();
  const { addExp, user } = useUserStore();

  const [mission, setMission] = useState<MissionType | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [earnedExp, setEarnedExp] = useState(0);
  const [nextMission, setNextMission] = useState<MissionType | null>(null);
  const [celebrateConfetti, setCelebrateConfetti] = useState(false);

  useEffect(() => {
    if (missionId) {
      const found = getMissionById(missionId);
      if (found) {
        setMission(found);
        setCurrentMission(found);
        startTimer();
      }
    }
  }, [missionId, setCurrentMission, startTimer]);

  const handleComplete = (perfect: boolean) => {
    if (!mission) return;

    const time = stopTimer();

    // 경험치 계산
    let exp = mission.exp;
    if (perfect) exp += 50; // 완벽 보너스
    if (hintsUsed === 0) exp += 30; // 힌트 미사용 보너스
    if (time < mission.estimatedMinutes * 60 * 0.5) exp += 20; // 빠른 완료 보너스

    setEarnedExp(exp);
    addExp(exp);

    // 미션 완료 처리
    const unitId = findUnitForMission(mission.id);
    if (unitId) {
      completeMission(mission.id, unitId, perfect);
    }

    // 첫 미션 완료 뱃지
    if (user && user.stats.totalMissionsCompleted === 0) {
      earnBadge('first_code');
    }

    // 다음 미션 찾기
    const next = findNextMission(mission.id);
    setNextMission(next);

    // 축하 효과
    setCelebrateConfetti(true);
    setShowComplete(true);
  };

  const findUnitForMission = (missionId: string): string | null => {
    for (const unit of allUnits) {
      for (const week of unit.weeks) {
        if (week.missions.some(m => m.id === missionId)) {
          return unit.id;
        }
      }
    }
    return null;
  };

  const findNextMission = (currentMissionId: string): MissionType | null => {
    for (const unit of allUnits) {
      for (const week of unit.weeks) {
        const missionIndex = week.missions.findIndex(m => m.id === currentMissionId);
        if (missionIndex !== -1) {
          // 같은 주에 다음 미션이 있으면
          if (missionIndex < week.missions.length - 1) {
            return week.missions[missionIndex + 1];
          }
          // 다음 주 첫 미션
          const weekIndex = unit.weeks.indexOf(week);
          if (weekIndex < unit.weeks.length - 1) {
            return unit.weeks[weekIndex + 1].missions[0];
          }
        }
      }
    }
    return null;
  };

  if (!mission) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ConfettiEffect trigger={celebrateConfetti} type="stars" />

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{mission.title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">{mission.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">~{mission.estimatedMinutes}분</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-600">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">+{mission.exp} XP</span>
          </div>
        </div>
      </div>

      {/* Mission Content */}
      {mission.type === 'coding' ? (
        <div className="flex-1 min-h-0">
          <CodeWorkspace mission={mission} onComplete={handleComplete} />
        </div>
      ) : (
        <Card className="flex-1 p-6">
          <p className="text-center text-slate-500">
            이 미션 타입({mission.type})은 아직 준비 중입니다.
          </p>
          <div className="mt-4 text-center">
            <Button onClick={() => handleComplete(true)}>완료로 표시</Button>
          </div>
        </Card>
      )}

      {/* Completion Modal */}
      <Modal isOpen={showComplete} onClose={() => setShowComplete(false)} title="미션 완료!" size="md">
        <div className="text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-2">축하해요! 🎉</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {mission.title} 미션을 완료했어요!
          </p>

          {/* Rewards */}
          <div className="bg-slate-50 dark:bg-dark-surfaceHover rounded-xl p-4 mb-6">
            <h3 className="font-medium mb-3">획득한 보상</h3>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">+{earnedExp}</div>
                <div className="text-xs text-slate-500">경험치</div>
              </div>
              {hintsUsed === 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">+30</div>
                  <div className="text-xs text-slate-500">힌트 미사용 보너스</div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => navigate('/learn')}
            >
              학습 목록
            </Button>
            {nextMission ? (
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => navigate(`/mission/${nextMission.id}`)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                다음 미션
              </Button>
            ) : (
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => navigate('/learn')}
              >
                계속 학습
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Mission;
