"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";

interface CharacterSelectScreenProps {
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

const PROJECTS_PER_PAGE = 6;

export default function CharacterSelectScreen({ onBack, onSelectProject }: CharacterSelectScreenProps) {
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const currentProjects = projects.slice(
    page * PROJECTS_PER_PAGE,
    (page + 1) * PROJECTS_PER_PAGE
  );

  // 상단 6칸, 하단 6칸 (MapleStory 2줄 플랫폼 구조)
  const topRow = currentProjects.slice(0, 3);
  const bottomRow = currentProjects.slice(3, 6);

  const levelColor = (level: number) => {
    if (level >= 250) return "#FF6B35";
    if (level >= 200) return "#FFD700";
    if (level >= 150) return "#4ADE80";
    if (level >= 100) return "#60A5FA";
    return "#A78BFA";
  };

  const formatPower = (power: number) => {
    if (power >= 10000) return `${(power / 10000).toFixed(0)}만`;
    return power.toLocaleString();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* ─── 배경: 하늘 + 언덕 ─── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #87CEEB 0%, #B8DFFF 45%, #D4EFFF 65%, #8BC34A 65%, #5D9E2B 75%, #3D7520 100%)",
        }}
      />

      {/* 구름 */}
      <Cloud x={8} y={8} scale={1.2} />
      <Cloud x={30} y={5} scale={0.8} />
      <Cloud x={55} y={10} scale={1.0} />
      <Cloud x={75} y={6} scale={1.4} />

      {/* 이벤트 배너 (MapleStory 상단 공지 스타일) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        <div
          className="rounded-full px-5 py-1.5 text-xs font-black text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #FF8C00, #FFA500)" }}
        >
          🔥 프로젝트 레벨업 진행중!
        </div>
        <div
          className="rounded-full px-5 py-1.5 text-xs font-black text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #228B22, #32CD32)" }}
        >
          ⭐ 신규 프로젝트 추가 예정
        </div>
      </div>

      {/* ─── 메인 컨텐츠 ─── */}
      <div className="absolute inset-0 flex pt-14 pb-12 px-4 gap-4">

        {/* ─── 왼쪽: 캐릭터(프로젝트) 선택 ─── */}
        <div className="flex-1 flex flex-col justify-center gap-4 relative">

          {/* 큰 나무 (배경 장식) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 opacity-20 pointer-events-none select-none"
            style={{ zIndex: 0 }}
          >
            <div
              className="mx-auto w-8 h-48"
              style={{ background: "linear-gradient(180deg, #5C3D1E, #3D2710)" }}
            />
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, #4CAF50, #2E7D32)" }}
            />
          </div>

          {/* 상단 플랫폼 + 캐릭터들 */}
          <PlatformRow
            projects={topRow}
            selected={selected}
            onSelect={setSelected}
            levelColor={levelColor}
          />

