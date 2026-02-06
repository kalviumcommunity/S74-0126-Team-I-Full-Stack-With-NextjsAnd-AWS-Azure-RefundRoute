"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

/**
 * Dashboard Page (Protected Route)
 * 
 * Accessible only to authenticated users with valid JWT.
 * Middleware redirects unauthorized users to /login.
 * 
 * Features:
 * - Protected content
 * - Logout functionality
 * - Navigation to other protected routes
 */
export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-50 to-teal-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard 📊</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
          <p className="font-semibold">🔒 Protected Route</p>
          <p className="text-sm">Only authenticated users can see this page.</p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Quick Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600">Active Refunds</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600">$4.2k</p>
                <p className="text-sm text-gray-600">Processed</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Navigation</h2>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/users/1")}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span className="font-semibold">View User Profile</span>
                <span className="text-sm text-gray-600 block">Check out dynamic routing with /users/[id]</span>
              </button>
              <button
                onClick={() => router.push("/refunds")}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span className="font-semibold">Manage Refunds</span>
                <span className="text-sm text-gray-600 block">View and process refund requests</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              💡 <strong>Try this:</strong> Open a new incognito window and try accessing /dashboard 
              directly — you'll be redirected to /login because you don't have a valid token.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
