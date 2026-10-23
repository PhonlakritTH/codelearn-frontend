"use client";

import React, { useState } from "react";
import Link from "next/link";
import CornerButton from "../Components/CornerButton";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarColor: string;
}

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "ดร. กิตติศักดิ์ เจริญสุข",
      email: "kittisak@codelearn.ac.th",
      role: "อาจารย์ผู้สอน",
      avatarColor: "bg-blue-600",
    },
    {
      id: "2",
      name: "ผศ. ดร. ปิยะวรรณ สุวรรณโชติ",
      email: "piyawan.s@codelearn.ac.th",
      role: "อาจารย์ผู้สอน",
      avatarColor: "bg-emerald-600",
    },
    {
      id: "3",
      name: "อ. ธีรภัทร ชาญวิทย์",
      email: "theerapat.c@codelearn.ac.th",
      role: "อาจารย์ผู้สอน",
      avatarColor: "bg-purple-600",
    },
    {
      id: "4",
      name: "อ. ชนัญญา เมธาวี",
      email: "chananya.m@codelearn.ac.th",
      role: "อาจารย์ผู้สอน",
      avatarColor: "bg-amber-600",
    },
    {
      id: "5",
      name: "อ. วรากร ศิริวัฒน์",
      email: "warakorn.s@codelearn.ac.th",
      role: "อาจารย์ผู้สอน",
      avatarColor: "bg-rose-600",
    },
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      setTeachers(teachers.filter((t) => t.id !== deleteId));
      setDeleteId(null);
    }
  };

  const teacherToDelete = teachers.find((t) => t.id === deleteId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Header & Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <CornerButton
            href="/DashboardCoordinator/Teachers/Create"
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Create Account
          </CornerButton>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">อาจารย์ผู้สอน</th>
                <th scope="col" className="px-6 py-4">อีเมล</th>
                <th scope="col" className="px-6 py-4">บทบาท</th>
                <th scope="col" className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${teacher.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                        {teacher.name.slice(0, 2)}
                      </div>
                      <span>{teacher.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{teacher.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {teacher.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/DashboardCoordinator/Teachers/Edit?id=${teacher.id}`}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                          title="แก้ไข"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setDeleteId(teacher.id)}
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
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    ไม่พบข้อมูลอาจารย์ผู้สอน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
            View Full Directory
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteId}
        itemName={teacherToDelete?.name}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
