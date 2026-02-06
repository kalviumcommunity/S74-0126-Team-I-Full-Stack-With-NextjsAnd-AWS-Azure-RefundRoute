# Pull Request: Error Handling Middleware

## 🎯 Assignment: Error Handling Middleware

This PR implements centralized error handling with structured logging to ensure consistent, secure, and debuggable error responses across all API routes. The implementation follows environment-aware practices, showing detailed errors in development while protecting sensitive information in production.

**Builds on:** Authentication APIs PR + Authorization Middleware PR

## 📋 Changes Made

### New Files Added
- ✅ `lib/logger.ts` - Structured JSON logging utility
- ✅ `lib/errorHandler.ts` - Centralized error handling with environment-aware responses

### Modified Files
- 📝 `app/api/auth/signup/route.ts` - Integrated centralized error handler
- 📝 `README.md` - Added comprehensive Error Handling Middleware documentation

## ✨ Features Implemented

### 1. Structured Logger (`lib/logger.ts`)

**Features:**
- ✅ JSON-formatted logs with timestamp, level, message, and metadata
- ✅ Multiple log levels: `info`, `error`, `warn`, `debug`
- ✅ Debug logs only appear in development environment
- ✅ Consistent log structure for easy parsing and aggregation

**Usage Examples:**
```typescript
import { logger } from "@/lib/logger";

// Info logging
logger.info("User created successfully", { userId: user.id });

// Error logging
logger.error("Database connection failed", { error: error.message });

// Warning logging
logger.warn("Invalid input detected", { field: "email" });

// Debug logging (development only)
logger.debug("Processing request", { params: req.params });
```

