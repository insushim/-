import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Lightbulb, MessageCircle, CheckCircle2, XCircle, Loader2, Terminal, Code2, Check, X } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { useMissionStore } from '../../stores/missionStore';
import { runPython, runJavaScript, runTestCases } from '../../services/codeRunner';
import { getSmartHint, explainError } from '../../services/geminiService';
import type { Mission } from '../../types';

interface CodeWorkspaceProps {
  mission: Mission;
  onComplete: (perfect: boolean) => void;
}

const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({ mission, onComplete }) => {
  const { code, setCode, output, setOutput, isRunning, setIsRunning, hintsUsed, currentHintIndex, showHint } = useMissionStore();

  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [errorExplanation, setErrorExplanation] = useState<string | null>(null);
  const [testPassed, setTestPassed] = useState<boolean | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  const language = mission.language || 'python';

  const handleRun = async () => {
    setIsRunning(true);
    setTestPassed(null);
    setErrorExplanation(null);

    try {
      let result;

      if (mission.testCases && mission.testCases.length > 0) {
        result = await runTestCases(code, mission.testCases, language as 'python' | 'javascript');
      } else if (language === 'python') {
        result = await runPython(code);
      } else {
        result = await runJavaScript(code);
      }

      setOutput(result.output);

      if (mission.expectedOutput) {
        const passed = result.output.trim() === mission.expectedOutput.trim();
        setTestPassed(passed);

        if (passed) {
          // 성공 시 잠시 결과를 보여준 후 완료 처리
          setTimeout(() => {
            onComplete(hintsUsed === 0);
          }, 1500);
        }
      } else if (result.success && result.output && result.output !== '(실행 완료 - 출력 없음)') {
        setTestPassed(true);
      }

      if (result.error) {
        const explanation = await explainError(code, result.error, language);
        setErrorExplanation(explanation);
      }
    } catch (error) {
      setOutput('실행 중 오류가 발생했습니다.');
      setTestPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(mission.starterCode || '');
    setOutput('');
    setTestPassed(null);
    setCurrentHint(null);
    setErrorExplanation(null);
  };

  const handleGetHint = async () => {
    if (loadingHint) return;

    setLoadingHint(true);
    try {
      const hint = await getSmartHint(
        mission.title,
        mission.description,
        code,
        currentHintIndex + 1,
        mission.hints?.slice(0, currentHintIndex + 1) || []
      );
      setCurrentHint(hint);
    } catch (error) {
      // Fallback to static hints
      if (mission.hints && currentHintIndex < mission.hints.length - 1) {
        setCurrentHint(mission.hints[currentHintIndex + 1]);
      } else {
        setCurrentHint('더 이상 힌트가 없어요. AI 튜터에게 물어보세요!');
      }
    } finally {
      setLoadingHint(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{mission.title}</h2>
            <p className="text-xs text-slate-400">{mission.concept || mission.description?.slice(0, 50)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleGetHint}
            disabled={loadingHint}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg text-sm font-medium transition-colors border border-amber-500/30"
          >
            {loadingHint ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
            힌트 ({hintsUsed})
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-600"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            {isRunning ? '실행 중...' : '코드 실행'}
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Problem Description */}
        <div className="lg:w-1/3 bg-slate-800 rounded-2xl border border-slate-700/50 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 max-h-[300px] lg:max-h-[600px]">
          <div>
            <span className="inline-block px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-3">
              문제 설명
            </span>
            <h3 className="text-lg font-bold text-slate-200 mb-2">{mission.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {mission.description}
            </p>
          </div>

          {mission.expectedOutput && (
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Output Example</h4>
              <div className="font-mono text-sm text-emerald-400">
                {mission.expectedOutput}
              </div>
            </div>
          )}

          {/* Hints Section */}
          <AnimatePresence>
            {currentHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-300 mb-1 text-sm">힌트</h4>
                    <p className="text-sm text-amber-200/80">{currentHint}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Explanation */}
          <AnimatePresence>
            {errorExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-300 mb-1 text-sm">오류 도우미</h4>
                    <p className="text-sm text-red-200/80 whitespace-pre-wrap">{errorExplanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* XP Rewards */}
          <div className="mt-auto space-y-2">
            <div className={`flex items-center justify-between p-3 rounded-lg border ${testPassed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-indigo-500/5 border-indigo-500/10'}`}>
              <div className="flex items-center gap-2">
                {testPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Check className="w-4 h-4 text-indigo-500" />
                )}
                <span className={`text-sm font-medium ${testPassed ? 'text-emerald-300' : 'text-slate-300'}`}>정확한 출력 완성</span>
              </div>
              <span className={`text-xs font-bold ${testPassed ? 'text-emerald-400' : 'text-indigo-400'}`}>+{mission.exp} XP</span>
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Terminal */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Editor Window */}
          <div className="bg-[#1e1e1e] rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col">
            {/* Tab Bar */}
            <div className="flex items-center bg-[#252526] border-b border-[#333]">
              <div className="px-4 py-2.5 bg-[#1e1e1e] border-t-2 border-indigo-500 text-sm text-slate-200 flex items-center gap-2 font-mono">
                <span className="text-indigo-400">{language === 'python' ? 'py' : 'js'}</span>
                main.{language === 'python' ? 'py' : 'js'}
              </div>
            </div>
            {/* Code Area - 고정 높이 */}
            <div className="h-[350px]">
              <CodeEditor
                language={language as any}
                value={code}
                onChange={setCode}
                height="350px"
              />
            </div>
          </div>

          {/* Terminal Window */}
          <div className={`h-48 bg-[#1e1e1e] rounded-2xl border ${testPassed ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/20' : testPassed === false ? 'border-red-500/50' : 'border-slate-700/50'} p-4 font-mono text-sm overflow-hidden flex flex-col transition-all duration-300`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" /> 실행 결과
              </span>
              <div className="flex items-center gap-2">
                {testPassed !== null && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${testPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {testPassed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> 정답입니다!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> 다시 시도해보세요
                      </>
                    )}
                  </motion.span>
                )}
                <div className="flex gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-yellow-500 animate-pulse' : testPassed ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-slate-300 overflow-auto custom-scrollbar">
              {isRunning ? (
                <div className="flex items-center gap-2 text-yellow-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Python 코드 실행 중...
                </div>
              ) : output ? (
                <div>
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span>{language === 'python' ? 'python' : 'node'} main.{language === 'python' ? 'py' : 'js'}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg ${testPassed ? 'bg-emerald-500/10 border border-emerald-500/30' : testPassed === false ? 'bg-red-500/10 border border-red-500/30' : 'bg-slate-800/50'}`}
                  >
                    <pre className={`whitespace-pre-wrap font-mono text-base ${testPassed ? 'text-emerald-300' : testPassed === false ? 'text-red-300' : 'text-slate-200'}`}>{output}</pre>
                  </motion.div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Program exited with code</span>
                    <span className={testPassed === false ? 'text-red-400' : 'text-emerald-400'}>{testPassed === false ? 1 : 0}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Play className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm">코드를 실행하면 결과가 여기에 표시됩니다</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWorkspace;
