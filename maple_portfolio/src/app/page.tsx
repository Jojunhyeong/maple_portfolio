"use client";

import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import WorldSelectScreen from "@/components/WorldSelectScreen";
import CharacterSelectScreen from "@/components/CharacterSelectScreen";

type Screen = "landing" | "world-select" | "character-select";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");

  return (
    <>
      {screen === "landing" && (
        <LandingScreen onComplete={() => setScreen("world-select")} />
      )}
      {screen === "world-select" && (
        <WorldSelectScreen onEnter={() => setScreen("character-select")} />
      )}
      {screen === "character-select" && (
        <CharacterSelectScreen onBack={() => setScreen("world-select")} />
      )}
    </>
  );
}
