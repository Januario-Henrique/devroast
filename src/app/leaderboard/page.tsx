import Link from "next/link";

const leaderboardData = [
  {
    rank: 1,
    score: "1.2",
    code: ["eval(prompt(\"enter code\"))", "document.write(response)", "// trust the user lol"],
    lang: "javascript",
    lines: 3,
  },
  {
    rank: 2,
    score: "1.8",
    code: ["if (x == true) { return true; }", "else if (x == false) { return false; }", "else { return !false; }"],
    lang: "typescript",
    lines: 3,
  },
  {
    rank: 3,
    score: "2.1",
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    lang: "sql",
    lines: 2,
  },
  {
    rank: 4,
    score: "2.3",
    code: ["catch (e) {", "  // ignore", "}"],
    lang: "java",
    lines: 3,
  },
  {
    rank: 5,
    score: "2.5",
    code: ["const sleep = (ms) =>", "  new Date(Date.now() + ms)", "while (new Date() < end) {}"],
    lang: "javascript",
    lines: 3,
  },
];

export default function LeaderboardPage() {
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

        <div className="flex flex-col gap-5">
          {leaderboardData.map((entry) => (
            <div
              key={entry.rank}
              className="border border-border-primary rounded-lg overflow-hidden"
            >
              <div className="h-12 border-b border-border-primary flex items-center justify-between px-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-tertiary text-sm">#</span>
                    <span className={`text-sm font-bold ${entry.rank <= 3 ? "text-accent-amber" : "text-text-secondary"}`}>
                      {entry.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-tertiary text-xs">score:</span>
                    <span className="text-accent-red text-sm font-bold">{entry.score}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-secondary text-xs">{entry.lang}</span>
                  <span className="text-text-tertiary text-xs">{entry.lines} lines</span>
                </div>
              </div>

              <div className="h-[120px] bg-bg-input flex">
                <div className="w-10 bg-bg-surface border-r border-border-primary p-2.5 pt-3 flex flex-col gap-1.5 items-end">
                  {entry.code.map((_, i) => (
                    <span key={i} className="text-text-tertiary text-xs font-mono">
                      {i + 1}
                    </span>
                  ))}
                </div>
                <div className="flex-1 p-3.5 pt-3 flex flex-col gap-1.5">
                  {entry.code.map((line, i) => (
                    <span key={i} className="text-text-primary text-xs font-mono truncate">
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
