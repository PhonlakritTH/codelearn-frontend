"use client";

import { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Eye,
  Send,
  Check,
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  FileSearch,
} from "lucide-react";
import CornerButton from "../../../../Components/CornerButton";

const quizQuestions = [
  {
    number: "ข้อ 1",
    question: "ตัวแปรประเภทจำนวนเต็มต้องประกาศด้วยคำไหน",
    choices: [
      { id: "float", label: "float" },
      { id: "char", label: "char" },
      { id: "int", label: "int" },
    ],
    selectedAnswer: "int",
    isCorrect: true,
  },
  {
    number: "ข้อ 2",
    question: "ตัวแปรประเภทจำนวนทศนิยมต้องประกาศด้วยคำไหน",
    choices: [
      { id: "float", label: "float" },
      { id: "char", label: "char" },
      { id: "int", label: "int" },
    ],
    selectedAnswer: "float",
    isCorrect: true,
  },
];

const titlesBySlug: Record<string, string> = {
  "lab-1": "ใบงานที่ 1 ทดลองการเขียนอัลกอริทึม ด้วย Flowgorithm",
  "lab-2": "ใบงานที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
  "lab-3": "ใบงานที่ 3 ทดลองการใช้งานภาษาซี",
  "lab-4": "บทที่ 4 โครงสร้างภาษา C เบื้องต้น",
  "quiz-1": "Quiz ที่ 1 ทดลองเขียนอัลกอริทึมด้วย Flowgorithm",
  "quiz-2": "Quiz ที่ 2 ทดลองการใช้งานโปรแกรม Flowgorithm",
  "quiz-3": "Quiz ที่ 3 ทดลองการใช้งานภาษาซี",
  "quiz-4": "Quiz ที่ 4 ชนิดข้อมูลและตัวดำเนินการ",
};

