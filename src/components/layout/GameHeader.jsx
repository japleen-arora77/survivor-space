
/**
 * File: GameHeader.jsx
 * Purpose: Displays the game identity, current level/day and pause control.
 * Owner: Team Lead.
 * Responsibilities: Provides consistent mission identification and pause UI.
 */

import { Radio, Pause, Play } from "lucide-react";

function GameHeader({
  paused,
  onTogglePause,
  level = 1,
  lunarDay = 1,
}) {
  const formattedLevel = String(level).padStart(2, "0");
  const formattedDay = String(lunarDay).padStart(2, "0");

  return (
    <header className="game-header">
      <div className="game-brand">
        <div className="brand-mark">
          <Radio size={22} />
        </div>

        <div className="brand-copy">
          <h1>SURVIVOR: SPACE</h1>
          <p>
            LEVEL {formattedLevel} / LUNAR DAY {formattedDay}
          </p>
        </div>
      </div>

      <div className="header-status">
        <span className="connection-indicator" />

        <span className="connection-label">
          COMMS ONLINE
        </span>

        <button
          type="button"
          className="pause-button"
          onClick={onTogglePause}
          aria-label={paused ? "Resume simulation" : "Pause simulation"}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}

          <span>{paused ? "RESUME" : "PAUSE"}</span>
        </button>
      </div>
    </header>
  );
}

export default GameHeader;
