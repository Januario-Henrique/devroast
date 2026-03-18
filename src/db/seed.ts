import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { faker } from "@faker-js/faker";
import { roasts, analysisItems, verdictEnum, severityEnum } from "./schema";

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const LANGUAGES = [
	"javascript",
	"typescript",
	"python",
	"go",
	"rust",
	"java",
	"ruby",
	"php",
];

const CODE_TEMPLATES = [
	`function calculate(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].value;
  }
  return total;
}`,
	`const data = fetch('/api/users')
  .then(res => res.json())
  .then(users => users.map(u => u.name))`,
	`def process_items(items):
    result = []
    for item in items:
        if item['active']:
            result.append(item['value'])
    return result`,
	`async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}`,
	`func process(items []Item) []int {
    var result []int
    for _, item := range items {
        if item.Active {
            result = append(result, item.Value)
        }
    }
    return result
}`,
	`class DataProcessor {
  public process(items: any[]): number[] {
    return items
      .filter(item => item.active)
      .map(item => item.value);
  }
}`,
];

const CRITICAL_ISSUES = [
	"using eval() - dangerous security vulnerability",
	"using document.write() - bad practice",
	"SQL injection vulnerability detected",
	"hardcoded credentials found",
	"no input validation on user data",
];

const WARNING_ISSUES = [
	"using var instead of const/let",
	"using loose equality (==) instead of ===",
	"no error handling in async function",
	"naming convention violation",
	"missing JSDoc comments",
];

const GOOD_ISSUES = [
	"using const for immutable variables",
	"using arrow functions",
	"using async/await instead of .then()",
	"proper error handling with try/catch",
	"using strict equality (===)",
];

async function seed() {
	console.log("🌱 Starting seed...");

	await db.delete(analysisItems);
	await db.delete(roasts);

	console.log("📝 Inserting 100 roasts...");

	for (let i = 0; i < 100; i++) {
		const language = faker.helpers.arrayElement(LANGUAGES);
		const code = faker.helpers.arrayElement(CODE_TEMPLATES);
		const lineCount = faker.number.int({ min: 3, max: 20 });
		const roastMode = faker.datatype.boolean();
		const score = faker.number.float({ min: 0, max: 10, fractionDigits: 1 });
		const verdict = getVerdict(score);
		const roastQuote = getRoastQuote(score);
		const suggestedFix = getSuggestedFix(score);

		const [roast] = await db
			.insert(roasts)
			.values({
				code,
				language,
				lineCount,
				roastMode,
				score,
				verdict,
				roastQuote,
				suggestedFix,
			})
			.returning();

		const itemCount = faker.number.int({ min: 2, max: 5 });
		const items = [];

		items.push({
			roastId: roast.id,
			severity: faker.helpers.arrayElement(["critical", "warning", "good"] as const),
			title: faker.helpers.arrayElement([...CRITICAL_ISSUES, ...WARNING_ISSUES, ...GOOD_ISSUES]),
			description: faker.lorem.sentence(),
			order: items.length + 1,
		});

		if (score < 5) {
			items.push({
				roastId: roast.id,
				severity: "critical" as const,
				title: faker.helpers.arrayElement(CRITICAL_ISSUES),
				description: faker.lorem.sentence(),
				order: items.length + 1,
			});
		}

		if (score < 7) {
			items.push({
				roastId: roast.id,
				severity: "warning" as const,
				title: faker.helpers.arrayElement(WARNING_ISSUES),
				description: faker.lorem.sentence(),
				order: items.length + 1,
			});
		}

		items.push({
			roastId: roast.id,
			severity: "good" as const,
			title: faker.helpers.arrayElement(GOOD_ISSUES),
			description: faker.lorem.sentence(),
			order: items.length + 1,
		});

		await db.insert(analysisItems).values(items);

		if ((i + 1) % 10 === 0) {
			console.log(`  ✓ ${i + 1}/100 roasts inserted`);
		}
	}

	console.log("✅ Seed completed!");
	await pool.end();
}

function getVerdict(score: number): (typeof verdictEnum.enumValues)[number] {
	if (score >= 8) return "exceptional";
	if (score >= 6) return "solid_work";
	if (score >= 4) return "rough_around_edges";
	return "needs_serious_help";
}

function getRoastQuote(score: number): string {
	if (score >= 8) return faker.helpers.arrayElement([
		"Wow, this code is actually decent... did you copy it from Stack Overflow?",
		"I'm impressed. You might actually know what you're doing.",
		"This is... surprisingly good. My compliments to your code.",
	]);
	if (score >= 6) return faker.helpers.arrayElement([
		"Not bad, but I've seen worse. That's not a compliment.",
		"This code is like a microwave burrito - it works, but barely.",
		"You're on the right track, keep practicing.",
	]);
	if (score >= 4) return faker.helpers.arrayElement([
		"This code looks like it was written during a power outage in 2005.",
		"I have seen better code in a kindergarten drawing.",
		"Did you write this with your eyes closed?",
	]);
	return faker.helpers.arrayElement([
		"This code makes me question your career choices.",
		"I've seen more organized chaos in a dumpster fire.",
		"Please, for the love of all that is holy, rewrite this.",
	]);
}

function getSuggestedFix(score: number): string {
	if (score >= 8) {
		return "Consider adding more documentation and tests to make this code even better.";
	}
	if (score >= 6) {
		return "Review naming conventions and add proper error handling for production readiness.";
	}
	if (score >= 4) {
		return "Refactor to use modern patterns: const/let instead of var, arrow functions, array methods like map/filter/reduce.";
	}
	return "Complete rewrite recommended. Use proper TypeScript types, add error handling, remove all anti-patterns.";
}

seed().catch((err) => {
	console.error("❌ Seed failed:", err);
	process.exit(1);
});
