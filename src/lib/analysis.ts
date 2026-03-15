// Code analysis service for devroast
// This would normally integrate with actual linters, AST parsers, or AI services
// For now, we'll implement a more sophisticated mock that provides realistic feedback

export interface AnalysisResult {
  score: number; // 0-10
  verdict: string; // excellent, good, needs_improvement, needs_serious_help
  language: string;
  lines: number;
  roastQuote: string;
  issues: Issue[];
  suggestions: string[];
  originalLines: string[];
  suggestedLines: string[];
}

export interface Issue {
  id: number;
  type: 'error' | 'warning' | 'info';
  message: string;
  line: number;
}

/**
 * Analyze code and provide feedback
 * In a real implementation, this would call an API or use local analysis tools
 */
export async function analyzeCode(code: string, language: string): Promise<AnalysisResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
  
  // More sophisticated analysis based on actual code content
  const lines = code.split('\n').filter(line => line.trim() !== '');
  const lineCount = lines.length;
  
  // Analyze code characteristics
  const analysis = analyzeCodeCharacteristics(code, language, lines);
  
  // Determine score based on analysis
  let score = 10;
  
  // Deduct points for issues
  score -= analysis.issues.length * 1.5;
  score -= analysis.warnings * 0.5;
  
  // Bonus for good practices
  score += analysis.goodPractices * 0.5;
  
  // Clamp score between 0 and 10
  score = Math.max(0, Math.min(10, score));
  
  // Determine verdict
  let verdict: string;
  if (score >= 8.5) {
    verdict = "excellent";
  } else if (score >= 6.5) {
    verdict = "good";
  } else if (score >= 4.0) {
    verdict = "needs_improvement";
  } else {
    verdict = "needs_serious_help";
  }
  
  // Generate appropriate roast quote based on score and issues
  const roastQuote = generateRoastScore(verdict, analysis.issues, language);
  
  // Format issues for display
  const formattedIssues: Issue[] = analysis.issues.map((issue, index) => ({
    id: index + 1,
    type: issue.type,
    message: issue.message,
    line: issue.line || 1
  }));
  
  // Generate suggestions
  const suggestions = generateSuggestions(analysis, language);
  
  // Generate suggested improvements
  const suggestedLines = generateSuggestedLines(code, analysis, language);
  
  return {
    score: Math.round(score * 10) / 10, // Keep one decimal
    verdict,
    language,
    lines: lineCount,
    roastQuote,
    issues: formattedIssues,
    suggestions,
    originalLines: lines,
    suggestedLines
  };
}

/**
 * Analyze code characteristics to determine issues and good practices
 */
function analyzeCodeCharacteristics(code: string, language: string, lines: string[]) {
  const issues: any[] = [];
  let warnings = 0;
  let goodPractices = 0;
  
  // Join lines for pattern matching
  const fullCode = lines.join('\n');
  
  // Language-specific checks
  switch (language) {
    case 'javascript':
    case 'typescript':
      analyzeJSCode(fullCode, lines, issues, warnings, goodPractices);
      break;
    case 'python':
      analyzePythonCode(fullCode, lines, issues, warnings, goodPractices);
      break;
    case 'java':
      analyzeJavaCode(fullCode, lines, issues, warnings, goodPractices);
      break;
    case 'cpp':
    case 'c':
      analyzeCPPCode(fullCode, lines, issues, warnings, goodPractices);
      break;
    case 'go':
      analyzeGoCode(fullCode, lines, issues, warnings, goodPractices);
      break;
    case 'rust':
      analyzeRustCode(fullCode, lines, issues, warnings, goodPractices);
      break;
    default:
      analyzeGenericCode(fullCode, lines, issues, warnings, goodPractices);
  }
  
  return { issues, warnings, goodPractices };
}

/**
 * JavaScript/TypeScript specific analysis
 */
function analyzeJSCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common JS issues
  if (code.includes('var ')) {
    issues.push({ type: 'warning', message: "Consider using 'let' or 'const' instead of 'var'", line: findLineNumber(code, 'var ') });
  }
  
  if (code.includes('== ') && !code.includes('===')) {
    issues.push({ type: 'warning', message: "Use '===' instead of '==' for strict equality", line: findLineNumber(code, '== ') });
  }
  
  if (code.includes('eval(')) {
    issues.push({ type: 'error', message: "Avoid using eval() - it's dangerous and inefficient", line: findLineNumber(code, 'eval(') });
  }
  
  if (code.includes('setTimeout(') && !code.includes('clearTimeout(')) {
    warnings++;
  }
  
  // Check for good practices
  if (code.includes('=>')) {
    goodPractices++;
  }
  
  if (code.includes('import ') || code.includes('require(')) {
    goodPractices++;
  }
  
  if (code.includes('try {') || code.includes('catch (')) {
    goodPractices++;
  }
}

