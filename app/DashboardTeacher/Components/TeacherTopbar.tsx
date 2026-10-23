"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Bell } from "lucide-react";
import profileImg from "@/app/image/Profile.png";

const teacherBreadcrumbLabels: Record<string, string> = {
  Classrooms: "รายละเอียดห้องเรียน",
  CreateCode: "Create Code",
  ManageCodes: "จัดการรหัสห้องเรียน",
  EditCode: "แก้ไขรหัสห้องเรียน",
  Submissions: "รายชื่อคนส่งงาน",
  CourseVideos: "ดูรายละเอียดรายวิชา",
  Documents: "ดูรายการเอกสาร",
  Videos: "ดูรายการวิดีโอ",
  UploadContent: "อัปโหลดเนื้อหา",
  Settings: "Settings",
  View: "View",
  "1": "กลุ่มเรียนที่ 1",
  "2": "กลุ่มเรียนที่ 2",
  "3": "กลุ่มเรียนที่ 3",
  "4": "กลุ่มเรียนที่ 4",
  "lab-1": "ใบงานที่ 1 ทดลองเขียนอัลกอริทึมด้วย Flowgorithm",
  "lab-2": "ใบงานที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
  "lab-3": "ใบงานที่ 3 ทดลองการใช้งานภาษาซี",
  "lab-4": "ใบงานที่ 4 โครงสร้างภาษา C เบื้องต้น",
  "quiz-1": "Quiz ที่ 1 ทดลองเขียนอัลกอริทึมด้วย Flowgorithm",
  "quiz-2": "Quiz ที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
  "quiz-3": "Quiz ที่ 3 ทดลองการใช้งานภาษาซี",
  "quiz-4": "Quiz ที่ 4 ชนิดข้อมูลและตัวดำเนินการ",
  "student-1": "View",
  "student-2": "View",
  "student-3": "View",
  "student-4": "View",
};

export default function TeacherTopbar() {
  const [teacherName, setTeacherName] = useState("Ford");
  const pathname = usePathname();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("teacherUser");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.name) setTeacherName(user.name);
      }
    } catch {
      // ignore
    }
  }, []);

  // Compute breadcrumbs from pathname: /DashboardTeacher/...
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const crumbs = segments.map((seg, idx) => ({
    label: teacherBreadcrumbLabels[seg] || decodeURIComponent(seg),
    href: "/DashboardTeacher/" + segments.slice(0, idx + 1).join("/"),
  }));

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
      {/* Breadcrumb nav */}
      <nav className="flex items-center gap-2 text-sm">
        {crumbs.length === 0 ? (
          <span className="font-semibold text-[#0B3FA6]">แดชบอร์ดอาจารย์</span>
        ) : (
          crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-400">›</span>}
                {isLast ? (
                  <span className="font-semibold text-[#2563EB]">{c.label}</span>
                ) : (
                  <Link
                    href={c.href}
                    className="font-medium text-[#475569] hover:text-[#0B3FA6] hover:underline"
                  >
                    {c.label}
                  </Link>
                )}
              </span>
            );
          })
        )}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          title="แจ้งเตือน"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        {/* Profile Pill */}
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-full border border-[#DDE3F5] bg-white py-1 pl-1.5 pr-3 text-sm font-semibold text-[#14213F] transition hover:bg-gray-50"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-blue-100">
            <Image
              src={profileImg}
              alt="Teacher Profile"
              className="h-full w-full scale-[1.9] object-cover object-[50%_28%]"
            />
          </div>
          <span>{teacherName}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}
