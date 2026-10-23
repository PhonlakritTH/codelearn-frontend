"use client";

import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  User,
  Hash,
  Mail,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import CornerButton from "../../Components/CornerButton";
import CornerCard from "../../Components/CornerCard";

interface StudentItem {
  id: string;
  studentId: string;
  name: string;
  email: string;
  status: "Verified" | "Pending";
}

const initialStudents: StudentItem[] = [
  {
    id: "1",
    studentId: "ID-2023-001",
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    status: "Verified",
  },
  {
    id: "2",
    studentId: "ID-2023-042",
    name: "Sarah Williams",
    email: "s.williams@university.edu",
    status: "Verified",
  },
  {
    id: "3",
    studentId: "ID-2023-087",
    name: "Michael Chen",
    email: "mchen@university.edu",
    status: "Pending",
  },
  {
    id: "4",
    studentId: "ID-2023-112",
    name: "Emily Parker",
    email: "eparker@university.edu",
    status: "Verified",
  },
];

function GroupDetailContent() {
  const params = useParams();
  const groupId = (params?.groupId as string) || "1";

  const [students, setStudents] = useState<StudentItem[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !studentId || !email) return;

    const newStudent: StudentItem = {
      id: Date.now().toString(),
      studentId: studentId.trim(),
      name: fullName.trim(),
      email: email.trim(),
      status: "Verified",
    };

    setStudents([newStudent, ...students]);
    setFullName("");
    setStudentId("");
    setEmail("");
    setNotification("เพิ่มข้อมูลนักศึกษาเรียบร้อยแล้ว");
    setTimeout(() => setNotification(""), 3000);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifiedCount = students.filter((s) => s.status === "Verified").length;
  const pendingCount = students.filter((s) => s.status === "Pending").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header with Title and Create Code button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
            กลุ่มเรียนที่ {groupId}
          </h1>
          <p className="text-sm text-gray-500">
            Add new students to the academic workspace.
          </p>
        </div>

        <CornerButton
          href="/DashboardTeacher/Classrooms/CreateCode"
          variant="primary"
          icon={<Plus size={18} />}
          iconPosition="left"
        >
          Create Code
        </CornerButton>
      </div>

      {notification && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700 animate-fade-in">
          ✓ {notification}
        </div>
      )}

      {/* Main 2-column layout matching PDF page 46 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Stats + Student List */}
        <div className="space-y-6 lg:col-span-8">
          {/* 3 Stat Cards in a row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Card 1: All Students */}
            <CornerCard className="border border-[#E2E8F0] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                  <Users size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                    ALL STUDENTS
                  </div>
                  <div className="text-2xl font-extrabold text-[#14213F]">
                    {students.length}
                  </div>
                </div>
              </div>
            </CornerCard>

            {/* Card 2: Successfully Verified */}
            <CornerCard className="border border-[#E2E8F0] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                    SUCCESSFULLY VERIFIED
                  </div>
                  <div className="text-2xl font-extrabold text-[#14213F]">
                    {verifiedCount}
                  </div>
                </div>
              </div>
            </CornerCard>

            {/* Card 3: Pending Review */}
            <CornerCard className="border border-[#E2E8F0] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white shadow-xs">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                    PENDING REVIEW
                  </div>
                  <div className="text-2xl font-extrabold text-[#14213F]">
                    {pendingCount}
                  </div>
                </div>
              </div>
            </CornerCard>
          </div>

          {/* Student List Preview Table */}
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
            <div className="flex flex-col gap-3 border-b border-[#E2E8F0] p-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-[#14213F]">
                Student List Preview
              </h2>

              {/* Search box */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Filter list..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2 pr-3 pl-9 text-sm text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8FAFC] text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-3.5">Student ID</th>
                    <th className="px-6 py-3.5">Name</th>
                    <th className="px-6 py-3.5">Email</th>
                    <th className="px-6 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400">
                        ไม่พบข้อมูลนักศึกษาที่ตรงกับการค้นหา
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => {
                      const initials = student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);

                      return (
                        <tr
                          key={student.id}
                          className="hover:bg-blue-50/40 transition-colors"
                        >
                          <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-600">
                            {student.studentId}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                                {initials}
                              </div>
                              <span className="font-semibold text-[#14213F]">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {student.status === "Verified" ? (
                              <span className="inline-flex rounded-full bg-[#E6F4EA] px-3 py-1 text-xs font-semibold text-[#137333]">
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full bg-[#FCE8E6] px-3 py-1 text-xs font-semibold text-[#C5221F]">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="border-t border-[#E2E8F0] bg-[#FAFBFD] p-3 text-center">
              <button
                type="button"
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View Full Directory
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Add New Student Form + View Submissions Card */}
        <div className="space-y-6 lg:col-span-4">
          {/* Add New Student Form Card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-[#14213F]">
              Add New Student
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              ลงทะเบียนนักศึกษาใหม่เข้าระบบ
            </p>

            <form onSubmit={handleAddStudent} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14213F] uppercase">
                  Full Name
                </label>
                <div className="relative mt-1.5">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14213F] uppercase">
                  Student ID
                </label>
                <div className="relative mt-1.5">
                  <Hash
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. ID-2024-001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14213F] uppercase">
                  Email Address
                </label>
                <div className="relative mt-1.5">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="pt-2">
                <CornerButton
                  type="submit"
                  variant="primary"
                  className="w-full"
                >
                  Add to System
                </CornerButton>
              </div>
            </form>
          </div>

          {/* View Submissions Card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ClipboardList size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#14213F]">
                ดูรายชื่อคนส่งงาน
              </h2>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              ตรวจสอบรายชื่อนักศึกษาที่ส่งแบบฝึกหัด หรือ Lab ในกลุ่มเรียนนี้
            </p>

            <div className="mt-4">
              <CornerButton
                href="/DashboardTeacher/Classrooms/Submissions"
                variant="primary"
                className="w-full"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                ดูรายชื่อ
              </CornerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GroupDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <GroupDetailContent />
    </Suspense>
  );
}

