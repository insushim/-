import { unit1 } from './unit1-thinking';
import { unit2 } from './unit2-blocks';
import { unit3 } from './unit3-python-basics';
import { unit4 } from './unit4-python-advanced';
import type { Unit, Mission, Week } from '../../types';

// Unit 5-9 요약 (간소화된 구조)
export const unit5: Unit = {
  id: 'unit-5',
  number: 5,
  title: 'JavaScript 입문',
  description: '웹의 언어, JavaScript를 배워요',
  icon: '💛',
  color: '#f7df1e',
  unlockLevel: 35,
  totalMissions: 40,
  estimatedHours: 16,
  weeks: [
    {
      id: 'week-27',
      number: 27,
      title: 'JavaScript 기초',
      description: '콘솔 출력과 변수를 배워요',
      missions: [
        { id: '5-27-1', title: '콘솔 출력', description: 'console.log()로 메시지를 출력해보세요', type: 'coding', language: 'javascript', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'console.log', hints: ['console.log()로 출력해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-27-2', title: '변수 선언', description: 'let과 const의 차이를 이해해보세요', type: 'coding', language: 'javascript', difficulty: 'beginner', exp: 70, estimatedMinutes: 15, concept: 'let, const', hints: ['let은 변경 가능, const는 상수'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-27-3', title: '템플릿 리터럴', description: '백틱으로 문자열을 조합해보세요', type: 'coding', language: 'javascript', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'Template literal', hints: ['`${변수}` 형식으로 사용'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-27-4', title: '배열 기초', description: 'JavaScript 배열을 만들고 조작해보세요', type: 'coding', language: 'javascript', difficulty: 'beginner', exp: 90, estimatedMinutes: 20, concept: 'Array', hints: ['push, pop, shift 등 메서드'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-27-5', title: '객체 기초', description: '객체로 데이터를 구조화해보세요', type: 'coding', language: 'javascript', difficulty: 'beginner', exp: 100, estimatedMinutes: 20, concept: 'Object', hints: ['{키: 값} 형태로 생성'], unlocked: true, completed: false, perfectScore: false },
      ],
    },
    {
      id: 'week-29',
      number: 29,
      title: 'DOM 조작',
      description: '웹페이지를 JavaScript로 조작해요',
      missions: [
        { id: '5-29-1', title: '요소 선택', description: 'getElementById, querySelector 사용해보세요', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: 'DOM 선택', hints: ['document.querySelector 사용'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-29-2', title: '내용 변경', description: 'innerHTML, textContent를 조작해보세요', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 90, estimatedMinutes: 15, concept: 'DOM 수정', hints: ['element.textContent = 새내용'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-29-3', title: '스타일 변경', description: 'JavaScript로 CSS를 변경해보세요', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: 'style 속성', hints: ['element.style.color = "red"'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-29-4', title: '이벤트 리스너', description: '클릭 이벤트를 처리해보세요', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 120, estimatedMinutes: 20, concept: 'addEventListener', hints: ['element.addEventListener("click", 함수)'], unlocked: true, completed: false, perfectScore: false },
        { id: '5-29-5', title: '요소 생성', description: 'createElement로 새 요소를 만들어보세요', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 130, estimatedMinutes: 25, concept: 'createElement', hints: ['document.createElement, appendChild'], unlocked: true, completed: false, perfectScore: false },
      ],
    },
  ],
};

export const unit6: Unit = {
  id: 'unit-6',
  number: 6,
  title: 'HTML/CSS 기초',
  description: '웹페이지의 구조와 스타일을 배워요',
  icon: '🌐',
  color: '#e34c26',
  unlockLevel: 40,
  totalMissions: 30,
  estimatedHours: 12,
  weeks: [
    {
      id: 'week-33',
      number: 33,
      title: 'HTML 구조',
      description: '웹의 뼈대 HTML을 배워요',
      missions: [
        { id: '6-33-1', title: 'HTML 기본 구조', description: 'DOCTYPE, html, head, body를 이해해보세요', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 15, concept: 'HTML 구조', hints: ['<!DOCTYPE html>로 시작'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-2', title: '텍스트 태그', description: 'h1-h6, p, span을 사용해보세요', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 15, concept: '텍스트 요소', hints: ['<h1>은 가장 큰 제목'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-3', title: '링크와 이미지', description: 'a 태그와 img 태그를 사용해보세요', type: 'coding', language: 'html', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'a, img', hints: ['<a href="URL">텍스트</a>'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-4', title: '폼 만들기', description: 'form, input, button을 사용해보세요', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 100, estimatedMinutes: 25, concept: 'Form 요소', hints: ['<input type="text">'], unlocked: true, completed: false, perfectScore: false },
      ],
    },
    {
      id: 'week-35',
      number: 35,
      title: 'CSS 스타일링',
      description: '웹의 옷 CSS를 배워요',
      missions: [
        { id: '6-35-1', title: '선택자 기초', description: '태그, 클래스, ID 선택자를 사용해보세요', type: 'coding', language: 'css', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'CSS 선택자', hints: ['.클래스, #id, 태그'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-2', title: '박스 모델', description: 'margin, padding, border를 이해해보세요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: 'Box Model', hints: ['margin은 바깥 여백'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-3', title: 'Flexbox', description: '유연한 레이아웃을 만들어보세요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 150, estimatedMinutes: 30, concept: 'Flexbox', hints: ['display: flex'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-4', title: '반응형 디자인', description: '미디어 쿼리를 사용해보세요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 130, estimatedMinutes: 25, concept: 'Media Query', hints: ['@media (max-width: 768px)'], unlocked: true, completed: false, perfectScore: false },
      ],
    },
  ],
};

export const unit7: Unit = {
  id: 'unit-7',
  number: 7,
  title: '미니 프로젝트',
  description: '실제 프로젝트를 만들며 실력을 키워요',
  icon: '🚀',
  color: '#8b5cf6',
  unlockLevel: 50,
  totalMissions: 15,
  estimatedHours: 24,
  weeks: [
    {
      id: 'week-37',
      number: 37,
      title: 'Python 프로젝트',
      description: 'Python으로 실제 프로젝트를 만들어요',
      missions: [
        { id: '7-37-1', title: '텍스트 RPG 게임', description: '선택에 따라 스토리가 달라지는 게임', type: 'coding', language: 'python', difficulty: 'intermediate', exp: 500, estimatedMinutes: 180, concept: '종합', hints: ['딕셔너리로 상태 관리'], unlocked: true, completed: false, perfectScore: false },
        { id: '7-37-2', title: '데이터 분석기', description: 'CSV 파일을 분석하는 프로그램', type: 'coding', language: 'python', difficulty: 'intermediate', exp: 450, estimatedMinutes: 150, concept: '파일 처리', hints: ['csv 모듈 사용'], unlocked: true, completed: false, perfectScore: false },
      ],
    },
    {
      id: 'week-39',
      number: 39,
      title: 'Web 프로젝트',
      description: '웹 프로젝트를 만들어요',
      missions: [
        { id: '7-39-1', title: 'To-Do 리스트', description: '할 일 관리 웹앱', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 450, estimatedMinutes: 120, concept: 'DOM, 이벤트', hints: ['localStorage로 저장'], unlocked: true, completed: false, perfectScore: false },
        { id: '7-39-2', title: '계산기 앱', description: '사칙연산 계산기', type: 'coding', language: 'javascript', difficulty: 'beginner', exp: 350, estimatedMinutes: 90, concept: 'DOM', hints: ['버튼 클릭 이벤트'], unlocked: true, completed: false, perfectScore: false },
        { id: '7-39-3', title: '날씨 앱', description: 'API로 날씨 표시', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 500, estimatedMinutes: 150, concept: 'fetch API', hints: ['openweathermap API'], unlocked: true, completed: false, perfectScore: false },
      ],
    },
  ],
};

export const unit8: Unit = {
  id: 'unit-8',
  number: 8,
  title: 'AI & 바이브코딩',
  description: 'AI를 이해하고 AI와 함께 코딩해요',
  icon: '🤖',
  color: '#06b6d4',
  unlockLevel: 60,
  totalMissions: 30,
  estimatedHours: 16,
  weeks: [
    {
      id: 'week-43',
      number: 43,
      title: 'AI 이해하기',
      description: 'AI의 세계로 들어가요',
      missions: [
        { id: '8-43-1', title: 'AI란 무엇인가?', description: 'AI의 정의와 역사를 배워요', type: 'interactive-lesson', difficulty: 'beginner', exp: 100, estimatedMinutes: 30, concept: 'AI 개념', hints: [], unlocked: true, completed: false, perfectScore: false },
        { id: '8-43-2', title: 'AI 체험하기', description: '다양한 AI 서비스를 체험해요', type: 'hands-on', difficulty: 'beginner', exp: 120, estimatedMinutes: 40, concept: 'AI 활용', hints: [], unlocked: true, completed: false, perfectScore: false },
      ],
    },
    {
      id: 'week-45',
      number: 45,
      title: '프롬프트 엔지니어링',
      description: 'AI와 효과적으로 대화하는 방법을 배워요',
      missions: [
        { id: '8-45-1', title: '좋은 프롬프트란?', description: '명확한 지시 작성법', type: 'interactive-lesson', difficulty: 'beginner', exp: 100, estimatedMinutes: 20, concept: '프롬프트', hints: [], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-2', title: '역할 부여하기', description: 'AI에게 역할을 주는 방법', type: 'interactive-lesson', difficulty: 'beginner', exp: 110, estimatedMinutes: 20, concept: '역할 프롬프트', hints: [], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-3', title: '바이브코딩 실전', description: 'AI로 실제 코드를 만들어요', type: 'coding', difficulty: 'intermediate', exp: 200, estimatedMinutes: 60, concept: '바이브코딩', hints: [], unlocked: true, completed: false, perfectScore: false },
      ],
    },
  ],
};

export const unit9: Unit = {
  id: 'unit-9',
  number: 9,
  title: '고급 주제 & 최종',
  description: 'API, 데이터, 최종 프로젝트',
  icon: '👑',
  color: '#f59e0b',
  unlockLevel: 70,
  totalMissions: 20,
  estimatedHours: 20,
  weeks: [
    {
      id: 'week-49',
      number: 49,
      title: 'API와 데이터',
      description: '외부 데이터를 활용해요',
      missions: [
        { id: '9-49-1', title: 'API란?', description: 'API의 개념을 이해해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 80, estimatedMinutes: 20, concept: 'API', hints: [], unlocked: true, completed: false, perfectScore: false },
        { id: '9-49-2', title: '공공 API 사용', description: '실제 API를 호출해요', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 150, estimatedMinutes: 40, concept: 'fetch', hints: [], unlocked: true, completed: false, perfectScore: false },
      ],
    },
    {
      id: 'week-51',
      number: 51,
      title: '최종 프로젝트',
      description: '1년간 배운 모든 것을 종합해요',
      missions: [
        { id: '9-51-1', title: '최종 프로젝트', description: '나만의 프로젝트를 완성해요', type: 'coding', difficulty: 'advanced', exp: 1000, estimatedMinutes: 480, concept: '종합', hints: [], unlocked: true, completed: false, perfectScore: false },
      ],
      project: {
        id: 'proj-final',
        title: '최종 프로젝트',
        description: '1년간 배운 모든 것을 활용한 자유 프로젝트',
        difficulty: 'advanced',
        duration: '2주',
        requirements: ['자유 주제', '배운 기술 3개 이상 활용', '발표'],
        exp: 1000,
        badge: 'code_master',
      },
    },
  ],
};

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

export { unit1, unit2, unit3, unit4 };

// Re-export badges from progressStore
export { badges } from '../../stores/progressStore';
