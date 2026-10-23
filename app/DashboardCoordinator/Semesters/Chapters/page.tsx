"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

function ManageChaptersForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termParam = searchParams.get("term") || "2569/1";

  const [term, setTerm] = useState(termParam);

  const [midtermChapters, setMidtermChapters] = useState([
    { id: "m1", title: "บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์" },
    { id: "m2", title: "บทที่ 2 ผังงาน" },
  ]);

  const [finalChapters, setFinalChapters] = useState([
    { id: "f1", title: "บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์" },
    { id: "f2", title: "บทที่ 2 ผังงาน" },
  ]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddMidterm = () => {
    const nextNo = midtermChapters.length + 1;
    setMidtermChapters([
      ...midtermChapters,
      { id: `m${Date.now()}`, title: `บทที่ ${nextNo} หัวข้อการเรียนรู้ใหม่` },
    ]);
  };

  const handleRemoveMidterm = (id: string) => {
    setMidtermChapters(midtermChapters.filter((c) => c.id !== id));
  };

  const handleAddFinal = () => {
    const nextNo = finalChapters.length + 1;
    setFinalChapters([
      ...finalChapters,
      { id: `f${Date.now()}`, title: `บทที่ ${nextNo} หัวข้อการเรียนรู้ใหม่` },
    ]);
  };

  const handleRemoveFinal = (id: string) => {
    setFinalChapters(finalChapters.filter((c) => c.id !== id));
  };

  const handleCopyChapters = () => {
    alert("คัดลอกโครงสร้างบทเรียนจากภาคการศึกษาก่อนหน้าเรียบร้อยแล้ว");
  };

  const handleSave = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Top Header with Copy Chapters Button matching Figma pdf-85 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">จัดการบท</h2>
        <CornerButton
          onClick={handleCopyChapters}
          variant="primary"
          className="px-6 py-2.5"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        >
          สำเนาบท
        </CornerButton>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-8">
        {/* Term Badge */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-2">
            เทอม
          </label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={term}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-gray-50/50"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Midterm Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">เนื้อหากลางภาค</h3>
          <div className="space-y-3">
            {midtermChapters.map((chap) => (
              <div key={chap.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={chap.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setMidtermChapters(
                      midtermChapters.map((c) =>
                        c.id === chap.id ? { ...c, title: newTitle } : c
                      )
                    );
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMidterm(chap.id)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-red-600 transition shadow-xs"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <CornerButton
              onClick={handleAddMidterm}
              variant="primary"
              className="text-xs px-5 py-2"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              เพิ่มบท
            </CornerButton>
          </div>
        </div>

        {/* Final Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">เนื้อหาปลายภาค</h3>
          <div className="space-y-3">
            {finalChapters.map((chap) => (
              <div key={chap.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={chap.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFinalChapters(
                      finalChapters.map((c) =>
                        c.id === chap.id ? { ...c, title: newTitle } : c
                      )
                    );
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFinal(chap.id)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-red-600 transition shadow-xs"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <CornerButton
              onClick={handleAddFinal}
              variant="primary"
              className="text-xs px-5 py-2"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              เพิ่มบท
            </CornerButton>
          </div>
        </div>

        {/* Action Buttons matching Figma pdf-85 */}
        <div className="pt-6 flex justify-end gap-4 border-t border-gray-100">
          <CornerButton
            variant="primary"
            onClick={() => router.push("/DashboardCoordinator/Semesters")}
            className="px-8 py-3 bg-[#0B63E5]"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            iconPosition="left"
          >
            ยกเลิก
          </CornerButton>

          <CornerButton
            variant="primary"
            onClick={handleSave}
            className="px-8 py-3"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            }
            iconPosition="left"
          >
            บันทึก
          </CornerButton>
        </div>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกโครงสร้างบทเรียนสำเร็จ"
        message={`โครงสร้างเนื้อหากลางภาคและปลายภาคของเทอม ${term} ได้รับการบันทึกแล้ว`}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Semesters");
        }}
      />
    </div>
  );
}

export default function ManageChaptersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <ManageChaptersForm />
    </Suspense>
  );
}
