// src/lib/analysis/analyzeCode.ts
export interface AnalysisResult {
	score: number; // 0-10
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

export function analyzeCode(
	code: string,
	language: string = "javascript",
): AnalysisResult {
	// This is a simplified analysis. In a real app, you would use a proper parser or AST.
	const lines = code.split("\n").filter((line) => line.trim() !== "").length;

	// Initialize analysis
	const issues: AnalysisResult["issues"] = [];
	let score = 10; // Start with perfect score and deduct

	// Check for common issues
	if (code.includes("var ")) {
		issues.push({
			severity: "critical",
			title: "using var instead of const/let",
			description:
				"var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
		});
		score -= 2;
	}

	if (code.includes("eval(")) {
		issues.push({
			severity: "critical",
			title: "using eval()",
			description:
				"eval() is dangerous and can lead to security vulnerabilities. Avoid using eval().",
		});
		score -= 3;
	}

	if (code.includes("document.write(")) {
		issues.push({
			severity: "critical",
			title: "using document.write()",
			description:
				"document.write() can overwrite the entire document and is considered bad practice.",
		});
		score -= 2;
	}

	if (code.includes("== ") && !code.includes("===")) {
		issues.push({
			severity: "warning",
			title: "using loose equality (==)",
			description:
				"Loose equality can lead to unexpected results due to type coercion. Use strict equality (===) instead.",
		});
		score -= 1.5;
	}

	if (
		code.includes("for (var ") ||
		code.includes("for (let ") ||
		code.includes("for (const ")
	) {
		// Check if it's a simple loop that could be replaced with array methods
		if (code.includes(".push(") || code.includes("total =")) {
			issues.push({
				severity: "warning",
				title: "imperative loop pattern",
				description:
					"for loops are verbose and error-prone. Consider using .reduce(), .map(), or .filter() for cleaner, functional transformations.",
			});
			score -= 1;
		}
	}

	// Check for good practices
	if (code.includes("const ") && !code.includes("var ")) {
		issues.push({
			severity: "good",
			title: "using const for declarations",
			description:
				"Using const for variables that are not reassigned helps prevent accidental reassignment and makes code more predictable.",
		});
		score += 0.5; // Bonus for good practice
	}

	if (code.includes("=>")) {
		issues.push({
			severity: "good",
			title: "using arrow functions",
			description:
				"Arrow functions provide a more concise syntax and lexically bind the this value.",
		});
		score += 0.5;
	}

	// Ensure score is between 0 and 10
	score = Math.max(0, Math.min(10, score));

	// Determine verdict based on score
	let verdict: string;
	if (score >= 8) {
		verdict = "excellent";
	} else if (score >= 6) {
		verdict = "good";
	} else if (score >= 4) {
		verdict = "needs_improvement";
	} else {
		verdict = "needs_serious_help";
	}

	// Generate a simple suggested fix (in a real app, this would be more sophisticated)
	let suggestedFix = "";
	if (
		issues.some((issue) => issue.title === "using var instead of const/let")
	) {
		suggestedFix =
			"Replace var with const or let. Use const for values that won't change, let for values that will change.";
	} else if (issues.some((issue) => issue.title === "using eval()")) {
		suggestedFix =
			"Remove the eval() call and use a safer alternative like JSON.parse() for parsing JSON or direct object property access.";
	} else {
		suggestedFix =
			"Consider using modern JavaScript features like const/let, arrow functions, and array methods (.map, .reduce, .filter) to improve your code.";
	}

	return {
		score: Number(score.toFixed(1)),
		verdict,
		issues,
		suggestedFix,
		language,
		lines,
	};
}
