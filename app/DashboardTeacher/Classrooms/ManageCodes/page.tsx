"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, Eye, Edit3, Trash2, Plus, ChevronDown } from "lucide-react";
import CornerButton from "../../Components/CornerButton";

interface ClassroomCodeRecord {
  id: string;
  code: string;
  teacherInitials: string;
  teacherName: string;
  term: string;
  groupNumber: string;
}

const mockCodeRecords: ClassroomCodeRecord[] = [
  {
    id: "1",
    code: "X79-QPL",
    teacherInitials: "AJ",
    teacherName: "โชคอนันต์ อันโน",
    term: "1/2569",
    groupNumber: "1",
  },
  {
    id: "2",
    code: "A84-QPR",
    teacherInitials: "SW",
    teacherName: "โชคอนันต์ อันโน",
    term: "2/2569",
    groupNumber: "2",
  },
  {
    id: "3",
    code: "E68-QPF",
    teacherInitials: "MC",
    teacherName: "โชคอนันต์ อันโน",
    term: "1/2569",
    groupNumber: "3",
  },
  {
    id: "4",
    code: "F45-QPL",
    teacherInitials: "EP",
    teacherName: "โชคอนันต์ อันโน",
    term: "2/2569",
    groupNumber: "4",
  },
];

export default function ManageCodesPage() {
  const [selectedTerm, setSelectedTerm] = useState("เทอม 1");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [records, setRecords] = useState(mockCodeRecords);

  const handleDelete = (id: string) => {
    if (confirm("คุณต้องการลบรหัสห้องเรียนนี้ใช่หรือไม่?")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
            รายการห้องเรียนทั้งหมด
          </h1>
          <p className="text-sm text-gray-500">
            ดูและจัดการรหัสการเข้าร่วมห้องเรียนสำหรับทุกกลุ่มเรียน
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Term Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#DDE3F5] bg-white px-4 py-2 text-sm font-semibold text-[#14213F] shadow-xs hover:bg-gray-50"
            >
              <Filter size={16} className="text-[#2563EB]" />
              <span>{selectedTerm}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black/5">
                {["ทั้งหมด", "เทอม 1", "เทอม 2"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTerm(t);
                      setIsFilterOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <CornerButton
            href="/DashboardTeacher/Classrooms/CreateCode"
            variant="primary"
            icon={<Plus size={18} />}
            iconPosition="left"
          >
            สร้างรหัสใหม่
          </CornerButton>
        </div>
      </div>

      {/* Table Container matching PDF page 48 */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="border-b border-[#E2E8F0] p-5">
          <h2 className="text-lg font-bold text-[#14213F]">
            รายการห้องเรียนทั้งหมด
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">รหัสห้องเรียน</th>
                <th className="px-6 py-4">ชื่ออาจารย์ที่รับผิดชอบ</th>
                <th className="px-6 py-4">เทอม</th>
                <th className="px-6 py-4">กลุ่มเรียน</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-bold text-[#0B3FA6]">
                    {r.code}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                        {r.teacherInitials}
                      </div>
                      <span className="font-medium text-[#14213F]">
                        {r.teacherName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{r.term}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {r.groupNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/DashboardTeacher/Classrooms/${r.groupNumber}`}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="ดูรายละเอียดกลุ่ม"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        title="แก้ไข"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                        title="ลบ"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2E8F0] bg-[#FAFBFD] p-3 text-center">
          <button
            type="button"
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View Full List
          </button>
        </div>
      </div>
    </div>
  );
}
