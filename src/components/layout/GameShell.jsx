
/**
 * File: GameShell.jsx
 * Purpose: Integrates the shared Survivor: Space cockpit interface.
 * Owner: Team Lead.
 * Responsibilities: Owns demo mission data and resource state, applies action
 * effects, coordinates pause/reset behavior and connects reusable components.
 */

import { useState } from "react";

import GameHeader from "./GameHeader.jsx";
import SpacecraftScene from "./SpacecraftScene.jsx";

import ResourceHUD from "../hud/ResourceHUD.jsx";

import MissionPanel from "../mission/MissionPanel.jsx";
import ActionPanel from "../mission/ActionPanel.jsx";

import FeedbackPanel from "../feedback/FeedbackPanel.jsx";
import PauseMenu from "../feedback/PauseMenu.jsx";

const INITIAL_RESOURCES = {
  oxygen: 82,
  water: 46,
  food: 74,
  power: 61,
};

const DEMO_MISSION = {
  id: 3,
  title: "Water Recovery Malfunction",
  severity: "HIGH",
  description:
    "The water recovery unit is malfunctioning. Diagnose the system and protect the crew's remaining supplies.",
  objective:
    "Stabilize water reserves while preserving critical systems.",
  actions: [
    {
      id: "diagnose",
      label: "Diagnose System",
      description: "Use power to inspect the water recovery unit.",
      effects: { power: -8 },
      feedback:
        "Diagnostic scan complete. Power reserves decreased by 8%.",
    },
    {
      id: "conserve",
      label: "Conserve Water",
      description: "Activate emergency water conservation protocols.",
      effects: { water: 5 },
      feedback:
        "Conservation protocol activated. Water reserves improved.",
    },
    {
      id: "reserve",
      label: "Emergency Reserve",
      description: "Access backup water reserves using auxiliary power.",
      effects: { water: 10, power: -3 },
      feedback:
        "Backup reserve accessed. Water increased and power decreased.",
    },
  ],
};

function GameShell() {
  const [resources, setResources] = useState({
    ...INITIAL_RESOURCES,
  });

  const [feedback, setFeedback] = useState(
    "Awaiting astronaut input. Review the mission and select an action."
  );

  const [paused, setPaused] = useState(false);

  function handleAction(action) {
    if (paused) {
      return;
    }

    setResources((previousResources) => {
      const updatedResources = { ...previousResources };

      Object.entries(action.effects).forEach(([resource, change]) => {
        if (resource in updatedResources) {
          updatedResources[resource] = Math.max(
            0,
            Math.min(100, updatedResources[resource] + change)
          );
        }
      });

      return updatedResources;
    });

    setFeedback(action.feedback);
  }

  function resetMission() {
    setResources({ ...INITIAL_RESOURCES });

    setFeedback(
      "Mission reset. Awaiting astronaut input."
    );

    setPaused(false);
  }

  function togglePause() {
    setPaused((previousPaused) => !previousPaused);
  }

  return (
    <main className="game-shell container-fluid">
      <GameHeader
        paused={paused}
        onTogglePause={togglePause}
      />

      <ResourceHUD resources={resources} />

      <section className="cockpit-grid">
        <SpacecraftScene />

        <MissionPanel mission={DEMO_MISSION} />
      </section>

      <ActionPanel
        actions={DEMO_MISSION.actions}
        onAction={handleAction}
        paused={paused}
      />

      <FeedbackPanel
        message={feedback}
        paused={paused}
        onReset={resetMission}
      />

      <footer className="game-footer">
        <span>SURVIVOR: SPACE</span>
        <span>TRAINING SIMULATION / PROTOTYPE</span>
      </footer>

      <PauseMenu
        open={paused}
        onResume={() => setPaused(false)}
        onReset={resetMission}
      />
    </main>
  );
}

export default GameShell;
