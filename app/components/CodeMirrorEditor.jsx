'use client';

import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from 'next-themes';

export default function CodeMirrorEditor({ code = '' }) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const { theme } = useTheme(); // "light" | "dark"

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const readOnly = EditorView.editable.of(false);

      const startState = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          javascript(),
          theme === 'dark' ? oneDark : EditorView.theme({}), // Darkmode theme
          readOnly, // Read Only
        ],
      });

      viewRef.current = new EditorView({
        state: startState,
        parent: editorRef.current,
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [theme]);

  return <div ref={editorRef} style={{ marginTop: '20px'}} />;
}
