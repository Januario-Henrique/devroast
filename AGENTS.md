# DevRoast - Project Guide

## Tech Stack
- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4

## Global Patterns

### UI Components (`src/components/ui/`)
Use `tailwind-variants` (tv) for component variants. Never use `clsx`/`tailwind-merge` for variant handling.

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "base-styles...",
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

type ButtonProps = VariantProps<typeof button> & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  className?: string;
};
```

### Compound Components
Use composition pattern instead of many props:
```tsx
<Section>
  <SectionHeader>
    <SectionTitle>//</SectionTitle>
    <SectionLabel>title</SectionLabel>
  </SectionHeader>
</Section>
```

### Fonts
- JetBrains Mono for code/monospace
- System sans-serif for regular text

### Avoid Arbitrary Values
Add semantic variables to `globals.css`:
```css
@theme {
  --width-container-lg: 960px;
  --size-score-ring-lg: 180px;
}
```

## Project Structure
```
src/
├── app/           # Next.js pages
├── components/    # React components
│   └── ui/       # Reusable UI components
└── lib/          # Utilities (analysis, theme)
```

## Commands
- `npm run dev` - Development server
- `npm run lint` - Run linter
