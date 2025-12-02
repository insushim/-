import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Trophy, Timer, Zap, RotateCcw, Play, Target, Brain, Bug, Keyboard, Sparkles, Star } from 'lucide-react';
import { Card, Button, Modal } from '../components/Common';
import { useUserStore } from '../stores/userStore';
import { useProgressStore } from '../stores/progressStore';

type GameType = 'code-racer' | 'bug-hunter' | 'memory' | 'quiz-battle';

interface Game {
  id: GameType;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGlow: string;
  emoji: string;
}

const games: Game[] = [
  {
    id: 'code-racer',
    name: '코드 레이서',
    description: '코드를 빠르게 타이핑하세요!',
    icon: <Keyboard className="w-10 h-10" />,
    color: 'from-blue-500 via-cyan-500 to-teal-400',
    bgGlow: 'bg-cyan-500/20',
    emoji: '⚡',
  },
  {
    id: 'bug-hunter',
    name: '버그 헌터',
    description: '코드의 버그를 찾아내세요!',
    icon: <Bug className="w-10 h-10" />,
    color: 'from-red-500 via-orange-500 to-amber-400',
    bgGlow: 'bg-orange-500/20',
    emoji: '🐛',
  },
  {
    id: 'memory',
    name: '코딩 메모리',
    description: '코드 조각을 맞춰보세요!',
    icon: <Brain className="w-10 h-10" />,
    color: 'from-purple-500 via-pink-500 to-rose-400',
    bgGlow: 'bg-pink-500/20',
    emoji: '🧠',
  },
  {
    id: 'quiz-battle',
    name: '퀴즈 배틀',
    description: '코딩 퀴즈에 도전하세요!',
    icon: <Target className="w-10 h-10" />,
    color: 'from-green-500 via-emerald-500 to-teal-400',
    bgGlow: 'bg-emerald-500/20',
    emoji: '🎯',
  },
];

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with 3D effect */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative inline-block mb-6"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-50 animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 border border-emerald-400/30">
            <Gamepad2 className="w-10 h-10 text-white drop-shadow-lg" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/30 rounded-3xl pointer-events-none" />
          </div>
          {/* Floating sparkles */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-3 text-white tracking-tight"
        >
          게임<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">센터</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 font-medium text-lg"
        >
          재미있게 놀면서 코딩 실력을 키워요!
        </motion.p>
      </div>

      {/* Games Grid with 3D cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                z: 50,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game.id)}
              className="relative overflow-hidden rounded-3xl cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 ${game.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Card content */}
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl group-hover:border-slate-600/50 transition-all duration-300">
                {/* Top gradient section */}
                <div className={`relative h-32 bg-gradient-to-r ${game.color} flex items-center justify-center overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-32 h-32 bg-white/20 rounded-full -top-16 -left-16 animate-pulse" />
                    <div className="absolute w-24 h-24 bg-white/20 rounded-full -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* Icon with 3D effect */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="relative z-10 text-white drop-shadow-2xl"
                  >
                    {game.icon}
                  </motion.div>

                  {/* Emoji floating */}
                  <motion.span
                    animate={{
                      y: [-8, 8, -8],
                      rotate: [-10, 10, -10],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-4 right-4 text-3xl"
                  >
                    {game.emoji}
                  </motion.span>

                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{game.name}</h3>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-slate-400 mb-5">{game.description}</p>
                  <Button
                    variant="game"
                    size="lg"
                    className="w-full"
                    leftIcon={<Play className="w-5 h-5" />}
                  >
                    플레이하기
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Game Modal */}
      <Modal
        isOpen={selectedGame !== null}
        onClose={() => {
          setSelectedGame(null);
          setIsPlaying(false);
        }}
        title={games.find(g => g.id === selectedGame)?.name || '게임'}
        size="xl"
      >
        {selectedGame === 'code-racer' && <CodeRacerGame onClose={() => setSelectedGame(null)} />}
        {selectedGame === 'bug-hunter' && <BugHunterGame onClose={() => setSelectedGame(null)} />}
        {selectedGame === 'memory' && <MemoryGame onClose={() => setSelectedGame(null)} />}
        {selectedGame === 'quiz-battle' && <QuizBattleGame onClose={() => setSelectedGame(null)} />}
      </Modal>
    </div>
  );
};

// 코드 레이서 게임
const CodeRacerGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [started, setStarted] = useState(false);
  const [code, setCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { addExp } = useUserStore();

  const codeSnippets = [
    'print("Hello")',
    'for i in range(5):',
    'if x > 10:',
    'def hello():',
    'return x + y',
    'while True:',
    'list.append(1)',
    'len(array)',
    'import random',
    'class Dog:',
  ];

  const generateCode = () => {
    const randomCode = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setCode(randomCode);
    setUserInput('');
  };

  useEffect(() => {
    if (started && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && started) {
      setIsFinished(true);
      addExp(Math.floor(score / 2));
    }
  }, [started, timer, score, addExp]);

  useEffect(() => {
    if (userInput === code && code !== '') {
      setScore(s => s + code.length * 10);
      generateCode();
    }
  }, [userInput, code]);

  const startGame = () => {
    setStarted(true);
    setScore(0);
    setTimer(30);
    setIsFinished(false);
    generateCode();
  };

  if (isFinished) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">게임 종료!</h2>
        <p className="text-4xl font-bold text-primary-500 mb-2">{score}점</p>
        <p className="text-slate-600 mb-6">+{Math.floor(score / 2)} XP 획득!</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose}>나가기</Button>
          <Button variant="primary" onClick={startGame}>다시 하기</Button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <Keyboard className="w-16 h-16 mx-auto text-blue-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">코드 레이서</h2>
        <p className="text-slate-600 mb-6">30초 동안 코드를 빠르게 타이핑하세요!</p>
        <Button variant="primary" onClick={startGame} leftIcon={<Play className="w-4 h-4" />}>
          시작하기
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-red-500" />
          <span className="text-xl font-bold">{timer}초</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold">{score}점</span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-6 mb-4 text-center">
        <p className="font-mono text-2xl text-green-400">{code}</p>
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="input font-mono text-lg text-center"
        placeholder="위 코드를 입력하세요..."
        autoFocus
      />
    </div>
  );
};

// 버그 헌터 게임
const BugHunterGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentBug, setCurrentBug] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { addExp } = useUserStore();

  const bugs = [
    { code: 'print("Hello World)', error: '따옴표가 닫히지 않았어요', fix: 'print("Hello World")' },
    { code: 'if x = 10:', error: '비교 연산자가 틀렸어요', fix: 'if x == 10:' },
    { code: 'for i in range(10)\n  print(i)', error: '콜론이 빠졌어요', fix: 'for i in range(10):\n  print(i)' },
    { code: 'def hello()\n  return "hi"', error: '콜론이 빠졌어요', fix: 'def hello():\n  return "hi"' },
    { code: 'list = [1, 2, 3]\nprint(list[3])', error: '인덱스 범위 초과', fix: 'print(list[2])' },
  ];

  const checkAnswer = (answer: string) => {
    if (answer === bugs[currentBug].error) {
      setScore(s => s + 100);
    }

    if (currentBug < bugs.length - 1) {
      setCurrentBug(c => c + 1);
    } else {
      setIsFinished(true);
      addExp(Math.floor(score / 5));
    }
  };

  if (isFinished) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">게임 종료!</h2>
        <p className="text-4xl font-bold text-primary-500 mb-2">{score}점</p>
        <p className="text-slate-600 mb-6">+{Math.floor(score / 5)} XP 획득!</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose}>나가기</Button>
          <Button variant="primary" onClick={() => { setStarted(false); setCurrentBug(0); setScore(0); setIsFinished(false); }}>다시 하기</Button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <Bug className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">버그 헌터</h2>
        <p className="text-slate-600 mb-6">코드의 버그를 찾아내세요!</p>
        <Button variant="primary" onClick={() => setStarted(true)} leftIcon={<Play className="w-4 h-4" />}>
          시작하기
        </Button>
      </div>
    );
  }

  const bug = bugs[currentBug];
  const wrongAnswers = bugs.filter((_, i) => i !== currentBug).slice(0, 3).map(b => b.error);
  const answers = [...wrongAnswers, bug.error].sort(() => Math.random() - 0.5);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-slate-500">{currentBug + 1} / {bugs.length}</span>
        <span className="font-bold">{score}점</span>
      </div>

      <div className="bg-slate-900 rounded-lg p-4 mb-6">
        <pre className="font-mono text-sm text-red-400 whitespace-pre-wrap">{bug.code}</pre>
      </div>

      <p className="text-center font-medium mb-4">이 코드의 문제점은?</p>

      <div className="grid grid-cols-2 gap-3">
        {answers.map((answer, index) => (
          <Button
            key={index}
            variant="secondary"
            onClick={() => checkAnswer(answer)}
            className="text-sm"
          >
            {answer}
          </Button>
        ))}
      </div>
    </div>
  );
};

// 메모리 게임
const MemoryGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { addExp } = useUserStore();

  const codeSymbols = ['if', 'for', 'while', 'def', 'class', 'return', 'print', 'import'];

  const initGame = () => {
    const symbols = codeSymbols.slice(0, 6);
    const pairs = [...symbols, ...symbols];
    const shuffled = pairs.sort(() => Math.random() - 0.5).map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false,
    }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsFinished(false);
    setStarted(true);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = flippedCards;

      if (cards[first].value === cards[second].value) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every(c => c.matched)) {
          setIsFinished(true);
          const exp = Math.max(10, 100 - moves * 2);
          addExp(exp);
        }
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, moves, addExp]);

  if (isFinished) {
    const exp = Math.max(10, 100 - moves * 2);
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">완료!</h2>
        <p className="text-lg mb-2">{moves}번 만에 성공!</p>
        <p className="text-slate-600 mb-6">+{exp} XP 획득!</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose}>나가기</Button>
          <Button variant="primary" onClick={initGame}>다시 하기</Button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <Brain className="w-16 h-16 mx-auto text-purple-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">코딩 메모리</h2>
        <p className="text-slate-600 mb-6">같은 코드 짝을 찾으세요!</p>
        <Button variant="primary" onClick={initGame} leftIcon={<Play className="w-4 h-4" />}>
          시작하기
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold">이동 횟수: {moves}</span>
        <Button variant="ghost" size="sm" onClick={initGame} leftIcon={<RotateCcw className="w-4 h-4" />}>
          다시
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg font-mono text-sm font-bold flex items-center justify-center transition-all ${
              card.flipped || card.matched
                ? 'bg-primary-500 text-white'
                : 'bg-slate-200 dark:bg-dark-surfaceHover hover:bg-slate-300'
            } ${card.matched ? 'opacity-50' : ''}`}
            animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
          >
            {(card.flipped || card.matched) && (
              <span style={{ transform: 'rotateY(180deg)' }}>{card.value}</span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// 퀴즈 배틀 게임
const QuizBattleGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const { addExp } = useUserStore();

  const questions = [
    { q: 'Python에서 "Hello"를 출력하는 코드는?', options: ['print("Hello")', 'echo "Hello"', 'console.log("Hello")', 'System.out.print("Hello")'], answer: 0 },
    { q: 'JavaScript에서 변수를 선언하는 키워드가 아닌 것은?', options: ['let', 'const', 'var', 'define'], answer: 3 },
    { q: 'for 반복문에서 range(5)는 몇 번 반복하나요?', options: ['4번', '5번', '6번', '1번'], answer: 1 },
    { q: 'HTML에서 제목을 나타내는 태그는?', options: ['<p>', '<h1>', '<div>', '<span>'], answer: 1 },
    { q: '배열의 길이를 구하는 Python 함수는?', options: ['length()', 'size()', 'len()', 'count()'], answer: 2 },
  ];

  const handleAnswer = (index: number) => {
    setSelected(index);

    setTimeout(() => {
      if (index === questions[currentQuestion].answer) {
        setScore(s => s + 20);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelected(null);
      } else {
        setIsFinished(true);
        addExp(score);
      }
    }, 1000);
  };

  if (isFinished) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">퀴즈 완료!</h2>
        <p className="text-4xl font-bold text-primary-500 mb-2">{score}점</p>
        <p className="text-slate-600 mb-6">+{score} XP 획득!</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose}>나가기</Button>
          <Button variant="primary" onClick={() => { setStarted(false); setCurrentQuestion(0); setScore(0); setIsFinished(false); setSelected(null); }}>다시 하기</Button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <Target className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">퀴즈 배틀</h2>
        <p className="text-slate-600 mb-6">코딩 퀴즈에 도전하세요!</p>
        <Button variant="primary" onClick={() => setStarted(true)} leftIcon={<Play className="w-4 h-4" />}>
          시작하기
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-slate-500">{currentQuestion + 1} / {questions.length}</span>
        <span className="font-bold">{score}점</span>
      </div>

      <h3 className="text-lg font-medium mb-6">{question.q}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => selected === null && handleAnswer(index)}
            disabled={selected !== null}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              selected === null
                ? 'bg-slate-100 dark:bg-dark-surfaceHover hover:bg-slate-200'
                : selected === index
                  ? index === question.answer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : index === question.answer
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 dark:bg-dark-surfaceHover opacity-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Games;
