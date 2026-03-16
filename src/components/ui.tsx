import React from 'react';

// UI Components for DevRoast - Enhanced Implementation matching design specs

export function ToggleSwitch(props: { 
  checked?: boolean; 
  labelOn: string; 
  labelOff: string; 
  onChange?: (checked: boolean) => void; 
  className?: string; 
}) {
  const [isChecked, setIsChecked] = React.useState(props.checked || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (props.onChange) props.onChange(e.target.checked);
  };

  return React.createElement("div", { className: "flex items-center gap-3" },
    React.createElement("label", { className: "relative inline-flex h-[24px] w-[48px] cursor-pointer items-center" },
      React.createElement("input", {
        type: "checkbox",
        className: "peer appearance-none h-[24px] w-[48px]",
        checked: isChecked,
        onChange: handleChange
      }),
      React.createElement("span", { className: "pointer-events-none absolute left-[2px] top-[2px] h-[20px] w-[20px] rounded-full bg-white transition-all duration-200 peer-checked:left-[26] peer-checked:border-0 peer-checked:bg-black" })
    ),
    React.createElement("span", { className: `text-sm font-medium ${isChecked ? "text-accent-green" : "text-text-secondary"}` },
      isChecked ? props.labelOn : props.labelOff
    )
  );
}

export function Badge(props: { 
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'warning' | 'success' | 'verdict'; 
  children: React.ReactNode; 
  className?: string; 
}) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  const variantClasses: Record<string, string> = {
    default: "bg-border-primary text-text-tertiary",
    primary: "bg-accent-green text-black",
    secondary: "bg-accent-amber text-black",
    destructive: "bg-accent-red text-white",
    warning: "bg-accent-amber/20 text-accent-amber",
    success: "bg-accent-green/20 text-accent-green",
    verdict: "bg-gradient-to-r from-accent-green via-accent-amber to-accent-red text-white text-xs font-bold px-4 py-2"
  };

  const variantClass = variantClasses[props.variant || 'default'];

  return React.createElement("span", { className: `${baseClasses} ${variantClass} ${props.className || ""}` }, props.children);
}

export function ScoreRing(props: { 
  score: number; 
  className?: string; 
}) {
  return React.createElement("div", { className: `relative w-[160px] h-[160px] flex items-center justify-center ${props.className || ""}` },
    React.createElement("div", { className: "absolute inset-0 rounded-full border-8 border-border-primary" }),
    React.createElement("div", { 
      className: "absolute inset-0 rounded-full border-8 border-accent-green",
      style: { 
        background: `conic-gradient(from -90deg at 50% 50%, ${props.score >= 8 ? 'var(--color-accent-green)' : props.score >= 6 ? 'var(--color-accent-amber)' : 'var(--color-accent-red)'} ${props.score * 3.6}deg, transparent ${props.score * 3.6}deg 360deg)`,
        transition: "background 0.3s ease"
      } 
    }),
    React.createElement("div", { className: "text-center" },
      React.createElement("span", { className: "text-accent-amber text-[48px] font-bold" }, props.score.toString()),
      React.createElement("span", { className: "text-text-tertiary text-base" }, "/10")
    )
  );
}

export function CodeBlock(props: { 
  code: string[]; 
  language?: string; 
  showLineNumbers?: boolean; 
  className?: string; 
}) {
  const lineNumbers = Array.from({ length: Math.max(props.code.length, 1) }, (_, i) => i + 1);

  return React.createElement("div", { className: "border border-border-primary rounded-lg overflow-hidden shadow-sm" },
    React.createElement("div", { className: "h-12 bg-bg-surface border-b border-border-primary flex items-center px-4" },
      props.showLineNumbers && React.createElement("div", { className: "w-12 bg-bg-surface border-r border-border-primary p-4 pt-4 flex flex-col gap-2 items-end" },
        lineNumbers.map((lineNum) => 
          React.createElement("span", { 
            key: lineNum, 
            className: "text-text-tertiary text-xs font-mono" 
          }, lineNum)
        )
      ),
      React.createElement("div", { className: "flex-1 p-4 pt-4" },
        props.language && React.createElement("span", { className: "mb-2 block text-text-tertiary text-xs font-mono" }, props.language),
        React.createElement("pre", { className: "text-text-primary text-xs font-mono whitespace-pre-wrap" }, props.code.join("\n"))
      )
    )
  );
}

