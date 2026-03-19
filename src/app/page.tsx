"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { MetricsClient } from "@/components/MetricsClient";
import {
	CodeWindow,
	CodeWindowContent,
	CodeWindowHeader,
	IssueCard,
	IssueCardDescription,
	IssueCardSeverity,
	IssueCardTitle,
	Section,
	SectionHeader,
	SectionLabel,
	SectionTitle,
} from "@/components/ui";
import { analyzeCode } from "@/lib/analysis/analyzeCode";

interface AnalysisResult {
	score: number;
	verdict: string;
	issues: Array<{
		severity: "critical" | "warning" | "good";
		title: string;
		description: string;
	}>;
	suggestedFix: string;
	language: string;
	lines: number;
}

export default function Home() {
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState<string | null>(null);
	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [showResults, setShowResults] = useState(false);

	const handleAnalyze = async () => {
		if (!code.trim()) return;

		setLoading(true);
		try {
			const result = analyzeCode(code, language ?? undefined);
			setAnalysis(result);
			setShowResults(true);
		} catch (error) {
			console.error("Analysis failed:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex flex-col items-center pt-10 px-10 pb-0">
			{showResults && analysis ? (
				<div className="w-full max-w-4xl">
					<div className="flex flex-col gap-4 mb-10">
						<div className="flex items-center gap-3">
							<span className="text-accent-green text-[32px] font-bold">
								&gt;
							</span>
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

					<Section>
						{/* Score Hero */}
						<div className="flex items-center gap-12">
							<div className="relative w-size-score-ring-lg h-size-score-ring-lg flex items-center justify-center">
								<div className="absolute inset-0 rounded-full border-4 border-border-primary" />
								<div
									className="absolute inset-0 rounded-full border-4 border-accent-green"
									style={{ clipPath: "polygon(0 0, 35% 0, 35% 100%, 0 100%)" }}
								/>
								<div
									className="absolute inset-0 rounded-full border-4 border-accent-amber"
									style={{
										clipPath: "polygon(35% 0, 100% 0, 100% 30%, 35% 30%)",
									}}
								/>
								<div className="text-center">
									<span className="text-accent-amber text-[48px] font-bold">
										{analysis.score}
									</span>
									<span className="text-text-tertiary text-base">/10</span>
								</div>
							</div>

							<div className="flex-1 flex flex-col gap-4">
								<div className="flex items-center gap-2">
									<div
										className={`w-2 h-2 rounded-full ${analysis.verdict === "needs_serious_help" ? "bg-accent-red" : analysis.verdict === "needs_improvement" ? "bg-accent-amber" : analysis.verdict === "good" ? "bg-accent-green" : "bg-border-primary"}`}
									/>
									<span
										className={`text-accent-${getVerdictColor(analysis.verdict)} text-sm font-medium`}
									>
										verdict: {analysis.verdict}
									</span>
								</div>
								<p className="text-text-primary text-xl leading-relaxed max-w-lg">
									&quot;{getRoastQuote(analysis.score)}&quot;
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
						<Section>
							<SectionHeader>
								<SectionTitle>{`//`}</SectionTitle>
								<SectionLabel>your_submission</SectionLabel>
							</SectionHeader>

							<CodeWindow>
								<CodeWindowHeader />
								<CodeWindowContent code={code.split("\n")} />
							</CodeWindow>
						</Section>

						{/* Divider */}
						<div className="h-px bg-border-primary" />

						{/* Analysis Section */}
						<Section>
							<SectionHeader>
								<SectionTitle>{`//`}</SectionTitle>
								<SectionLabel>detailed_analysis</SectionLabel>
							</SectionHeader>

							<div className="grid grid-cols-2 gap-5">
								{analysis.issues.map((issue, i) => (
									<IssueCard key={i}>
										<IssueCardSeverity severity={issue.severity} />
										<IssueCardTitle>{issue.title}</IssueCardTitle>
										<IssueCardDescription>
											{issue.description}
										</IssueCardDescription>
									</IssueCard>
								))}
							</div>
						</Section>

						{/* Divider */}
						<div className="h-px bg-border-primary" />

						{/* Suggested Fix */}
						<Section>
							<SectionHeader>
								<SectionTitle>{`//`}</SectionTitle>
								<SectionLabel>suggested_fix</SectionLabel>
							</SectionHeader>

							<CodeWindow>
								<CodeWindowHeader>
									<span className="text-text-secondary text-xs font-medium">
										your_code.ts → improved_code.ts
									</span>
								</CodeWindowHeader>
								<CodeWindowContent>
									<pre className="text-text-primary text-xs font-mono whitespace-pre-wrap">
										{analysis.suggestedFix}
									</pre>
								</CodeWindowContent>
							</CodeWindow>

							<div className="text-center mt-4">
								<button
									onClick={() => {
										setCode("");
										setAnalysis(null);
										setShowResults(false);
									}}
									className="bg-accent-green text-black px-6 py-2.5 rounded-md flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity"
								>
									$ roast another code
								</button>
							</div>
						</Section>
					</Section>
				</div>
			) : (
				<div className="w-full max-w-4xl">
					<div className="flex flex-col items-center gap-8 mb-8">
						<div className="flex flex-col items-center gap-3">
							<div className="flex items-center gap-3">
								<span className="text-accent-green text-[36px] font-bold">
									$
								</span>
								<h1 className="text-text-primary text-[36px] font-bold">
									paste your code. get roasted.
								</h1>
							</div>
							<p className="text-text-secondary text-sm">
								// drop your code below and we&apos;ll rate it — brutally honest
								or full roast mode
							</p>
						</div>

						<CodeEditor
							value={code}
							onChange={setCode}
							language={language}
							onLanguageChange={setLanguage}
						/>

						<div className="mt-4 flex items-center justify-end">
							<button
								onClick={handleAnalyze}
								disabled={loading || !code.trim()}
								className={`bg-accent-green text-black px-6 py-2.5 rounded-md flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity ${loading ? "opacity-50" : ""}`}
							>
								$ roast_my_code
							</button>
						</div>

						<MetricsClient />
					</div>

					<div className="h-[60px]" />

					<LeaderboardPreview />

					<div className="h-[60px]" />
				</div>
			)}
		</main>
	);
}

function getRoastQuote(score: number): string {
	if (score >= 8) {
		return "this code is surprisingly decent... did you steal it from github?";
	} else if (score >= 6) {
		return "this code is... adequate. like a microwave burrito.";
	} else if (score >= 4) {
		return "this code looks like it was written during a power outage... in 2005.";
	} else {
		return "this code makes me question your life choices.";
	}
}

function getVerdictColor(verdict: string): string {
	switch (verdict) {
		case "needs_serious_help":
			return "red";
		case "needs_improvement":
			return "amber";
		case "good":
			return "green";
		case "excellent":
			return "green";
		default:
			return "text-secondary";
	}
}
