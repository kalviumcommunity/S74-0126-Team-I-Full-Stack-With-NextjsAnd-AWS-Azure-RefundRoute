# 🚌 RefundRoute  
### A Transparent Intercity Bus Ticket Cancellation & Refund System

---

## 📌 Problem Statement

Intercity bus ticket cancellations and refunds are often opaque, delayed, and inconsistent, leading to mistrust between passengers, operators, and platforms. Users lack clarity on refund status, timelines, and accountability, while operators follow non-standard processes.

**How can an open, transparent system bring trust and accountability to public transport?**

---

## 🎯 Project Goal

RefundRoute aims to build a transparent, auditable, and user-friendly platform that standardizes intercity bus ticket cancellations and refunds by:

Making refund policies clear and visible  
Providing real-time refund status tracking  
Ensuring accountability through immutable logs  
Building trust between passengers, operators, and platforms  

---

## 💡 Proposed Solution

RefundRoute is a web-based platform that:

Allows users to request ticket cancellations  
Automatically calculates refund eligibility based on policy  
Tracks refund progress step-by-step  
Stores refund actions in tamper-proof audit logs  
Provides dashboards for both users and operators  

---

## ✨ Key Features

### 👤 Passenger Features
Ticket lookup using PNR / Booking ID  
Clear display of cancellation & refund policy  
Refund amount calculation before confirmation  
Real-time refund status tracker  
  (Requested → Approved → Processed → Credited)  
Email notifications for each status update  

### 🏢 Operator Features
Operator dashboard to view cancellation requests  
Approve / reject refunds with justification  
Configure refund policies (time-based rules)  
View refund processing history  

### 🔍 Transparency & Trust
Fully visible refund timeline  
Immutable audit logs for every action  
No hidden deductions or silent delays  

---

## 🧠 System Architecture Overview

**Frontend**: Next.js (React)  
**Backend APIs**: Next.js API Routes  
**Database**: MongoDB (AWS)  
**Authentication**: JWT / NextAuth  
**Audit Logs**: Azure Blob Storage (read-only logs)  
**Hosting**:  
  - Frontend & APIs → AWS  
  - Logs & backups → Azure  
**Notifications**: AWS SES / Azure Communication Services  

---

## 🛠 Tech Stack

### Frontend
Next.js 14  
TypeScript  
Tailwind CSS  
ShadCN UI  

### Backend
Node.js  
Next.js API Routes  
RESTful APIs  

### Database
MongoDB Atlas (AWS region)  

### Cloud & DevOps
AWS EC2 / Amplify  
AWS S3 (documents & receipts)  
Azure Blob Storage (audit logs)  
GitHub Actions (CI/CD)  

---

## 👥 Team Roles & Responsibilities

| Role | Responsibility |
|---|---|
| Frontend Developer | UI design, dashboards, user flows |
| Backend Developer | APIs, refund logic, validation |
| Cloud Engineer | AWS & Azure deployment |
| QA / Tester | Testing, edge cases, validation |
| Project Lead | Sprint planning & integration |

---

## 🗓 4-Week Sprint Timeline

### Week 1 – Planning & Setup
Requirement analysis & user flows  
Wireframes (low-fidelity)  
Project setup with Next.js  
Database schema design  
Cloud environment setup (AWS & Azure)  

**Deliverables**
Project structure  
API contracts  
Database schema  

---

### Week 2 – Core Functionality
Ticket lookup & cancellation request  
Refund eligibility calculation  
Passenger dashboard  
Operator dashboard (basic)  

**Deliverables**
Functional cancellation flow  
Refund computation logic  

---

### Week 3 – Transparency & Integrations
Refund status tracking  
Audit log creation  
Azure Blob Storage integration  
Email notification system  

**Deliverables**
End-to-end refund tracking  
Immutable audit logs  

---

### Week 4 – Testing & Deployment
UI refinement  
Edge case handling  
Manual & unit testing  
Deployment on AWS  
Documentation & demo preparation  

**Deliverables**
Live deployed application  
Final README & demo video  

---

## 📊 Measurable Success Criteria

