"use client";

import React, { useState } from "react";
import Link from "next/link";
import CornerButton from "../Components/CornerButton";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";

interface Classroom {
  id: string;
  code: string;
  name: string;
  teacher: string;
  assistant: string;
  studentCount: number;
  term: string;
}

export default function ClassroomsPage() {
  const [selectedTerm, setSelectedTerm] = useState("2569/1");
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: "1",
      code: "SEC01",
      name: "กลุ่ม 1 - วันจันทร์เช้า",
      teacher: "ดร. กิตติศักดิ์ เจริญสุข",
      assistant: "นาย ก้องภพ สมใจ",
      studentCount: 45,
      term: "2569/1",
    },
    {
      id: "2",
      code: "SEC02",
      name: "กลุ่ม 2 - วันอังคารบ่าย",
      teacher: "ผศ. ดร. ปิยะวรรณ สุวรรณโชติ",
      assistant: "นางสาว มณีรัตน์ วงศ์สุข",
      studentCount: 42,
      term: "2569/1",
    },
    {
      id: "3",
      code: "SEC03",
      name: "กลุ่ม 3 - วันพุธเช้า",
      teacher: "อ. ธีรภัทร ชาญวิทย์",
      assistant: "นาย สิทธิชัย เอกอนันต์",
      studentCount: 48,
      term: "2569/1",
    },
    {
      id: "4",
      code: "SEC04",
      name: "กลุ่ม 4 - วันพฤหัสบดีบ่าย",
      teacher: "อ. ชนัญญา เมธาวี",
      assistant: "นาย ธนาคาร ชื่นใจ",
      studentCount: 40,
      term: "2569/1",
    },
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredClassrooms = classrooms.filter((c) => c.term === selectedTerm);

  const handleDelete = () => {
    if (deleteId) {
      setClassrooms(classrooms.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  const itemToDelete = classrooms.find((c) => c.id === deleteId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Top Header with Term select & Add Button */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ภาคการศึกษา:
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer bg-white"
            >
              <option value="2569/1">2569/1</option>
              <option value="2568/2">2568/2</option>
              <option value="2568/1">2568/1</option>
            </select>
          </div>

          <CornerButton
            href="/DashboardCoordinator/Classrooms/Create"
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            เพิ่มกลุ่มเรียน
          </CornerButton>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">รหัสกลุ่มเรียน</th>
                <th scope="col" className="px-6 py-4">กลุ่มเรียน</th>
                <th scope="col" className="px-6 py-4">อาจารย์ผู้สอน</th>
                <th scope="col" className="px-6 py-4">ผู้ช่วยสอน</th>
                <th scope="col" className="px-6 py-4 text-center">จำนวนนักเรียน</th>
                <th scope="col" className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClassrooms.length > 0 ? (
                filteredClassrooms.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {c.code}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {c.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{c.teacher}</td>
                    <td className="px-6 py-4 text-gray-500">{c.assistant}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">
                      {c.studentCount} คน
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/DashboardTeacher/Classrooms`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="ดูห้องเรียน"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/DashboardCoordinator/Classrooms/Create?editId=${c.id}`}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                          title="แก้ไข"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          title="ลบ"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    ไม่พบข้อมูลกลุ่มเรียนในภาคการศึกษานี้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        itemName={itemToDelete?.name}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
