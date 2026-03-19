import Link from "next/link";

const leaderboardData = [
	{
		id: "1",
		rank: 1,
		score: 1.2,
		code: [
			'eval(prompt("enter code"))',
			"document.write(response)",
			"// trust the user lol",
		],
		language: "javascript",
		lines: 3,
	},
	{
		id: "2",
		rank: 2,
		score: 1.8,
		code: [
			"if (x == true) { return true; }",
			"else if (x == false) { return false; }",
			"else { return !false; }",
		],
		language: "typescript",
		lines: 3,
	},
	{
		id: "3",
		rank: 3,
		score: 2.1,
		code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
		language: "sql",
		lines: 2,
	},
	{
		id: "4",
		rank: 4,
		score: 2.5,
		code: ["function loop() { loop(); }", "// stack overflow incoming"],
		language: "javascript",
		lines: 2,
	},
	{
		id: "5",
		rank: 5,
		score: 3.0,
		code: ["const x = 1;", "x = 2;", "// const is mutable apparently"],
		language: "javascript",
		lines: 3,
	},
];

export default function LeaderboardPage() {
	const avgScore = (
		leaderboardData.reduce((sum, entry) => sum + entry.score, 0) /
		leaderboardData.length
	).toFixed(1);

	return (
		<main className="flex flex-col items-center pt-10 px-10 pb-20 w-full">
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
						<span>{leaderboardData.length} submissions</span>
						<span>·</span>
						<span>{avgScore}/10</span>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					{leaderboardData.map((entry) => (
						<div
							key={entry.id}
							className="border border-border-primary rounded-lg overflow-hidden"
						>
							<div className="h-12 border-b border-border-primary flex items-center justify-between px-5">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1.5">
										<span className="text-text-tertiary text-sm">#</span>
										<span
											className={`text-sm font-bold ${entry.rank <= 3 ? "text-accent-amber" : "text-text-secondary"}`}
										>
											{entry.rank}
										</span>
									</div>
									<div className="flex items-center gap-1.5">
										<span className="text-text-tertiary text-xs">score:</span>
										<span className="text-accent-red text-sm font-bold">
											{entry.score}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-text-secondary text-xs">
										{entry.language}
									</span>
									<span className="text-text-tertiary text-xs">
										{entry.lines} lines
									</span>
								</div>
							</div>

							<div className="h-[120px] bg-bg-input flex">
								<div className="w-10 bg-bg-surface border-r border-border-primary p-2.5 pt-3 flex flex-col gap-1.5 items-end">
									{entry.code.map((_, i) => (
										<span
											key={i}
											className="text-text-tertiary text-xs font-mono"
										>
											{i + 1}
										</span>
									))}
								</div>
								<div className="flex-1 p-3.5 pt-3 flex flex-col gap-1.5">
									{entry.code.map((line, i) => (
										<span
											key={i}
											className="text-text-primary text-xs font-mono truncate"
										>
											{line}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-8 text-center">
					<Link href="/" className="text-accent-green text-sm hover:underline">
						&lt; submit your code
					</Link>
				</div>
			</div>
		</main>
	);
}
