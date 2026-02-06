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

## Email Service Integration

### Overview
This application integrates **SendGrid** as a transactional email service to send automated notifications such as welcome emails, password resets, and system alerts. The implementation includes reusable HTML templates, comprehensive error handling, and production-ready logging.

### Why Transactional Emails?

Transactional emails are critical for user engagement and trust—they notify users when important events happen in your app.

| Event | Email Type | Purpose |
|-------|------------|---------|
| User signs up | Welcome email | Onboarding and engagement |
| Password reset request | Reset link | Account security |
| Payment success | Invoice confirmation | Transaction record |
| Account alert | Security notification | User awareness |

**Key Difference:** Unlike marketing emails, transactional emails are trigger-based and sent automatically by your backend.

### Provider: SendGrid

**Why SendGrid?**
- ✅ **Free Tier:** 100 emails/day (perfect for development and small apps)
- ✅ **Easy Setup:** API key authentication (no domain verification required initially)
- ✅ **Developer Friendly:** Simple REST API with official Node.js SDK
- ✅ **Deliverability:** Built-in spam filter compliance and bounce handling
- ✅ **Analytics:** Email open rates, click tracking, bounce monitoring

**Alternative:** AWS SES (pay-per-email, requires domain verification, better for high volume)

### Setup and Configuration

#### 1. Create SendGrid Account
1. Visit [sendgrid.com](https://sendgrid.com) and create a free account
2. Navigate to **Settings → Sender Authentication**
3. Verify your sender email (e.g., `no-reply@yourdomain.com`)
4. Go to **Settings → API Keys** → **Create API Key**
5. Select **Full Access** → Copy the API key

#### 2. Configure Environment Variables

Create `.env.local` in your project root:

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_SENDER=no-reply@refundroute.com
```

**Security Note:** Never commit API keys to version control. Add `.env.local` to `.gitignore`.

#### 3. Install Dependencies

```bash
npm install @sendgrid/mail
```

### Components

#### 1. Email Templates (`lib/email/templates.ts`)

Three production-ready HTML email templates with consistent branding:

##### Welcome Email Template
```typescript
import { welcomeTemplate } from "@/lib/email/templates";

const html = welcomeTemplate("Alice");
// Generates styled HTML with logo, CTA button, and footer
```

**Features:**
- Responsive design (mobile-friendly)
- Brand colors and typography
- Clear call-to-action (CTA) button
- Professional footer with contact info

##### Password Reset Template
```typescript
import { passwordResetTemplate } from "@/lib/email/templates";

const html = passwordResetTemplate("Bob", "https://app.refundroute.com/reset?token=abc123");
```

**Features:**
- Security warnings (link expires in 1 hour)
- Prominent reset button
- Fallback link (if button doesn't work)
- Alert box for security notice

##### Notification Template
```typescript
import { notificationTemplate } from "@/lib/email/templates";

const html = notificationTemplate(
  "Charlie",
  "Refund Approved",
  "Your refund request #1234 has been approved and will be processed within 3-5 business days.",
  "https://app.refundroute.com/refunds/1234"
);
```

**Features:**
- Generic structure for any notification
- Optional action URL
- Customizable title and message

#### 2. Email Service (`lib/email/sendEmail.ts`)

Centralized email sending utility with error handling:

```typescript
import { sendEmail } from "@/lib/email/sendEmail";

const result = await sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  html: welcomeTemplate("Alice"),
});

if (result.success) {
  console.log("Email sent:", result.messageId);
} else {
  console.error("Email failed:", result.error);
}
```

**Features:**
- ✅ Automatic SendGrid initialization
- ✅ Error parsing (extracts meaningful error messages)
- ✅ Structured logging with metadata
- ✅ Configuration verification
- ✅ Bulk email support (up to 100 recipients)

#### 3. Email API Route (`app/api/email/route.ts`)

RESTful endpoint for sending emails:

```typescript
POST /api/email
```

**Request Body (Custom Message):**
```json
{
  "to": "user@example.com",
  "subject": "Custom Subject",
  "message": "<h3>Custom HTML content</h3>"
}
```

**Request Body (Template-Based):**
```json
{
  "to": "user@example.com",
  "template": "welcome",
  "templateData": {
    "userName": "Alice"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "01010189b2example123",
  "recipient": "user@example.com",
  "subject": "Welcome to RefundRoute!"
}
```

**Response (Error - Not Configured):**
```json
{
  "success": false,
  "error": "Email service not configured. Please set SENDGRID_API_KEY and SENDGRID_SENDER environment variables."
}
```

**Available Templates:**
- `welcome` - Requires: `userName`
- `password-reset` - Requires: `userName`, `resetLink`
- `notification` - Requires: `userName`, `title`, `message`, optional `actionUrl`

### Testing Instructions

#### 1. Check Configuration Status

```bash
curl -X GET http://localhost:3000/api/email
```

**Expected Response:**
```json
{
  "success": true,
  "configured": true,
  "sender": "no-reply@refundroute.com",
  "availableTemplates": ["welcome", "password-reset", "notification"]
}
```

#### 2. Send Welcome Email

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "template": "welcome",
    "templateData": {
      "userName": "Alice"
    }
  }'
```

**Expected Console Log:**
```json
{"level":"info","message":"Sending email","meta":{"to":"your-email@example.com","subject":"Welcome to RefundRoute!","from":"no-reply@refundroute.com"},"timestamp":"2026-02-06T10:30:00.000Z"}
{"level":"info","message":"Email sent successfully","meta":{"to":"your-email@example.com","messageId":"01010189b2example123","statusCode":202},"timestamp":"2026-02-06T10:30:01.000Z"}
```

**Expected Email:**
- **Subject:** Welcome to RefundRoute!
- **From:** no-reply@refundroute.com
- **Body:** Styled HTML with logo, greeting, feature list, CTA button

#### 3. Send Password Reset Email

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "template": "password-reset",
    "templateData": {
      "userName": "Bob",
      "resetLink": "https://app.refundroute.com/reset?token=abc123xyz"
    }
  }'
