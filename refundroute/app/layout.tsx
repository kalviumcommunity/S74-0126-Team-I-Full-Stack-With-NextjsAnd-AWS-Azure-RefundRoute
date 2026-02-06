import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RefundRoute - Streamline Your Refund Management",
  description: "Professional refund management platform with dynamic routing, authentication, and real-time processing. Built with Next.js 13+ App Router.",
  keywords: ["refunds", "payments", "dashboard", "Next.js", "TypeScript"],
  authors: [{ name: "RefundRoute Team" }],
  openGraph: {
    title: "RefundRoute - Refund Management Platform",
    description: "Streamline your refund processes with our modern platform",
    type: "website",
  },
};

/**
 * Root Layout Component
 * 
 * Wraps all pages with global navigation and metadata.
 * Provides consistent UI structure across public and protected routes.
 * 
 * Features:
 * - Global navigation bar
 * - SEO metadata
 * - Responsive design
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
                RefundRoute 🚀
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="hover:underline transition-all">
                  Home
                </Link>
                <Link href="/login" className="hover:underline transition-all">
                  Login
                </Link>
                <Link href="/dashboard" className="hover:underline transition-all">
                  Dashboard
                </Link>
                <Link href="/users/1" className="hover:underline transition-all">
                  Users
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
