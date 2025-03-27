import { EditorView } from '@codemirror/view';

const customTheme = EditorView.theme({
  '&': {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    fontSize: '16px',
  },
  '.cm-content': {
    caretColor: '#00ffcc',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#00ffcc',
  },
});
