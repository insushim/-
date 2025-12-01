import type { CodeExecutionResult, TestCase } from '../types';

// Python 코드 실행 (Pyodide 또는 시뮬레이션)
export const runPython = async (code: string, input?: string): Promise<CodeExecutionResult> => {
  const startTime = performance.now();

  try {
    // Pyodide 로드 시도
    if (typeof window !== 'undefined' && (window as any).loadPyodide) {
      const pyodide = await (window as any).loadPyodide();

      // input 시뮬레이션
      if (input) {
        const inputs = input.split('\n');
        let inputIndex = 0;
        pyodide.globals.set('__inputs__', inputs);
        await pyodide.runPythonAsync(`
          __input_index__ = 0
          def input(prompt=''):
              global __input_index__
              if __input_index__ < len(__inputs__):
                  result = __inputs__[__input_index__]
                  __input_index__ += 1
                  return result
              return ''
        `);
      }

      // stdout 캡처
      await pyodide.runPythonAsync(`
        import sys
        from io import StringIO
        __stdout__ = sys.stdout
        sys.stdout = StringIO()
      `);

      // 코드 실행
      await pyodide.runPythonAsync(code);

      // 출력 가져오기
      const output = await pyodide.runPythonAsync(`
        sys.stdout.getvalue()
      `);

      // stdout 복원
      await pyodide.runPythonAsync(`
        sys.stdout = __stdout__
      `);

      const executionTime = performance.now() - startTime;

      return {
        success: true,
        output: output.trim(),
        executionTime,
      };
    }

    // Pyodide 없으면 간단한 시뮬레이션
    return simulatePython(code, input);
  } catch (error) {
    const executionTime = performance.now() - startTime;
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : '실행 중 오류가 발생했습니다',
      executionTime,
    };
  }
};

// Python 간단 시뮬레이션 (Pyodide 없이)
const simulatePython = (code: string, input?: string): CodeExecutionResult => {
  const outputs: string[] = [];
  const inputs = input?.split('\n') || [];
  let inputIndex = 0;

  // print 문 추출
  const printRegex = /print\s*\(\s*(['"`])(.*?)\1\s*\)/g;
  const printFStringRegex = /print\s*\(\s*f(['"`])(.*?)\1\s*\)/g;
  const printExprRegex = /print\s*\(\s*([^'"`)]+)\s*\)/g;

  let match;

  // 간단한 print 문
  while ((match = printRegex.exec(code)) !== null) {
    outputs.push(match[2]);
  }

  // f-string (간단한 경우만)
  while ((match = printFStringRegex.exec(code)) !== null) {
    let fstring = match[2];
    // {변수} 패턴을 [변수값]으로 대체 (실제로는 변수 추적 필요)
    outputs.push(fstring.replace(/\{([^}]+)\}/g, '[$1]'));
  }

  // 숫자 계산
  while ((match = printExprRegex.exec(code)) !== null) {
    const expr = match[1].trim();
    try {
      // 안전한 수식만 평가
      if (/^[\d\s+\-*/%().]+$/.test(expr)) {
        const result = eval(expr);
        if (!outputs.includes(String(result))) {
          outputs.push(String(result));
        }
      }
    } catch {
      // 평가 실패시 무시
    }
  }

  return {
    success: true,
    output: outputs.join('\n') || '(실행 완료 - 출력 없음)',
    executionTime: 0,
  };
};

// JavaScript 코드 실행 (안전한 샌드박스)
export const runJavaScript = async (code: string): Promise<CodeExecutionResult> => {
  const startTime = performance.now();

  try {
    const outputs: string[] = [];

    // console.log 캡처
    const originalLog = console.log;
    console.log = (...args) => {
      outputs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    // iframe 샌드박스에서 실행
    const sandbox = document.createElement('iframe');
    sandbox.style.display = 'none';
    sandbox.sandbox.add('allow-scripts');
    document.body.appendChild(sandbox);

    const sandboxWindow = sandbox.contentWindow;
    if (sandboxWindow) {
      // 안전한 함수만 노출
      (sandboxWindow as any).console = { log: console.log };

      try {
        const result = (sandboxWindow as any).eval(code);
        if (result !== undefined && outputs.length === 0) {
          outputs.push(String(result));
        }
      } catch (e) {
        throw e;
      }
    }

    document.body.removeChild(sandbox);
    console.log = originalLog;

    const executionTime = performance.now() - startTime;

    return {
      success: true,
      output: outputs.join('\n') || '(실행 완료)',
      executionTime,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : '실행 중 오류가 발생했습니다',
      executionTime,
    };
  }
};

// HTML/CSS 미리보기 생성
export const generateHTMLPreview = (html: string, css?: string, js?: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: system-ui, sans-serif; padding: 16px; }
        ${css || ''}
      </style>
    </head>
    <body>
      ${html}
      ${js ? `<script>${js}</script>` : ''}
    </body>
    </html>
  `;
};

// 테스트 케이스 실행
export const runTestCases = async (
  code: string,
  testCases: TestCase[],
  language: 'python' | 'javascript'
): Promise<CodeExecutionResult> => {
  const results: Array<{
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
    description?: string;
  }> = [];

  let allPassed = true;
  let totalTime = 0;

  for (const testCase of testCases) {
    const runFn = language === 'python' ? runPython : runJavaScript;
    const result = await runFn(code, testCase.input);

    totalTime += result.executionTime;

    const passed = result.output.trim() === testCase.expectedOutput.trim();
    if (!passed) allPassed = false;

    results.push({
      passed,
      input: testCase.input,
      expected: testCase.expectedOutput,
      actual: result.output,
      description: testCase.description,
    });
  }

  return {
    success: allPassed,
    output: results.map(r =>
      `${r.passed ? '✅' : '❌'} ${r.description || '테스트'}: ${r.passed ? '통과' : `예상: ${r.expected}, 실제: ${r.actual}`}`
    ).join('\n'),
    executionTime: totalTime,
    testResults: results,
  };
};

// 코드 검증 (기본적인 구문 체크)
export const validateCode = (code: string, language: 'python' | 'javascript'): { valid: boolean; error?: string } => {
  if (!code.trim()) {
    return { valid: false, error: '코드를 입력해주세요' };
  }

  if (language === 'python') {
    // 기본적인 Python 문법 체크
    const dangerousPatterns = [
      /import\s+(os|sys|subprocess)/,
      /exec\s*\(/,
      /__import__/,
      /open\s*\([^)]*['"](\/|\\)/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return { valid: false, error: '보안상 허용되지 않는 코드가 포함되어 있습니다' };
      }
    }
  }

  if (language === 'javascript') {
    // 기본적인 JS 문법 체크
    const dangerousPatterns = [
      /eval\s*\(/,
      /Function\s*\(/,
      /fetch\s*\(/,
      /XMLHttpRequest/,
      /localStorage/,
      /document\.cookie/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return { valid: false, error: '보안상 허용되지 않는 코드가 포함되어 있습니다' };
      }
    }
  }

  return { valid: true };
};
