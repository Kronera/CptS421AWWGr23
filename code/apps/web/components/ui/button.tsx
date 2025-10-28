import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
};

export function Button({
  className = "",
  size = "md",
  variant = "solid",
  ...props
}: ButtonProps) {
  const sizes =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2";

  const variantClasses =
    variant === "outline"
      ? "border bg-transparent"
      : "border-0";

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors ${sizes} ${variantClasses} ${className}`}
    />
  );
}