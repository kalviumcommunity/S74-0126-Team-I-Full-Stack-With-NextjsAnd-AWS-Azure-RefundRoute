/**
 * Email Service Utility
 * 
 * Centralized email sending service using SendGrid.
 * Handles email delivery with proper error handling and logging.
 */

import sendgrid from "@sendgrid/mail";
import { logger } from "../logger";

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER = process.env.SENDGRID_SENDER || "no-reply@refundroute.com";

if (SENDGRID_API_KEY) {
  sendgrid.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn("⚠️  SENDGRID_API_KEY not configured. Email functionality will fail.");
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send email using SendGrid
 * @param options - Email configuration options
 * @returns Success status and message ID
 */
export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    if (!SENDGRID_API_KEY) {
      logger.error("SendGrid API key not configured");
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    const emailData = {
      to: options.to,
      from: options.from || SENDGRID_SENDER,
      subject: options.subject,
      html: options.html,
    };

    logger.info("Sending email", {
      to: options.to,
      subject: options.subject,
      from: emailData.from,
    });

    const response = await sendgrid.send(emailData);
    const messageId = response[0].headers["x-message-id"];

    logger.info("Email sent successfully", {
      to: options.to,
      messageId,
      statusCode: response[0].statusCode,
    });

    return {
      success: true,
      messageId: messageId as string,
    };
  } catch (error: any) {
    // Parse SendGrid error
    const errorMessage = error?.response?.body?.errors?.[0]?.message || error.message;
    const statusCode = error?.code || error?.response?.statusCode;

    logger.error("Email send failed", {
      to: options.to,
      error: errorMessage,
      statusCode,
      details: error?.response?.body,
    });

    return {
      success: false,
      error: errorMessage || "Failed to send email",
    };
  }
}

/**
 * Send bulk emails (up to 100 recipients)
 * @param emails - Array of email options
 * @returns Array of results for each email
 */
export async function sendBulkEmails(
  emails: EmailOptions[]
): Promise<{ success: boolean; messageId?: string; error?: string }[]> {
  const results = await Promise.allSettled(
    emails.map((email) => sendEmail(email))
  );

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      logger.error("Bulk email failed", {
        to: emails[index].to,
        error: result.reason,
      });
      return {
        success: false,
        error: result.reason?.message || "Unknown error",
      };
    }
  });
}

/**
 * Verify SendGrid configuration
 * @returns Configuration status
 */
export function verifyEmailConfig(): {
  configured: boolean;
  sender?: string;
  error?: string;
} {
  if (!SENDGRID_API_KEY) {
    return {
      configured: false,
      error: "SENDGRID_API_KEY environment variable not set",
    };
  }

  if (!SENDGRID_SENDER) {
    return {
      configured: false,
      error: "SENDGRID_SENDER environment variable not set",
    };
  }

  return {
    configured: true,
    sender: SENDGRID_SENDER,
  };
}
