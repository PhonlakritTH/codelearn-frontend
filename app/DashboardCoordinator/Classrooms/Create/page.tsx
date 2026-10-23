"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";

function CreateClassroomForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");

  const [term, setTerm] = useState("2569/1");
  const [groupCode, setGroupCode] = useState(editId ? "SEC01" : "");
  const [description, setDescription] = useState(
    editId
      ? "กลุ่มเรียนสำหรับนักศึกษาสาขาวิทยาการคอมพิวเตอร์ ชั้นปีที่ 1 ภาคปกติ"
      : ""
  );
  const [teacher, setTeacher] = useState(
    editId ? "ดร. กิตติศักดิ์ เจริญสุข" : "ดร. กิตติศักดิ์ เจริญสุข"
  );
  const [assistant, setAssistant] = useState(
    editId ? "นาย ก้องภพ สมใจ" : "นาย ก้องภพ สมใจ"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {editId ? "แก้ไขกลุ่มเรียน" : "เพิ่มกลุ่มเรียน"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Term selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              เทอมการสอน
            </label>
            <div className="relative">
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none bg-white cursor-pointer"
              >
                <option value="2569/1">2569/1</option>
                <option value="2568/2">2568/2</option>
                <option value="2568/1">2568/1</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Group code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              กลุ่มเรียน
            </label>
            <input
              type="text"
              required
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              placeholder="เช่น SEC01 หรือ กลุ่ม 1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              รายละเอียด
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุคำอธิบาย ตารางเวลา หรือห้องเรียน..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Teacher selector with Add button */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              อาจารย์ผู้สอน
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <select
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none bg-white cursor-pointer"
                >
                  <option value="ดร. กิตติศักดิ์ เจริญสุข">ดร. กิตติศักดิ์ เจริญสุข</option>
                  <option value="ผศ. ดร. ปิยะวรรณ สุวรรณโชติ">ผศ. ดร. ปิยะวรรณ สุวรรณโชติ</option>
                  <option value="อ. ธีรภัทร ชาญวิทย์">อ. ธีรภัทร ชาญวิทย์</option>
                  <option value="อ. ชนัญญา เมธาวี">อ. ชนัญญา เมธาวี</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <CornerButton
                href="/DashboardCoordinator/Teachers/Create"
                variant="outline"
                className="whitespace-nowrap"
              >
                เพิ่มอาจารย์ +
              </CornerButton>
            </div>
          </div>

          {/* Assistant selector with Add button */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ผู้ช่วยสอน
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <select
                  value={assistant}
                  onChange={(e) => setAssistant(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none bg-white cursor-pointer"
                >
                  <option value="นาย ก้องภพ สมใจ">นาย ก้องภพ สมใจ</option>
                  <option value="นางสาว มณีรัตน์ วงศ์สุข">นางสาว มณีรัตน์ วงศ์สุข</option>
                  <option value="นาย สิทธิชัย เอกอนันต์">นาย สิทธิชัย เอกอนันต์</option>
                  <option value="นาย ธนาคาร ชื่นใจ">นาย ธนาคาร ชื่นใจ</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <CornerButton
                href="/DashboardCoordinator/Teachers/Create"
                variant="outline"
                className="whitespace-nowrap"
              >
                เพิ่มอาจารย์ +
              </CornerButton>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex justify-end gap-3">
            <CornerButton
              variant="outline"
              onClick={() => router.push("/DashboardCoordinator/Classrooms")}
            >
              ยกเลิก
            </CornerButton>
            <CornerButton
              type="submit"
              variant="primary"
              className="px-8 py-3"
            >
              {editId ? "บันทึกการแก้ไข" : "สร้าง"}
            </CornerButton>
          </div>
        </form>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title={editId ? "บันทึกการแก้ไขสำเร็จ" : "สร้างกลุ่มเรียนสำเร็จ"}
        message={editId ? "ข้อมูลกลุ่มเรียนได้รับการอัปเดตเรียบร้อยแล้ว" : "เพิ่มกลุ่มเรียนใหม่เข้าสู่ระบบเรียบร้อยแล้ว"}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Classrooms");
        }}
      />
    </div>
  );
}

export default function CreateClassroomPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <CreateClassroomForm />
    </Suspense>
  );
}
