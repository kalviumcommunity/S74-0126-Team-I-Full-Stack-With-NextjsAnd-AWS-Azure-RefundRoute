/**
 * Card Component
 * 
 * Reusable container component for displaying content in a card layout.
 * 
 * Props Contract:
 * @param title - Optional card header title
 * @param children - Content to display inside card
 * @param footer - Optional footer content
 * @param variant - Visual style: "default" | "highlighted" | "bordered"
 * @param className - Additional CSS classes
 * 
 * Features:
 * - Clean, modern card design
 * - Shadow and border effects
 * - Optional header and footer sections
 * - Multiple visual variants
 * - Responsive padding
 * 
 * Usage:
 * <Card title="User Profile">
 *   <p>Content goes here</p>
 * </Card>
 */

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "highlighted" | "bordered";
  className?: string;
}

export default function Card({
  title,
  children,
  footer,
  variant = "default",
  className = "",
}: CardProps) {
  const baseStyles = "rounded-xl overflow-hidden transition-shadow";

  const variantStyles = {
    default: "bg-white shadow-md hover:shadow-lg",
    highlighted: "bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg border border-blue-200",
    bordered: "bg-white border-2 border-gray-200 hover:border-blue-400",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <div className={combinedStyles} role="article">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}

      <div className="p-6">{children}</div>

      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}
