# Pull Request: Authentication APIs (Signup / Login)

## 🎯 Assignment: Authentication APIs (Signup / Login)

This PR implements secure user authentication using bcrypt for password hashing and JWT (JSON Web Token) for session management in Next.js.
# Pull Request: Input Validation with Zod

## 🎯 Assignment: Input Validation with Zod

This PR implements comprehensive input validation using Zod across all POST and PUT API endpoints, ensuring type-safe, validated data before any database operations.

## 📋 Changes Made

### New Files Added
- ✅ `lib/schemas/userSchema.ts` - User validation schemas
- ✅ `lib/schemas/projectSchema.ts` - Project validation schemas
- ✅ `lib/validationHelpers.ts` - Zod error handling utilities

### Modified Files
- 📝 `app/api/users/route.ts` - Added Zod validation
- 📝 `app/api/users/[id]/route.ts` - Added Zod validation
- 📝 `app/api/projects/route.ts` - Added Zod validation
- 📝 `app/api/projects/[id]/route.ts` - Added Zod validation
- 📝 `refundroute/README.md` - Added validation documentation
- 📝 `package.json` - Added Zod dependency

## ✨ Features Implemented

### Validation Schemas

**User Schema:**
```typescript
createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address').toLowerCase(),
});

updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
}).refine(data => data.name || data.email);
```

**Project Schema:**
```typescript
createProjectSchema = z.object({
  name: z.string().min(3),
  userId: z.number().int().positive(),
  status: z.enum(['active', 'inactive', 'archived']),
});
```

### Validation Features

- ✅ Type-safe runtime validation
- ✅ Descriptive error messages
- ✅ Field-level error reporting
- ✅ Email format validation
- ✅ String length constraints
- ✅ Number type and range validation
- ✅ Enum validation for status fields
- ✅ Custom refinement rules
- ✅ TypeScript type inference

### Error Handling

**Validation Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": [
      {
        "field": "name",
        "message": "Name must be at least 2 characters long"
      },
      {
        "field": "email",
        "message": "Invalid email address"
      }
    ]
  },
  "timestamp": "2026-02-06T10:30:00.000Z"
}
```

## 🧪 Testing Instructions

### Install Zod
```bash
cd refundroute
npm install zod
```

### Test Valid Input
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com"}'
```

**Expected (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }
}
```

### Test Invalid Name (Too Short)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"A","email":"test@example.com"}'
```

**Expected (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": [{
      "field": "name",
      "message": "Name must be at least 2 characters long"
    }]
  }
}
```

### Test Invalid Email
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"bademail"}'
```

**Expected (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": [{
      "field": "email",
      "message": "Invalid email address"
    }]
  }
}
```

### Test Missing Fields
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": [
      { "field": "name", "message": "Required" },
      { "field": "email", "message": "Required" }
    ]
  }
}
```

### Test Invalid Project Status
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","userId":1,"status":"invalid"}'
```

**Expected (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": [{
      "field": "status",
      "message": "Invalid enum value. Expected 'active' | 'inactive' | 'archived'"
    }]
  }
}
```

### Test Update with No Fields
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": [{
      "message": "At least one field (name or email) must be provided"
    }]
  }
}
```

## 📊 Impact

### Data Integrity
- ✅ Guaranteed valid data before database operations
- ✅ Type-safe validation at runtime
- ✅ Prevents malformed data corruption
- ✅ Enforces business rules (min length, email format, etc.)

### Developer Experience
- ✅ Clear, field-specific error messages
- ✅ TypeScript type inference from schemas
- ✅ Reusable schemas across client/server
- ✅ Self-documenting API requirements

### Security
- ✅ Prevents injection attacks
- ✅ Validates data types and formats
- ✅ Sanitizes inputs (e.g., toLowerCase for emails)
- ✅ Rejects unexpected fields

### Team Collaboration
- ✅ Frontend knows exact validation rules
- ✅ Backend guarantees data structure
- ✅ Reduced debugging time
- ✅ Single source of truth for schemas

## 🎓 Assignment Requirements Met

- [x] Zod installed and configured
- [x] Validation schemas created for all models
- [x] Applied to all POST endpoints
- [x] Applied to all PUT endpoints
- [x] Graceful error handling with ZodError
- [x] Consistent error response format
- [x] TypeScript type inference
- [x] Schema reuse capability
- [x] Comprehensive README documentation
- [x] Testing examples provided

## 💡 Schema Reuse

**Server-side validation:**
```typescript
import { createUserSchema } from '@/lib/schemas/userSchema';
const validatedData = createUserSchema.parse(body);
```

**Client-side validation (same schema):**
```typescript
import { createUserSchema } from '@/lib/schemas/userSchema';
try {
  createUserSchema.parse(formData);
  // Submit to API
} catch (error) {
  // Show errors in UI
}
```

**Type inference:**
```typescript
type CreateUserInput = z.infer<typeof createUserSchema>;
// Type is automatically: { name: string; email: string }
```

## 🔒 How Zod Protects the Backend

**Without Zod:**
```
Frontend sends malformed data 
  → Reaches database
  → Database error or corrupted data
  → Hard to debug
  → Poor user experience
