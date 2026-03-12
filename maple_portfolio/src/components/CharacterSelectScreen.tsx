"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, Project } from "@/data/projects";

interface CharacterSelectScreenProps {
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

const PROJECTS_PER_PAGE = 6;

const levelColor = (level: number) => {
  if (level >= 200) return "#FF6B35";
  if (level >= 170) return "#FFD700";
  if (level >= 140) return "#34C759";
  return "#A78BFA";
};

const formatPower = (power: number) =>
  power >= 10000 ? `${Math.floor(power / 10000)}만 ${(power % 10000).toLocaleString()}` : power.toLocaleString();


export default function CharacterSelectScreen({ onBack, onSelectProject }: CharacterSelectScreenProps) {
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const pageProjects = projects.slice(page * PROJECTS_PER_PAGE, (page + 1) * PROJECTS_PER_PAGE);
  const topRow    = pageProjects.slice(0, 3);
  const bottomRow = pageProjects.slice(3, 6);

  return (
    <div className="relative h-screen w-full overflow-hidden select-none">

      {/* ── 배경: 하늘 + 빛줄기 + 언덕 ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #5DADE2 0%, #85C1E9 25%, #AED6F1 50%, #D6EAF8 62%, #7DCEA0 62%, #52BE80 72%, #27AE60 82%, #1E8449 100%)"
      }} />
      {/* 햇빛 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(255,245,180,0.45) 0%, transparent 70%)"
      }} />
      {/* 원거리 언덕 (밝은) */}
      <div className="absolute pointer-events-none" style={{
        bottom: "37%", left: 0, right: 0, height: "12%",
        background: "linear-gradient(180deg, #A9DFBF 0%, #82E0AA 100%)",
        clipPath: "ellipse(60% 100% at 30% 100%)",
        opacity: 0.5
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: "37%", left: 0, right: 0, height: "10%",
        background: "linear-gradient(180deg, #A9DFBF 0%, #82E0AA 100%)",
        clipPath: "ellipse(55% 100% at 75% 100%)",
        opacity: 0.4
      }} />
      {/* 구름들 */}
      <Cloud x={5}  y={7}  w={120} />
      <Cloud x={28} y={4}  w={90}  />
      <Cloud x={52} y={9}  w={110} />
      <Cloud x={74} y={5}  w={100} />

      {/* ── 상단 이벤트 배너 ── */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {[
          { text: "1+4 레벨업! 하이퍼버닝 MAX 지정", bg: "linear-gradient(135deg,#F39C12,#E67E22)" },
          { text: "신규 프로젝트 추가 예정!",           bg: "linear-gradient(135deg,#27AE60,#1E8449)" },
        ].map(b => (
          <div key={b.text} className="rounded-full px-5 py-1.5 text-white text-xs font-black shadow-lg"
            style={{ background: b.bg, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
            {b.text}
          </div>
        ))}
      </div>

      {/* ── 메인 레이아웃 ── */}
      <div className="absolute inset-0 flex pt-12 pb-11 px-4 gap-4">

        {/* ── 왼쪽: 플랫폼 + 캐릭터 ── */}
        <div className="flex-1 flex flex-col justify-center gap-6 relative">

          {/* 큰 나무 기둥 (CSS) */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0" style={{ top: "8%", bottom: "18%" }}>
            <div className="w-12 h-full mx-auto rounded-sm" style={{
              background: "linear-gradient(90deg, #5D3A1A 0%, #7B4F2A 40%, #6B4020 70%, #4A2C10 100%)",
              boxShadow: "inset -4px 0 8px rgba(0,0,0,0.3)"
            }} />
          </div>

          {/* 플랫폼 행 */}
          <PlatformRow projects={topRow}    selected={selected} onSelect={setSelected} levelColor={levelColor} />
          <PlatformRow projects={bottomRow} selected={selected} onSelect={setSelected} levelColor={levelColor} />

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 z-10">
              <NavBtn onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>◀</NavBtn>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  className={`w-7 h-7 rounded-full text-xs font-black transition-all ${
                    i === page ? "text-black scale-110 shadow" : "text-white hover:scale-105"
                  }`}
                  style={{ background: i === page ? "#FFD700" : "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  {i + 1}
                </button>
              ))}
              <NavBtn onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>▶</NavBtn>
            </div>
          )}
        </div>

        {/* ── 오른쪽: 선택 프로젝트 정보 패널 ── */}
        <div className="w-52 shrink-0 self-center rounded overflow-hidden" style={{
          background: "linear-gradient(180deg, #EAF4FF 0%, #FFFFFF 12%)",
          border: "1px solid #8BB8E8",
          boxShadow: "0 8px 32px rgba(0,50,130,0.35), inset 0 1px 0 rgba(255,255,255,0.9)"
        }}>
          {/* 헤더 */}
          <div className="px-3 py-2 flex items-center gap-1.5" style={{
            background: "linear-gradient(180deg,#2E6CC8 0%,#1A4A99 100%)",
            borderBottom: "1px solid #0A3080"
          }}>
            <span className="text-yellow-300 text-sm">★</span>
            <span className="text-white text-sm font-black">Lv. {selected.level}</span>
          </div>

          {/* 로고 + 이름 */}
          <div className="flex flex-col items-center px-3 pt-3 pb-2">
            {/* 로고 이미지 */}
            <div className="relative w-20 h-20 mb-2 rounded overflow-hidden" style={{
              background: "linear-gradient(135deg,#EAF4FF,#D0E8FF)",
              border: "1px solid #8BB8E8"
            }}>
              <Image src={selected.cover} alt={selected.title} fill className="object-contain p-1.5" />
            </div>
            <p className="text-gray-900 font-black text-base text-center">{selected.title}</p>
            <p className="text-blue-500 text-[11px] flex items-center gap-1 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: selected.color }} />
              {selected.jobClass}
            </p>
          </div>

          <div className="mx-3" style={{ height: 1, background: "#D0E4F8" }} />

          {/* 전투력 */}
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-gray-400 text-xs">전투력</span>
            <span className="text-orange-500 font-black text-xs">{formatPower(selected.power)}</span>
          </div>

          <div className="mx-3" style={{ height: 1, background: "#D0E4F8" }} />

          {/* 기간 */}
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-gray-400 text-xs">기간</span>
            <span className="text-gray-700 font-bold text-xs">{selected.moveStyle}</span>
          </div>

          <div className="mx-3" style={{ height: 1, background: "#D0E4F8" }} />

          {/* 서버 */}
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-gray-400 text-xs">서버</span>
            <span className="text-blue-600 font-bold text-xs">조준형 월드</span>
          </div>

          {/* 버튼들 */}
          <div className="px-3 pb-3 pt-2 flex flex-col gap-2">
            <button onClick={() => onSelectProject(selected)}
              className="w-full py-2.5 rounded-full text-white text-xs font-black tracking-wide transition-all hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(180deg,#6EC8FF 0%,#1C7FE0 100%)",
                border: "1px solid #0B5CB8",
                boxShadow: "0 2px 6px rgba(30,111,224,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)"
              }}>
              게임 시작
            </button>
            {selected.links.repo && (
              <a href={selected.links.repo} target="_blank" rel="noopener noreferrer"
                className="w-full py-2 rounded-full text-xs font-bold text-center text-gray-600 hover:bg-gray-100 transition-colors"
                style={{ border: "1px solid #C0D4E8" }}>
                🐙 GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── 하단 네비게이션 ── */}
      <div className="absolute bottom-0 left-0 right-0 h-11 flex items-center justify-between px-4"
        style={{ background: "rgba(0,0,0,0.6)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/80 text-xs font-bold hover:text-white transition-colors">
          ◀ 이전으로
        </button>
        <div className="flex gap-4">
          {["⚙️ 캐릭터 관리", "🌍 월드 리프", "+ 새 프로젝트"].map(t => (
            <span key={t} className="text-white/30 text-xs cursor-not-allowed">{t}</span>
          ))}
        </div>
        <span className="text-white/20 text-[10px] tracking-widest">Ver. 1.2.4.12.3</span>
      </div>
    </div>
  );
}

/* ── 플랫폼 행 ── */
function PlatformRow({ projects, selected, onSelect, levelColor }: {
  projects: Project[]; selected: Project;
  onSelect: (p: Project) => void; levelColor: (n: number) => string;
}) {
  return (
    <div className="relative z-10 px-4">
      {/* 캐릭터들 */}
      <div className="flex justify-center gap-8 pb-1 items-end">
        {projects.map(p => {
          const isSelected = selected.id === p.id;
          return (
            <button key={p.id} onClick={() => onSelect(p)}
              className="flex flex-col items-center gap-1 focus:outline-none group">
              {/* 선택 화살표 */}
              <div className={`transition-all text-base ${isSelected ? "opacity-100 animate-bounce" : "opacity-0"}`}
                style={{ color: "#FFD700", textShadow: "0 0 8px #FFD700" }}>▼</div>
              {/* 로고 카드 */}
              <div className="relative w-20 h-24 rounded overflow-hidden transition-all duration-200"
                style={{
                  background: isSelected
                    ? `linear-gradient(160deg, ${p.color}22, ${p.color}0A)`
                    : "linear-gradient(160deg,#EAF4FF,#FFFFFF)",
                  border: `2px solid ${isSelected ? p.color : "#C8DCF0"}`,
                  boxShadow: isSelected ? `0 0 16px ${p.color}88, 0 4px 12px rgba(0,0,0,0.2)` : "0 2px 8px rgba(0,0,0,0.1)",
                  transform: isSelected ? "scale(1.08)" : undefined,
                  opacity: isSelected ? 1 : 0.85,
                }}>
                <Image src={p.cover} alt={p.title} fill className="object-contain p-2" />
                {/* status badge */}
                <div className="absolute top-1 left-1 px-1 py-0.5 rounded text-[7px] font-black text-white"
                  style={{ background: p.status === "Official Release" ? "#1C7FE0" : p.status === "Open Beta" ? "#27AE60" : "#D97706" }}>
                  {p.status === "Official Release" ? "RELEASE" : p.status === "Open Beta" ? "BETA" : "EA"}
                </div>
              </div>
            </button>
          );
        })}
        {Array.from({ length: Math.max(0, 3 - projects.length) }).map((_, i) => (
          <div key={`e${i}`} className="w-20 h-24 opacity-0" />
        ))}
      </div>

      {/* 나무 플랫폼 */}
      <div className="h-5 rounded-sm mx-2 relative" style={{
        background: "linear-gradient(180deg,#D4A836 0%,#B8861C 30%,#8B6014 70%,#5E3D0A 100%)",
        borderTop: "3px solid #F0C840",
        borderLeft: "2px solid #C8941A",
        borderRight: "2px solid #6B4A0F",
        boxShadow: "0 6px 16px rgba(0,0,0,0.45)"
      }}>
        {/* 나무 결 */}
        {[20, 40, 60, 80].map(x => (
          <div key={x} className="absolute top-0 bottom-0 w-px opacity-20" style={{ left: `${x}%`, background: "#5E3D0A" }} />
        ))}
      </div>

      {/* 이름 + 레벨 */}
      <div className="flex justify-center gap-8 mt-1.5">
        {projects.map(p => (
          <div key={p.id} className="w-20 text-center">
            <p className="text-white text-[11px] font-black truncate"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)" }}>
              {p.title}
            </p>
            <p className="text-[10px] font-bold" style={{ color: levelColor(p.level), textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
              Lv.{p.level}
            </p>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 3 - projects.length) }).map((_, i) => (
          <div key={`el${i}`} className="w-20" />
        ))}
      </div>
    </div>
  );
}

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-7 h-7 rounded-full text-white text-xs font-black disabled:opacity-30 hover:brightness-125 transition-all"
      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.3)" }}>
      {children}
    </button>
  );
}

function Cloud({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className="relative" style={{ width: w }}>
        <div className="rounded-full bg-white" style={{ width: w, height: w * 0.4, filter: "blur(4px)", opacity: 0.85 }} />
        <div className="absolute rounded-full bg-white" style={{ width: w * 0.5, height: w * 0.45, top: -w * 0.18, left: w * 0.15, filter: "blur(3px)", opacity: 0.85 }} />
        <div className="absolute rounded-full bg-white" style={{ width: w * 0.45, height: w * 0.4, top: -w * 0.14, left: w * 0.42, filter: "blur(3px)", opacity: 0.85 }} />
      </div>
    </div>
  );
}
