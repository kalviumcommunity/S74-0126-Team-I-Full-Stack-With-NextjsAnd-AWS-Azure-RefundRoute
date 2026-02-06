export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-6 py-8 space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-lg shadow-md space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="flex space-x-2 mt-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="animate-pulse bg-white rounded-lg shadow-md p-6 space-y-4 mt-8">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
