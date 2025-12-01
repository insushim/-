import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, Trash2, Sparkles, Code, Lightbulb,
  HelpCircle, BookOpen, Settings, ChevronDown
} from 'lucide-react';
import { Card, Button, Loading } from '../components/Common';
import { chatWithTutor, explainCode, type TutorPersonality } from '../services/geminiService';
import { useUserStore } from '../stores/userStore';
import { useSettingsStore } from '../stores/settingsStore';
import type { AIMessage } from '../types';

const AITutor: React.FC = () => {
  const { user } = useUserStore();
  const { geminiApiKey } = useSettingsStore();

  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState<TutorPersonality>('friendly');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personalityOptions: { value: TutorPersonality; label: string; icon: string; desc: string }[] = [
    { value: 'friendly', label: '친근한 튜터', icon: '😊', desc: '격려하며 친절하게' },
    { value: 'professional', label: '전문 강사', icon: '👨‍🏫', desc: '정확하고 체계적으로' },
    { value: 'socratic', label: '질문형 멘토', icon: '🤔', desc: '질문으로 이끌어줌' },
    { value: 'gamey', label: '게임 마스터', icon: '🎮', desc: '재미있고 유쾌하게' },
  ];

  const quickPrompts = [
    { icon: '💡', text: '파이썬 기초를 알려줘' },
    { icon: '🐛', text: '버그 찾는 방법을 알려줘' },
    { icon: '🔄', text: '반복문이 뭐야?' },
    { icon: '📝', text: '함수를 만드는 방법' },
    { icon: '🎯', text: '변수란 무엇인가요?' },
    { icon: '🧩', text: '조건문 예제를 보여줘' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    if (!geminiApiKey) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: '⚠️ AI 튜터를 사용하려면 설정에서 Gemini API 키를 입력해주세요.',
        timestamp: new Date(),
      }]);
      return;
    }

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithTutor(
        messageText,
        personality,
        user?.level || 1,
        messages
      );

      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송해요, 응답을 생성하는 중에 오류가 발생했어요. 다시 시도해주세요.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI 튜터</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              코딩에 대해 무엇이든 물어보세요!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            leftIcon={<Settings className="w-4 h-4" />}
          >
            성격
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            초기화
          </Button>
        </div>
      </div>

      {/* Personality Settings */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <Card className="p-4">
              <p className="text-sm font-medium mb-3">튜터 성격 선택</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {personalityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setPersonality(option.value);
                      setShowSettings(false);
                    }}
                    className={`p-3 rounded-lg text-left transition-all ${
                      personality === option.value
                        ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                        : 'bg-slate-50 dark:bg-dark-surfaceHover border-2 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <p className="font-medium text-sm mt-1">{option.label}</p>
                    <p className="text-xs text-slate-500">{option.desc}</p>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-primary-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">AI 튜터와 대화를 시작해보세요!</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                코딩에 관한 질문, 개념 설명, 코드 도움 등 무엇이든 물어보세요.
                {personalityOptions.find(p => p.value === personality)?.icon} {personalityOptions.find(p => p.value === personality)?.label} 스타일로 답변해드릴게요!
              </p>

              {/* Quick Prompts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-lg">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(prompt.text)}
                    className="px-3 py-2 text-sm bg-slate-100 dark:bg-dark-surfaceHover rounded-lg hover:bg-slate-200 dark:hover:bg-dark-border transition-colors text-left flex items-center gap-2"
                  >
                    <span>{prompt.icon}</span>
                    <span className="truncate">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30'
                  }`}
                >
                  {message.role === 'user' ? (
                    user?.name.charAt(0).toUpperCase() || 'U'
                  ) : (
                    <Bot className="w-4 h-4 text-primary-500" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 dark:bg-dark-surfaceHover'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap m-0">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-500" />
              </div>
              <div className="bg-slate-100 dark:bg-dark-surfaceHover p-3 rounded-xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-dark-border">
          {!geminiApiKey && (
            <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-700 dark:text-yellow-400">
              💡 AI 튜터를 사용하려면 설정에서 Gemini API 키를 입력해주세요.
            </div>
          )}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="input flex-1 min-h-[44px] max-h-32 resize-none"
              rows={1}
            />
            <Button
              variant="primary"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AITutor;
