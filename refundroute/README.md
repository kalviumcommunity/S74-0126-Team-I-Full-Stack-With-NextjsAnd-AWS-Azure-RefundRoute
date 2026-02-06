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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
