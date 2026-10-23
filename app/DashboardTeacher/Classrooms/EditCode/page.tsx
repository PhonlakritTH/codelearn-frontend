"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Copy,
  RefreshCw,
  Check,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import CornerButton from "../../Components/CornerButton";

export default function EditCodePage() {
  const [code, setCode] = useState("X 7 9 - Q P L");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top back link */}
      <div className="flex items-center justify-between">
        <Link
          href="/DashboardTeacher/Classrooms/ManageCodes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#475569] hover:text-[#0B3FA6]"
        >
          <ArrowLeft size={16} />
          <span>ย้อนกลับไปจัดการรหัสห้องเรียน</span>
        </Link>
      </div>

      {saved && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700 animate-fade-in">
          ✓ บันทึกการแก้ไขรหัสห้องเรียน {code} เรียบร้อยแล้ว!
        </div>
      )}

      {/* Main Container Card matching PDF page 49 */}
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
              Regenerate Code
            </CornerButton>
          </div>

          <div className="w-full sm:w-auto">
            <CornerButton
              onClick={handleSave}
              variant="primary"
              className="w-full sm:w-auto"
              icon={<Check size={18} />}
              iconPosition="right"
            >
              บันทึกการแก้ไข
            </CornerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
