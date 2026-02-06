# Pull Request: Authentication APIs (Signup / Login)

## 🎯 Assignment: Authentication APIs (Signup / Login)

This PR implements secure user authentication using bcrypt for password hashing and JWT (JSON Web Token) for session management in Next.js.

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