```

**Expected Email:**
- **Subject:** Password Reset Request
- **Body:** Security warning, reset button, expiration notice

#### 4. Send Custom Email

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "message": "<h2>Hello from RefundRoute!</h2><p>This is a test email 🚀</p>"
  }'
```

### Sandbox vs Production Configuration

#### Sandbox Mode (SendGrid Free Tier)

**Limitations:**
- ✅ **100 emails/day** - Sufficient for development and small apps
- ✅ **Single sender verification** - Only verified email can send
- ✅ **No recipient restrictions** - Can send to any email address
- ❌ **No custom domain** - Emails sent from personal domain (may land in spam)

**Best For:**
- Development and testing
- MVP/proof-of-concept projects
- Low-volume applications (<100 emails/day)

#### Production Mode (SendGrid Paid Tier)

**Features:**
- ✅ **Higher limits** - 40,000-100,000+ emails/month (depending on plan)
- ✅ **Domain authentication** - SPF/DKIM records for better deliverability
- ✅ **Dedicated IP** - Improved sender reputation
- ✅ **Advanced analytics** - Open rates, click tracking, bounce details
- ✅ **Webhook integration** - Real-time delivery/bounce notifications

**Migration Checklist:**
1. Verify custom domain (DNS records for SPF/DKIM/DMARC)
2. Set up IP warming (gradually increase send volume)
3. Configure bounce webhook (handle hard/soft bounces)
4. Enable link tracking (monitor email engagement)
5. Implement rate limiting (avoid sudden spikes)

### Rate Limiting and Retry Logic

#### SendGrid Rate Limits

| Tier | Limit | Recommended Strategy |
|------|-------|---------------------|
| **Free** | 100/day | Queue emails, send important ones first |
| **Essentials** | 40,000/month | Implement exponential backoff on 429 errors |
| **Pro** | 100,000/month | Batch emails, use separate API keys per service |

#### Handling Rate Limit Errors

```typescript
// In sendEmail.ts, already handles 429 errors
if (error.code === 429) {
  logger.warn("Rate limit exceeded", { retryAfter: error.headers['retry-after'] });
  // Implement queue or delay retry
}
```

**Production Strategy:**
1. **Queue System:** Use Redis queue (Bull/BullMQ) to batch emails
2. **Retry with Backoff:** Retry failed emails after 1min, 5min, 15min
3. **Prioritization:** Send critical emails (password resets) before marketing
4. **Monitoring:** Alert on queue size >1000 or failure rate >5%

### Bounce Handling

#### Types of Bounces

| Type | Meaning | Action |
|------|---------|--------|
| **Hard Bounce** | Email address doesn't exist | Remove from database immediately |
| **Soft Bounce** | Temporary issue (full inbox) | Retry up to 3 times, then remove |
| **Block** | Recipient marked as spam | Stop sending, review email content |
| **Dropped** | Suppressed (previous bounce) | Already on suppression list |

#### Implementing Bounce Handling

**1. SendGrid Webhook (Recommended for Production):**

```typescript
// app/api/webhooks/sendgrid/route.ts
export async function POST(req: Request) {
  const events = await req.json();
  
  for (const event of events) {
    if (event.event === 'bounce' || event.event === 'dropped') {
      // Mark user email as invalid in database
      await prisma.user.update({
        where: { email: event.email },
        data: { emailValid: false },
      });
      
      logger.warn("Email bounced", { email: event.email, reason: event.reason });
    }
  }
  
  return NextResponse.json({ success: true });
}
```

