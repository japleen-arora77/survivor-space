
/**
 * File: FeedbackPanel.jsx
 * Purpose: Displays feedback from the current mission simulation.
 * Owner: Team Lead.
 * Responsibilities: Shows system messages and provides a reset control.
 */

import { RotateCcw } from "lucide-react";

function FeedbackPanel({ message, paused, onReset }) {
  return (
    <section className="feedback-panel" aria-live="polite">
      <span className="eyebrow">SYSTEM FEEDBACK</span>

      <p>{paused ? "Simulation paused." : message}</p>

      <button className="text-button" onClick={onReset}>
        <RotateCcw size={14} />
        Reset simulation
      </button>
    </section>
  );
}

export default FeedbackPanel;
