"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

export default function CreateTeacherPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("อาจารย์ผู้สอน");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("CodeLearn@2026");
  const [sendToMail, setSendToMail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let newPass = "";
    for (let i = 0; i < 12; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ชื่อ
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="กรอกชื่ออาจารย์"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                นามสกุล
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="กรอกนามสกุล"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          {/* Role selector radio */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-800">
              <input
                type="radio"
                checked={role === "อาจารย์ผู้สอน"}
                onChange={() => setRole("อาจารย์ผู้สอน")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              อาจารย์ผู้สอน
            </label>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
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

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่านเริ่มต้น"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition pr-12 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Regenerate password and Send to Mail options */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={generateRandomPassword}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Regenerate Password
            </button>

            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={sendToMail}
                onChange={(e) => setSendToMail(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Send Password To Mail</span>
            </label>
          </div>

          {/* Submit button */}
          <div className="pt-6 flex justify-end">
            <CornerButton
              type="submit"
              variant="primary"
              className="px-8 py-3"
            >
              สร้าง
            </CornerButton>
          </div>
        </form>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="สร้างบัญชีสำเร็จ"
        message="สร้างบัญชีอาจารย์ผู้สอนเรียบร้อยและส่งข้อมูลไปยังอีเมลแล้ว"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Teachers");
        }}
      />
    </div>
  );
}
