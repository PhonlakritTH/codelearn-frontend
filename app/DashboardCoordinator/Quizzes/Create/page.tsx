"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CornerButton from "../../Components/CornerButton";
import SaveSuccessModal from "../../Components/SaveSuccessModal";
import DeleteConfirmModal from "../../Components/DeleteConfirmModal";
import UploadDocModal from "../../Components/UploadDocModal";

interface QuizQuestion {
  no: number;
  question: string;
}

function CreateQuizForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");

  const [quizName, setQuizName] = useState(editId ? "บทที่ 2-1" : "");
  const [version, setVersion] = useState(editId ? 3 : 1);
  const [status, setStatus] = useState<"ร่าง" | "เผยแพร่" | "เก็บเข้าคลัง">(
    editId ? "ร่าง" : "ร่าง"
  );
  const [editNotes, setEditNotes] = useState(
    editId ? "เพิ่มโจทย์เกี่ยวกับการทำงานของลูปและการเขียนผังงาน" : ""
  );

  // Attached documents with checkboxes
  const [attachedDocs, setAttachedDocs] = useState([
    {
      id: "1",
      title: "นราธร บท 2 ภาษาคอมพิวเตอร์และการพัฒนาโปรแกรม",
      checked: true,
    },
    {
      id: "2",
      title: "สุดา การเขียน Flowchart",
      checked: false,
    },
  ]);

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { no: 1, question: "ตัวแปรประเภทจำนวนเต็มต้องประกาศด้วยคำไหน" },
    { no: 2, question: "float a=10.76; เป็นจำนวนเต็มไหม" },
  ]);

  const [deleteNo, setDeleteNo] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const toggleDoc = (id: string) => {
    setAttachedDocs(
      attachedDocs.map((doc) =>
        doc.id === id ? { ...doc, checked: !doc.checked } : doc
      )
    );
  };

  const handleUploadDoc = (file: File | null) => {
    if (file) {
      setAttachedDocs([
        ...attachedDocs,
        {
          id: Date.now().toString(),
          title: file.name.replace(/\.[^/.]+$/, ""),
          checked: true,
        },
      ]);
    }
  };

  const handleDeleteQuestion = () => {
    if (deleteNo !== null) {
      setQuestions(questions.filter((q) => q.no !== deleteNo));
      setDeleteNo(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Top Header Save Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {editId ? "แก้ไขแบบทดสอบ" : "เพิ่มแบบทดสอบ"}
        </h2>
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
          บันทึก
        </CornerButton>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-6">
        {/* Quiz Name */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-2">
            ชื่อแบบทดสอบ
          </label>
          <input
            type="text"
            required
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="เช่น บทที่ 2-1 การทำงานของเงื่อนไข"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        {/* Version & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              เวอร์ชัน
            </label>
            <input
              type="number"
              value={version}
              onChange={(e) => setVersion(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              สถานะ
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none bg-white cursor-pointer"
              >
                <option value="ร่าง">ร่าง</option>
                <option value="เผยแพร่">เผยแพร่</option>
                <option value="เก็บเข้าคลัง">เก็บเข้าคลัง</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Notes */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-2">
            รายละเอียดการแก้ไข
          </label>
          <textarea
            rows={4}
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="บันทึกรายละเอียดการปรับปรุงแบบทดสอบ..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        {/* Attached Documents matching Figma pdf-79 */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">เอกสารประกอบ</h3>
            <CornerButton
              href="/DashboardCoordinator/Quizzes/AIGenerate"
              variant="ai"
              className="text-xs px-4 py-2"
              icon={<span>✨</span>}
              iconPosition="left"
            >
              เพิ่มโจทย์โดยใช้ Ai +
            </CornerButton>
          </div>

          <div className="space-y-3 mb-4">
            {attachedDocs.map((doc) => (
              <label
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition cursor-pointer ${
                  doc.checked
                    ? "border-blue-500 bg-blue-50/20 text-gray-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={doc.checked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">{doc.title}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end">
            <CornerButton
              variant="primary"
              onClick={() => setShowUploadModal(true)}
              className="text-xs px-4 py-2"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              }
              iconPosition="left"
            >
              เพิ่มเอกสาร
            </CornerButton>
          </div>
        </div>

        {/* Quiz Questions List matching Figma pdf-79 */}
        <div className="pt-4">
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
            <div className="p-4 bg-gray-50/70 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base">แบบทดสอบ</h3>
              <CornerButton
                href="/DashboardCoordinator/Quizzes/CreateQuestion"
                variant="primary"
                className="text-xs px-4 py-2"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                เพิ่มโจทย์
              </CornerButton>
            </div>

            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-[#FAFBFD] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 w-16 text-center">ข้อ</th>
                  <th scope="col" className="px-6 py-3">โจทย์</th>
                  <th scope="col" className="px-6 py-3 text-center w-28">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {questions.map((q) => (
                  <tr key={q.no} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4 text-center font-bold text-gray-700">
                      {q.no}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {q.question}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <CornerButton
                          href={`/DashboardCoordinator/Quizzes/CreateQuestion?qNo=${q.no}`}
                          variant="ghost"
                          className="p-1.5 text-blue-600"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </CornerButton>
                        <button
                          onClick={() => setDeleteNo(q.no)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          title="ลบข้อ"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UploadDocModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onConfirm={handleUploadDoc}
      />

      <DeleteConfirmModal
        isOpen={deleteNo !== null}
        title="ลบโจทย์แบบทดสอบ"
        itemName={`ข้อที่ ${deleteNo}`}
        onConfirm={handleDeleteQuestion}
        onCancel={() => setDeleteNo(null)}
      />

      <SaveSuccessModal
        isOpen={showSuccessModal}
        title="บันทึกแบบทดสอบสำเร็จ"
        message="แบบทดสอบและโจทย์คำถามได้รับการบันทึกเข้าสู่ระบบเรียบร้อยแล้ว"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/DashboardCoordinator/Quizzes");
        }}
      />
    </div>
  );
}

export default function CreateQuizPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <CreateQuizForm />
    </Suspense>
  );
}
