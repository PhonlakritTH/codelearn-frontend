"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CornerButton from "../Components/CornerButton";

export default function CoordinatorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("coordinator@codelearn.ac.th");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/DashboardCoordinator/Teachers");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-[#FFFFFF] to-[#EFF6FF] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Illustration & Branding matching Figma pdf-63 */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-bold border border-white/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">CodeLearn</div>
              <div className="text-xs text-blue-200">AI Programming Tutor</div>
            </div>
          </div>

          {/* Visual Artwork Illustration */}
          <div className="my-10 text-center relative z-10 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-6 shadow-inner">
              <svg className="w-24 h-24 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">อาจารย์ผู้รับผิดชอบรายวิชา</h3>
            <p className="text-xs text-blue-100 max-w-xs leading-relaxed">
              จัดการหลักสูตร คลังข้อสอบ โจทย์ปฏิบัติการ และภาพรวมการเรียนการสอนอย่างมีประสิทธิภาพ
            </p>
          </div>

          {/* Footer note */}
          <div className="text-xs text-blue-200 text-center relative z-10">
            © 2026 CodeLearn. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form matching Figma pdf-63 */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ยินดีต้อนรับกลับมา</h2>
            <p className="text-sm text-gray-500">กรุณาเข้าสู่ระบบเพื่อจัดการรายวิชาของคุณ</p>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => router.push("/DashboardCoordinator/Teachers")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs mb-6 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-xs text-gray-400 uppercase font-medium absolute">
              หรือเข้าสู่ระบบด้วยอีเมล
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                อีเมล
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@codelearn.ac.th"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                รหัสผ่าน
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                Remember me for 30 days
              </label>

              <Link
                href="/DashboardCoordinator/ForgotPassword"
                className="text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="pt-4">
              <CornerButton
                type="submit"
                variant="primary"
                className="w-full py-3.5 text-base font-bold shadow-md"
              >
                Sign In
              </CornerButton>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            ต้องการสลับไปฝั่งอาจารย์ผู้สอน?{" "}
            <Link
              href="/DashboardTeacher/Classrooms"
              className="text-blue-600 font-bold hover:underline"
            >
              เข้าสู่ระบบอาจารย์ผู้สอน
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
