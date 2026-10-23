"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CoordinatorTopbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Derive breadcrumb from pathname
  const getBreadcrumb = () => {
    if (pathname.includes("/Teachers/Create")) return "เพิ่มอาจารย์ผู้สอน";
    if (pathname.includes("/Teachers/Edit")) return "แก้ไขบัญชี";
    if (pathname.includes("/Teachers")) return "จัดการบัญชีอาจารย์ผู้สอน";

    if (pathname.includes("/Classrooms/Create")) return "เพิ่มกลุ่มเรียน";
    if (pathname.includes("/Classrooms")) return "จัดการกลุ่มเรียน";

    if (pathname.includes("/UploadContent")) return "อัปโหลดเนื้อหา";
    if (pathname.includes("/TrainAI")) return "เทรนด์ข้อมูลจากไฟล์";

    if (pathname.includes("/Labs/CreateQuestion")) return "เพิ่มโจทย์";
    if (pathname.includes("/Labs/Create")) return "เพิ่มใบงาน";
    if (pathname.includes("/Labs")) return "จัดการ Lab";

    if (pathname.includes("/Quizzes/AIGenerate")) return "เพิ่มโจทย์โดยใช้ Ai";
    if (pathname.includes("/Quizzes/CreateQuestion")) return "เพิ่มโจทย์";
    if (pathname.includes("/Quizzes/Create")) return "เพิ่มแบบทดสอบ";
    if (pathname.includes("/Quizzes")) return "จัดการ Quiz";

    if (pathname.includes("/Semesters/Chapters")) return "จัดการบท";
    if (pathname.includes("/Semesters/Create")) return "เพิ่มเทอม";
    if (pathname.includes("/Semesters")) return "รายการภาคการศึกษา";

    if (pathname.includes("/Documents")) return "ดูรายการเอกสาร";
    if (pathname.includes("/Curriculum")) return "จัดรูปแบบการสอน";
    if (pathname.includes("/LandingPage")) return "จัดการเนื้อหาหน้าแรก";
    if (pathname.includes("/Settings")) return "Settings";

    return "ภาพรวม";
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-semibold text-blue-600">
          {getBreadcrumb()}
        </h1>
      </div>

      {/* User Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-gray-50 border border-gray-200 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 overflow-hidden flex items-center justify-center text-white text-xs font-semibold relative">
            <Image
              src="/image/ford.jpg"
              alt="Ford"
              fill
              className="object-cover"
              onError={(e) => {
                // fallback if image not found
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span>FD</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Ford</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-1 text-sm text-gray-700 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-semibold text-gray-900">Ford Coordinator</p>
              <p className="text-xs text-gray-500">coordinator@codelearn.ac.th</p>
            </div>
            <Link
              href="/DashboardCoordinator/Settings"
              className="block px-4 py-2 hover:bg-gray-50"
              onClick={() => setDropdownOpen(false)}
            >
              ตั้งค่าบัญชี
            </Link>
            <Link
              href="/DashboardTeacher/Classrooms"
              className="block px-4 py-2 hover:bg-gray-50 text-blue-600"
              onClick={() => setDropdownOpen(false)}
            >
              สลับไปฝั่งอาจารย์ผู้สอน
            </Link>
            <div className="border-t border-gray-100 my-1"></div>
            <Link
              href="/DashboardCoordinator/Login"
              className="block px-4 py-2 text-red-600 hover:bg-red-50"
              onClick={() => setDropdownOpen(false)}
            >
              ออกจากระบบ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
