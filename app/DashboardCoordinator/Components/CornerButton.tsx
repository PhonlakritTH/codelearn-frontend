"use client";

import React from "react";
import Link from "next/link";

interface CornerButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e?: any) => void;
  variant?:
    | "primary"
    | "outline"
    | "secondary"
    | "danger"
    | "danger-solid"
    | "success"
    | "ai"
    | "ghost";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CornerButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  icon,
  iconPosition = "right",
  type = "button",
  disabled = false,
}: CornerButtonProps) {
  let baseStyle =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-all duration-300 active:scale-[0.98] cursor-pointer text-sm";
  let fillCircle = "bg-[#1E40AF]";

  if (variant === "primary") {
    baseStyle += " bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm hover:shadow px-5 py-2.5";
    fillCircle = "bg-[#172554]";
  } else if (variant === "outline") {
    baseStyle +=
      " border border-gray-200 bg-white text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB] px-4 py-2";
    fillCircle = "bg-[#EFF6FF]";
  } else if (variant === "secondary") {
    baseStyle += " bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] px-4 py-2";
    fillCircle = "bg-[#BFDBFE]";
  } else if (variant === "danger") {
    baseStyle += " border border-red-200 bg-white text-red-600 hover:border-red-500 px-3 py-1.5";
    fillCircle = "bg-red-50";
  } else if (variant === "danger-solid") {
    baseStyle += " bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-sm px-6 py-2.5";
    fillCircle = "bg-[#991B1B]";
  } else if (variant === "success") {
    baseStyle += " bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-sm px-6 py-2.5";
    fillCircle = "bg-[#14532D]";
  } else if (variant === "ai") {
    baseStyle +=
      " bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm px-5 py-2.5";
    fillCircle = "bg-[#312E81]";
  } else {
    baseStyle += " text-gray-700 hover:text-blue-600 px-3 py-2";
    fillCircle = "bg-[#F3F4F6]";
  }

  const content = (
    <>
      {/* Corner fill circle expanding on hover */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-4 -top-2 h-4 w-4 rounded-full ${fillCircle} transition-transform duration-500 ease-out group-hover:scale-[70]`}
      />

      {/* Button content on top of fill */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={`${baseStyle} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {content}
    </button>
  );
}
