import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/Layout';
import { useSettingsStore } from './stores/settingsStore';
import { useAuthStore } from './stores/authStore';

// Pages
import Home from './pages/Home';
import Learn from './pages/Learn';
import Mission from './pages/Mission';
import VibeCoding from './pages/VibeCoding';
import Games from './pages/Games';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';
import AITutor from './pages/AITutor';

// Auth Pages
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const initializeApiKey = useSettingsStore((state) => state.initializeApiKey);
  const initAuth = useAuthStore((state) => state.initAuth);

  // 앱 시작 시 환경변수에서 API 키 초기화 및 인증 초기화
  useEffect(() => {
    initializeApiKey();
    initAuth();
  }, [initializeApiKey, initAuth]);

  return (
    <AppShell>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />

        {/* Learning Routes */}
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:unitId" element={<Learn />} />
        <Route path="/learn/:unitId/:weekId" element={<Learn />} />

        {/* Mission Route */}
        <Route path="/mission/:missionId" element={<Mission />} />

        {/* Feature Routes */}
        <Route path="/vibe-coding" element={<VibeCoding />} />
        <Route path="/games" element={<Games />} />
        <Route path="/ai-tutor" element={<AITutor />} />

        {/* User Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/teacher" element={<RegisterTeacher />} />

        {/* Dashboard Routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
};

export default App;
