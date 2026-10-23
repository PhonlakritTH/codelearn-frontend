"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Filter,
  Eye,
  Save,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import CornerButton from "../../Components/CornerButton";

interface AssignmentItem {
  id: string;
  slug: string;
  title: string;
  submittedCount: number;
  totalCount: number;
}

const labAssignments: AssignmentItem[] = [
  {
    id: "1",
    slug: "lab-1",
    title: "ใบงานที่ 1 ทดลองเขียนอัลกอริทึมด้วย Flowgorithm",
    submittedCount: 24,
    totalCount: 24,
  },
  {
    id: "2",
    slug: "lab-2",
    title: "ใบงานที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
    submittedCount: 24,
    totalCount: 24,
  },
  {
    id: "3",
    slug: "lab-3",
    title: "ใบงานที่ 3 ทดลองการใช้งานภาษาซี",
    submittedCount: 24,
    totalCount: 24,
  },
  {
    id: "4",
    slug: "lab-4",
    title: "ใบงานที่ 4 ชนิดของข้อมูลและตัวดำเนินการ",
    submittedCount: 23,
    totalCount: 24,
  },
];

const quizAssignments: AssignmentItem[] = [
  {
    id: "q1",
    slug: "quiz-1",
    title: "Quiz ที่ 1 ทดลองเขียนอัลกอริทึมด้วย Flowgorithm",
    submittedCount: 24,
    totalCount: 24,
  },
  {
    id: "q2",
    slug: "quiz-2",
    title: "Quiz ที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
    submittedCount: 24,
    totalCount: 24,
  },
  {
    id: "q3",
    slug: "quiz-3",
    title: "Quiz ที่ 3 ทดลองการใช้งานภาษาซี",
    submittedCount: 24,
    totalCount: 24,
  },
  {
    id: "q4",
    slug: "quiz-4",
    title: "Quiz ที่ 4 ชนิดของข้อมูลและตัวดำเนินการ",
    submittedCount: 23,
    totalCount: 24,
  },
];

