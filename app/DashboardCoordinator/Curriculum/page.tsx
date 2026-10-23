"use client";

import React, { useState } from "react";
import CornerButton from "../Components/CornerButton";
import SaveSuccessModal from "../Components/SaveSuccessModal";

export default function CurriculumPage() {
  const [courseCode, setCourseCode] = useState("060163101");
  const [courseName, setCourseName] = useState("Computer Programming Fundamentals (การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น)");
  const [credits, setCredits] = useState("3 (2-2-5)");
  const [midtermWeight, setMidtermWeight] = useState(25);
  const [finalWeight, setFinalWeight] = useState(30);
  const [labWeight, setLabWeight] = useState(30);
  const [quizWeight, setQuizWeight] = useState(15);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [weeklySyllabus, setWeeklySyllabus] = useState([
    { week: 1, title: "ความรู้เบื้องต้นเกี่ยวกับการเขียนโปรแกรมคอมพิวเตอร์และ IDE", hours: 4 },
    { week: 2, title: "การวิเคราะห์ปัญหาและออกแบบผังงาน (Flowchart) ด้วย Flowgorithm", hours: 4 },
    { week: 3, title: "โครงสร้างภาษา C ตัวแปร ชนิดข้อมูล และตัวดำเนินการ", hours: 4 },
    { week: 4, title: "การควบคุมทิศทางแบบมีเงื่อนไข (If-Else & Switch-Case)", hours: 4 },
    { week: 5, title: "โครงสร้างการทำงานแบบวนรอบ (While, Do-While, For)", hours: 4 },
    { week: 6, title: "อาร์เรย์ 1 มิติและ 2 มิติ (Arrays)", hours: 4 },
    { week: 7, title: "ฟังก์ชันและการส่งผ่านพารามิเตอร์ (Functions)", hours: 4 },
    { week: 8, title: "สอบกลางภาค (Midterm Examination)", hours: 3 },
  ]);

  const totalWeight = midtermWeight + finalWeight + labWeight + quizWeight;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">จัดรูปแบบการสอน</h1>
          <p className="text-sm text-gray-500">กำหนดโครงสร้างหลักสูตร เกณฑ์การวัดผล และแผนการสอนรายสัปดาห์</p>
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
          บันทึกการจัดรูปแบบ
        </CornerButton>
      </div>

      {/* Basic Course Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">ข้อมูลรายวิชา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสวิชา</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 font-mono"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อรายวิชา</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">หน่วยกิต (ทฤษฎี-ปฏิบัติ-ศึกษาด้วยตนเอง)</label>
          <input
            type="text"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Grading Weights Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-lg font-bold text-gray-900">เกณฑ์สัดส่วนคะแนนการประเมินผล (Grading Criteria)</h2>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${totalWeight === 100 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            รวม: {totalWeight}%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">สอบกลางภาค (%)</label>
            <input
              type="number"
              value={midtermWeight}
              onChange={(e) => setMidtermWeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-lg font-bold text-gray-900"
            />
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">สอบปลายภาค (%)</label>
            <input
              type="number"
              value={finalWeight}
              onChange={(e) => setFinalWeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-lg font-bold text-gray-900"
            />
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">การทดลอง Lab (%)</label>
            <input
              type="number"
              value={labWeight}
              onChange={(e) => setLabWeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-lg font-bold text-gray-900"
            />
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">แบบทดสอบ Quiz (%)</label>
            <input
              type="number"
              value={quizWeight}
              onChange={(e) => setQuizWeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-lg font-bold text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Weekly Syllabus Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">แผนการสอนรายสัปดาห์ (Weekly Syllabus)</h2>
          <CornerButton
            onClick={() => {
              setWeeklySyllabus([
                ...weeklySyllabus,
                { week: weeklySyllabus.length + 1, title: "หัวข้อการเรียนรู้ใหม่", hours: 4 },
              ]);
            }}
            variant="outline"
            className="text-xs px-4 py-2"
          >
            + เพิ่มสัปดาห์
          </CornerButton>
        </div>

        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 w-24 text-center">สัปดาห์</th>
              <th scope="col" className="px-6 py-4">หัวข้อเนื้อหา</th>
              <th scope="col" className="px-6 py-4 text-center w-28">ชม.</th>
              <th scope="col" className="px-6 py-4 text-center w-20">ลบ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {weeklySyllabus.map((item) => (
              <tr key={item.week} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 text-center font-bold text-blue-600">
                  W{item.week}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-center text-gray-500">
                  {item.hours}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setWeeklySyllabus(weeklySyllabus.filter((w) => w.week !== item.week))}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกการจัดรูปแบบการสอนสำเร็จ"
        message="การตั้งค่าหลักสูตรและเกณฑ์การให้คะแนนได้รับการบันทึกเรียบร้อยแล้ว"
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
