"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Layers, CloudUpload, BookOpen, Settings, LogOut } from "lucide-react";
import logoImg from "@/app/image/logo.png";

const teacherMenus = [
  {
    href: "/DashboardTeacher/Classrooms",
    label: "รายละเอียดห้องเรียน",
    icon: Layers,
    matchExact: false,
  },
  {
    href: "/DashboardTeacher/UploadContent",
    label: "อัปโหลดเนื้อหา",
    icon: CloudUpload,
    matchExact: false,
  },
  {
    href: "/DashboardTeacher/CourseVideos",
    label: "ดูรายละเอียดรายวิชา",
    icon: BookOpen,
    matchExact: false,
  },
  {
    href: "/DashboardTeacher/Settings",
    label: "Settings",
    icon: Settings,
    matchExact: false,
  },
];

export default function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-[#E2E8F0] bg-[#F8FAFC] p-4 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <Image
            src={logoImg}
            alt="CodeLearn"
            width={34}
            height={34}
            className="object-contain"
          />
        </div>
        <div>
          <div className="text-lg font-bold tracking-tight text-[#0B3FA6]">
            CodeLearn
          </div>
          <div className="text-[11px] font-medium text-gray-500">
            AI Programming Tutor
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col gap-1.5">
        {teacherMenus.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#475569] hover:bg-[#EBF0FF] hover:text-[#1D4ED8]"
              }`}
            >
              <Icon size={19} className={isActive ? "text-white" : "text-[#64748B] group-hover:text-[#1D4ED8]"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div className="mt-auto border-t border-[#E2E8F0] pt-4">
        <Link
          href="/Login"
          className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} className="text-gray-400 group-hover:text-red-500" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
