import Link from "next/link";

/**
 * Custom 404 Not Found Page
 * 
 * Displayed when users navigate to non-existent routes.
 * Provides helpful navigation back to valid pages.
 * 
 * Features:
 * - User-friendly error message
 * - Navigation suggestions
 * - Branded design
 */
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-red-50 to-pink-100">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Where would you like to go?</h3>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🏠 Back to Home
            </Link>
            <Link
              href="/login"
              className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              🔐 Login Page
            </Link>
            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              📊 Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
          <p className="text-sm">
            <strong>💡 Routing Tip:</strong> Next.js automatically shows this page when no matching 
            route is found. Create <code className="bg-red-100 px-1 rounded">app/not-found.tsx</code> to 
            customize your 404 experience and improve user retention.
          </p>
        </div>
      </div>
    </main>
  );
}

/**
 * Metadata for SEO
 */
export const metadata = {
  title: "404 - Page Not Found | RefundRoute",
  description: "The page you're looking for doesn't exist.",
};
