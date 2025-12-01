import React, { useRef } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { useSettingsStore } from '../../stores/settingsStore';

interface CodeEditorProps {
  language: 'python' | 'javascript' | 'html' | 'css';
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

const fontSizeMap = {
  small: 12,
  medium: 14,
  large: 16,
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  readOnly = false,
  height = '400px',
}) => {
  const { fontSize: fontSizeSetting, getEffectiveTheme } = useSettingsStore();
  const editorRef = useRef<any>(null);
  const theme = getEffectiveTheme();
  const fontSize = fontSizeMap[fontSizeSetting] || 14;

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // 커스텀 테마 설정
    monaco.editor.defineTheme('codequest-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c084fc' },
        { token: 'string', foreground: '34d399' },
        { token: 'number', foreground: 'fbbf24' },
        { token: 'function', foreground: '60a5fa' },
      ],
      colors: {
        'editor.background': '#1e293b',
        'editor.foreground': '#e2e8f0',
        'editor.lineHighlightBackground': '#334155',
        'editorCursor.foreground': '#818cf8',
        'editor.selectionBackground': '#4f46e580',
        'editorLineNumber.foreground': '#64748b',
        'editorLineNumber.activeForeground': '#94a3b8',
      },
    });

    monaco.editor.defineTheme('codequest-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7c3aed' },
        { token: 'string', foreground: '059669' },
        { token: 'number', foreground: 'd97706' },
        { token: 'function', foreground: '2563eb' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1e293b',
        'editor.lineHighlightBackground': '#f1f5f9',
        'editorCursor.foreground': '#6366f1',
        'editor.selectionBackground': '#c7d2fe',
        'editorLineNumber.foreground': '#94a3b8',
        'editorLineNumber.activeForeground': '#64748b',
      },
    });

    monaco.editor.setTheme(theme === 'dark' ? 'codequest-dark' : 'codequest-light');

    // 자동 완성 제안 설정
    editor.updateOptions({
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      parameterHints: { enabled: true },
    });
  };

  const handleChange: OnChange = (value) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const languageMap: Record<string, string> = {
    python: 'python',
    javascript: 'javascript',
    html: 'html',
    css: 'css',
  };

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-dark-border">
      <Editor
        height={height}
        language={languageMap[language] || 'python'}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'codequest-dark' : 'codequest-light'}
        options={{
          fontSize,
          fontFamily: "'JetBrains Mono', Consolas, monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 4,
          insertSpaces: true,
          automaticLayout: true,
          readOnly,
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          folding: true,
          bracketPairColorization: { enabled: true },
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-slate-100 dark:bg-dark-surface">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
          </div>
        }
      />
    </div>
  );
};

export default CodeEditor;
