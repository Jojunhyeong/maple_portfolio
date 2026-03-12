"use client";

import { useEffect, useState } from "react";

interface WorldSelectScreenProps {
  onEnter: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const techStacks = [
  { category: "Frontend", items: [
    { name: "React", icon: "⚛️", level: "숙련" },
    { name: "Next.js", icon: "▲", level: "숙련" },
    { name: "TypeScript", icon: "🔷", level: "숙련" },
    { name: "Tailwind CSS", icon: "🎨", level: "숙련" },
    { name: "JavaScript", icon: "🟡", level: "능숙" },
  ]},
  { category: "Backend / 기타", items: [
    { name: "Node.js", icon: "🟢", level: "보통" },
    { name: "Git / GitHub", icon: "🐙", level: "숙련" },
  ]},
];

export default function WorldSelectScreen({ onEnter }: WorldSelectScreenProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      }))
    );
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "linear-gradient(160deg, #0a0a2e 0%, #1a0a3e 40%, #0d1a4a 100%)" }}
    >
      {/* 별 배경 */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `pulse ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* 상단 보안 설정 */}
      <div className="absolute top-3 left-3 z-10">
        <button className="flex items-center gap-1.5 rounded bg-black/40 px-3 py-1.5 text-xs text-white/80 border border-white/20 hover:bg-white/10 transition-colors">
          🔒 보안 설정
        </button>
      </div>

      {/* 메인 레이아웃 */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pt-12 pb-16 gap-4">

        {/* ─── 왼쪽: 프로필 + 소개 ─── */}
        <div className="flex flex-col gap-3 w-72 shrink-0">
          {/* 프로필 카드 */}
          <div
            className="rounded-xl border border-white/20 p-4 backdrop-blur-md"
            style={{ background: "rgba(10, 20, 60, 0.7)" }}
          >
            {/* 아바타 */}
            <div
              className="w-full h-32 rounded-lg mb-3 flex items-center justify-center border border-white/10"
              style={{ background: "linear-gradient(135deg, #1e3a6e 0%, #0d1f3c 100%)" }}
            >
              <span className="text-6xl select-none">👨‍💻</span>
            </div>

            {/* 이름 + 직함 */}
            <div className="text-center mb-3">
              <p className="text-white font-black text-xl tracking-wider">조준형</p>
              <p className="text-blue-300 text-xs tracking-widest mt-0.5">FRONTEND DEVELOPER</p>
            </div>

            {/* 구분선 */}
            <div className="h-px bg-white/10 mb-3" />

            {/* 스탯 */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">경력</span>
                <span className="text-white font-bold">신입</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">학교</span>
                <span className="text-white font-bold">인하대학교</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">전공</span>
                <span className="text-white font-bold">컴퓨터공학</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">서버</span>
                <span className="text-blue-300 font-bold">조준형 월드</span>
              </div>
            </div>
          </div>

          {/* 입장 버튼 */}
          <button
            onClick={onEnter}
            className="w-full py-3 rounded-lg font-black text-white text-sm tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #4A90E2, #2D6BB5)",
              boxShadow: "0 4px 20px rgba(74, 144, 226, 0.4)",
            }}
          >
            포트폴리오 입장
          </button>

          <label className="flex items-center justify-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-3 h-3 accent-blue-400" />
            <span className="text-gray-500 text-xs">비공개 접속</span>
          </label>
        </div>

        {/* ─── 가운데: 소개글 ─── */}
        <div
          className="flex-1 rounded-xl border border-white/20 p-6 backdrop-blur-md h-full flex flex-col"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <h2 className="text-white/90 font-bold text-base mb-1">
            <span className="text-yellow-300">조준형</span> 월드에 접속하셨습니다.
          </h2>
          <div className="h-px bg-white/10 mb-4" />

          <div className="space-y-3 text-sm text-white/70 leading-relaxed flex-1">
            <p>
              안녕하세요! 사용자 경험을 중요하게 생각하는
              <span className="text-white font-bold"> 프론트엔드 개발자 조준형</span>입니다.
            </p>
            <p>
              메이플스토리를 좋아하는 만큼, 개발에서도
              <span className="text-sky-300 font-bold"> 꾸준한 성장</span>과
              <span className="text-sky-300 font-bold"> 즐거움</span>을 추구합니다.
            </p>
            <p>
              각 프로젝트는 하나의 캐릭터입니다.
              레벨이 높을수록 난이도가 높고, 전투력은
              사용한 기술 스택의 복잡도를 의미합니다.
            </p>
          </div>

          {/* 공지 스타일 박스 */}
          <div
            className="mt-4 rounded-lg p-3 border border-yellow-500/30"
            style={{ background: "rgba(200, 150, 0, 0.1)" }}
          >
            <p className="text-yellow-300 text-xs font-bold mb-1">📢 공지사항</p>
            <p className="text-yellow-100/70 text-xs">
              현재 포트폴리오는 지속적으로 업데이트 중입니다.
              새로운 프로젝트가 계속 추가될 예정입니다!
            </p>
          </div>
        </div>

        {/* ─── 오른쪽: 기술 스택 (서버 목록 스타일) ─── */}
        <div
          className="w-52 shrink-0 rounded-xl border border-white/20 p-3 backdrop-blur-md h-full overflow-y-auto"
          style={{ background: "rgba(10, 20, 60, 0.7)" }}
        >
          <p className="text-white/50 text-xs text-center tracking-widest mb-3 uppercase">Tech Stack</p>

          {techStacks.map((group) => (
            <div key={group.category} className="mb-4">
              <p className="text-gray-500 text-[10px] tracking-widest uppercase mb-1.5 px-1">
                {group.category}
              </p>
              <div className="space-y-1">
                {group.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 border border-white/10 hover:border-blue-400/40 hover:bg-blue-400/10 transition-colors cursor-default"
                  >
                    <span className="text-sm w-5 text-center">{tech.icon}</span>
                    <span className="text-white text-xs font-medium flex-1">{tech.name}</span>
                    <span
                      className="text-[10px] font-bold"
                      style={{
                        color:
                          tech.level === "숙련" ? "#4ADE80"
                          : tech.level === "능숙" ? "#60A5FA"
                          : "#A78BFA",
                      }}
                    >
                      {tech.level === "숙련" ? "●" : tech.level === "능숙" ? "●" : "●"}{" "}
                      {tech.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 */}
      <div className="absolute bottom-4 left-4">
        <button className="text-gray-600 text-xs hover:text-gray-400 transition-colors flex items-center gap-1">
          ⏻ 게임 종료
        </button>
      </div>
      <div className="absolute bottom-4 right-4 text-gray-700 text-[10px] tracking-widest">
        Ver. 1.0.0
      </div>
    </div>
  );
}
