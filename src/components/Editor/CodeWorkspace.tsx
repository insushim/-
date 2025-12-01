import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Lightbulb, MessageCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { Button } from '../Common';
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
          onComplete(hintsUsed === 0);
        }
      } else if (result.success) {
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
        mission.hints.slice(0, currentHintIndex + 1)
      );
      setCurrentHint(hint);
    } catch (error) {
      // Fallback to static hints
      if (currentHintIndex < mission.hints.length - 1) {
        setCurrentHint(mission.hints[currentHintIndex + 1]);
      } else {
        setCurrentHint('더 이상 힌트가 없어요. AI 튜터에게 물어보세요!');
      }
    } finally {
      setLoadingHint(false);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Editor Section */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-3 p-2 bg-slate-100 dark:bg-dark-surface rounded-lg">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
              {language.toUpperCase()}
            </span>
            <span className="text-sm text-slate-500">{mission.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGetHint}
              leftIcon={loadingHint ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
              disabled={loadingHint}
            >
              힌트 ({hintsUsed})
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="w-4 h-4" />}>
              리셋
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              leftIcon={isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              disabled={isRunning}
            >
              {isRunning ? '실행 중...' : '실행'}
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <CodeEditor language={language as any} value={code} onChange={setCode} height="100%" />
        </div>
      </div>

      {/* Output Section */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        {/* Output Panel */}
        <div className="flex-1 card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">실행 결과</h3>
            {testPassed !== null && (
              <span className={`flex items-center gap-1 text-sm ${testPassed ? 'text-green-600' : 'text-red-500'}`}>
                {testPassed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> 성공!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> 다시 시도
                  </>
                )}
              </span>
            )}
          </div>

          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 min-h-[150px] max-h-[300px] overflow-auto scrollbar-thin">
            {isRunning ? (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                실행 중...
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-slate-500">코드를 실행하면 결과가 여기에 표시됩니다</span>
            )}
          </div>

          {/* Expected Output */}
          {mission.expectedOutput && (
            <div className="mt-3">
              <p className="text-xs text-slate-500 mb-1">예상 출력:</p>
              <div className="bg-slate-100 dark:bg-dark-surfaceHover rounded p-2 font-mono text-xs">
                {mission.expectedOutput}
              </div>
            </div>
          )}
        </div>

        {/* Hint Panel */}
        <AnimatePresence>
          {currentHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="card p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">힌트</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">{currentHint}</p>
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
              className="card p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
            >
              <div className="flex items-start gap-2">
                <MessageCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">오류 도우미</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">{errorExplanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CodeWorkspace;
