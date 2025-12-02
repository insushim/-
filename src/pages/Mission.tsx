import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, Star, Trophy, ChevronRight, Lightbulb,
  Play, CheckCircle, XCircle, Shuffle, GripVertical
} from 'lucide-react';
import { CodeWorkspace } from '../components/Editor';
import { getMissionById, allUnits } from '../data/curriculum';
import { useMissionStore } from '../stores/missionStore';
import { useProgressStore } from '../stores/progressStore';
import { useUserStore } from '../stores/userStore';
import type { Mission as MissionType } from '../types';

const Mission: React.FC = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { setCurrentMission, startTimer, stopTimer, hintsUsed, useHint } = useMissionStore();
  const { completeMission, earnBadge } = useProgressStore();
  const { addExp, user } = useUserStore();

  const [mission, setMission] = useState<MissionType | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [earnedExp, setEarnedExp] = useState(0);
  const [nextMission, setNextMission] = useState<MissionType | null>(null);
  const [showHints, setShowHints] = useState(false);

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
    let exp = mission.exp;
    if (perfect) exp += 50;
    if (hintsUsed === 0) exp += 30;
    if (time < mission.estimatedMinutes * 60 * 0.5) exp += 20;

    setEarnedExp(exp);
    addExp(exp);

    const unitId = findUnitForMission(mission.id);
    if (unitId) {
      completeMission(mission.id, unitId, perfect);
    }

    if (user && user.stats.totalMissionsCompleted === 0) {
      earnBadge('first_code');
    }

    const next = findNextMission(mission.id);
    setNextMission(next);
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
          if (missionIndex < week.missions.length - 1) {
            return week.missions[missionIndex + 1];
          }
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
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border-2 border-gray-900 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-black px-2 py-1 rounded border-2 border-gray-900 ${
                mission.difficulty === 'beginner' ? 'bg-emerald-200' :
                mission.difficulty === 'intermediate' ? 'bg-yellow-200' : 'bg-red-200'
              }`}>
                {mission.difficulty === 'beginner' ? '초급' :
                 mission.difficulty === 'intermediate' ? '중급' : '고급'}
              </span>
              {mission.language && (
                <span className="text-xs font-bold px-2 py-1 rounded bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  {mission.language}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">{mission.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{mission.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">~{mission.estimatedMinutes}분</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl border-2 border-yellow-300 dark:border-yellow-800">
            <Star className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">+{mission.exp} XP</span>
          </div>
        </div>
      </div>

      {/* Hints Section */}
      {mission.hints && mission.hints.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => {
              setShowHints(!showHints);
              if (!showHints) useHint();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium text-sm">힌트 {showHints ? '숨기기' : '보기'}</span>
          </button>

          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800"
            >
              <ul className="space-y-2">
                {mission.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-bold">💡</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}

      {/* Mission Content */}
      <div className="flex-1 min-h-[500px]">
        {mission.type === 'coding' ? (
          <CodeWorkspace mission={mission} onComplete={handleComplete} />
        ) : mission.type === 'drag-drop' ? (
          <DragDropMission mission={mission} onComplete={handleComplete} />
        ) : mission.type === 'pattern-recognition' ? (
          <PatternMission mission={mission} onComplete={handleComplete} />
        ) : mission.type === 'quiz' ? (
          <QuizMission mission={mission} onComplete={handleComplete} />
        ) : mission.type === 'visual-programming' ? (
          <VisualProgrammingMission mission={mission} onComplete={handleComplete} />
        ) : mission.type === 'writing' ? (
          <WritingMission mission={mission} onComplete={handleComplete} />
        ) : mission.type === 'visual-puzzle' ? (
          <VisualPuzzleMission mission={mission} onComplete={handleComplete} />
        ) : (
          <InteractiveMission mission={mission} onComplete={handleComplete} />
        )}
      </div>

      {/* Completion Modal */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-900 dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center border-4 border-gray-900"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">미션 완료! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {mission.title} 미션을 성공적으로 완료했어요!
            </p>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-6 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold mb-4 text-gray-900 dark:text-white">획득한 보상</h3>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-500">+{earnedExp}</div>
                  <div className="text-xs text-gray-500 font-medium">경험치</div>
                </div>
                {hintsUsed === 0 && (
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-500">+30</div>
                    <div className="text-xs text-gray-500 font-medium">힌트 미사용</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/learn')}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                학습 목록
              </button>
              {nextMission ? (
                <button
                  onClick={() => {
                    setShowComplete(false);
                    navigate(`/mission/${nextMission.id}`);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  다음 미션 <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/learn')}
                  className="flex-1 px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors"
                >
                  계속 학습
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Drag & Drop Mission Component
const DragDropMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [items, setItems] = useState<string[]>([]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    if (mission.blocks) {
      const shuffled = [...mission.blocks].sort(() => Math.random() - 0.5);
      setItems(shuffled);
      setUserOrder([]);
    }
  }, [mission.blocks]);

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (index: number) => {
    if (draggedItem) {
      const newOrder = [...userOrder];
      newOrder.splice(index, 0, draggedItem);
      setUserOrder(newOrder);
      setItems(items.filter(i => i !== draggedItem));
      setDraggedItem(null);
    }
  };

  const handleRemove = (item: string) => {
    setUserOrder(userOrder.filter(i => i !== item));
    setItems([...items, item]);
  };

  const handleSubmit = () => {
    if (mission.blocks && userOrder.length === mission.blocks.length) {
      const isCorrect = JSON.stringify(userOrder) === JSON.stringify(mission.blocks);
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) {
        setTimeout(() => onComplete(true), 1500);
      }
    }
  };

  const handleReset = () => {
    if (mission.blocks) {
      const shuffled = [...mission.blocks].sort(() => Math.random() - 0.5);
      setItems(shuffled);
      setUserOrder([]);
      setFeedback('none');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">블록을 올바른 순서로 배열하세요</h3>

      {/* Available Items */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500 mb-2">사용 가능한 블록:</p>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
          {items.map((item, index) => (
            <motion.div
              key={`available-${index}`}
              draggable
              onDragStart={() => handleDragStart(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 rounded-lg border-2 border-violet-300 dark:border-violet-700 cursor-grab font-medium flex items-center gap-2"
            >
              <GripVertical className="w-4 h-4" />
              {item}
            </motion.div>
          ))}
          {items.length === 0 && (
            <span className="text-gray-400 text-sm">모든 블록을 배치했어요!</span>
          )}
        </div>
      </div>

      {/* Drop Zone */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500 mb-2">정답 영역 (순서대로 배치):</p>
        <div
          className={`min-h-[120px] p-4 rounded-xl border-2 border-dashed transition-colors ${
            feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' :
            feedback === 'incorrect' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
            'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50'
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(userOrder.length)}
        >
          <div className="flex flex-col gap-2">
            {userOrder.map((item, index) => (
              <motion.div
                key={`order-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`px-4 py-3 rounded-lg border-2 font-medium flex items-center justify-between ${
                  feedback === 'correct' ? 'bg-emerald-100 border-emerald-400 text-emerald-800' :
                  feedback === 'incorrect' ? 'bg-red-100 border-red-400 text-red-800' :
                  'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {item}
                </span>
                {feedback === 'none' && (
                  <button
                    onClick={() => handleRemove(item)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <XCircle className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </motion.div>
            ))}
            {userOrder.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                블록을 여기로 드래그하세요
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback !== 'none' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${
            feedback === 'correct' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200' :
            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          }`}
        >
          {feedback === 'correct' ? (
            <>
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">정답입니다! 🎉</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6" />
              <span className="font-bold">다시 시도해보세요</span>
            </>
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          초기화
        </button>
        <button
          onClick={handleSubmit}
          disabled={userOrder.length !== mission.blocks?.length}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          제출하기
        </button>
      </div>
    </div>
  );
};

// Pattern Recognition Mission
const PatternMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');

  // Sample patterns - would be better from mission data
  const patterns = [
    { sequence: [2, 4, 6, 8, '?'], answer: '10', hint: '2씩 증가' },
    { sequence: [1, 1, 2, 3, 5, '?'], answer: '8', hint: '피보나치 수열' },
    { sequence: [1, 4, 9, 16, '?'], answer: '25', hint: '제곱수' },
  ];
  const [currentPattern] = useState(() => patterns[Math.floor(Math.random() * patterns.length)]);

  const handleSubmit = () => {
    if (answer === currentPattern.answer) {
      setFeedback('correct');
      setTimeout(() => onComplete(true), 1500);
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">패턴을 찾아 ?에 들어갈 숫자를 입력하세요</h3>

      <div className="flex justify-center gap-4 mb-8">
        {currentPattern.sequence.map((item, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-2xl font-black rounded-xl border-2 ${
              item === '?'
                ? 'border-violet-500 bg-violet-100 dark:bg-violet-900/30 text-violet-600'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200'
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="max-w-xs mx-auto">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="정답 입력"
          className="w-full px-4 py-3 text-center text-xl font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-violet-500"
        />

        {feedback !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-xl text-center font-bold ${
              feedback === 'correct' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback === 'correct' ? '정답! 🎉' : `틀렸어요. 힌트: ${currentPattern.hint}`}
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};

// Quiz Mission
const QuizMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sample quiz - would be better from mission data
  const quiz = {
    question: mission.description || '다음 중 올바른 것은?',
    options: ['알고리즘은 프로그래밍 언어다', '알고리즘은 문제 해결 절차다', '알고리즘은 컴퓨터 부품이다', '알고리즘은 게임 이름이다'],
    correctAnswer: 1,
    explanation: '알고리즘은 문제를 해결하기 위한 단계별 절차입니다.'
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedAnswer === quiz.correctAnswer) {
      setTimeout(() => onComplete(true), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{quiz.question}</h3>

      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && setSelectedAnswer(index)}
            disabled={isSubmitted}
            className={`w-full p-4 text-left rounded-xl border-2 font-medium transition-all ${
              isSubmitted
                ? index === quiz.correctAnswer
                  ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                  : index === selectedAnswer
                    ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    : 'border-gray-200 dark:border-gray-600 text-gray-400'
                : selectedAnswer === index
                  ? 'border-violet-500 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-800 dark:text-gray-200'
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isSubmitted && index === quiz.correctAnswer ? 'bg-emerald-500 text-white' :
                isSubmitted && index === selectedAnswer ? 'bg-red-500 text-white' :
                selectedAnswer === index ? 'bg-violet-500 text-white' :
                'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${
            selectedAnswer === quiz.correctAnswer
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
          }`}
        >
          <p className="font-bold mb-1">
            {selectedAnswer === quiz.correctAnswer ? '정답입니다! 🎉' : '아쉽네요!'}
          </p>
          <p className="text-sm">{quiz.explanation}</p>
        </motion.div>
      )}

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          제출하기
        </button>
      )}
    </div>
  );
};

// Visual Programming Mission - 다양한 블록 코딩 활동
const VisualProgrammingMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  // 미션 유형 감지 (미션 제목/설명 기반)
  const getMissionType = (): 'move' | 'dialogue' | 'color' | 'sound' | 'animation' | 'coordinate' | 'size' | 'rotate' | 'visibility' | 'star' | 'shape' | 'general' => {
    const title = mission.title.toLowerCase();
    const desc = mission.description.toLowerCase();
    const concept = mission.concept?.toLowerCase() || '';

    if (title.includes('별') || desc.includes('별을 그') || concept.includes('별')) return 'star';
    if (title.includes('사각형') || title.includes('육각형') || desc.includes('다각형') || concept.includes('다각형')) return 'shape';
    if (title.includes('움직') || title.includes('이동') || desc.includes('이동') || concept.includes('이동')) return 'move';
    if (title.includes('대화') || title.includes('말하') || desc.includes('묻') || concept.includes('입출력')) return 'dialogue';
    if (title.includes('색깔') || title.includes('색상') || desc.includes('색깔') || concept.includes('효과')) return 'color';
    if (title.includes('소리') || desc.includes('소리') || concept.includes('소리')) return 'sound';
    if (title.includes('애니메이션') || title.includes('모양') || concept.includes('모양')) return 'animation';
    if (title.includes('좌표') || desc.includes('좌표') || concept.includes('좌표')) return 'coordinate';
    if (title.includes('크기') || desc.includes('크기') || concept.includes('크기')) return 'size';
    if (title.includes('회전') || desc.includes('회전') || concept.includes('회전')) return 'rotate';
    if (title.includes('숨') || title.includes('보이') || concept.includes('보이기')) return 'visibility';
    return 'general';
  };

  const missionType = getMissionType();

  // 각 미션 타입별 렌더링
  if (missionType === 'move') {
    return <MoveMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'dialogue') {
    return <DialogueMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'color') {
    return <ColorMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'sound') {
    return <SoundMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'coordinate') {
    return <CoordinateMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'size') {
    return <SizeMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'rotate') {
    return <RotateMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'visibility') {
    return <VisibilityMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'star') {
    return <StarDrawingMission mission={mission} onComplete={onComplete} />;
  }
  if (missionType === 'shape') {
    return <ShapeDrawingMission mission={mission} onComplete={onComplete} />;
  }

  // 일반 visual-programming 미션
  return <GeneralBlockMission mission={mission} onComplete={onComplete} />;
};

// 캐릭터 이동 미션
const MoveMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [charX, setCharX] = useState(50);
  const [moveValue, setMoveValue] = useState(50);
  const [isComplete, setIsComplete] = useState(false);
  const targetX = 150; // 100px 이동 목표

  const runCode = () => {
    setCharX(50 + moveValue);
    if (moveValue === 100) {
      setIsComplete(true);
      setTimeout(() => onComplete(true), 1000);
    }
  };

  const reset = () => {
    setCharX(50);
    setIsComplete(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🏃 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      {/* 스테이지 */}
      <div className="relative bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-900 dark:to-green-900 rounded-xl h-40 mb-4 border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-400 dark:bg-green-700" />
        {/* 시작점 */}
        <div className="absolute bottom-8 left-12 w-1 h-12 bg-gray-400 dark:bg-gray-500">
          <div className="absolute -top-2 -left-2 text-xs bg-white dark:bg-gray-800 px-1 rounded">시작</div>
        </div>
        {/* 목표점 */}
        <div className="absolute bottom-8 left-[162px] w-1 h-12 bg-emerald-500">
          <div className="absolute -top-2 -left-3 text-xs bg-emerald-100 dark:bg-emerald-900 px-1 rounded text-emerald-700 dark:text-emerald-300">목표</div>
        </div>
        {/* 캐릭터 */}
        <motion.div
          className="absolute bottom-8 text-4xl"
          animate={{ left: charX }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          🐱
        </motion.div>
      </div>

      {/* 블록 코드 영역 */}
      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">
            🚩 깃발 클릭했을 때
          </div>
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium shadow flex items-center gap-2">
            ➡️ 오른쪽으로
            <input
              type="number"
              value={moveValue}
              onChange={(e) => setMoveValue(Number(e.target.value))}
              className="w-16 px-2 py-1 rounded text-gray-900 text-center font-bold"
              min={0}
              max={200}
            />
            픽셀 이동하기
          </div>
        </div>
      </div>

      {/* 힌트 */}
      {mission.hints && mission.hints.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (
              <li key={i}>• {hint}</li>
            ))}
          </ul>
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3"
        >
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">정확히 100픽셀 이동했어요! 🎉</span>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />🚩 실행하기
        </button>
      </div>
    </div>
  );
};

// 대화 미션
const DialogueMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [dialogue, setDialogue] = useState('');

  const runCode = () => {
    setStep(1);
    setShowInput(true);
  };

  const handleSubmitName = () => {
    if (userName.trim()) {
      setShowInput(false);
      setDialogue(`안녕, ${userName}! 반가워! 👋`);
      setStep(2);
      setTimeout(() => onComplete(true), 2000);
    }
  };

  const reset = () => {
    setStep(0);
    setUserName('');
    setShowInput(false);
    setDialogue('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">💬 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      {/* 스테이지 */}
      <div className="relative bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl h-48 mb-4 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">🐱</div>
          {showInput && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border-2 border-violet-300">
              <p className="text-sm font-medium mb-2">이름이 뭐야? 🤔</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="이름 입력..."
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitName()}
                />
                <button onClick={handleSubmitName} className="px-3 py-2 bg-violet-500 text-white rounded-lg font-bold text-sm">확인</button>
              </div>
            </motion.div>
          )}
          {dialogue && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl px-6 py-3 shadow-lg border-2 border-emerald-300">
              <p className="text-lg font-medium">{dialogue}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* 블록 코드 영역 */}
      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">🚩 깃발 클릭했을 때</div>
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow">❓ "이름이 뭐야?" 묻고 기다리기</div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-lg font-medium shadow">💬 "안녕, " + 대답 + "! 반가워!" 말하기</div>
        </div>
      </div>

      {mission.hints && mission.hints.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">대화 프로그램 완성! 🎉</span>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} disabled={step > 0} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />🚩 실행하기
        </button>
      </div>
    </div>
  );
};

// 색깔 변경 미션
const ColorMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [colorEffect, setColorEffect] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setColorEffect((prev) => (prev + 25) % 360);
    setClickCount((prev) => prev + 1);
    if (clickCount >= 2) {
      setTimeout(() => onComplete(true), 500);
    }
  };

  const reset = () => {
    setColorEffect(0);
    setClickCount(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🎨 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="relative bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl h-48 mb-4 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-7xl cursor-pointer"
          style={{ filter: `hue-rotate(${colorEffect}deg)` }}
        >
          🐱
        </motion.button>
        <p className="absolute bottom-3 text-sm text-gray-500 dark:text-gray-400">캐릭터를 클릭하세요!</p>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium shadow">👆 이 스프라이트를 클릭했을 때</div>
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow">🎨 색깔 효과를 25만큼 바꾸기</div>
        </div>
      </div>

      {mission.hints && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {clickCount >= 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">색깔 마법 성공! 🌈</span>
        </motion.div>
      )}

      <button onClick={reset} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
        <Shuffle className="w-4 h-4 inline mr-2" />초기화
      </button>
    </div>
  );
};

// 소리 미션
const SoundMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [charX, setCharX] = useState(50);

  const runCode = () => {
    setIsPlaying(true);
    // 소리 효과 (시뮬레이션)
    setTimeout(() => {
      setCharX(150);
      setIsPlaying(false);
      setTimeout(() => onComplete(true), 500);
    }, 1000);
  };

  const reset = () => {
    setCharX(50);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🔊 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="relative bg-gradient-to-b from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-xl h-40 mb-4 border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
        <motion.div className="absolute bottom-8 text-4xl" animate={{ left: charX }} transition={{ duration: 1 }}>
          🐱
        </motion.div>
        {isPlaying && (
          <motion.div className="absolute top-4 right-4 text-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: 3, duration: 0.3 }}>
            🎵
          </motion.div>
        )}
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">🚩 깃발 클릭했을 때</div>
          <div className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium shadow">🔊 "야옹" 소리 재생하기</div>
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium shadow">➡️ 100픽셀 이동하기</div>
        </div>
      </div>

      {mission.hints && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} disabled={isPlaying} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />🚩 실행하기
        </button>
      </div>
    </div>
  );
};

// 좌표 이동 미션
const CoordinateMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [inputX, setInputX] = useState(100);
  const [inputY, setInputY] = useState(50);

  const runCode = () => {
    setX(inputX);
    setY(inputY);
    if (inputX === 100 && inputY === 50) {
      setTimeout(() => onComplete(true), 1000);
    }
  };

  const reset = () => {
    setX(0);
    setY(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">📍 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="relative bg-gray-100 dark:bg-gray-900 rounded-xl h-64 mb-4 border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
        {/* 좌표축 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">(0,0)</div>
        {/* 목표점 */}
        <div className="absolute text-red-500 text-xl" style={{ left: `calc(50% + 100px)`, top: `calc(50% - 50px)`, transform: 'translate(-50%, -50%)' }}>🎯</div>
        {/* 캐릭터 */}
        <motion.div className="absolute text-3xl" animate={{ left: `calc(50% + ${x}px)`, top: `calc(50% - ${y}px)` }} style={{ transform: 'translate(-50%, -50%)' }}>
          🐱
        </motion.div>
        <p className="absolute bottom-2 right-2 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">현재: ({x}, {y})</p>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">🚩 깃발 클릭했을 때</div>
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium shadow flex items-center gap-2 flex-wrap">
            📍 x:
            <input type="number" value={inputX} onChange={(e) => setInputX(Number(e.target.value))} className="w-16 px-2 py-1 rounded text-gray-900 text-center" />
            y:
            <input type="number" value={inputY} onChange={(e) => setInputY(Number(e.target.value))} className="w-16 px-2 py-1 rounded text-gray-900 text-center" />
            (으)로 이동하기
          </div>
        </div>
      </div>

      {mission.hints && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {x === 100 && y === 50 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">목표 좌표에 도착! 🎯</span>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />🚩 실행하기
        </button>
      </div>
    </div>
  );
};

// 크기 변경 미션
const SizeMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [scale, setScale] = useState(100);
  const [inputScale, setInputScale] = useState(150);

  const runCode = () => {
    setScale(inputScale);
    if (inputScale !== 100) {
      setTimeout(() => onComplete(true), 1000);
    }
  };

  const reset = () => setScale(100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">📐 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="bg-gradient-to-b from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 rounded-xl h-48 mb-4 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <motion.div className="text-6xl" animate={{ scale: scale / 100 }} transition={{ type: 'spring' }}>
          🐱
        </motion.div>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">🚩 깃발 클릭했을 때</div>
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow flex items-center gap-2">
            📐 크기를
            <input type="number" value={inputScale} onChange={(e) => setInputScale(Number(e.target.value))} className="w-16 px-2 py-1 rounded text-gray-900 text-center" min={10} max={300} />
            %로 정하기
          </div>
        </div>
      </div>

      {mission.hints && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {scale !== 100 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">크기 변경 성공! ({scale}%) 🎉</span>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />🚩 실행하기
        </button>
      </div>
    </div>
  );
};

// 회전 미션
const RotateMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    for (let i = 0; i < 36; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setRotation((prev) => prev + 10);
    }
    setIsRunning(false);
    setTimeout(() => onComplete(true), 500);
  };

  const reset = () => setRotation(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🔄 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="bg-gradient-to-b from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 rounded-xl h-48 mb-4 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <motion.div className="text-6xl" style={{ transform: `rotate(${rotation}deg)` }}>
          🐱
        </motion.div>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">🚩 깃발 클릭했을 때</div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium shadow">🔄 36번 반복하기</div>
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium shadow pl-8">↻ 10도 돌기</div>
        </div>
      </div>

      {mission.hints && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {rotation >= 360 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">360도 회전 완료! 🌀</span>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} disabled={isRunning} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />{isRunning ? '회전 중...' : '🚩 실행하기'}
        </button>
      </div>
    </div>
  );
};

// 보이기/숨기기 미션
const VisibilityMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    for (let i = 0; i < 3; i++) {
      setVisible(false);
      await new Promise(resolve => setTimeout(resolve, 500));
      setVisible(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setBlinkCount((prev) => prev + 1);
    }
    setIsRunning(false);
    setTimeout(() => onComplete(true), 500);
  };

  const reset = () => {
    setVisible(true);
    setBlinkCount(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">👻 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl h-48 mb-4 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <motion.div className="text-6xl" animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.2 }}>
          🐱
        </motion.div>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 코드 블록</p>
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">🚩 깃발 클릭했을 때</div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium shadow">🔄 3번 반복하기</div>
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow pl-8">👻 숨기기</div>
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium shadow pl-8">⏱️ 0.5초 기다리기</div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-lg font-medium shadow pl-8">👀 보이기</div>
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium shadow pl-8">⏱️ 0.5초 기다리기</div>
        </div>
      </div>

      {mission.hints && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {blinkCount >= 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">숨바꼭질 성공! 👻</span>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200">
          <Shuffle className="w-4 h-4 inline mr-2" />초기화
        </button>
        <button onClick={runCode} disabled={isRunning} className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-green-600 hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />{isRunning ? '실행 중...' : '🚩 실행하기'}
        </button>
      </div>
    </div>
  );
};

// 별 그리기 미션 (원래 하드코딩된 버전 - 9주차 별 그리기 전용)
const StarDrawingMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [repeatCount, setRepeatCount] = useState(3);
  const [moveDistance, setMoveDistance] = useState(80);
  const [turnAngle, setTurnAngle] = useState(90);

  const drawStar = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRunning(true);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    let x = canvas.width / 2;
    let y = canvas.height / 2 + 50;
    let angle = -90;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < repeatCount; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const rad = (angle * Math.PI) / 180;
      x += Math.cos(rad) * moveDistance;
      y += Math.sin(rad) * moveDistance;
      ctx.lineTo(x, y);
      ctx.stroke();
      angle += turnAngle;
    }

    setIsRunning(false);
    setIsComplete(true);

    if (repeatCount === 5 && turnAngle === 144) {
      setTimeout(() => onComplete(true), 1500);
    }
  };

  const reset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setIsComplete(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">⭐ {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="bg-gray-900 rounded-xl p-2 border-2 border-gray-700">
            <canvas ref={canvasRef} width={300} height={300} className="bg-gray-900 rounded-lg" />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">터틀 그래픽 캔버스</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 힌트</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {mission.hints?.[0] || '5각 별을 그리려면 5번 반복하고, 각 꼭지점에서 144도(= 180 - 36) 회전해야 해요!'}
            </p>
          </div>

          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔄 반복 횟수: <span className="text-violet-600 font-bold">{repeatCount}번</span>
              </label>
              <input type="range" min="3" max="10" value={repeatCount} onChange={(e) => setRepeatCount(Number(e.target.value))} disabled={isRunning} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📏 이동 거리: <span className="text-violet-600 font-bold">{moveDistance}px</span>
              </label>
              <input type="range" min="50" max="150" value={moveDistance} onChange={(e) => setMoveDistance(Number(e.target.value))} disabled={isRunning} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ↻ 회전 각도: <span className="text-violet-600 font-bold">{turnAngle}°</span>
              </label>
              <input type="range" min="30" max="180" value={turnAngle} onChange={(e) => setTurnAngle(Number(e.target.value))} disabled={isRunning} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
            </div>
          </div>

          <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800 font-mono text-sm">
            <p className="text-violet-800 dark:text-violet-200"><span className="text-orange-600">반복</span> {repeatCount}번:</p>
            <p className="text-violet-800 dark:text-violet-200 pl-4">앞으로 {moveDistance} 이동</p>
            <p className="text-violet-800 dark:text-violet-200 pl-4">오른쪽으로 {turnAngle}° 회전</p>
          </div>

          {isComplete && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl flex items-center gap-3 ${repeatCount === 5 && turnAngle === 144 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {repeatCount === 5 && turnAngle === 144 ? (
                <><CheckCircle className="w-6 h-6" /><span className="font-bold">완벽한 5각 별! 🌟</span></>
              ) : (
                <><span className="text-2xl">🎨</span><span className="font-bold">멋진 도형! 5각 별을 그려보세요.</span></>
              )}
            </motion.div>
          )}

          <div className="flex gap-3">
            <button onClick={reset} disabled={isRunning} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 disabled:opacity-50">
              <Shuffle className="w-4 h-4 inline mr-2" />지우기
            </button>
            <button onClick={drawStar} disabled={isRunning} className="flex-1 px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />{isRunning ? '그리는 중...' : '실행하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 도형 그리기 미션 (사각형, 육각형 등)
const ShapeDrawingMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sides, setSides] = useState(4);
  const [sideLength, setSideLength] = useState(80);

  // 미션에 따라 목표 변 개수 결정
  const getTargetSides = (): number => {
    if (mission.title.includes('사각형')) return 4;
    if (mission.title.includes('육각형')) return 6;
    if (mission.title.includes('삼각형')) return 3;
    if (mission.title.includes('오각형')) return 5;
    return 4;
  };
  const targetSides = getTargetSides();
  const targetAngle = 360 / targetSides;

  const drawShape = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRunning(true);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    let x = canvas.width / 2 - sideLength / 2;
    let y = canvas.height / 2 + sideLength / 2;
    let angle = 0;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < sides; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const rad = (angle * Math.PI) / 180;
      x += Math.cos(rad) * sideLength;
      y -= Math.sin(rad) * sideLength;
      ctx.lineTo(x, y);
      ctx.stroke();
      angle += 360 / sides;
    }

    setIsRunning(false);
    setIsComplete(true);

    if (sides === targetSides) {
      setTimeout(() => onComplete(true), 1500);
    }
  };

  const reset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setIsComplete(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">📐 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="bg-gray-900 rounded-xl p-2 border-2 border-gray-700">
            <canvas ref={canvasRef} width={300} height={300} className="bg-gray-900 rounded-lg" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 힌트</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {mission.hints?.[0] || `정${targetSides}각형을 그리려면 ${targetSides}번 반복하고 ${targetAngle}도 회전해요!`}
            </p>
          </div>

          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔄 반복 횟수 (변의 개수): <span className="text-emerald-600 font-bold">{sides}번</span>
              </label>
              <input type="range" min="3" max="8" value={sides} onChange={(e) => setSides(Number(e.target.value))} disabled={isRunning} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📏 변의 길이: <span className="text-emerald-600 font-bold">{sideLength}px</span>
              </label>
              <input type="range" min="40" max="120" value={sideLength} onChange={(e) => setSideLength(Number(e.target.value))} disabled={isRunning} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 font-mono text-sm">
            <p className="text-emerald-800 dark:text-emerald-200"><span className="text-orange-600">반복</span> {sides}번:</p>
            <p className="text-emerald-800 dark:text-emerald-200 pl-4">앞으로 {sideLength} 이동</p>
            <p className="text-emerald-800 dark:text-emerald-200 pl-4">오른쪽으로 {Math.round(360 / sides)}° 회전</p>
          </div>

          {isComplete && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl flex items-center gap-3 ${sides === targetSides ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {sides === targetSides ? (
                <><CheckCircle className="w-6 h-6" /><span className="font-bold">완벽한 정{targetSides}각형! 🎉</span></>
              ) : (
                <><span className="text-2xl">🎨</span><span className="font-bold">멋진 도형! 정{targetSides}각형을 그려보세요.</span></>
              )}
            </motion.div>
          )}

          <div className="flex gap-3">
            <button onClick={reset} disabled={isRunning} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 disabled:opacity-50">
              <Shuffle className="w-4 h-4 inline mr-2" />지우기
            </button>
            <button onClick={drawShape} disabled={isRunning} className="flex-1 px-4 py-3 bg-emerald-500 text-white font-bold rounded-xl border-2 border-emerald-600 hover:bg-emerald-600 disabled:opacity-50 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />{isRunning ? '그리는 중...' : '실행하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 일반 블록 코딩 미션 (fallback)
const GeneralBlockMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🧱 {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      {/* 사용 가능한 블록 표시 */}
      {mission.blocks && mission.blocks.length > 0 && (
        <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-800">
          <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">🧱 사용할 수 있는 블록</p>
          <div className="flex flex-wrap gap-2">
            {mission.blocks.map((block, i) => (
              <span key={i} className="px-3 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm shadow">{block}</span>
            ))}
          </div>
        </div>
      )}

      {/* 힌트 */}
      {mission.hints && mission.hints.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800 mb-4">
          <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">💡 힌트</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            {mission.hints.map((hint, i) => (<li key={i}>• {hint}</li>))}
          </ul>
        </div>
      )}

      {mission.concept && (
        <div className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-xl font-medium mb-6">
          학습 개념: {mission.concept}
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-6 border-2 border-gray-200 dark:border-gray-700 text-center">
        <p className="text-4xl mb-4">🐱</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          위의 블록들을 사용해서 미션을 수행해보세요!<br />
          준비가 되었다면 완료 버튼을 눌러주세요.
        </p>
      </div>

      <button
        onClick={() => onComplete(true)}
        className="w-full px-8 py-4 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors"
      >
        미션 완료하기 ✓
      </button>
    </div>
  );
};

// Writing Mission
const WritingMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const requirements = mission.requirements || ['최소 3줄 이상 작성', '순서를 명확하게 표현'];
  const minLines = 3;

  const handleSubmit = () => {
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    if (lines.length >= minLines) {
      setSubmitted(true);
      setTimeout(() => onComplete(true), 1500);
    }
  };

  const lineCount = text.split('\n').filter(l => l.trim().length > 0).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">✍️ {mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>

      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">작성 요구사항:</p>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          {requirements.map((req, i) => (
            <li key={i} className="flex items-center gap-2">
              <span>•</span> {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
          placeholder="여기에 작성하세요...&#10;&#10;예시:&#10;1. 첫 번째 단계&#10;2. 두 번째 단계&#10;3. 세 번째 단계"
          className="w-full h-64 p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:border-violet-500 font-mono text-sm"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {lineCount} / {minLines} 줄
        </div>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-3"
        >
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">잘 작성했어요! 🎉</span>
        </motion.div>
      )}

      <button
        onClick={handleSubmit}
        disabled={lineCount < minLines || submitted}
        className="w-full px-4 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {lineCount < minLines ? `${minLines - lineCount}줄 더 작성해주세요` : '제출하기'}
      </button>
    </div>
  );
};

// Visual Puzzle Mission (Path Finding / Tile Matching)
const VisualPuzzleMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'success' | 'fail'>('none');

  // Simple maze: 0=empty, 1=wall, 2=start, 3=end
  const maze = [
    [2, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 3],
  ];
  const gridSize = 5;

  const toggleCell = (index: number) => {
    if (feedback !== 'none') return;

    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    if (maze[y][x] === 1) return; // wall

    if (selectedPath.includes(index)) {
      // Remove from path
      const pathIndex = selectedPath.indexOf(index);
      setSelectedPath(selectedPath.slice(0, pathIndex));
    } else {
      // Add to path if adjacent to last selected
      if (selectedPath.length === 0) {
        if (maze[y][x] === 2) { // start
          setSelectedPath([index]);
        }
      } else {
        const lastIndex = selectedPath[selectedPath.length - 1];
        const lastX = lastIndex % gridSize;
        const lastY = Math.floor(lastIndex / gridSize);
        const isAdjacent = (Math.abs(x - lastX) === 1 && y === lastY) ||
                          (Math.abs(y - lastY) === 1 && x === lastX);
        if (isAdjacent) {
          setSelectedPath([...selectedPath, index]);
        }
      }
    }
  };

  const checkPath = () => {
    if (selectedPath.length === 0) return;
    const lastIndex = selectedPath[selectedPath.length - 1];
    const lastX = lastIndex % gridSize;
    const lastY = Math.floor(lastIndex / gridSize);
    if (maze[lastY][lastX] === 3) {
      setFeedback('success');
      setTimeout(() => onComplete(true), 1500);
    } else {
      setFeedback('fail');
    }
  };

  const reset = () => {
    setSelectedPath([]);
    setFeedback('none');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🧩 길 찾기 퍼즐</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">시작점(🚀)에서 도착점(🏁)까지 경로를 연결하세요. 벽(⬛)은 지나갈 수 없어요!</p>

      <div className="flex flex-col items-center gap-6">
        <div className="inline-grid gap-1 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-xl border-2 border-gray-300 dark:border-gray-600"
             style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {maze.flat().map((cell, i) => {
            const isSelected = selectedPath.includes(i);
            const isWall = cell === 1;
            const isStart = cell === 2;
            const isEnd = cell === 3;

            return (
              <button
                key={i}
                onClick={() => toggleCell(i)}
                disabled={isWall}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all ${
                  isWall
                    ? 'bg-gray-800 border-gray-900 cursor-not-allowed'
                    : isSelected
                    ? 'bg-violet-400 border-violet-600 text-white'
                    : isStart
                    ? 'bg-green-200 border-green-400'
                    : isEnd
                    ? 'bg-yellow-200 border-yellow-400'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                }`}
              >
                {isStart ? '🚀' : isEnd ? '🏁' : isWall ? '' : isSelected ? selectedPath.indexOf(i) + 1 : ''}
              </button>
            );
          })}
        </div>

        {feedback !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl flex items-center gap-3 ${
              feedback === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback === 'success' ? (
              <><CheckCircle className="w-6 h-6" /><span className="font-bold">정답! 🎉</span></>
            ) : (
              <><XCircle className="w-6 h-6" /><span className="font-bold">도착점까지 연결해주세요!</span></>
            )}
          </motion.div>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200"
          >
            <Shuffle className="w-4 h-4 inline mr-2" />초기화
          </button>
          <button
            onClick={checkPath}
            disabled={selectedPath.length === 0}
            className="px-8 py-3 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

// Interactive/Generic Mission (fallback)
const InteractiveMission: React.FC<{ mission: MissionType; onComplete: (perfect: boolean) => void }> = ({ mission, onComplete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-900 dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-5xl border-2 border-gray-900">
        {mission.type === 'audio-visual' ? '🎵' :
         mission.type === 'interactive-lesson' ? '📚' :
         mission.type === 'hands-on' ? '🛠️' : '📋'}
      </div>

      <h3 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">{mission.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
        {mission.description}
      </p>

      {mission.concept && (
        <div className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-xl font-medium mb-6">
          학습 개념: {mission.concept}
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-6 border-2 border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          이 미션의 내용을 읽고 이해했다면 완료 버튼을 눌러주세요.
        </p>
      </div>

      <button
        onClick={() => onComplete(true)}
        className="px-8 py-4 bg-gray-900 dark:bg-violet-600 text-white font-bold rounded-xl border-2 border-gray-900 dark:border-violet-500 hover:bg-gray-800 dark:hover:bg-violet-700 transition-colors"
      >
        이해했어요! 완료하기
      </button>
    </div>
  );
};

export default Mission;
