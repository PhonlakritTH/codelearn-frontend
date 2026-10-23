"use client";

import React, { useState } from "react";
import CornerButton from "./CornerButton";

interface UploadDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File | null) => void;
}

export default function UploadDocModal({
  isOpen,
  onClose,
  onConfirm,
}: UploadDocModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl transition-all scale-100">
        <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-blue-50/20 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100/80 flex items-center justify-center text-blue-600 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">อัปโหลดเอกสาร</h3>
          <p className="text-sm text-gray-500 mb-6">Supported formats: .PDF Max file size: 50MB .</p>

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
            <p className="mt-3 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <CornerButton
            variant="danger-solid"
            onClick={onClose}
            className="flex-1 py-3"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            iconPosition="left"
          >
            ยกเลิก
          </CornerButton>

          <CornerButton
            variant="primary"
            onClick={() => {
              onConfirm(selectedFile);
              onClose();
            }}
            className="flex-1 py-3"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            }
            iconPosition="left"
          >
            ยืนยัน
          </CornerButton>
        </div>
      </div>
    </div>
  );
}
