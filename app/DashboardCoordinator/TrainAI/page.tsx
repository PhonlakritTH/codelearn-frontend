"use client";

import React, { useState } from "react";
import CornerButton from "../Components/CornerButton";
import SaveSuccessModal from "../Components/SaveSuccessModal";

interface TrainedFile {
  id: string;
  name: string;
  size: string;
  vectorCount: number;
  status: "พร้อมใช้งาน" | "กำลังเทรนด์" | "รอดำเนินการ";
  date: string;
}

export default function TrainAIPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [trainedFiles, setTrainedFiles] = useState<TrainedFile[]>([
    {
      id: "1",
      name: "Programming_C_Fundamentals.pdf",
      size: "14.2 MB",
      vectorCount: 1240,
      status: "พร้อมใช้งาน",
      date: "20 ส.ค. 2569",
    },
    {
      id: "2",
      name: "Data_Structures_and_Algorithms_TH.pdf",
      size: "28.5 MB",
      vectorCount: 2890,
      status: "พร้อมใช้งาน",
      date: "15 ส.ค. 2569",
    },
    {
      id: "3",
      name: "Lab_Exercises_Guide_2026.pdf",
      size: "8.1 MB",
      vectorCount: 820,
      status: "พร้อมใช้งาน",
      date: "10 ส.ค. 2569",
    },
  ]);

  const handleStartTrain = () => {
    if (!selectedFile) return;
    setIsTraining(true);
    setTimeout(() => {
      setTrainedFiles([
        {
          id: Date.now().toString(),
          name: selectedFile.name,
          size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
          vectorCount: Math.floor(Math.random() * 1000) + 500,
          status: "พร้อมใช้งาน",
          date: "วันนี้",
        },
        ...trainedFiles,
      ]);
      setIsTraining(false);
      setSelectedFile(null);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Train AI Card matching Figma pdf-74 */}
      <div className="bg-white rounded-3xl border border-gray-100 p-10 shadow-xs flex flex-col items-center text-center">
        {/* CodeLearn Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">CodeLearn</h2>
            <p className="text-xs text-gray-500">AI Programming Tutor</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          อัปโหลดเอกสารเพื่อเทรนด์ข้อมูลให้ AI
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mb-8">
          อัปโหลดไฟล์คำสอน แบบฝึกหัด หรือเอกสารประกอบ เพื่อให้ AI ผู้ช่วยตรวจและอธิบายทำความเข้าใจเนื้อหารายวิชาได้แม่นยำยิ่งขึ้น
        </p>

        {/* Dropzone */}
        <div className="w-full border-2 border-dashed border-blue-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-blue-50/20 hover:bg-blue-50/30 transition mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</h3>
          <p className="text-xs text-gray-500 mb-6">Supported formats: .PDF Max file size: 50MB</p>

          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
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

          {selectedFile && (
            <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-semibold flex items-center gap-2">
              <span>📄 {selectedFile.name}</span>
              <span className="text-xs text-blue-600">({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <CornerButton
          variant="ai"
          disabled={!selectedFile || isTraining}
          onClick={handleStartTrain}
          className="px-8 py-3 text-base"
          icon={
            isTraining ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              <span>✨</span>
            )
          }
          iconPosition="left"
        >
          {isTraining ? "กำลังประมวลผลข้อมูลและเทรนด์ AI..." : "✨ เพิ่มเอกสารให้ Ai"}
        </CornerButton>
      </div>

      {/* Trained Knowledge Base List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">คลังเอกสารที่เทรนด์แล้ว (Knowledge Base)</h3>
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">
            Active: {trainedFiles.length} ฉบับ
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {trainedFiles.map((file) => (
            <div key={file.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0">
                  AI
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{file.name}</h4>
                  <p className="text-xs text-gray-500">
                    ขนาด: {file.size} • เวกเตอร์: {file.vectorCount} embeddings • วันที่: {file.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {file.status}
                </span>
                <button
                  onClick={() => setTrainedFiles(trainedFiles.filter((f) => f.id !== file.id))}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition"
                  title="ลบเอกสาร"
                >
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
        title="เทรนด์เอกสารให้ AI สำเร็จ"
        message="AI ได้ทำการอ่านและสร้าง Context Embeddings จากไฟล์เอกสารของคุณเรียบร้อยแล้ว"
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
