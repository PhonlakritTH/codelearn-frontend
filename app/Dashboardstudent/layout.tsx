import Sidebar from "../Components/SideBarStudent";
import Topbar from "../Components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
   
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* แถบบนที่แสดงชื่อผู้ใช้ ใส่ตรงนี้ภายหลัง */}
           <Topbar></Topbar>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}