"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CornerButton from "../Components/CornerButton";
import SaveSuccessModal from "../Components/SaveSuccessModal";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return;
    }
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">ตั้งรหัสผ่านใหม่</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          กรุณากำหนดรหัสผ่านใหม่ที่มีความยาวอย่างน้อย 8 ตัวอักษร
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              ยืนยันรหัสผ่านใหม่
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div className="pt-4">
            <CornerButton
              type="submit"
              variant="primary"
              className="w-full py-3.5 text-base font-bold shadow-sm"
            >
              ตั้งรหัสผ่าน
            </CornerButton>
          </div>
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

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="ตั้งรหัสผ่านใหม่สำเร็จ"
        message="คุณสามารถใช้รหัสผ่านใหม่เข้าสู่ระบบได้ทันที"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Login");
        }}
      />
    </div>
  );
}