| Metric | Target |
|---|---|
| Refund status visibility | 100% transparent |
| Refund calculation accuracy | 100% rule-based |
| User clarity | No hidden steps |
| API response time | < 500ms |
| System uptime | ≥ 99% |
| Refund request completion time | < 3 minutes |

---

## 🔐 Security & Reliability

JWT-based authentication  
Role-based access control  
Secure API endpoints  
Encrypted sensitive data  
Read-only audit logs for accountability  

---

## 🚀 Future Enhancements

Instant UPI refunds  
Regulator / government monitoring dashboard  
Multi-operator onboarding  
Blockchain-backed refund ledger  
Mobile app using React Native  

---

## 📂 Folder Structure


/app

/api

/dashboard

/operator

/lib

/models

/utils

/public

---

## 🧾 Conclusion

RefundRoute introduces trust, clarity, and accountability into intercity bus ticket cancellations and refunds by combining transparent policies, real-time tracking, and immutable audit logs—creating a passenger-first public transport ecosystem.
---

## 🛣️ Page Routing and Dynamic Routes

RefundRoute implements a comprehensive routing architecture using Next.js 13+ App Router, featuring public routes, protected routes with middleware authentication, and dynamic parameter-based routes for scalable user experiences.

### 📋 Route Map

#### Public Routes (No Authentication Required)
| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing page with feature overview and navigation |
| `/login` | `app/login/page.tsx` | Authentication page with mock JWT generation |

#### Protected Routes (Requires Valid JWT Token)
| Route | File | Description |
|-------|------|-------------|
| `/dashboard` | `app/dashboard/page.tsx` | User dashboard with stats and quick actions |
| `/users/[id]` | `app/users/[id]/page.tsx` | Dynamic user profile pages (e.g., /users/1, /users/2) |
| `/refunds/*` | TBD | Future refund management routes |

#### Error Handling
| Route | File | Description |
|-------|------|-------------|
| Any invalid route | `app/not-found.tsx` | Custom 404 page with navigation suggestions |

---

### 🔐 Middleware Implementation

RefundRoute uses Next.js middleware to protect sensitive routes with JWT authentication:

**File:** `middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (pathname === "/" || pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Protect private routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/users")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("error", "invalid_token");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};
```

**Key Features:**
- ✅ JWT verification before accessing protected routes
- ✅ Automatic redirect to `/login` for unauthenticated users
- ✅ Redirect parameter preservation (returns user to intended page after login)
- ✅ Error state handling for invalid/expired tokens

---

### 🎯 Dynamic Routing with [id] Segments

Dynamic routes allow RefundRoute to render unique pages for each user without creating individual files.

**File:** `app/users/[id]/page.tsx`

```typescript
interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: Props) {
  const { id } = await params;

  const userData = {
    id,
    name: `User ${id}`,
    email: `user${id}@refundroute.com`,
    // ... more user data
  };

  return (
    <main>
      <nav className="breadcrumb">
        <Link href="/">Home</Link> > 
        <Link href="/dashboard">Dashboard</Link> > 
        <span>User {id}</span>
      </nav>
      
      <h1>User Profile</h1>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
    </main>
  );
}
```

**Benefits:**
- 📈 **Scalability:** Handle unlimited users without creating new files
- 🔍 **SEO:** Each URL (`/users/1`, `/users/2`) is indexable by search engines
- 🧭 **Breadcrumbs:** Improve navigation and user experience
- ⚡ **Performance:** Server-side rendering with automatic metadata generation

---

### 📊 Layout & Navigation

