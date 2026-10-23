"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

function CreateSemesterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");

  const [term, setTerm] = useState(editId ? "1/2569" : "1/2569");
  const [midtermDate, setMidtermDate] = useState("2026-08-27");
  const [midtermTime, setMidtermTime] = useState("13:00 - 16:00");
  const [finalDate, setFinalDate] = useState("2026-10-27");
  const [finalTime, setFinalTime] = useState("13:00 - 16:00");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {editId ? "แก้ไขภาคการศึกษา" : "เพิ่มเทอม"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Term Input */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              เทอม
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="เช่น 1/2569 หรือ 2569/1"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Midterm Exam Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">สอบกลางภาค</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  วันที่สอบ
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={midtermDate}
                    onChange={(e) => setMidtermDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  เวลาที่สอบ
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={midtermTime}
                    onChange={(e) => setMidtermTime(e.target.value)}
                    placeholder="เช่น 13:00 - 16:00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Final Exam Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">สอบปลายภาค</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  วันที่สอบ
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={finalDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  เวลาที่สอบ
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={finalTime}
                    onChange={(e) => setFinalTime(e.target.value)}
                    placeholder="เช่น 13:00 - 16:00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 flex justify-end gap-3">
            <CornerButton
              variant="outline"
              onClick={() => router.push("/DashboardCoordinator/Semesters")}
            >
              ยกเลิก
            </CornerButton>
            <CornerButton
              type="submit"
              variant="primary"
              className="px-8 py-3"
            >
              บันทึก
            </CornerButton>
          </div>
        </form>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกภาคการศึกษาสำเร็จ"
        message="ข้อมูลภาคการศึกษาและตารางสอบได้รับการบันทึกเรียบร้อยแล้ว"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Semesters");
        }}
      />
    </div>
  );
}

export default function CreateSemesterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <CreateSemesterForm />
    </Suspense>
  );
}
