"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header Component
 * 
 * Shared navigation header with responsive design and active route highlighting.
 * Appears at the top of every page when wrapped with LayoutWrapper.
 * 
 * Features:
 * - Responsive navigation links
 * - Active route highlighting
 * - Brand logo/title
 * - Accessible keyboard navigation
 * - Consistent color scheme
 */
export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/users/1", label: "Users" },
    { href: "/login", label: "Login" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
            aria-label="RefundRoute Home"
          >
            RefundRoute 🚀
          </Link>
          
          <nav className="flex gap-6" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all font-medium ${
                  isActive(link.href)
                    ? "text-yellow-300 underline underline-offset-4"
                    : "hover:text-gray-200 hover:underline hover:underline-offset-4"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