/**
 * Python specific analysis
 */
function analyzePythonCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common Python issues
  if (code.includes('except:')) {
    issues.push({ type: 'warning', message: "Avoid bare except: clauses", line: findLineNumber(code, 'except:') });
  }
  
  if (code.includes('print(') && !code.includes('# DEBUG')) {
    warnings++;
  }
  
  // Check for good practices
  if (code.includes('if __name__ == "__main__":')) {
    goodPractices++;
  }
  
  if (code.includes('def ') && code.includes('"""')) {
    goodPractices++;
  }
}

/**
 * Java specific analysis
 */
function analyzeJavaCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common Java issues
  if (code.includes('System.out.println') && !code.includes('// DEBUG')) {
    warnings++;
  }
  
  if (code.includes('catch (Exception e)')) {
    issues.push({ type: 'warning', message: "Avoid catching generic Exception", line: findLineNumber(code, 'catch (Exception e)') });
  }
  
  // Check for good practices
  if (code.includes('@Override')) {
    goodPractices++;
  }
  
  if (code.includes('final ') || code.includes('private ')) {
    goodPractices++;
  }
}

/**
 * C/C++ specific analysis
 */
function analyzeCPPCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common C/C++ issues
  if (code.includes('gets(') || code.includes('strcpy(')) {
    issues.push({ type: 'error', message: "Use safer alternatives to gets()/strcpy() to prevent buffer overflows", line: findLineNumber(code, 'gets(') !== -1 ? code.indexOf('gets(') : code.indexOf('strcpy(') });
  }
  
  if (code.includes('malloc(') && !code.includes('free(')) {
    issues.push({ type: 'warning', message: "Remember to free() memory allocated with malloc()", line: findLineNumber(code, 'malloc(') });
  }
  
  // Check for good practices
  if (code.includes('const ') || code.includes('constexpr')) {
    goodPractices++;
  }
  
  if (code.includes('#include <iostream>') && code.includes('using namespace std;')) {
    warnings++;
  }
}

/**
 * Go specific analysis
 */
function analyzeGoCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common Go issues
  if (code.includes('fmt.Print') && !code.includes('# DEBUG')) {
    warnings++;
  }
  
  if (code.includes('if err != nil') && !code.includes('return')) {
    issues.push({ type: 'warning', message: "Handle errors properly instead of just checking them", line: findLineNumber(code, 'if err != nil') });
  }
  
  // Check for good practices
  if (code.includes('defer ') && code.includes('Close()')) {
    goodPractices++;
  }
  
  if (code.includes('goroutine') || code.includes('go ')) {
    goodPractices++;
  }
}

/**
 * Rust specific analysis
 */
function analyzeRustCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common Rust issues
  if (code.includes('unwrap()') && !code.includes('expect(')) {
    issues.push({ type: 'warning', message: "Consider using expect() with a message instead of unwrap()", line: findLineNumber(code, 'unwrap()') });
  }
  
  if (code.includes('.unwrap()')) {
    warnings++;
  }
  
  // Check for good practices
  if (code.includes('match ') && code.includes('=>')) {
    goodPractices++;
  }
  
  if (code.includes('Option<') || code.includes('Result<')) {
    goodPractices++;
  }
}

/**
 * Generic code analysis
 */
function analyzeGenericCode(code: string, lines: string[], issues: any[], warnings: number, goodPractices: number) {
  // Check for common issues in any language
  const todoCount = (code.match(/TODO/g) || []).length;
  if (todoCount > 0) {
    warnings += todoCount;
  }
  
  const fixmeCount = (code.match(/FIXME/g) || []).length;
  if (fixmeCount > 0) {
    issues.push({ type: 'warning', message: `Found ${fixmeCount} FIXME comment(s) that need attention`, line: 1 });
  }
  
  // Check for good practices
  const commentLines = lines.filter(line => line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('/*'));
  if (commentLines.length > 0) {
    goodPractices += Math.min(commentLines.length / 5, 3); // Cap bonus
  }
  
  // Check for consistent indentation (simple check)
  const indentedLines = lines.filter(line => line.startsWith('  ') || line.startsWith('\t'));
  if (indentedLines.length > lines.length * 0.5) {
    goodPractices++;
  }
}

/**
 * Find line number for a pattern in code
 */
function findLineNumber(code: string, pattern: string): number {
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(pattern)) {
      return i + 1;
    }
  }
  return 1;
}

/**
 * Generate roast quote based on verdict and issues
 */
