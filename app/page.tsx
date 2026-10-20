import Image from "next/image";
import "./globals.css";
import type { Metadata } from "next";
import Card from "@/app/Components/Card";
import { ArrowRight } from "lucide-react";
import Hero from "./image/hero.png";
import Content from "./image/content.png";
import TiltImage from "./Components/TiltImage"; 
import { Bot } from "lucide-react";
import { SquareTerminal } from "lucide-react";
import { 	CalendarDays } from "lucide-react";
import { 	Flame } from "lucide-react";
import { 	Medal } from "lucide-react";
import { 	Globe } from "lucide-react";
import Navbar from "@/app/Components/Navbar";
import Footer from "./Components/Footer";
export default function HomePage() {
  return (
    <main className="page-fade-in">
        <Navbar />
    
         <div className="mx-auto grid min-h-[calc(100vh-82px)] max-w-[1400px] grid-cols-[auto_1fr] items-center gap-[clamp(2rem,5vw,5rem)] px-6">
         
          <div className="flex flex-row justify-end bg-white">
            
          <div className="flex w-fit flex-col items-start gap-6">
            <div className="  rounded-3xl  border-blue-600 bg-[#EBF0FF] text-blue-600 px-4 py-2 text-blue-700 text-center font-bold hover:bg-blue-100 w-100 ">
              ✦ เรียนเขียนโปรแกรมภาษา C คู่กับ AI Tutor
            </div>
            <div className="text-[46px] font-bold leading-[1.4] text-[#14213F]">

                <div>เรียนเขียนโปรแกรม</div>
                <div>ให้เข้าใจจริง ไปกับ AI</div>
                <div>ที่ช่วยให้คุณคิดเป็น</div>
                <div>ไม่ใช่แค่ตอบคำตอบ</div>

              </div>
            <div className="text-[20px] text-[#65728C]">
              <div>ฝึกคิดอย่างเป็นระบบ วิเคราะห์ปัญหา</div>
              <div>และสร้างวิธีแก้ไขอย่างมีเหตุผล</div>
            </div>
            <div>
             <button className="group relative flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-[#315BFF] to-[#1D4ED8] px-6 py-3 w-36 text-[18px] font-bold text-white">
                <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-[#14213F] transition-transform duration-500 ease-out group-hover:scale-[25]" />
                <span className="relative z-10">เริ่มเรียน</span>

                <ArrowRight
                size={25}
                className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
            </div>
          </div>
          <div className="flex items-center justify-start bg-white">
             <Image
          src={Hero}
          alt="CodeLearn Logo"
          loading="eager"
          className="h-auto w-full object-contain"
        />
          </div>

            
        </div>

      {/* /* {*content*} */ }

      
      <div className="flex flex-col items-center justify-center bg-white">
          <div className="group overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/10">
            <Image
              src={Content}
              alt="CodeLearn Logo"
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            />
      </div>


        <div className="text-[46px] font-bold leading-[1.4] text-[#14213F]">

                <div>ทำไมต้องเรียนวิชา Computer Programming</div>

        </div>

        <div className="mt-[clamp(1rem,1vh,1rem)] text-[20px] text-[#65728C] text-center   ">
              <div>ภาษา C ช่วยวางรากฐานการเขียนโปรแกรม ตั้งแต่แนวคิดพื้นฐานไปจนถึงการทำงานของระบบ </div>
              <div className="items-center ">ทำให้คุณเข้าใจหลักการเขียนโค้ดและต่อยอดไปสู่ภาษาอื่นได้ง่ายขึ้น</div>
        </div>

        <section className="w-full bg-white py-16">
            <div className="mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,4vw,4rem)]">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl bg-[#F8F9FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                   {/* 1. กล่องไอคอน */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DBE4FF] text-[#2B4ACB]">
                    <Bot size={20} />
                  </div>

                  {/* 2. หัวข้อ */}
                  <h3 className="mt-6 text-[22px] font-bold text-[#14213F]">AI Tutor</h3>

                  {/* 3. คำอธิบาย */}
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5B6478]">
                    ไม่แค่บอกคำตอบ แต่ชวนให้คุณคิดวิเคราะห์ปัญหา เพื่อความเข้าใจที่แท้จริงและยั่งยืน
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8F9FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                    {/* 1. กล่องไอคอน */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1E0FF] text-[#3E3FCC]">
                    <SquareTerminal size={20} />
                  </div>

                  {/* 2. หัวข้อ */}
                  <h3 className="mt-6 text-[22px] font-bold text-[#14213F]">Code Editor ในตัว</h3>

                  {/* 3. คำอธิบาย */}
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5B6478]">
                    เรียนและเขียนโค้ดได้ทันทีบนเบราว์เซอร์ ไม่ต้องเสียเวลาติดตั้งโปรแกรมให้ยุ่งยาก
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8F9FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                   {/* 1. กล่องไอคอน */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D8E2FF] text-[#0058BE]">
                    <	CalendarDays size={20} />
                  </div>

                  {/* 2. หัวข้อ */}
                  <h3 className="mt-6 text-[22px] font-bold text-[#14213F]">การส่งงานตรงเวลา</h3>

                  {/* 3. คำอธิบาย */}
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5B6478]">
                    ติดตามความคืบหน้าและประวัติการเรียนรู้อย่างเป็นระบบ สร้างวินัยในระยะยาว
                  </p>
                </div>


                <div className="rounded-2xl bg-[#F8F9FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                   {/* 1. กล่องไอคอน */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFDAD6] text-[#BA1A1A]">
                    <	Flame size={20} />
                  </div>

                  {/* 2. หัวข้อ */}
                  <h3 className="mt-6 text-[22px] font-bold text-[#14213F]">Streak System</h3>

                  {/* 3. คำอธิบาย */}
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5B6478]">
                    รักษาระดับความต่อเนื่องในการเรียนรู้ทุกวันพร้อมรับรางวัลพิเศษเมื่อทำภารกิจสำเร็จ
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8F9FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                   {/* 1. กล่องไอคอน */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF3E0] text-[#E65100]">
                    <	Medal size={20} />
                  </div>

                  {/* 2. หัวข้อ */}
                  <h3 className="mt-6 text-[22px] font-bold text-[#14213F]">ระบบ Badges</h3>

                  {/* 3. คำอธิบาย */}
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5B6478]">
                    สะสมเหรียญตราแห่งความสำเร็จ เพื่อแสดงทักษะความเชี่ยวชาญในแต่ละบท
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8F9FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                   {/* 1. กล่องไอคอน */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E0F2F1] text-[#00695C]">
                    <	Globe size={20} />
                  </div>

                  {/* 2. หัวข้อ */}
                  <h3 className="mt-6 text-[22px] font-bold text-[#14213F]">ฝึกทักษะการคิด</h3>

                  {/* 3. คำอธิบาย */}
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5B6478]">
                    เรียนรู้ทักษะการคิดที่เป็นระบบโดยใช้ FlowChart และโปรแกรมที่เกี่ยวข้อง
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>      

      <Footer />
    </main>
  );
}