**2. SendGrid Dashboard Monitoring:**
- Go to **Statistics → Bounces** to view bounce reports
- Check **Suppressions** for automatically blocked emails
- Review bounce reasons (invalid domain, mailbox full, etc.)

**3. Proactive Email Validation:**
```typescript
// Before sending, validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return handleValidationError("Invalid email format");
}
```

### Spam Compliance and Deliverability

#### Best Practices for Avoiding Spam Filters

1. **Authenticate Your Domain (SPF/DKIM/DMARC)**
   - Add SendGrid DNS records to your domain
   - Verifies you own the sending domain
   - Major improvement in deliverability

2. **Use Verified Sender Address**
   - Never use fake or unverified "from" addresses
   - Include unsubscribe link (for marketing emails)

3. **Avoid Spam Trigger Words**
   - ❌ "FREE!", "ACT NOW!", "LIMITED TIME"
   - ✅ Professional, clear language

4. **Maintain Sender Reputation**
   - Keep bounce rate <5%
   - Handle unsubscribe requests immediately
   - Don't buy email lists (instant spam flag)

5. **Consistent Sending Patterns**
   - Don't send 0 emails for months, then 10,000 in a day
   - Gradual ramp-up (IP warming)

6. **Include Plain Text Alternative**
   ```typescript
   const emailData = {
     to: recipient,
     from: sender,
     subject: subject,
     html: htmlContent,
     text: "Plain text version", // Fallback for old email clients
   };
   ```

#### Email Headers for Better Deliverability

SendGrid automatically adds these, but verify in production:

- `List-Unsubscribe` - Allows one-click unsubscribe
- `Precedence: bulk` - Identifies bulk email (for marketing)
- `X-Mailer` - Identifies sending service

### Production Checklist

Before deploying email service to production:

- [ ] **Domain Authentication:** SPF, DKIM, DMARC records configured
- [ ] **Sender Verification:** Custom domain verified in SendGrid
- [ ] **Rate Limiting:** Queue system for high-volume sending
- [ ] **Bounce Webhook:** Automated bounce handling endpoint
- [ ] **Error Monitoring:** Alerts for failed emails >5%
- [ ] **Email Validation:** Format and existence checks before sending
- [ ] **Template Testing:** All templates tested in multiple email clients
- [ ] **Unsubscribe Link:** Added to marketing emails (legal requirement)
- [ ] **Backup Strategy:** Fallback email provider (AWS SES) if SendGrid fails
- [ ] **Logging:** All email events logged for debugging

### Reflection

**Key Learnings:**

1. **Email is Harder Than It Looks:** Simply sending an email via API is easy, but ensuring deliverability (avoiding spam, handling bounces, maintaining sender reputation) is complex. Domain authentication, SPF/DKIM records, and IP warming are critical for production systems.

2. **Templates Are Essential for Consistency:** Without reusable templates, every email looks different, and branding suffers. HTML email templates also handle cross-client compatibility (Gmail vs Outlook vs Apple Mail render differently).

3. **Error Handling is Critical:** Email failures are common (invalid addresses, rate limits, network issues). Logging every send with message ID enables debugging production issues. Without structured logging, troubleshooting "email didn't arrive" is nearly impossible.

4. **Sandbox vs Production Gap:** Free tiers work great for development, but production requires domain verification, IP warming, and monitoring. The jump from "it works on my machine" to "sending 10,000 emails/day reliably" is significant.

5. **Bounces Kill Sender Reputation:** A bounce rate >5% can get your domain blacklisted. Implementing bounce webhooks and removing invalid emails immediately is not optional—it's required for long-term deliverability.

### Creative Reflection: High-Volume Email Strategy

**Question:** "What safeguards would you implement if your app needed to send 10,000+ emails per day without getting flagged as spam or exceeding provider limits?"

**Answer:**

#### 1. **Rate Limiting with Queue System**
```typescript
// Use Bull queue with Redis
import Queue from 'bull';

const emailQueue = new Queue('emails', process.env.REDIS_URL);

// Add rate limit: max 100 emails/minute
emailQueue.process(100, async (job) => {
  await sendEmail(job.data);
});

// Usage
await emailQueue.add({ to, subject, html }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 60000 },
});
```

**Why:** Prevents sudden spikes that trigger spam filters. Queues batch emails and send at consistent rate.

#### 2. **IP Warming Strategy**
```typescript
// Gradual ramp-up over 2 weeks
const dailyLimits = [
  100,   // Day 1
  200,   // Day 2
  500,   // Day 3
  1000,  // Day 4
  2000,  // Day 5
  5000,  // Day 6-7
  10000, // Day 8+
];

// Track daily send count in Redis
const today = new Date().toISOString().split('T')[0];
const count = await redis.incr(`emails:sent:${today}`);

if (count > dailyLimits[getDaysSinceLaunch()]) {
  // Queue for tomorrow
  await emailQueue.add(emailData, { delay: 86400000 });
}
```

