export function MetricsSkeleton() {
	return (
		<div className="flex items-center justify-center gap-6 text-text-tertiary text-xs">
			<div className="flex items-center gap-2">
				<div className="w-4 h-4 bg-border-primary rounded animate-pulse" />
				<div className="w-16 h-4 bg-border-primary rounded animate-pulse" />
			</div>
			<span>·</span>
			<div className="flex items-center gap-2">
				<div className="w-4 h-4 bg-border-primary rounded animate-pulse" />
				<div className="w-20 h-4 bg-border-primary rounded animate-pulse" />
			</div>
		</div>
	);
}
