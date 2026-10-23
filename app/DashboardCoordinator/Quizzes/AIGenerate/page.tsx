"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

interface GeneratedQuestion {
  id: string;
  number: number;
  question: string;
  options: string[];
  correctIndex: number;
  isSelected: boolean;
}

export default function AIGenerateQuizPage() {
  const router = useRouter();
  const [docName] = useState("Introduction to Cognitive Psychology.pdf");
  const [dateRange, setDateRange] = useState("20 สิงหาคม - 22 สิงหาคม 2569");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [questions, setQuestions] = useState<GeneratedQuestion[]>([
    {
      id: "1",
      number: 1,
      question: "ตัวแปรประเภทจำนวนเต็มต้องประกาศด้วยคำไหน",
      options: ["float", "char", "int"],
      correctIndex: 2,
      isSelected: false,
    },
    {
      id: "2",
      number: 2,
      question: "float a=10.76; เป็นจำนวนเต็มไหม",
      options: ["จริง (True)", "เท็จ (False)"],
      correctIndex: 1,
      isSelected: true,
    },
    {
      id: "3",
      number: 3,
      question: "คำสั่งใดใช้สำหรับแสดงผลออกทางหน้าจอในภาษาซี",
      options: ["scanf()", "printf()", "cout", "System.out.println()"],
      correctIndex: 1,
      isSelected: true,
    },
    {
      id: "4",
      number: 4,
      question: "สัญลักษณ์ใดใน Flowchart ที่ใช้สำหรับการตัดสินใจหรือเงื่อนไข (Condition)",
      options: ["สี่เหลี่ยมผืนผ้า (Process)", "สี่เหลี่ยมขนมเปียกปูน (Decision)", "วงรี (Start/End)", "สี่เหลี่ยมด้านขนาน (Input/Output)"],
      correctIndex: 1,
      isSelected: false,
    },
  ]);

  const toggleSelect = (id: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, isSelected: !q.isSelected } : q
      )
    );
  };

  const selectedCount = questions.filter((q) => q.isSelected).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      {/* Top Banner matching Figma pdf-82 */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{docName}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">เลือกข้อสอบที่ต้องการ</h1>
        <p className="text-sm text-gray-500 mb-3">
          AI สร้างคำถามจากเนื้อหาในเอกสาร โปรดเลือกคำถามที่ต้องการรวมในแบบทดสอบ
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>AI สร้างเสร็จสมบูรณ์</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 font-medium">พบ {questions.length} คำถาม</span>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Questions List */}
        <div className="lg:col-span-2 space-y-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`rounded-2xl border bg-white p-6 transition-all duration-200 ${
                q.isSelected
                  ? "border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                  : "border-gray-200 shadow-xs"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                  ข้อ {q.number}
                </span>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="hover:text-blue-600 p-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="hover:text-red-600 p-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <h3 className="text-base font-bold text-gray-900 mb-4">{q.question}</h3>

              {/* Options */}
              <div className="space-y-2 mb-6">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition ${
                      idx === q.correctIndex
                        ? "border-blue-400 bg-blue-50/20 text-gray-900 font-semibold"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        idx === q.correctIndex
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {idx === q.correctIndex && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>

              {/* Select Toggle Button */}
              <div className="flex justify-end">
                {q.isSelected ? (
                  <CornerButton
                    variant="primary"
                    onClick={() => toggleSelect(q.id)}
                    className="text-xs px-5 py-2"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    }
                    iconPosition="left"
                  >
                    เลือกคำถามนี้แล้ว
                  </CornerButton>
                ) : (
                  <CornerButton
                    variant="outline"
                    onClick={() => toggleSelect(q.id)}
                    className="text-xs px-5 py-2"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    }
                    iconPosition="left"
                  >
                    เลือกคำถามนี้
                  </CornerButton>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Quiz Summary Sidebar matching Figma pdf-82 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6 sticky top-24">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">สรุปแบบทดสอบ</h3>
            <p className="text-xs text-gray-500 mb-6">
              ภาพรวมของคำถามที่คุณเลือกไว้สำหรับแบบทดสอบนี้
            </p>

            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/40 border border-blue-100">
              <div className="flex items-center gap-2.5 text-blue-800 text-sm font-semibold">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>คำถามที่เลือกแล้ว</span>
              </div>
              <span className="text-lg font-bold text-blue-700">
                {selectedCount}/20
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">กำหนดระยะเวลา</h4>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-gray-50/40">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{dateRange}</span>
            </div>
          </div>

          <div className="pt-2">
            <CornerButton
              variant="primary"
              onClick={() => setShowSuccessModal(true)}
              disabled={selectedCount === 0}
              className="w-full py-3"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              }
              iconPosition="left"
            >
              บันทึกแบบทดสอบ
            </CornerButton>
          </div>
        </div>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกแบบทดสอบจาก AI สำเร็จ"
        message={`บันทึกคำถามที่เลือกจำนวน ${selectedCount} ข้อเข้าสู่แบบทดสอบเรียบร้อยแล้ว`}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Quizzes");
        }}
      />
    </div>
  );
}
