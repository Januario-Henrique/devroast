import { Suspense } from "react";
import { MetricsServer } from "./MetricsServer";
import { MetricsSkeleton } from "./MetricsSkeleton";

export function MetricsSection() {
	return (
		<Suspense fallback={<MetricsSkeleton />}>
			<MetricsServer />
		</Suspense>
	);
}
