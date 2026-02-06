/**
 * Structured Logger Utility
 * 
 * Provides consistent, JSON-formatted logging for the application.
 * Logs include: level, message, metadata, and timestamp.
 */

export interface LogMeta {
  [key: string]: any;
}

export const logger = {
  /**
   * Log informational messages
   * @param message - The log message
   * @param meta - Additional metadata (optional)
   */
  info: (message: string, meta?: LogMeta) => {
    const logEntry = {
      level: "info",
      message,
      meta: meta || {},
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(logEntry));
  },

  /**
   * Log error messages
   * @param message - The error message
   * @param meta - Additional metadata (optional)
   */
  error: (message: string, meta?: LogMeta) => {
    const logEntry = {
      level: "error",
      message,
      meta: meta || {},
      timestamp: new Date().toISOString(),
    };
    console.error(JSON.stringify(logEntry));
  },

  /**
   * Log warning messages
   * @param message - The warning message
   * @param meta - Additional metadata (optional)
   */
  warn: (message: string, meta?: LogMeta) => {
    const logEntry = {
      level: "warn",
      message,
      meta: meta || {},
      timestamp: new Date().toISOString(),
    };
    console.warn(JSON.stringify(logEntry));
  },

  /**
   * Log debug messages (only in development)
   * @param message - The debug message
   * @param meta - Additional metadata (optional)
   */
  debug: (message: string, meta?: LogMeta) => {
    if (process.env.NODE_ENV !== "production") {
      const logEntry = {
        level: "debug",
        message,
        meta: meta || {},
        timestamp: new Date().toISOString(),
      };
      console.debug(JSON.stringify(logEntry));
    }
  },
};
