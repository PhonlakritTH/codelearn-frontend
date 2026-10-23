"use client";

import React from "react";
import CornerButton from "./CornerButton";

interface SaveSuccessModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export default function SaveSuccessModal({
  isOpen,
  title = "บันทึกสำเร็จ",
  message = "ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว",
  onClose,
}: SaveSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <CornerButton variant="primary" onClick={onClose} className="w-full">
          ตกลง
        </CornerButton>
      </div>
    </div>
  );
}
