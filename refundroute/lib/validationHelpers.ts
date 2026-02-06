import { ZodError } from 'zod';
import { sendError } from './responseHandler';
import { ERROR_CODES } from './errorCodes';

/**
 * Validation error handler for Zod errors
 * Transforms Zod validation errors into standardized API error responses
 */

export interface ValidationError {
  field: string | number;
  message: string;
}

/**
 * Format Zod errors into a readable structure
 */
export const formatZodErrors = (error: ZodError): ValidationError[] => {
  return error.errors.map((err) => ({
    field: err.path[0] || 'unknown',
    message: err.message,
  }));
};

/**
 * Handle Zod validation errors and return standardized error response
 */
export const handleValidationError = (error: ZodError) => {
  const formattedErrors = formatZodErrors(error);
  
  return sendError(
    'Validation failed',
    ERROR_CODES.VALIDATION_ERROR,
    400,
    formattedErrors
  );
};
