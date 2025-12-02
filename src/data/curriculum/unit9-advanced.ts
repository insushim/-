import type { Unit } from '../../types';

export const unit9: Unit = {
  id: 'unit9',
  number: 9,
  title: '고급 주제 & 최종 프로젝트',
  description: '심화 학습과 최종 프로젝트로 코딩 여정을 완성해요!',
  icon: '🏆',
  color: 'from-amber-500 to-orange-500',
  unlockLevel: 85,
  totalMissions: 60,
  estimatedHours: 30,
  weeks: [
    {
      id: 'week-51',
      number: 51,
      title: '고급 JavaScript',
      description: 'JavaScript 심화 개념을 배워요',
      missions: [
        { id: '9-51-1', title: '클로저 이해하기', description: '클로저의 개념과 활용법을 배워요', type: 'interactive-lesson', difficulty: 'advanced', exp: 70, estimatedMinutes: 15, concept: '클로저', hints: ['함수가 자신이 생성될 때의 환경을 기억해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-2', title: '클로저 실습', description: '클로저로 private 변수를 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 80, estimatedMinutes: 20, concept: '클로저 활용', hints: ['외부에서 접근할 수 없는 변수를 만들 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-3', title: 'this 키워드', description: 'this가 어떻게 작동하는지 알아봐요', type: 'interactive-lesson', difficulty: 'advanced', exp: 70, estimatedMinutes: 15, concept: 'this 바인딩', hints: ['함수가 호출되는 방식에 따라 달라져요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-4', title: 'ES6 클래스', description: '클래스 문법으로 객체를 만들어봐요', type: 'coding', difficulty: 'advanced', exp: 80, estimatedMinutes: 20, concept: '클래스', hints: ['객체를 생성하는 템플릿이에요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-5', title: '프로미스 심화', description: 'Promise의 작동 원리를 깊이 이해해요', type: 'interactive-lesson', difficulty: 'advanced', exp: 75, estimatedMinutes: 18, concept: 'Promise', hints: ['pending, fulfilled, rejected 상태가 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-6', title: 'async/await 마스터', description: '비동기 코드를 깔끔하게 작성해요', type: 'coding', difficulty: 'advanced', exp: 85, estimatedMinutes: 20, concept: 'async/await', hints: ['try-catch로 에러를 처리해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-7', title: '구조 분해 할당', description: '객체와 배열을 편하게 다뤄요', type: 'coding', difficulty: 'intermediate', exp: 65, estimatedMinutes: 15, concept: '디스트럭처링', hints: ['const { a, b } = obj 형태로 사용해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-8', title: '모듈 시스템', description: 'import와 export를 배워요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 12, concept: 'ES 모듈', hints: ['코드를 파일별로 분리해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-9', title: '고급 배열 메서드', description: 'reduce와 유용한 메서드들을 배워요', type: 'coding', difficulty: 'advanced', exp: 80, estimatedMinutes: 20, concept: 'Array 메서드', hints: ['reduce는 배열을 하나의 값으로 줄여요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-51-10', title: '고급 JS 복습', description: '배운 내용을 정리해봐요', type: 'quiz', difficulty: 'advanced', exp: 90, estimatedMinutes: 20, concept: '종합 복습', hints: ['클로저, this, Promise를 기억해요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-52',
      number: 52,
      title: '개발 도구와 워크플로우',
      description: '실무에서 사용하는 도구들을 배워요',
      missions: [
        { id: '9-52-1', title: 'Git 기초', description: '버전 관리 시스템 Git을 배워요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 12, concept: 'Git 기초', hints: ['git init, add, commit을 배워요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-2', title: 'Git 브랜치', description: '브랜치로 작업을 분리해요', type: 'hands-on', difficulty: 'intermediate', exp: 65, estimatedMinutes: 15, concept: 'Git 브랜치', hints: ['기능별로 브랜치를 만들어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-3', title: 'GitHub 사용하기', description: 'GitHub에 코드를 올리고 관리해요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 18, concept: 'GitHub', hints: ['push, pull, PR을 배워요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-4', title: 'VS Code 활용', description: '개발 환경을 효율적으로 설정해요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'VS Code', hints: ['유용한 단축키와 확장을 배워요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-5', title: '디버깅 기술', description: '효과적인 디버깅 방법을 배워요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 18, concept: '디버깅', hints: ['개발자 도구로 버그를 찾아요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-6', title: 'npm 패키지 매니저', description: 'npm으로 패키지를 관리해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 12, concept: 'npm', hints: ['npm install로 패키지를 설치해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-7', title: '코드 품질 도구', description: 'ESLint와 Prettier를 사용해요', type: 'hands-on', difficulty: 'intermediate', exp: 65, estimatedMinutes: 15, concept: '린팅/포맷팅', hints: ['일관된 코드 스타일을 유지해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-8', title: '테스트 기초', description: '기본적인 테스트를 작성해봐요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 18, concept: '테스트', hints: ['코드가 예상대로 작동하는지 확인해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-9', title: '배포하기', description: '프로젝트를 인터넷에 공개해요', type: 'hands-on', difficulty: 'intermediate', exp: 75, estimatedMinutes: 20, concept: '배포', hints: ['GitHub Pages, Netlify 등을 사용해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-52-10', title: '개발 도구 퀴즈', description: '배운 내용을 확인해봐요', type: 'quiz', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: '종합 복습', hints: ['Git, npm, 배포를 기억해요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-53',
      number: 53,
      title: '최종 프로젝트 기획',
      description: '최종 프로젝트를 계획하고 설계해요',
      missions: [
        { id: '9-53-1', title: '프로젝트 아이디어 선정', description: '만들고 싶은 프로젝트를 정해요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 15, concept: '프로젝트 기획', hints: ['관심 분야와 배운 기술을 고려해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-2', title: '기능 명세 작성', description: '프로젝트의 기능을 정리해요', type: 'writing', difficulty: 'intermediate', exp: 65, estimatedMinutes: 20, concept: '요구사항 정의', hints: ['MVP와 추가 기능을 구분해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-3', title: '와이어프레임 설계', description: 'UI 레이아웃을 스케치해요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 25, concept: 'UI 설계', hints: ['코딩 전에 화면 구성을 계획해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-4', title: '데이터 구조 설계', description: '필요한 데이터 형식을 정의해요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 20, concept: '데이터 모델링', hints: ['어떤 정보를 저장할지 정해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-5', title: '폴더 구조 계획', description: '프로젝트 파일을 어떻게 구성할지 정해요', type: 'interactive-lesson', difficulty: 'beginner', exp: 55, estimatedMinutes: 12, concept: '프로젝트 구조', hints: ['체계적으로 파일을 정리해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-6', title: '마일스톤 설정', description: '개발 단계를 나눠서 계획해요', type: 'writing', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '프로젝트 관리', hints: ['큰 목표를 작은 단계로 나눠요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-7', title: 'README 작성', description: '프로젝트 설명서를 작성해요', type: 'writing', difficulty: 'intermediate', exp: 65, estimatedMinutes: 18, concept: '문서화', hints: ['프로젝트의 첫인상이에요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-8', title: '개발 환경 설정', description: '프로젝트 시작을 위한 환경을 준비해요', type: 'hands-on', difficulty: 'intermediate', exp: 70, estimatedMinutes: 20, concept: '환경 설정', hints: ['필요한 도구와 설정을 준비해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-9', title: '프로젝트 킥오프', description: '프로젝트의 기초를 만들어요', type: 'coding', difficulty: 'intermediate', exp: 80, estimatedMinutes: 30, concept: '프로젝트 시작', hints: ['HTML/CSS/JS 기본 구조를 만들어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-53-10', title: '기획 점검', description: '준비가 잘 되었는지 확인해봐요', type: 'quiz', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '종합 점검', hints: ['MVP, 마일스톤을 기억해요'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-54',
      number: 54,
      title: '최종 프로젝트 개발',
      description: '프로젝트의 핵심 기능을 구현해요',
      missions: [
        { id: '9-54-1', title: 'HTML 구조 완성', description: '프로젝트의 HTML 구조를 만들어요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 25, concept: 'HTML 마크업', hints: ['시맨틱 태그를 사용해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-2', title: 'CSS 스타일링', description: '기본 스타일을 적용해요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 30, concept: 'CSS 스타일', hints: ['레이아웃과 색상을 설정해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-3', title: '반응형 디자인', description: '모든 기기에서 잘 보이게 해요', type: 'coding', difficulty: 'intermediate', exp: 80, estimatedMinutes: 30, concept: '반응형', hints: ['미디어 쿼리를 사용해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-4', title: '핵심 기능 구현 1', description: '첫 번째 핵심 기능을 만들어요', type: 'coding', difficulty: 'advanced', exp: 90, estimatedMinutes: 40, concept: 'JS 기능 구현', hints: ['한 번에 하나의 기능에 집중해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-5', title: '핵심 기능 구현 2', description: '두 번째 핵심 기능을 만들어요', type: 'coding', difficulty: 'advanced', exp: 90, estimatedMinutes: 40, concept: 'JS 기능 구현', hints: ['각 기능을 완성할 때마다 커밋해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-6', title: '데이터 저장', description: '로컬 스토리지로 데이터를 저장해요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 25, concept: '로컬 스토리지', hints: ['JSON으로 변환해서 저장해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-7', title: '에러 처리', description: '예외 상황을 처리해요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 20, concept: '에러 핸들링', hints: ['try-catch와 유효성 검사를 해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-8', title: '사용자 피드백', description: 'UI 피드백을 추가해요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 20, concept: 'UX 개선', hints: ['로딩, 성공, 에러 상태를 보여줘요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-9', title: '코드 리팩토링', description: '코드를 깔끔하게 정리해요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 25, concept: '리팩토링', hints: ['중복을 제거하고 함수를 분리해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-54-10', title: '개발 진행 점검', description: '진행 상황을 확인해봐요', type: 'quiz', difficulty: 'intermediate', exp: 70, estimatedMinutes: 15, concept: '중간 점검', hints: ['MVP 기능이 완성됐나요?'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-55',
      number: 55,
      title: '최종 프로젝트 완성',
      description: '프로젝트를 완성하고 발표해요',
      missions: [
        { id: '9-55-1', title: '추가 기능 구현', description: '계획했던 추가 기능을 만들어요', type: 'coding', difficulty: 'advanced', exp: 90, estimatedMinutes: 40, concept: '추가 기능', hints: ['시간이 부족하면 우선순위를 정해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-2', title: '애니메이션 효과', description: '부드러운 애니메이션을 추가해요', type: 'coding', difficulty: 'intermediate', exp: 75, estimatedMinutes: 25, concept: 'CSS 애니메이션', hints: ['transition과 animation을 사용해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-3', title: '버그 수정', description: '문제를 찾아 해결해요', type: 'coding', difficulty: 'intermediate', exp: 70, estimatedMinutes: 25, concept: '디버깅', hints: ['다양한 상황에서 테스트해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-4', title: '크로스 브라우저 테스트', description: '여러 브라우저에서 테스트해요', type: 'hands-on', difficulty: 'intermediate', exp: 65, estimatedMinutes: 20, concept: '호환성 테스트', hints: ['Chrome, Firefox, Safari에서 확인해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-5', title: '성능 최적화', description: '로딩 속도를 개선해요', type: 'coding', difficulty: 'advanced', exp: 80, estimatedMinutes: 25, concept: '최적화', hints: ['이미지 압축, 코드 정리를 해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-6', title: '문서화 완성', description: 'README와 주석을 완성해요', type: 'writing', difficulty: 'intermediate', exp: 65, estimatedMinutes: 20, concept: '문서화', hints: ['다른 사람이 이해할 수 있게 작성해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-7', title: '프로젝트 배포', description: '프로젝트를 인터넷에 공개해요', type: 'hands-on', difficulty: 'intermediate', exp: 80, estimatedMinutes: 25, concept: '배포', hints: ['GitHub Pages나 Netlify를 사용해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-8', title: '발표 자료 준비', description: '프로젝트를 소개하는 자료를 만들어요', type: 'writing', difficulty: 'intermediate', exp: 70, estimatedMinutes: 25, concept: '발표 준비', hints: ['데모, 기술, 배운 점을 정리해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-9', title: '최종 프로젝트 제출', description: '완성된 프로젝트를 제출해요', type: 'coding', difficulty: 'advanced', exp: 150, estimatedMinutes: 60, concept: '최종 제출', hints: ['자랑스러운 작품을 완성했어요!'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-55-10', title: '코드퀘스트 완료!', description: '1년간의 여정을 축하해요!', type: 'quiz', difficulty: 'beginner', exp: 200, estimatedMinutes: 10, concept: '수료', hints: ['당신은 이제 개발자예요!'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-56',
      number: 56,
      title: '다음 단계로',
      description: '앞으로의 학습 방향을 탐색해요',
      missions: [
        { id: '9-56-1', title: '학습 여정 돌아보기', description: '1년간 배운 것을 정리해봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 15, concept: '회고', hints: ['어떤 것들을 배웠나요?'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-2', title: '프론트엔드 심화', description: 'React, Vue, Angular를 소개해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '프론트엔드 프레임워크', hints: ['더 큰 앱을 만들 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-3', title: '백엔드 입문', description: 'Node.js와 서버를 소개해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '백엔드 개발', hints: ['데이터베이스와 API를 만들 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-4', title: '모바일 앱 개발', description: 'React Native, Flutter를 소개해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '모바일 개발', hints: ['스마트폰 앱을 만들 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-5', title: '데이터와 AI', description: 'Python, 데이터 과학을 소개해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '데이터 과학', hints: ['데이터를 분석하고 AI를 만들 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-6', title: '게임 개발', description: 'Unity, Unreal을 소개해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '게임 개발', hints: ['게임을 만들 수 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-7', title: '취업/창업 준비', description: '개발자로 커리어를 시작하는 방법', type: 'interactive-lesson', difficulty: 'beginner', exp: 55, estimatedMinutes: 15, concept: '커리어', hints: ['포트폴리오와 면접을 준비해요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-8', title: '오픈소스 기여', description: '오픈소스 프로젝트에 참여하는 방법', type: 'interactive-lesson', difficulty: 'intermediate', exp: 60, estimatedMinutes: 15, concept: '오픈소스', hints: ['다른 개발자들과 함께 만들어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-9', title: '개발자 커뮤니티', description: '함께 성장하는 커뮤니티를 찾아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 12, concept: '커뮤니티', hints: ['Stack Overflow, GitHub 등이 있어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-56-10', title: '끝없는 여정', description: '평생 학습하는 개발자가 되어봐요', type: 'discussion', difficulty: 'beginner', exp: 100, estimatedMinutes: 15, concept: '평생 학습', hints: ['이제 시작이에요!'], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-57',
      number: 57,
      title: '고급 개발 실습',
      description: '실전 개발 환경에서 고급 기술을 익혀요',
      missions: [
        { id: '9-57-1', title: 'TypeScript 기초', description: '타입 안전한 JavaScript를 배워요', type: 'coding', language: 'javascript', difficulty: 'advanced', exp: 150, estimatedMinutes: 30, concept: 'TypeScript', starterCode: '// 타입 선언\nlet name: string = "Kim";\nlet age: number = 20;\n\n// 인터페이스\ninterface User {\n  name: string;\n  age: number;\n}\n\n// 함수 타입\nfunction greet(user: User): string {\n  return `Hello, ${user.name}!`;\n}', hints: ['타입 선언으로 에러 방지', '인터페이스로 구조 정의'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-2', title: 'React 기초', description: '컴포넌트 기반 UI 라이브러리를 배워요', type: 'coding', language: 'javascript', difficulty: 'advanced', exp: 160, estimatedMinutes: 35, concept: 'React', starterCode: '// 함수형 컴포넌트\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// useState 훅\nconst [count, setCount] = useState(0);', hints: ['JSX 문법 사용', '훅으로 상태 관리'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-3', title: 'REST API 설계', description: 'REST API의 원칙을 배워요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: 'REST API', hints: ['CRUD와 HTTP 메서드 매핑', 'URL 설계 원칙'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-4', title: '데이터베이스 기초', description: 'SQL과 데이터베이스 개념을 배워요', type: 'coding', difficulty: 'intermediate', exp: 130, estimatedMinutes: 28, concept: 'SQL', starterCode: '-- 테이블 생성\nCREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name TEXT,\n  email TEXT\n);\n\n-- 데이터 조회\nSELECT * FROM users WHERE age > 18;', hints: ['CRUD 쿼리', '조인과 관계'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-5', title: '인증과 보안', description: '로그인 시스템과 보안을 배워요', type: 'interactive-lesson', difficulty: 'advanced', exp: 140, estimatedMinutes: 30, concept: '인증/보안', hints: ['JWT 토큰', 'HTTPS, CORS'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-6', title: 'Docker 기초', description: '컨테이너 기술을 배워요', type: 'hands-on', difficulty: 'advanced', exp: 145, estimatedMinutes: 32, concept: 'Docker', starterCode: '# Dockerfile\nFROM node:18\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]', hints: ['이미지와 컨테이너', 'docker-compose'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-7', title: 'CI/CD 파이프라인', description: '자동화된 배포를 배워요', type: 'hands-on', difficulty: 'advanced', exp: 150, estimatedMinutes: 35, concept: 'CI/CD', hints: ['GitHub Actions', '자동 테스트와 배포'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-8', title: '클라우드 서비스', description: 'AWS, GCP 등 클라우드를 소개해요', type: 'interactive-lesson', difficulty: 'intermediate', exp: 110, estimatedMinutes: 22, concept: '클라우드', hints: ['서버리스, 스토리지, 데이터베이스'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-9', title: '알고리즘과 자료구조', description: '효율적인 코드를 위한 기초를 배워요', type: 'coding', difficulty: 'advanced', exp: 160, estimatedMinutes: 35, concept: '알고리즘', starterCode: '// 이진 탐색\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}', hints: ['시간 복잡도', '기본 자료구조'], unlocked: true, completed: false, perfectScore: false },
        { id: '9-57-10', title: '코드퀘스트 수료!', description: '1년간의 코딩 여정을 완료했어요!', type: 'quiz', difficulty: 'advanced', exp: 500, estimatedMinutes: 30, concept: '최종 수료', hints: ['축하합니다! 이제 진짜 개발자예요!'], unlocked: true, completed: false, perfectScore: false }
      ]
    }
  ]
};
