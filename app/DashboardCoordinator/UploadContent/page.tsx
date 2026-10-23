"use client";

import React, { useState } from "react";
import CornerButton from "../Components/CornerButton";
import SaveSuccessModal from "../Components/SaveSuccessModal";

interface DocumentItem {
  id: string;
  name: string;
  size: string;
  status: "Queued" | "Processing" | "Done";
  date: string;
  chapter: string;
}

export default function UploadContentPage() {
  const [selectedTerm, setSelectedTerm] = useState("2569/1");
  const [selectedChapter, setSelectedChapter] = useState("บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "1",
      name: "Variable_2024.pdf",
      size: "2.1 MB",
      status: "Done",
      date: "18 / สิงหาคม / 2569",
      chapter: "บทที่ 1",
    },
    {
      id: "2",
      name: "Flowchart_Concepts.pdf",
      size: "3.4 MB",
      status: "Done",
      date: "19 / สิงหาคม / 2569",
      chapter: "บทที่ 2",
    },
    {
      id: "3",
      name: "Data_Types_Operators.pdf",
      size: "1.9 MB",
      status: "Queued",
      date: "20 / สิงหาคม / 2569",
      chapter: "บทที่ 3",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile) {
      setDocuments([
        {
          id: Date.now().toString(),
          name: uploadedFile.name,
          size: `${(uploadedFile.size / 1024 / 1024).toFixed(1)} MB`,
          status: "Queued",
          date: "วันนี้",
          chapter: selectedChapter.split(" ")[0] + " " + selectedChapter.split(" ")[1],
        },
        ...documents,
      ]);
      setUploadedFile(null);
    }
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Upload & Form Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">อัปโหลดเนื้อหา</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropzone */}
          <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-blue-50/20 hover:bg-blue-50/30 transition">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">อัปโหลดเอกสารประกอบการสอน</h3>
            <p className="text-sm text-gray-500 mb-5">Supported formats: .PDF Max file size: 50MB</p>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedFile(e.target.files[0]);
                  }
                }}
              />
              <div className="inline-flex items-center gap-2 bg-[#0B63E5] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-sm transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
                Browse Files
              </div>
            </label>

            {uploadedFile && (
              <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold flex items-center gap-2">
                <span>📄 {uploadedFile.name}</span>
                <span className="text-xs text-blue-600">({(uploadedFile.size / 1024 / 1024).toFixed(1)} MB)</span>
              </div>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              วิดีโอ (URL YouTube หรือลิงก์การสอน)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Term & Chapter selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                เทอมการสอน
              </label>
              <div className="relative">
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none bg-white cursor-pointer"
                >
                  <option value="2569/1">2569/1</option>
                  <option value="2568/2">2568/2</option>
                  <option value="2568/1">2568/1</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                บทเรียน
              </label>
              <div className="relative">
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none bg-white cursor-pointer"
                >
                  <option value="บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์">บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์</option>
                  <option value="บทที่ 2 ผังงาน">บทที่ 2 ผังงาน</option>
                  <option value="บทที่ 3 ตัวแปรและตัวดำเนินการ">บทที่ 3 ตัวแปรและตัวดำเนินการ</option>
                  <option value="บทที่ 4 เงื่อนไขและการตัดสินใจ">บทที่ 4 เงื่อนไขและการตัดสินใจ</option>
                  <option value="บทที่ 5 การวนซ้ำ (Loops)">บทที่ 5 การวนซ้ำ (Loops)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <CornerButton
              type="submit"
              variant="primary"
              className="px-8 py-3"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              }
              iconPosition="left"
            >
              บันทึก
            </CornerButton>
          </div>
        </form>
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
        <h3 className="text-lg font-bold text-gray-900 mb-4">เอกสารที่อัปโหลดล่าสุด</h3>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{doc.name}</h4>
                  <p className="text-xs text-gray-500">
                    {doc.size} • <span className="text-blue-600 font-medium">{doc.status}</span> • {doc.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {doc.chapter}
                </span>
                <button className="p-1.5 text-gray-400 hover:text-red-600 transition">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="อัปโหลดเนื้อหาเรียบร้อย"
        message="เอกสารและข้อมูลเนื้อหาการสอนได้รับการบันทึกเข้าสู่ระบบแล้ว"
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
