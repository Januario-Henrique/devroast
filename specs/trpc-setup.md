# tRPC Setup

## Status
TODO

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
│       └── routers/
│           ├── _app.ts          # Main router
│           └── roast.ts         # Roast procedures
```

## Dependencies

```bash
npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod client-only server-only
```

## Implementation Steps

1. Install dependencies
2. Create `src/lib/trpc/init.ts` - tRPC init with context
3. Create `src/lib/trpc/query-client.ts` - QueryClient factory
4. Create `src/lib/trpc/client.tsx` - Client provider
5. Create `src/lib/trpc/server.ts` - Server caller
6. Create `src/lib/trpc/routers/_app.ts` - Main router
7. Create `src/lib/trpc/routers/roast.ts` - Roast CRUD procedures
8. Create `src/app/api/trpc/[trpc]/route.ts` - API handler
9. Update `src/app/layout.tsx` - Add TRPCProvider
10. Create initial roast procedures (create, getTop, getById)

## References
- https://trpc.io/docs/client/nextjs/app-router-setup
- https://trpc.io/docs/client/react/server-components
