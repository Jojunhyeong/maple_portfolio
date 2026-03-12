"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";

interface ProjectDetailScreenProps {
  project: Project;
  onBack: () => void;
  onHome: () => void;
}

const statusConfig = {
  "Official Release": { label: "RELEASE", bg: "#1d4ed8", text: "#fff" },
  "Open Beta": { label: "OPEN BETA", bg: "#059669", text: "#fff" },
  "Early Access": { label: "EARLY ACCESS", bg: "#d97706", text: "#fff" },
};

const levelColor = (level: number) => {
  if (level >= 200) return "#FF6B35";
  if (level >= 170) return "#FFD700";
  if (level >= 140) return "#4ADE80";
  return "#A78BFA";
};

const formatPower = (power: number) =>
  power.toLocaleString("ko-KR");

export default function ProjectDetailScreen({
  project,
  onBack,
  onHome,
}: ProjectDetailScreenProps) {
  const [current, setCurrent] = useState<Project>(project);
  const status = statusConfig[current.status];

  const allTech = Object.values(current.tech).flat();

  return (
    <div
      className="relative h-screen w-full overflow-hidden flex flex-col"
      style={{ background: current.bgGradient }}
    >
      {/* 배경 오버레이 패턴 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ─── 메인 콘텐츠 ─── */}
      <div className="relative flex flex-1 overflow-hidden">

        {/* ── 왼쪽: 프로젝트 아트 (캐릭터 일러스트 자리) ── */}
        <div className="relative w-[38%] flex items-center justify-center overflow-hidden">
          {/* 배경 광원 효과 */}
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-30"
            style={{ background: current.color }}
          />
          {/* 프로젝트 아이콘 (캐릭터 아트 대체) */}
          <div className="relative flex flex-col items-center gap-4">
            <div
              className="w-48 h-48 rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
            >
              <span className="text-9xl select-none">{current.icon}</span>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs tracking-widest uppercase">version</p>
              <p className="text-white font-black text-lg tracking-wider">{current.version}</p>
            </div>
          </div>
        </div>

        {/* ── 가운데: 프로젝트 정보 ── */}
        <div className="flex-1 flex flex-col justify-center py-6 pr-4 overflow-y-auto">

          {/* 상태 배지 + 레벨 */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-3 py-1 rounded text-xs font-black tracking-widest"
              style={{ background: status.bg, color: status.text }}
            >
              {status.label}
            </span>
            <span
              className="text-sm font-black"
              style={{ color: levelColor(current.level) }}
            >
              Lv. {current.level}
            </span>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-white/60 text-xs">전투력 {formatPower(current.power)}</span>
          </div>

          {/* 직업 라벨 */}
          <p className="text-white/70 text-sm mb-1 flex items-center gap-1.5">
            <span className="text-base">{current.icon}</span>
            {current.jobClass}
          </p>

          {/* 프로젝트 타이틀 */}
          <h1
            className="font-black mb-1 leading-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#fff",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {current.title}
          </h1>
          <p className="text-white/70 text-base mb-4">{current.subtitle}</p>

          {/* 하이라이트 */}
          <div className="space-y-1.5 mb-5">
            {current.highlights.map((h, i) => (
              <p key={i} className="text-white/80 text-sm leading-relaxed">
                {h}
              </p>
            ))}
          </div>

          {/* 스탯 테이블 (직업군/이동방식/주요스탯) */}
          <div
            className="rounded-xl border border-white/20 overflow-hidden mb-5"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <StatRow label="직업군" value={current.jobGroup} />
            <StatRow label="이동 방식" value={current.moveStyle} divider />
            <StatRow label="주요 스탯" value={current.mainStat} divider />
          </div>

          {/* 기술 스택 태그들 */}
          <div className="flex flex-wrap gap-1.5">
            {allTech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs font-semibold border border-white/30 text-white/90"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── 오른쪽: 프로젝트 선택 그리드 (CLASS SELECT) ── */}
        <div
          className="w-64 shrink-0 border-l border-white/10 flex flex-col"
          style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-white font-black text-sm tracking-wider">PROJECT SELECT</span>
            <button className="text-white/40 text-xs hover:text-white/70 transition-colors">
              모두 보기 ▼
            </button>
          </div>

          {/* 프로젝트 그리드 (2열) */}
          <div className="flex-1 p-3 grid grid-cols-2 gap-2 content-start overflow-y-auto">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setCurrent(p)}
                className={`relative rounded-lg overflow-hidden aspect-square flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
                  current.id === p.id
                    ? "border-white scale-105 shadow-lg"
                    : "border-white/20 hover:border-white/50 hover:scale-102 opacity-70 hover:opacity-100"
                }`}
                style={{ background: p.bgGradient }}
              >
                {/* 선택 표시 */}
                {current.id === p.id && (
                  <div
                    className="absolute top-1 left-1 text-[9px] font-black px-1 rounded"
                    style={{ background: statusConfig[p.status].bg }}
                  >
                    {statusConfig[p.status].label}
                  </div>
                )}
                <span className="text-3xl">{p.icon}</span>
                <span className="text-white text-[10px] font-bold text-center leading-tight px-1 truncate w-full text-center">
                  {p.title}
                </span>
                <span
                  className="text-[9px] font-bold"
                  style={{ color: levelColor(p.level) }}
                >
                  Lv.{p.level}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 하단 네비게이션 ─── */}
      <div
        className="relative flex items-center justify-between px-6 py-3 border-t border-white/10"
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors font-bold"
          >
            ◀◀ 처음으로
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors font-bold"
          >
            ◀ 이전으로
          </button>
        </div>

        <div className="flex gap-3">
          {current.links.blog && (
            <a
              href={current.links.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors font-bold"
            >
              📝 개발 블로그
            </a>
          )}
          {current.links.repo && (
            <a
              href={current.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors font-bold"
            >
              🐙 GitHub
            </a>
          )}
          {current.links.live && (
            <a
              href={current.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-white text-sm font-black transition-all hover:scale-105 shadow-lg"
              style={{
                background: current.color,
                boxShadow: `0 4px 20px ${current.color}66`,
              }}
            >
              게임 시작 &gt;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  divider,
}: {
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 px-4 py-2.5 ${divider ? "border-t border-white/10" : ""}`}>
      <span className="text-white/50 text-xs w-20 shrink-0">{label}</span>
      <span className="text-white text-sm font-bold">{value}</span>
    </div>
  );
}
