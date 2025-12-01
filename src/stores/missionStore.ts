import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Mission, CodeExecutionResult, TestResult } from '../types';

interface MissionState {
  currentMission: Mission | null;
  code: string;
  output: string;
  isRunning: boolean;
  executionResult: CodeExecutionResult | null;
  hintsUsed: number;
  showHint: boolean;
  currentHintIndex: number;
  startTime: number | null;
  elapsedTime: number;

  // Actions
  setCurrentMission: (mission: Mission | null) => void;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setIsRunning: (running: boolean) => void;
  setExecutionResult: (result: CodeExecutionResult | null) => void;
  useHint: () => string | null;
  hideHint: () => void;
  startTimer: () => void;
  stopTimer: () => number;
  resetMission: () => void;
}

export const useMissionStore = create<MissionState>()(
  immer((set, get) => ({
    currentMission: null,
    code: '',
    output: '',
    isRunning: false,
    executionResult: null,
    hintsUsed: 0,
    showHint: false,
    currentHintIndex: -1,
    startTime: null,
    elapsedTime: 0,

    setCurrentMission: (mission) => {
      set((state) => {
        state.currentMission = mission;
        state.code = mission?.starterCode || '';
        state.output = '';
        state.executionResult = null;
        state.hintsUsed = 0;
        state.showHint = false;
        state.currentHintIndex = -1;
        state.startTime = Date.now();
        state.elapsedTime = 0;
      });
    },

    setCode: (code) => {
      set((state) => {
        state.code = code;
      });
    },

    setOutput: (output) => {
      set((state) => {
        state.output = output;
      });
    },

    setIsRunning: (running) => {
      set((state) => {
        state.isRunning = running;
      });
    },

    setExecutionResult: (result) => {
      set((state) => {
        state.executionResult = result;
        if (result) {
          state.output = result.output;
        }
      });
    },

    useHint: () => {
      const { currentMission, currentHintIndex } = get();
      if (!currentMission || !currentMission.hints.length) return null;

      const nextIndex = currentHintIndex + 1;
      if (nextIndex >= currentMission.hints.length) return null;

      set((state) => {
        state.hintsUsed += 1;
        state.showHint = true;
        state.currentHintIndex = nextIndex;
      });

      return currentMission.hints[nextIndex];
    },

    hideHint: () => {
      set((state) => {
        state.showHint = false;
      });
    },

    startTimer: () => {
      set((state) => {
        state.startTime = Date.now();
      });
    },

    stopTimer: () => {
      const { startTime } = get();
      if (!startTime) return 0;

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      set((state) => {
        state.elapsedTime = elapsed;
      });

      return elapsed;
    },

    resetMission: () => {
      const { currentMission } = get();
      set((state) => {
        state.code = currentMission?.starterCode || '';
        state.output = '';
        state.executionResult = null;
        state.showHint = false;
        state.startTime = Date.now();
      });
    },
  }))
);
