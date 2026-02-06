import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Dynamic User Profile Page (Protected Route)
 * 
 * Demonstrates Next.js App Router dynamic segments with [id] parameter.
 * Each URL like /users/1, /users/2, etc. renders a unique page.
 * 
 * Features:
 * - Dynamic parameter extraction
 * - Breadcrumb navigation for SEO
 * - Mock user data display
 */
export default async function UserProfile({ params }: Props) {
  const { id } = await params;

  // Mock user data (in production, fetch from database)
  const userData = {
    id,
    name: `User ${id}`,
    email: `user${id}@refundroute.com`,
    role: id === "1" ? "Admin" : "User",
    joinDate: "2024-01-15",
    refundsProcessed: Math.floor(Math.random() * 50) + 10,
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Breadcrumb Navigation for SEO */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {" > "}
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        {" > "}
        <span className="text-gray-800 font-semibold">User {id}</span>
      </nav>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            ID: {id}
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-lg font-semibold text-gray-800">{userData.role}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-lg font-semibold text-gray-800">{userData.joinDate}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Refunds Processed</p>
            <p className="text-4xl font-bold text-purple-600">{userData.refundsProcessed}</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Try Other Users:</h2>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((userId) => (
                <Link
                  key={userId}
                  href={`/users/${userId}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    userId.toString() === id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  User {userId}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
            <p className="text-sm">
              <strong>💡 Dynamic Routing:</strong> This page is rendered from{" "}
              <code className="bg-yellow-100 px-1 rounded">app/users/[id]/page.tsx</code>.
              The <code className="bg-yellow-100 px-1 rounded">[id]</code> segment captures 
              any value from the URL, making it perfect for user profiles, blog posts, products, etc.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Generate metadata for SEO
 * Next.js automatically generates <title> and <meta> tags
 */
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `User ${id} Profile | RefundRoute`,
    description: `View profile and refund history for User ${id} on RefundRoute.`,
  };
}
