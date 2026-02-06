import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * LayoutWrapper Component
 * 
 * Master layout template that wraps all application pages.
 * Provides consistent structure with header, sidebar, and main content area.
 * 
 * Architecture:
 * ┌─────────────────────────────────┐
 * │          Header                 │
 * ├──────────┬──────────────────────┤
 * │          │                      │
 * │ Sidebar  │   Main Content       │
 * │          │   (children)         │
 * │          │                      │
 * └──────────┴──────────────────────┘
 * 
 * Props:
 * @param children - React nodes to render in main content area
 * 
 * Features:
 * - Flexbox-based responsive layout
 * - Fixed header and sidebar
 * - Scrollable main content area
 * - Semantic HTML structure
 * - Accessibility landmarks
 */
interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width, scrollable */}
        <Sidebar />
        
        {/* Main Content Area - Flexible, scrollable */}
        <main 
          className="flex-1 bg-white p-6 overflow-auto"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
