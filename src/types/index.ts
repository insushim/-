// User Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  exp: number;
  totalExp: number;
  title: string;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  createdAt: string;
  settings: UserSettings;
  stats: UserStats;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  tutorPersonality: 'friendly' | 'professional' | 'gamey';
  language: 'ko' | 'en';
}

export interface UserStats {
  totalMissionsCompleted: number;
  totalProjectsCompleted: number;
  totalCodeWritten: number;
  totalTimeSpent: number;
  perfectScores: number;
  hintsUsed: number;
  aiConversations: number;
  longestStreak: number;
  averageAccuracy: number;
}

// Curriculum Types
export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  weeks: Week[];
  unlockLevel: number;
  totalMissions: number;
  estimatedHours: number;
}

export interface Week {
  id: string;
  number: number;
  title: string;
  description: string;
  missions: Mission[];
  project?: Project;
  quiz?: Quiz;
  miniGame?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language?: 'python' | 'javascript' | 'html' | 'css' | 'blocks';
  exp: number;
  estimatedMinutes: number;
  concept?: string;
  starterCode?: string;
  solution?: string;
  expectedOutput?: string;
  hints: string[];
  testCases?: TestCase[];
  requirements?: string[];
  blocks?: string[];
  unlocked: boolean;
  completed: boolean;
  perfectScore: boolean;
}

export type MissionType =
  | 'coding'
  | 'drag-drop'
  | 'visual-programming'
  | 'writing'
  | 'pattern-recognition'
  | 'quiz'
  | 'audio-visual'
  | 'visual-puzzle'
  | 'interactive-lesson'
  | 'hands-on'
  | 'discussion';

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  requirements: string[];
  tech?: string[];
  exp: number;
  badge?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Progress Types
export interface Progress {
  unitsProgress: Record<string, UnitProgress>;
  completedMissions: string[];
  completedProjects: string[];
  earnedBadges: string[];
  dailyChallenges: DailyChallengeProgress;
  weeklyChallenges: WeeklyChallengeProgress;
}

export interface UnitProgress {
  unitId: string;
  started: boolean;
  completed: boolean;
  missionsCompleted: number;
  totalMissions: number;
  lastMissionId?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface DailyChallengeProgress {
  date: string;
  completed: boolean;
  challengeId: string;
}

export interface WeeklyChallengeProgress {
  weekStart: string;
  completed: boolean;
  challengeId: string;
  progress: number;
}

// Badge Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'challenge' | 'skill' | 'social' | 'special';
  condition: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
}

// Gamification Types
export interface Level {
  level: number;
  expRequired: number;
  title: string;
  rewards?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
  reward: number;
}

export interface Challenge {
  id: string;
  type: 'daily' | 'weekly' | 'seasonal';
  title: string;
  description: string;
  task: string;
  reward: number;
  progress: number;
  target: number;
  completed: boolean;
  expiresAt: string;
}

// AI Tutor Types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string | Date;
  codeBlocks?: CodeBlock[];
}

export interface CodeBlock {
  language: string;
  code: string;
}

export interface AITutorConfig {
  personality: 'friendly' | 'professional' | 'gamey';
  name: string;
  avatar: string;
  systemPrompt: string;
}

// Code Execution Types
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  testResults?: TestResult[];
}

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  description?: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  level: number;
  exp: number;
  streak: number;
  badges: number;
}

// Activity Types
export interface Activity {
  id: string;
  type: 'mission' | 'project' | 'badge' | 'level' | 'streak' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  exp?: number;
  icon?: string;
}

// Game Types
export interface GameScore {
  gameId: string;
  score: number;
  playedAt: string;
  duration: number;
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  highScore: number;
  playCount: number;
}

// Vibe Coding Types
export interface VibeCodingRequest {
  prompt: string;
  language: 'python' | 'javascript' | 'html';
  complexity: 'simple' | 'medium' | 'complex';
}

export interface VibeCodingResponse {
  understanding: string;
  code: string;
  explanation: string;
  customizationIdeas: string[];
  nextSteps: string[];
}
