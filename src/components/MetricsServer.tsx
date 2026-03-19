import { MetricsDisplay } from "@/components/MetricsDisplay";
import { createServerClient } from "@/lib/trpc/server";

export async function MetricsServer() {
	const trpc = createServerClient();

	const metrics = await trpc.metrics.query();

	return (
		<MetricsDisplay
			totalRoasts={metrics.totalRoasts}
			avgScore={metrics.avgScore}
		/>
	);
}
