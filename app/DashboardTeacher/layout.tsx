import { Suspense } from "react";
import TeacherSidebar from "./Components/TeacherSidebar";
import TeacherTopbar from "./Components/TeacherTopbar";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Suspense fallback={<aside className="h-screen w-64 border-r border-[#E2E8F0] bg-white" />}>
        <TeacherSidebar />
      </Suspense>
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Suspense fallback={<header className="sticky top-0 z-20 flex h-16 items-center border-b border-[#E2E8F0] bg-white px-6 shadow-xs" />}>
          <TeacherTopbar />
        </Suspense>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

