"use client";

import { analyzeCode } from "@/lib/analysis";
import { useState } from "react";
import { ScoreRing } from "@/components/ui";

export default function RoastPage() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<{
    score: number;
    verdict: string;
    issues: Array<{
      id: number;
      type: 'error' | 'warning' | 'info';
      message: string;
      line: number;
    }>;
    suggestions: string[];
    language: string;
    lines: number;
    roastQuote: string;
    originalLines: string[];
    suggestedLines: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    try {
      // Use our new analysis service
      const result = await analyzeCode(code, "javascript"); // Default to javascript for now
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // If we have analysis data from code input (via URL state or context), use it
  // For now, we'll just show the form and let user analyze

  return (
    <main className="flex flex-col items-center pt-10 px-10 pb-20">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-accent-green text-[32px] font-bold">&gt;</span>
            <h1 className="text-text-primary text-[28px] font-bold">
              shame_leaderboard
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            // the most roasted code on the internet
          </p>
          <div className="flex items-center gap-2 text-text-tertiary text-xs">
            <span>2,847 submissions</span>
            <span>·</span>
            <span>avg score: 4.2/10</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Code Input Section */}
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
                  {Array.from({ length: Math.max(code.split('\n').length, 1) }, (_, i) => (
                    <span key={i} className="text-text-tertiary text-xs font-mono">
                      {i + 1}
                    </span>
                  ))}
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// paste your code here..."
                    className="flex-1 bg-transparent p-4 pt-4 text-text-primary text-xs font-mono resize-none focus:outline-none min-h-[320px]"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className={`bg-accent-green text-black px-6 py-2.5 rounded-md flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity ${loading ? "opacity-50" : ""}`}
            >
              {loading ? "Analyzing..." : "$ roast_my_code"}
            </button>
          </div>

          {/* Results Section */}
          {analysis && (
            <div className="flex flex-col gap-6">
              {/* Score Hero */}
              <div className="flex items-center gap-12">
                <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-border-primary" />
                  <div className="absolute inset-0 rounded-full border-4 border-accent-green" style={{ clipPath: "polygon(0 0, 35% 0, 35% 100%, 0 100%)" }} />
                  <div className="absolute inset-0 rounded-full border-4 border-accent-amber" style={{ clipPath: "polygon(35% 0, 100% 0, 100% 30%, 35% 30%)" }} />
                  <div className="text-center">
                    <span className="text-accent-amber text-[48px] font-bold">{analysis.score}</span>
                    <span className="text-text-tertiary text-base">/10</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${analysis.verdict === 'needs_serious_help' ? 'bg-accent-red' : analysis.verdict === 'needs_improvement' ? 'bg-accent-amber' : analysis.verdict === 'good' ? 'bg-accent-green' : 'bg-border-primary'}`} />
                    <span className={`text-accent-${analysis.verdict === 'needs_serious_help' ? 'red' : analysis.verdict === 'needs_improvement' ? 'amber' : analysis.verdict === 'good' ? 'green' : 'text-secondary'} text-sm font-medium`}>
                      verdict: {analysis.verdict}
                    </span>
                  </div>
                  <p className="text-text-primary text-xl leading-relaxed max-w-lg">
                    &quot;{analysis.roastQuote}&quot;
                  </p>
                  <div className="flex items-center gap-4 text-text-tertiary text-xs">
                    <span>lang: {analysis.language}</span>
                    <span>·</span>
                    <span>{analysis.lines} lines</span>
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
                      {Array.from({ length: Math.max(code.split('\n').length, 1) }, (_, i) => (
                        <span key={i} className="text-text-tertiary text-xs font-mono">
                          {i + 1}
                        </span>
                      ))}
                    </div>
                    <div className="flex-1 p-4 flex flex-col gap-2">
                      {analysis.originalLines.map((line, i) => (
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
                  {analysis.issues.map((issue, i) => (
                    <div
                      key={i}
                      className="border border-border-primary rounded-lg p-5 flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            issue.type === "error"
                              ? "bg-accent-red"
                              : issue.type === "warning"
                              ? "bg-accent-amber"
                              : "bg-accent-green"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            issue.type === "error"
                              ? "text-accent-red"
                              : issue.type === "warning"
                              ? "text-accent-amber"
                              : "text-accent-green"
                          }`}
                        >
                          {issue.type}
                        </span>
                      </div>
                      <h3 className="text-text-primary text-sm font-medium">{issue.message}</h3>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        line {issue.line}
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
                  <div className="bg-bg-input p-4">
                    <pre className="text-text-primary text-xs font-mono whitespace-pre-wrap">{analysis.suggestedLines.join('\n')}</pre>
                  </div>
                </div>
              </div>

              {/* Suggestions Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-accent-green text-sm font-bold">//</span>
                  <span className="text-text-primary text-sm font-bold">suggestions</span>
                </div>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-3 w-3 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-text-tertiary">{suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setCode("");
                    setAnalysis(null);
                  }}
                  className="bg-accent-green text-black px-6 py-2.5 rounded-md flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  $ roast another code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}