import { ScoreRing } from "@/components/ui";

export default function OGImage() {
  // In a real app, these would come from query params or previous submission
  const score = "3.5";
  const verdict = "needs_serious_help";
  const language = "javascript";
  const lines = 7;
  const roastQuote = "this code was written during a power outage...";

  return (
    <div className="flex items-center justify-center w-full h-full bg-bg-page p-8">
      <div className="flex flex-col items-center justify-center w-full max-w-[1200px] h-[630px] border border-border-primary">
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-accent-green text-[24px] font-bold">&gt;</span>
            <span className="text-text-primary text-[20px] font-bold">devroast</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ScoreRing score={score} className="w-[160px] h-[160px]" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-accent-red" />
            <span className="text-accent-red text-[20px]">{verdict}</span>
          </div>
          
          <span className="text-text-tertiary text-[16px]">
            lang: {language} · {lines} lines
          </span>
          
          <p className="text-text-primary text-[22px] text-center max-w-[400px]">
            “{roastQuote}”
          </p>
        </div>
      </div>
    </div>
  );
}