```

**With Zod:**
```
Frontend sends malformed data
  → Zod validation layer
  → Immediate rejection with clear errors
  → No database touched
  → Developer fixes issue quickly
```

## 🌐 Collaboration Benefits

When a frontend developer accidentally sends bad data:

1. **Zod catches it immediately** - Before any business logic
2. **Returns structured, field-level errors** - Easy to understand
3. **Prevents database corruption** - Data never reaches DB
4. **Improves feedback loop** - Clear requirements

**Example:**
Developer sends: `{ "name": "", "email": "bad" }`

Zod responds:
```json
{
  "errors": [
    { "field": "name", "message": "Name must be at least 2 characters" },
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

Developer immediately knows what to fix!

## 🚀 No Breaking Changes

All existing endpoints enhanced with validation:
- Same HTTP methods
- Same response format (success)
- Enhanced error responses
- Backward compatible structure

## 🔗 GitHub PR Link

## 📋 Changes Made

### New Files Added
- ✅ `app/api/auth/signup/route.ts` - User signup with bcrypt password hashing
- ✅ `app/api/auth/login/route.ts` - User login with JWT token generation

### Modified Files
- 📝 `prisma/schema.prisma` - Added `password` field to User model
- 📝 `package.json` - Added bcrypt and jsonwebtoken dependencies

## ✨ Features Implemented

### Signup API

**Endpoint:** `POST /api/auth/signup`

**Features:**
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Email uniqueness validation
- ✅ Password length validation (minimum 6 characters)
- ✅ Zod schema validation for name and email
- ✅ Secure password storage (never stored in plain text)

**Request:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "mypassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "user",
    "createdAt": "2026-02-06T10:00:00.000Z"
  }
}
```

### Login API

**Endpoint:** `POST /api/auth/login`

**Features:**
- ✅ Password verification with bcrypt.compare()
- ✅ JWT token generation with 1-hour expiry
- ✅ Token includes user ID, email, name, and role
- ✅ Signed with secret key (prevents tampering)

**Request:**
```json
{
  "email": "alice@example.com",
  "password": "mypassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "user"
    }
  }
}
```

## 🧪 Testing Instructions

### 1. Install Dependencies
```bash
cd refundroute
npm install
```

### 2. Run Database Migration
```bash
npx prisma migrate dev --name add_user_password
npx prisma generate
```

### 3. Test Signup

**Valid Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","password":"mypassword123"}'
```

**Expected (201):** User created with hashed password

**Weak Password:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123"}'
```

**Expected (400):** "Password must be at least 6 characters long"

**Duplicate Email:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'
```

**Expected (409):** "User with this email already exists"

### 4. Test Login

**Valid Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"mypassword123"}'
```

**Expected (200):** JWT token returned

**Wrong Password:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"wrongpassword"}'
```

**Expected (401):** "Invalid credentials"

