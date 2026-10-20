import Link from "next/dist/client/link";
import logo from "../image/logo.png";
import Image from "next/image";
import CurrentYear from "./Currentyear";
export default function Footer() {
  return (
          <div className=" mx-auto max-w-full px-4 pt-16 sm:px-6 lg:px-0 bg-[#F7F9FB]">
        {/* Brand + description */}
        <div className="max-w-[240px] sm:ml-30 lg:ml-30 text-start  ">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo} // วางโลโก้ไว้ที่ public/logo.png
              alt="CodeLearn logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-xl font-bold text-blue-700">
              Code Learn
            </span>
          </Link>

          <p className="mt-5 text-[14px] leading-relaxed text-slate-700">
            แพลตฟอร์มการเรียนรู้ภาษา C
            <br />
            ที่ช่วยให้คุณเรียนรู้การเขียนโปรแกรมผ่านบทเรียน
            ลงมือเขียนโค้ดจริง และมี AI คอยช่วยแนะนำเมื่อคุณติดปัญหา เรียนรู้
            ลงมือทำ พัฒนาไปด้วยกัน
          </p>
        </div>

        {/* Divider + bottom bar */}
        <div className="mt-14 border-t border-slate-200 py-8">
          <div className="flex flex-col items-start gap-3 text-[13px] text-slate-600 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
            <p>© <CurrentYear /> CodeLearn. All rights reserved.</p>
            <nav className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-slate-900">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-900">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
   
  );
}