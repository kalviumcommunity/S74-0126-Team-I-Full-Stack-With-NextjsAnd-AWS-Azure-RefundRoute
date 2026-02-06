export default function RefundsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="bg-gray-200 p-3 rounded-full h-12 w-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-3 animate-pulse">
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded flex-1"></div>
                  ))}
                </div>
              </div>
              {/* Table Rows */}
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="bg-white px-6 py-4 animate-pulse">
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((col) => (
                      <div key={col} className="h-4 bg-gray-200 rounded flex-1"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Help Section Skeleton */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-blue-200 rounded w-32 mb-3"></div>
          <div className="h-4 bg-blue-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}
