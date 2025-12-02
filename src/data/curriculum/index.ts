import { unit1 } from './unit1-thinking';
import { unit2 } from './unit2-blocks';
import { unit3 } from './unit3-python-basics';
import { unit4 } from './unit4-python-advanced';
import { unit5 } from './unit5-javascript';
import { unit6 } from './unit6-html-css';
import { unit7 } from './unit7-projects';
import { unit8 } from './unit8-ai-vibe';
import { unit9 } from './unit9-advanced';
import type { Unit, Mission, Week } from '../../types';

// 모든 유닛 통합
export const allUnits: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9];

// 헬퍼 함수들
export const getUnitById = (unitId: string): Unit | undefined => {
  return allUnits.find(unit => unit.id === unitId);
};

export const getMissionById = (missionId: string): Mission | undefined => {
  for (const unit of allUnits) {
    for (const week of unit.weeks) {
      const mission = week.missions.find(m => m.id === missionId);
      if (mission) return mission;
    }
  }
  return undefined;
};

export const getWeekById = (weekId: string): Week | undefined => {
  for (const unit of allUnits) {
    const week = unit.weeks.find(w => w.id === weekId);
    if (week) return week;
  }
  return undefined;
};

export const getTotalMissions = (): number => {
  return allUnits.reduce((total, unit) => {
    return total + unit.weeks.reduce((weekTotal, week) => weekTotal + week.missions.length, 0);
  }, 0);
};

export const getUnlockedUnits = (userLevel: number): Unit[] => {
  return allUnits.filter(unit => unit.unlockLevel <= userLevel);
};

export { unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9 };

// Re-export badges from progressStore
export { badges } from '../../stores/progressStore';
