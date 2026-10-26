
/**
 * File: GameHeader.jsx
 * Purpose: Displays the persistent Survivor: Space header.
 * Owner: Team Lead.
 * Responsibilities: Shows the game identity, current assignment, communications
 * status and pause/resume control.
 */

import { Radio, Pause } from "lucide-react";

function GameHeader({ paused, onTogglePause }) {
  return (
    <header className="game-header">
      <div>
        <div className="eyebrow">LUNAR EXPEDITION PROGRAM</div>

        <h1>
          SURVIVOR: <span>SPACE</span>
        </h1>

        <p className="muted-text">MISSION 03 / SOUTHERN HIGHLANDS</p>
      </div>

      <div className="header-controls">
        <span className="comms-status">
          <Radio size={16} />
          COMMS ONLINE
        </span>

        <button
          className="secondary-button"
          onClick={onTogglePause}
          aria-label={paused ? "Resume simulation" : "Pause simulation"}
        >
          <Pause size={16} />
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
    </header>
  );
}

export default GameHeader;
