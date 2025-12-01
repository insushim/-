import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, RotateCcw, Code2, Lightbulb, Rocket, Check } from 'lucide-react';
import { Card, Button, Loading } from '../components/Common';
import { CodeEditor } from '../components/Editor';
import { vibeCoding } from '../services/geminiService';
import { runPython, runJavaScript } from '../services/codeRunner';
import type { VibeCodingResponse } from '../types';

const VibeCoding: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState<'python' | 'javascript' | 'html'>('python');
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('simple');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<VibeCodingResponse | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const examplePrompts = [
    { text: '숫자 맞추기 게임 만들어줘', lang: 'python' },
    { text: '클릭하면 색이 바뀌는 버튼', lang: 'javascript' },
    { text: '구구단 출력하기', lang: 'python' },
    { text: '간단한 계산기', lang: 'javascript' },
    { text: '가위바위보 게임', lang: 'python' },
    { text: 'Todo 리스트', lang: 'javascript' },
  ];

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null);
    setOutput('');

    try {
      const result = await vibeCoding({
        prompt,
        language,
        complexity,
      });

      setResponse(result);
      setGeneratedCode(result.code);
    } catch (error) {
      console.error('바이브코딩 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunCode = async () => {
    if (!generatedCode.trim()) return;

    try {
      const result = language === 'python'
        ? await runPython(generatedCode)
        : await runJavaScript(generatedCode);

      setOutput(result.output || result.error || '실행 완료');
    } catch (error) {
      setOutput('실행 중 오류가 발생했습니다.');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">바이브코딩 스튜디오</h1>
        <p className="text-slate-600 dark:text-slate-400">
          원하는 것을 말해주세요. AI가 코드로 만들어드려요!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              무엇을 만들고 싶으세요?
            </h2>

            {/* Prompt Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 숫자 맞추기 게임을 만들어줘"
              className="input min-h-[120px] resize-none mb-4"
            />

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">언어</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="input"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="html">HTML</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">복잡도</label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value as any)}
                  className="input"
                >
                  <option value="simple">간단하게</option>
                  <option value="medium">적당히</option>
                  <option value="complex">복잡하게</option>
                </select>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleSubmit}
              leftIcon={<Sparkles className="w-4 h-4" />}
              isLoading={isLoading}
            >
              코드 생성하기
            </Button>
          </Card>

          {/* Example Prompts */}
          <Card className="p-6">
            <h3 className="font-medium mb-3">예시 프롬프트</h3>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPrompt(example.text);
                    setLanguage(example.lang as any);
                  }}
                  className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-dark-surfaceHover rounded-full hover:bg-slate-200 dark:hover:bg-dark-border transition-colors"
                >
                  {example.text}
                </button>
              ))}
            </div>
          </Card>

          {/* AI Response Info */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary-500" />
                    AI가 이해한 내용
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {response.understanding}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">커스터마이징 아이디어</h4>
                    <ul className="space-y-1">
                      {response.customizationIdeas.map((idea, index) => (
                        <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <span className="text-primary-500">•</span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">더 발전시키려면</h4>
                    <ul className="space-y-1">
                      {response.nextSteps.map((step, index) => (
                        <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <Rocket className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {isLoading ? (
            <Card className="p-12">
              <div className="text-center">
                <Loading size="lg" />
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  AI가 코드를 작성하고 있어요...
                </p>
              </div>
            </Card>
          ) : response ? (
            <>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">생성된 코드</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyCode}
                      leftIcon={copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    >
                      {copied ? '복사됨!' : '복사'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setGeneratedCode(response.code)}
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                    >
                      초기화
                    </Button>
                  </div>
                </div>

                <CodeEditor
                  language={language}
                  value={generatedCode}
                  onChange={setGeneratedCode}
                  height="300px"
                />

                <div className="mt-4">
                  <Button
                    variant="primary"
                    onClick={handleRunCode}
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    실행하기
                  </Button>
                </div>
              </Card>

              {/* Output */}
              <Card className="p-6">
                <h3 className="font-medium mb-4">실행 결과</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 min-h-[100px]">
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <span className="text-slate-500">코드를 실행하면 결과가 여기에 표시됩니다</span>
                  )}
                </div>
              </Card>

              {/* Explanation */}
              {response.explanation && (
                <Card className="p-6">
                  <h3 className="font-medium mb-3">코드 설명</h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                      {response.explanation}
                    </p>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <Card className="p-12">
              <div className="text-center text-slate-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>프롬프트를 입력하고 코드를 생성해보세요!</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeCoding;
