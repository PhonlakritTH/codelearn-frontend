"use client";

import React from "react";
import CornerButton from "./CornerButton";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title = "ยืนยันการลบ",
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all scale-100">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-center text-gray-500 mb-6">
          คุณแน่ใจหรือไม่ว่าต้องการลบ {itemName ? <span className="font-semibold text-gray-800">"{itemName}"</span> : "รายการนี้"} ? ข้อมูลนี้ไม่สามารถกู้คืนได้
        </p>
        <div className="flex items-center justify-center gap-3">
          <CornerButton variant="outline" onClick={onCancel}>
            ยกเลิก
          </CornerButton>
          <CornerButton variant="danger-solid" onClick={onConfirm}>
            ยืนยันการลบ
          </CornerButton>
        </div>
      </div>
    </div>
  );
}
