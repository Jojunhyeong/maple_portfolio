export interface Project {
  id: string;
  name: string;       // 프로젝트 이름 (캐릭터 닉네임처럼)
  level: number;      // 난이도/완성도 레벨 (1~300)
  jobClass: string;   // 직업 (프론트엔드, 풀스택 등)
  power: number;      // 전투력 (기술 스택 복잡도)
  techStack: string[];
  description: string;
  github?: string;
  live?: string;
  icon: string;       // 캐릭터 대표 이모지
  color: string;      // 직업별 색상
}

export const projects: Project[] = [
  {
    id: "1",
    name: "메이플포트폴리오",
    level: 286,
    jobClass: "풀스택",
    power: 24497,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    description: "메이플스토리 컨셉의 개인 포트폴리오 사이트. 월드 선택 → 캐릭터 선택으로 이어지는 게임 UI를 구현했습니다.",
    github: "https://github.com/Jojunhyeong/maple_portfolio",
    icon: "🍁",
    color: "#E85D04",
  },
  {
    id: "2",
    name: "프로젝트명2",
    level: 210,
    jobClass: "프론트엔드",
    power: 12300,
    techStack: ["React", "JavaScript", "CSS"],
    description: "프로젝트 설명을 입력해주세요.",
    github: "https://github.com/Jojunhyeong",
    icon: "⚔️",
    color: "#4A90D9",
  },
  {
    id: "3",
    name: "프로젝트명3",
    level: 175,
    jobClass: "프론트엔드",
    power: 8900,
    techStack: ["React", "TypeScript"],
    description: "프로젝트 설명을 입력해주세요.",
    github: "https://github.com/Jojunhyeong",
    icon: "🛡️",
    color: "#7B61FF",
  },
  {
    id: "4",
    name: "프로젝트명4",
    level: 140,
    jobClass: "풀스택",
    power: 6700,
    techStack: ["Next.js", "Node.js", "MongoDB"],
    description: "프로젝트 설명을 입력해주세요.",
    github: "https://github.com/Jojunhyeong",
    icon: "🏹",
    color: "#2ECC71",
  },
  {
    id: "5",
    name: "프로젝트명5",
    level: 110,
    jobClass: "프론트엔드",
    power: 4200,
    techStack: ["HTML", "CSS", "JavaScript"],
    description: "프로젝트 설명을 입력해주세요.",
    github: "https://github.com/Jojunhyeong",
    icon: "🔮",
    color: "#E74C3C",
  },
  {
    id: "6",
    name: "프로젝트명6",
    level: 80,
    jobClass: "기타",
    power: 2100,
    techStack: ["Python"],
    description: "프로젝트 설명을 입력해주세요.",
    github: "https://github.com/Jojunhyeong",
    icon: "⚡",
    color: "#F39C12",
  },
];
