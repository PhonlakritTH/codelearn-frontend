"use client";

import { useState } from "react";
import {
  Calendar,
  Copy,
  RefreshCw,
  Check,
  Home,
  CheckCircle2,
  Share2,
} from "lucide-react";
import CornerButton from "../../Components/CornerButton";

export default function CreateCodePage() {
  const [code, setCode] = useState("X 7 9 - Q P L");
  const [copied, setCopied] = useState(false);
  const [created, setCreated] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code.replace(/\s+/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const part1 = Array.from({ length: 3 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join(" ");
    const part2 = Array.from({ length: 3 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join(" ");
    setCode(`${part1} - ${part2}`);
  };

  const handleCreateClass = () => {
    setCreated(true);
    setTimeout(() => setCreated(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top action row */}
      <div className="flex items-center justify-end">
        <CornerButton
          href="/DashboardTeacher/Classrooms/ManageCodes"
          variant="primary"
          icon={<Home size={17} />}
          iconPosition="left"
        >
          จัดการรหัสห้องเรียน
        </CornerButton>
      </div>

      {created && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700 animate-fade-in">
          ✓ สร้างชั้นเรียนพร้อมรหัส {code} สำเร็จแล้ว!
        </div>
      )}

      {/* Main Container Card matching PDF page 47 */}
      <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-sm">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#14213F]">
              Active Join Code
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Share this code with students to join classroom
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-[#F8FAFC] px-3.5 py-1.5 text-xs font-semibold text-gray-700">
            <Calendar size={15} className="text-[#2563EB]" />
            <span>20 สิงหาคม - 22 สิงหาคม 2569</span>
          </div>
        </div>

        {/* Big Code Box in Center */}
        <div className="my-8 flex flex-col items-center justify-center rounded-2xl border border-[#DDE3F5] bg-[#F8F9FE] py-12 text-center">
          <div className="font-mono text-5xl font-black tracking-[0.35em] text-[#0B3FA6] sm:text-6xl select-all">
            {code}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
            <CheckCircle2 size={16} />
            <span>Accepting new students</span>
          </div>
        </div>

        {/* Buttons Action Row */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <CornerButton
              onClick={handleCopy}
              variant="outline"
              icon={copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              iconPosition="left"
            >
              {copied ? "คัดลอกแล้ว!" : "Copy Code"}
            </CornerButton>

            <CornerButton
              onClick={handleRegenerate}
              variant="outline"
              icon={<RefreshCw size={16} />}
              iconPosition="left"
            >
              Regenerate
            </CornerButton>
          </div>

          <div className="w-full sm:w-auto">
            <CornerButton
              onClick={handleCreateClass}
              variant="primary"
              className="w-full sm:w-auto"
              icon={<Check size={18} />}
              iconPosition="right"
            >
              Create Class
            </CornerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
