"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

function CreateLabQuestionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qNo = searchParams.get("qNo");

  const [questionNumber, setQuestionNumber] = useState(qNo || "1");
  const [questionText, setQuestionText] = useState(
    qNo ? "จงเขียนโปรแกรมแสดงข้อความ 'Hello, World!' ออกทางหน้าจอ โดยใช้คำสั่ง printf ในภาษา C" : ""
  );
  const [score, setScore] = useState("10");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {qNo ? `แก้ไขโจทย์ข้อที่ ${qNo}` : "เพิ่มโจทย์"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Number */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              ข้อที่
            </label>
            <input
              type="number"
              required
              value={questionNumber}
              onChange={(e) => setQuestionNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              โจทย์ที่เป็นข้อความ
            </label>
            <textarea
              rows={5}
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="พิมพ์รายละเอียดโจทย์ ตัวอย่างอินพุต และผลลัพธ์ที่ต้องการ..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Image Upload Dropzone matching Figma pdf-77 */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              อัปโหลดรูปภาพโจทย์ (ถ้ามี)
            </label>
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-blue-50/20 hover:bg-blue-50/30 transition">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">อัปโหลดรูปภาพโจทย์</h4>
              <p className="text-xs text-gray-500 mb-5">Supported formats: .png , .jpeg Max file size: 50MB .</p>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="inline-flex items-center gap-2 bg-[#0B63E5] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-sm transition text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                  </svg>
                  Browse Files
                </div>
              </label>

              {imageFile && (
                <div className="mt-3 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg">
                  {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(1)} MB)
                </div>
              )}
            </div>
          </div>

          {/* Score */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              คะแนน
            </label>
            <input
              type="number"
              required
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex justify-end gap-3">
            <CornerButton
              variant="outline"
              onClick={() => router.push("/DashboardCoordinator/Labs/Create")}
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
        title="บันทึกโจทย์สำเร็จ"
        message="โจทย์ใบงานได้รับการบันทึกเรียบร้อยแล้ว"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Labs/Create");
        }}
      />
    </div>
  );
}

export default function CreateLabQuestionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <CreateLabQuestionForm />
    </Suspense>
  );
}
