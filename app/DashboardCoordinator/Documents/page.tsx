"use client";

import React, { useState } from "react";
import CornerButton from "../Components/CornerButton";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";

interface DocumentFile {
  id: string;
  name: string;
  size: string;
  status: "Queued" | "Completed" | "Processing";
  uploadDate: string;
  chapter: number;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>([
    {
      id: "1",
      name: "Variable_2024.pdf",
      size: "2.1 MB",
      status: "Queued",
      uploadDate: "18 / สิงหาคม / 2569",
      chapter: 1,
    },
    {
      id: "2",
      name: "Variable_2024.pdf",
      size: "2.1 MB",
      status: "Queued",
      uploadDate: "18 / สิงหาคม / 2569",
      chapter: 2,
    },
    {
      id: "3",
      name: "Control_Structures_Loops.pdf",
      size: "3.5 MB",
      status: "Completed",
      uploadDate: "20 / สิงหาคม / 2569",
      chapter: 3,
    },
    {
      id: "4",
      name: "Functions_and_Pointers.pdf",
      size: "4.2 MB",
      status: "Completed",
      uploadDate: "22 / สิงหาคม / 2569",
      chapter: 4,
    },
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setDocuments(documents.filter((d) => d.id !== deleteId));
      setDeleteId(null);
    }
  };

  const itemToDelete = documents.find((d) => d.id === deleteId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          รายการเอกสารที่อัปโหลด
        </h1>
        <p className="text-sm text-gray-500">Check work submission</p>
      </div>

      {/* Table Container Card matching Figma pdf-90 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">รายการเอกสาร</h2>
          <CornerButton
            href="/DashboardCoordinator/UploadContent"
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            อัปโหลดเอกสารใหม่
          </CornerButton>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">File</th>
                <th scope="col" className="px-6 py-4">วันที่อัปโหลด</th>
                <th scope="col" className="px-6 py-4 text-center">บท</th>
                <th scope="col" className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          PDF
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-400">
                            {doc.size} •{" "}
                            <span
                              className={`font-medium ${
                                doc.status === "Completed"
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{doc.uploadDate}</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">
                      {doc.chapter}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="ดูเอกสาร"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                          title="แก้ไข"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteId(doc.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          title="ลบ"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    ยังไม่มีเอกสารที่อัปโหลด
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
            View Full List
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        itemName={itemToDelete?.name}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
