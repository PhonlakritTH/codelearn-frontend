"use client";

import React, { useState } from "react";
import Link from "next/link";
import CornerButton from "../Components/CornerButton";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";

interface LabItem {
  id: string;
  name: string;
  version: number;
  status: "ร่าง" | "เผยแพร่" | "เก็บเข้าคลัง";
}

export default function LabsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("ทั้งหมด");
  const [labs, setLabs] = useState<LabItem[]>([
    {
      id: "1",
      name: "Lab 01: การเขียนโปรแกรมแสดงผลเบื้องต้น",
      version: 3,
      status: "เผยแพร่",
    },
    {
      id: "2",
      name: "Lab 02: ตัวแปร ชนิดข้อมูล และตัวดำเนินการคำนวณ",
      version: 2,
      status: "เผยแพร่",
    },
    {
      id: "3",
      name: "Lab 03: โครงสร้างแบบมีเงื่อนไข (If-Else & Switch-Case)",
      version: 1,
      status: "ร่าง",
    },
    {
      id: "4",
      name: "Lab 04: การวนรอบการทำงาน (For, While, Do-While)",
      version: 1,
      status: "ร่าง",
    },
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredLabs = labs.filter((lab) => {
    if (statusFilter === "ทั้งหมด") return true;
    return lab.status === statusFilter;
  });

  const handleDelete = () => {
    if (deleteId) {
      setLabs(labs.filter((l) => l.id !== deleteId));
      setDeleteId(null);
    }
  };

  const itemToDelete = labs.find((l) => l.id === deleteId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Header & Filter */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">สถานะ:</span>
            <div className="inline-flex rounded-xl border border-gray-200 p-1 bg-gray-50/50">
              {["ทั้งหมด", "เผยแพร่", "ร่าง"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    statusFilter === st
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <CornerButton
            href="/DashboardCoordinator/Labs/Create"
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            เพิ่มใบงาน
          </CornerButton>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">ชื่อใบงาน</th>
                <th scope="col" className="px-6 py-4 text-center">เวอร์ชัน</th>
                <th scope="col" className="px-6 py-4 text-center">สถานะ</th>
                <th scope="col" className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLabs.length > 0 ? (
                filteredLabs.map((lab) => (
                  <tr key={lab.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {lab.name}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-700">
                      v{lab.version}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          lab.status === "เผยแพร่"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {lab.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/DashboardCoordinator/Labs/Create?editId=${lab.id}`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="ดูใบงาน"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/DashboardCoordinator/Labs/Create?editId=${lab.id}`}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                          title="แก้ไข"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setDeleteId(lab.id)}
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
                    ไม่พบใบงานตามสถานะที่เลือก
                  </td>
                </tr>
              )}
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
        itemName={itemToDelete?.name}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
