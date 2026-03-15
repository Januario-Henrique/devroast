# UI Components Development Guide

## Creating New UI Components

Follow these patterns when creating new UI components in `src/components/ui/`.

### 1. Use tailwind-variants for Variants

Always use `tailwind-variants` (tv) for defining component variants. Do NOT use `clsx` or `tailwind-merge` for variant handling.

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const componentName = tv({
  base: "base-styles...",
  variants: {
    variant: {
      primary: "variant-styles...",
      secondary: "variant-styles...",
    },
    size: {
      sm: "size-styles...",
      md: "size-styles...",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ComponentNameProps = VariantProps<typeof componentName> &
  Omit<React.HTMLAttributes<HTMLElement>, "className"> & {
    className?: string;
  };

export function ComponentName({ variant, size, className, ...props }: ComponentNameProps) {
  return (
    <element className={componentName({ variant, size, className })} {...props} />
  );
}
```

### 2. Extending HTML Props

Extend native HTML properties using `Omit` to exclude `className` (since we're handling it ourselves):

```tsx
type ButtonProps = VariantProps<typeof button> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    className?: string;
    loading?: boolean;
  };
```

### 3. Named Exports Only

Always use named exports. Do NOT use default exports.

```tsx
export function Button() { }
```

### 4. Avoid Arbitrary Values

Do NOT use arbitrary Tailwind values like `w-[960px]`. Instead:

1. **Add semantic variables to globals.css:**

```css
@theme {
  /* Container widths */
  --width-container-sm: 480px;
  --width-container-md: 768px;
  --width-container-lg: 960px;
  
  /* Component sizes */
  --size-score-ring-sm: 120px;
  --size-score-ring-md: 160px;
  --size-score-ring-lg: 180px;
}
```

2. **Use semantic classes:**

```tsx
// Bad
<div className="w-[960px]" />

// Good
<div className="max-w-container-lg w-full" />
// or
<div className="w-container-lg" />
```

### 5. Type Safety

- Use TypeScript for all props
- Use `VariantProps` from tailwind-variants for variant types
- Extend native HTML element types for appropriate props

### 6. File Structure

```
src/components/ui/
├── button.tsx      # Button component with variants
├── card.tsx        # Card component
├── input.tsx       # Input component
└── agents.md       # This file
```

### 7. Loading States

For components with loading states, include a spinner:

```tsx
{loading && (
  <svg className="animate-spin h-4 w-4" ...>
    ...
  </svg>
)}
```

### 8. Disabled States

Always handle disabled states properly:

```tsx
disabled={disabled || loading}
className={..., (disabled || loading) && "opacity-50 cursor-not-allowed"}
```
