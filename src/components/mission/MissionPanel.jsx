
/**
 * File: MissionPanel.jsx
 * Purpose: Displays the current mission briefing.
 * Owner: Team Lead.
 * Responsibilities: Shows mission number, severity, title, description
 * and primary objective. Does not execute mission actions.
 */

function MissionPanel({ mission }) {
    return (
      <aside className="mission-panel">
        <div className="eyebrow">
          ACTIVE MISSION / {String(mission.id).padStart(2, "0")}
        </div>
  
        <div className="severity-badge">
          {mission.severity} PRIORITY
        </div>
  
        <h2>{mission.title}</h2>
  
        <p>{mission.description}</p>
  
        <div className="objective-block">
          <div className="eyebrow">PRIMARY OBJECTIVE</div>
          <p>{mission.objective}</p>
        </div>
      </aside>
    );
  }
  
  export default MissionPanel;
  