"use client";

import React from "react";
import Link from "next/link";

interface CornerCardProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  fillColor?: string;
}

export default function CornerCard({
  children,
  href,
  onClick,
  className = "",
  fillColor = "bg-[#F1F3FD]",
}: CornerCardProps) {
  const baseClasses =
    "group relative block overflow-hidden rounded-2xl border border-[#E3E6F0] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

  const content = (
    <>
      {/* Expanding circle from top-right corner */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 h-0 w-0 -translate-y-1/2 translate-x-1/2 rounded-full ${fillColor} transition-all duration-500 ease-out group-hover:h-[700px] group-hover:w-[1200px]`}
      />

      {/* Content wrapper above expanding circle */}
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {content}
    </div>
  );
}
