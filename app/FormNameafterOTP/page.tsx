"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, IdCard, User } from "lucide-react";
// ⚠️ 2 บรรทัดนี้ให้คัดลอกจากด้านบนสุดของ app/OTP/page.tsx (ชื่อ/path ต้องตรงกับของคุณ)
import bg from "../image/bg.png";
import Logologin from "../image/logologin.png";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
      const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");

  const handleNext = (e: React.FormEvent) => {
      e.preventDefault();
    if (!studentId.trim() || !name.trim() || !surname.trim()) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    setError("");
    router.push("/Dashboardstudent/MyCourses");
  };
  const inputClass =
    "w-full rounded-lg border border-[#C3C6D6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#14213F] placeholder:text-gray-400 outline-none transition focus:border-[#0B3FA6] focus:ring-2 focus:ring-[#0B3FA6]/20";

  return (
    <main
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="w-full max-w-[430px] rounded-lg bg-white px-10 py-12 shadow-xl">
        <div className="flex justify-center">
          <Image src={Logologin} alt="CodeLearn Logo" className="h-auto w-[182px] object-contain" />
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#C3C6D6]" />
          <span className="text-lg text-gray-500">Register</span>
          <div className="h-px flex-1 bg-[#C3C6D6]" />
        </div>

        <form onSubmit={handleNext} className="mt-6">
          <p className="text-xs text-gray-500">Student Information</p>

          {/* ID Student */}
          <label className="mt-2 block text-sm font-semibold text-[#14213F]">ID Student</label>
          <div className="relative mt-1">
            <IdCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              inputMode="numeric"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Student ID"
              className={inputClass}
            />
          </div>

          {/* Name + Surname */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14213F]">Name</label>
              <div className="relative mt-1">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14213F]">Surname</label>
              <div className="relative mt-1">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Surname"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <Link
            href="/Dashboardstudent"
           
>
          <button
            type="submit"
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B3FA6] py-2.5 text-sm font-bold text-white transition hover:bg-[#093283] active:scale-[0.98]"
          >
            Next
            <ArrowRight size={18} />
          </button>
        </Link>
        </form>
      </div>
    </main>
  );
}