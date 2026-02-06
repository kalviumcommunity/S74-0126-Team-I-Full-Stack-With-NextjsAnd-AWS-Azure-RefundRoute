"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

/**
 * Login Page (Public Route)
 * 
 * Handles user authentication with mock token generation.
 * Sets JWT cookie and redirects to intended page or dashboard.
 * 
 * Features:
 * - Mock login simulation
 * - Redirect parameter support
 * - Error state handling
 */
export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const redirect = searchParams.get("redirect") || "/dashboard";
  const error = searchParams.get("error");

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In production, this would be a real JWT from your backend
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYxNjIzOTAyMn0.mock_signature";
      
      Cookies.set("token", mockToken, { expires: 7 }); // 7 days
      
      setIsLoading(false);
      router.push(redirect);
    }, 800);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.refresh();
  };

  const isLoggedIn = !!Cookies.get("token");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isLoggedIn ? "Already Logged In" : "Login to RefundRoute"}
        </h1>
        <p className="text-gray-600 mb-6">
          {isLoggedIn 
            ? "You're already authenticated. Navigate or logout below." 
            : "Click the button below to authenticate (demo mode)"
          }
        </p>

        {error === "invalid_token" && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Authentication Error</p>
            <p className="text-sm">Your session expired. Please log in again.</p>
          </div>
        )}

        {redirect !== "/dashboard" && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">You'll be redirected to: <code className="font-mono">{redirect}</code></p>
          </div>
        )}

        {isLoggedIn ? (
          <div className="space-y-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Go to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login (Demo)"}
          </button>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            This is a demo authentication. In production, integrate with your backend API.
          </p>
        </div>
      </div>
    </main>
  );
}
