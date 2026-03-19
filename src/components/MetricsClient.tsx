"use client";

import { trpc } from "@/lib/trpc/client";
import { MetricsDisplay } from "./MetricsDisplay";
import { MetricsSkeleton } from "./MetricsSkeleton";

export function MetricsClient() {
	const { data, isLoading } = trpc.metrics.useQuery(undefined, {
		retry: 1,
		refetchOnWindowFocus: false,
	});

	if (isLoading || !data) {
		return <MetricsSkeleton />;
	}

	return (
		<MetricsDisplay totalRoasts={data.totalRoasts} avgScore={data.avgScore} />
	);
}
