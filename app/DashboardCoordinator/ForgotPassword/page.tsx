"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CornerButton from "../Components/CornerButton";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/DashboardCoordinator/VerifyOTP?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">ลืมรหัสผ่าน</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          กรุณากรอกอีเมลของคุณเพื่อรับรหัส OTP สำหรับตั้งรหัสผ่านใหม่
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              อีเมล
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@codelearn.ac.th"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <CornerButton
            type="submit"
            variant="primary"
            className="w-full py-3.5 text-base font-bold shadow-sm"
          >
            ส่งรหัส OTP
          </CornerButton>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/DashboardCoordinator/Login"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            ← กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
