import Link from "next/link";

/**
 * Home Page (Public Route)
 * 
 * This is the landing page accessible to all users.
 * Provides navigation to login and dashboard pages.
 */
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to RefundRoute 🚀
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Streamline your refund management with our powerful platform.
          Navigate to <Link href="/login" className="text-blue-600 hover:underline">/login</Link> to sign in 
          or <Link href="/dashboard" className="text-blue-600 hover:underline">/dashboard</Link> after logging in.
        </p>
        
        <div className="flex gap-4 justify-center mb-8">
          <Link 
            href="/login" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Get Started
          </Link>
          <Link 
            href="/users/1" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            View Demo User
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-left">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Features:</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Public and Protected Routing</li>
            <li>✅ Dynamic User Profiles</li>
            <li>✅ JWT Authentication</li>
            <li>✅ Custom Error Pages</li>
            <li>✅ SEO-Optimized Metadata</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
