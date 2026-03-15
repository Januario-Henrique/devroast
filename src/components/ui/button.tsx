import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  variants: {
    variant: {
      primary: "bg-accent-green text-black hover:bg-accent-green/90",
      secondary: "border border-border-primary text-text-primary hover:border-text-secondary hover:bg-bg-elevated",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
      destructive: "bg-accent-red text-white hover:bg-accent-red/90",
      outline: "border border-border-primary text-text-primary hover:bg-bg-elevated",
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = VariantProps<typeof button> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    className?: string;
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  className,
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={button({ variant, size, className })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
