// src/lib/leaderboard.ts
// In-memory store for leaderboard entries
// In a real app, this would be replaced with a database

interface LeaderboardEntry {
  id: string;
  rank: number;
  score: number;
  code: string[];
  language: string;
  lines: number;
  timestamp: number;
}

let leaderboardEntries: LeaderboardEntry[] = [];

// Initialize with some mock data if empty
if (leaderboardEntries.length === 0) {
  leaderboardEntries = [
    {
      id: "1",
      rank: 1,
      score: 1.2,
      code: ["eval(prompt(\"enter code\"))", "document.write(response)", "// trust the user lol"],
      language: "javascript",
      lines: 3,
      timestamp: Date.now() - 1000000,
    },
    {
      id: "2",
      rank: 2,
      score: 1.8,
      code: ["if (x == true) { return true; }", "else if (x == false) { return false; }", "else { return !false; }"],
      language: "typescript",
      lines: 3,
      timestamp: Date.now() - 2000000,
    },
    {
      id: "3",
      rank: 3,
      score: 2.1,
      code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
      language: "sql",
      lines: 2,
      timestamp: Date.now() - 3000000,
    },
  ];
}

// Sort by score ascending (lower score is worse)
leaderboardEntries.sort((a, b) => a.score - b.score);

// Update ranks
leaderboardEntries.forEach((entry, index) => {
  entry.rank = index + 1;
});

export function getLeaderboardEntries(): LeaderboardEntry[] {
  return [...leaderboardEntries]; // Return a copy
}

export function addLeaderboardEntry(entry: Omit<LeaderboardEntry, "id" | "timestamp">): void {
  const newEntry = {
    ...entry,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    // Temporary rank, will be updated after sorting
    rank: 0,
  };

  leaderboardEntries.push(newEntry);
  // Re-sort and re-rank
  leaderboardEntries.sort((a, b) => a.score - b.score);
  leaderboardEntries.forEach((entry, index) => {
    entry.rank = index + 1;
  });
}