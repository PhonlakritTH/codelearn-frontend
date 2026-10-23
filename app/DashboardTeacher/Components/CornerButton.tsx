"use client";

import React from "react";
import Link from "next/link";

interface CornerButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "secondary" | "danger" | "ghost";
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
  // Styles based on variant
  let baseStyle = "group relative inline-flex items-center justify-center overflow-hidden rounded-lg font-semibold transition-all duration-300 active:scale-[0.98] cursor-pointer";
  let fillCircle = "";

  if (variant === "primary") {
    baseStyle += " bg-gradient-to-r from-[#315BFF] to-[#1D4ED8] text-white shadow-sm hover:shadow-md px-5 py-2.5";
    fillCircle = "bg-[#14213F]";
  } else if (variant === "outline") {
    baseStyle += " border border-[#DDE3F5] bg-white text-[#14213F] hover:border-[#315BFF] hover:text-[#1D4ED8] px-4 py-2";
    fillCircle = "bg-[#F1F3FD]";
  } else if (variant === "secondary") {
    baseStyle += " bg-[#F1F3FD] text-[#0B3FA6] hover:bg-[#E1E6FA] px-4 py-2";
    fillCircle = "bg-[#E3E8FC]";
  } else if (variant === "danger") {
    baseStyle += " border border-red-200 bg-white text-red-600 hover:border-red-500 px-3 py-1.5";
    fillCircle = "bg-red-50";
  } else {
    baseStyle += " text-gray-700 hover:text-blue-600 px-3 py-2";
    fillCircle = "bg-[#F1F3FD]";
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
