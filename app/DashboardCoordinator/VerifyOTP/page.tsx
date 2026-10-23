"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../Components/CornerButton";

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "coordinator@codelearn.ac.th";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/DashboardCoordinator/ResetPassword");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">ยืนยันรหัส OTP</h1>
        <p className="text-sm text-gray-500 mb-2 leading-relaxed">
          ระบบได้ส่งรหัส 6 หลักไปยังอีเมล
        </p>
        <p className="text-sm font-semibold text-blue-600 mb-8 font-mono">
          {email}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs font-mono"
              />
            ))}
          </div>

          <div className="text-xs text-gray-500">
            ยังไม่ได้รับรหัส?{" "}
            <button
              type="button"
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              ส่งรหัสอีกครั้ง
            </button>
          </div>

          <CornerButton
            type="submit"
            variant="primary"
            className="w-full py-3.5 text-base font-bold shadow-sm"
          >
            ยืนยันรหัส OTP
          </CornerButton>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/DashboardCoordinator/ForgotPassword"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            ← ย้อนกลับ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <VerifyOTPForm />
    </Suspense>
  );
}
