import Link from "next/link";

export function Navbar() {
  return (
    <nav className="h-14 border-b border-border-primary bg-bg-page px-10 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-accent-green text-xl font-bold">&gt;</span>
        <span className="text-text-primary text-lg font-medium">devroast</span>
      </Link>
      <Link href="/leaderboard" className="text-text-secondary text-sm font-normal">
        leaderboard
      </Link>
    </nav>
  );
}
