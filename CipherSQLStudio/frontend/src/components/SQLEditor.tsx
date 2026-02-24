import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './SQLEditor.scss';

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
  readOnly?: boolean;
}

function SQLEditor({ value, onChange, onExecute, isExecuting, readOnly = false }: SQLEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isExecuting) {
          onExecute();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExecute, isExecuting]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="sql-editor">
      <div className="editor-header">
        <h3>SQL Query</h3>
        <span className="keyboard-hint">Ctrl+Enter to execute</span>
      </div>

      <div className="editor-wrapper">
        <Editor
          height="300px"
          defaultLanguage="sql"
          value={value}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme="vs-light"
          options={{
            minimap: { enabled: window.innerWidth >= 1024 },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <button
        className="execute-button"
        onClick={onExecute}
        disabled={isExecuting || !value.trim()}
      >
        {isExecuting ? 'Executing...' : 'Execute Query'}
      </button>
    </div>
  );
}

export default SQLEditor;
