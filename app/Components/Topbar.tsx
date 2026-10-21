"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import profile from "../image/Profile.png";

// ตารางชื่อที่จะโชว์บน breadcrumb (ไม่ใส่ก็ได้ จะโชว์ตาม URL แทน)
const labels: Record<string, string> = {
  MyCourses: "รายวิชาของฉัน",
  JoinClass: "Join Class",
  LabHistory: "ประวัติการส่ง Lab",
  Scores: "สรุปคะแนน",
  Settings: "Settings",
};

export default function Topbar() {
  const [name, setName] = useState("Ford");
  const pathname = usePathname();

  // แยก URL เป็นชิ้นๆ ตัดคำว่า Dashboardstudent ออก
  const parts = pathname.split("/").filter(Boolean).slice(1);
  const crumbs = parts.map((seg, i) => ({
    label: labels[seg] ?? seg,
    href: "/Dashboardstudent/" + parts.slice(0, i + 1).join("/"),
  }));

  // อ่านชื่อจาก localStorage["user"] ที่เก็บไว้หลัง OTP ผ่าน
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.name) setName(String(user.name).split(" ")[0]);
      }
    } catch {
      // ถ้าอ่านไม่ได้ ใช้ชื่อเริ่มต้นต่อไป
    }
  }, []);

  return (
    <header className="flex h-[48px] shrink-0 items-center justify-between border-b border-[#DDE3F5] bg-[#F8F8FD] px-4">
      <nav className="flex items-center gap-2 text-xs">
        {crumbs.length > 1 &&
          crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-400">›</span>}
                {last ? (
                  <span className="text-[#2563EB]">{c.label}</span>
                ) : (
                  <Link
                    href={c.href}
                    className="font-semibold text-[#14213F] underline"
                  >
                    {c.label}
                  </Link>
                )}
              </span>
            );
          })}
      </nav>

      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-[#C3C6D6] bg-white py-1 pl-1 pr-3 text-sm font-medium text-[#14213F] transition hover:bg-gray-50"
      >
        <span className="relative h-7 w-7 overflow-hidden rounded-full">
          <Image
            src={profile}
            alt="โปรไฟล์"
            className="h-full w-full scale-[1.9] object-cover object-[50%_28%]"
          />
        </span>
        {name}
        <ChevronDown size={14} className="text-gray-500" />
      </button>
    </header>
  );
}