**Global Navigation Bar** (`app/layout.tsx`):

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="navigation-bar">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/users/1">Users</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: "RefundRoute - Streamline Your Refund Management",
  description: "Professional refund management platform with dynamic routing...",
  keywords: ["refunds", "payments", "dashboard", "Next.js"],
  openGraph: { title: "RefundRoute", type: "website" },
};
```

---

### 🧪 Testing Routing Behavior

#### Test 1: Public Route Access
```bash
# Visit home page (no authentication required)
curl http://localhost:3000/
# ✅ Expected: 200 OK, renders landing page
```

#### Test 2: Protected Route Without Token
```bash
# Try accessing dashboard without logging in
curl http://localhost:3000/dashboard
# ✅ Expected: 307 Redirect to /login?redirect=/dashboard
```

#### Test 3: Login Flow
```bash
# 1. Visit /login
# 2. Click "Login (Demo)" button
# 3. Token set in cookies: Cookies.set("token", "mock.jwt.token")
# 4. Redirect to /dashboard
# ✅ Expected: Dashboard renders with protected content
```

#### Test 4: Dynamic Routes
```bash
# Visit different user profiles
http://localhost:3000/users/1  # User 1
http://localhost:3000/users/2  # User 2
http://localhost:3000/users/99 # User 99
# ✅ Expected: Each renders unique content based on [id] parameter
```

#### Test 5: 404 Error Handling
```bash
# Visit non-existent route
curl http://localhost:3000/nonexistent-page
# ✅ Expected: Custom 404 page with navigation links
```

---

### 📸 Screenshots Evidence

#### 1. **Home Page (Public Route)**
![Home Page](screenshots/home-page.png)
- Displays welcome message and feature list
- Navigation links to login and dashboard
- Accessible without authentication

#### 2. **Login Page**
![Login Page](screenshots/login-page.png)
- Mock authentication with JWT generation
- Redirect parameter support
- Error state display for invalid tokens

#### 3. **Dashboard (Protected Route)**
![Dashboard](screenshots/dashboard.png)
- Only accessible with valid token
- Quick stats and navigation cards
- Logout functionality

#### 4. **Dynamic User Profile**
![User Profile](screenshots/user-profile.png)
- URL: `/users/1`, `/users/2`, etc.
- Breadcrumb navigation for SEO
- Mock user data display

#### 5. **Redirect Behavior**
![Login Redirect](screenshots/redirect-flow.png)
- User tries accessing `/dashboard` without token
- Middleware redirects to `/login?redirect=/dashboard`
- After login, redirects back to `/dashboard`

#### 6. **Custom 404 Page**
![404 Page](screenshots/404-page.png)
- User-friendly error message
- Navigation suggestions
- Branded design

---

### 🎨 Creative Reflection: SEO & Routing Best Practices

#### How Dynamic Routing Improves SEO

**1. Indexable URLs**
- Each user profile (`/users/1`, `/users/2`) is a unique URL
- Search engines crawl and index individual pages
- Example: Google can index "User 1 Profile - RefundRoute"

**2. Metadata Generation**
```typescript
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `User ${id} Profile | RefundRoute`,
    description: `View profile and refund history for User ${id}`,
  };
}
```
- Each page gets unique `<title>` and `<meta>` tags
- Improves click-through rates in search results

**3. Breadcrumb Navigation**
```
Home > Dashboard > User 1
```
- Structured data for search engines
- Improves user experience and session duration
- Reduces bounce rates

#### E-Commerce & Dashboard Applications

**Question:** *How can dynamic routing and metadata generation improve user experience and SEO for an e-commerce site or dashboard?*

**Answer:**

**For E-Commerce Platforms:**
- **Product Pages:** `/products/[id]` allows unlimited products without creating files
  - SEO: Each product indexed separately (e.g., "Nike Air Max 90 - Buy Now")
  - UX: Clean URLs like `/products/nike-air-max-90` instead of `/product?id=12345`

- **Category Pages:** `/category/[slug]` for dynamic filtering
  - SEO: Category-specific metadata ("Men's Running Shoes - Free Shipping")
  - UX: Breadcrumbs like `Home > Men > Running Shoes > Nike Air Max`

- **Performance:** Server-side rendering (SSR) ensures fast initial load
  - Search engines see fully rendered content
  - Users see products immediately, reducing bounce rate

**For Dashboard Applications:**
- **User Management:** `/users/[id]` scales from 10 to 10,000 users
  - Admin can bookmark specific user profiles
  - Direct links in email notifications (e.g., "View User 1234's Activity")

- **Analytics Pages:** `/reports/[date]` for time-based data
  - SEO: Less critical, but metadata helps internal search
  - UX: Users can share specific report URLs with team members

- **Audit Logs:** `/logs/[transactionId]` for compliance
  - Direct linking to specific transactions
  - Improves investigability during disputes

**RefundRoute Application:**
- **Refund Tracking:** Future `/refunds/[ticketId]` routes
  - Customers receive email: "Track your refund: refundroute.com/refunds/ABC123"
  - SEO: Public refund status pages build trust (if anonymized)
  - UX: One-click access from email or SMS notification

**Combined Benefits:**
- 📈 **Scalability:** Handle millions of entities without file bloat
- 🔍 **Discoverability:** Search engines index every page
- ⚡ **Performance:** Pre-rendering + caching for instant loads
- 🧭 **Navigation:** Breadcrumbs reduce "back button" fatigue
- 📊 **Analytics:** Track which pages users visit most

---

### 🔧 Error Handling Strategy

#### Route-Level Error States

**1. Authentication Errors** (Middleware)
```typescript
// Invalid token → Redirect with error parameter
const loginUrl = new URL("/login", req.url);
loginUrl.searchParams.set("error", "invalid_token");
return NextResponse.redirect(loginUrl);
```
- Display error message: "Your session expired. Please log in again."
- Preserve intended destination for post-login redirect

**2. Not Found Errors** (404 Page)
- Custom `app/not-found.tsx` provides branded experience
- Suggests valid routes instead of generic browser error
- Reduces user frustration and abandonment

**3. Dynamic Route Errors** (Invalid IDs)
- Future enhancement: Validate `[id]` parameter
- If user doesn't exist, return `notFound()` function
- Example: `/users/99999` → Custom "User not found" message

#### Graceful Degradation
- **No JavaScript:** Links still work (server-rendered)
- **Slow Network:** Loading states in login page
- **Invalid Tokens:** Clear error messages instead of blank screens

---

### 🏗️ Architecture Decisions

#### Why App Router Over Pages Router?

**App Router Advantages:**
1. **Layouts:** Shared UI components without prop drilling
2. **Middleware:** Built-in route protection at edge level
3. **Metadata API:** Automatic SEO optimization
4. **Server Components:** Faster initial page loads
5. **Streaming:** Progressive rendering for large pages

**Migration Path:**
- RefundRoute started with App Router from day 1
- Existing projects can incrementally adopt (`app/` alongside `pages/`)

#### Why Middleware for Authentication?

**Alternative: Per-Page Auth Checks**
```typescript
// ❌ Repetitive approach
export default function Dashboard() {
  const token = cookies().get("token");
  if (!token) redirect("/login");
  // ... render dashboard
}
```

**✅ Middleware Centralization:**
- Single source of truth for auth logic
- Runs before page render (faster redirects)
- Easier to audit and maintain
- Works at edge (Vercel Edge Functions)

---

### 📦 Dependencies

**Added for Routing Feature:**
```json
{
  "dependencies": {
    "js-cookie": "^3.0.5",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "@types/js-cookie": "^3.0.6",
    "@types/jsonwebtoken": "^9.0.7"
  }
}
```

**Usage:**
- `js-cookie`: Client-side cookie management in login page
- `jsonwebtoken`: JWT verification in middleware

---

### 🚀 Future Enhancements

1. **Server-Side Session Validation**
   - Replace mock tokens with real backend authentication
   - Validate tokens against database on each request

2. **Role-Based Route Protection**
   - Admin routes: `/admin/[section]`
   - Operator routes: `/operator/dashboard`
   - User routes: `/users/[id]` (own profile only)

3. **Internationalization (i18n)**
   - Dynamic routes: `/en/users/[id]`, `/es/users/[id]`
   - SEO for multiple languages

4. **Advanced Error Pages**
   - `app/error.tsx` for runtime errors
   - `app/[...catchAll]/page.tsx` for wildcard routes

5. **Analytics Integration**
   - Track which routes users visit most
   - Identify navigation drop-off points

---

### 📚 Key Takeaways

✅ **Routing is Invisible:** Great routing design feels seamless to users
✅ **Middleware Scales:** Centralized auth logic prevents duplication
✅ **Dynamic Routes Power Apps:** One file serves unlimited entities
✅ **SEO Matters:** Metadata and breadcrumbs improve discoverability
✅ **Errors Are Opportunities:** Custom 404 pages reduce abandonment

**Pro Tip:** *"Users should never wonder where they are or how they got there. Breadcrumbs, clear navigation, and error messages create confidence."*

---