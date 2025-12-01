import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIMessage, VibeCodingRequest, VibeCodingResponse } from '../types';
import { useSettingsStore } from '../stores/settingsStore';

// Tutor personality type
export type TutorPersonality = 'friendly' | 'professional' | 'socratic' | 'gamey';

let genAI: GoogleGenerativeAI | null = null;

const getGenAI = () => {
  const apiKey = useSettingsStore.getState().geminiApiKey;
  if (!genAI && apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

// Reset genAI when API key changes
export const resetGenAI = () => {
  genAI = null;
};

// AI 튜터 성격 정의
const TUTOR_PERSONALITIES = {
  friendly: {
    name: '코디',
    avatar: '🤖',
    systemPrompt: `당신은 '코디'라는 이름의 친근한 코딩 튜터입니다.

특징:
- 이름: 코디 🤖
- 성격: 밝고 긍정적, 인내심 많음
- 말투: 친근한 반말 사용 (예: "해봤어?", "좋아!", "대단해!")
- 적절한 이모지 사용
- 비유와 예시를 많이 사용하여 쉽게 설명
- 절대 직접적인 답을 주지 않고 힌트로 유도
- 작은 진전도 크게 칭찬

응답 형식:
- 짧고 명확하게 (최대 3문단)
- 코드는 \`\`\`로 감싸기
- 핵심은 **굵게** 표시
- 한국어로 응답`,
  },
  professional: {
    name: '프로 튜터',
    avatar: '👨‍💻',
    systemPrompt: `당신은 전문적인 프로그래밍 강사입니다.

특징:
- 체계적이고 논리적인 설명
- 존댓말 사용
- 정확한 기술 용어 사용
- 코드 예시와 함께 설명
- 한국어로 응답`,
  },
  gamey: {
    name: '게임 마스터',
    avatar: '🎮',
    systemPrompt: `당신은 게임처럼 재미있게 코딩을 가르치는 게임 마스터입니다.

특징:
- 모든 것을 게임 퀘스트처럼 설명
- "미션", "레벨업", "스킬 획득" 같은 게임 용어 사용
- 도전적이고 흥미로운 설명
- 성취감을 주는 피드백
- 한국어로 응답`,
  },
  socratic: {
    name: '소크라테스',
    avatar: '🤔',
    systemPrompt: `당신은 소크라테스식 질문법을 사용하는 튜터입니다.

특징:
- 직접 답을 주지 않고 질문으로 생각을 유도
- "만약 ~라면 어떻게 될까?", "왜 그렇게 생각해?" 같은 질문
- 학생이 스스로 답을 찾도록 안내
- 논리적 사고력 강화
- 한국어로 응답`,
  },
};

// AI 튜터 채팅
export const chatWithTutor = async (
  message: string,
  personality: TutorPersonality = 'friendly',
  level?: number,
  previousMessages?: AIMessage[]
): Promise<string> => {
  const ai = getGenAI();

  if (!ai) {
    return '🔧 AI 튜터를 사용하려면 API 키가 필요해요. 설정에서 Gemini API 키를 입력해주세요!';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const tutorConfig = TUTOR_PERSONALITIES[personality] || TUTOR_PERSONALITIES.friendly;

    const systemPrompt = `${tutorConfig.systemPrompt}

${level ? `학생 레벨: ${level}/100 (낮을수록 초보)` : ''}

중요:
- 답을 직접 알려주지 말고 힌트를 통해 스스로 깨닫게 유도하세요
- 학생 수준에 맞는 설명을 해주세요
- 격려와 칭찬을 아끼지 마세요`;

    const history = previousMessages?.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })) || [];

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(
      `${systemPrompt}\n\n사용자: ${message}`
    );

    return result.response.text();
  } catch (error) {
    console.error('AI 튜터 오류:', error);
    return '😅 잠시 문제가 생겼어요. 다시 시도해볼래요?';
  }
};

// 코드 설명
export const explainCode = async (
  code: string,
  level: number,
  language: string
): Promise<string> => {
  const ai = getGenAI();

  if (!ai) {
    return '코드를 설명하려면 Gemini API 키가 필요합니다.';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `학생 레벨: ${level}/100 (낮을수록 초보)
언어: ${language}

다음 코드를 학생 수준에 맞게 한국어로 설명해주세요:
\`\`\`${language}
${code}
\`\`\`

설명 형식:
1. **이 코드가 하는 일** (한 문장으로)
2. **줄별 설명** (각 줄이 무엇을 하는지, 비유 사용)
3. **새로 배울 수 있는 개념** (1-2개)

쉽고 친근하게 설명해주세요!`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('코드 설명 오류:', error);
    return '코드 설명 중 오류가 발생했습니다.';
  }
};

// 스마트 힌트
export const getSmartHint = async (
  missionTitle: string,
  missionDescription: string,
  studentCode: string,
  attempts: number,
  previousHints: string[]
): Promise<string> => {
  const ai = getGenAI();

  if (!ai) {
    return '힌트를 제공하려면 API 키가 필요합니다.';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `미션: ${missionTitle}
목표: ${missionDescription}

학생 코드:
\`\`\`
${studentCode}
\`\`\`

시도 횟수: ${attempts}
이전에 준 힌트: ${previousHints.join(', ') || '없음'}

시도 횟수에 따라 힌트 수준을 조절해주세요:
- 1-2회: 방향만 제시 (매우 간접적)
- 3-4회: 구체적인 힌트 (어느 부분을 수정해야 하는지)
- 5회+: 거의 답에 가까운 힌트 (하지만 완전한 답은 X)

중요: 절대 완전한 답을 주지 마세요! 한국어로 응답하세요.
짧고 핵심적인 힌트 하나만 주세요 (2-3문장).`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('힌트 생성 오류:', error);
    return '🤔 힌트를 생각하는 중 문제가 생겼어요!';
  }
};

