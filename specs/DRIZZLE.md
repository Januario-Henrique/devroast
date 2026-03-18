# Drizzle ORM Specification

## Status
✅ Implemented

## Overview
Database schema for DevRoast using Drizzle ORM with PostgreSQL.

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

## Notes
- Using Drizzle's `casing: "snake_case"` config - column names written in camelCase are auto-converted
- No native Drizzle relations - queries use raw SQL and joins
- No unnecessary indexes - only FK/PK constraints

## Files Created
- `src/db/schema.ts` - Table definitions with enums
- `src/db/index.ts` - Database connection pool
- `drizzle.config.ts` - Drizzle Kit configuration
- `docker-compose.yml` - PostgreSQL setup
- `.env.example` - Environment variables template

## Commands
```bash
# Start PostgreSQL
docker-compose up -d

# Copy env file
cp .env.example .env.local

# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate
```

## Environment Variables
```
DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast
```
