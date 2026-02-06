/**
 * Centralized Error Handler
 * 
 * Handles errors consistently across the application.
 * - Development: Returns detailed error messages with stack traces
 * - Production: Returns generic messages for security (prevents info leakage)
 */

import { NextResponse } from "next/server";
import { logger } from "./logger";

export interface ErrorResponse {
  success: false;
  error: string;
  stack?: string;
  timestamp: string;
}

/**
 * Handle errors and return appropriate response
 * @param error - The error object
 * @param context - Additional context about where the error occurred
 * @returns NextResponse with error details
 */
export function handleError(error: unknown, context?: string): NextResponse<ErrorResponse> {
  const isDev = process.env.NODE_ENV !== "production";
  
  // Extract error message
  let message = "An unexpected error occurred";
  let stack: string | undefined;
  
  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  } else if (typeof error === "string") {
    message = error;
  }

  // Log the error with context
  logger.error(`Error${context ? ` in ${context}` : ""}`, {
    message,
    stack: stack || "No stack trace available",
    isDev,
  });

  // Build response
  const errorResponse: ErrorResponse = {
    success: false,
    error: isDev ? message : "Internal server error",
    timestamp: new Date().toISOString(),
  };

  // Include stack trace only in development
  if (isDev && stack) {
    errorResponse.stack = stack;
  }

  return NextResponse.json(errorResponse, { status: 500 });
}

/**
 * Handle validation errors (400 Bad Request)
 * @param message - The validation error message
 * @returns NextResponse with validation error
 */
export function handleValidationError(message: string): NextResponse {
  logger.warn("Validation error", { message });
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status: 400 }
  );
}

/**
 * Handle authentication errors (401 Unauthorized)
 * @param message - The authentication error message
 * @returns NextResponse with auth error
 */
export function handleAuthError(message: string = "Unauthorized"): NextResponse {
  logger.warn("Authentication error", { message });
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status: 401 }
  );
}

/**
 * Handle authorization errors (403 Forbidden)
 * @param message - The authorization error message
 * @returns NextResponse with forbidden error
 */
export function handleForbiddenError(message: string = "Forbidden"): NextResponse {
  logger.warn("Authorization error", { message });
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status: 403 }
  );
}

/**
 * Handle not found errors (404)
 * @param resource - The resource that was not found
 * @returns NextResponse with not found error
 */
export function handleNotFoundError(resource: string = "Resource"): NextResponse {
  const message = `${resource} not found`;
  logger.info("Not found error", { resource });
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status: 404 }
  );
}
