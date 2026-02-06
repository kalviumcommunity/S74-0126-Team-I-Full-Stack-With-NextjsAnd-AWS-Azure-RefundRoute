/**
 * Email Templates
 * 
 * Reusable HTML email templates for transactional emails.
 * All templates follow consistent branding and structure.
 */

/**
 * Welcome Email Template
 * Sent when a new user signs up
 */
export const welcomeTemplate = (userName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to RefundRoute</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #4F46E5;
      margin-bottom: 10px;
    }
    h1 {
      color: #1F2937;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .content {
      color: #4B5563;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E5E7EB;
      color: #6B7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎫 RefundRoute</div>
    </div>
    
    <h1>Welcome to RefundRoute, ${userName}! 🎉</h1>
    
    <div class="content">
      <p>We're thrilled to have you on board! You've just joined a platform designed to make refund management simple, efficient, and transparent.</p>
      
      <p><strong>What you can do now:</strong></p>
      <ul>
        <li>Create and track refund requests</li>
        <li>Manage your projects seamlessly</li>
        <li>Collaborate with your team</li>
        <li>Access real-time refund analytics</li>
      </ul>
      
      <p>Ready to get started?</p>
      
      <center>
        <a href="https://app.refundroute.com/dashboard" class="cta-button">Go to Dashboard</a>
      </center>
    </div>
    
    <div class="footer">
      <p>This is an automated email. Please do not reply to this message.</p>
      <p>If you have any questions, contact us at <a href="mailto:support@refundroute.com">support@refundroute.com</a></p>
      <p>&copy; 2026 RefundRoute. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Password Reset Email Template
 * Sent when user requests password reset
 */
export const passwordResetTemplate = (userName: string, resetLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #4F46E5;
      margin-bottom: 10px;
    }
    h1 {
      color: #1F2937;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .content {
      color: #4B5563;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      background-color: #EF4444;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 20px 0;
    }
    .alert {
      background-color: #FEF2F2;
      border-left: 4px solid #EF4444;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E5E7EB;
      color: #6B7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎫 RefundRoute</div>
    </div>
    
    <h1>Password Reset Request</h1>
    
    <div class="content">
      <p>Hi ${userName},</p>
      
      <p>We received a request to reset your password for your RefundRoute account. Click the button below to create a new password:</p>
      
      <center>
        <a href="${resetLink}" class="cta-button">Reset Password</a>
      </center>
      
      <div class="alert">
        <strong>⚠️ Security Notice:</strong>
        <ul style="margin: 10px 0;">
          <li>This link expires in <strong>1 hour</strong></li>
          <li>If you didn't request this, ignore this email</li>
          <li>Never share this link with anyone</li>
        </ul>
      </div>
      
      <p style="color: #6B7280; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:<br/>
      <a href="${resetLink}" style="color: #4F46E5; word-break: break-all;">${resetLink}</a></p>
    </div>
    
    <div class="footer">
      <p>This is an automated email. Please do not reply to this message.</p>
      <p>If you have any questions, contact us at <a href="mailto:support@refundroute.com">support@refundroute.com</a></p>
      <p>&copy; 2026 RefundRoute. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Notification Email Template
 * Generic template for system notifications
 */
export const notificationTemplate = (userName: string, title: string, message: string, actionUrl?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #4F46E5;
      margin-bottom: 10px;
    }
    h1 {
      color: #1F2937;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .content {
      color: #4B5563;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E5E7EB;
      color: #6B7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎫 RefundRoute</div>
    </div>
    
    <h1>${title}</h1>
    
    <div class="content">
      <p>Hi ${userName},</p>
      
      <p>${message}</p>
      
      ${actionUrl ? `
      <center>
        <a href="${actionUrl}" class="cta-button">View Details</a>
      </center>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>This is an automated email. Please do not reply to this message.</p>
      <p>If you have any questions, contact us at <a href="mailto:support@refundroute.com">support@refundroute.com</a></p>
      <p>&copy; 2026 RefundRoute. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
