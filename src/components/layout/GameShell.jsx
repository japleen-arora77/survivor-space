
/**
 * File: GameShell.jsx
 * Purpose: Connects Level 1, the interactive habitat and mission guidance.
 * Owner: Team Lead.
 * Responsibilities:
 * - Connects player actions to the shared game engine.
 * - Displays resources, interactive equipment and mission instructions.
 * - Coordinates pause, resume and reset.
 */

import GameHeader from "./GameHeader.jsx";
import HabitatScene from "./HabitatScene.jsx";

import ResourceHUD from "../hud/ResourceHUD.jsx";
import MissionPanel from "../mission/MissionPanel.jsx";
import MissionGuide from "../mission/MissionGuide.jsx";

import FeedbackPanel from "../feedback/FeedbackPanel.jsx";
import PauseMenu from "../feedback/PauseMenu.jsx";

import useGameEngine from "../../features/game/useGameEngine.js";
import level01Mission from "../../missions/level-01/mission.js";

function GameShell() {
  const game = useGameEngine(level01Mission);

  const displayedMission = {
    ...level01Mission,
    ...(game.currentMissionStep ?? {}),
    id: level01Mission.id,
    level: level01Mission.level,
    lunarDay: level01Mission.lunarDay,
    title:
      game.outcome === "success"
        ? "Mission Completed"
        : game.outcome === "recovery"
          ? "Emergency Stabilized"
          : game.outcome === "failure"
            ? "Mission Failed"
            : game.currentMissionStep?.title ??
              level01Mission.title,
  };

  const displayedFeedback = game.outcome
    ? game.outcome === "success"
      ? `LEVEL COMPLETE — ${game.feedback}`
      : game.outcome === "recovery"
        ? `RECOVERY OUTCOME — ${game.feedback}`
        : `MISSION FAILED — ${game.feedback}`
    : game.feedback;

  const actionsDisabled = game.paused || Boolean(game.outcome);

  return (
    <main className="game-shell container-fluid">
      <GameHeader
        paused={game.paused}
        onTogglePause={game.togglePause}
        level={level01Mission.level}
        lunarDay={level01Mission.lunarDay}
      />

      <ResourceHUD resources={game.resources} />

      <div
        className="gameplay-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "16px",
        }}
      >
        <HabitatScene
          currentStep={game.currentStep}
          actions={game.currentMissionStep?.actions ?? []}
          resources={game.resources}
          feedback={displayedFeedback}
          outcome={game.outcome}
          paused={actionsDisabled}
          onAction={game.performAction}
        />

        <MissionGuide
          currentStep={game.currentStep}
          flags={game.flags}
          outcome={game.outcome}
          feedback={displayedFeedback}
        />

        <MissionPanel mission={displayedMission} />
      </div>

      <FeedbackPanel
        message={displayedFeedback}
        paused={game.paused}
        onReset={game.resetGame}
      />

      <footer className="game-footer">
        <span>SURVIVOR: SPACE</span>
        <span>
          LEVEL 01 / LUNAR DAY 01 / TRAINING SIMULATION
        </span>
      </footer>

      <PauseMenu
        open={game.paused}
        onResume={game.resumeGame}
        onReset={game.resetGame}
      />
    </main>
  );
}

export default GameShell;
