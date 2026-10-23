import TeacherSidebar from "./Components/TeacherSidebar";
import TeacherTopbar from "./Components/TeacherTopbar";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TeacherSidebar />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <TeacherTopbar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
