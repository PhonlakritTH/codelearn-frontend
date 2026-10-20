import Link from "next/dist/client/link";
import logo from "../image/logo.png";
import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="flex  items-center justify-between  bg-[#F7F9FB] px-6  h-20">
      
      <div className="flex items-center gap-3">
  {/* Logo */}
     <Image
          src={logo}
          alt="CodeLearn Logo"
          className="h-15 w-15 rounded-lg object-contain"
        />

  {/* ชื่อเว็บ */}
  <h1 className="text-xl font-bold text-black-700">
    CodeLearn
  </h1>
</div>

      <div className="flex gap-6">
       
       
          {/* <button className="rounded-full border-2 border-blue-600 bg-white text-blue-600 px-4 py-2 text-blue-700 hover:bg-blue-100 w-30  ">
 Login
</button> */}
<Link
  href="/Login"
  className="group relative inline-flex w-36 items-center justify-center overflow-hidden rounded-full border-2 border-[#1D4ED8] px-6 py-3 text-[18px] font-bold text-[#1D4ED8] transition-colors duration-500 hover:text-white"
>
  <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-[#1D4ED8] transition-transform duration-500 ease-out group-hover:scale-[25]" />
  <span className="relative z-10">Login</span>
</Link>
      </div>
    </nav>
  );
}