export function DiffVisualization(props: { 
  original: string[]; 
  modified: string[]; 
  className?: string; 
}) {
  return React.createElement("div", { className: "space-y-4" },
    props.original.map((line, index) => 
      React.createElement("div", { key: `orig-${index}`, className: "flex items-center gap-2 bg-red-500/5 border-l-4 border-red-500" },
        React.createElement("span", { className: "w-5 text-xs font-mono text-accent-red" }, "-"),
        React.createElement("span", { className: "text-xs font-mono text-text-secondary" }, line)
      )
    ),
    props.modified.map((line, index) => 
      React.createElement("div", { key: `mod-${index}`, className: "flex items-center gap-2 bg-green-500/5 border-l-4 border-green-500" },
        React.createElement("span", { className: "w-5 text-xs font-mono text-accent-green" }, "+"),
        React.createElement("span", { className: "text-xs font-mono text-text-secondary" }, line)
      )
    )
  );
}

export function TableRow(props: { 
  rank: number; 
  score: number; 
  codePreview: string; 
  language: string; 
  lines: number; 
  className?: string; 
}) {
  return React.createElement("div", { className: "border-b border-border-primary last:border-b-0 flex items-center px-6 py-5" },
    React.createElement("div", { className: "w-10 text-xs" },
      React.createElement("span", { 
        className: props.rank <= 3 ? "text-accent-amber font-bold" : "text-text-secondary" 
      }, `#${props.rank}`)
    ),
    React.createElement("div", { className: "w-20 text-accent-red text-xs font-bold flex items-center justify-center" }, props.score.toString()),
    React.createElement("div", { className: "flex-1 text-text-secondary text-xs font-mono truncate max-w-md" }, props.codePreview),
    React.createElement("div", { className: "w-20 text-text-secondary text-xs" }, props.language),
    React.createElement("div", { className: "w-16 text-text-tertiary text-xs" }, `${props.lines} lines`)
  );
}

export function PrimaryButton(props: { 
  onClick: () => void; 
  disabled?: boolean; 
  loading?: boolean; 
  className?: string; 
  children: React.ReactNode; 
}) {
  return React.createElement("button", {
    onClick: props.onClick,
    disabled: props.disabled,
    className: `bg-accent-green text-black px-6 py-3 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-accent-green/90 transition-all duration-200 ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${props.className || ""}`
  }, props.loading ? 
    React.createElement("span", { className: "animate-spin" }) : 
    props.children
  );
}

export function SecondaryButton(props: { 
  onClick: () => void; 
  disabled?: boolean; 
  className?: string; 
  children: React.ReactNode; 
}) {
  return React.createElement("button", {
    onClick: props.onClick,
    disabled: props.disabled,
    className: `border border-border-primary px-5 py-3 rounded-md text-text-primary text-xs flex items-center gap-2 w-fit hover:border-text-secondary hover:bg-bg-elevated transition-all duration-200 ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${props.className || ""}`
  }, props.children);
}

export function LinkButton(props: { 
  href: string; 
  className?: string; 
  children: React.ReactNode; 
}) {
  return React.createElement("a", {
    href: props.href,
    className: `border border-border-primary px-5 py-3 rounded-md text-text-primary text-xs flex items-center gap-2 w-fit hover:border-text-secondary hover:bg-bg-elevated transition-all duration-200 ${props.className || ""}`
  }, props.children);
}

// Compound Components using Composition Pattern

// Section - for grouping content with header
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return <div className={`flex flex-col gap-6 ${className || ""}`}>{children}</div>;
}

export function SectionHeader({ children, className }: SectionProps) {
  return <div className={`flex items-center gap-2 ${className || ""}`}>{children}</div>;
}

