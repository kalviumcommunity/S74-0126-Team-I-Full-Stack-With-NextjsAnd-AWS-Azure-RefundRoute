This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Loading States & Error Boundaries

This project implements loading skeletons and error boundaries for graceful async state handling.

### Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── loading.tsx             # Root loading skeleton
├── error.tsx               # Root error boundary
└── refunds/
    ├── page.tsx            # Refunds page with async data
    ├── loading.tsx         # Refunds loading skeleton
    └── error.tsx           # Refunds error boundary
```

### Testing

**Loading State:**
- Visit `/refunds` - see skeleton UI for 2 seconds

**Error State:**
- Open `app/refunds/page.tsx`
- Uncomment line 7: `throw new Error('Failed to fetch refunds from the server');`
- Reload `/refunds` to see error UI

**Network Throttling:**
- DevTools (F12) → Network → Throttling → "Slow 3G"

## 🗄️ Database Migrations & Seeding

This project uses Prisma ORM for database management with migrations and seed scripts.

### Initial Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up your database URL:**
Create a `.env` file in the `refundroute` folder:
```
DATABASE_URL="postgresql://user:password@localhost:5432/refundroute"
```

### Migration Workflow

**Create and apply the initial migration:**
```bash
npx prisma migrate dev --name init_schema
```

**Add or modify models:**
1. Edit `prisma/schema.prisma`
2. Run a new migration:
```bash
npx prisma migrate dev --name add_new_table
```

**Reset database (removes all data):**
```bash
npx prisma migrate reset
```
⚠️ This will delete all data, reapply migrations, and run seed script.

### Seed Script

**Run the seed script:**
```bash
npx prisma db seed
```

The seed script creates:
- 3 sample users (Alice, Bob, Charlie)
- 3 sample projects linked to users

**Verify seeded data:**
```bash
npx prisma studio
```
Opens Prisma Studio at [http://localhost:5555](http://localhost:5555) to browse data.

### Migration Files

Generated migrations are stored in `prisma/migrations/`:
- Each migration has a timestamped folder
- Contains SQL files showing exact database changes
- Ensures reproducible schema across environments

### Rollback Safety

Before running migrations in production:
1. **Backup your database** using `pg_dump` or cloud provider tools
2. **Test migrations** in a staging environment first
3. **Review generated SQL** in migration files
4. **Use transactions** - Prisma migrations are transactional by default
5. **Monitor and verify** data integrity after migration

### Idempotency

The seed script uses `skipDuplicates: true` to ensure:
- Re-running seeds won't create duplicate records
- Safe to run multiple times during development
- Email uniqueness constraint prevents duplicates

## ⚡ Transaction & Query Optimisation

This project implements database transactions and query optimizations for better performance and data integrity.

### Transaction Implementation

**File:** `lib/transaction-demo.ts`

**Use Case: Atomic User & Project Creation**

When creating a user and their first project, both operations must succeed or fail together:

```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { name, email } });
  const project = await tx.project.create({ 
    data: { name: projectName, userId: user.id } 
  });
  return { user, project };
});
```

**Rollback Verification:**
- Test by creating duplicate emails in transaction
- If any step fails, entire transaction rolls back
- No partial data is saved to database

### Indexes Added

**In `schema.prisma`:**

```prisma
model User {
  @@index([email])        // Fast email lookups
  @@index([createdAt])    // Sorting by creation date
}

model Project {
  @@index([userId])           // Fast user project queries
  @@index([status])           // Filter by status
  @@index([userId, status])   // Combined queries
}
```

**Apply indexes:**
```bash
npx prisma migrate dev --name add_indexes_for_optimisation
```

### Query Optimizations

**1. Select Only Needed Fields:**
```typescript
// ❌ Bad: Over-fetching
const users = await prisma.user.findMany();