function generateRoastScore(verdict: string, issues: any[], language: string): string {
  const excellentQuotes = [
    "this code is suspiciously clean... did you copy it from stack overflow?",
    "i'd hire you just based on this code alone",
    "this is the kind of code that makes me believe in good programmers",
    "clean, efficient, and actually readable - what sorcery is this?"
  ];
  
  const goodQuotes = [
    "this code works but it's giving me serious maintenance nightmares",
    "not terrible, but i've seen better code in bootcamps",
    "it compiles, which is more than i can say for most of your peers",
    "functional but forgettable - like elevator music"
  ];
  
  const needsImprovementQuotes = [
    "i've seen better code written by someone learning to type with their elbows",
    "this approach would make a structured programmer weep into their keyboard",
    "did you write this during a power surge or just dislike yourself?",
    "the fact that this runs at all is a testament to modern error handling"
  ];
  
  const needsSeriousHelpQuotes = [
    "this isn't code, it's a cry for help in binary format",
    "if bugs were currency, you'd be a billionaire with this submission",
    "i suspect this code was written by recursively copying stackoverflow answers",
    "removing lines randomly would probably improve this"
  ];
  
  const quotesMap: Record<string, string[]> = {
    excellent: excellentQuotes,
    good: goodQuotes,
    needs_improvement: needsImprovementQuotes,
    needs_serious_help: needsSeriousHelpQuotes
  };
  
  const quotes = quotesMap[verdict] || goodQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/**
 * Generate suggestions based on analysis
 */
function generateSuggestions(analysis: any, language: string): string[] {
  const suggestions: string[] = [];
  
  // Add language-specific suggestions
  switch (language) {
    case 'javascript':
    case 'typescript':
      suggestions.push("Consider using TypeScript for better type safety");
      suggestions.push("Use ESLint and Prettier for consistent code formatting");
      suggestions.push("Add JSDoc comments for complex functions");
      break;
    case 'python':
      suggestions.push("Follow PEP 8 style guidelines");
      suggestions.push("Consider using type hints for better code clarity");
      suggestions.push("Use virtual environments for dependency management");
      break;
    case 'java':
      suggestions.push("Consider using Lombok to reduce boilerplate code");
      suggestions.push("Use Java Records for immutable data classes");
      suggestions.push("Apply SOLID principles for better architecture");
      break;
    case 'cpp':
    case 'c':
      suggestions.push("Consider using smart pointers instead of raw pointers");
      suggestions.push("Use RAII principles for resource management");
      suggestions.push("Enable compiler warnings and treat them as errors");
      break;
    case 'go':
      suggestions.push("Use go fmt for consistent code formatting");
      suggestions.push("Leverage Go's built-in testing framework");
      suggestions.push("Consider using interfaces for better abstraction");
      break;
    case 'rust':
      suggestions.push("Use Clippy for additional linting");
      suggestions.push("Leverage Cargo's built-in testing and benchmarking");
      suggestions.push("Consider using async/await for better async code");
      break;
    default:
      suggestions.push("Add meaningful comments to explain complex logic");
      suggestions.push("Follow your language's style guide");
      suggestions.push("Write unit tests for critical functionality");
  }
  
  // Add issue-based suggestions
  if (analysis.issues.some((issue: any) => issue.type === 'error')) {
    suggestions.push("Fix critical errors before addressing warnings");
  }
  
  if (analysis.warnings > 3) {
    suggestions.push("Address warnings to improve code quality and prevent future bugs");
  }
  
  // Limit suggestions to 4
  return suggestions.slice(0, 4);
}

/**
 * Generate suggested code improvements
 */
function generateSuggestedLines(originalCode: string, analysis: any, language: string): string[] {
  const lines = originalCode.split('\n');
  const suggestedLines = [...lines]; // Copy original
  
  // Apply some basic improvements based on issues
  for (const issue of analysis.issues) {
    if (issue.line && issue.line <= lines.length) {
      const lineIndex = issue.line - 1;
      const originalLine = lines[lineIndex];
      
      // Apply fixes based on issue type and message
      let suggestedLine = originalLine;
      
      if (issue.message.includes("== ") && !issue.message.includes("===")) {
        suggestedLine = originalLine.replace(/==/g, "===");
      } else if (issue.message.includes("var ")) {
        suggestedLine = originalLine.replace(/var\s+/g, "let ");
      } else if (issue.message.includes("missing semicolon")) {
        suggestedLine = originalLine.trimEnd() + ";";
      } else if (issue.message.includes("eval(")) {
        suggestedLine = "// " + originalLine + "  // Avoid eval() - security risk";
      }
      
      suggestedLines[lineIndex] = suggestedLine;
    }
  }
  
  return suggestedLines;
}