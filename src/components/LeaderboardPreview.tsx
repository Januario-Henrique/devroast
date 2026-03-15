import Link from "next/link";

const mockLeaderboard = [
  {
    rank: 1,
    score: "1.2",
    code: ["eval(prompt(\"enter code\"))", "document.write(response)", "// trust the user lol"],
    lang: "javascript",
  },
  {
    rank: 2,
    score: "1.8",
    code: ["if (x == true) { return true; }", "else if (x == false) { return false; }", "else { return !false; }"],
    lang: "typescript",
  },
  {
    rank: 3,
    score: "2.1",
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    lang: "sql",
  },
];

export function LeaderboardPreview() {
  return (
    <div className="max-w-container-lg w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-accent-green text-sm font-bold">//</span>
          <span className="text-text-primary text-sm font-bold">shame_leaderboard</span>
        </div>
        <Link
          href="/leaderboard"
          className="border border-border-primary px-3 py-1.5 rounded text-xs text-text-secondary flex items-center gap-1 hover:border-text-secondary transition-colors"
        >
          $ view_all &gt;&gt;
        </Link>
      </div>

      <p className="text-text-tertiary text-sm mb-6">
        // the worst code on the internet, ranked by shame
      </p>

      <div className="border border-border-primary rounded-lg overflow-hidden">
        <div className="h-10 bg-bg-surface border-b border-border-primary flex items-center px-5">
          <span className="w-12 text-text-tertiary text-xs font-medium">#</span>
          <span className="w-16 text-text-tertiary text-xs font-medium">score</span>
          <span className="flex-1 text-text-tertiary text-xs font-medium">code</span>
          <span className="w-24 text-text-tertiary text-xs font-medium">lang</span>
        </div>

        {mockLeaderboard.map((entry, idx) => (
          <div
            key={entry.rank}
            className={`flex items-center px-5 py-4 ${
              idx !== mockLeaderboard.length - 1 ? "border-b border-border-primary" : ""
            }`}
          >
            <span className={`w-12 text-xs ${entry.rank === 1 ? "text-accent-amber" : "text-text-secondary"}`}>
              {entry.rank}
            </span>
            <span className="w-16 text-accent-red text-xs font-bold">{entry.score}</span>
            <div className="flex-1 flex flex-col gap-0.5">
              {entry.code.map((line, i) => (
                <span key={i} className="text-text-primary text-xs font-mono truncate max-w-md">
                  {line}
                </span>
              ))}
            </div>
            <span className="w-24 text-text-secondary text-xs">{entry.lang}</span>
          </div>
        ))}
      </div>

      <p className="text-text-tertiary text-xs text-center mt-4">
        showing top 3 of 2,847 · view full leaderboard &gt;&gt;
      </p>
    </div>
  );
}
