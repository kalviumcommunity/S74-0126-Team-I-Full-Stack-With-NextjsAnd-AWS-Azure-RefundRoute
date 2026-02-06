import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutWrapper } from "@/components";
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
  title: "RefundRoute - Component Architecture Demo",
  description: "Demonstrating reusable layout components and design system in Next.js",
  keywords: ["refunds", "component architecture", "Next.js", "TypeScript", "design system"],
  authors: [{ name: "RefundRoute Team" }],
};

/**
 * Root Layout
 * 
 * Wraps all pages with LayoutWrapper component for consistent UI structure.
 * All pages automatically inherit Header, Sidebar, and layout spacing.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
