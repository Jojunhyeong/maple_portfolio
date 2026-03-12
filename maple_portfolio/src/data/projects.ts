export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: "Official Release" | "Open Beta" | "Early Access";
  version: string;
  level: number;
  power: number;
  jobClass: string;     // 직업 (역할)
  jobGroup: string;     // 직업군 (팀 역할)
  moveStyle: string;    // 이동방식 (개발 기간)
  mainStat: string;     // 주요스탯 (핵심 기술)
  icon: string;
  color: string;
  bgGradient: string;
  period: { start: string; end: string };
  team: { composition: string[]; role: string };
  highlights: string[];
  tech: Record<string, string[]>;
  myWork: string[];
  keywords: string[];
  links: { live?: string; repo?: string; blog?: string };
  cover: string;
  order: number;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "ttak",
    slug: "ttak",
    title: "TTAK",
    subtitle: "공공데이터 기반 건강기능식품 안심 정보 서비스",
    status: "Official Release",
    version: "v1.2",
    level: 220,
    power: 18500,
    jobClass: "파트장",
    jobGroup: "Frontend Part Leader",
    moveStyle: "2025.12 ~ 2026.01",
    mainStat: "Next.js · Storybook · OAuth",
    icon: "💊",
    color: "#3B82F6",
    bgGradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 40%, #0ea5e9 100%)",
    period: { start: "2025-12-21", end: "2026-01-28" },
    team: {
      composition: ["PM", "Designer", "Backend", "Frontend"],
      role: "Frontend Part Leader",
    },
    highlights: [
      "Tailwind v4 기반 디자인 시스템(타이포/브레이크포인트/유틸) 설계 및 문서화",
      "Storybook 도입으로 공통 컴포넌트 개발/검증/공유",
      "소셜 로그인 구현(OAuth, 쿠키/도메인, CORS 포함)",
      "이벤트 로그 설계(체류시간/퍼널) 및 지표 산출을 위한 데이터 전송 구조 설계",
    ],
    tech: {
      frontend: ["Next.js(App Router)", "TypeScript", "React", "Tailwind CSS", "TanStack React Query", "Storybook"],
      infra: ["Nginx", "PM2", "AWS EC2", "GitHub Actions"],
      analytics: ["Stay-time events", "Funnel sessions"],
    },
    myWork: [
      "라우팅 구조 설계 및 공통 레이아웃/네비게이션 구조 구성",
      "타이포그래피 시스템(@theme 기반) 설계 및 사용 규칙 문서화",
      "Storybook 기반 공통 컴포넌트 정리(상태 케이스 포함)",
      "OAuth 로그인 플로우 디버깅 및 안정화(도메인/쿠키/CORS)",
      "프론트 측 체류시간(active/total) 측정 로직 구현",
    ],
    keywords: ["Design System", "Storybook", "OAuth", "Analytics"],
    links: {
      live: "https://medilog.today/",
      repo: "https://github.com/MedlyMediLog/MediLog-frontend",
      blog: "https://velog.io/@jojh0323/series/%EB%A9%94%EB%94%94%EB%A1%9C%EA%B7%B8",
    },
    cover: "/ttak_logo.svg",
    order: 1,
    featured: true,
  },
  {
    id: "on-fit",
    slug: "on-fit",
    title: "on-fit",
    subtitle: "운동 소모임 매칭 서비스",
    status: "Open Beta",
    version: "v0.85",
    level: 185,
    power: 14200,
    jobClass: "팀장",
    jobGroup: "Team Lead (Full-cycle)",
    moveStyle: "2025.10 ~ 2025.12",
    mainStat: "Next.js · AWS EC2 · Supabase",
    icon: "🏋️",
    color: "#10B981",
    bgGradient: "linear-gradient(135deg, #064e3b 0%, #059669 40%, #34d399 100%)",
    period: { start: "2025-10-31", end: "2025-12-17" },
    team: {
      composition: ["Frontend", "Frontend", "Frontend"],
      role: "Team Lead (Full-cycle)",
    },
    highlights: [
      "Supabase로 백엔드(인증/DB) 구성",
      "AWS EC2(Ubuntu) 기반 배포 및 도메인 연결(호스팅KR)",
      "CI/CD 파이프라인 구성",
      "Next.js 라우팅 구조/CSR-SSR 개념 학습 및 적용",
      "카카오맵 API 연동 및 외부 라이브러리 도입 경험",
    ],
    tech: {
      frontend: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Kakao Maps API"],
      backend: ["Supabase(Auth/DB)"],
      infra: ["AWS EC2", "Ubuntu", "Nginx", "Domain 연결", "CI/CD"],
      collaboration: ["Jira", "Confluence"],
    },
    myWork: [
      "팀장으로 초기 개발 계획 수립 및 역할 분배(공통 컴포넌트 → 페이지 단위)",
      "Supabase 기반 데이터 구조 설계 및 연동",
      "EC2 서버 세팅 및 배포, 도메인 연결",
      "CI/CD 구성으로 배포 자동화",
      "지도 기능(카카오맵) 연동 및 화면 흐름 설계",
    ],
    keywords: ["Release", "Infra", "Deployment", "Next.js", "Leadership"],
    links: {
      live: "https://onfit.today/",
      repo: "https://github.com/Jojunhyeong/on-fit",
      blog: "https://velog.io/@jojh0323/series/%EC%98%A8%ED%95%8F",
    },
    cover: "/onfit_logo.png",
    order: 2,
    featured: true,
  },
  {
    id: "minds-safe",
    slug: "minds-safe",
    title: "minds-safe",
    subtitle: "익명 고민함 웹 서비스",
    status: "Open Beta",
    version: "v0.7",
    level: 150,
    power: 9800,
    jobClass: "공통컴포넌트팀",
    jobGroup: "Shared Components Team",
    moveStyle: "2025.10 ~ 2025.10",
    mainStat: "React Query · Zustand · Prisma",
    icon: "🧠",
    color: "#8B5CF6",
    bgGradient: "linear-gradient(135deg, #2e1065 0%, #7c3aed 40%, #a78bfa 100%)",
    period: { start: "2025-10-17", end: "2025-10-29" },
    team: {
      composition: ["Instructor", "Frontend trainees (multi teams)"],
      role: "Shared Components Team",
    },
    highlights: [
      "공통 UI 컴포넌트를 팀 단위로 구현하며 재사용 기준을 의식",
      "React Query / Zustand를 통해 서버 상태와 UI 상태 분리 개념을 처음 실전 적용",
      "(회고) 당시 Storybook 미도입 → 이후 도입 필요성을 체감한 계기",
    ],
    tech: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "TanStack React Query", "Zustand"],
      backend: ["Node.js (Express)", "Prisma ORM", "MySQL"],
    },
    myWork: [
      "공통 컴포넌트(Button/Input/Modal 등) 제작 및 사용 가이드 공유(팀 내부 기준)",
      "상태 관리 도입 실험(서버 상태 vs UI 상태의 역할 구분)",
      "협업 환경에서 UI 일관성을 유지하기 위한 규칙 합의",
    ],
    keywords: ["Shared Components", "State Management", "Learning"],
    links: {
      live: "https://minds-safe.vercel.app/",
      repo: "https://github.com/Jojunhyeong/minds-safe",
      blog: "https://velog.io/@jojh0323/series/%EC%9D%B5%EB%AA%85-%EA%B3%A0%EB%AF%BC%ED%95%A8",
    },
    cover: "/mindsafe_logo.png",
    order: 3,
    featured: false,
  },
  {
    id: "chop",
    slug: "chop",
    title: "CHOP!",
    subtitle: "온라인 현금거래 중개 서비스",
    status: "Early Access",
    version: "EA",
    level: 130,
    power: 6700,
    jobClass: "프론트엔드",
    jobGroup: "Frontend Developer",
    moveStyle: "2024.07 ~ 2025.05",
    mainStat: "React · Axios · Middleware",
    icon: "🛒",
    color: "#F59E0B",
    bgGradient: "linear-gradient(135deg, #78350f 0%, #d97706 40%, #fbbf24 100%)",
    period: { start: "2024-07-02", end: "2025-05-17" },
    team: {
      composition: ["Backend(현업)", "PM(현업)", "Frontend(학부생) x3"],
      role: "Frontend",
    },
    highlights: [
      "프론트-백엔드 통신을 규격화하기 위한 미들웨어(Kepler) 설계/구현",
      "토큰 기반 인증/재시도(Refresh) 흐름을 공통 레이어에서 처리",
      "Swagger 기반으로 명세를 확인하며 협업",
      "장기(약 8개월) 팀 개발을 통해 폴더 구조/페이지 구조를 고민한 첫 프로젝트",
    ],
    tech: {
      frontend: ["React", "Styled-components", "TypeScript", "Axios"],
      api: ["Swagger"],
    },
    myWork: [
      "Kepler 통신 미들웨어 설계(요청 추상화, 인증 헤더 주입, refresh 후 재요청)",
      "페이지 구조/폴더 구조 설계 경험",
      "협업 환경에서 명세 기반으로 기능 구현",
    ],
    keywords: ["Middleware", "Auth", "Team Project", "First"],
    links: {
      repo: "https://github.com/buru-no1/burumarket-client",
      blog: "https://velog.io/@jojh0323/series/CHOP",
    },
    cover: "/chop_logo.png",
    order: 4,
    featured: false,
  },
];
