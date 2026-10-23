"use client";

import Link from "next/link";
import { FolderGit2, Video, FileText, ArrowRight } from "lucide-react";
import CornerCard from "../Components/CornerCard";

export default function CourseDetailsHubPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pt-4">
      {/* 2 Main Navigation Cards matching pdf-61 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Card 1: ดูรายการเอกสาร */}
        <CornerCard
          href="/DashboardTeacher/CourseVideos/Documents"
          className="p-8 cursor-pointer border border-[#E2E8F0] hover:border-blue-300 transition-all"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-[#14213F]">
              ดูรายการเอกสาร
            </h2>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                <FileText size={20} />
              </div>
              <span className="font-medium">จัดการเอกสารที่อัปโหลดไว้</span>
            </div>
          </div>
        </CornerCard>

        {/* Card 2: ดูรายการวิดีโอ */}
        <CornerCard
          href="/DashboardTeacher/CourseVideos/Videos"
          className="p-8 cursor-pointer border border-[#E2E8F0] hover:border-blue-300 transition-all"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-[#14213F]">
              ดูรายการวิดีโอ
            </h2>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                <Video size={20} />
              </div>
              <span className="font-medium">จัดการวิดีโอการเรียนการสอน</span>
            </div>
          </div>
        </CornerCard>
      </div>
    </div>
  );
}
