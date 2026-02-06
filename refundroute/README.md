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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