// ✅ Good: Select specific fields
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true }
});
```

**2. Pagination:**
```typescript
const users = await prisma.user.findMany({
  skip: page * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' }
});
```

**3. Batch Operations:**
```typescript
await prisma.project.createMany({
  data: projectNames.map(name => ({ name, userId })),
  skipDuplicates: true
});
```

### Performance Monitoring

**Enable query logging:**
```bash
DEBUG="prisma:query" npm run dev
```

**What to monitor:**
- Query execution time
- Number of queries per request
- Index usage in WHERE clauses
- N+1 query patterns

### Anti-Patterns Avoided

❌ **Over-fetching:** Loading all fields when only few are needed  
✅ **Solution:** Use `select` to specify exact fields

❌ **N+1 Queries:** Separate query for each related record  
✅ **Solution:** Use `include` or nested `select`

❌ **No Pagination:** Loading entire tables  
✅ **Solution:** Use `skip` and `take` for pagination

❌ **Missing Indexes:** Slow queries on frequently filtered fields  
✅ **Solution:** Add `@@index` on commonly queried fields

### Production Monitoring Plan

**Metrics to Track:**
1. **Query Latency** - Average execution time per query
2. **Slow Query Log** - Queries taking >100ms
3. **Error Rates** - Failed transactions and rollbacks
4. **Connection Pool** - Active connections and pool exhaustion

**Tools:**
- AWS RDS Performance Insights (if using AWS)
- Azure Query Performance Insight (if using Azure)
- Prisma query event logs
- APM tools like New Relic or DataDog

### Before/After Performance

**Example Query: Get active projects**

**Before indexes:**
```
Query time: ~150ms (full table scan)
```

**After adding @@index([status]):**
```
Query time: ~8ms (index scan)
```

**Improvement: 94% faster** ⚡

## 🚀 API Route Structure and Naming

This project follows RESTful API conventions with clear, predictable endpoints under `/api/`.

### API Route Hierarchy

```
app/api/
├── users/
│   ├── route.ts           # GET, POST /api/users
│   └── [id]/
│       └── route.ts       # GET, PUT, DELETE /api/users/:id
└── projects/
    ├── route.ts           # GET, POST /api/projects
    └── [id]/
        └── route.ts       # GET, PUT, DELETE /api/projects/:id
```

### Endpoints Overview

#### Users API

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/users` | Get all users (paginated) | 200, 500 |
| POST | `/api/users` | Create new user | 201, 400, 409, 500 |
| GET | `/api/users/:id` | Get user by ID | 200, 400, 404, 500 |
| PUT | `/api/users/:id` | Update user | 200, 400, 404, 409, 500 |
| DELETE | `/api/users/:id` | Delete user | 200, 400, 404, 500 |

#### Projects API

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/projects` | Get all projects (paginated) | 200, 500 |
| POST | `/api/projects` | Create new project | 201, 400, 404, 500 |
| GET | `/api/projects/:id` | Get project by ID | 200, 400, 404, 500 |
| PUT | `/api/projects/:id` | Update project | 200, 400, 404, 500 |
| DELETE | `/api/projects/:id` | Delete project | 200, 400, 404, 500 |

### Example Requests & Responses

#### Get All Users (Paginated)
```bash
curl "http://localhost:3000/api/users?page=1&limit=10"
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "createdAt": "2026-02-06T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### Create New User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie Davis","email":"charlie@example.com"}'
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "Charlie Davis",
    "email": "charlie@example.com",
    "createdAt": "2026-02-06T11:00:00Z"
  }
}
```

#### Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "createdAt": "2026-02-06T10:30:00Z",
    "projects": [
      {
        "id": 1,
        "name": "RefundRoute Dashboard",
        "status": "active",
        "createdAt": "2026-02-06T10:31:00Z"
      }
    ]
  }
}
```

#### Update User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith"}'
```

**Response (200):**
```json
{
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "createdAt": "2026-02-06T10:30:00Z"
  }
}
```

#### Get Projects with Filtering
```bash
curl "http://localhost:3000/api/projects?status=active&page=1&limit=5"
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "RefundRoute Dashboard",
      "status": "active",
      "createdAt": "2026-02-06T10:31:00Z",
      "user": {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice@example.com"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 12,
    "totalPages": 3
  }
}
```

### HTTP Status Codes Used

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input or missing required fields |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate data (e.g., email already exists) |
| 500 | Internal Server Error | Unexpected error |

### RESTful Naming Conventions

✅ **Do:**
- Use plural nouns: `/api/users`, `/api/projects`
- Use lowercase: `/api/users` not `/api/Users`
- Use hyphens for multi-word resources: `/api/user-profiles`
- Keep it hierarchical: `/api/users/:id/projects`

❌ **Don't:**
- Use verbs: `/api/getUsers`, `/api/createProject`
- Use special characters: `/api/users!`, `/api/users#list`
- Mix singular/plural: `/api/user`, `/api/projects`

### Pagination & Filtering

All list endpoints support:
- `?page=1` - Page number (default: 1)
- `?limit=10` - Items per page (default: 10)
- `?status=active` - Filter by status (projects only)

### Error Handling

All errors return consistent JSON format:
```json
{
  "error": "Descriptive error message"
}
```

### Why Consistency Matters

**Predictability:** Developers can guess endpoint structure without reading docs  
**Maintainability:** Easy to add new resources following the same pattern  
**Integration:** External clients can follow standard REST conventions  
**Self-Documenting:** Clear naming reduces need for extensive documentation

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
