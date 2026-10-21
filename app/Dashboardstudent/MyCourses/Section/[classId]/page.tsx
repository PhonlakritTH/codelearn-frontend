"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API = "http://127.0.0.1:8000";

type ClassInfo = {
  id: number;
  course_title: string;
  term: string;
  group_name: string;
  teacher_name: string;
};

type Section = {
  id: number;
  name: string;
  sort_order: number;
  sobday: string | null; // "2026-08-25"
  sobtime_start: string | null; // "13:00"
  sobtime_end: string | null; // "16:00"
};

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

// "2026-08-25" -> "25 ส.ค. 2569"
function formatThaiDate(iso: string | null): string {
  if (!iso) return "ยังไม่กำหนด";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "ยังไม่กำหนด";
  return `${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

function formatTimeRange(start: string | null, end: string | null): string {
  if (!start || !end) return "ยังไม่กำหนด";
  return `${start}-${end}`;
}

function DateIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="m9 16 5-5" />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="14" height="14" rx="2" />
      <path d="M17 21H5a2 2 0 0 1-2-2V7" />
      <circle cx="14" cy="10" r="3" />
    </svg>
  );
}

export default function ClassRoomPage() {
  const params = useParams();
  const classId = params.classId as string;

  const [info, setInfo] = useState<ClassInfo | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [r1, r2] = await Promise.all([
          fetch(`${API}/classes/${classId}`),
          fetch(`${API}/classes/${classId}/sections`),
        ]);
        const d1 = await r1.json();
        const d2 = await r2.json();

        if (d1.success === false || d2.success === false) {
          setError(d1.message || d2.message || "โหลดข้อมูลไม่สำเร็จ");
          return;
        }
        setInfo(d1.class ?? d1.data ?? null);
        setSections(d2.sections ?? d2.data ?? []);
      } catch {
        setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจสอบว่าหลังบ้านรันอยู่");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [classId]);

  if (loading) return <p className="p-6 text-gray-500">กำลังโหลด...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      {info && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{info.course_title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            เทอม {info.term} · {info.group_name} · อาจารย์ {info.teacher_name}
          </p>
        </div>
      )}

      {sections.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีเนื้อหาในห้องนี้</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <div
              key={s.id}
              className="min-h-[160px] rounded-2xl border border-[#E3E6F0] bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                เนื้อหา{s.name}
              </h2>

              <div className="mb-3 flex items-center gap-3 text-gray-700">
                <DateIcon />
                <span>วันที่สอบ {formatThaiDate(s.sobday)}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <TimeIcon />
                <span>เวลาที่สอบ {formatTimeRange(s.sobtime_start, s.sobtime_end)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}