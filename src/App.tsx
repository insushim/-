import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/Layout';

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

const App: React.FC = () => {
  return (
    <BrowserRouter>
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default App;
