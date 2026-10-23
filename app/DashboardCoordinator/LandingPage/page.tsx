"use client";

import React, { useState } from "react";
import CornerButton from "../Components/CornerButton";
import SaveSuccessModal from "../Components/SaveSuccessModal";

export default function LandingPageManagement() {
  const [heroTitle, setHeroTitle] = useState("ยินดีต้อนรับสู่รายวิชาการเขียนโปรแกรมคอมพิวเตอร์");
  const [heroSubtitle, setHeroSubtitle] = useState("เรียนรู้แนวคิด พัฒนาทักษะการแก้ปัญหา และลงมือเขียนโค้ดจริงกับระบบตรวจอัจฉริยะ CodeLearn AI");
  const [announcement, setAnnouncement] = useState("ประกาศสำคัญ: ให้นักศึกษาทุกคนส่งรายงานสรุป Lab 02 ภายในวันอาทิตย์นี้เวลา 23:59 น.");
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [faqs, setFaqs] = useState([
    { id: "1", q: "หากส่งโค้ดแล้วระบบแจ้ง Compile Error ต้องทำอย่างไร?", a: "ให้นักศึกษาคลิกดูแถบข้อความแจ้งเตือนด้านล่าง หรือกดปุ่ม 'ถาม AI' เพื่อรับคำใบ้แนวทางการแก้ไขไวยากรณ์" },
    { id: "2", q: "การส่งงานเกินกำหนดเวลา (Late Submission) คิดคะแนนอย่างไร?", a: "งานที่ส่งช้ากว่ากำหนดจะถูกหัก 10% ต่อวัน สูงสุดไม่เกิน 3 วันหลังจากวันครบกำหนด" },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">จัดการเนื้อหาหน้าแรก</h1>
          <p className="text-sm text-gray-500">ปรับแต่งข้อความแบนเนอร์ ข่าวประกาศ และคำถามพบบ่อยสำหรับหน้า Landing Page</p>
        </div>
        <CornerButton
          onClick={handleSave}
          variant="primary"
          className="px-8 py-2.5"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          }
          iconPosition="left"
        >
          บันทึกการเปลี่ยนแปลง
        </CornerButton>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">ส่วนหัวเรื่อง (Hero Section)</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">หัวข้อหลัก (Title)</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">คำบรรยายสั้น (Subtitle)</label>
          <textarea
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-lg font-bold text-gray-900">แถบข่าวประชาสัมพันธ์ (Announcement Banner)</h2>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={isAnnouncementActive}
              onChange={(e) => setIsAnnouncementActive(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            เปิดแสดงแถบประกาศ
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ข้อความประกาศ</label>
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            disabled={!isAnnouncementActive}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-hidden transition ${
              isAnnouncementActive
                ? "border-amber-200 bg-amber-50/20 text-gray-900 focus:border-amber-400"
                : "border-gray-200 bg-gray-50 text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-lg font-bold text-gray-900">คำถามที่พบบ่อย (FAQs)</h2>
          <CornerButton
            onClick={() => {
              setFaqs([
                ...faqs,
                { id: Date.now().toString(), q: "คำถามใหม่", a: "คำตอบสำหรับคำถามนี้..." },
              ]);
            }}
            variant="outline"
            className="text-xs px-4 py-2"
          >
            + เพิ่มคำถาม
          </CornerButton>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/40 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => {
                    const newQ = e.target.value;
                    setFaqs(faqs.map((f) => (f.id === faq.id ? { ...f, q: newQ } : f)));
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-900 bg-white"
                  placeholder="คำถาม..."
                />
                <button
                  onClick={() => setFaqs(faqs.filter((f) => f.id !== faq.id))}
                  className="p-1.5 text-gray-400 hover:text-red-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <textarea
                rows={2}
                value={faq.a}
                onChange={(e) => {
                  const newA = e.target.value;
                  setFaqs(faqs.map((f) => (f.id === faq.id ? { ...f, a: newA } : f)));
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white"
                placeholder="คำตอบ..."
              />
            </div>
          ))}
        </div>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกเนื้อหาหน้าแรกสำเร็จ"
        message="การเปลี่ยนแปลงข้อความและข้อมูลประชาสัมพันธ์ได้รับการเผยแพร่แล้ว"
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
