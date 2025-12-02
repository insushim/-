import type { Unit } from '../../types';

export const unit8: Unit = {
  id: 'unit8',
  number: 8,
  title: 'AI와 바이브 코딩',
  description: 'AI 도구를 활용한 코딩과 자연어로 프로그래밍하는 바이브 코딩을 배워요!',
  icon: '🤖',
  color: 'from-violet-500 to-purple-500',
  unlockLevel: 70,
  totalMissions: 60,
  estimatedHours: 25,
  weeks: [
    {
      id: 'week-45',
      number: 45,
      title: 'AI 기초 이해하기',
      description: 'AI가 무엇인지, 어떻게 작동하는지 알아봐요',
      missions: [
        { id: '8-45-1', title: 'AI란 무엇일까?', description: '인공지능의 개념을 쉽게 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'AI 소개', hints: ['AI는 컴퓨터가 사람처럼 생각하는 거예요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-2', title: 'AI의 역사', description: 'AI가 어떻게 발전해왔는지 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'AI 역사', hints: ['1950년대부터 시작됐어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-3', title: '머신러닝이란?', description: '기계가 스스로 배우는 방법을 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 60, estimatedMinutes: 12, concept: '머신러닝 개념', hints: ['데이터에서 패턴을 찾아요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-4', title: 'AI 분류하기', description: 'AI, 머신러닝, 딥러닝의 차이를 알아봐요', type: 'quiz', difficulty: 'beginner', exp: 55, estimatedMinutes: 8, concept: 'AI 분류', hints: ['딥러닝은 머신러닝의 한 종류예요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-5', title: 'AI가 할 수 있는 것들', description: 'AI가 어떤 일을 할 수 있는지 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'AI 활용', hints: ['이미지 인식, 음성 인식, 번역 등'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-6', title: 'AI 도구 체험하기', description: '실제 AI 도구를 사용해봐요', type: 'hands-on', difficulty: 'beginner', exp: 70, estimatedMinutes: 15, concept: 'AI 도구 체험', hints: ['ChatGPT, DALL-E 같은 도구들이 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-7', title: 'AI와 대화하기', description: 'AI 챗봇과 대화하는 방법을 배워요', type: 'hands-on', difficulty: 'beginner', exp: 65, estimatedMinutes: 12, concept: 'AI 대화', hints: ['질문을 명확하게 해야 해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-8', title: '프롬프트란?', description: 'AI에게 명령하는 방법을 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: '프롬프트 개념', hints: ['AI에게 하는 질문이나 요청이에요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-9', title: 'AI 윤리', description: 'AI를 올바르게 사용하는 방법을 배워요', type: 'discussion', difficulty: 'beginner', exp: 55, estimatedMinutes: 10, concept: 'AI 윤리', hints: ['저작권과 개인정보를 존중해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-45-10', title: 'AI 기초 복습', description: '배운 내용을 정리해봐요', type: 'quiz', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: '종합 복습', hints: ['AI, ML, DL의 관계를 기억해요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-46',
      number: 46,
      title: '프롬프트 엔지니어링',
      description: 'AI에게 효과적으로 요청하는 방법을 배워요',
      missions: [
        { id: '8-46-1', title: '좋은 프롬프트란?', description: '효과적인 프롬프트의 특징을 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: '프롬프트 기초', hints: ['구체적이고 명확해야 해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-2', title: '역할 부여하기', description: 'AI에게 역할을 주는 방법을 배워요', type: 'hands-on', difficulty: 'beginner', exp: 60, estimatedMinutes: 12, concept: '역할 프롬프트', hints: ['"너는 선생님이야"라고 말해봐요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-3', title: '예시 주기', description: 'AI에게 예시를 보여주는 방법을 배워요', type: 'hands-on', difficulty: 'intermediate', exp: 65, estimatedMinutes: 12, concept: 'Few-shot 학습', hints: ['원하는 결과의 예시를 보여줘요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-4', title: '단계별 지시하기', description: '복잡한 작업을 나눠서 요청해봐요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '체인 오브 쏘트', hints: ['1단계, 2단계, 3단계로 나눠요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-5', title: '형식 지정하기', description: '원하는 출력 형식을 지정해봐요', type: 'hands-on', difficulty: 'intermediate', exp: 65, estimatedMinutes: 12, concept: '출력 형식', hints: ['"표로 정리해줘", "목록으로 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-6', title: '제약 조건 추가하기', description: '조건을 붙여서 요청해봐요', type: 'hands-on', difficulty: 'intermediate', exp: 65, estimatedMinutes: 12, concept: '제약 조건', hints: ['"100자 이내로", "초등학생도 이해하게"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-7', title: '프롬프트 개선하기', description: '프롬프트를 반복해서 개선해봐요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '반복 개선', hints: ['결과를 보고 프롬프트를 수정해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-8', title: '코딩 도움 받기', description: 'AI에게 코딩 도움을 요청해봐요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 15, concept: 'AI 코딩 도움', hints: ['코드 설명, 오류 수정 요청하기'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-9', title: '창작 도움 받기', description: 'AI와 함께 이야기를 만들어봐요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: 'AI 창작', hints: ['아이디어를 주고 발전시켜요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-46-10', title: '프롬프트 마스터', description: '배운 기술을 종합해봐요', type: 'coding', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: '프롬프트 종합', hints: ['역할, 예시, 형식을 모두 활용해요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-47',
      number: 47,
      title: '바이브 코딩 기초',
      description: '자연어로 코드를 작성하는 바이브 코딩을 시작해요',
      missions: [
        { id: '8-47-1', title: '바이브 코딩이란?', description: '자연어로 코딩하는 개념을 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: '바이브 코딩 소개', hints: ['말로 설명하면 AI가 코드를 만들어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-2', title: '첫 바이브 코딩', description: '간단한 프로그램을 말로 만들어봐요', type: 'hands-on', difficulty: 'beginner', exp: 60, estimatedMinutes: 12, concept: '첫 번째 바이브 코딩', hints: ['"Hello World를 출력해줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-3', title: '계산 프로그램 만들기', description: '계산하는 프로그램을 요청해봐요', type: 'hands-on', difficulty: 'beginner', exp: 65, estimatedMinutes: 12, concept: '계산 프로그램', hints: ['"두 숫자를 더하는 함수를 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-4', title: '코드 이해하기', description: 'AI가 만든 코드를 이해해봐요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '코드 분석', hints: ['코드를 설명해달라고 요청해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-5', title: '코드 수정 요청하기', description: 'AI에게 코드 수정을 요청해봐요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '코드 수정', hints: ['"이 부분을 이렇게 바꿔줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-6', title: '오류 해결하기', description: 'AI와 함께 오류를 해결해봐요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 15, concept: '디버깅', hints: ['에러 메시지를 AI에게 보여줘요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-7', title: '함수 만들기', description: '바이브 코딩으로 함수를 만들어봐요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '함수 생성', hints: ['기능을 설명하면 함수가 만들어져요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-8', title: '게임 요소 만들기', description: '간단한 게임 기능을 만들어봐요', type: 'hands-on', difficulty: 'intermediate', exp: 80, estimatedMinutes: 18, concept: '게임 프로그래밍', hints: ['"숫자 맞추기 게임을 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-9', title: '코드 리뷰 받기', description: 'AI에게 코드 리뷰를 요청해봐요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 15, concept: '코드 리뷰', hints: ['"이 코드를 더 좋게 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-47-10', title: '바이브 코딩 실습', description: '자유 주제로 프로그램을 만들어봐요', type: 'coding', difficulty: 'intermediate', exp: 100, estimatedMinutes: 25, concept: '자유 실습', hints: ['원하는 프로그램을 설명해봐요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-48',
      number: 48,
      title: 'AI 코딩 도구',
      description: '다양한 AI 코딩 도구를 사용해봐요',
      missions: [
        { id: '8-48-1', title: 'AI 코딩 도구 소개', description: '다양한 AI 코딩 도구를 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'AI 코딩 도구', hints: ['GitHub Copilot, Cursor 등이 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-2', title: '코드 자동완성', description: 'AI가 코드를 자동완성하는 원리를 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 55, estimatedMinutes: 10, concept: '코드 자동완성', hints: ['문맥을 파악해서 다음 코드를 예측해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-3', title: '주석으로 코딩하기', description: '주석을 쓰면 코드가 생성돼요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '주석 기반 코딩', hints: ['// 두 숫자를 더하는 함수'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-4', title: '코드 설명 받기', description: 'AI에게 코드 설명을 요청해봐요', type: 'hands-on', difficulty: 'beginner', exp: 60, estimatedMinutes: 12, concept: '코드 설명', hints: ['복잡한 코드도 쉽게 설명받을 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-5', title: '리팩토링 요청하기', description: '코드를 더 깔끔하게 만들어달라고 해봐요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '리팩토링', hints: ['중복 제거, 변수명 개선 등'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-6', title: '테스트 코드 만들기', description: 'AI와 함께 테스트 코드를 만들어봐요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 15, concept: '테스트 코드', hints: ['"이 함수의 테스트를 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-7', title: '문서화 자동화', description: '코드 문서를 자동으로 만들어봐요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '문서화', hints: ['함수 설명, 매개변수 설명 등'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-8', title: '코드 번역하기', description: '다른 언어로 코드를 변환해봐요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 15, concept: '코드 변환', hints: ['Python을 JavaScript로 바꿔줘'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-9', title: 'AI 도구 비교하기', description: '여러 AI 도구의 장단점을 비교해봐요', type: 'discussion', difficulty: 'intermediate', exp: 60, estimatedMinutes: 12, concept: '도구 비교', hints: ['각 도구마다 특징이 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-48-10', title: 'AI 도구 활용 프로젝트', description: 'AI 도구를 활용해 프로젝트를 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 120, estimatedMinutes: 30, concept: '종합 프로젝트', hints: ['배운 AI 도구들을 모두 활용해요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-49',
      number: 49,
      title: '바이브 코딩 심화',
      description: '더 복잡한 프로젝트를 바이브 코딩으로 만들어요',
      missions: [
        { id: '8-49-1', title: '복잡한 요구사항 설명하기', description: '복잡한 프로젝트를 잘 설명하는 방법을 배워요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 12, concept: '요구사항 정의', hints: ['기능을 하나씩 나눠서 설명해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-2', title: '웹 페이지 만들기', description: '바이브 코딩으로 웹 페이지를 만들어봐요', type: 'hands-on', difficulty: 'intermediate', exp: 80, estimatedMinutes: 20, concept: '웹 개발', hints: ['"프로필 페이지를 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-3', title: '인터랙티브 요소 추가', description: '웹 페이지에 상호작용 기능을 추가해봐요', type: 'hands-on', difficulty: 'intermediate', exp: 85, estimatedMinutes: 20, concept: '인터랙션', hints: ['버튼 클릭, 애니메이션 등'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-4', title: 'API 연동하기', description: '외부 데이터를 가져오는 코드를 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 90, estimatedMinutes: 25, concept: 'API 연동', hints: ['"날씨 정보를 가져오는 코드를 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-5', title: '데이터 시각화', description: '데이터를 차트로 보여주는 코드를 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 90, estimatedMinutes: 25, concept: '데이터 시각화', hints: ['"막대 그래프를 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-6', title: '게임 만들기', description: '바이브 코딩으로 간단한 게임을 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 100, estimatedMinutes: 30, concept: '게임 개발', hints: ['"뱀 게임을 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-7', title: '코드 디버깅 마스터', description: 'AI와 함께 복잡한 버그를 해결해봐요', type: 'coding', difficulty: 'advanced', exp: 85, estimatedMinutes: 20, concept: '고급 디버깅', hints: ['문제 상황을 자세히 설명해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-8', title: '성능 최적화', description: '코드를 더 빠르게 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 85, estimatedMinutes: 20, concept: '최적화', hints: ['"이 코드를 더 빠르게 만들어줘"'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-9', title: '협업 코딩', description: 'AI와 함께 큰 프로젝트를 나눠서 작업해봐요', type: 'hands-on', difficulty: 'advanced', exp: 90, estimatedMinutes: 25, concept: '협업', hints: ['파일별로 나눠서 요청해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-49-10', title: '바이브 코딩 마스터 프로젝트', description: '배운 모든 기술로 프로젝트를 완성해봐요', type: 'coding', difficulty: 'advanced', exp: 150, estimatedMinutes: 40, concept: '종합 프로젝트', hints: ['처음부터 끝까지 AI와 함께!'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-50',
      number: 50,
      title: 'AI 시대의 개발자',
      description: 'AI와 함께 일하는 미래의 개발자가 되어봐요',
      missions: [
        { id: '8-50-1', title: 'AI와 개발자의 역할', description: 'AI 시대에 개발자가 하는 일을 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: '개발자 역할', hints: ['AI는 도구이고, 개발자는 문제를 해결해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-2', title: '창의적 문제 해결', description: '창의적으로 문제를 해결하는 방법을 배워요', type: 'discussion', difficulty: 'intermediate', exp: 65, estimatedMinutes: 15, concept: '창의적 사고', hints: ['AI가 못하는 것을 인간이 해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-3', title: '좋은 질문 만들기', description: '문제를 잘 정의하는 방법을 배워요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '문제 정의', hints: ['좋은 질문이 좋은 답을 만들어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-4', title: 'AI 결과 검증하기', description: 'AI의 답을 확인하는 방법을 배워요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 18, concept: '결과 검증', hints: ['AI도 실수할 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-5', title: '지속적인 학습', description: 'AI 시대에 계속 성장하는 방법을 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 55, estimatedMinutes: 10, concept: '평생 학습', hints: ['기술은 계속 변해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-6', title: 'AI 윤리와 책임', description: 'AI를 책임감 있게 사용하는 방법을 배워요', type: 'discussion', difficulty: 'intermediate', exp: 65, estimatedMinutes: 15, concept: 'AI 윤리', hints: ['편향, 개인정보, 저작권 문제'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-7', title: '미래 기술 탐구', description: '앞으로 나올 AI 기술을 알아봐요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 12, concept: '미래 기술', hints: ['AGI, 멀티모달 AI 등'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-8', title: '나만의 AI 활용법', description: '나에게 맞는 AI 활용 방법을 찾아봐요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '개인화', hints: ['나의 강점과 AI를 결합해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-9', title: 'AI 포트폴리오', description: 'AI와 함께 만든 작품을 정리해봐요', type: 'hands-on', difficulty: 'advanced', exp: 90, estimatedMinutes: 25, concept: '포트폴리오', hints: ['지금까지 만든 프로젝트를 모아요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-50-10', title: 'AI 시대의 개발자 선언', description: 'AI 시대의 개발자로서 각오를 다져봐요', type: 'writing', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: '비전 선언', hints: ['어떤 개발자가 되고 싶은지 써봐요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-51',
      number: 51,
      title: 'AI 코딩 실전 프로젝트',
      description: 'AI를 활용해서 실전 프로젝트를 완성해요',
      missions: [
        { id: '8-51-1', title: 'AI 챗봇 만들기', description: 'API를 활용한 간단한 AI 챗봇을 만들어요', type: 'coding', language: 'javascript', difficulty: 'advanced', exp: 180, estimatedMinutes: 40, concept: 'AI API 활용', starterCode: '// OpenAI API 또는 다른 AI API 사용\n// 사용자 입력 받기\n// API 응답을 화면에 표시', hints: ['fetch로 API 호출', 'API 키 관리에 주의'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-2', title: '이미지 생성 앱', description: 'AI 이미지 생성 API로 그림을 만들어요', type: 'hands-on', difficulty: 'intermediate', exp: 150, estimatedMinutes: 35, concept: '이미지 생성 AI', starterCode: '// DALL-E 또는 Stable Diffusion API\n// 프롬프트 입력 폼\n// 생성된 이미지 표시', hints: ['좋은 프롬프트가 좋은 이미지를 만들어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-3', title: '음성 인식 메모', description: '음성을 텍스트로 변환하는 메모 앱', type: 'coding', language: 'javascript', difficulty: 'advanced', exp: 170, estimatedMinutes: 38, concept: 'Web Speech API', starterCode: '// SpeechRecognition API 사용\n// 마이크로 음성 입력\n// 실시간으로 텍스트 변환', hints: ['webkitSpeechRecognition', '브라우저 지원 확인'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-4', title: '번역 앱', description: 'AI 번역 API를 활용한 번역기', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 140, estimatedMinutes: 30, concept: '번역 API', starterCode: '// Google Translate 또는 DeepL API\n// 언어 선택 드롭다운\n// 실시간 번역 결과', hints: ['API 키 필요', '언어 코드 매핑'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-5', title: '감정 분석 앱', description: '텍스트의 감정을 분석하는 앱', type: 'coding', language: 'javascript', difficulty: 'advanced', exp: 160, estimatedMinutes: 35, concept: '감정 분석 AI', starterCode: '// 감정 분석 API 사용\n// 텍스트 입력\n// 긍정/부정/중립 결과 표시', hints: ['API로 감정 점수 받기', '결과를 시각화'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-6', title: '코드 자동완성 도우미', description: 'AI 코드 제안을 보여주는 에디터', type: 'hands-on', difficulty: 'advanced', exp: 175, estimatedMinutes: 40, concept: '코드 생성 AI', starterCode: '// Monaco Editor 사용\n// 자동완성 요청 시 AI 호출\n// 제안 표시', hints: ['에디터 이벤트 핸들링', 'API 응답을 제안으로 변환'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-7', title: '요약 앱', description: '긴 글을 AI로 요약하는 앱', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 145, estimatedMinutes: 32, concept: '텍스트 요약', starterCode: '// AI 요약 API 사용\n// 긴 텍스트 입력\n// 요약 결과 표시\n// 요약 길이 조절', hints: ['토큰 제한 고려', '프롬프트 엔지니어링'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-8', title: 'AI 추천 시스템', description: '사용자 취향에 맞는 콘텐츠를 추천해요', type: 'coding', language: 'javascript', difficulty: 'advanced', exp: 165, estimatedMinutes: 38, concept: '추천 알고리즘', starterCode: '// 사용자 선호도 입력\n// AI로 추천 생성\n// 결과 표시 및 피드백', hints: ['유사도 기반 추천', '사용자 피드백 반영'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-9', title: 'AI 퀴즈 생성기', description: 'AI가 퀴즈 문제를 만들어주는 앱', type: 'coding', language: 'javascript', difficulty: 'intermediate', exp: 155, estimatedMinutes: 35, concept: '콘텐츠 생성', starterCode: '// 주제 입력\n// AI로 퀴즈 생성\n// 정답 확인 기능', hints: ['JSON 형식으로 퀴즈 구조화', '난이도 조절'], unlocked: true, completed: false, perfectScore: false },
        { id: '8-51-10', title: 'AI와 바이브 코딩 마스터 테스트', description: 'AI 활용 코딩의 모든 것을 마무리하는 테스트', type: 'quiz', difficulty: 'intermediate', exp: 180, estimatedMinutes: 25, concept: '종합 복습', hints: ['AI API, 프롬프트 엔지니어링을 복습하세요'], unlocked: true, completed: false, perfectScore: false }
      ]
    }
  ]
};
