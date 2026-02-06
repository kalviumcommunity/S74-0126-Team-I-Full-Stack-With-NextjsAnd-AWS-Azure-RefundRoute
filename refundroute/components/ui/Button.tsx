/**
 * Button Component
 * 
 * Reusable button with variant support and accessibility features.
 * 
 * Props Contract:
 * @param label - Button text content
 * @param onClick - Optional click handler function
 * @param variant - Visual style: "primary" | "secondary" | "danger" | "success"
 * @param disabled - Whether button is disabled
 * @param type - HTML button type: "button" | "submit" | "reset"
 * @param className - Additional CSS classes for custom styling
 * 
 * Features:
 * - Multiple visual variants
 * - Hover and active states
 * - Disabled state handling
 * - Keyboard accessible
 * - ARIA attributes
 * 
 * Usage:
 * <Button label="Click Me" onClick={() => console.log('clicked')} variant="primary" />
 */

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${
    disabled ? disabledStyles : ""
  } ${className}`;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={combinedStyles}
      aria-label={label}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
}