function StudentGradingViewContent() {
  const params = useParams();
  const router = useRouter();

  const labId = (params?.labId as string) || "lab-1";
  const studentId = (params?.studentId as string) || "student-1";

  const isQuiz = labId.startsWith("quiz");
  const isPendingStudent = studentId === "student-4";
  const isCodeLab = labId === "lab-4" || labId === "lab-3";

  const pageTitle = titlesBySlug[labId] || "ใบงานที่ 1 ทดลองการเขียนอัลกอริทึม ด้วย Flowgorithm";

  // Form states
  const [score, setScore] = useState(isPendingStudent ? "" : "10/10");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedSuccess, setCompletedSuccess] = useState(false);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentList([...commentList, comment.trim()]);
    setComment("");
  };

  const handleCompleteGrading = () => {
    setCompletedSuccess(true);
    setTimeout(() => {
      router.push(`/DashboardTeacher/Classrooms/Submissions/${labId}`);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Back button */}
      <div>
        <Link
          href={`/DashboardTeacher/Classrooms/Submissions/${labId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>กลับไปหน้ารายชื่อนักศึกษา</span>
        </Link>
      </div>

      {/* Header matching pdf-53 / pdf-55 / pdf-59 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
          {pageTitle}
        </h1>
        <p className="mt-1 text-sm text-gray-500">Check work submission</p>
      </div>

      {completedSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700 animate-fade-in">
          ✓ บันทึกคะแนนและตรวจงานเรียบร้อยแล้ว กำลังนำท่านกลับสู่หน้ารายการ...
        </div>
      )}

      {/* Main Review Box matching Figma */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
        {/* Card Header: รายชื่อนักศึกษา */}
        <div className="border-b border-gray-100 bg-[#F8FAFC]/50 px-6 py-4">
          <h2 className="text-base font-bold text-[#14213F]">
            รายชื่อนักศึกษา
          </h2>
        </div>

        {/* Student Meta Row */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <div className="font-mono text-xs font-semibold text-gray-500">
              1167304620228
            </div>
            <div className="text-sm font-bold text-[#14213F]">
              {isPendingStudent ? "Emily Parker" : "โชคอนันต์ อันโน"}
            </div>
          </div>

          <div>
            {!isPendingStudent ? (
              <span className="rounded-full bg-[#E6F4EA] px-3.5 py-1 text-xs font-semibold text-[#137333]">
                ส่งแล้ว
              </span>
            ) : (
              <span className="rounded-full bg-[#FCE8E6] px-3.5 py-1 text-xs font-semibold text-[#C5221F]">
                ยังไม่ส่ง
              </span>
            )}
          </div>
        </div>

        {/* Content Viewer Area */}
        <div className="min-h-[380px] p-6">
          {/* Case 1: Empty state (Student has not submitted) - matching pdf-56 */}
          {isPendingStudent ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-gray-300 mb-4">
                <FileSearch size={44} />
              </div>
              <h3 className="text-lg font-bold text-gray-400">
                ไม่พบใบงาน
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                นักศึกษายังไม่ได้ทำการส่งงานชิ้นนี้
              </p>
            </div>
          ) : isQuiz ? (
            /* Case 2: Quiz Reviewer - matching pdf-59 & pdf-60 */
            <div className="flex justify-center py-4">
              <div className="w-full max-w-2xl rounded-2xl border-l-4 border-l-[#2563EB] border border-gray-200 bg-white p-6 shadow-xs">
                {/* Header row: Question badge & Correctness badge */}
                <div className="flex items-center justify-between pb-4">
                  <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                    {quizQuestions[currentQuestionIndex].number}
                  </span>
                  <span className="rounded-full bg-[#E6F4EA] px-3 py-1 text-xs font-semibold text-[#137333]">
                    ถูกต้อง
                  </span>
                </div>

                {/* Question Title */}
                <h3 className="mt-2 text-base font-bold text-[#14213F]">
                  {quizQuestions[currentQuestionIndex].question}
                </h3>

                {/* Options (Radio items matching Figma) */}
                <div className="mt-5 space-y-3">
                  {quizQuestions[currentQuestionIndex].choices.map((choice) => {
                    const isSelected =
                      choice.id === quizQuestions[currentQuestionIndex].selectedAnswer;

                    return (
                      <div
                        key={choice.id}
                        className={`flex items-center gap-3 rounded-xl border p-3.5 transition ${
                          isSelected
                            ? "border-blue-500 bg-blue-50/20"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-[#2563EB] bg-[#2563EB]"
                              : "border-gray-400 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="font-mono text-sm text-gray-800">
                          {choice.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Question Stepper Buttons */}
                <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                  {currentQuestionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(0)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      <ChevronLeft size={14} />
                      <span>ข้อก่อนหน้า</span>
                    </button>
                  )}

                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(1)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      <span>ข้อถัดไป</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(0)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      <span>ดูข้อ 1</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : isCodeLab ? (
            /* Case 3: Code Viewer - matching pdf-55 */
            <div className="rounded-2xl border border-gray-200 bg-[#FAFBFD] p-6 font-mono text-sm leading-relaxed text-[#14213F]">
              <div className="text-emerald-600 font-semibold mb-2">#include &lt;stdio.h&gt;</div>
              <div className="text-blue-700 font-semibold mb-1">int main() &#123;</div>
              <div className="pl-6 text-purple-700">int <span className="text-gray-800">money</span> = <span className="text-amber-600 font-bold">85</span>;</div>
              <div className="pl-6 text-slate-800">printf(<span className="text-emerald-700">&quot;I have Money %d: &quot;</span>,money);</div>
              <div className="text-blue-700 font-semibold mt-1">&#125;</div>
            </div>
          ) : (
            /* Case 4: PDF Viewer - matching pdf-53 */
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#14213F]">
                      Variable_2024.pdf
                    </div>
                    <div className="text-xs text-gray-400">
                      2.1 MB • Queued
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                  title="ดูตัวอย่างเอกสาร"
                >
                  <Eye size={20} />
                </button>
              </div>

              {/* PDF Preview Page container */}
              <div className="rounded-2xl border border-gray-200 bg-slate-50 p-8 text-center text-gray-400 min-h-[260px] flex flex-col items-center justify-center">
                <FileText size={48} className="text-gray-300 mb-2" />
                <span className="text-xs font-medium text-gray-500">
                  Preview Variable_2024.pdf (Flowgorithm Assignment Solution)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments List if added */}
      {commentList.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase">
            ความคิดเห็นที่ส่งแล้ว ({commentList.length})
          </div>
          {commentList.map((c, i) => (
            <div
              key={i}
              className="rounded-xl bg-blue-50/60 p-3 text-xs text-gray-800"
            >
              💬 {c}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Grading Row matching pdf-53, pdf-55, pdf-59 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pt-2">
        {/* Left Inputs: Score and Comment */}
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end">
          {/* Score Input */}
          <div className="w-full sm:w-44">
            <label className="block text-xs font-bold text-[#14213F] uppercase mb-1">
              คะแนน
            </label>
            <div className="relative">
              <Star
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="ให้คะแนน 10/10"
                className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm font-semibold text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Comment Input + Send Button */}
          <form
            onSubmit={handleSendComment}
            className="flex flex-1 items-end gap-2"
          >
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#14213F] uppercase mb-1">
                คอมเมนต์งาน
              </label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
                className="w-full rounded-xl border border-gray-200 py-2.5 px-4 text-sm text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white transition hover:bg-[#1D4ED8]"
              title="ส่งคอมเมนต์"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Right CornerButton: ตรวจเสร็จสิ้น ✓ */}
        <div className="shrink-0">
          <CornerButton
            onClick={handleCompleteGrading}
            variant="primary"
            className="px-6 py-2.5"
            icon={<Check size={18} />}
            iconPosition="right"
          >
            ตรวจเสร็จสิ้น
          </CornerButton>
        </div>
      </div>
    </div>
  );
}

export default function StudentGradingViewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
      <StudentGradingViewContent />
    </Suspense>
  );
}

