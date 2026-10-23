"use client";

import { useState } from "react";
import { Filter, Users, CheckCircle2, ChevronDown, Plus, BookOpen } from "lucide-react";
import CornerCard from "../Components/CornerCard";
import CornerButton from "../Components/CornerButton";

interface ClassroomGroup {
  id: string;
  name: string;
  courseName: string;
  totalStudents: number;
  submittedCount: number;
  term: string;
}

const mockGroups: ClassroomGroup[] = [
  {
    id: "2",
    name: "กลุ่มเรียนที่ 2",
    courseName: "การโปรแกรมภาษาซี (C Programming)",
    totalStudents: 24,
    submittedCount: 20,
    term: "เทอม 1 / 2569",
  },
  {
    id: "1",
    name: "กลุ่มเรียนที่ 1",
    courseName: "การโปรแกรมภาษาซี (C Programming)",
    totalStudents: 24,
    submittedCount: 10,
    term: "เทอม 1 / 2569",
  },
];

export default function ClassroomsPage() {
  const [selectedTerm, setSelectedTerm] = useState("เทอม 1 / 2569");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const terms = ["เทอม 1 / 2569", "เทอม 2 / 2569", "เทอม 1 / 2568"];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Top action row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
            รายละเอียดห้องเรียน
          </h1>
          <p className="text-sm text-gray-500">
            จัดการกลุ่มเรียน ติดตามความคืบหน้านักศึกษา และสร้างรหัสเข้าร่วมชั้นเรียน
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Term filter button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#DDE3F5] bg-white px-4 py-2 text-sm font-semibold text-[#14213F] shadow-xs hover:bg-gray-50"
            >
              <Filter size={16} className="text-[#2563EB]" />
              <span>{selectedTerm}</span>
              <ChevronDown size={15} className="text-gray-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black/5">
                {terms.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTerm(t);
                      setIsFilterOpen(false);
                    }}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-sm ${
                      t === selectedTerm
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create Code Quick Button */}
          <CornerButton
            href="/DashboardTeacher/Classrooms/CreateCode"
            variant="primary"
            icon={<Plus size={18} />}
            iconPosition="left"
          >
            สร้างรหัสห้องเรียน
          </CornerButton>
        </div>
      </div>

      {/* Grid of groups matching PDF page 45 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {mockGroups.map((group) => {
          const submissionPercentage = Math.round(
            (group.submittedCount / group.totalStudents) * 100
          );

          return (
            <CornerCard
              key={group.id}
              href={`/DashboardTeacher/Classrooms/${group.id}`}
              className="border border-[#E2E8F0] bg-white p-7"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#14213F]">
                      {group.name}
                    </h2>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                      <BookOpen size={14} className="text-[#2563EB]" />
                      <span>{group.courseName}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                    {group.term}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F5F9] text-gray-600">
                      <Users size={17} />
                    </div>
                    <span>จำนวนนักศึกษา <strong className="text-[#14213F]">{group.totalStudents}</strong> คน</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <CheckCircle2 size={17} />
                    </div>
                    <span>ส่งงานแล้ว <strong className="text-green-700">{group.submittedCount}</strong> คน</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>ความคืบหน้าการส่งงาน</span>
                    <span className="font-semibold text-[#14213F]">{submissionPercentage}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#315BFF] to-[#1D4ED8] transition-all duration-500"
                      style={{ width: `${submissionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CornerCard>
          );
        })}
      </div>
    </div>
  );
}