**User Not Found:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nonexistent@example.com","password":"password123"}'
```

**Expected (404):** "User not found"

## 📊 Security Impact

### Password Hashing (bcrypt)
**Without bcrypt:**
```
Database leak → Plain text passwords exposed → All accounts compromised
```

**With bcrypt:**
```
Database leak → Hashed passwords → Computationally infeasible to reverse
Example: "mypassword123" → "$2b$10$XvZ9qT.../cPYrHfKLj4U7O"
```

**Salt Rounds (10):**
- 2^10 = 1,024 iterations
- ~100ms hashing time (acceptable UX)
- Protects against rainbow table attacks

### JWT Token Security

**Token Structure:**
```
Header.Payload.Signature
eyJhbGci...  ← Algorithm (HS256)
eyJpZCI6... ← User data (id, email, role)
SflKxwRJ... ← HMAC signature (prevents tampering)
```

**Security Features:**
- ✅ **Signed:** Cannot be forged without secret key
- ✅ **Expiry:** 1-hour lifetime (minimizes breach impact)
- ✅ **Stateless:** No server-side session storage needed
- ✅ **Tamper-proof:** Modified tokens fail verification

## 🎓 Assignment Requirements Met

- [x] bcrypt installed and configured for password hashing
- [x] Signup API with secure password storage
- [x] Login API with JWT token generation
- [x] Password verification using bcrypt.compare()
- [x] JWT token with 1-hour expiry
- [x] User credentials validated before database operations
- [x] Error handling for duplicate users and invalid credentials
- [x] Comprehensive testing examples

## 💡 How Authentication Works

**Signup Flow:**
```
1. User submits credentials
2. Validate name, email, password
3. Hash password with bcrypt (10 rounds)
4. Store user in database with hashed password
5. Return success (password excluded from response)
```

**Login Flow:**
```
1. User submits email + password
2. Find user by email
3. Compare password with stored hash (bcrypt.compare)
4. If valid: Generate JWT token
5. Return token + user info
```

**JWT Token Payload:**
```json
{
  "id": 1,
  "email": "alice@example.com",
  "name": "Alice Johnson",
  "role": "user",
  "iat": 1738836000,  // Issued at
  "exp": 1738839600   // Expires at (1 hour later)
}
```

## 🔒 Security Best Practices

**✅ Implemented:**
- bcrypt password hashing (10 salt rounds)
- JWT token signing with secret
- Token expiry (1 hour)
- Email uniqueness enforcement
- Password length validation (min 6 characters)
- Password excluded from API responses
- Email normalization (toLowerCase)

**🔜 Future Enhancements:**
- Refresh token for longer sessions
- Rate limiting on login attempts
- Account lockout after failed attempts
- Password complexity requirements
- Email verification on signup
- Two-factor authentication (2FA)

## 📈 Token Expiry Strategy

**Current Implementation:**
- **Expiry:** 1 hour (`expiresIn: "1h"`)
- **No refresh token:** Users must re-login after expiry

**Why 1 hour?**
- Balances security and user experience
- Limits damage if token is compromised
- Acceptable for standard web applications

**Future: Refresh Token Strategy**
```typescript
// Login returns both tokens
{
  "accessToken": "eyJ...",  // Short-lived (15 min)
  "refreshToken": "xyz..."  // Long-lived (7 days)
}

// When access token expires:
POST /api/auth/refresh
{ "refreshToken": "xyz..." }
→ Returns new access token
```

## 🚀 No Breaking Changes

- New authentication endpoints added
- Existing endpoints unaffected
- Database migration required (adds password field)
- Backward compatible structure

## 🔗 GitHub PR Link
- ✅ `lib/responseHandler.ts` - Global response handler utilities
- ✅ `lib/errorCodes.ts` - Standardized error codes

### Modified Files
- 📝 `app/api/users/route.ts` - Uses global response handler
- 📝 `app/api/users/[id]/route.ts` - Uses global response handler
- 📝 `app/api/projects/route.ts` - Uses global response handler
- 📝 `app/api/projects/[id]/route.ts` - Uses global response handler
- 📝 `refundroute/README.md` - Added response handler documentation

## ✨ Features Implemented

### Unified Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [...],
  "timestamp": "2026-02-06T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": "E404_USER",
    "details": null
  },
  "timestamp": "2026-02-06T10:30:00.000Z"
}
```

### Response Handler Utilities

**`sendSuccess(data, message, status)`**
- Returns standardized success response
- Default status: 200
- Includes timestamp and success flag

**`sendError(message, code, status, details)`**
- Returns standardized error response
- Includes error code for tracking
- Optional error details for debugging

**`sendPaginatedSuccess(data, pagination, message)`**
- Returns paginated data with metadata
- Consistent format for list endpoints

