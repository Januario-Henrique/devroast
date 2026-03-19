"use client";

import { NumberFlow } from "number-flow";

interface AnimatedNumberProps {
	value: number;
	decimals?: number;
}

function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps) {
	return (
		<NumberFlow
			value={value}
			decimalPlaces={decimals}
			locator={"en"}
			transformDuration={400}
			className="tabular-nums"
		/>
	);
}

interface MetricsDisplayProps {
	totalRoasts: number;
	avgScore: number;
}

export function MetricsDisplay({ totalRoasts, avgScore }: MetricsDisplayProps) {
	return (
		<div className="flex items-center justify-center gap-6 text-text-tertiary text-xs">
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-accent-green" />
				<span>
					<AnimatedNumber value={totalRoasts} />
					{` codes roasted`}
				</span>
			</div>
			<span>·</span>
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-accent-amber" />
				<span>
					{`avg score: `}
					<AnimatedNumber value={avgScore} decimals={1} />
					{`/10`}
				</span>
			</div>
		</div>
	);
}
