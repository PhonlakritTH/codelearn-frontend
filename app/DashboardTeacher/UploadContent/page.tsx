"use client";

import { useState } from "react";
import {
  CloudUpload,
  FileVideo,
  FileText,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
} from "lucide-react";
import CornerButton from "../Components/CornerButton";

export default function UploadContentPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("1");
  const [description, setDescription] = useState("");
  const [targetGroup, setTargetGroup] = useState("all");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileName || !title) return;

    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSuccess(true);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
          อัปโหลดเนื้อหาและสื่อการสอน
        </h1>
        <p className="text-sm text-gray-500">
          อัปโหลดวิดีโอ เอกสารประกอบการสอน หรือแบบฝึกหัดสำหรับนักศึกษาในรายวิชา
        </p>
      </div>

      {success && (
        <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 animate-fade-in shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={24} className="text-green-600" />
            <div>
              <div className="font-bold">อัปโหลดไฟล์สำเร็จแล้ว!</div>
              <div className="text-xs text-green-700">
                ระบบได้เพิ่ม &quot;{title}&quot; เข้าสู่รายการวิดีโอและสื่อการสอนเรียบร้อยแล้ว
              </div>
            </div>
          </div>
          <CornerButton
            href="/DashboardTeacher/CourseVideos"
            variant="outline"
          >
            ไปดูรายการวิดีโอ
          </CornerButton>
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Dropzone container */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-all ${
            dragActive
              ? "border-blue-600 bg-blue-50/60"
              : "border-gray-200 bg-white hover:border-blue-400"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            onChange={handleFileInput}
            accept="video/*,.pdf,.ppt,.pptx"
            className="hidden"
          />

          {selectedFileName ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FileVideo size={32} />
              </div>
              <div>
                <div className="font-bold text-[#14213F]">{selectedFileName}</div>
                <div className="text-xs text-gray-400">{fileSize}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFileName("");
                  setFileSize("");
                }}
                className="flex items-center gap-1 text-xs text-red-500 hover:underline"
              >
                <X size={14} /> ยกเลิกไฟล์นี้
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center gap-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
                <CloudUpload size={32} />
              </div>
              <div>
                <div className="text-base font-bold text-[#14213F]">
                  ลากไฟล์มาวางที่นี่ หรือ <span className="text-blue-600 underline">คลิกเพื่อเลือกไฟล์</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  รองรับไฟล์ MP4, MKV, MOV, WebM, PDF, PPTX (สูงสุด 500 MB)
                </div>
              </div>
            </label>
          )}

          {isUploading && (
            <div className="mt-6 w-full max-w-md space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>กำลังอัปโหลด...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Metadata form fields */}
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-[#14213F]">รายละเอียดเนื้อหา</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#14213F] uppercase">
                ชื่อเรื่อง / บทเรียน *
              </label>
              <input
                type="text"
                required
                placeholder="เช่น บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 py-2.5 px-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#14213F] uppercase">
                  ลำดับบทเรียน
                </label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 py-2.5 px-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      บทที่ {num}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14213F] uppercase">
                  กลุ่มเรียนเป้าหมาย
                </label>
                <select
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 py-2.5 px-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">ทุกกลุ่มเรียน</option>
                  <option value="1">กลุ่มเรียนที่ 1</option>
                  <option value="2">กลุ่มเรียนที่ 2</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#14213F] uppercase">
              คำอธิบายเนื้อหา
            </label>
            <textarea
              rows={4}
              placeholder="ระบุวัตถุประสงค์และเนื้อหาย่อที่นักศึกษาจะได้เรียนรู้ในบทเรียนนี้..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 py-2.5 px-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex justify-end pt-2">
            <CornerButton
              type="submit"
              disabled={isUploading}
              variant="primary"
              className="w-full sm:w-auto"
              icon={<CloudUpload size={18} />}
              iconPosition="right"
            >
              {isUploading ? "กำลังอัปโหลด..." : "ยืนยันและเผยแพร่วิดีโอ"}
            </CornerButton>
          </div>
        </div>
      </form>
    </div>
  );
}
