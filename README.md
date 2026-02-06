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

## 🎨 Loading States & Error Boundaries

Implemented robust loading skeletons and error boundaries for graceful async state handling.

### Features
- **Loading Skeletons** - Animated placeholders during data fetching
- **Error Boundaries** - Graceful error handling with retry functionality
- **Demo Route** - `/refunds` with simulated async data

### Files
- `app/loading.tsx`, `app/error.tsx` - Root level states
- `app/refunds/page.tsx`, `loading.tsx`, `error.tsx` - Example implementation

### Testing
1. Run `npm run dev` in the `refundroute` folder
2. Visit `/refunds` to see loading skeleton (2s delay)
3. Uncomment line 7 in `app/refunds/page.tsx` to test error state
4. Use DevTools Network throttling for realistic testing

---
