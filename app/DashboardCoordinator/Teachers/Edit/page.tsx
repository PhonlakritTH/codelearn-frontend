"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

function EditTeacherForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [firstName, setFirstName] = useState("กิตติศักดิ์");
  const [lastName, setLastName] = useState("เจริญสุข");
  const [role, setRole] = useState("อาจารย์ผู้สอน");
  const [email, setEmail] = useState("kittisak@codelearn.ac.th");
  const [password, setPassword] = useState("••••••••••••");
  const [sendToMail, setSendToMail] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">แก้ไขบัญชี</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition font-mono"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setPassword("NewGen@" + Math.floor(Math.random() * 10000))}
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

          <div className="pt-6 flex justify-end gap-3">
            <CornerButton
              variant="outline"
              onClick={() => router.push("/DashboardCoordinator/Teachers")}
            >
              ยกเลิก
            </CornerButton>
            <CornerButton
              type="submit"
              variant="primary"
              className="px-8 py-3"
            >
              บันทึกการแก้ไข
            </CornerButton>
          </div>
        </form>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกการแก้ไขสำเร็จ"
        message="ข้อมูลบัญชีอาจารย์ผู้สอนได้รับการอัปเดตเรียบร้อยแล้ว"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Teachers");
        }}
      />
    </div>
  );
}

export default function EditTeacherPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <EditTeacherForm />
    </Suspense>
  );
}
