import { Plus, GraduationCap } from "lucide-react";
import Link from "next/link";
export default function MyCoursesPage() {
  return (
    <div className="flex h-full min-h-[calc(100vh-48px)] flex-col">
      {/* ปุ่ม join Class ชิดขวาบน */}
      <div className="flex justify-end">
          <Link
          href="/Dashboardstudent/MyCourses/JoinClass"
          className="flex items-center gap-2 rounded-lg bg-[#0B3FA6] px-8 py-3 text-base font-bold text-white transition hover:bg-[#093283] active:scale-[0.98]"
          >
          join Class
          <Plus size={18} />
        </Link>
      </div>

      {/* ข้อความตอนยังไม่มีรายวิชา อยู่กลางหน้า */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-300">
        <GraduationCap size={64} />
        <p className="text-2xl font-bold">Add ClassRoom</p>
      </div>
    </div>
  );
}