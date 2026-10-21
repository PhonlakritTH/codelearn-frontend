"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Code2, LineChart, Settings, LogOut } from "lucide-react";

const menus = [
  { href: "/Dashboardstudent/MyCourses", label: "รายวิชาของฉัน", icon: GraduationCap },
  { href: "/Dashboardstudent/LabHistory", label: "ประวัติการส่ง Lab", icon: Code2 },
  { href: "/Dashboardstudent/Scores", label: "สรุปคะแนน", icon: LineChart },
  { href: "/Dashboardstudent/Settings", label: "Settings", icon: Settings },
];
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-[#DDE3F5] bg-[#F1F3FD] p-3">
      <div className="px-2 py-4">
        <div className="text-xl font-bold text-[#0B3FA6]">CodeLearn</div>
        <div className="text-xs text-gray-600">AI Programming Tutor</div>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {menus.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-[#2563EB] font-semibold text-white"
                  : "text-gray-700 hover:bg-[#E1E6FA]"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#DDE3F5] pt-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-[#E1E6FA]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}