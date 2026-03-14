import { CodeInput } from "@/components/CodeInput";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-10 px-10 pb-0">
      <div className="flex flex-col items-center gap-8 mb-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-accent-green text-[36px] font-bold">$</span>
            <h1 className="text-text-primary text-[36px] font-bold">
              paste your code. get roasted.
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            // drop your code below and we&apos;ll rate it — brutally honest or full roast mode
          </p>
        </div>

        <CodeInput />
      </div>

      <div className="h-[60px]" />

      <LeaderboardPreview />

      <div className="h-[60px]" />
    </main>
  );
}
