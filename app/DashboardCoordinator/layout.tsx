import React, { Suspense } from "react";
import CoordinatorSidebar from "./Components/CoordinatorSidebar";
import CoordinatorTopbar from "./Components/CoordinatorTopbar";

export const metadata = {
  title: "CodeLearn - ผู้รับผิดชอบรายวิชา",
  description: "ระบบจัดการการเรียนการสอน CodeLearn สำหรับอาจารย์ผู้รับผิดชอบรายวิชา",
};

export default function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBFBFE] flex">
      <Suspense fallback={<div className="w-64 bg-white border-r border-gray-100" />}>
        <CoordinatorSidebar />
      </Suspense>

      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
          <CoordinatorTopbar />
        </Suspense>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
