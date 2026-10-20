"use client";

import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";

type Props = {
  src: StaticImageData;
  alt: string;
  maxTilt?: number; // องศาที่เอียงได้สูงสุด
};

export default function TiltImage({ src, alt, maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;  // 0 → 1

    const rotateY = (x - 0.5) * 2 * maxTilt;   // ซ้าย-ขวา
    const rotateX = -(y - 0.5) * 2 * maxTilt;  // บน-ล่าง

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.1s ease-out",
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.25 });
  };

  const handleLeave = () => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s ease-out",
    });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div style={{ perspective: "1200px" }} className="flex items-center justify-center">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ ...style, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          priority
          unoptimized
          className="h-auto w-[1200px] max-w-none object-contain drop-shadow-[0_30px_50px_rgba(49,91,255,0.2)]"
        />
        {/* แสงสะท้อนวิ่งตามเมาส์ */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8), transparent 50%)`,
          }}
        />
      </div>
    </div>
  );
}