"use client";

import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  Eye,
  ArrowLeft,
  Search,
} from "lucide-react";
import CornerCard from "../../../Components/CornerCard";

interface StudentSubmission {
  id: string;
  studentId: string;
  name: string;
  initials: string;
  submitTime: string;
  score: string;
  status: "submitted" | "pending";
}

const titlesBySlug: Record<string, string> = {
  "lab-1": "ใบงานที่ 1 ทดลองการเขียนอัลกอริทึม ด้วย Flowgorithm",
  "lab-2": "ใบงานที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
  "lab-3": "ใบงานที่ 3 ทดลองการใช้งานภาษาซี",
  "lab-4": "ใบงานที่ 4 โครงสร้างภาษา C เบื้องต้น",
  "quiz-1": "Quiz ที่ 1 ทดลองเขียนอัลกอริทึมด้วย Flowgorithm",
  "quiz-2": "Quiz ที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
  "quiz-3": "Quiz ที่ 3 ทดลองการใช้งานภาษาซี",
  "quiz-4": "Quiz ที่ 4 ชนิดข้อมูลและตัวดำเนินการ",
};

const initialSubmissions: StudentSubmission[] = [
  {
    id: "student-1",
    studentId: "116730462022-8",
    name: "โชคอนันต์ อันโน",
    initials: "AJ",
    submitTime: "18 / สิงหาคม / 2569 13:34 น.",
    score: "10/10",
    status: "submitted",
  },
  {
    id: "student-2",
    studentId: "116730242022-4",
    name: "Sarah Williams",
    initials: "SW",
    submitTime: "18 / สิงหาคม / 2569 13:40 น.",
    score: "8/10",
    status: "submitted",
  },
  {
    id: "student-3",
    studentId: "116730462022-3",
    name: "Michael Chen",
    initials: "MC",
    submitTime: "18 / สิงหาคม / 2569 13:50 น.",
    score: "7/10",
    status: "submitted",
  },
  {
    id: "student-4",
    studentId: "116730462022-5",
    name: "Emily Parker",
    initials: "EP",
    submitTime: "-",
    score: "-",
    status: "pending",
  },
];

function AssignmentSubmissionListContent() {
  const params = useParams();
  const labId = (params?.labId as string) || "lab-1";
  const [searchTerm, setSearchTerm] = useState("");

  const pageTitle = titlesBySlug[labId] || "ใบงานที่ 1 ทดลองการเขียนอัลกอริทึม ด้วย Flowgorithm";

  const totalCount = 24;
  const submittedCount = 23;
  const pendingCount = 1;

  const filteredStudents = initialSubmissions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/DashboardTeacher/Classrooms/Submissions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>กลับไปหน้าประวัติการส่งงาน</span>
        </Link>
      </div>

      {/* Header Title matching pdf-52 & pdf-54 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
          {pageTitle}
        </h1>
        <p className="mt-1 text-sm text-gray-500">Check work submission</p>
      </div>

      {/* 3 Stat Cards in a row matching pdf-52 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Card 1: All Students */}
        <CornerCard className="border border-[#E2E8F0] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xs">
              <Users size={22} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                นักศึกษาทั้งหมด
              </div>
              <div className="text-3xl font-extrabold text-[#14213F]">
                {totalCount}
              </div>
            </div>
          </div>
        </CornerCard>

        {/* Card 2: Submitted */}
        <CornerCard className="border border-[#E2E8F0] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white shadow-xs">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                ส่งแล้ว
              </div>
              <div className="text-3xl font-extrabold text-[#14213F]">
                {submittedCount}
              </div>
            </div>
          </div>
        </CornerCard>

        {/* Card 3: Pending */}
        <CornerCard className="border border-[#E2E8F0] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#F43F5E] text-white shadow-xs">
              <Clock size={22} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                ยังไม่ส่งงาน
              </div>
              <div className="text-3xl font-extrabold text-[#14213F]">
                {pendingCount}
              </div>
            </div>
          </div>
        </CornerCard>
      </div>

      {/* Student Submissions Table matching pdf-52 & pdf-54 */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="flex flex-col gap-3 border-b border-[#E2E8F0] p-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-[#14213F]">รายชื่อนักศึกษา</h2>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="ค้นหารหัสนักศึกษา หรือชื่อ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-1.5 pr-3 pl-9 text-xs text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">เวลาที่ส่ง</th>
                <th className="px-6 py-4 text-center">คะแนน</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-600">
                    {s.studentId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                        {s.initials}
                      </div>
                      <span className="font-semibold text-[#14213F]">
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    {s.submitTime}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-[#14213F]">
                    {s.score}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {s.status === "submitted" ? (
                      <span className="inline-flex rounded-full bg-[#E6F4EA] px-3 py-1 text-xs font-semibold text-[#137333]">
                        ส่งแล้ว
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#FCE8E6] px-3 py-1 text-xs font-semibold text-[#C5221F]">
                        ยังไม่ส่ง
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/DashboardTeacher/Classrooms/Submissions/${labId}/${s.id}`}
                      className="inline-flex rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                      title="ดูผลงาน"
                    >
                      <Eye size={18} />
                    </Link>
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

export default function AssignmentSubmissionListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <AssignmentSubmissionListContent />
    </Suspense>
  );
}

