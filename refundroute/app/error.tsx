'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600">
              {error.message || 'An unexpected error occurred while loading this page.'}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Go Home
            </button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-4">
            If this problem persists, please contact support or try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
