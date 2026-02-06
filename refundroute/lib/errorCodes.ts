/**
 * Standardized Error Codes
 * Used across all API endpoints for consistent error tracking and monitoring
 */

export const ERROR_CODES = {
  // Validation Errors (400)
  VALIDATION_ERROR: 'E001',
  MISSING_FIELDS: 'E002',
  INVALID_INPUT: 'E003',
  
  // Not Found Errors (404)
  NOT_FOUND: 'E404',
  USER_NOT_FOUND: 'E404_USER',
  PROJECT_NOT_FOUND: 'E404_PROJECT',
  
  // Conflict Errors (409)
  DUPLICATE_ENTRY: 'E409',
  EMAIL_EXISTS: 'E409_EMAIL',
  
  // Database Errors (500)
  DATABASE_ERROR: 'E500_DB',
  QUERY_FAILED: 'E500_QUERY',
  CONNECTION_FAILED: 'E500_CONN',
  
  // General Server Errors (500)
  INTERNAL_ERROR: 'E500',
  UNEXPECTED_ERROR: 'E500_UNEXPECTED',
  
  // Operation Errors
  CREATE_FAILED: 'E501_CREATE',
  UPDATE_FAILED: 'E502_UPDATE',
  DELETE_FAILED: 'E503_DELETE',
  FETCH_FAILED: 'E504_FETCH',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

/**
 * Get human-readable error message from error code
 */
export const getErrorMessage = (code: ErrorCode): string => {
  const messages: Record<ErrorCode, string> = {
    [ERROR_CODES.VALIDATION_ERROR]: 'Validation failed',
    [ERROR_CODES.MISSING_FIELDS]: 'Required fields are missing',
    [ERROR_CODES.INVALID_INPUT]: 'Invalid input provided',
    [ERROR_CODES.NOT_FOUND]: 'Resource not found',
    [ERROR_CODES.USER_NOT_FOUND]: 'User not found',
    [ERROR_CODES.PROJECT_NOT_FOUND]: 'Project not found',
    [ERROR_CODES.DUPLICATE_ENTRY]: 'Duplicate entry',
    [ERROR_CODES.EMAIL_EXISTS]: 'Email already exists',
    [ERROR_CODES.DATABASE_ERROR]: 'Database error occurred',
    [ERROR_CODES.QUERY_FAILED]: 'Database query failed',
    [ERROR_CODES.CONNECTION_FAILED]: 'Database connection failed',
    [ERROR_CODES.INTERNAL_ERROR]: 'Internal server error',
    [ERROR_CODES.UNEXPECTED_ERROR]: 'Unexpected error occurred',
    [ERROR_CODES.CREATE_FAILED]: 'Failed to create resource',
    [ERROR_CODES.UPDATE_FAILED]: 'Failed to update resource',
    [ERROR_CODES.DELETE_FAILED]: 'Failed to delete resource',
    [ERROR_CODES.FETCH_FAILED]: 'Failed to fetch resource',
  };

  return messages[code] || 'An error occurred';
};
