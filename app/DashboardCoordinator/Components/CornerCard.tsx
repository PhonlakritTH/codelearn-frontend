"use client";

import React from "react";
import Link from "next/link";

interface CornerCardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function CornerCard({
  children,
  href,
  className = "",
  onClick,
}: CornerCardProps) {
  const baseClasses =
    "group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md";

  const content = (
    <>
      {/* Corner fill background effect on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-blue-50/60 opacity-0 transition-all duration-500 ease-out group-hover:scale-[6] group-hover:opacity-100"
      />
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
    <div onClick={onClick} className={`${baseClasses} ${className}`}>
      {content}
    </div>
  );
}
