import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, Moon, Sun, Volume2, VolumeX,
  Bell, BellOff, Palette, Type, Monitor, Key, Trash2,
  Check, AlertTriangle
} from 'lucide-react';
import { Card, Button, Modal } from '../components/Common';
import { useSettingsStore } from '../stores/settingsStore';
import { useUserStore } from '../stores/userStore';
import { useProgressStore } from '../stores/progressStore';

const Settings: React.FC = () => {
  const {
    theme, setTheme,
    fontSize, setFontSize,
    soundEnabled, setSoundEnabled,
    notificationsEnabled, setNotificationsEnabled,
    geminiApiKey, setGeminiApiKey
  } = useSettingsStore();

  const { user, resetUser } = useUserStore();
  const { resetProgress } = useProgressStore();

  const [apiKey, setApiKey] = useState(geminiApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKey);
  };

  const handleResetData = () => {
    if (resetConfirmText === '초기화') {
      resetUser();
      resetProgress();
      setShowResetModal(false);
      setResetConfirmText('');
      window.location.reload();
    }
  };

  const themeOptions = [
    { value: 'light', icon: Sun, label: '라이트' },
    { value: 'dark', icon: Moon, label: '다크' },
    { value: 'system', icon: Monitor, label: '시스템' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: '작게' },
    { value: 'medium', label: '보통' },
    { value: 'large', label: '크게' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="w-7 h-7" />
          설정
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          앱 환경설정을 관리하세요
        </p>
      </motion.div>

      {/* Appearance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-500" />
          외관
        </h2>

        {/* Theme Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">테마</label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value as any)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-dark-border hover:border-slate-300'
                }`}
              >
                <option.icon className={`w-6 h-6 mx-auto mb-2 ${
                  theme === option.value ? 'text-primary-500' : 'text-slate-400'
                }`} />
                <p className={`text-sm font-medium ${
                  theme === option.value ? 'text-primary-600 dark:text-primary-400' : ''
                }`}>
                  {option.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Type className="w-4 h-4" />
            글꼴 크기
          </label>
          <div className="flex gap-2">
            {fontSizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFontSize(option.value as any)}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  fontSize === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                    : 'border-slate-200 dark:border-dark-border hover:border-slate-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Sound & Notifications */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">소리 및 알림</h2>

        <div className="space-y-4">
          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-green-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="font-medium">효과음</p>
                <p className="text-sm text-slate-500">미션 완료, 레벨업 등의 효과음</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-blue-500" />
              ) : (
                <BellOff className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="font-medium">알림</p>
                <p className="text-sm text-slate-500">학습 리마인더 및 챌린지 알림</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* API Key */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-yellow-500" />
          AI 설정
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          AI 튜터와 바이브코딩 기능을 사용하려면 Gemini API 키가 필요합니다.
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline ml-1"
          >
            API 키 발급받기
          </a>
        </p>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Gemini API 키를 입력하세요"
              className="input pr-20"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700"
            >
              {showApiKey ? '숨기기' : '보기'}
            </button>
          </div>
          <Button
            variant="primary"
            onClick={handleSaveApiKey}
            leftIcon={<Check className="w-4 h-4" />}
          >
            저장
          </Button>
        </div>

        {geminiApiKey && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
            <Check className="w-4 h-4" /> API 키가 설정되었습니다
          </p>
        )}
      </Card>

      {/* Data Management */}
      <Card className="p-6 border-red-200 dark:border-red-900/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          데이터 관리
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          모든 학습 데이터를 초기화합니다. 이 작업은 되돌릴 수 없습니다.
        </p>
        <Button
          variant="danger"
          onClick={() => setShowResetModal(true)}
          leftIcon={<Trash2 className="w-4 h-4" />}
        >
          데이터 초기화
        </Button>
      </Card>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => {
          setShowResetModal(false);
          setResetConfirmText('');
        }}
        title="데이터 초기화"
        size="sm"
      >
        <div className="py-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
            정말로 모든 데이터를 초기화하시겠습니까?
            <br />
            <span className="text-red-600 font-medium">이 작업은 되돌릴 수 없습니다.</span>
          </p>
          <p className="text-sm text-center mb-2">
            확인하려면 <strong>"초기화"</strong>를 입력하세요:
          </p>
          <input
            type="text"
            value={resetConfirmText}
            onChange={(e) => setResetConfirmText(e.target.value)}
            placeholder="초기화"
            className="input mb-4"
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setShowResetModal(false);
                setResetConfirmText('');
              }}
            >
              취소
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              disabled={resetConfirmText !== '초기화'}
              onClick={handleResetData}
            >
              초기화
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
