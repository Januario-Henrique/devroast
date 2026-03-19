# tRPC Setup

## Status
✅ Complete (metrics only)

## Overview
Integrate tRPC as the API layer for DevRoast, enabling type-safe communication between client and server components.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts    # HTTP handler
│   └── layout.tsx              # Mount TRPCProvider
├── lib/
│   └── trpc/
│       ├── init.ts              # tRPC init & context
│       ├── query-client.ts      # QueryClient factory
│       ├── client.tsx           # Client hooks & provider
│       ├── server.ts            # Server caller
│       ├── types.ts             # Type exports
│       └── routers/
│           └── _app.ts          # Main router
└── components/
    ├── MetricsClient.tsx        # Client component with trpc hook
    ├── MetricsDisplay.tsx       # Animated numbers with number-flow
    ├── MetricsSkeleton.tsx      # Loading skeleton
    ├── MetricsServer.tsx        # Server component
    └── MetricsSection.tsx       # Suspense wrapper
```

## Dependencies

```bash
npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod client-only server-only number-flow
```

## Implemented Procedures

### metrics
Returns aggregated metrics from the database.
- Returns: `{ totalRoasts: number, avgScore: number }`

## References
- https://trpc.io/docs/client/nextjs/app-router-setup
- https://trpc.io/docs/client/react/server-components
- https://number-flow.barvian.me/
