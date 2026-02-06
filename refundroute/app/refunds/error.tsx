'use client';

export default function RefundsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-4">
              <svg
                className="w-16 h-16 text-red-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>

          {/* Error Details */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Failed to Load Refunds
            </h2>
            <p className="text-gray-600">
              {error.message || 'We encountered an error while fetching your refund data.'}
            </p>
            {error.digest && (
              <div className="bg-gray-100 rounded p-3 mt-3">
                <p className="text-xs text-gray-500 font-mono">
                  Error ID: {error.digest}
                </p>
              </div>
            )}
          </div>

          {/* Common Causes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">
              Common Causes:
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Network connection issues</li>
              <li>Server is temporarily unavailable</li>
              <li>Invalid authentication token</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry
              </div>
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Go Home
            </button>
          </div>

          {/* Support Link */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Still having issues?{' '}
              <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
