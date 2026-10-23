# CodeLearn Frontend

ระบบเว็บแอปพลิเคชันสำหรับแพลตฟอร์มการเรียนการสอนเขียนโปรแกรม (AI Programming Tutor) พัฒนาด้วย **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** และ **TypeScript**

---

## 🚀 วิธีการติดตั้งและเริ่มใช้งาน (Getting Started)

1. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```

2. รัน Development Server:
   ```bash
   npm run dev
   ```

3. เปิดเบราว์เซอร์เข้าใช้งานที่:
   ```text
   http://localhost:3000
   ```

---

## 📁 โครงสร้างโปรเจกต์และหน้าที่ของแต่ละไฟล์ (Project Architecture)

```text
codelearn-frontend/
├── app/                              # Next.js App Router (ระบบหน้าเว็บและเส้นทาง URL)
│   ├── layout.tsx                    # Root Layout ครอบทุกหน้า พร้อมเชื่อมต่อ Google OAuth Provider
│   ├── globals.css                   # การตั้งค่าสไตล์ Global และ Tailwind CSS v4
│   ├── Provider.tsx                  # คอมโพเนนต์ Provider สำหรับ Google OAuth Client
│   ├── page.tsx                      # หน้าแรกของเว็บไซต์ (Landing Page: Hero, Feature, คอร์ส)
│   │
│   ├── Components/                   # คอมโพเนนต์ส่วนกลางของระบบ
│   │   ├── Navbar.tsx                # แถบนำทางด้านบนของหน้าแรก
│   │   ├── Footer.tsx                # ส่วนท้ายหน้าเว็บ (Footer)
│   │   ├── Card.tsx                  # การ์ดแสดงผลเนื้อหาทั่วไป
│   │   ├── GoogleSignInButton.tsx    # ปุ่มเข้าสู่ระบบด้วย Google Account
│   │   ├── SideBarStudent.tsx        # แถบเมนูด้านข้างสำหรับฝั่งนักศึกษา
│   │   ├── Topbar.tsx                # แถบส่วนหัวด้านบนสำหรับฝั่งนักศึกษา
│   │   ├── TiltImage.tsx             # เอฟเฟกต์ภาพเอียงแบบ 3D ตามการเลื่อนเมาส์
│   │   └── Currentyear.tsx           # ฟังก์ชันแสดงปี พ.ศ./ค.ศ. ปัจจุบันอัตโนมัติ
│   │
│   ├── Login/                        # หน้าระบบเข้าสู่ระบบ
│   │   └── page.tsx                  # หน้า Sign In ด้วย Google Account และแบบฟอร์ม
│   │
│   ├── OTP/                          # หน้ายืนยันความปลอดภัย
│   │   └── page.tsx                  # หน้ายืนยันรหัส OTP 4 หลัก พร้อมตัวนับเวลานับถอยหลัง
│   │
│   ├── FormNameafterOTP/             # หน้าตั้งค่าโปรไฟล์
│   │   └── page.tsx                  # แบบฟอร์มกรอกชื่อ-นามสกุลหลังผ่านการยืนยัน OTP
│   │
│   ├── Testpage/                     # หน้าทดสอบระบบ (Sandbox)
│   │   └── page.tsx                  # หน้าสำหรับทดลองคอมโพเนนต์และการทำงาน
│   │
│   ├── Dashboardstudent/             # 🎓 ระบบฝั่งนักศึกษา (Student Dashboard)
│   │   ├── layout.tsx                # Layout หลักของนักศึกษา (SideBarStudent + Topbar)
│   │   ├── MyCourses/                # หน้ารายวิชาที่ลงทะเบียน
│   │   │   ├── page.tsx              # หน้ารวมรายวิชาของนักศึกษา
│   │   │   ├── JoinClass/            # หน้าสำหรับกรอกรหัสเข้าร่วมชั้นเรียน
│   │   │   ├── Group/                # หน้ารายละเอียดกลุ่มเรียน
│   │   │   └── Section/              # หน้ารายละเอียดตอนเรียน / ห้องเรียน
│   │   ├── LabHistory/page.tsx       # หน้าตรวจสอบประวัติการส่งงานและแล็บ
│   │   ├── Scores/page.tsx           # หน้ารวมคะแนนและผลการประเมิน
│   │   └── Settings/page.tsx         # หน้าตั้งค่าข้อมูลส่วนตัวของนักศึกษา
│   │
│   └── DashboardTeacher/             # 👨‍🏫 ระบบฝั่งอาจารย์รายวิชา (Teacher Dashboard)
│       ├── layout.tsx                # Layout หลักของอาจารย์ (TeacherSidebar + TeacherTopbar)
│       ├── page.tsx                  # Redirect อัตโนมัติไปยังหน้ารายละเอียดห้องเรียน
│       │
│       ├── Components/               # คอมโพเนนต์เฉพาะฝั่งอาจารย์
│       │   ├── CornerButton.tsx      # ปุ่ม Reusable พร้อมแอนิเมชัน Corner Fill เมื่อ Hover
│       │   ├── CornerCard.tsx        # การ์ด Reusable พร้อมแอนิเมชัน Corner Fill เมื่อ Hover
│       │   ├── TeacherSidebar.tsx    # เมนูแถบข้างของอาจารย์ (ห้องเรียน, อัปโหลด, วิดีโอ, ตั้งค่า)
│       │   └── TeacherTopbar.tsx     # แถบด้านบนแสดง Breadcrumb อัตโนมัติตาม URL และโปรไฟล์
│       │
│       ├── Classrooms/               # 1. ระบบจัดการห้องเรียนและกลุ่มเรียน
│       │   ├── page.tsx              # หน้ารายละเอียดห้องเรียน (กลุ่มที่ 1, 2 ตัวกรองเทอม ความคืบหน้า)
│       │   ├── [groupId]/page.tsx    # หน้ารายละเอียดกลุ่ม (สถิตินักศึกษา, ตารางรายชื่อ, เพิ่มนักศึกษา)
│       │   ├── CreateCode/page.tsx   # หน้าสร้างรหัสห้องเรียน (Active Join Code: X79-QPL, Copy, Regenerate)
│       │   └── ManageCodes/page.tsx  # หน้าจัดการรหัสห้องเรียนทั้งหมด (ตารางรหัส, เทอม, กลุ่ม, ดู/แก้ไข/ลบ)
│       │
│       ├── CourseVideos/             # 2. ระบบวิดีโอและสื่อการสอน
│       │   ├── page.tsx              # หน้ารวมวิดีโอที่อัปโหลด (3 การ์ดสถิติตามผู้สอน, ตารางเอกสาร/วิดีโอ)
│       │   └── [videoId]/page.tsx    # หน้าเครื่องเล่นวิดีโอ (Video Player, Timeline Scrubber, ข้อมูลบทเรียน)
│       │
│       ├── UploadContent/            # 3. ระบบอัปโหลดสื่อการสอน
│       │   └── page.tsx              # หน้า Drag & Drop อัปโหลดวิดีโอ/เอกสาร พร้อมแถบความคืบหน้า
│       │
│       └── Settings/                 # 4. การตั้งค่าผู้สอน
│           └── page.tsx              # หน้าตั้งค่าโปรไฟล์อาจารย์ ข้อมูลภาควิชา และการเปลี่ยนรหัสผ่าน
│
├── example/                          # โฟลเดอร์เก็บไฟล์ภาพดีไซน์และ Mockup อ้างอิง
│   ├── ฝั่งนักศึกษา/                  # ภาพตัวอย่างดีไซน์ฝั่งนักศึกษา
│   ├── ฝั่งอาจารย์ผู้รับผิดชอบรายวิชา/  # ภาพตัวอย่างดีไซน์ฝั่งหัวหน้าผู้รับผิดชอบรายวิชา
│   └── ฝั่งอาจารย์รายวิชา/            # ภาพตัวอย่างดีไซน์และภาพสกรีนช็อตฝั่งอาจารย์รายวิชา
│
├── public/                           # ไฟล์ Static Assets สำหรับเข้าถึงผ่าน URL สาธารณะ
├── package.json                      # รายการ Libraries, Dependencies และ Scripts ในการรันโปรเจกต์
├── tsconfig.json                     # การตั้งค่า TypeScript Compiler และ Path Aliases (@/*)
├── next.config.ts                    # การตั้งค่าเฟรมเวิร์ก Next.js
├── eslint.config.mjs                 # การตั้งค่าการตรวจสอบคุณภาพโค้ด (ESLint)
└── README.md                         # เอกสารอธิบายรายละเอียดและการทำงานของระบบ
```

---

## 🎨 จุดเด่นด้าน UI & Micro-Animations

* **Corner Fill Hover Effect:** ทุกปุ่มและการ์ดในฝั่งอาจารย์ใช้เทคนิค **Corner Fill** (`CornerButton`, `CornerCard`) เมื่อนำเมาส์ไปชี้ (Hover) จะมีเอฟเฟกต์สีขยายวงกลมออกจากมุมอย่างนุ่มนวล
* **Interactive Mock UI:** หน้าจอฝั่งอาจารย์รายวิชามีระบบ Mock Data ที่ตอบสนองได้จริง เช่น:
  * การค้นหา/กรองรายชื่อนักศึกษาในกลุ่มเรียน
  * ฟอร์มเพิ่มนักศึกษาใหม่เข้าสู่ตาราง
  * การกดคัดลอกรหัสเข้าห้องเรียน (Copy Join Code)
  * การสุ่มสร้างรหัสห้องเรียนใหม่ (Regenerate Code)
  * การคลิกการ์ดสถิติวิดีโอเพื่อกรองดูเฉพาะวิดีโอของตนเองหรือของอาจารย์ผู้รับผิดชอบ
  * เครื่องเล่นวิดีโอพร้อม Timeline Scrubber ที่เลื่อนเวลาได้ และปุ่มควบคุมมัลติมีเดีย
  * กล่อง Drag & Drop อัปโหลดไฟล์พร้อมแถบความคืบหน้า (Upload Progress)

---

## 🔗 เส้นทางเข้าชมระบบ (Route URLs)

| ส่วนของระบบ | หน้าจอ | URL |
| :--- | :--- | :--- |
| **หน้าแรก & ล็อกอิน** | หน้าหลัก (Landing Page) | [http://localhost:3000](http://localhost:3000) |
| | หน้าเข้าสู่ระบบ (Login) | [http://localhost:3000/Login](http://localhost:3000/Login) |
| | หน้ายืนยันรหัส OTP | [http://localhost:3000/OTP](http://localhost:3000/OTP) |
| **ฝั่งนักศึกษา** | แดชบอร์ดรายวิชา | [http://localhost:3000/Dashboardstudent/MyCourses](http://localhost:3000/Dashboardstudent/MyCourses) |
| | สรุปคะแนน | [http://localhost:3000/Dashboardstudent/Scores](http://localhost:3000/Dashboardstudent/Scores) |
| **ฝั่งอาจารย์รายวิชา** | แดชบอร์ดห้องเรียน | [http://localhost:3000/DashboardTeacher/Classrooms](http://localhost:3000/DashboardTeacher/Classrooms) |
| | รายละเอียดกลุ่ม & รายชื่อนักศึกษา | [http://localhost:3000/DashboardTeacher/Classrooms/1](http://localhost:3000/DashboardTeacher/Classrooms/1) |
| | สร้างรหัสห้องเรียน (Join Code) | [http://localhost:3000/DashboardTeacher/Classrooms/CreateCode](http://localhost:3000/DashboardTeacher/Classrooms/CreateCode) |
| | จัดการรหัสห้องเรียนทั้งหมด | [http://localhost:3000/DashboardTeacher/Classrooms/ManageCodes](http://localhost:3000/DashboardTeacher/Classrooms/ManageCodes) |
| | หน้ารวมวิดีโอที่อัปโหลด | [http://localhost:3000/DashboardTeacher/CourseVideos](http://localhost:3000/DashboardTeacher/CourseVideos) |
| | หน้าเครื่องเล่นวิดีโอบทเรียน | [http://localhost:3000/DashboardTeacher/CourseVideos/1](http://localhost:3000/DashboardTeacher/CourseVideos/1) |
| | หน้าอัปโหลดสื่อการสอน | [http://localhost:3000/DashboardTeacher/UploadContent](http://localhost:3000/DashboardTeacher/UploadContent) |
| | การตั้งค่าโปรไฟล์อาจารย์ | [http://localhost:3000/DashboardTeacher/Settings](http://localhost:3000/DashboardTeacher/Settings) |
