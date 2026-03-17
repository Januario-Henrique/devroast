# Drizzle ORM Specification

## Overview
Database schema for DevRoast using Drizzle ORM with PostgreSQL. Based on the official NLW repo.

## Tables

### roasts
Main table for storing code submissions and their analysis results.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique identifier |
| code | text | NOT NULL | Source code submitted |
| language | varchar(50) | NOT NULL | Programming language |
| line_count | integer | NOT NULL | Number of code lines |
| roast_mode | boolean | DEFAULT false, NOT NULL | Sarcasm mode enabled |
| score | real | NOT NULL | Score from 0-10 |
| verdict | verdict_enum | NOT NULL | Verdict category |
| roast_quote | text | | Humor roast quote |
| suggested_fix | text | | AI-generated fix suggestion |
| created_at | timestamp | DEFAULT now(), NOT NULL | Submission timestamp |

### analysis_items
Related items for each roast (issues found).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique identifier |
| roast_id | uuid | FK -> roasts.id, NOT NULL, cascade | Reference to roast |
| severity | severity_enum | NOT NULL | Issue severity |
| title | varchar(200) | NOT NULL | Issue title |
| description | text | NOT NULL | Issue description |
| order | integer | NOT NULL | Display order |

## Enums

### verdict_enum
```sql
CREATE TYPE verdict AS ENUM (
  'needs_serious_help',
  'rough_around_edges',
  'decent_code',
  'solid_work',
  'exceptional'
);
```

### severity_enum
```sql
CREATE TYPE severity AS ENUM (
  'critical',
  'warning',
  'good'
);
```

## Indexes

```sql
-- Leaderboard queries (ordered by score)
CREATE INDEX roasts_score_idx ON roasts(score);
```

## Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    volumes:
      - devroast_pgdata:/var/lib/postgresql/data

volumes:
  devroast_pgdata:
```

## Drizzle Config

```typescript
// drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: databaseUrl,
  },
});
```

## Schema File

```typescript
// src/db/schema.ts
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const verdictEnum = pgEnum("verdict", [
  "needs_serious_help",
  "rough_around_edges",
  "decent_code",
  "solid_work",
  "exceptional",
]);

export const severityEnum = pgEnum("severity", ["critical", "warning", "good"]);

export const roasts = pgTable(
  "roasts",
  {
    id: uuid().defaultRandom().primaryKey(),
    code: text().notNull(),
    language: varchar({ length: 50 }).notNull(),
    lineCount: integer().notNull(),
    roastMode: boolean().default(false).notNull(),
    score: real().notNull(),
    verdict: verdictEnum().notNull(),
    roastQuote: text(),
    suggestedFix: text(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("roasts_score_idx").on(table.score)],
);

export const analysisItems = pgTable("analysis_items", {
  id: uuid().defaultRandom().primaryKey(),
  roastId: uuid()
    .references(() => roasts.id, { onDelete: "cascade" })
    .notNull(),
  severity: severityEnum().notNull(),
  title: varchar({ length: 200 }).notNull(),
  description: text().notNull(),
  order: integer().notNull(),
});
```

## Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Generate migrations
pnpm db:generate

# Push to database
pnpm db:push

# Start PostgreSQL
docker-compose up -d
```

## Environment Variables

```
DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast
```