          {/* 하단 플랫폼 + 캐릭터들 */}
          <PlatformRow
            projects={bottomRow}
            selected={selected}
            onSelect={setSelected}
            levelColor={levelColor}
          />

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-6 h-6 rounded-full bg-white/30 text-white text-xs disabled:opacity-30 hover:bg-white/50 transition-colors"
              >
                ◀
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                    i === page
                      ? "bg-yellow-400 text-black scale-110"
                      : "bg-white/30 text-white hover:bg-white/50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-6 h-6 rounded-full bg-white/30 text-white text-xs disabled:opacity-30 hover:bg-white/50 transition-colors"
              >
                ▶
              </button>
            </div>
          )}
        </div>

        {/* ─── 오른쪽: 선택된 프로젝트 정보 ─── */}
        <div
          className="w-56 shrink-0 rounded-xl border border-white/40 p-4 backdrop-blur-md flex flex-col gap-3 self-center"
          style={{ background: "rgba(255,255,255,0.85)" }}
        >
          {/* 레벨 */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">★</span>
            <span
              className="text-2xl font-black"
              style={{ color: levelColor(selected.level) }}
            >
              Lv. {selected.level}
            </span>
          </div>

          {/* 아이콘 + 이름 */}
          <div className="text-center">
            <div className="text-5xl mb-1">{selected.icon}</div>
            <p className="text-gray-800 font-black text-base">{selected.title}</p>
            <p className="text-gray-400 text-xs">{selected.jobClass}</p>
          </div>

          <div className="h-px bg-gray-200" />

          {/* 전투력 */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">전투력</span>
            <span className="text-orange-500 font-black">{formatPower(selected.power)}</span>
          </div>

          {/* 기술 스택 */}
          <div>
            <p className="text-gray-500 text-xs mb-1.5">기술 스택</p>
            <div className="flex flex-wrap gap-1">
              {Object.values(selected.tech).flat().map((tech: string) => (
                <span
                  key={tech}
                  className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: selected.color }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 설명 */}
          <p className="text-gray-600 text-[11px] leading-relaxed">{selected.subtitle}</p>

          <div className="h-px bg-gray-200" />

          {/* 버튼들 */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onSelectProject(selected)}
              className="w-full py-2 rounded-lg text-white text-xs font-black text-center transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)` }}
            >
              🎮 자세히 보기
            </button>
            {selected.links.repo && (
              <a
                href={selected.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-lg text-xs font-black text-center transition-all hover:scale-105 border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                🐙 GitHub 보기
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ─── 하단 네비게이션 바 ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-11 flex items-center justify-between px-4 border-t border-white/20"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/80 text-xs hover:text-white transition-colors font-bold"
        >
          ◀ 이전 월드로
        </button>

        <div className="flex gap-3">
          <button className="text-white/50 text-xs cursor-not-allowed">⚙️ 캐릭터 관리</button>
          <button className="text-white/50 text-xs cursor-not-allowed">🌍 월드 리프</button>
          <button className="text-white/50 text-xs cursor-not-allowed">+ 새 프로젝트</button>
        </div>

        <div className="text-white/30 text-[10px]">Ver. 1.0.0</div>
      </div>
    </div>
  );
}

/* ─── 플랫폼 한 줄 컴포넌트 ─── */
function PlatformRow({
  projects,
  selected,
  onSelect,
  levelColor,
}: {
  projects: Project[];
  selected: Project;
  onSelect: (p: Project) => void;
  levelColor: (n: number) => string;
}) {
  return (
    <div className="relative z-10">
      {/* 캐릭터들 */}
      <div className="flex justify-center gap-6 pb-1">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelect(project)}
            className="flex flex-col items-center group focus:outline-none"
          >
            {/* 선택 화살표 */}
            <div
              className={`text-yellow-400 text-lg mb-0.5 transition-all ${
                selected.id === project.id ? "opacity-100 animate-bounce" : "opacity-0"
              }`}
            >
              ▼
            </div>

            {/* 캐릭터 아이콘 */}
            <div
              className={`w-16 h-20 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                selected.id === project.id
                  ? "scale-110"
                  : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
              }`}
              style={{
                background:
                  selected.id === project.id
                    ? `linear-gradient(135deg, ${project.color}33, ${project.color}11)`
                    : "rgba(255,255,255,0.2)",
                border: `2px solid ${selected.id === project.id ? project.color : "rgba(255,255,255,0.3)"}`,
                boxShadow:
                  selected.id === project.id
                    ? `0 0 20px ${project.color}66`
                    : "none",
              }}
            >
              <span className="text-3xl">{project.icon}</span>
            </div>
          </button>
        ))}
        {/* 빈 슬롯 채우기 */}
        {Array.from({ length: 3 - projects.length }).map((_, i) => (
          <div key={`empty-${i}`} className="w-16 h-20 opacity-0" />
        ))}
      </div>

      {/* 플랫폼 */}
      <div
        className="h-4 rounded mx-6"
        style={{
          background: "linear-gradient(180deg, #C4931F 0%, #8B6014 60%, #5E3D0A 100%)",
          borderTop: "3px solid #E8B84B",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      />

      {/* 이름 + 레벨 */}
      <div className="flex justify-center gap-6 mt-1">
        {projects.map((project) => (
          <div key={project.id} className="w-16 text-center">
            <p
              className="text-white text-[11px] font-black truncate drop-shadow"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            >
              {project.title}
            </p>
            <p
              className="text-[10px] font-bold drop-shadow"
              style={{ color: levelColor(project.level), textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            >
              Lv.{project.level}
            </p>
          </div>
        ))}
        {Array.from({ length: 3 - projects.length }).map((_, i) => (
          <div key={`empty-label-${i}`} className="w-16" />
        ))}
      </div>
    </div>
  );
}

/* ─── 구름 컴포넌트 ─── */
function Cloud({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${scale})` }}
    >
      <div className="relative">
        <div className="w-20 h-10 rounded-full bg-white/80 blur-sm" />
        <div className="absolute -top-4 left-4 w-12 h-10 rounded-full bg-white/80 blur-sm" />
        <div className="absolute -top-2 left-10 w-10 h-8 rounded-full bg-white/80 blur-sm" />
      </div>
    </div>
  );
}