// 코드 리뷰
export const reviewCode = async (code: string, missionTitle: string): Promise<string> => {
  const ai = getGenAI();

  if (!ai) {
    return '코드 리뷰를 하려면 API 키가 필요합니다.';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `미션: ${missionTitle}

제출된 코드:
\`\`\`
${code}
\`\`\`

다음 형식으로 한국어로 코드 리뷰를 해주세요:

## ✅ 잘한 점
(구체적으로 칭찬, 1-2개)

## 💡 개선 제안
(부드럽게, 선택사항임을 명시, 1-2개)

## 🎯 다음 단계
(이 미션 이후 뭘 더 배우면 좋을지, 1개)

## 점수: X/10

친절하고 격려하는 톤으로 작성해주세요!`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('코드 리뷰 오류:', error);
    return '코드 리뷰 중 오류가 발생했습니다.';
  }
};

// 오류 설명
export const explainError = async (
  code: string,
  error: string,
  language: string
): Promise<string> => {
  const ai = getGenAI();

  if (!ai) {
    return '오류 설명을 하려면 API 키가 필요합니다.';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `코드:
\`\`\`${language}
${code}
\`\`\`

오류 메시지: ${error}

다음을 한국어로 설명해주세요:

1. 🔴 **오류의 의미** (초보자도 이해할 수 있게)
2. 🔍 **원인** (코드의 어느 부분이 문제인지)
3. 🛠️ **해결 힌트** (직접 수정 코드는 X, 방향만)
4. 💡 **같은 실수를 피하는 팁**

친절하고 격려하는 톤으로!`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('오류 설명 실패:', error);
    return '오류 설명 중 문제가 발생했습니다.';
  }
};

// 바이브코딩 (자연어 → 코드)
export const vibeCoding = async (request: VibeCodingRequest): Promise<VibeCodingResponse> => {
  const ai = getGenAI();

  if (!ai) {
    return {
      understanding: 'API 키가 필요합니다',
      code: '',
      explanation: '',
      customizationIdeas: [],
      nextSteps: [],
    };
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `사용자 요청: "${request.prompt}"
언어: ${request.language}
복잡도: ${request.complexity} (simple/medium/complex)

다음 형식으로 한국어로 응답해주세요:

## 🎯 이해한 내용
(요청을 명확하게 정리, 1-2문장)

## 💻 생성된 코드
\`\`\`${request.language}
(완전히 동작하는 코드)
(주석으로 각 부분 설명)
\`\`\`

## 📚 코드 설명
(각 부분이 무엇을 하는지, 초보자도 이해하게, 3-5줄)

## 🎨 커스터마이징 아이디어
- (수정해볼 수 있는 부분 3가지, 각각 한 줄)

## 🚀 더 발전시키려면
- (추가할 수 있는 기능 2-3가지, 각각 한 줄)`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 파싱
    const sections = {
      understanding: '',
      code: '',
      explanation: '',
      customizationIdeas: [] as string[],
      nextSteps: [] as string[],
    };

    // 간단한 파싱
    const understandingMatch = text.match(/## 🎯 이해한 내용\n([\s\S]*?)(?=##|$)/);
    const codeMatch = text.match(/```[\w]*\n([\s\S]*?)```/);
    const explanationMatch = text.match(/## 📚 코드 설명\n([\s\S]*?)(?=##|$)/);
    const customMatch = text.match(/## 🎨 커스터마이징 아이디어\n([\s\S]*?)(?=##|$)/);
    const nextMatch = text.match(/## 🚀 더 발전시키려면\n([\s\S]*?)(?=##|$)/);

    if (understandingMatch) sections.understanding = understandingMatch[1].trim();
    if (codeMatch) sections.code = codeMatch[1].trim();
    if (explanationMatch) sections.explanation = explanationMatch[1].trim();
    if (customMatch) {
      sections.customizationIdeas = customMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }
    if (nextMatch) {
      sections.nextSteps = nextMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    return sections;
  } catch (error) {
    console.error('바이브코딩 오류:', error);
    return {
      understanding: '요청 처리 중 오류가 발생했습니다',
      code: '',
      explanation: '',
      customizationIdeas: [],
      nextSteps: [],
    };
  }
};

// 학습 추천
export const getRecommendation = async (userProgress: {
  completedMissions: number;
  strengths: string[];
  weaknesses: string[];
  interests: string[];
}): Promise<string> => {
  const ai = getGenAI();

  if (!ai) {
    return '추천을 받으려면 API 키가 필요합니다.';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `학생 진행 상황:
- 완료 미션: ${userProgress.completedMissions}개
- 강점: ${userProgress.strengths.join(', ') || '아직 파악 중'}
- 약점: ${userProgress.weaknesses.join(', ') || '아직 파악 중'}
- 관심사: ${userProgress.interests.join(', ') || '다양함'}

다음을 한국어로 추천해주세요:

1. **다음에 도전할 미션** (3개, 이유와 함께)
2. **복습이 필요한 개념** (있다면)
3. **관심사 기반 프로젝트 아이디어** (1개)

친절하고 동기부여가 되는 톤으로!`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('추천 생성 오류:', error);
    return '추천을 생성하는 중 오류가 발생했습니다.';
  }
};

// API 키 유효성 확인
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const testAI = new GoogleGenerativeAI(apiKey);
    const model = testAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    await model.generateContent('test');
    return true;
  } catch {
    return false;
  }
};