export default function SubmissionsHubPage() {
  const [activeType, setActiveType] = useState<"LAB" | "QUIZ">("LAB");
  const [term, setTerm] = useState("เทอม 1");
  const [contentPeriod, setContentPeriod] = useState("เนื้อหากลางภาค");
  const [selectedAssignmentIndex, setSelectedAssignmentIndex] = useState(0);

  // Calendar popup state matching pdf-51
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("April");
  const [currentYear, setCurrentYear] = useState("2021");
  const [selectedDay, setSelectedDay] = useState(7);
  const [dateRangeText, setDateRangeText] = useState("20 สิงหาคม - 22 สิงหาคม 2569");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dropdown menus
  const [openTermMenu, setOpenTermMenu] = useState(false);
  const [openPeriodMenu, setOpenPeriodMenu] = useState(false);
  const [openTypeMenu, setOpenTypeMenu] = useState(false);

  const currentList = activeType === "LAB" ? labAssignments : quizAssignments;
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

  const handleOpenSaveModal = () => {
    setShowSaveConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowSaveConfirmModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };


  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Title Header matching pdf-50 / pdf-57 */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#14213F]">
          {activeType === "LAB" ? "Lab" : "Quiz"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Check the {activeType === "LAB" ? "Lab" : "Quiz"} work submitted by the students.
        </p>
      </div>

      {saveSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700 animate-fade-in">
          ✓ บันทึกกำหนดการส่งงานเรียบร้อยแล้ว
        </div>
      )}

      {/* Main Grid: Left (History List) & Right (Deadline Settings) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: ประวัติการส่งงาน (7 cols) */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs lg:col-span-7">
          {/* Header with Title and 3 Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-[#14213F]">
              ประวัติการส่งงาน
            </h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Term Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenTermMenu(!openTermMenu);
                    setOpenPeriodMenu(false);
                    setOpenTypeMenu(false);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-[#DDE3F5] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#14213F] transition hover:bg-gray-50"
                >
                  <Filter size={13} className="text-[#2563EB]" />
                  <span>{term}</span>
                  <ChevronDown size={12} className="text-gray-400" />
                </button>
                {openTermMenu && (
                  <div className="absolute right-0 z-20 mt-1 w-32 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                    {["เทอม 1", "เทอม 2"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTerm(t);
                          setOpenTermMenu(false);
                        }}
                        className="flex w-full items-center px-3.5 py-1.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Period Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenPeriodMenu(!openPeriodMenu);
                    setOpenTermMenu(false);
                    setOpenTypeMenu(false);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-[#DDE3F5] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#14213F] transition hover:bg-gray-50"
                >
                  <Filter size={13} className="text-[#2563EB]" />
                  <span>{contentPeriod}</span>
                  <ChevronDown size={12} className="text-gray-400" />
                </button>
                {openPeriodMenu && (
                  <div className="absolute right-0 z-20 mt-1 w-36 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                    {["เนื้อหากลางภาค", "เนื้อหาปลายภาค"].map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setContentPeriod(p);
                          setOpenPeriodMenu(false);
                        }}
                        className="flex w-full items-center px-3.5 py-1.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Type Pill: LAB / QUIZ switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenTypeMenu(!openTypeMenu);
                    setOpenTermMenu(false);
                    setOpenPeriodMenu(false);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-[#2563EB] bg-[#EBF0FF] px-3.5 py-1.5 text-xs font-bold text-[#2563EB] shadow-xs transition hover:bg-[#DEE7FF]"
                >
                  <Filter size={13} className="text-[#2563EB]" />
                  <span>{activeType}</span>
                  <ChevronDown size={12} className="text-[#2563EB]" />
                </button>
                {openTypeMenu && (
                  <div className="absolute right-0 z-20 mt-1 w-28 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                    {(["LAB", "QUIZ"] as const).map((typ) => (
                      <button
                        key={typ}
                        onClick={() => {
                          setActiveType(typ);
                          setOpenTypeMenu(false);
                        }}
                        className="flex w-full items-center px-3.5 py-1.5 text-left text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {typ}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assignment Rows matching pdf-50 / pdf-57 */}
          <div className="divide-y divide-gray-100">
            {currentList.map((item, idx) => {
              const isCompleted = item.submittedCount === item.totalCount;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 transition hover:bg-slate-50/70 px-2 rounded-xl"
                >
                  <div className="text-sm font-semibold text-[#14213F]">
                    {item.title}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Badge */}
                    {isCompleted ? (
                      <span className="rounded-full bg-[#E6F4EA] px-3 py-1 text-xs font-semibold text-[#137333]">
                        ครบแล้ว {item.submittedCount} /{item.totalCount} คน
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#FCE8E6] px-3 py-1 text-xs font-semibold text-[#C5221F]">
                        ยังไม่ครบ {item.submittedCount}/{item.totalCount} คน
                      </span>
                    )}

                    {/* View Eye Button */}
                    <Link
                      href={`/DashboardTeacher/Classrooms/Submissions/${item.slug}`}
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] transition"
                      title="ดูผลงานที่ส่ง"
                    >
                      <Eye size={19} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: กำหนดการส่งงาน (5 cols) matching pdf-50 / pdf-57 */}
        <div className="relative rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs lg:col-span-5 space-y-5">
          <h2 className="text-lg font-bold text-[#14213F]">
            กำหนดการส่งงาน
          </h2>

          {/* Radio Options List inside rounded borders */}
          <div className="space-y-2.5">
            {currentList.map((item, idx) => {
              const isSelected = selectedAssignmentIndex === idx;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedAssignmentIndex(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Custom Radio Circle matching Figma */}
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#2563EB] bg-[#2563EB]"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>

                  <span className="text-xs font-medium text-[#14213F]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Date Selector Box matching pdf-50 (Opens Calendar popup) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-[#14213F] shadow-xs transition hover:border-blue-500 hover:ring-2 hover:ring-blue-100"
            >
              <span>{dateRangeText}</span>
            </button>

            {/* Interactive Calendar Popup matching pdf-51 exactly */}
            {isCalendarOpen && (
              <div className="absolute top-full left-0 z-30 mt-3 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl animate-fade-in">
                {/* Month & Year Navigation Header */}
                <div className="flex items-center justify-between pb-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-bold text-gray-900 text-sm">
                      {currentMonth} <span className="text-blue-600 text-xs">▲</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-gray-900 text-sm">
                      {currentYear} <span className="text-blue-600 text-xs">▲</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDay(Math.min(30, selectedDay + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-700 py-1">
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                  <span>Su</span>
                </div>

                {/* Days Grid matching pdf-51 */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs pt-1">
                  {/* Previous month grey days */}
                  <span className="py-2 text-gray-300 font-semibold">29</span>
                  <span className="py-2 text-gray-300 font-semibold">30</span>
                  <span className="py-2 text-gray-300 font-semibold">31</span>

                  {/* April days 1 to 30 */}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const isPicked = day === selectedDay;
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => {
                          setSelectedDay(day);
                          setDateRangeText(`${day} เมษายน - ${day + 2} เมษายน 2569`);
                          setIsCalendarOpen(false);
                        }}
                        className={`rounded-lg py-2 font-bold transition ${
                          isPicked
                            ? "bg-[#2563EB] text-white shadow-xs"
                            : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}

                  {/* Next month days */}
                  <span className="py-2 text-gray-300 font-semibold">1</span>
                  <span className="py-2 text-gray-300 font-semibold">2</span>
                </div>
              </div>
            )}
          </div>

          {/* บันทึกกำหนดการ Button with CornerButton & Save Icon */}
          <CornerButton
            onClick={handleOpenSaveModal}
            variant="primary"
            className="w-full py-3"
            icon={<Save size={18} />}
            iconPosition="left"
          >
            บันทึกกำหนดการ
          </CornerButton>
        </div>
      </div>

      {/* Save Schedule Confirmation Modal matching pdf-38, pdf-40, pdf-41 */}
      {showSaveConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl border border-gray-100">
            <p className="text-base font-semibold text-[#14213F] leading-relaxed">
              หากคุณกดบันทึกแล้วระบบจะทำการโพสต์เนื้อหาให้นักศึกษาเห็นทันที หลังจากบันทึกคุณยังสามารถแก้ไขได้ในหน้าแก้ไขเนื้อหา
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setShowSaveConfirmModal(false)}
                type="button"
                className="flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-sm font-bold text-white shadow-xs hover:bg-[#E03126] transition active:scale-95"
              >
                ✕ ยกเลิก
              </button>
              <button
                onClick={handleConfirmSave}
                type="button"
                className="flex-1 rounded-xl bg-[#22C55E] py-2.5 text-sm font-bold text-white shadow-xs hover:bg-[#16A34A] transition active:scale-95"
              >
                ✓ ตกลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

