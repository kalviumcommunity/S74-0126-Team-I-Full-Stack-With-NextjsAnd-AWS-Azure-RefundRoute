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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Error Handling Middleware

### Overview
This application implements centralized error handling to ensure consistent, secure, and debuggable error responses across all API routes.

### Components

#### 1. Logger (`lib/logger.ts`)
Structured JSON logging utility for consistent log formatting:

```typescript
import { logger } from "@/lib/logger";

// Info logging
logger.info("User created successfully", { userId: user.id });

// Error logging
logger.error("Database connection failed", { error: error.message });

// Warning logging
logger.warn("Invalid input detected", { field: "email" });

// Debug logging (only in development)
logger.debug("Processing request", { params: req.params });
```

**Features:**
- JSON-formatted logs with timestamp, level, message, and metadata
- Supports `info`, `error`, `warn`, and `debug` levels
- Debug logs only appear in development environment

#### 2. Error Handler (`lib/errorHandler.ts`)
Centralized error handling with environment-aware responses:

```typescript
import { handleError, handleValidationError, handleNotFoundError } from "@/lib/errorHandler";

// Generic error handling
try {
  // ... operation
} catch (error) {
  return handleError(error, "POST /api/auth/signup");
}

// Validation error (400)
return handleValidationError("Email is required");

// Not found error (404)
return handleNotFoundError("User");

// Auth error (401)
return handleAuthError("Invalid credentials");

// Forbidden error (403)
return handleForbiddenError("Admin access required");
```

**Environment-Aware Behavior:**

| Environment | Response |
|------------|----------|
| **Development** | Detailed error message + stack trace |
| **Production** | Generic "Internal server error" message (prevents information leakage) |

**Example Development Response:**
```json
{
  "success": false,
  "error": "Prisma error: Unique constraint failed on the fields: (`email`)",
  "stack": "Error: Prisma error...\n    at POST (route.ts:45:12)",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Example Production Response:**
```json
{
  "success": false,
  "error": "Internal server error",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Integration Example
Updated `/api/auth/signup` route with error handling:

```typescript
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ... validation and business logic
    return sendSuccess("Signup successful", newUser, 201);
  } catch (error) {
    return handleError(error, "POST /api/auth/signup");
  }
}
```

### Benefits
1. **Security**: Production mode hides sensitive error details
2. **Debugging**: Development mode shows full stack traces
3. **Consistency**: All errors follow the same response format
4. **Monitoring**: Structured logs enable easy log aggregation and analysis
5. **Maintainability**: Centralized error handling reduces code duplication

### Error Types
- `500` - Internal Server Error (unhandled exceptions)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication failures)
- `403` - Forbidden (authorization failures)
- `404` - Not Found (resource not found)

### Reflection
Implementing centralized error handling taught me the importance of balancing developer experience with security. In development, detailed errors accelerate debugging, while in production, generic messages prevent attackers from exploiting system information. The structured logger also makes it easier to trace issues in production through log aggregation tools.

