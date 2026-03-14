import Link from "next/link";

const mockCode = [
  "function calculateTotal(items) {",
  "  var total = 0;",
  "  for (var i = 0; i < items.length; i++) {",
  "    total = total + items[i].price;",
  "  }",
  "",
  "  if (total > 100) {",
  "    console.log(\"discount applied\");",
  "    total = total * 0.9;",
  "  }",
  "",
  "  // TODO: handle tax calculation",
  "  // TODO: handle currency conversion",
  "",
  "  return total;",
  "}",
];

const issues = [
  {
    severity: "critical",
    title: "using var instead of const/let",
    description: "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
  },
  {
    severity: "warning",
    title: "imperative loop pattern",
    description: "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
  },
  {
    severity: "good",
    title: "clear naming conventions",
    description: "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
  },
  {
    severity: "good",
    title: "single responsibility",
    description: "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
  },
];

const suggestedFix = [
  { type: "context", code: "function calculateTotal(items) {" },
  { type: "remove", code: "  var total = 0;" },
  { type: "remove", code: "  for (var i = 0; i < items.length; i++) {" },
  { type: "remove", code: "    total = total + items[i].price;" },
  { type: "remove", code: "  }" },
  { type: "remove", code: "  return total;" },
  { type: "add", code: "  return items.reduce((sum, item) => sum + item.price, 0);" },
  { type: "context", code: "}" },
];

export default function RoastPage() {
  return (
    <main className="flex flex-col items-center pt-10 px-10 pb-20">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        {/* Score Hero */}
        <div className="flex items-center gap-12">
          <div className="relative w-[180px] h-[180px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-border-primary" />
            <div className="absolute inset-0 rounded-full border-4 border-accent-green" style={{ clipPath: "polygon(0 0, 35% 0, 35% 100%, 0 100%)" }} />
            <div className="absolute inset-0 rounded-full border-4 border-accent-amber" style={{ clipPath: "polygon(35% 0, 100% 0, 100% 30%, 35% 30%)" }} />
            <div className="text-center">
              <span className="text-accent-amber text-[48px] font-bold">3.5</span>
              <span className="text-text-tertiary text-base">/10</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-red" />
              <span className="text-accent-red text-sm font-medium">verdict: needs_serious_help</span>
            </div>
            <p className="text-text-primary text-xl leading-relaxed max-w-lg">
              &quot;this code looks like it was written during a power outage... in 2005.&quot;
            </p>
            <div className="flex items-center gap-4 text-text-tertiary text-xs">
              <span>lang: javascript</span>
              <span>·</span>
              <span>7 lines</span>
            </div>
            <button className="border border-border-primary px-4 py-2 rounded text-text-primary text-xs flex items-center gap-1.5 w-fit hover:border-text-secondary transition-colors">
              $ share_roast
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-primary" />

        {/* Submitted Code */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-accent-green text-sm font-bold">//</span>
            <span className="text-text-primary text-sm font-bold">your_submission</span>
          </div>

          <div className="border border-border-primary rounded-lg overflow-hidden">
            <div className="h-10 bg-bg-surface border-b border-border-primary flex items-center px-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500 ml-1.5" />
              <div className="w-3 h-3 rounded-full bg-green-500 ml-1.5" />
            </div>
            <div className="flex bg-bg-input">
              <div className="w-12 bg-bg-surface border-r border-border-primary p-3 flex flex-col gap-2 items-end">
                {mockCode.map((_, i) => (
                  <span key={i} className="text-text-tertiary text-xs font-mono">
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className="flex-1 p-4 flex flex-col gap-2">
                {mockCode.map((line, i) => (
                  <span key={i} className="text-text-primary text-xs font-mono">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-primary" />

        {/* Analysis Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-accent-green text-sm font-bold">//</span>
            <span className="text-text-primary text-sm font-bold">detailed_analysis</span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="border border-border-primary rounded-lg p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      issue.severity === "critical"
                        ? "bg-accent-red"
                        : issue.severity === "warning"
                        ? "bg-accent-amber"
                        : "bg-accent-green"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      issue.severity === "critical"
                        ? "text-accent-red"
                        : issue.severity === "warning"
                        ? "text-accent-amber"
                        : "text-accent-green"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
                <h3 className="text-text-primary text-sm font-medium">{issue.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-primary" />

        {/* Suggested Fix */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-accent-green text-sm font-bold">//</span>
            <span className="text-text-primary text-sm font-bold">suggested_fix</span>
          </div>

          <div className="border border-border-primary rounded-lg overflow-hidden">
            <div className="h-10 bg-bg-surface border-b border-border-primary flex items-center px-4">
              <span className="text-text-secondary text-xs font-medium">
                your_code.ts → improved_code.ts
              </span>
            </div>
            <div className="bg-bg-input">
              {suggestedFix.map((line, i) => (
                <div
                  key={i}
                  className={`h-7 flex items-center px-4 ${
                    line.type === "remove"
                      ? "bg-red-500/10"
                      : line.type === "add"
                      ? "bg-green-500/10"
                      : ""
                  }`}
                >
                  <span
                    className={`w-5 text-xs font-mono ${
                      line.type === "remove"
                        ? "text-accent-red"
                        : line.type === "add"
                        ? "text-accent-green"
                        : "text-text-tertiary"
                    }`}
                  >
                    {line.type === "context" ? " " : line.type === "remove" ? "-" : "+"}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      line.type === "remove"
                        ? "text-accent-red"
                        : line.type === "add"
                        ? "text-accent-green"
                        : "text-text-secondary"
                    }`}
                  >
                    {line.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-accent-green text-sm hover:underline">
            &lt; roast another code
          </Link>
        </div>
      </div>
    </main>
  );
}
