"use client";

import { useEffect, useState } from "react";

interface LandingScreenProps {
  onComplete: () => void;
}

export default function LandingScreen({ onComplete }: LandingScreenProps) {
  const [phase, setPhase] = useState<"enter" | "loading" | "exit">("enter");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 로고 페이드인 후 로딩 시작
    const enterTimer = setTimeout(() => {
      setPhase("loading");
    }, 600);

    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    // 로딩바 진행
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      // easeOut 커브 적용
      const t = current / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(eased * 100, 100));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 700);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 로고 영역 */}
      <div
        className={`flex items-center gap-5 transition-all duration-700 ${
          phase === "enter"
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
        }`}
      >
        {/* 프로그래머 아이콘 (Nexon 큐브 스타일의 이소메트릭 코드 아이콘) */}
        <ProgrammerIcon />

        {/* 이름 */}
        <span
          className="text-[3.2rem] font-black tracking-widest text-[#1a1a1a] select-none"
          style={{ fontFamily: "Arial Black, Arial, sans-serif", letterSpacing: "0.15em" }}
        >
          조준형
        </span>
      </div>

      {/* 직함 */}
      <div
        className={`mt-4 transition-all duration-700 delay-200 ${
          phase === "enter" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="text-sm font-medium tracking-[0.4em] text-[#888] uppercase">
          Frontend Developer
        </span>
      </div>

      {/* 로딩바 */}
      <div className="absolute bottom-12 w-64">
        <div className="h-[3px] w-full bg-[#e8e8e8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1a1a1a] rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-center text-[11px] tracking-widest text-[#aaa] uppercase">
          {progress < 100 ? "Loading..." : "Complete"}
        </p>
      </div>

      {/* 하단 저작권 */}
      <div className="absolute bottom-5 text-[10px] text-[#ccc] tracking-widest">
        ©2025 JO JUNHYEONG. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}

function ProgrammerIcon() {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 이소메트릭 큐브 - Nexon 스타일 참고, 프로그래머 느낌의 색상 */}
      {/* 상단 면 (밝은 파란색) */}
      <polygon
        points="34,4 62,20 34,36 6,20"
        fill="#4A90D9"
      />
      {/* 왼쪽 면 (진한 네이비) */}
      <polygon
        points="6,20 34,36 34,64 6,48"
        fill="#1E3A5F"
      />
      {/* 오른쪽 면 (중간 파란색) */}
      <polygon
        points="34,36 62,20 62,48 34,64"
        fill="#2D6BB5"
      />
      {/* 큐브 위에 코드 심볼 */}
      <text
        x="34"
        y="26"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        fill="white"
        fontFamily="monospace"
        opacity="0.9"
      >
        {"</>"}
      </text>
    </svg>
  );
}