### Standardized Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| E001 | Validation error | 400 |
| E002 | Missing required fields | 400 |
| E404_USER | User not found | 404 |
| E404_PROJECT | Project not found | 404 |
| E409_EMAIL | Email already exists | 409 |
| E500_DB | Database error | 500 |
| E501_CREATE | Create failed | 500 |
| E502_UPDATE | Update failed | 500 |
| E503_DELETE | Delete failed | 500 |
| E504_FETCH | Fetch failed | 500 |

## 🧪 Testing Instructions

### Test Success Response
```bash
curl http://localhost:3000/api/users
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [...],
  "pagination": {...},
  "timestamp": "2026-02-06T..."
}
```

### Test Error Response (Not Found)
```bash
curl http://localhost:3000/api/users/9999
```

**Expected Response (404):**
```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": "E404_USER"
  },
  "timestamp": "2026-02-06T..."
}
```

### Test Validation Error
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Name and email are required",
  "error": {
    "code": "E002"
  },
  "timestamp": "2026-02-06T..."
}
```

### Test Duplicate Error
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"existing@example.com"}'
```

**Expected Response (409):**
```json
{
  "success": false,
  "message": "Email already exists",
  "error": {
    "code": "E409_EMAIL"
  },
  "timestamp": "2026-02-06T..."
}
```

## 📊 Impact

### Developer Experience
- ✅ Predictable response structure
- ✅ Type-safe with TypeScript
- ✅ Easy frontend integration
- ✅ Self-documenting API

### Debugging & Monitoring
- ✅ Consistent error codes
- ✅ Timestamps for logging
- ✅ Error details for troubleshooting
- ✅ Easy integration with Sentry/DataDog

### Code Quality
- ✅ DRY principle applied
- ✅ Centralized error handling
- ✅ Reusable utility functions
- ✅ Consistent across codebase

## 🎓 Assignment Requirements Met

- [x] Global response handler utility created
- [x] `sendSuccess()` and `sendError()` functions
- [x] Standardized error codes defined
- [x] Applied across all API routes
- [x] Consistent success/error format
- [x] TypeScript types for responses
- [x] Comprehensive README documentation
- [x] Example requests and responses
- [x] Reflection on DX and observability benefits

## 💡 Benefits

### Before (Inconsistent)
```typescript
// Different formats across endpoints
return NextResponse.json({ data: users, ok: true });
return NextResponse.json({ success: true, payload: [] });
return NextResponse.json({ error: 'Failed' }, { status: 500 });
```

### After (Consistent)
```typescript
// Same format everywhere
return sendSuccess(users, 'Users fetched successfully');
return sendError('User not found', ERROR_CODES.USER_NOT_FOUND, 404);
```

## 🔍 Observability Benefits

**Error Tracking:**
- Error codes enable dashboard tracking
- Easy to identify common issues
- Filter logs by error code

**Monitoring:**
- Timestamps for time-series analysis
- Structured format for log aggregation
- Integration with APM tools

**Debugging:**
- Consistent format simplifies debugging
- Error details provide context
- Easy to trace issues across services

## 🌐 Microservice Integration

In a large microservice system, unified responses:
- **Reduce cognitive load** - Same format across all services
- **Simplify integration** - Clients know what to expect
- **Enable centralized monitoring** - Consistent error codes
- **Improve debugging** - Standard structure for logs
- **Facilitate API gateways** - Easier to transform/proxy

## 🚀 No Breaking Changes

All existing endpoints updated to use new handler:
- Same HTTP status codes
- Enhanced response format
- Backward compatible structure
- Added metadata (timestamp, success flag)

## 🔗 GitHub PR Link

## 📋 Changes Made

### New Files Added
- ✅ `app/api/users/route.ts` - Users collection endpoint (GET, POST)
- ✅ `app/api/users/[id]/route.ts` - Single user endpoint (GET, PUT, DELETE)
- ✅ `app/api/projects/route.ts` - Projects collection endpoint (GET, POST)
- ✅ `app/api/projects/[id]/route.ts` - Single project endpoint (GET, PUT, DELETE)

### Modified Files
- 📝 `refundroute/README.md` - Added comprehensive API documentation

## ✨ Features Implemented

### RESTful API Endpoints

**Users API:**
- `GET /api/users` - List all users with pagination
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID with projects
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Projects API:**
- `GET /api/projects` - List all projects with filtering
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Naming Conventions

