"use client";

import { useState } from "react";

export function CodeInput({
	code,
	onCodeChange,
	onAnalyze,
	loading,
}: {
	code: string;
	onCodeChange: (code: string) => void;
	onAnalyze: () => Promise<void> | void;
	loading: boolean;
}) {
	const [roastMode, setRoastMode] = useState(true);
	const [localCode, setLocalCode] = useState(code);

	const lines = localCode.split("\n");
	const lineCount = Math.max(lines.length, 16);

	const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newCode = e.target.value;
		setLocalCode(newCode);
		onCodeChange(newCode);
	};

	return (
		<div className="max-w-container-md w-full">
			<div className="border border-border-primary bg-bg-input rounded-t-lg overflow-hidden">
				<div className="h-10 border-b border-border-primary flex items-center px-4 gap-2">
					<div className="w-3 h-3 rounded-full bg-red-500" />
					<div className="w-3 h-3 rounded-full bg-amber-500" />
					<div className="w-3 h-3 rounded-full bg-green-500" />
				</div>
				<div className="flex">
					<div className="w-12 bg-bg-surface border-r border-border-primary p-3 pt-4 flex flex-col gap-2 items-end">
						{Array.from({ length: lineCount }, (_, i) => (
							<span key={i} className="text-text-tertiary text-xs font-mono">
								{i + 1}
							</span>
						))}
					</div>
					<textarea
						value={localCode}
						onChange={handleCodeChange}
						placeholder="// paste your code here..."
						className="flex-1 bg-transparent p-4 pt-4 text-text-primary text-xs font-mono resize-none focus:outline-none min-h-[320px]"
						spellCheck={false}
					/>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<button
						onClick={() => setRoastMode(!roastMode)}
						className="flex items-center gap-2.5"
					>
						<div
							className={`w-10 h-[22px] rounded-full p-[3px] flex items-center ${
								roastMode
									? "bg-accent-green justify-end"
									: "bg-border-primary justify-start"
							}`}
						>
							<div className="w-4 h-4 rounded-full bg-black" />
						</div>
						<span
							className={`text-sm ${roastMode ? "text-accent-green" : "text-text-secondary"}`}
						>
							roast mode
						</span>
					</button>
					<span className="text-text-tertiary text-xs">
						{roastMode
							? "// maximum sarcasm enabled"
							: "// constructive feedback only"}
					</span>
				</div>

				<button
					onClick={onAnalyze}
					disabled={loading || !localCode.trim()}
					className={`bg-accent-green text-black px-6 py-2.5 rounded-md flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity ${loading ? "opacity-50" : ""}`}
				>
					$ roast_my_code
				</button>
			</div>

			<div className="mt-8 flex items-center justify-center gap-6 text-text-tertiary text-xs">
				<span>2,847 codes roasted</span>
				<span>·</span>
				<span>avg score: 4.2/10</span>
			</div>
		</div>
	);
}
