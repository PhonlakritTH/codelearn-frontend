"use client";

import React, { useState } from "react";
import Link from "next/link";
import CornerButton from "../Components/CornerButton";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";

interface SemesterItem {
  id: string;
  term: string;
  midtermDate: string;
  finalDate: string;
  classroomsCount: number;
}

export default function SemestersPage() {
  const [semesters, setSemesters] = useState<SemesterItem[]>([
    {
      id: "1",
      term: "2569/2",
      midtermDate: "27 ส.ค. 2569",
      finalDate: "27 ต.ค. 2569",
      classroomsCount: 2,
    },
    {
      id: "2",
      term: "2569/1",
      midtermDate: "27 ส.ค. 2569",
      finalDate: "27 ส.ค. 2569",
      classroomsCount: 2,
    },
    {
      id: "3",
      term: "2568/2",
      midtermDate: "27 ต.ค. 2568",
      finalDate: "27 ส.ค. 2569",
      classroomsCount: 2,
    },
    {
      id: "4",
      term: "2568/1",
      midtermDate: "27 ส.ค. 2568",
      finalDate: "27 ส.ค. 2569",
      classroomsCount: 2,
    },
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setSemesters(semesters.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    }
  };

  const itemToDelete = semesters.find((s) => s.id === deleteId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Header & Add Button */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">รายการภาคการศึกษา</h2>
          </div>

          <CornerButton
            href="/DashboardCoordinator/Semesters/Create"
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            เพิ่มเทอม
          </CornerButton>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">เทอม</th>
                <th scope="col" className="px-6 py-4">วันสอบกลางภาค</th>
                <th scope="col" className="px-6 py-4">วันสอบปลายภาค</th>
                <th scope="col" className="px-6 py-4 text-center">จำนวนกลุ่มเรียน</th>
                <th scope="col" className="px-6 py-4 text-center">Action</th>
                <th scope="col" className="px-6 py-4 text-center">จัดการบทเรียน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {semesters.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/70 transition">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {s.term}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{s.midtermDate}</td>
                  <td className="px-6 py-4 text-gray-600">{s.finalDate}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-800">
                    {s.classroomsCount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/DashboardCoordinator/Semesters/Chapters?term=${s.term}`}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="ดูรายละเอียด"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/DashboardCoordinator/Semesters/Create?editId=${s.id}`}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                        title="แก้ไขเทอม"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => setDeleteId(s.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        title="ลบเทอม"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CornerButton
                      href={`/DashboardCoordinator/Semesters/Chapters?term=${s.term}`}
                      variant="primary"
                      className="text-xs px-3.5 py-1.5 rounded-lg"
                    >
                      จัดการบทเรียน
                    </CornerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
            View Full List
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        itemName={`เทอม ${itemToDelete?.term}`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