**Log Output Format:**
```json
{
  "level": "error",
  "message": "Database connection failed",
  "meta": { "error": "Connection timeout" },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Error Handler (`lib/errorHandler.ts`)

**Features:**
- ✅ Centralized error handling for all API routes
- ✅ Environment-aware responses (detailed in dev, generic in prod)
- ✅ Multiple error types: Generic (500), Validation (400), Auth (401), Forbidden (403), NotFound (404)
- ✅ Automatic error logging with context
- ✅ Stack trace redaction in production for security

**Core Functions:**

#### `handleError(error, context?)`
Generic error handler for unhandled exceptions:

```typescript
try {
  await prisma.user.create({ data: userData });
} catch (error) {
  return handleError(error, "POST /api/auth/signup");
}
```

**Development Response:**
```json
{
  "success": false,
  "error": "Unique constraint failed on the fields: (`email`)",
  "stack": "Error: Unique constraint...\n    at POST (route.ts:45:12)",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Production Response:**
```json
{
  "success": false,
  "error": "Internal server error",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### `handleValidationError(message)` - 400 Bad Request
```typescript
return handleValidationError("Email is required");
```

#### `handleAuthError(message?)` - 401 Unauthorized
```typescript
return handleAuthError("Invalid credentials");
```

#### `handleForbiddenError(message?)` - 403 Forbidden
```typescript
return handleForbiddenError("Admin access required");
```

#### `handleNotFoundError(resource?)` - 404 Not Found
```typescript
return handleNotFoundError("User");
```

## 🛡️ Environment-Aware Behavior

### Development Mode (`NODE_ENV !== "production"`)
- ✅ Full error messages with technical details
- ✅ Complete stack traces for debugging
- ✅ Debug logs enabled
- ✅ Metadata and context preserved

**Example:**
```json
{
  "success": false,
  "error": "Prisma error: Unique constraint failed on the fields: (`email`)",
  "stack": "Error: \n  Invalid `prisma.user.create()` invocation:\n...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Production Mode (`NODE_ENV === "production"`)
- ✅ Generic error messages to prevent information leakage
- ✅ Stack traces removed from responses
- ✅ Debug logs disabled
- ✅ Secure error responses for clients

**Example:**
```json
{
  "success": false,
  "error": "Internal server error",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔒 Security Benefits

### Information Leakage Prevention

**Without Error Handling:**
```json
{
  "error": "Prisma error: Database 'refund_db' not found on server 'prod-db-01.us-east.aws.rds.amazonaws.com:5432'"
}
```
☠️ **PROBLEM:** Exposes database host, region, cloud provider, database name

**With Error Handling (Production):**
```json
{
  "error": "Internal server error"
}
```
✅ **SOLUTION:** No sensitive information exposed to potential attackers

### Attack Vector Protection

| Scenario | Without Error Handling | With Error Handling |
|----------|------------------------|---------------------|
| **Database schema leak** | "Column 'password_hash' does not exist" | "Internal server error" |
| **Server path leak** | "Error in /var/www/app/routes/auth.ts:42" | "Internal server error" |
| **Dependency version leak** | "TypeError: bcrypt@5.1.0 ..." | "Internal server error" |
| **SQL injection detection** | "Syntax error near 'OR 1=1'" | "Internal server error" |

## 🧪 Testing Instructions

### 1. Test Development Mode

**Set Environment:**
```bash
export NODE_ENV=development
npm run dev
```

**Trigger Error:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"existing@example.com","password":"password123"}'
```

**Expected Response (Detailed):**
```json
{
  "success": false,
  "error": "User with this email already exists",
  "stack": "Error: User exists\n    at POST (/app/api/auth/signup/route.ts:32:11)",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Terminal Log:**
```json
{"level":"error","message":"Error in POST /api/auth/signup","meta":{"message":"User exists","stack":"Error: ..."},"timestamp":"2024-01-15T10:30:00.000Z"}
```

### 2. Test Production Mode

**Set Environment:**
```bash
export NODE_ENV=production
npm run build
npm run start
```

**Trigger Same Error:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"existing@example.com","password":"password123"}'
```

**Expected Response (Redacted):**
```json
{
  "success": false,
  "error": "Internal server error",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Terminal Log (Still Detailed):**
```json
{"level":"error","message":"Error in POST /api/auth/signup","meta":{"message":"User exists","stack":"Error: ..."},"timestamp":"2024-01-15T10:30:00.000Z"}
```
*Note: Server logs remain detailed for internal monitoring, only client responses are redacted.*

### 3. Test Validation Errors (400)

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"invalid-email","password":"123"}'
```

**Expected (Both Environments):**
```json
{
  "success": false,
  "error": "Password must be at least 6 characters long",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 4. Test Logger Directly

```typescript
import { logger } from "@/lib/logger";

logger.info("Testing info log", { test: true });
logger.error("Testing error log", { errorCode: "E500" });
logger.debug("Testing debug log", { debug: "data" }); // Only in dev
```

## 💡 Benefits

### 1. Security
- ✅ Production mode hides sensitive error details
- ✅ Prevents database schema/path leakage
- ✅ Protects against reconnaissance attacks
- ✅ Stack traces never exposed to clients in production

### 2. Debugging
- ✅ Development mode shows full stack traces
- ✅ Structured logs enable easy searching/filtering
- ✅ Context parameter identifies error source
- ✅ JSON format integrates with log aggregation tools (Datadog, Splunk, ELK)

### 3. Consistency
- ✅ All errors follow the same response format
- ✅ Centralized error handling reduces code duplication
- ✅ Single source of truth for error responses
- ✅ Timestamp on every error for correlation

### 4. Monitoring
- ✅ Structured logs enable easy parsing
- ✅ Metadata fields support error analytics
- ✅ Log levels filter critical vs informational messages
- ✅ Production errors logged internally while hiding from clients

### 5. Maintainability
- ✅ Error handling logic in one place
- ✅ Easy to add new error types
- ✅ Consistent error format across all routes
- ✅ Developer-friendly with TypeScript types

## 🎓 Assignment Requirements Met

- [x] Created centralized error handler (`lib/errorHandler.ts`)
- [x] Implemented structured logger (`lib/logger.ts`)
- [x] Environment-aware error responses (dev vs production)
- [x] Integrated error handler in API routes
- [x] Documented with code examples and comparisons
- [x] Security considerations (information leakage prevention)
- [x] Testing instructions for both environments
- [x] Reflection on debugging vs security tradeoffs

## 🔗 Integration Example

**Before (Inconsistent):**
```typescript
export async function POST(req: Request) {
  try {
    // ... logic
  } catch (error) {
    console.error(error); // 😞 No structure
    return NextResponse.json({ error: error.message }, { status: 500 }); // ☠️ Leaks details
  }
}
```

**After (Centralized):**
```typescript
import { handleError } from "@/lib/errorHandler";

export async function POST(req: Request) {
  try {
    // ... logic
  } catch (error) {
    return handleError(error, "POST /api/auth/signup"); // ✅ Structured, secure, logged
  }
}
```

## 💭 Reflection

Implementing centralized error handling taught me the critical balance between **developer experience** and **security**:

**Key Learnings:**

1. **Development vs Production Tradeoff:** In development, detailed errors with stack traces accelerate debugging by pinpointing exact failure points. In production, generic messages prevent attackers from exploiting system information (database hosts, file paths, dependency versions).

2. **Information Leakage Risk:** Before implementing environment-aware error handling, I didn't fully appreciate how much sensitive data standard error messages expose. Error messages like "Database 'prod_db' at server xyz.amazonaws.com not found" give attackers free reconnaissance data about infrastructure.

3. **Structured Logging Benefits:** JSON-formatted logs seemed like overkill at first, but they enable powerful log aggregation in production. Tools like Datadog can parse structured logs to build dashboards showing error trends, most common failures, and performance bottlenecks—something impossible with plain console.log().

4. **Centralization = Consistency:** Moving all error handling to one module ensures every route returns errors in the same format. This consistency helps frontend developers build reliable error handling, and prevents individual routes from accidentally leaking sensitive data.

5. **Security Through Obscurity (Done Right):** While "security through obscurity" is generally bad practice, hiding error implementation details from clients (while logging them server-side) is legitimate defense-in-depth. Attackers can't exploit what they can't see.

**Practical Application:**

In a real-world scenario, this error handling pattern would integrate with:
- **Monitoring Tools:** Datadog/New Relic for real-time error tracking
- **Alerting Systems:** Slack/PagerDuty notifications for critical errors
- **Error Tracking:** Sentry for detailed error reports with user context
- **Audit Logs:** Compliance requirements for tracking security events

This assignment demonstrated that good error handling isn't just about catching errors—it's about **observability**, **security**, and **developer experience** working together.