**Why:** New IP addresses/domains have no sender reputation. Sudden high volume = spam. Gradual increase builds reputation.

#### 3. **Bounce and Complaint Monitoring**
```typescript
// Webhook: app/api/webhooks/sendgrid/route.ts
export async function POST(req: Request) {
  const events = await req.json();
  
  for (const event of events) {
    if (event.event === 'bounce') {
      await prisma.user.update({
        where: { email: event.email },
        data: { emailValid: false },
      });
      
      await redis.incr('bounces:today');
    }
    
    if (event.event === 'spamreport') {
      // CRITICAL: User marked as spam
      await redis.incr('spam:reports:today');
      
      const spamRate = await calculateSpamRate();
      if (spamRate > 0.1) { // >0.1% = danger zone
        await alertOps("URGENT: Spam rate exceeded threshold");
        await pauseEmailSending();
      }
    }
  }
}
```

**Why:** Bounce rate >5% or spam complaints >0.1% = blacklist risk. Automated monitoring stops damage before permanent harm.

#### 4. **Email Segmentation and Prioritization**
```typescript
// Priority queue
enum EmailPriority {
  CRITICAL = 0,    // Password resets, security alerts
  HIGH = 1,        // Transactional (invoices, confirmations)
  NORMAL = 2,      // Notifications
  LOW = 3,         // Marketing, newsletters
}

await emailQueue.add(emailData, {
  priority: EmailPriority.CRITICAL,
});
```

**Why:** Critical emails (password resets) can't wait. If rate limit hit, drop marketing emails first.

#### 5. **A/B Testing and Engagement Tracking**
```typescript
// Track open rates per campaign
const campaignId = "welcome-v2";

await sendEmail({
  to,
  subject,
  html: welcomeTemplate(userName),
  customArgs: { campaignId }, // SendGrid tracking
});

// Webhook tracks opens
if (event.event === 'open') {
  await redis.incr(`campaign:${event.campaignId}:opens`);
}

// Pause low-engagement campaigns (<10% open rate)
const openRate = await calculateOpenRate(campaignId);
if (openRate < 0.10) {
  logger.warn("Low engagement campaign", { campaignId, openRate });
  // Revise content or pause sending
}
```

**Why:** Low engagement (opens <10%) signals spam filters. Stop bad campaigns before they hurt reputation.

#### 6. **Fallback Provider**
```typescript
// Primary: SendGrid, Backup: AWS SES
async function sendEmailWithFallback(emailData) {
  try {
    return await sendgrid.send(emailData);
  } catch (error) {
    if (error.code === 429 || error.code >= 500) {
      logger.warn("SendGrid failed, using AWS SES fallback");
      return await ses.send(emailData);
    }
    throw error;
  }
}
```

**Why:** Provider outages happen. Fallback ensures 99.9% email delivery SLA.

#### 7. **Content Filtering**
```typescript
// Scan for spam trigger words before sending
const spamWords = ['FREE!', 'LIMITED TIME', 'ACT NOW', 'CLICK HERE'];

function containsSpamTriggers(content: string): boolean {
  return spamWords.some(word => content.toUpperCase().includes(word));
}

if (containsSpamTriggers(subject) || containsSpamTriggers(html)) {
  logger.warn("Spam triggers detected", { subject });
  // Reject or sanitize content
}
```

**Why:** Even one email with "BUY NOW FREE VIAGRA" can blacklist your domain. Proactive filtering prevents self-sabotage.

#### Summary Table

| Safeguard | Protects Against | Implementation Effort |
|-----------|------------------|----------------------|
| **Rate limiting** | Provider limits, spam flags | Medium (requires queue) |
| **IP warming** | New sender penalties | High (2-week ramp-up) |
| **Bounce monitoring** | Blacklisting (>5% bounce) | Medium (webhook setup) |
| **Prioritization** | Critical email delays | Low (queue priority) |
| **Engagement tracking** | Low-quality campaigns | Medium (analytics setup) |
| **Fallback provider** | Service outages | Medium (multi-provider) |
| **Content filtering** | Accidental spam triggers | Low (regex scanning) |

**Conclusion:**

Sending 10,000+ emails/day isn't about raw throughput—it's about **reputation management**. One bad campaign (high bounce rate, spam complaints) can blacklist your domain permanently. The safeguards above ensure emails reach inboxes reliably while maintaining sender reputation, which is the real bottleneck at scale.

**Final Thought:** "Emails are the heartbeat of trust in digital systems—automate them carefully, monitor them consistently, and secure them relentlessly." A single unmonitored spam complaint can destroy months of reputation-building.

