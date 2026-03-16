# Code Editor Specification

## Research Summary

### Options Evaluated

| Library | Size | Features | Best For |
|---------|------|----------|----------|
| **Monaco Editor** | ~2.5MB | Full IDE features, autocomplete, minimap | Rich editing experience |
| **CodeMirror 6** | ~500KB | Modular, extensible, good performance | Modern, extensible apps |
| **react-ace** | ~1MB | Ace editor wrapper, many themes | Quick setup |
| **@uiw/react-textarea-code-editor** | ~50KB | Lightweight, simple textarea overlay | Simple embedding |
| **prism-code-editor** | ~20KB | Minimal, Prism-based | Lightweight needs |
| **react-syntax-highlighter** | ~300KB | Display only, read-only | Just displaying code |

### Selected Option: `@uiw/react-textarea-code-editor`

**Reasoning:**
- Lightweight (~50KB)
- Simple to integrate
- Supports automatic syntax highlighting
- Works well with our use case (paste code + view highlighted)
- Good theme support
- Supports manual language selection

### Language Detection

Use `highlight.js` or `flourite` for auto-detection:
- `flourite` - Lightweight, no dependencies
- `highlight.js` - More accurate, larger

## Implementation Spec

### Features
1. **Code Input** - Textarea with syntax highlighting
2. **Language Auto-detection** - Detect language automatically on paste
3. **Language Selector** - Manual language override dropdown
4. **Themes** - Match app's dark/light theme

### File: `src/components/ui/CodeEditor.tsx`

```tsx
import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

const SUPPORTED_LANGUAGES = [
  "javascript", "typescript", "python", "java", 
  "cpp", "go", "rust", "csharp", "php", 
  "ruby", "swift", "kotlin", "sql", "html", "css", "json"
];
```

### Language Detection Strategy
1. On paste, run detection
2. If confidence > 70%, auto-select
3. User can override via dropdown

## TODO

- [ ] Install `@uiw/react-textarea-code-editor`
- [ ] Install `flourite` for language detection
- [ ] Create `CodeEditor` component in `src/components/ui/`
- [ ] Add language selector dropdown
- [ ] Implement auto-detection on paste
- [ ] Integrate with existing `CodeInput.tsx`
- [ ] Test with multiple languages

## References
- ray.so: https://github.com/raycast/ray-so
- @uiw/react-textarea-code-editor: https://www.npmjs.com/package/@uiw/react-textarea-code-editor
- flourite: https://github.com/tejasq/flourite
