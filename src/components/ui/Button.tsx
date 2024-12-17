import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

type ButtonProps = {
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  className?: string;
  handleClick?: () => void;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "danger" | "black";
  fill?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size = "default",
  asChild = false,
  className,
  handleClick,
  children,
  color = "primary",
  fill = false,
}) => {
  const Container = asChild ? Slot : "button";

  const baseClasses =
    "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none";

  const colorClasses = {
    primary: fill
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "border border-blue-500 text-blue-500 hover:bg-blue-100",
    secondary: fill
      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
      : "border border-gray-300 text-gray-300 hover:bg-gray-100",
    danger: fill
      ? "bg-red-500 text-white hover:bg-red-600"
      : "border border-red-500 text-red-500 hover:bg-red-100",
    black: fill
      ? "bg-black text-white hover:bg-red-600"
      : "border border-red-500 text-red-500 hover:bg-red-100",
  }[color];

  const sizeClasses = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  }[size];

  return (
    <Container
      className={twMerge(
        clsx(baseClasses, colorClasses, sizeClasses, className)
      )}
      onClick={handleClick}
    >
      {children}
    </Container>
  );
};

Button.displayName = "Button";

export default Button;
