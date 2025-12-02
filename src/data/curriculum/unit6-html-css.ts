import type { Unit } from '../../types';

export const unit6: Unit = {
  id: 'unit-6',
  number: 6,
  title: 'HTML & CSS 마스터',
  description: '웹 페이지를 만드는 HTML과 CSS를 배워요',
  icon: '🎨',
  color: '#e44d26',
  unlockLevel: 45,
  totalMissions: 60,
  estimatedHours: 24,
  weeks: [
    {
      id: 'week-33',
      number: 33,
      title: 'HTML 기초',
      description: '웹 페이지의 뼈대, HTML을 배워요',
      missions: [
        { id: '6-33-1', title: '웹 페이지란?', description: '웹 페이지가 무엇인지 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'HTML 소개', hints: ['HTML, CSS, JavaScript로 만들어져요'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-2', title: 'HTML 문서 구조', description: 'DOCTYPE, html, head, body 배우기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 12, concept: '문서 구조', starterCode: '<!DOCTYPE html>\n<html>\n  <!-- head와 body를 추가하세요 -->\n</html>', hints: ['head는 메타정보, body는 내용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-3', title: '제목 태그 h1-h6', description: '제목을 만드는 태그를 배워요', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: '제목 태그', starterCode: '<body>\n  <!-- h1, h2, h3 제목을 추가하세요 -->\n</body>', hints: ['h1이 가장 크고 중요한 제목'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-4', title: '문단과 줄바꿈', description: 'p 태그와 br 태그 사용하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'p, br', starterCode: '<body>\n  <!-- 두 개의 문단을 만들어보세요 -->\n</body>', hints: ['<p>는 문단, <br>은 줄바꿈'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-5', title: '텍스트 강조', description: 'strong, em, mark 태그 배우기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: '텍스트 강조', starterCode: '<p>이 문장에서 중요한 부분을 강조해보세요</p>', hints: ['strong은 굵게, em은 기울임'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-6', title: '링크 만들기', description: 'a 태그로 링크 만들기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'a 태그', starterCode: '<body>\n  <!-- 구글로 가는 링크를 만들어보세요 -->\n</body>', hints: ['<a href="URL">텍스트</a>'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-7', title: '이미지 넣기', description: 'img 태그로 이미지 삽입하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'img 태그', starterCode: '<body>\n  <!-- 이미지를 추가하세요 -->\n</body>', hints: ['<img src="경로" alt="설명">'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-8', title: 'HTML 주석', description: '주석을 다는 방법을 배워요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 8, concept: '주석', hints: ['<!-- 주석 내용 -->'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-9', title: '특수 문자', description: 'HTML 엔티티 사용하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: '엔티티', starterCode: '<p><!-- < > & 기호를 표시해보세요 --></p>', hints: ['&lt; &gt; &amp; &nbsp;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-33-10', title: 'HTML 기초 퀴즈', description: '배운 내용을 확인해봐요', type: 'quiz', difficulty: 'beginner', exp: 100, estimatedMinutes: 10, hints: [], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-34',
      number: 34,
      title: 'HTML 목록과 테이블',
      description: '목록과 표를 만들어봐요',
      missions: [
        { id: '6-34-1', title: '순서 없는 목록', description: 'ul과 li 태그로 목록 만들기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'ul, li', starterCode: '<body>\n  <!-- 과일 목록을 만들어보세요 -->\n</body>', hints: ['<ul><li>항목</li></ul>'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-2', title: '순서 있는 목록', description: 'ol 태그로 번호 목록 만들기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'ol', starterCode: '<body>\n  <!-- 할 일 목록을 번호와 함께 만들어보세요 -->\n</body>', hints: ['<ol>은 자동으로 번호 매김'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-3', title: '중첩 목록', description: '목록 안에 목록 넣기', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: '중첩 목록', starterCode: '<ul>\n  <li>과일\n    <!-- 세부 항목 추가 -->\n  </li>\n</ul>', hints: ['li 안에 ul/ol을 넣어요'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-4', title: '설명 목록', description: 'dl, dt, dd 태그 사용하기', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 70, estimatedMinutes: 12, concept: 'dl', starterCode: '<!-- 용어 설명 목록을 만들어보세요 -->', hints: ['dt는 용어, dd는 설명'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-5', title: '테이블 기초', description: 'table, tr, td 태그 배우기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 15, concept: 'table', starterCode: '<table>\n  <!-- 2행 2열 테이블 만들기 -->\n</table>', hints: ['tr은 행, td는 셀'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-6', title: '테이블 헤더', description: 'th 태그로 헤더 만들기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'th', starterCode: '<table>\n  <tr>\n    <!-- 헤더 행 추가 -->\n  </tr>\n</table>', hints: ['th는 자동으로 굵게 표시'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-7', title: '셀 병합', description: 'colspan과 rowspan 사용하기', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 90, estimatedMinutes: 18, concept: '셀 병합', starterCode: '<table border="1">\n  <!-- 셀 병합을 사용해보세요 -->\n</table>', hints: ['colspan은 가로, rowspan은 세로 병합'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-8', title: '테이블 구조화', description: 'thead, tbody, tfoot 사용하기', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: '테이블 구조', starterCode: '<table>\n  <!-- thead, tbody, tfoot 사용 -->\n</table>', hints: ['의미있는 구조로 테이블 구성'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-9', title: '시간표 만들기', description: '테이블로 시간표를 만들어요', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 120, estimatedMinutes: 25, concept: '종합 실습', starterCode: '<table border="1">\n  <!-- 나만의 시간표 만들기 -->\n</table>', hints: ['첫 행에 요일, 첫 열에 교시'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-34-10', title: '목록과 테이블 퀴즈', description: '배운 내용을 확인해봐요', type: 'quiz', difficulty: 'beginner', exp: 100, estimatedMinutes: 10, hints: [], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-35',
      number: 35,
      title: 'HTML 폼',
      description: '사용자 입력을 받는 폼을 만들어요',
      missions: [
        { id: '6-35-1', title: '폼의 기초', description: 'form 태그와 action, method', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'form', hints: ['form은 사용자 입력을 모아요'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-2', title: '텍스트 입력', description: 'input type="text" 사용하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'text input', starterCode: '<form>\n  <!-- 이름 입력 필드 만들기 -->\n</form>', hints: ['<input type="text">'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-3', title: '비밀번호와 이메일', description: '다양한 input 타입 배우기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'input types', starterCode: '<form>\n  <!-- email, password 입력 필드 -->\n</form>', hints: ['type="email", type="password"'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-4', title: '숫자와 범위', description: 'number와 range 타입', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'number, range', starterCode: '<form>\n  <!-- 나이와 만족도 입력 -->\n</form>', hints: ['min, max 속성 사용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-5', title: '체크박스와 라디오', description: '선택 입력 만들기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'checkbox, radio', starterCode: '<form>\n  <!-- 취미 선택 체크박스 만들기 -->\n</form>', hints: ['checkbox는 다중, radio는 단일 선택'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-6', title: '드롭다운 메뉴', description: 'select와 option 사용하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'select', starterCode: '<form>\n  <!-- 좋아하는 과일 선택 -->\n</form>', hints: ['<select><option>항목</option></select>'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-7', title: '텍스트 영역', description: 'textarea 사용하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'textarea', starterCode: '<form>\n  <!-- 자기소개 입력 영역 -->\n</form>', hints: ['rows, cols로 크기 지정'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-8', title: '버튼 만들기', description: 'button과 submit 사용하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'button', starterCode: '<form>\n  <!-- 제출, 리셋 버튼 만들기 -->\n</form>', hints: ['type="submit", type="reset"'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-9', title: '회원가입 폼', description: '배운 내용으로 폼 만들기', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 150, estimatedMinutes: 30, concept: '종합 실습', starterCode: '<form>\n  <!-- 회원가입 폼 만들기 -->\n</form>', hints: ['label을 사용하면 접근성 향상'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-35-10', title: '폼 요소 퀴즈', description: '배운 내용을 확인해봐요', type: 'quiz', difficulty: 'beginner', exp: 100, estimatedMinutes: 10, hints: [], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-36',
      number: 36,
      title: 'CSS 기초',
      description: '웹 페이지를 꾸미는 CSS를 배워요',
      missions: [
        { id: '6-36-1', title: 'CSS란?', description: 'CSS가 무엇인지 알아봐요', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: 'CSS 소개', hints: ['Cascading Style Sheets'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-2', title: 'CSS 적용 방법', description: '인라인, 내부, 외부 CSS', type: 'coding', language: 'css', difficulty: 'beginner', exp: 60, estimatedMinutes: 12, concept: 'CSS 적용', starterCode: '<!-- 세 가지 방법으로 CSS 적용해보기 -->', hints: ['style 속성, <style> 태그, .css 파일'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-3', title: '색상 지정', description: 'color와 background-color', type: 'coding', language: 'css', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: '색상', starterCode: 'p {\n  /* 글자색과 배경색 지정 */\n}', hints: ['color: red; background-color: yellow;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-4', title: '글꼴 스타일링', description: 'font 관련 속성 배우기', type: 'coding', language: 'css', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'font', starterCode: 'h1 {\n  /* 글꼴, 크기, 굵기 지정 */\n}', hints: ['font-family, font-size, font-weight'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-5', title: '텍스트 정렬', description: 'text-align과 line-height', type: 'coding', language: 'css', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'text', starterCode: 'p {\n  /* 가운데 정렬, 줄 간격 */\n}', hints: ['text-align: center; line-height: 1.5;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-6', title: '테두리 만들기', description: 'border 속성 배우기', type: 'coding', language: 'css', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'border', starterCode: 'div {\n  /* 테두리 추가 */\n}', hints: ['border: 2px solid black;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-7', title: '여백 다루기', description: 'margin과 padding', type: 'coding', language: 'css', difficulty: 'beginner', exp: 80, estimatedMinutes: 15, concept: 'margin, padding', starterCode: '.box {\n  /* 바깥, 안쪽 여백 */\n}', hints: ['margin은 바깥, padding은 안쪽'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-8', title: '크기 지정', description: 'width와 height', type: 'coding', language: 'css', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: 'width, height', starterCode: '.box {\n  /* 너비, 높이 지정 */\n}', hints: ['px, %, em 등 단위 사용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-9', title: '카드 만들기', description: 'CSS로 카드 UI 만들기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 120, estimatedMinutes: 25, concept: '종합 실습', starterCode: '.card {\n  /* 예쁜 카드 스타일 */\n}', hints: ['border-radius, box-shadow 사용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-36-10', title: 'CSS 기초 퀴즈', description: '배운 내용을 확인해봐요', type: 'quiz', difficulty: 'beginner', exp: 100, estimatedMinutes: 10, hints: [], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-37',
      number: 37,
      title: 'CSS 선택자와 레이아웃',
      description: '다양한 선택자와 Flexbox를 배워요',
      missions: [
        { id: '6-37-1', title: '클래스 선택자', description: '.class 선택자 사용하기', type: 'coding', language: 'css', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: '클래스 선택자', starterCode: '.highlight {\n  /* 강조 스타일 */\n}', hints: ['.클래스이름으로 선택'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-2', title: 'ID 선택자', description: '#id 선택자 사용하기', type: 'coding', language: 'css', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'ID 선택자', starterCode: '#header {\n  /* 헤더 스타일 */\n}', hints: ['ID는 페이지에서 유일'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-3', title: '자손 선택자', description: '요소 안의 요소 선택하기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: '자손 선택자', starterCode: 'nav a {\n  /* nav 안의 a 태그만 */\n}', hints: ['공백으로 자손, >로 직계 자식'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-4', title: '가상 클래스', description: ':hover, :focus 사용하기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: '가상 클래스', starterCode: 'button:hover {\n  /* 마우스 올렸을 때 */\n}', hints: [':hover, :focus, :active'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-5', title: 'display 속성', description: 'block, inline, inline-block', type: 'interactive-lesson', difficulty: 'intermediate', exp: 70, estimatedMinutes: 12, concept: 'display', hints: ['block은 한 줄, inline은 내용만큼'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-6', title: 'Flexbox 시작', description: 'display: flex 배우기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 90, estimatedMinutes: 18, concept: 'Flexbox', starterCode: '.container {\n  display: flex;\n  /* 정렬 속성 추가 */\n}', hints: ['Flexbox로 쉽게 정렬'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-7', title: 'Flex 정렬', description: 'justify-content, align-items', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: 'Flex 정렬', starterCode: '.container {\n  display: flex;\n  /* 가운데 정렬 */\n}', hints: ['justify-content는 주축, align-items는 교차축'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-8', title: 'Flex 방향', description: 'flex-direction, flex-wrap', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 90, estimatedMinutes: 18, concept: 'Flex 방향', starterCode: '.container {\n  display: flex;\n  /* 세로 방향으로 */\n}', hints: ['flex-direction: column;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-9', title: '네비게이션 바', description: 'Flexbox로 메뉴 만들기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 130, estimatedMinutes: 28, concept: '종합 실습', starterCode: '.navbar {\n  /* 네비게이션 스타일 */\n}', hints: ['justify-content: space-between;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-37-10', title: '선택자와 레이아웃 퀴즈', description: '배운 내용을 확인해봐요', type: 'quiz', difficulty: 'intermediate', exp: 100, estimatedMinutes: 10, hints: [], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-38',
      number: 38,
      title: '반응형 웹',
      description: '모든 기기에서 잘 보이는 웹을 만들어요',
      missions: [
        { id: '6-38-1', title: '반응형 웹이란?', description: '반응형 웹의 개념 이해하기', type: 'interactive-lesson', difficulty: 'beginner', exp: 50, estimatedMinutes: 10, concept: '반응형 웹', hints: ['화면 크기에 따라 레이아웃 변경'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-2', title: 'viewport 메타 태그', description: 'viewport 설정하기', type: 'coding', language: 'html', difficulty: 'beginner', exp: 60, estimatedMinutes: 10, concept: 'viewport', starterCode: '<head>\n  <!-- viewport 메타 태그 추가 -->\n</head>', hints: ['width=device-width, initial-scale=1.0'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-3', title: '미디어 쿼리 기초', description: '@media 규칙 배우기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 90, estimatedMinutes: 18, concept: '미디어 쿼리', starterCode: '.box { background: blue; }\n/* 768px 이하에서 빨간색으로 */', hints: ['@media (max-width: 768px) { }'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-4', title: '상대 단위', description: 'em, rem, %, vw, vh 사용하기', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: '상대 단위', starterCode: '.container {\n  /* rem, % 단위 사용 */\n}', hints: ['rem은 루트 기준, em은 부모 기준'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-5', title: '반응형 이미지', description: '이미지를 반응형으로', type: 'coding', language: 'css', difficulty: 'beginner', exp: 70, estimatedMinutes: 12, concept: '반응형 이미지', starterCode: 'img {\n  /* 반응형으로 만들기 */\n}', hints: ['max-width: 100%; height: auto;'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-6', title: '반응형 그리드', description: 'Flexbox로 반응형 그리드', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: '반응형 그리드', starterCode: '.grid {\n  display: flex;\n  flex-wrap: wrap;\n}', hints: ['flex-wrap과 미디어 쿼리 조합'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-7', title: 'CSS Grid 소개', description: 'Grid 레이아웃 기초', type: 'interactive-lesson', difficulty: 'intermediate', exp: 80, estimatedMinutes: 15, concept: 'CSS Grid', hints: ['2차원 레이아웃에 강력함'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-8', title: 'Grid 레이아웃', description: 'Grid로 페이지 레이아웃', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 100, estimatedMinutes: 20, concept: 'Grid 레이아웃', starterCode: '.layout {\n  display: grid;\n  /* grid-template 사용 */\n}', hints: ['grid-template-areas 활용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-9', title: '포트폴리오 페이지', description: 'HTML/CSS로 포트폴리오 만들기', type: 'coding', language: 'html', difficulty: 'advanced', exp: 200, estimatedMinutes: 45, concept: '종합 프로젝트', starterCode: '<!-- 나만의 포트폴리오 페이지 -->', hints: ['반응형, 네비게이션, 여러 섹션'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-38-10', title: 'HTML & CSS 종합 퀴즈', description: 'Unit 6 전체 확인', type: 'quiz', difficulty: 'intermediate', exp: 150, estimatedMinutes: 15, hints: [], unlocked: true, completed: false, perfectScore: false }
      ]
    },
    {
      id: 'week-39',
      number: 39,
      title: 'HTML & CSS 실전 프로젝트',
      description: 'HTML과 CSS로 실전 웹 페이지를 만들어요',
      missions: [
        { id: '6-39-1', title: '랜딩 페이지 디자인', description: '제품 소개 랜딩 페이지를 만들어요', type: 'coding', language: 'html', difficulty: 'intermediate', exp: 150, estimatedMinutes: 35, concept: '랜딩 페이지', starterCode: '<!-- 히어로 섹션, 특징 섹션, CTA 버튼 -->\n<section class="hero">\n  <h1>제품명</h1>\n  <p>설명</p>\n  <button>시작하기</button>\n</section>', hints: ['히어로 섹션은 전체 화면', '그라데이션 배경 활용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-2', title: '카드 레이아웃', description: '블로그 스타일 카드 UI를 만들어요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 120, estimatedMinutes: 25, concept: '카드 컴포넌트', starterCode: '.card {\n  /* 이미지, 제목, 설명, 버튼이 있는 카드 */\n  /* 그림자와 hover 효과 */\n}', hints: ['box-shadow로 그림자', 'transition으로 부드러운 효과'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-3', title: '네비게이션 바', description: '스티키 네비게이션을 만들어요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 110, estimatedMinutes: 22, concept: '네비게이션', starterCode: '.navbar {\n  position: sticky;\n  top: 0;\n  /* 스타일 추가 */\n}', hints: ['position: sticky', '스크롤해도 상단에 고정'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-4', title: '햄버거 메뉴', description: '모바일용 햄버거 메뉴를 만들어요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 130, estimatedMinutes: 28, concept: '모바일 메뉴', starterCode: '.hamburger {\n  display: none;\n}\n\n@media (max-width: 768px) {\n  .hamburger { display: block; }\n  .nav-links { display: none; }\n}', hints: ['미디어 쿼리로 보이기/숨기기', '체크박스 트릭으로 JS 없이 토글'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-5', title: '푸터 디자인', description: '다양한 정보가 담긴 푸터를 만들어요', type: 'coding', language: 'html', difficulty: 'beginner', exp: 90, estimatedMinutes: 18, concept: '푸터 레이아웃', starterCode: '<footer>\n  <!-- 로고, 링크 그룹들, 소셜 아이콘, 저작권 -->\n</footer>', hints: ['Grid로 컬럼 나누기', '소셜 아이콘은 인라인'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-6', title: '가격표 UI', description: '요금제 비교 가격표를 만들어요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 140, estimatedMinutes: 30, concept: '가격표 컴포넌트', starterCode: '.pricing-card {\n  /* 제목, 가격, 기능 리스트, 버튼 */\n  /* 추천 요금제는 하이라이트 */\n}', hints: ['Flexbox로 가로 정렬', '추천은 scale()로 크게'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-7', title: '회원가입 폼', description: '깔끔한 회원가입 폼을 디자인해요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 120, estimatedMinutes: 25, concept: '폼 스타일링', starterCode: 'input, button {\n  /* 모던한 폼 스타일 */\n}\n\ninput:focus {\n  /* 포커스 효과 */\n}', hints: ['outline 제거하고 border 변경', ':focus와 :valid 가상 클래스'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-8', title: '애니메이션 효과', description: 'CSS 애니메이션을 추가해요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 130, estimatedMinutes: 25, concept: 'CSS 애니메이션', starterCode: '@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.animate {\n  animation: fadeIn 0.5s ease-in;\n}', hints: ['@keyframes로 애니메이션 정의', 'animation 속성으로 적용'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-9', title: '다크 모드 CSS', description: 'CSS 변수로 다크 모드를 구현해요', type: 'coding', language: 'css', difficulty: 'intermediate', exp: 115, estimatedMinutes: 22, concept: 'CSS 변수', starterCode: ':root {\n  --bg-color: white;\n  --text-color: black;\n}\n\n.dark-mode {\n  --bg-color: #1a1a2e;\n  --text-color: white;\n}', hints: ['CSS 변수(--변수명)로 색상 관리', 'JS로 클래스 토글'], unlocked: true, completed: false, perfectScore: false },
        { id: '6-39-10', title: 'HTML & CSS 마스터 테스트', description: 'HTML과 CSS 전체 과정을 마무리하는 테스트', type: 'quiz', difficulty: 'intermediate', exp: 160, estimatedMinutes: 20, concept: '종합 복습', hints: ['시맨틱 HTML, Flexbox, Grid, 반응형을 복습하세요'], unlocked: true, completed: false, perfectScore: false }
      ]
    }
  ]
};
