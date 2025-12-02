import type { CodeExecutionResult, TestCase } from '../types';

// Pyodide 인스턴스 캐싱
let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

// Pyodide 초기화
const initPyodide = async (): Promise<any> => {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (pyodideLoading) {
    return pyodideLoading;
  }

  if (typeof window !== 'undefined' && (window as any).loadPyodide) {
    pyodideLoading = (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    }).then((pyodide: any) => {
      pyodideInstance = pyodide;
      pyodideLoading = null;
      return pyodide;
    });
    return pyodideLoading;
  }

  return null;
};

// Python 코드 실행 (Pyodide 또는 시뮬레이션)
export const runPython = async (code: string, input?: string): Promise<CodeExecutionResult> => {
  const startTime = performance.now();

  try {
    // Pyodide 로드 시도
    const pyodide = await initPyodide();

    if (pyodide) {
      // input 시뮬레이션
      if (input) {
        const inputs = input.split('\n');
        pyodide.globals.set('__inputs__', pyodide.toPy(inputs));
        await pyodide.runPythonAsync(`
__input_index__ = 0
__inputs__ = list(__inputs__)
def input(prompt=''):
    global __input_index__
    if __input_index__ < len(__inputs__):
        result = __inputs__[__input_index__]
        __input_index__ += 1
        return result
    return ''
        `);
      }

      // stdout/stderr 캡처
      await pyodide.runPythonAsync(`
import sys
from io import StringIO
__stdout__ = sys.stdout
__stderr__ = sys.stderr
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      try {
        // 코드 실행
        await pyodide.runPythonAsync(code);

        // 출력 가져오기
        const output = await pyodide.runPythonAsync(`
sys.stdout.getvalue()
        `);

        // stdout 복원
        await pyodide.runPythonAsync(`
sys.stdout = __stdout__
sys.stderr = __stderr__
        `);

        const executionTime = performance.now() - startTime;

        return {
          success: true,
          output: output.trim(),
          executionTime,
        };
      } catch (execError) {
        // 에러 발생 시 stderr 가져오기
        const errorOutput = await pyodide.runPythonAsync(`
sys.stderr.getvalue()
        `);

        // stdout 복원
        await pyodide.runPythonAsync(`
sys.stdout = __stdout__
sys.stderr = __stderr__
        `);

        const executionTime = performance.now() - startTime;
        return {
          success: false,
          output: errorOutput || '',
          error: execError instanceof Error ? execError.message : String(execError),
          executionTime,
        };
      }
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

  // 변수 저장소
  const variables: Record<string, any> = {};

  // 코드를 줄 단위로 분석
  const lines = code.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 빈 줄이나 주석은 건너뛰기
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    // 변수 할당 처리: x = 값
    const assignMatch = trimmedLine.match(/^(\w+)\s*=\s*(.+)$/);
    if (assignMatch) {
      const [, varName, value] = assignMatch;
      try {
        // 문자열 값
        if ((value.startsWith("'") && value.endsWith("'")) ||
            (value.startsWith('"') && value.endsWith('"'))) {
          variables[varName] = value.slice(1, -1);
        }
        // 숫자 값
        else if (/^[\d.]+$/.test(value.trim())) {
          variables[varName] = parseFloat(value);
        }
        // 수식 계산
        else if (/^[\d\s+\-*/%().]+$/.test(value)) {
          variables[varName] = eval(value);
        }
        // 변수 참조
        else if (variables[value.trim()] !== undefined) {
          variables[varName] = variables[value.trim()];
        }
        // input() 함수
        else if (value.includes('input(')) {
          variables[varName] = inputs[inputIndex++] || '';
        }
        // int() 변환
        else if (value.startsWith('int(')) {
          const innerMatch = value.match(/int\(\s*(\w+)\s*\)/);
          if (innerMatch && variables[innerMatch[1]] !== undefined) {
            variables[varName] = parseInt(variables[innerMatch[1]]);
          }
        }
      } catch {
        // 파싱 실패시 무시
      }
      continue;
    }

    // print 문 처리
    const printMatch = trimmedLine.match(/^print\s*\((.*)\)$/);
    if (printMatch) {
      const content = printMatch[1].trim();

      // 빈 print()
      if (!content) {
        outputs.push('');
        continue;
      }

      // 문자열 리터럴
      if ((content.startsWith("'") && content.endsWith("'")) ||
          (content.startsWith('"') && content.endsWith('"'))) {
        outputs.push(content.slice(1, -1));
        continue;
      }

      // f-string
      if (content.startsWith("f'") || content.startsWith('f"')) {
        let fstring = content.slice(2, -1);
        fstring = fstring.replace(/\{([^}]+)\}/g, (_, varName) => {
          const v = varName.trim();
          return variables[v] !== undefined ? String(variables[v]) : `{${v}}`;
        });
        outputs.push(fstring);
        continue;
      }

      // 변수 참조
      if (variables[content] !== undefined) {
        outputs.push(String(variables[content]));
        continue;
      }

      // 숫자 계산
      if (/^[\d\s+\-*/%().]+$/.test(content)) {
        try {
          outputs.push(String(eval(content)));
        } catch {
          outputs.push(content);
        }
        continue;
      }

      // 변수가 포함된 계산
      let evalExpr = content;
      for (const [varName, varValue] of Object.entries(variables)) {
        evalExpr = evalExpr.replace(new RegExp(`\\b${varName}\\b`, 'g'), String(varValue));
      }
      if (/^[\d\s+\-*/%().]+$/.test(evalExpr)) {
        try {
          outputs.push(String(eval(evalExpr)));
          continue;
        } catch {
          // 계산 실패
        }
      }

      // 여러 인자가 있는 경우 (쉼표로 구분)
      if (content.includes(',')) {
        const parts = content.split(',').map(p => {
          const pt = p.trim();
          if ((pt.startsWith("'") && pt.endsWith("'")) ||
              (pt.startsWith('"') && pt.endsWith('"'))) {
            return pt.slice(1, -1);
          }
          if (variables[pt] !== undefined) {
            return String(variables[pt]);
          }
          return pt;
        });
        outputs.push(parts.join(' '));
        continue;
      }

      outputs.push(content);
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
