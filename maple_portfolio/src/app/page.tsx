"use client";

import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import WorldSelectScreen from "@/components/WorldSelectScreen";
import CharacterSelectScreen from "@/components/CharacterSelectScreen";
import ProjectDetailScreen from "@/components/ProjectDetailScreen";
import { Project } from "@/data/projects";

type Screen = "landing" | "world-select" | "character-select" | "project-detail";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setScreen("project-detail");
  };

  return (
    <>
      {screen === "landing" && (
        <LandingScreen onComplete={() => setScreen("world-select")} />
      )}
      {screen === "world-select" && (
        <WorldSelectScreen onEnter={() => setScreen("character-select")} />
      )}
      {screen === "character-select" && (
        <CharacterSelectScreen
          onBack={() => setScreen("world-select")}
          onSelectProject={handleSelectProject}
        />
      )}
      {screen === "project-detail" && selectedProject && (
        <ProjectDetailScreen
          project={selectedProject}
          onBack={() => setScreen("character-select")}
          onHome={() => setScreen("world-select")}
        />
      )}
    </>
  );
}
