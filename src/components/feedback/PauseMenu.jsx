
/**
 * File: PauseMenu.jsx
 * Purpose: Displays the pause overlay for the shared game screen.
 * Owner: Team Lead.
 * Responsibilities: Offers resume and reset controls without owning game state.
 */

import { RotateCcw, Play } from "lucide-react";

function PauseMenu({ open, onResume, onReset }) {
  if (!open) {
    return null;
  }

  return (
    <div className="pause-overlay">
      <div
        className="pause-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pause-title"
      >
        <div className="eyebrow">MISSION CONTROL</div>

        <h2 id="pause-title">Simulation Paused</h2>

        <p>Your mission state is preserved.</p>

        <button className="primary-button" onClick={onResume}>
          <Play size={16} />
          Resume Mission
        </button>

        <button className="secondary-button" onClick={onReset}>
          <RotateCcw size={16} />
          Reset Mission
        </button>
      </div>
    </div>
  );
}

export default PauseMenu;
