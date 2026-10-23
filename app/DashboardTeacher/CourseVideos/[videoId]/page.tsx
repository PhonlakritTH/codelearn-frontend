"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Subtitles,
  Pipette,
  Clock,
  Sparkles,
  Download,
  Edit,
  ArrowLeft,
  Tv,
  CheckCircle,
} from "lucide-react";
import CornerButton from "../../Components/CornerButton";

export default function VideoPlayerPage() {
  const params = useParams();
  const videoId = (params?.videoId as string) || "1";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(166); // 2:46
  const totalDuration = 920; // 15:20

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/DashboardTeacher/CourseVideos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>กลับไปหน้ารายการวิดีโอ</span>
        </Link>
      </div>

      {/* Video Player Container matching Screenshot 135917 */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-[#090D16] shadow-xl border border-slate-800 select-none">
        {/* Mock Code Preview Background */}
        <div className="absolute inset-0 p-8 font-mono text-xs text-slate-500/60 leading-relaxed overflow-hidden pointer-events-none">
          <div className="text-emerald-400/70 font-semibold mb-2">#include &lt;stdio.h&gt;</div>
          <div className="text-emerald-400/70 font-semibold mb-3">#include &lt;stdbool.h&gt;</div>
          <div className="text-blue-300/60">void evaluate_branch(int register_state, int atp_rate) &#123;</div>
          <div className="pl-6 text-slate-400/50">// CodeLearn CPU & Branch Prediction Simulator</div>
          <div className="pl-6 text-indigo-300/70">if (register_state &gt; 0x4F &amp;&amp; atp_rate &gt; 120) &#123;</div>
          <div className="pl-12 text-amber-300/70">asm volatile (&quot;movq %0, %%rax&quot; : : &quot;r&quot;(atp_rate));</div>
          <div className="pl-12 text-slate-300/60">printf(&quot;[PIPELINE OPTIMIZED]: Branch predicted successfully\n&quot;);</div>
          <div className="pl-6">&#125;</div>
          <div>&#125;</div>
        </div>

        {/* Top-Left CodeLearn Watermark */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          <span>CodeLearn</span>
        </div>

        {/* Big Center Play/Pause Overlay */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-lg">
            {isPlaying ? (
              <Pause size={38} className="fill-white" />
            ) : (
              <Play size={38} className="fill-white translate-x-1" />
            )}
          </div>
        </button>

        {/* Video Thumbnail Hover Indicator (Floating Tooltip) */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 hidden group-hover:flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-2 text-white shadow-2xl backdrop-blur-md">
          <div className="flex h-9 w-14 items-center justify-center rounded bg-slate-800 font-mono text-xs font-bold text-blue-400">
            02:46
          </div>
          <div>
            <div className="text-xs font-bold text-white">Registers &amp; Logic Circuits</div>
            <div className="text-[10px] text-gray-400">Day 1 • ||||||||||</div>
          </div>
        </div>

        {/* Bottom Control Bar matching design */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300">
          {/* Progress / Scrub Bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(clickPos * totalDuration);
            }}
            className="group/scrub relative mb-3 flex h-1.5 w-full cursor-pointer items-center rounded-full bg-white/20 transition-all hover:h-2.5"
          >
            {/* Played Bar */}
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Scrubber Knob */}
            <div
              className="absolute h-3.5 w-3.5 rounded-full bg-white shadow-md transition-transform"
              style={{ left: `calc(${progressPercent}% - 7px)` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-blue-400 transition"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-white" />}
              </button>

              <button
                type="button"
                onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                className="hover:text-blue-400 transition"
                title="ย้อนหลัง 10 วินาที"
              >
                <RotateCcw size={18} />
              </button>

              <button
                type="button"
                onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 10))}
                className="hover:text-blue-400 transition"
                title="ข้ามไปข้างหน้า 10 วินาที"
              >
                <RotateCw size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-blue-400 transition"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <span className="font-mono text-xs text-slate-300">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <button type="button" className="hover:text-white transition" title="Picture-in-picture">
                <Tv size={18} />
              </button>
              <button type="button" className="rounded border border-slate-600 px-1.5 py-0.5 text-[10px] font-bold text-white hover:border-white">
                CC
              </button>
              <button type="button" className="hover:text-white transition" title="Settings">
                <Settings size={18} />
              </button>
              <button type="button" className="hover:text-white transition" title="Fullscreen">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card matching Screenshot 135917 */}
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-xs space-y-6">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB]">
            บทที่ 4: Logic &amp; Architecture
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={14} className="text-gray-400" />
            <span>ความยาว 15:20 นาที</span>
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>2 วันที่แล้ว</span>
          </span>

          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
            1080p 60fps
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#14213F]">
            บทที่ 1 ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#475569]">
            เรียนรู้ความรู้เบื้องต้นเกี่ยวกับคอมพิวเตอร์ เข้าใจองค์ประกอบ
            และหลักการทำงานของระบบคอมพิวเตอร์ทั้งฮาร์ดแวร์ ซอฟต์แวร์ หน่วยประมวลผล
            หน่วยความจำ และการจัดการข้อมูล เพื่อให้สามารถใช้งานคอมพิวเตอร์ได้อย่างถูกต้อง
            มีประสิทธิภาพ และเหมาะสมกับการทำงานในชีวิตประจำวัน
          </p>
        </div>

        {/* Teacher Action Row with CornerButtons */}
        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-6">
          <CornerButton
            variant="primary"
            icon={<Download size={18} />}
            iconPosition="left"
          >
            ดาวน์โหลดเอกสารประกอบการสอน (.PDF)
          </CornerButton>

          <CornerButton
            variant="outline"
            icon={<Edit size={16} />}
            iconPosition="left"
          >
            แก้ไขรายละเอียดวิดีโอ
          </CornerButton>
        </div>
      </div>
    </div>
  );
}
