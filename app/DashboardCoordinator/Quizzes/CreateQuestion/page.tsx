"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

interface OptionItem {
  id: string;
  text: string;
  imageName?: string;
  isCorrect: boolean;
}

function CreateQuizQuestionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qNo = searchParams.get("qNo");

  const [questionNo, setQuestionNo] = useState(qNo || "1");
  const [questionText, setQuestionText] = useState(
    qNo ? "ตัวแปรประเภทจำนวนเต็มต้องประกาศด้วยคำไหน" : ""
  );
  const [questionImage, setQuestionImage] = useState<File | null>(null);
  const [optionType, setOptionType] = useState<"ข้อความ" | "รูปภาพ">("ข้อความ");

  const [options, setOptions] = useState<OptionItem[]>([
    { id: "1", text: "float", isCorrect: false },
    { id: "2", text: "char", isCorrect: false },
    { id: "3", text: "int", isCorrect: true },
  ]);

  const [correctExplanation, setCorrectExplanation] = useState(
    qNo ? "ถูกต้อง int ย่อมาจาก integer ซึ่งใช้เก็บข้อมูลจำนวนเต็ม" : ""
  );
  const [incorrectExplanation, setIncorrectExplanation] = useState(
    qNo ? "ยังไม่ถูกต้อง float ใช้สำหรับทศนิยม และ char ใช้สำหรับตัวอักษร" : ""
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: Date.now().toString(),
        text: `ตัวเลือกที่ ${options.length + 1}`,
        isCorrect: false,
      },
    ]);
  };

  const handleRemoveOption = (id: string) => {
    if (options.length <= 2) return;
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const handleSetCorrect = (id: string) => {
    setOptions(
      options.map((opt) => ({
        ...opt,
        isCorrect: opt.id === id,
      }))
    );
  };

  const handleTextChange = (id: string, text: string) => {
    setOptions(
      options.map((opt) => (opt.id === id ? { ...opt, text } : opt))
    );
  };

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
          {/* Question No */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              ข้อที่
            </label>
            <input
              type="number"
              required
              value={questionNo}
              onChange={(e) => setQuestionNo(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              โจทย์ที่เป็นข้อความ
            </label>
            <textarea
              rows={4}
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="ระบุคำถามของแบบทดสอบ..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Question Image Dropzone */}
          <div>
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-blue-50/20 hover:bg-blue-50/30 transition">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">อัปโหลดรูปภาพโจทย์</h4>
              <p className="text-xs text-gray-500 mb-4">Supported formats: .png , .jpeg Max file size: 50MB .</p>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setQuestionImage(e.target.files[0]);
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

              {questionImage && (
                <div className="mt-3 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg">
                  {questionImage.name}
                </div>
              )}
            </div>
          </div>

          {/* Option Type Radios matching Figma pdf-80 */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-3">
              รูปแบบตัวเลือก
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-blue-400 transition">
                <input
                  type="radio"
                  name="optionType"
                  checked={optionType === "ข้อความ"}
                  onChange={() => setOptionType("ข้อความ")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-gray-800">ข้อความ</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-blue-400 transition">
                <input
                  type="radio"
                  name="optionType"
                  checked={optionType === "รูปภาพ"}
                  onChange={() => setOptionType("รูปภาพ")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-gray-800">รูปภาพ</span>
              </label>
            </div>
          </div>

          {/* Options Section matching Figma pdf-80 & pdf-81 */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-bold text-gray-900">ตัวเลือก</label>
              <CornerButton
                onClick={handleAddOption}
                variant="primary"
                className="text-xs px-4 py-2"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                เพิ่มตัวเลือก
              </CornerButton>
            </div>

            <div className="space-y-3">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                    opt.isCorrect
                      ? "border-blue-500 bg-blue-50/10 shadow-xs"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {/* Select as Correct Radio */}
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={opt.isCorrect}
                    onChange={() => handleSetCorrect(opt.id)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer ml-2"
                  />

                  {/* Input based on option type */}
                  {optionType === "ข้อความ" ? (
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleTextChange(opt.id, e.target.value)}
                      placeholder="ข้อความตัวเลือก..."
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex-1 flex items-center gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleTextChange(opt.id, e.target.files[0].name);
                            }
                          }}
                        />
                        <div className="inline-flex items-center gap-2 bg-[#0B63E5] hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-xs shadow-xs transition">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                          </svg>
                          Browse Files
                        </div>
                      </label>
                      <span className="text-xs text-gray-500 truncate max-w-xs font-mono">
                        {opt.text}
                      </span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(opt.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-red-600 transition"
                    title="ลบตัวเลือก"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Correct checkmark badge */}
                  {opt.isCorrect && (
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-500 text-white shadow-xs">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Correct Explanation */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              คำอธิบายเมื่อตอบถูก
            </label>
            <textarea
              rows={3}
              value={correctExplanation}
              onChange={(e) => setCorrectExplanation(e.target.value)}
              placeholder="ระบุข้อความอธิบายความรู้เมื่อผู้เรียนตอบถูกต้อง..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Incorrect Explanation */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              คำอธิบายเมื่อตอบผิด
            </label>
            <textarea
              rows={3}
              value={incorrectExplanation}
              onChange={(e) => setIncorrectExplanation(e.target.value)}
              placeholder="ระบุข้อความอธิบายและแนะแนวทางเมื่อผู้เรียนตอบผิด..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Bottom Action buttons matching Figma pdf-80 */}
          <div className="pt-6 flex justify-end gap-4">
            <CornerButton
              variant="danger-solid"
              onClick={() => router.push("/DashboardCoordinator/Quizzes/Create")}
              className="px-8 py-3"
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
        title="บันทึกโจทย์แบบทดสอบสำเร็จ"
        message="โจทย์และตัวเลือกของแบบทดสอบได้รับการบันทึกเรียบร้อยแล้ว"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Quizzes/Create");
        }}
      />
    </div>
  );
}

export default function CreateQuizQuestionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <CreateQuizQuestionForm />
    </Suspense>
  );
}
