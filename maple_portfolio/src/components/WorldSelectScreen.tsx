"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface WorldSelectScreenProps {
  onEnter: () => void;
}

interface Particle {
  id: number; x: number; y: number; size: number; delay: number; duration: number;
}

const techStacks = [
  { category: "Frontend", color: "#3B82F6", items: [
    { name: "React",        sub: "라이브러리",    dot: "#61DAFB" },
    { name: "Next.js",      sub: "프레임워크",    dot: "#000000" },
    { name: "TypeScript",   sub: "언어",          dot: "#3178C6" },
    { name: "Tailwind CSS", sub: "스타일링",      dot: "#06B6D4" },
    { name: "JavaScript",   sub: "언어",          dot: "#F7DF1E" },
  ]},
  { category: "Infra / Tools", color: "#8B5CF6", items: [
    { name: "AWS EC2",      sub: "인프라",        dot: "#FF9900" },
    { name: "GitHub",       sub: "협업 / 버전관리", dot: "#181717" },
    { name: "Supabase",     sub: "BaaS",          dot: "#3ECF8E" },
    { name: "Storybook",    sub: "컴포넌트 문서화", dot: "#FF4785" },
  ]},
];

export default function WorldSelectScreen({ onEnter }: WorldSelectScreenProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setParticles(Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })));
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* ── 배경: 판타지 게임 씬 ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #04001A 0%, #0D0635 30%, #1A0A5C 55%, #0A1A3E 75%, #061028 100%)"
      }} />
      {/* 오로라 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 40% at 50% 20%, rgba(100,60,255,0.25) 0%, transparent 70%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 30% at 20% 40%, rgba(0,150,255,0.15) 0%, transparent 60%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 25% at 80% 30%, rgba(180,80,255,0.12) 0%, transparent 60%)"
      }} />
      {/* 별 파티클 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full bg-white"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
              animation: `pulse ${p.duration}s ease-in-out ${p.delay}s infinite alternate`, opacity: 0.7 }} />
        ))}
      </div>
      {/* 하단 지평선 글로우 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: "linear-gradient(0deg, rgba(30,80,200,0.3) 0%, transparent 100%)"
      }} />

      {/* ── 상단 버튼 ── */}
      <div className="absolute top-3 left-3 z-20">
        <button className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-white/80 border border-white/20 hover:bg-white/10 transition-colors"
          style={{ background: "rgba(0,0,0,0.4)" }}>
          🔒 보안 설정
        </button>
      </div>

      {/* ── 메인 레이아웃 ── */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-10 pb-12 gap-3">

        {/* ── 왼쪽: 프로필 카드 ── */}
        <div className="flex flex-col gap-2 w-[210px] shrink-0">
          {/* 카드 */}
          <div className="rounded overflow-hidden" style={{
            background: "linear-gradient(180deg, #E8F2FF 0%, #FFFFFF 15%)",
            border: "1px solid #8BB8E8",
            boxShadow: "0 6px 24px rgba(0,50,130,0.45), inset 0 1px 0 rgba(255,255,255,0.9)"
          }}>
            {/* 카드 헤더 */}
            <div className="px-3 py-2 flex items-center gap-1.5" style={{
              background: "linear-gradient(180deg, #2E6CC8 0%, #1A4A99 100%)",
              borderBottom: "1px solid #0A3080"
            }}>
              <span className="text-yellow-300 text-sm">★</span>
              <span className="text-white text-sm font-bold">Lv. 286</span>
            </div>

            {/* 아바타 */}
            <div className="relative mx-3 mt-3 rounded overflow-hidden" style={{
              height: "120px",
              background: "linear-gradient(180deg, #C8E4FF 0%, #E8F4FF 100%)",
              border: "1px solid #8BB8E8"
            }}>
              <Image src="/avatar.jpg" alt="조준형" fill className="object-cover object-top" />
            </div>

            {/* 이름 + 직함 */}
            <div className="px-3 pt-2 pb-1 text-center">
              <p className="text-gray-900 font-black text-base">조준형</p>
              <p className="text-blue-500 text-[11px] flex items-center justify-center gap-1 mt-0.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500" />
                Frontend Dev
              </p>
            </div>

            {/* 구분선 */}
            <div className="mx-3 my-2" style={{ height: "1px", background: "#D0E4F8" }} />

            {/* 연락처 링크 */}
            <div className="px-3 pb-3 space-y-2">
              <a href="https://github.com/Jojunhyeong" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors group">
                <span className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] shrink-0"
                  style={{ background: "#181717" }}>G</span>
                <span className="group-hover:underline truncate">github.com/Jojunhyeong</span>
              </a>
              <a href="https://velog.io/@jojh0323" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors group">
                <span className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] shrink-0"
                  style={{ background: "#20C997" }}>V</span>
                <span className="group-hover:underline truncate">velog.io/@jojh0323</span>
              </a>
              <a href="mailto:jojh0323@gmail.com"
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors group">
                <span className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] shrink-0"
                  style={{ background: "#EA4335" }}>@</span>
                <span className="group-hover:underline truncate">jojh0323@gmail.com</span>
              </a>
            </div>
          </div>

          {/* 간편 접속 버튼 */}
          <button onClick={onEnter}
            className="w-full py-2.5 rounded-full text-white text-sm font-black tracking-wide transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(180deg, #6EC8FF 0%, #1C7FE0 100%)",
              border: "1px solid #0B5CB8",
              boxShadow: "0 2px 8px rgba(30,111,224,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.35)"
            }}>
            포트폴리오 입장
          </button>

          <label className="flex items-center justify-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-3 h-3 accent-blue-500" />
            <span className="text-gray-400 text-xs">비공개 접속</span>
          </label>
        </div>

        {/* ── 가운데: 공지/소개 패널 ── */}
        <div className="flex-1 self-stretch rounded overflow-hidden flex flex-col" style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 10%)",
          border: "1px solid #8BB8E8",
          boxShadow: "0 6px 24px rgba(0,50,130,0.35), inset 0 1px 0 rgba(255,255,255,0.9)"
        }}>
          {/* 패널 헤더 */}
          <div className="px-4 py-2.5 flex items-center gap-2" style={{
            background: "linear-gradient(180deg, #2E6CC8 0%, #1A4A99 100%)",
            borderBottom: "1px solid #0A3080"
          }}>
            <div className="w-2 h-2 rounded-full bg-yellow-300" />
            <span className="text-white text-sm font-bold">
              <span className="text-yellow-300">조준형</span> 월드 공지사항
            </span>
          </div>

          {/* 패널 내용 */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-6 text-center gap-5">
            {/* 인용 장식 */}
            <div className="text-4xl text-blue-200 font-serif leading-none select-none">"</div>

            {/* 자기소개 본문 */}
            <div className="space-y-4 max-w-lg">
              <p className="text-gray-700 text-sm leading-[1.9] font-medium">
                성장 과정은 하나의 서비스가 출시되고 개선되며 안정화되는 흐름과
                <span className="text-blue-600 font-bold"> 닮아 있다</span>고 생각합니다.
              </p>
              <p className="text-gray-700 text-sm leading-[1.9] font-medium">
                협업 과정에서는 팀과 문제를 함께 정의하고,
                새로운 시도를 <span className="text-blue-600 font-bold">코드로 검증</span>하는 과정을 중요하게 여깁니다.
              </p>
              <p className="text-gray-700 text-sm leading-[1.9] font-medium">
                이러한 경험과 고민을 <span className="text-blue-600 font-bold">기록으로 남기며</span> 변화를 정리해 왔습니다.
              </p>
            </div>

            {/* 닫는 인용 장식 */}
            <div className="text-4xl text-blue-200 font-serif leading-none select-none rotate-180">"</div>

            {/* 구분선 */}
            <div className="w-16 h-px" style={{ background: "#D0E4F8" }} />

            {/* 서명 */}
            <p className="text-gray-400 text-xs tracking-widest">— 프론트엔드 개발자 조준형 —</p>
          </div>
        </div>

        {/* ── 오른쪽: 기술 스택 목록 (서버 리스트 스타일) ── */}
        <div className="w-[220px] shrink-0 self-stretch rounded overflow-hidden flex flex-col" style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 10%)",
          border: "1px solid #8BB8E8",
          boxShadow: "0 6px 24px rgba(0,50,130,0.35), inset 0 1px 0 rgba(255,255,255,0.9)"
        }}>
          {/* 헤더 */}
          <div className="px-3 py-2.5" style={{
            background: "linear-gradient(180deg, #2E6CC8 0%, #1A4A99 100%)",
            borderBottom: "1px solid #0A3080"
          }}>
            <span className="text-white text-sm font-bold">기술 스택</span>
          </div>

          {/* 스택 목록 */}
          <div className="flex-1 overflow-y-auto">
            {techStacks.map((group, gi) => (
              <div key={group.category}>
                {/* 카테고리 구분 */}
                <div className="px-3 py-1.5" style={{
                  background: "#EAF2FF",
                  borderBottom: "1px solid #D0E4F8",
                  borderTop: gi > 0 ? "1px solid #D0E4F8" : undefined
                }}>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{group.category}</span>
                </div>
                {group.items.map((tech, i) => (
                  <div key={tech.name}
                    className="flex items-center gap-2.5 px-3 py-2 hover:bg-blue-50 transition-colors cursor-default group"
                    style={{ borderBottom: i < group.items.length - 1 ? "1px solid #EEF4FC" : undefined }}>
                    {/* 색상 도트 */}
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: tech.dot, border: "1px solid rgba(0,0,0,0.1)" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-xs font-bold">{tech.name}</p>
                      <p className="text-gray-400 text-[10px]">{tech.sub}</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "#1E7FE0" }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 하단 바 ── */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-between"
        style={{ background: "rgba(0,0,0,0.65)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button className="text-gray-500 text-xs hover:text-gray-300 transition-colors flex items-center gap-1.5">
          <span>⏻</span> 게임 종료
        </button>
        <span className="text-gray-700 text-[10px] tracking-widest">Ver. 1.2.4.12.3</span>
      </div>
    </div>
  );
}
