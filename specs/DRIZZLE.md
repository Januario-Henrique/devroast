# Drizzle ORM Specification

## Overview
Database schema for DevRoast application using Drizzle ORM with PostgreSQL.

## Tables

### submissions
Main table for storing code submissions and their analysis results.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique identifier |
| code | text | NOT NULL | Source code submitted |
| language | varchar(50) | NOT NULL | Programming language |
| score | decimal(3,1) | NOT NULL | Score from 0-10 |
| verdict | varchar(50) | NOT NULL | Verdict category |
| issues | jsonb | | Array of issues found |
| suggested_fix | text | | AI-generated fix suggestion |
| lines_count | integer | NOT NULL | Number of code lines |
| created_at | timestamp | DEFAULT now() | Submission timestamp |

### users (future)
Optional table for user accounts (not implemented yet).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Unique identifier |
| email | varchar(255) | UNIQUE, NOT NULL | User email |
| username | varchar(100) | UNIQUE, NOT NULL | Username |
| created_at | timestamp | DEFAULT now() | Account creation |

## Enums

### verdict_enum
```sql
CREATE TYPE verdict AS ENUM (
  'excellent',
  'good', 
  'needs_improvement',
  'needs_serious_help'
);
```

### language_enum
```sql
CREATE TYPE language AS ENUM (
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'sql',
  'html',
  'css',
  'json'
);
```

## Indexes

```sql
-- Leaderboard queries (ordered by score)
CREATE INDEX idx_submissions_score ON submissions(score ASC);

-- Filter by language
CREATE INDEX idx_submissions_language ON submissions(language);

-- Recent submissions
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
```

## Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast123
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Drizzle Config

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://devroast:devroast123@localhost:5432/devroast',
  },
});
```

## Schema File

```typescript
// src/lib/db/schema.ts
import { pgTable, uuid, text, varchar, decimal, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  score: decimal('score', { precision: 3, scale: 1 }).notNull(),
  verdict: varchar('verdict', { length: 50 }).notNull(),
  issues: jsonb('issues'),
  suggestedFix: text('suggested_fix'),
  linesCount: integer('lines_count').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
```

## Commands

```bash
# Generate migrations
npm run db:generate

# Push to database
npm run db:push

# Start PostgreSQL
docker-compose up -d
```

## Environment Variables

```
DATABASE_URL=postgresql://devroast:devroast123@localhost:5432/devroast
```