export function SectionTitle({ children, className }: SectionProps) {
  return <span className={`text-accent-green text-sm font-bold ${className || ""}`}>{children}</span>;
}

export function SectionLabel({ children, className }: SectionProps) {
  return <span className={`text-text-primary text-sm font-bold ${className || ""}`}>{children}</span>;
}

// CodeWindow - for displaying code with line numbers
interface CodeWindowProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeWindow({ children, className }: CodeWindowProps) {
  return <div className={`border border-border-primary rounded-lg overflow-hidden ${className || ""}`}>{children}</div>;
}

export function CodeWindowHeader({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`h-10 bg-bg-surface border-b border-border-primary flex items-center px-4 ${className || ""}`}>
      <div className="flex gap-1.5 mr-3">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      {children}
    </div>
  );
}

export function CodeWindowContent({ children, code, className }: { children?: React.ReactNode; code?: string[]; className?: string }) {
  if (code) {
    const lines = code;
    return (
      <div className={`flex bg-bg-input ${className || ""}`}>
        <div className="w-12 bg-bg-surface border-r border-border-primary p-3 flex flex-col gap-2 items-end">
          {lines.map((_, i) => (
            <span key={i} className="text-text-tertiary text-xs font-mono">{i + 1}</span>
          ))}
        </div>
        <div className="flex-1 p-4 flex flex-col gap-2">
          {lines.map((line, i) => (
            <span key={i} className="text-text-primary text-xs font-mono">{line}</span>
          ))}
        </div>
      </div>
    );
  }
  return <div className={`bg-bg-input p-4 ${className || ""}`}>{children}</div>;
}

// IssueCard - for displaying issues with severity
interface IssueCardProps {
  children: React.ReactNode;
  className?: string;
}

export function IssueCard({ children, className }: IssueCardProps) {
  return <div className={`border border-border-primary rounded-lg p-5 flex flex-col gap-3 ${className || ""}`}>{children}</div>;
}

export function IssueCardSeverity({ severity, className }: { severity: 'critical' | 'warning' | 'good'; className?: string }) {
  const colorClass = severity === 'critical' ? 'bg-accent-red' : severity === 'warning' ? 'bg-accent-amber' : 'bg-accent-green';
  const textColorClass = severity === 'critical' ? 'text-accent-red' : severity === 'warning' ? 'text-accent-amber' : 'text-accent-green';
  
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
      <span className={`text-xs font-medium ${textColorClass}`}>{severity}</span>
    </div>
  );
}

export function IssueCardTitle({ children, className }: SectionProps) {
  return <h3 className={`text-text-primary text-sm font-medium ${className || ""}`}>{children}</h3>;
}

export function IssueCardDescription({ children, className }: SectionProps) {
  return <p className={`text-text-secondary text-xs leading-relaxed ${className || ""}`}>{children}</p>;
}

// Typography components matching design specs
export function Heading1(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("h1", { 
    className: `text-text-primary text-[32px] font-bold leading-tight ${props.className || ""}` 
  }, props.children);
}

export function Heading2(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("h2", { 
    className: `text-text-primary text-[28px] font-semibold leading-tight ${props.className || ""}` 
  }, props.children);
}

export function Heading3(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("h3", { 
    className: `text-text-primary text-[24px] font-medium leading-tight ${props.className || ""}` 
  }, props.children);
}

export function BodyText(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("p", { 
    className: `text-text-secondary text-base leading-relaxed ${props.className || ""}` 
  }, props.children);
}

export function BodyTextSmall(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("p", { 
    className: `text-text-tertiary text-xs leading-relaxed ${props.className || ""}` 
  }, props.children);
}

export function CodeText(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("code", { 
    className: `text-text-primary text-xs font-mono ${props.className || ""}` 
  }, props.children);
}

export function BlockQuote(props: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return React.createElement("blockquote", { 
    className: `text-text-primary text-xl italic max-w-2x border-l-4 border-accent-green pl-4 ${props.className || ""}` 
  }, props.children);
}
