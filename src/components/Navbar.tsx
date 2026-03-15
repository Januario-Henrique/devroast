import Link from "next/link";
import { useTheme } from "@/lib/theme";
import { ToggleSwitch } from "@/components/ui";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-14 border-b border-border-primary bg-bg-page px-10 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-accent-green text-xl font-bold">&gt;</span>
        <span className="text-text-primary text-lg font-medium">devroast</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/leaderboard" className="text-text-secondary text-sm font-normal">
          leaderboard
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary text-sm font-normal">theme:</span>
          <ToggleSwitch
            labelOn="dark"
            labelOff="light"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
        </div>
      </div>
    </nav>
  );
}
