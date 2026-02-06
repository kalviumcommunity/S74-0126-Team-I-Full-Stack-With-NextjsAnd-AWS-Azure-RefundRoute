import { NextResponse } from 'next/server';

/**
 * Global API Response Handler
 * Ensures consistent response format across all API endpoints
 */

export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * Send a successful API response
 * @param data - The data to return
 * @param message - Success message (default: "Success")
 * @param status - HTTP status code (default: 200)
 */
export const sendSuccess = <T = any>(
  data: T,
  message: string = 'Success',
  status: number = 200
): NextResponse<SuccessResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

/**
 * Send an error API response
 * @param message - Error message
 * @param code - Error code for tracking (default: "INTERNAL_ERROR")
 * @param status - HTTP status code (default: 500)
 * @param details - Optional error details for debugging
 */
export const sendError = (
  message: string = 'Something went wrong',
  code: string = 'INTERNAL_ERROR',
  status: number = 500,
  details?: any
): NextResponse<ErrorResponse> => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: {
        code,
        details: details ? String(details) : undefined,
      },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

/**
 * Send a paginated success response
 * @param data - The paginated data
 * @param pagination - Pagination metadata
 * @param message - Success message
 */
export const sendPaginatedSuccess = <T = any>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
  message: string = 'Success'
): NextResponse => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
};
