"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Mail, Lock, Bell, Shield, Save, CheckCircle2 } from "lucide-react";
import profileImg from "@/app/image/Profile.png";
import CornerButton from "../Components/CornerButton";

export default function TeacherSettingsPage() {
  const [name, setName] = useState("โชคอนันต์ อันโน (Ford)");
  const [email, setEmail] = useState("chokanun.anno@codelearn.ac.th");
  const [department, setDepartment] = useState("วิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          จัดการข้อมูลส่วนตัวของอาจารย์ผู้สอนและการตั้งค่าระบบ
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700 animate-fade-in shadow-xs">
          <CheckCircle2 size={18} />
          <span>บันทึกการตั้งค่าเรียบร้อยแล้ว</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-[#14213F]">ข้อมูลผู้สอน</h2>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-blue-200">
              <Image
                src={profileImg}
                alt="Teacher Profile"
                className="h-full w-full scale-[1.9] object-cover object-[50%_28%]"
              />
            </div>
            <div>
              <div className="text-base font-bold text-[#14213F]">{name}</div>
              <div className="text-xs text-gray-500">อาจารย์ผู้สอนประจำรายวิชา</div>
              <div className="mt-2">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  เปลี่ยนรูปโปรไฟล์
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#14213F] uppercase">
                ชื่อ - นามสกุล
              </label>
              <div className="relative mt-1.5">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213F] uppercase">
                อีเมลประจำตำแหน่ง
              </label>
              <div className="relative mt-1.5">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#14213F] uppercase">
                ภาควิชา / คณะ
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 py-2.5 px-3.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Password / Security Card */}
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold text-[#14213F]">ความปลอดภัยและรหัสผ่าน</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#14213F] uppercase">
                รหัสผ่านปัจจุบัน
              </label>
              <div className="relative mt-1.5">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213F] uppercase">
                รหัสผ่านใหม่
              </label>
              <div className="relative mt-1.5">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="รหัสผ่านใหม่อย่างน้อย 8 ตัวอักษร"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <CornerButton
            type="submit"
            variant="primary"
            icon={<Save size={18} />}
            iconPosition="right"
          >
            บันทึกการเปลี่ยนแปลง
          </CornerButton>
        </div>
      </form>
    </div>
  );
}