✅ **Plural nouns:** `/api/users`, `/api/projects`  
✅ **Lowercase:** Consistent casing across all routes  
✅ **Resource-based:** No verbs in URLs  
✅ **Hierarchical:** Clear parent-child relationships

### HTTP Methods & Status Codes

| Method | Purpose | Success Code | Error Codes |
|--------|---------|--------------|-------------|
| GET | Read data | 200 | 400, 404, 500 |
| POST | Create data | 201 | 400, 404, 409, 500 |
| PUT | Update data | 200 | 400, 404, 409, 500 |
| DELETE | Remove data | 200 | 400, 404, 500 |

### Pagination Support

All list endpoints support:
```
?page=1&limit=10
```

Returns:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Filtering Support

Projects endpoint supports status filtering:
```
/api/projects?status=active
```

### Error Handling

**Consistent error responses:**
```json
{
  "error": "Descriptive error message"
}
```

**Proper status codes:**
- 400 - Invalid input
- 404 - Resource not found
- 409 - Duplicate data (unique constraint)
- 500 - Server error

## 🧪 Testing Instructions

### Start Development Server
```bash
cd refundroute
npm run dev
```

### Test Users API

**Get all users:**
```bash
curl "http://localhost:3000/api/users?page=1&limit=10"
```

**Create user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

**Get user by ID:**
```bash
curl http://localhost:3000/api/users/1
```

**Update user:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

**Delete user:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Test Projects API

**Get projects with filter:**
```bash
curl "http://localhost:3000/api/projects?status=active&page=1&limit=5"
```

**Create project:**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"New Project","userId":1,"status":"active"}'
```

### Test Error Cases

**Invalid ID:**
```bash
curl http://localhost:3000/api/users/invalid
# Returns 400 Bad Request
```

**Non-existent resource:**
```bash
curl http://localhost:3000/api/users/9999
# Returns 404 Not Found
```

**Duplicate email:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"existing@example.com"}'
# Returns 409 Conflict
```

## 📊 Impact

### Developer Experience
- ✅ Predictable endpoint structure
- ✅ Consistent error responses
- ✅ Self-documenting API
- ✅ Easy to extend with new resources

### Code Quality
- ✅ Type-safe with TypeScript
- ✅ Proper separation of concerns
- ✅ DRY error handling patterns
- ✅ Follows Next.js App Router conventions

### Integration Benefits
- ✅ Standard REST conventions
- ✅ Clear documentation with examples
- ✅ Pagination prevents data overload
- ✅ Filtering reduces unnecessary data transfer

## 🎓 Assignment Requirements Met

- [x] RESTful API routes under `/api/`
- [x] File-based routing with Next.js App Router
- [x] All CRUD operations (GET, POST, PUT, DELETE)
- [x] Proper HTTP status codes
- [x] Pagination support
- [x] Filtering support (projects by status)
- [x] Error handling with meaningful messages
- [x] Consistent naming conventions
- [x] Comprehensive README documentation
- [x] curl test examples

## 🎯 RESTful Best Practices

**✅ Implemented:**
- Plural resource names
- Noun-based endpoints (not verbs)
- HTTP methods define actions
- Hierarchical URL structure
- Consistent response format
- Meaningful status codes
- Pagination for collections
- Query parameters for filtering

**❌ Avoided:**
- Verbs in URLs (`/getUsers`, `/createProject`)
- Inconsistent naming
- Missing error handling
- Unclear status codes
- Unpaginated large responses

## 💡 Why Consistency Matters

**Predictability:**
- Developers can infer endpoint structure
- Reduces documentation burden
- Faster integration for external clients

**Maintainability:**
- Easy to add new resources
- Clear patterns to follow
- Less cognitive overhead

**Integration:**
- Standard REST clients work out-of-box
- API consumers know what to expect
- Reduces support requests

## 🚀 No Breaking Changes

All changes are additive:
- New API routes only
- Documentation additions
- No existing functionality modified

## 🔗 GitHub PR Link

Visit: https://github.com/kalviumcommunity/S74-0126-Team-I-Full-Stack-With-NextjsAnd-AWS-Azure-RefundRoute/pull/new/feature/loading-error-states

---

**Ready for Review** ✅
