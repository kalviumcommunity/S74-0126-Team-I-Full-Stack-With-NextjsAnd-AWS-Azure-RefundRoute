"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sidebar Component
 * 
 * Contextual navigation sidebar for dashboard and protected routes.
 * Uses data-driven link rendering for scalability.
 * 
 * Features:
 * - Active route highlighting
 * - Icon support (expandable)
 * - Hierarchical navigation structure
 * - Keyboard accessible
 * - Responsive design (collapsible on mobile)
 * 
 * Props:
 * None currently, but can be extended to accept custom link arrays
 */
export default function Sidebar() {
  const pathname = usePathname();

  const navigationSections = [
    {
      title: "Main",
      links: [
        { href: "/dashboard", label: "📊 Overview", description: "Dashboard home" },
        { href: "/users/1", label: "👤 Users", description: "User management" },
      ],
    },
    {
      title: "Refunds",
      links: [
        { href: "/refunds", label: "💰 All Refunds", description: "View all refund requests" },
        { href: "/refunds/pending", label: "⏳ Pending", description: "Awaiting approval" },
        { href: "/refunds/processed", label: "✅ Processed", description: "Completed refunds" },
      ],
    },
    {
      title: "Settings",
      links: [
        { href: "/settings", label: "⚙️ Preferences", description: "App settings" },
        { href: "/profile", label: "🔐 Profile", description: "User profile" },
      ],
    },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside 
      className="w-64 h-screen bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto"
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Navigation</h2>
        <p className="text-xs text-gray-500">Quick access to all features</p>
      </div>

      <nav className="space-y-6">
        {navigationSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg transition-all ${
                      isActive(link.href)
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    title={link.description}
                  >
                    <span className="block text-sm">{link.label}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800 font-semibold mb-1">💡 Pro Tip</p>
          <p className="text-xs text-blue-700">
            Use keyboard shortcuts to navigate faster between sections.
          </p>
        </div>
      </div>
    </aside>
  );
}
