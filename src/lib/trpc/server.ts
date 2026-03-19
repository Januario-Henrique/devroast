import "server-only";

import { db } from "@/db";
import { createCallerFactory, createTRPCContext, publicProcedure, router } from "./init";

const createCaller = createCallerFactory(
	router({
		health: publicProcedure.query(() => {
			return { status: "ok" };
		}),

		metrics: publicProcedure.query(async () => {
			const countResult = await db.execute<{ count: bigint }>(
				`SELECT COUNT(*) as count FROM roasts`,
			);

			const avgResult = await db.execute<{ avg: number | null }>(
				`SELECT AVG(score) as avg FROM roasts`,
			);

			const totalRoasts =
				countResult.rows[0]?.count !== undefined
					? Number(countResult.rows[0].count)
					: 0;

			const avgScore =
				avgResult.rows[0]?.avg !== null ? avgResult.rows[0].avg ?? 0 : 0;

			return {
				totalRoasts,
				avgScore: Number(avgScore.toFixed(1)),
			};
		}),
	}),
);

export const createServerClient = () => {
	return createCaller(createTRPCContext());
};
