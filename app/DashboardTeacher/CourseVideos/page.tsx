"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Filter,
  Eye,
  FileDown,
  Upload,
  Plus,
  Video,
  FileText,
  ChevronDown,
} from "lucide-react";
import CornerButton from "../Components/CornerButton";
import CornerCard from "../Components/CornerCard";

interface VideoFileItem {
  id: string;
  title: string;
  size: string;
  status: "Queued" | "Published" | "Processing";
  uploadDate: string;
  chapter: number;
  author: "me" | "head_teacher";
}

const mockVideos: VideoFileItem[] = [
  {
    id: "1",
    title: "บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์",
    size: "2.1 MB",
    status: "Queued",
    uploadDate: "18 / สิงหาคม / 2026",
    chapter: 1,
    author: "me",
  },
  {
    id: "2",
    title: "บทที่ 2 ผังงานและการเขียนโปรแกรมเบื้องต้น",
    size: "2.1 MB",
    status: "Queued",
    uploadDate: "18 / สิงหาคม / 2026",
    chapter: 2,
    author: "me",
  },
  {
    id: "3",
    title: "บทที่ 3 ตัวแปรและชนิดข้อมูลในภาษาซี",
    size: "4.5 MB",
    status: "Published",
    uploadDate: "12 / สิงหาคม / 2026",
    chapter: 3,
    author: "head_teacher",
  },
  {
    id: "4",
    title: "บทที่ 4 Logic & Architecture และคำสั่งเงื่อนไข",
    size: "3.8 MB",
    status: "Published",
    uploadDate: "05 / สิงหาคม / 2026",
    chapter: 4,
    author: "me",
  },
  {
    id: "5",
    title: "บทที่ 5 การวนซ้ำ (Looping Controls)",
    size: "5.1 MB",
    status: "Published",
    uploadDate: "01 / สิงหาคม / 2026",
    chapter: 5,
    author: "me",
  },
  {
    id: "6",
    title: "บทที่ 6 ฟังก์ชันและขอบเขตของตัวแปร (Functions)",
    size: "6.2 MB",
    status: "Published",
    uploadDate: "28 / กรกฎาคม / 2026",
    chapter: 6,
    author: "head_teacher",
  },
];

export default function CourseVideosPage() {
  const [filterAuthor, setFilterAuthor] = useState<"all" | "me" | "head_teacher">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const totalCount = mockVideos.length;
  const myCount = mockVideos.filter((v) => v.author === "me").length;
  const headCount = mockVideos.filter((v) => v.author === "head_teacher").length;

  const displayedVideos = mockVideos.filter((v) => {
    if (filterAuthor === "all") return true;
    return v.author === filterAuthor;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header matching Screenshot 135902 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
            รายการวิดีโอที่อัปโหลด
          </h1>
          <p className="text-sm text-gray-500">Check work submission</p>
        </div>

        <CornerButton
          href="/DashboardTeacher/UploadContent"
          variant="primary"
          icon={<Plus size={18} />}
          iconPosition="left"
        >
          อัปโหลดวิดีโอใหม่
        </CornerButton>
      </div>

      {/* 3 Stat Cards in a row matching Screenshot 135902 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Card 1: All Videos */}
        <CornerCard
          onClick={() => setFilterAuthor("all")}
          className={`border p-5 cursor-pointer ${
            filterAuthor === "all" ? "border-blue-500 ring-2 ring-blue-100" : "border-[#E2E8F0]"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
              <Play size={24} className="fill-white translate-x-0.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                รายการวิดีโอทั้งหมด
              </div>
              <div className="text-3xl font-black text-[#14213F]">
                {totalCount}
              </div>
            </div>
          </div>
        </CornerCard>

        {/* Card 2: My Videos */}
        <CornerCard
          onClick={() => setFilterAuthor("me")}
          className={`border p-5 cursor-pointer ${
            filterAuthor === "me" ? "border-blue-500 ring-2 ring-blue-100" : "border-[#E2E8F0]"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-xs">
              <Play size={24} className="fill-white translate-x-0.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                วิดีโอของฉัน
              </div>
              <div className="text-3xl font-black text-[#14213F]">
                {myCount}
              </div>
            </div>
          </div>
        </CornerCard>

        {/* Card 3: Head Teacher Videos */}
        <CornerCard
          onClick={() => setFilterAuthor("head_teacher")}
          className={`border p-5 cursor-pointer ${
            filterAuthor === "head_teacher"
              ? "border-rose-400 ring-2 ring-rose-100"
              : "border-[#E2E8F0]"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FECDD3] text-[#E11D48] shadow-xs">
              <Play size={24} className="fill-[#E11D48] translate-x-0.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                วิดีโอของอาจารย์ที่รับผิดชอบรายวิชา
              </div>
              <div className="text-3xl font-black text-[#14213F]">
                {headCount}
              </div>
            </div>
          </div>
        </CornerCard>
      </div>

      {/* Table Section: รายการเอกสาร */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="flex flex-col gap-3 border-b border-[#E2E8F0] p-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-[#14213F]">รายการเอกสาร</h2>

          {/* Filter button matching design */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#DDE3F5] bg-white px-4 py-2 text-xs font-semibold text-[#14213F] shadow-xs hover:bg-gray-50"
            >
              <Filter size={14} className="text-[#2563EB]" />
              <span>
                {filterAuthor === "head_teacher"
                  ? "วิดีโออาจารย์ผู้รับผิดชอบ"
                  : filterAuthor === "me"
                  ? "วิดีโอของฉัน"
                  : "วิดีโอทั้งหมด"}
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black/5">
                <button
                  onClick={() => {
                    setFilterAuthor("all");
                    setIsFilterOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                >
                  วิดีโอทั้งหมด
                </button>
                <button
                  onClick={() => {
                    setFilterAuthor("me");
                    setIsFilterOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                >
                  วิดีโอของฉัน
                </button>
                <button
                  onClick={() => {
                    setFilterAuthor("head_teacher");
                    setIsFilterOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                >
                  วิดีโออาจารย์ผู้รับผิดชอบ
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">File</th>
                <th className="px-6 py-4">วันที่อัปโหลด</th>
                <th className="px-6 py-4 text-center">บท</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedVideos.map((video) => (
                <tr
                  key={video.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                        <Play size={18} className="translate-x-0.5" />
                      </div>
                      <div>
                        <Link
                          href={`/DashboardTeacher/CourseVideos/${video.id}`}
                          className="font-bold text-[#14213F] hover:text-[#2563EB] transition-colors"
                        >
                          {video.title}
                        </Link>
                        <div className="mt-0.5 text-xs text-gray-400">
                          {video.size} •{" "}
                          <span className="text-amber-600 font-medium">
                            {video.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {video.uploadDate}
                  </td>

                  <td className="px-6 py-4 text-center font-bold text-gray-700">
                    {video.chapter}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/DashboardTeacher/CourseVideos/${video.id}`}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="ดูวิดีโอ"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#14213F] transition"
                        title="ดาวน์โหลด / เปิดเอกสาร"
                      >
                        <FileDown size={18} />
                      </button>
                    </div>
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
