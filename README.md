# CodeLearn Frontend

ระบบเว็บแอปพลิเคชันสำหรับแพลตฟอร์มการเรียนการสอนเขียนโปรแกรมอัจฉริยะ (AI Programming Tutor Platform) พัฒนาด้วย **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** และ **TypeScript** รองรับการใช้งาน 3 บทบาทหลักอย่างสมบูรณ์แบบ:
1. 🎓 **ฝั่งนักศึกษา (Student)**: ดูบทเรียน ทำแล็บ ส่งงาน ตรวจสอบคะแนน
2. 👨‍🏫 **ฝั่งอาจารย์รายวิชา (Teacher)**: จัดการกลุ่มเรียน ตรวจสอบสถิตินักศึกษา อัปโหลดวิดีโอ เครื่องเล่นวิดีโอ และจัดการรหัสเข้าห้องเรียน
3. 👑 **ฝั่งอาจารย์ผู้รับผิดชอบรายวิชา (Course Coordinator)**: จัดการบัญชีอาจารย์ จัดการห้องเรียน อัปโหลดสื่อกลาง Train AI จัดการคลังแบบฝึกหัด Lab & แบบทดสอบ Quiz พร้อมระบบสร้างคำถามด้วย AI โครงสร้างหลักสูตร และภาคการศึกษา

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
│   ├── Login/                        # หน้าระบบเข้าสู่ระบบทั่วไป
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
│   ├── DashboardTeacher/             # 👨‍🏫 ระบบฝั่งอาจารย์รายวิชา (Teacher Dashboard)
│   │   ├── layout.tsx                # Layout หลักของอาจารย์ (TeacherSidebar + TeacherTopbar)
│   │   ├── page.tsx                  # Redirect อัตโนมัติไปยังหน้ารายละเอียดห้องเรียน
│   │   ├── Components/               # คอมโพเนนต์เฉพาะฝั่งอาจารย์รายวิชา
│   │   │   ├── CornerButton.tsx      # ปุ่ม Reusable พร้อมแอนิเมชัน Corner Fill เมื่อ Hover
│   │   │   ├── CornerCard.tsx        # การ์ด Reusable พร้อมแอนิเมชัน Corner Fill เมื่อ Hover
│   │   │   ├── TeacherSidebar.tsx    # เมนูแถบข้างของอาจารย์ (ห้องเรียน, อัปโหลด, วิดีโอ, ตั้งค่า)
│   │   │   └── TeacherTopbar.tsx     # แถบด้านบนแสดง Breadcrumb อัตโนมัติตาม URL และโปรไฟล์
│   │   ├── Classrooms/               # 1. ระบบจัดการห้องเรียนและกลุ่มเรียน
│   │   │   ├── page.tsx              # หน้ารายละเอียดห้องเรียน (กลุ่มที่ 1, 2 ตัวกรองเทอม ความคืบหน้า)
│   │   │   ├── [groupId]/page.tsx    # หน้ารายละเอียดกลุ่ม (สถิตินักศึกษา, ตารางรายชื่อ, เพิ่มนักศึกษา)
│   │   │   ├── CreateCode/page.tsx   # หน้าสร้างรหัสห้องเรียน (Active Join Code: X79-QPL, Copy, Regenerate)
│   │   │   ├── ManageCodes/page.tsx  # หน้าจัดการรหัสห้องเรียนทั้งหมด (ตารางรหัส, เทอม, กลุ่ม, ดู/แก้ไข/ลบ Modal)
│   │   │   └── Submissions/page.tsx  # หน้าตรวจงานนักศึกษาและกำหนดส่งงาน (Lab & Quiz พร้อม Modal ยืนยัน)
│   │   ├── CourseVideos/             # 2. ระบบวิดีโอและสื่อการสอน
│   │   │   ├── page.tsx              # หน้ารวมวิดีโอที่อัปโหลด (3 การ์ดสถิติตามผู้สอน, ตารางเอกสาร/วิดีโอ)
│   │   │   └── [videoId]/page.tsx    # หน้าเครื่องเล่นวิดีโอ (Video Player, Timeline Scrubber, ข้อมูลบทเรียน)
│   │   ├── UploadContent/            # 3. ระบบอัปโหลดสื่อการสอน
│   │   │   └── page.tsx              # หน้า Drag & Drop อัปโหลดวิดีโอ/เอกสาร พร้อมแถบความคืบหน้า
│   │   └── Settings/                 # 4. การตั้งค่าผู้สอน
│   │       └── page.tsx              # หน้าตั้งค่าโปรไฟล์อาจารย์ ข้อมูลภาควิชา และการเปลี่ยนรหัสผ่าน
│   │
│   └── DashboardCoordinator/         # 👑 ระบบฝั่งอาจารย์ผู้รับผิดชอบรายวิชา (Course Coordinator)
│       ├── layout.tsx                # Coordinator Layout พร้อม Sidebar + Topbar และ Suspense Boundaries
│       ├── page.tsx                  # Redirect อัตโนมัติไปยัง /DashboardCoordinator/Teachers
│       ├── Components/               # คอมโพเนนต์เฉพาะฝั่งอาจารย์ผู้รับผิดชอบรายวิชา
│       │   ├── CornerButton.tsx      # ปุ่ม Reusable ปรับปรุงให้มีเอฟเฟกต์ Corner Fill 100% ทุกปุ่ม
│       │   ├── CornerCard.tsx        # การ์ด Reusable พร้อมเอฟเฟกต์ Corner Fill เมื่อ Hover
│       │   ├── CoordinatorSidebar.tsx# แถบเมนูด้านข้าง 11 เมนู พร้อมสถานะ Active ตาม URL ปัจจุบัน
│       │   ├── CoordinatorTopbar.tsx # แถบด้านบนแสดง Breadcrumb อัตโนมัติและโปรไฟล์อาจารย์
│       │   ├── UploadDocModal.tsx    # Modal อัปโหลดไฟล์ PDF สูงสุด 50MB พร้อม Drag & Drop (pdf-83)
│       │   ├── DeleteConfirmModal.tsx# Modal ยืนยันการลบข้อมูลถาวร (สีแดง-เขียว สไตล์ Figma)
│       │   └── SaveSuccessModal.tsx  # Modal บันทึกข้อมูลสำเร็จพร้อม Toast แจ้งเตือน
│       │
│       ├── Login/page.tsx            # หน้าเข้าสู่ระบบเฉพาะอาจารย์ผู้รับผิดชอบ (pdf-63)
│       ├── ForgotPassword/page.tsx   # หน้าลืมรหัสผ่าน กรอกอีเมลเพื่อรับ OTP (pdf-68)
│       ├── VerifyOTP/page.tsx        # หน้ายืนยันรหัส OTP 4 หลักทางอีเมล (pdf-69)
│       ├── ResetPassword/page.tsx    # หน้าตั้งรหัสผ่านใหม่ (pdf-70)
│       │
│       ├── Teachers/                 # 1. จัดการอาจารย์ผู้สอน (pdf-64, pdf-65)
│       │   ├── page.tsx              # ตารางรายชื่ออาจารย์ ค้นหา กรองสถานะ ลบ/แก้ไข
│       │   ├── Create/page.tsx       # แบบฟอร์มเพิ่มบัญชีอาจารย์ พร้อมปุ่ม "สุ่มรหัสผ่าน" (pdf-66)
│       │   └── Edit/page.tsx         # แบบฟอร์มแก้ไขข้อมูลอาจารย์ผู้สอน (pdf-67)
│       │
│       ├── Classrooms/               # 2. จัดการห้องเรียน (pdf-71)
│       │   ├── page.tsx              # ตารางห้องเรียนและกลุ่มเรียน ตัวกรองภาคเรียน 2569/1
│       │   └── Create/page.tsx       # แบบฟอร์มเพิ่ม/แก้ไขห้องเรียน (pdf-72)
│       │
│       ├── UploadContent/page.tsx    # 3. อัปโหลดสื่อการสอน (PDF Dropzone, ลิงก์ YouTube, เลือกบทเรียน) (pdf-73)
│       ├── TrainAI/page.tsx          # 4. Train AI (อัปโหลด PDF สำหรับ Knowledge Base พร้อม Progress) (pdf-74)
│       │
│       ├── Labs/                     # 5. จัดการแบบฝึกหัด Lab (pdf-75)
│       │   ├── page.tsx              # รายการ Lab, สถานะเผยแพร่/ร่าง, ตัวกรองบทเรียน
│       │   ├── Create/page.tsx       # ฟอร์มสร้างแล็บ ตั้งค่ากำหนดส่ง และตารางรายการโจทย์ (pdf-76)
│       │   └── CreateQuestion/page.tsx# ฟอร์มสร้างโจทย์แล็บ รายละเอียด อัปโหลดรูปภาพ คะแนน (pdf-77)
│       │
│       ├── Quizzes/                  # 6. จัดการแบบทดสอบ Quiz (pdf-78)
│       │   ├── page.tsx              # รายการควิซ แสดงเวอร์ชันและสถานะ
│       │   ├── Create/page.tsx       # ฟอร์มสร้างควิซ เลือกเอกสารอ้างอิง และปุ่มสร้างโจทย์ด้วย AI (pdf-79)
│       │   ├── CreateQuestion/page.tsx# ฟอร์มสร้างโจทย์ควิซ เลือกแบบข้อความ หรือแบบรูปภาพ พร้อมเฉลย (pdf-80, 81)
│       │   └── AIGenerate/page.tsx   # หน้าสร้างข้อสอบด้วย AI เลือกข้อที่ต้องการและนำเข้าควิซ (pdf-82)
│       │
│       ├── Semesters/                # 7. จัดการภาคการศึกษาและบทเรียน (pdf-84)
│       │   ├── page.tsx              # ตารางภาคการศึกษา วันสอบกลางภาค-ปลายภาค ปุ่มจัดการบทเรียน
│       │   ├── Create/page.tsx       # ฟอร์มเพิ่มภาคการศึกษาและกำหนดช่วงเวลาสอบ (pdf-86)
│       │   └── Chapters/page.tsx     # ตัวจัดการบทเรียนกลางภาค/ปลายภาค พร้อมปุ่ม "คัดลอกบทเรียน" (pdf-85)
│       │
│       ├── Documents/page.tsx        # 8. คลังเอกสารประกอบการสอน ตารางสถานะและปุ่มดาวน์โหลด (pdf-90)
│       ├── Curriculum/page.tsx       # 9. โครงสร้างหลักสูตร เกณฑ์สัดส่วนคะแนน 100% และเนื้อหารายสัปดาห์
│       ├── LandingPage/page.tsx      # 10. จัดการเนื้อหาหน้าแรก ข้อความโปรโมท ข่าวประกาศ และ FAQs
│       └── Settings/page.tsx         # 11. การตั้งค่าระบบ โปรไฟล์ ความเข้มงวดของ AI และการตรวจงานอัตโนมัติ
│
├── example/                          # โฟลเดอร์เก็บไฟล์ภาพดีไซน์และ Mockup อ้างอิงจาก Figma
│   ├── ฝั่งนักศึกษา/                  # ภาพตัวอย่างดีไซน์ฝั่งนักศึกษา
│   ├── ฝั่งอาจารย์ผู้รับผิดชอบรายวิชา/  # ภาพตัวอย่างดีไซน์ฝั่งหัวหน้าผู้รับผิดชอบรายวิชา (pdf-63 ถึง pdf-90)
│   └── ฝั่งอาจารย์รายวิชา/            # ภาพตัวอย่างดีไซน์ฝั่งอาจารย์รายวิชา
│
├── public/                           # ไฟล์ Static Assets
├── package.json                      # Dependencies และ Scripts
├── tsconfig.json                     # การตั้งค่า TypeScript Compiler และ Path Aliases (@/*)
├── next.config.ts                    # การตั้งค่าเฟรมเวิร์ก Next.js
└── README.md                         # เอกสารอธิบายรายละเอียดและการทำงานของระบบ
```

---

## 🎨 จุดเด่นด้าน UI & Micro-Animations

* **Corner Fill Hover Effect 100%:** ทุกปุ่ม (`CornerButton`) และการ์ด (`CornerCard`) ในระบบฝั่งอาจารย์และผู้รับผิดชอบรายวิชาถูกสร้างขึ้นโดยมีแอนิเมชัน **Corner Fill** ตามสเปก โดยเมื่อชี้เมาส์ (Hover) วงกลมสีจะขยายกระจายออกจากมุมปุ่มอย่างนุ่มนวล
* **Interactive Mock UI & State Management:** ระบบหน้าจอทั้งหมดเป็น Interactive Frontend ที่ตอบสนองได้เสมือนเชื่อมต่อ Backend จริง:
  * การค้นหา, คัดกรองสถานะ และการแบ่งหน้า (Pagination)
  * การสร้างบัญชีอาจารย์พร้อมปุ่ม **สุ่มรหัสผ่าน (Random Password Generator)**
  * การสุ่มสร้างรหัสห้องเรียน (Join Code) และคัดลอกลงคลิปบอร์ด
  * หน้าสร้างข้อสอบด้วย **AI Generated Quizzes** พร้อมตัวเลือกกำหนดจำนวนข้อและเลือกคำถาม
  * หน้าจัดการบทเรียนกลางภาค/ปลายภาค พร้อมฟังก์ชัน **คัดลอกบทเรียนจากเทอมก่อนหน้า**
  * เครื่องเล่นวิดีโอพร้อม Timeline Scrubber และแถบควบคุมสื่อ
  * กล่อง Drag & Drop อัปโหลดเอกสาร PDF / วิดีโอ พร้อมแถบเปอร์เซ็นต์ความคืบหน้า
  * Modal ยืนยันการลบ (Delete Confirmation) และบันทึกข้อมูล (Save Confirmation) ตรงตาม Figma
* **Next.js 16 App Router & Suspense Architecture:** ทุกหน้าที่มีการเรียกใช้ Dynamic Query Hooks (`useSearchParams`) มีการครอบด้วย `<Suspense>` อย่างถูกต้อง ไม่ทำให้เกิด Build Error หรือ Bailout

---

## 🔗 เส้นทางเข้าชมระบบทั้งหมด (Route URLs)

### 1. หน้าแรก & การเข้าสู่ระบบทั่วไป
| หน้าจอ | รายละเอียด | URL |
| :--- | :--- | :--- |
| **หน้าหลัก (Landing Page)** | แนะนำคอร์ส, ฟีเจอร์ AI Tutor | [http://localhost:3000](http://localhost:3000) |
| **เข้าสู่ระบบ (Login)** | หน้า Sign In ทั่วไป | [http://localhost:3000/Login](http://localhost:3000/Login) |
| **ยืนยัน OTP** | หน้ากรอกรหัสยืนยันตัวตน | [http://localhost:3000/OTP](http://localhost:3000/OTP) |

### 2. ฝั่งนักศึกษา (Student)
| หน้าจอ | รายละเอียด | URL |
| :--- | :--- | :--- |
| **แดชบอร์ดรายวิชา** | รายการวิชาและบทเรียนที่ลงทะเบียน | [http://localhost:3000/Dashboardstudent/MyCourses](http://localhost:3000/Dashboardstudent/MyCourses) |
| **ผลคะแนน** | คะแนนสะสมและผลการประเมินการเขียนโค้ด | [http://localhost:3000/Dashboardstudent/Scores](http://localhost:3000/Dashboardstudent/Scores) |

### 3. ฝั่งอาจารย์รายวิชา (Teacher)
| หน้าจอ | รายละเอียด | URL |
| :--- | :--- | :--- |
| **แดชบอร์ดห้องเรียน** | ภาพรวมห้องเรียนและกลุ่มเรียน | [http://localhost:3000/DashboardTeacher/Classrooms](http://localhost:3000/DashboardTeacher/Classrooms) |
| **รายละเอียดกลุ่ม & นักศึกษา** | สถิติและรายชื่อนักศึกษาในกลุ่ม | [http://localhost:3000/DashboardTeacher/Classrooms/1](http://localhost:3000/DashboardTeacher/Classrooms/1) |
| **สร้างรหัสเข้าห้องเรียน** | รหัส Join Code (Active, Copy, สุ่มใหม่) | [http://localhost:3000/DashboardTeacher/Classrooms/CreateCode](http://localhost:3000/DashboardTeacher/Classrooms/CreateCode) |
| **จัดการรหัสห้องเรียนทั้งหมด** | ตารางรหัสห้องเรียนและ Modal ลบ | [http://localhost:3000/DashboardTeacher/Classrooms/ManageCodes](http://localhost:3000/DashboardTeacher/Classrooms/ManageCodes) |
| **ตรวจงานและกำหนดส่งงาน** | มอบหมาย Lab และ Quiz พร้อม Modal ยืนยัน | [http://localhost:3000/DashboardTeacher/Classrooms/Submissions](http://localhost:3000/DashboardTeacher/Classrooms/Submissions) |
| **วิดีโอการสอน** | หน้ารวมสื่อวิดีโอและเอกสาร | [http://localhost:3000/DashboardTeacher/CourseVideos](http://localhost:3000/DashboardTeacher/CourseVideos) |
| **เครื่องเล่นวิดีโอ** | Video Player พร้อม Scrubber และโน้ตบทเรียน | [http://localhost:3000/DashboardTeacher/CourseVideos/1](http://localhost:3000/DashboardTeacher/CourseVideos/1) |
| **อัปโหลดสื่อการสอน** | Drag & Drop อัปโหลดวิดีโอและไฟล์ | [http://localhost:3000/DashboardTeacher/UploadContent](http://localhost:3000/DashboardTeacher/UploadContent) |
| **ตั้งค่าโปรไฟล์** | ข้อมูลผู้สอนและเปลี่ยนรหัสผ่าน | [http://localhost:3000/DashboardTeacher/Settings](http://localhost:3000/DashboardTeacher/Settings) |

### 4. ฝั่งอาจารย์ผู้รับผิดชอบรายวิชา (Course Coordinator)
| หน้าจอ | รายละเอียด | อ้างอิงดีไซน์ | URL |
| :--- | :--- | :--- | :--- |
| **เข้าสู่ระบบผู้รับผิดชอบ** | หน้า Login เฉพาะอาจารย์ผู้รับผิดชอบ | `pdf-63` | [http://localhost:3000/DashboardCoordinator/Login](http://localhost:3000/DashboardCoordinator/Login) |
| **ลืมรหัสผ่าน** | กรอกอีเมลเพื่อส่งรหัส OTP | `pdf-68` | [http://localhost:3000/DashboardCoordinator/ForgotPassword](http://localhost:3000/DashboardCoordinator/ForgotPassword) |
| **ยืนยัน OTP** | ยืนยัน OTP สำหรับรีเซ็ตรหัสผ่าน | `pdf-69` | [http://localhost:3000/DashboardCoordinator/VerifyOTP](http://localhost:3000/DashboardCoordinator/VerifyOTP) |
| **ตั้งรหัสผ่านใหม่** | ฟอร์มบันทึกรหัสผ่านใหม่ | `pdf-70` | [http://localhost:3000/DashboardCoordinator/ResetPassword](http://localhost:3000/DashboardCoordinator/ResetPassword) |
| **จัดการอาจารย์ผู้สอน** | รายการอาจารย์ ค้นหา กรองสถานะ ลบ/แก้ไข | `pdf-64, 65` | [http://localhost:3000/DashboardCoordinator/Teachers](http://localhost:3000/DashboardCoordinator/Teachers) |
| **เพิ่มบัญชีอาจารย์** | แบบฟอร์มเพิ่มอาจารย์ พร้อมปุ่มสุ่มรหัสผ่าน | `pdf-66` | [http://localhost:3000/DashboardCoordinator/Teachers/Create](http://localhost:3000/DashboardCoordinator/Teachers/Create) |
| **แก้ไขข้อมูลอาจารย์** | ฟอร์มแก้ไขชื่อ อีเมล ภาควิชา | `pdf-67` | [http://localhost:3000/DashboardCoordinator/Teachers/Edit?id=1](http://localhost:3000/DashboardCoordinator/Teachers/Edit?id=1) |
| **จัดการห้องเรียน** | รายการห้องเรียน ตัวกรองเทอม 2569/1 | `pdf-71` | [http://localhost:3000/DashboardCoordinator/Classrooms](http://localhost:3000/DashboardCoordinator/Classrooms) |
| **เพิ่ม/แก้ไขห้องเรียน** | ฟอร์มกรอกชื่อวิชา กลุ่ม รหัสวิชา | `pdf-72` | [http://localhost:3000/DashboardCoordinator/Classrooms/Create](http://localhost:3000/DashboardCoordinator/Classrooms/Create) |
| **อัปโหลดเนื้อหา** | อัปโหลด PDF กลาง, YouTube URL, เลือกบทเรียน | `pdf-73` | [http://localhost:3000/DashboardCoordinator/UploadContent](http://localhost:3000/DashboardCoordinator/UploadContent) |
| **Train AI** | อัปโหลดเอกสารเข้าคลังความรู้ AI พร้อมแถบ Progress | `pdf-74` | [http://localhost:3000/DashboardCoordinator/TrainAI](http://localhost:3000/DashboardCoordinator/TrainAI) |
| **จัดการแบบฝึกหัด Lab** | ตาราง Lab สถานะเผยแพร่/ร่าง และตัวกรอง | `pdf-75` | [http://localhost:3000/DashboardCoordinator/Labs](http://localhost:3000/DashboardCoordinator/Labs) |
| **สร้าง Lab ใหม่** | ฟอร์มกำหนดชื่อแล็บ วันส่ง และรายการโจทย์ | `pdf-76` | [http://localhost:3000/DashboardCoordinator/Labs/Create](http://localhost:3000/DashboardCoordinator/Labs/Create) |
| **สร้างโจทย์ในแล็บ** | โจทย์แล็บ อัปโหลดรูปภาพ ตัวอย่างโค้ด คะแนน | `pdf-77` | [http://localhost:3000/DashboardCoordinator/Labs/CreateQuestion](http://localhost:3000/DashboardCoordinator/Labs/CreateQuestion) |
| **จัดการแบบทดสอบ Quiz** | ตารางควิซ แสดงเวอร์ชันและสถานะ | `pdf-78` | [http://localhost:3000/DashboardCoordinator/Quizzes](http://localhost:3000/DashboardCoordinator/Quizzes) |
| **สร้างควิซใหม่** | ฟอร์มสร้างควิซ เลือกเอกสารอ้างอิง และปุ่ม Train AI | `pdf-79` | [http://localhost:3000/DashboardCoordinator/Quizzes/Create](http://localhost:3000/DashboardCoordinator/Quizzes/Create) |
| **สร้างคำถามในควิซ** | ฟอร์มข้อสอบ ตัวเลือกข้อความ/รูปภาพ พร้อมเฉลย | `pdf-80, 81` | [http://localhost:3000/DashboardCoordinator/Quizzes/CreateQuestion](http://localhost:3000/DashboardCoordinator/Quizzes/CreateQuestion) |
| **สร้างข้อสอบด้วย AI** | สร้างชุดคำถามอัตโนมัติด้วย AI พร้อมเลือกข้อ | `pdf-82` | [http://localhost:3000/DashboardCoordinator/Quizzes/AIGenerate](http://localhost:3000/DashboardCoordinator/Quizzes/AIGenerate) |
| **ภาคการศึกษา** | รายการเทอม วันสอบกลางภาค-ปลายภาค | `pdf-84` | [http://localhost:3000/DashboardCoordinator/Semesters](http://localhost:3000/DashboardCoordinator/Semesters) |
| **เพิ่มภาคการศึกษา** | กำหนดปีการศึกษา เทอม และช่วงเวลาสอบ | `pdf-86` | [http://localhost:3000/DashboardCoordinator/Semesters/Create](http://localhost:3000/DashboardCoordinator/Semesters/Create) |
| **จัดการบทเรียนในเทอม** | โครงสร้างบทเรียน และปุ่มคัดลอกบทเรียน | `pdf-85` | [http://localhost:3000/DashboardCoordinator/Semesters/Chapters](http://localhost:3000/DashboardCoordinator/Semesters/Chapters) |
| **คลังเอกสาร** | ตารางติดตามเอกสารประกอบการสอนและดาวน์โหลด | `pdf-90` | [http://localhost:3000/DashboardCoordinator/Documents](http://localhost:3000/DashboardCoordinator/Documents) |
| **โครงสร้างหลักสูตร** | สัดส่วนคะแนน 100% และเนื้อหารายสัปดาห์ | เพิ่มเติม | [http://localhost:3000/DashboardCoordinator/Curriculum](http://localhost:3000/DashboardCoordinator/Curriculum) |
| **จัดการหน้าแรก** | แก้ไขข้อความ Hero, Announcement และ FAQs | เพิ่มเติม | [http://localhost:3000/DashboardCoordinator/LandingPage](http://localhost:3000/DashboardCoordinator/LandingPage) |
| **การตั้งค่าระบบ** | โปรไฟล์ ระดับความเข้มงวด AI และการตรวจงาน | เพิ่มเติม | [http://localhost:3000/DashboardCoordinator/Settings](http://localhost:3000/DashboardCoordinator/Settings) |
