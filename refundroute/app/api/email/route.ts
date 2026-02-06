/**
 * POST /api/email
 * 
 * Sends transactional emails using SendGrid
 * Supports custom messages or pre-built templates
 */

import { NextResponse } from "next/server";
import { sendEmail, verifyEmailConfig } from "@/lib/email/sendEmail";
import { welcomeTemplate, passwordResetTemplate, notificationTemplate } from "@/lib/email/templates";
import { handleError, handleValidationError } from "@/lib/errorHandler";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, message, template, templateData } = body;

    // Validate required fields
    if (!to) {
      return handleValidationError("Recipient email (to) is required");
    }

    // Verify email service configuration
    const config = verifyEmailConfig();
    if (!config.configured) {
      logger.error("Email service not configured", { error: config.error });
      return NextResponse.json(
        {
          success: false,
          error: "Email service not configured. Please set SENDGRID_API_KEY and SENDGRID_SENDER environment variables.",
        },
        { status: 503 }
      );
    }

    let htmlContent: string;
    let emailSubject: string = subject || "Notification from RefundRoute";

    // Use template if specified
    if (template) {
      switch (template) {
        case "welcome":
          if (!templateData?.userName) {
            return handleValidationError("userName is required for welcome template");
          }
          htmlContent = welcomeTemplate(templateData.userName);
          emailSubject = subject || "Welcome to RefundRoute!";
          break;

        case "password-reset":
          if (!templateData?.userName || !templateData?.resetLink) {
            return handleValidationError("userName and resetLink are required for password-reset template");
          }
          htmlContent = passwordResetTemplate(templateData.userName, templateData.resetLink);
          emailSubject = subject || "Password Reset Request";
          break;

        case "notification":
          if (!templateData?.userName || !templateData?.title || !templateData?.message) {
            return handleValidationError("userName, title, and message are required for notification template");
          }
          htmlContent = notificationTemplate(
            templateData.userName,
            templateData.title,
            templateData.message,
            templateData.actionUrl
          );
          emailSubject = subject || templateData.title;
          break;

        default:
          return handleValidationError(`Unknown template: ${template}. Available templates: welcome, password-reset, notification`);
      }
    } else {
      // Use custom message
      if (!message) {
        return handleValidationError("Either 'message' or 'template' must be provided");
      }
      if (!subject) {
        return handleValidationError("Subject is required when using custom message");
      }
      htmlContent = message;
    }

    // Send email
    const result = await sendEmail({
      to,
      subject: emailSubject,
      html: htmlContent,
    });

    if (!result.success) {
      logger.error("Email send failed", { to, error: result.error });
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to send email",
        },
        { status: 500 }
      );
    }

    logger.info("Email sent successfully via API", {
      to,
      subject: emailSubject,
      template,
      messageId: result.messageId,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      messageId: result.messageId,
      recipient: to,
      subject: emailSubject,
    });
  } catch (error) {
    return handleError(error, "POST /api/email");
  }
}

/**
 * GET /api/email
 * 
 * Returns email service configuration status
 */
export async function GET() {
  try {
    const config = verifyEmailConfig();

    return NextResponse.json({
      success: true,
      configured: config.configured,
      sender: config.sender,
      error: config.error,
      availableTemplates: ["welcome", "password-reset", "notification"],
    });
  } catch (error) {
    return handleError(error, "GET /api/email");
  }
}
