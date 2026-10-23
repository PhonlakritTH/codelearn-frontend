"use client";

import React, { useState } from "react";
import CornerButton from "../Components/CornerButton";
import SaveSuccessModal from "../Components/SaveSuccessModal";

export default function CoordinatorSettingsPage() {
  const [name, setName] = useState("ดร. ฟอร์ด ธนกฤต (Ford Coordinator)");
  const [email, setEmail] = useState("coordinator@codelearn.ac.th");
  const [role, setRole] = useState("อาจารย์ผู้รับผิดชอบรายวิชา (Course Coordinator)");
  const [aiStrictness, setAiStrictness] = useState("มาตรฐาน (Standard)");
  const [autoGrading, setAutoGrading] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">การตั้งค่าระบบ (Settings)</h1>
          <p className="text-sm text-gray-500">จัดการข้อมูลส่วนตัว ความเข้มงวดของ AI และการแจ้งเตือน</p>
        </div>
        <CornerButton
          onClick={handleSave}
          variant="primary"
          className="px-8 py-2.5"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          }
          iconPosition="left"
        >
          บันทึกการตั้งค่า
        </CornerButton>
      </div>

      {/* Profile info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">ข้อมูลผู้รับผิดชอบรายวิชา</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมลติดต่อ</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ตำแหน่ง / บทบาทในระบบ</label>
          <input
            type="text"
            readOnly
            value={role}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-600 font-medium"
          />
        </div>
      </div>

      {/* AI Evaluation Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">การตั้งค่า AI Tutor & Code Grader</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ระดับความเข้มงวดในการตรวจคำตอบ (AI Strictness)</label>
          <select
            value={aiStrictness}
            onChange={(e) => setAiStrictness(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 bg-white"
          >
            <option value="ยืดหยุ่น (Lenient) - ตรวจสอบเฉพาะผลลัพธ์ Output">ยืดหยุ่น (Lenient) - ตรวจสอบเฉพาะผลลัพธ์ Output</option>
            <option value="มาตรฐาน (Standard) - ตรวจสอบ Output และความถูกต้องของไวยากรณ์">มาตรฐาน (Standard) - ตรวจสอบ Output และความถูกต้องของไวยากรณ์</option>
            <option value="เข้มงวดสูง (Strict) - ตรวจสอบ Clean Code, Logic และ Memory Leak">เข้มงวดสูง (Strict) - ตรวจสอบ Clean Code, Logic และ Memory Leak</option>
          </select>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoGrading}
              onChange={(e) => setAutoGrading(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-800">
              เปิดใช้งาน Auto-Grading ทันทีเมื่อนักศึกษากด Submit
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-800">
              ส่งอีเมลแจ้งเตือนสรุปผลประจำสัปดาห์
            </span>
          </label>
        </div>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกการตั้งค่าสำเร็จ"
        message="การตั้งค่าระบบและโปรไฟล์ของคุณได้รับการอัปเดตเรียบร้อยแล้ว"
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
