# Code Editor Specification

## Research Summary

Based on the official NLW Rocketseat repo, we should use **Shiki** for syntax highlighting, not @uiw/react-textarea-code-editor.

### Options Evaluated

| Library | Used in Official Repo | Notes |
|---------|----------------------|-------|
| **Shiki** | ✅ Yes | Official repo uses Shiki with vesper theme |
| highlight.js | ✅ Yes | Used for language detection |
| @uiw/react-textarea-code-editor | ❌ No | Not used in official repo |

### Selected Approach: Shiki + highlight.js

The official repo uses:
- **Shiki** - For syntax highlighting in the code editor
- **highlight.js** - For auto-detecting programming language
- **useShikiHighlighter hook** - Custom hook for highlighting
- **useLanguageDetection hook** - For auto-detecting language

## Implementation Spec

### Dependencies (from official repo)
```json
{
  "shiki": "4.0.1",
  "highlight.js": "11.11.1"
}
```

### Files to Create

1. **src/lib/languages.ts** - Language definitions mapping
2. **src/hooks/use-shiki-highlighter.ts** - Shiki hook for highlighting
3. **src/hooks/use-language-detection.ts** - Language detection hook
4. **src/components/code-editor.tsx** - Code editor component

### Code Editor Features

1. **Syntax Highlighting** - Shiki with vesper theme
2. **Language Detection** - Auto-detect using highlight.js
3. **Manual Override** - Dropdown to select language manually
4. **Line Numbers** - Synchronized with textarea
5. **Character Count** - Show limit (2000 chars)
6. **Scroll Sync** - Highlighted overlay syncs with textarea

### Language Options (from official repo)
- JavaScript, TypeScript, JSX, TSX
- Python, Go, Rust
- Java, Ruby, PHP
- SQL, Shell (bash)
- HTML, CSS
- JSON, YAML, Markdown
- C, C++, C#
- Swift, Kotlin, Dart

## TODO

- [x] Install shiki and highlight.js
- [x] Create `src/lib/languages.ts`
- [x] Create `src/hooks/use-shiki-highlighter.ts`
- [x] Create `src/hooks/use-language-detection.ts`
- [x] Create `src/components/code-editor.tsx`
- [x] Replace existing CodeInput with new CodeEditor
- [x] Add language selector dropdown

## References
- Official repo: https://github.com/rocketseat-education/nlw-operator-fullstack-devroast
- Shiki: https://shiki.style
- highlight.js: https://highlightjs.org
