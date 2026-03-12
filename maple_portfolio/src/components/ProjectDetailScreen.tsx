"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, Project } from "@/data/projects";

interface ProjectDetailScreenProps {
  project: Project;
  onBack: () => void;
  onHome: () => void;
}

const statusConfig: Record<Project["status"], { label: string; bg: string }> = {
  "Official Release": { label: "RELEASE",    bg: "#1C7FE0" },
  "Open Beta":        { label: "OPEN BETA",  bg: "#27AE60" },
  "Early Access":     { label: "EARLY ACCESS", bg: "#D97706" },
};

const levelColor = (level: number) => {
  if (level >= 200) return "#FF6B35";
  if (level >= 170) return "#FFD700";
  if (level >= 140) return "#34C759";
  return "#A78BFA";
};

export default function ProjectDetailScreen({ project, onBack, onHome }: ProjectDetailScreenProps) {
  const [current, setCurrent] = useState<Project>(project);
  const status = statusConfig[current.status];

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col" style={{ background: current.bgGradient }}>

      {/* 배경 광원 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 35% 40%, rgba(255,255,255,0.1) 0%, transparent 65%)"
      }} />

      {/* ── 메인 컨텐츠 ── */}
      <div className="relative flex flex-1 overflow-hidden">

        {/* ── 왼쪽: 텍스트 오버레이 + 큰 로고 ── */}
        <div className="relative flex-1 flex flex-col overflow-hidden">

          {/* 텍스트 영역 (상단 오버레이) */}
          <div className="relative z-10 px-8 pt-6 pb-4">
            {/* 배지 + 레벨 */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 rounded-sm text-[11px] font-black text-white tracking-widest"
                style={{ background: status.bg }}>
                {status.label}
              </span>
              <span className="text-sm font-black" style={{ color: levelColor(current.level) }}>
                Lv. {current.level}
              </span>
            </div>

            {/* 직업군 */}
            <p className="text-white/70 text-sm mb-1 font-medium">
              🖥 {current.jobClass}
            </p>

            {/* 타이틀 */}
            <h1 className="font-black leading-tight text-white mb-0.5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
              {current.title}
            </h1>
            <p className="text-white/75 text-base mb-5">{current.subtitle}</p>

            {/* 하이라이트 */}
            <div className="space-y-1.5 mb-5">
              {current.highlights.map((h, i) => (
                <p key={i} className="text-white/80 text-sm leading-relaxed">
                  {h}
                </p>
              ))}
            </div>

            {/* 스탯 테이블 */}
            <div className="rounded-sm overflow-hidden inline-block min-w-72" style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.15)"
            }}>
              {[
                { label: "직업군",   value: current.jobGroup },
                { label: "이동 방식", value: current.moveStyle },
                { label: "주요 스탯", value: current.mainStat },
              ].map((row, i) => (
                <div key={row.label} className="flex items-center"
                  style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.1)" : undefined }}>
                  <span className="text-white/50 text-xs px-4 py-2.5 w-24 shrink-0 font-medium">{row.label}</span>
                  <span className="text-white text-sm px-4 py-2.5 font-bold" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 큰 로고 (캐릭터 아트 위치) + 미리보기 박스 */}
          <div className="absolute bottom-4 left-8 flex items-end gap-4 z-10">
            {/* 미리보기 박스 (MapleStory 비디오 미리보기 자리) */}
            <div className="rounded overflow-hidden flex items-center justify-center"
              style={{ width: 200, height: 130, background: "#000", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/40 border-t-white/90 mx-auto mb-2"
                  style={{ animation: "spin 1.2s linear infinite" }} />
                <p className="text-white/40 text-[10px]">미리보기</p>
              </div>
            </div>
          </div>

          {/* 중앙 큰 로고 (캐릭터 일러스트 자리) */}
          <div className="absolute right-8 bottom-0 top-0 flex items-center justify-center pointer-events-none z-0">
            <div className="relative" style={{ width: 320, height: 320 }}>
              {/* 광원 효과 */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: current.color }} />
              <div className="relative w-full h-full">
                <Image src={current.cover} alt={current.title} fill
                  className="object-contain drop-shadow-2xl"
                  style={{ filter: `drop-shadow(0 0 40px ${current.color}88)` }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── 오른쪽: PROJECT SELECT 패널 ── */}
        <div className="w-64 shrink-0 flex flex-col" style={{
          background: "rgba(255,255,255,0.92)",
          borderLeft: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.2)"
        }}>
          {/* 헤더 */}
          <div className="flex items-center justify-between px-3 py-2.5" style={{
            background: "linear-gradient(180deg,#2E6CC8 0%,#1A4A99 100%)",
            borderBottom: "1px solid #0A3080"
          }}>
            <span className="text-white text-sm font-black tracking-wide">PROJECT SELECT</span>
            <div className="flex items-center gap-2">
              <button className="text-white/60 text-xs hover:text-white transition-colors">
                모두 보기 ▼
              </button>
              <button className="w-5 h-5 rounded text-white/60 hover:text-white text-xs font-bold transition-colors"
                style={{ background: "rgba(255,255,255,0.15)" }}>+</button>
            </div>
          </div>

          {/* 프로젝트 그리드 (2열) */}
          <div className="flex-1 p-2 grid grid-cols-2 gap-2 content-start overflow-y-auto">
            {projects.map(p => {
              const s = statusConfig[p.status];
              const isCurrent = current.id === p.id;
              return (
                <button key={p.id} onClick={() => setCurrent(p)}
                  className="relative rounded overflow-hidden flex flex-col transition-all duration-200 focus:outline-none"
                  style={{
                    background: isCurrent ? `linear-gradient(160deg,${p.color}22,${p.color}0A)` : "linear-gradient(180deg,#F5FAFE,#EAF2FF)",
                    border: `2px solid ${isCurrent ? p.color : "#C8DCF0"}`,
                    boxShadow: isCurrent ? `0 0 12px ${p.color}66, 0 4px 12px rgba(0,0,0,0.12)` : "0 1px 4px rgba(0,0,0,0.08)",
                    transform: isCurrent ? "scale(1.03)" : undefined,
                    aspectRatio: "1"
                  }}>
                  {/* 상태 배지 */}
                  <div className="absolute top-1 left-1 px-1.5 py-px rounded-sm text-[7px] font-black text-white z-10"
                    style={{ background: s.bg }}>
                    {s.label}
                  </div>
                  {/* 선택 중 표시 */}
                  {isCurrent && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#FFD700", boxShadow: "0 0 4px #FFD700" }} />
                  )}
                  {/* 로고 */}
                  <div className="flex-1 relative p-3 pt-5">
                    <Image src={p.cover} alt={p.title} fill className="object-contain p-2.5" />
                  </div>
                  {/* 이름 + 레벨 */}
                  <div className="px-1.5 pb-1.5 text-center">
                    <p className="text-gray-800 text-[10px] font-black leading-tight truncate">{p.title}</p>
                    <p className="text-[9px] font-bold" style={{ color: levelColor(p.level) }}>Lv.{p.level}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 하단 네비게이션 ── */}
      <div className="relative flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(0,0,0,0.55)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>

        <div className="flex items-center gap-5">
          <button onClick={onHome}
            className="flex items-center gap-1 text-white/70 text-xs font-bold hover:text-white transition-colors">
            ◀ 처음으로
          </button>
          <button onClick={onBack}
            className="flex items-center gap-1 text-white/70 text-xs font-bold hover:text-white transition-colors">
            ◀ 이전으로
          </button>
        </div>

        <div className="flex items-center gap-4">
          {current.links.blog && (
            <a href={current.links.blog} target="_blank" rel="noopener noreferrer"
              className="text-white/60 text-xs font-bold hover:text-white transition-colors">
              📝 개발 블로그
            </a>
          )}
          {current.links.repo && (
            <a href={current.links.repo} target="_blank" rel="noopener noreferrer"
              className="text-white/60 text-xs font-bold hover:text-white transition-colors">
              🐙 GitHub
            </a>
          )}
          {current.links.live ? (
            <a href={current.links.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-white text-sm font-black transition-all hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(180deg,#6EC8FF 0%,#1C7FE0 100%)",
                border: "1px solid #0B5CB8",
                boxShadow: "0 2px 8px rgba(30,111,224,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
                textShadow: "0 1px 2px rgba(0,0,0,0.35)"
              }}>
              캐릭터 생성 <span>›</span>
            </a>
          ) : (
            <button disabled
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-white/50 text-sm font-black cursor-not-allowed"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
              캐릭터 생성 <span>›</span>
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
